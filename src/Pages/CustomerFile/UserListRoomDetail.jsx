/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import Profiles from "../../Assets/Images/New_images/profile-picture.png";
import leftarrow from "../../Assets/Images/arrow-left.png";
import Image from "react-bootstrap/Image";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import "./UserList.css";
import { Call, Sms, House, Edit2, ArrowSwapHorizontal, Calendar2, LogoutCurve, AddCircle, Notification1 } from "iconsax-react";
import Group from "../../Assets/Images/Group.png";
import { useDispatch, useSelector } from "react-redux";
// import Carousel from "react-bootstrap/Carousel";
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
// import { MdError } from "react-icons/md";
import "react-datepicker/dist/react-datepicker.css";
// import upload from "../../Assets/Images/New_images/pdf@2x.png";
import UserListKyc from "./UserListKyc";
import UserAdditionalContact from "./UserAdditionalContact";
import { Trash } from "iconsax-react";
// import docDown from "../../Assets/Images/New_images/downdoc.png";
// import viewdoc from "../../Assets/Images/New_images/viewdoc.png";
import PropTypes from "prop-types";
import Select from "react-select";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { CloseCircle, DocumentUpload, WalletCheck } from "iconsax-react";
import { RightOutlined } from '@ant-design/icons';
import timehalf from "../../Assets/Images/New_images/time-half past.png";
// import html2canvas from "html2canvas";
import adhar from "../../Assets/Images/New_images/aadharimg.png"
import EditImage from "../../Assets/Images/New_images/cus_edit.svg"
import addcircle from "../../Assets/Images/New_images/add-circle.png";
import Landamrkimage from "../../Assets/Images/landmark.png";
import Areaimage from "../../Assets/Images/area_icon.png";
import PincodeImage from "../../Assets/Images/pin.png";
import CityImage from "../../Assets/Images/buildings.png";
import Floorimage from "../../Assets/Images/floor_icon.png";
import RoomImage from "../../Assets/Images/room_icon.png";
import LinkImage from "../../Assets/Images/home-link.png";
// import whiteaddcircle from "../../Assets/Images/white_add-circle.png";
// import MoneyImage from "../../Assets/Images/Money.png";
// import EyeIcon from "../../Assets/Images/eye.png";
import BackToCheckIn from "./BackToCheckIn";
import DueCustomerConfirmCheckout from "./DueCustomerConfirmCheckout";
import Stayhistory from "../../Assets/Images/stay_history.png";
import EditBasicDetails from "./EditBasicDetails";
import EditAddressDetails from "./EditAddressDetails";
import EditStayDetails from "./EditStayDetails";
import StayHistory from "./StayHistory";
import Retry from "../../Assets/Images/New_images/reload.png";
import FileAdd from '../../Assets/Images/New_images/file_add.svg'
import ErrorMessage from '../../Components/ErrorMessage'
import { useHasPermission } from '../../Utils/Permission';
import { useNavigate, useLocation } from "react-router-dom";
import EditRentalAmount from "./EditRentalAmount";
import EditAdvanceAmount from "./EditAdvanceAmount";
import EditJoiningDate from "./EditJoiningDate";
import { AddSquare } from "iconsax-react";
import TenantAmenities from "./TenantAssignAmenities";
import RequestedAmenities from "./RequestedAmenities";
import TransactionHistory from "./TransactionHistory";
import ManualDocumentsUpload from "./ManualDocumentsUpload";
import ParentsGuardian from "./Parents&Guardian";
import KYCDocuments from "./KYCDocuments";
import ManualDocumentsDetails from "./ManualDocumentsDetails";
import withErrorBoundary from "../../Hoc/WithErrorBountry";
import WalletHistory from "./WalletHistory";
import BookedCheckIn from "./BookedCheckIn";
import CustomerCheckout from "./CustomerCheckout";
import CustomerReAssign from "./CustomerReAssign";
import MakeAsInactive from "./MakeAsInactive";

function UserListRoomDetail(props) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();
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
  const [activeTab, setActiveTab] = useState("kyc");

  const [inactiveForm, setInActiveForm] = useState(false)
  const [inActiveDetails, setInactiveDetails] = useState("")
  const [kycdetailsForm, setKycDetailForm] = useState(false);
  const [additionalForm, setAdditionalForm] = useState(false);
  // const [contactEdit, setContactEdit] = useState("");
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
  const [showDocModal, setShowDocModal] = useState(false);
  const [showDocModaldoc2, setShowDocModaldoc2] = useState(false);
  const [documentvalue, setDocumentValue] = useState("1")
  const [showWalletHistory, setShowWalletHistory] = useState(false);
  const [BookingAssignForm, setBookingAssignForm] = useState(false)
  // const [previewUrl2, setPreviewUrl2] = useState(null)
  // const [loadingFile, setLoadingFile] = useState(true)
  const [showModal, setShowModal] = useState(false);
  const [basicDetails, setBasicDetails] = useState("")
  // const [imagePreview, setImagePreview] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [advanceList, setAdvanceList] = useState("")
  const [addamenityShow, setaddamenityShow] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [customerCheckoutpage, setCustomerCheckoutpage] = useState(false);
  const [customercheckoutdata, setCustomerCheckoutData] = useState("");
  const [activeRow, setActiveRow] = useState(null);
  const [initialReasonFields, setInitialReasonFields] = useState([]);
  const [showUpdateRentForm, setShowUpdateRentForm] = useState(false)
  const [showUpdateAdvanceForm, setShowUpdateAdvanceForm] = useState(false)
  const [showUpdateJoiningForm, setShowUpdateJoiningForm] = useState(false)
  const [reAssignDetail, setReasignDetail] = useState("");
  const [customerReassign, setCustomerReAssign] = useState(false);
  const [bactocheckinForm, setBacktoCheckInForm] = useState(false)
  const [DueCustomerShow, setDueCustomerShow] = useState(false)
  const [CheckOutDetails, setCheckOutDetails] = useState("");
  const [EditObj, setEditObj] = useState("");



  // const canUpdateTenant = useHasPermission("Customers", "canUpdate")
  // const canDeleteTenant = useHasPermission("Customers", "canDelete")
  // const canWriteTenant = useHasPermission("Customers", "canWrite")

  const {
    canWriteModule: canWriteTenant,
    // canReadModule: canReadInvoice,
    canUpdateModule: canUpdateTenant,
    // canDeleteModule: canDeleteTenant,
  } = useHasPermission("Customers");






  const {
    canWriteModule: canWriteAmenities,
    // canReadModule: canReadAmenities,
    // canUpdateModule: canUpdateAmenities,
    // canDeleteModule: canDeleteAmenities,
  } = useHasPermission("Amenities");

  const amenitiesRef = useRef(null);

  const { customerId, totriggerBillTap, isPgWay, IsOverView, scrollTo } = location.state || {};


  useEffect(() => {
    if (totriggerBillTap) {
      setTimeout(() => setValue("3"), 0);
    }

    if (IsOverView) {
      setTimeout(() => setValue("1"), 0);
    }

    if (scrollTo === "amenities") {
      setTimeout(() => {
        amenitiesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }, [totriggerBillTap, IsOverView, scrollTo]);





  useEffect(() => {
    if (state.UsersList?.CustomerdetailsgetStatuscode === 200) {
      // setLoadingFile(false)
      setTimeout(() => {
        dispatch({ type: "CLEAR_CUSTOMER_DETAILS" });
      }, 500);

    }
  }, [state.UsersList?.CustomerdetailsgetStatuscode])





  // const handleFileOpen = (url) => {
  //   if (!url) return;

  //   const lowerUrl = url.toLowerCase();

  //   if (
  //     lowerUrl.endsWith(".pdf") ||
  //     lowerUrl.endsWith(".jpg") ||
  //     lowerUrl.endsWith(".jpeg") ||
  //     lowerUrl.endsWith(".png")
  //   ) {

  //     setPreviewUrl(url);
  //     setShowDocModal(true);
  //   } else if (lowerUrl.endsWith(".xlsx") || lowerUrl.endsWith(".xls")) {
  //     const viewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`;
  //     window.open(viewerUrl, "_blank");
  //   } else {
  //     window.open(url, "_blank");
  //   }
  // };






  // const handleFileOpen2 = (url) => {
  //   if (!url) return;

  //   const lowerUrl = url.toLowerCase();

  //   if (
  //     lowerUrl.endsWith(".pdf") ||
  //     lowerUrl.endsWith(".jpg") ||
  //     lowerUrl.endsWith(".jpeg") ||
  //     lowerUrl.endsWith(".png")
  //   ) {

  //     setPreviewUrl2(url);
  //     setShowDocModaldoc2(true);
  //   } else if (lowerUrl.endsWith(".xlsx") || lowerUrl.endsWith(".xls")) {
  //     const viewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`;
  //     window.open(viewerUrl, "_blank");
  //   } else {
  //     window.open(url, "_blank");
  //   }
  // };


  // const cleanFileName = (url) => {
  //   const fullName = getFileName(url);
  //   const parts = fullName.split("_");
  //   const ext = fullName.split(".").pop(); 
  //   const short = parts[0].substring(0, 6); 
  //   return `${short}.${ext}`;
  // };
  // const cleanFileName = (url) => {
  //   if (!url) return "";

  //   const fullName = decodeURIComponent(url.split("/").pop()); 
  //   const ext = fullName.split(".").pop(); 
  //   const baseName = fullName.replace(/\.[^/.]+$/, ""); 

  //   const parts = baseName.split("_");
  //   const lastPart = parts[parts.length - 1]; 


  //   const short = lastPart.substring(0, 15);

  //   return `${short}.${ext}`;
  // };




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

      const ParticularUserDetails = state.UsersList.Users.listCustomers?.filter((item) => {
        return item.User_Id === props?.customerUser_Id;
      });


      setTimeout(() => {
        dispatch({ type: "REMOVE_STATUS_CODE_USER" });
      }, 1000);

      setCustomerDetails(ParticularUserDetails)

    }
  }, [state.UsersList?.UserListStatusCode])


  useEffect(() => {
    const ParticularUserDetails = state.UsersList.Users.listCustomers?.filter((item) => {
      return item.User_Id === props?.customerUser_Id;
    });

    setTimeout(() => {
      dispatch({ type: "REMOVE_STATUS_CODE_USER" });
    }, 1000);

    setCustomerDetails(ParticularUserDetails)

  }, []);






  useEffect(() => {
    dispatch({ type: 'KYCCUSTOMERDETAILS', payload: { customer_id: props?.id } })
  }, [])

  useEffect(() => {
    if (!Array.isArray(props?.userData) || props.userData.length === 0) return;

    const user = props.userData[0];

    const sanitize = (value) =>
      value === null ||
        value === undefined ||
        value === "null" ||
        value === "undefined"
        ? ""
        : value;

    const phoneNumber = String(user?.Phone || "");
    const countryCode = phoneNumber.slice(0, phoneNumber.length - 10);
    const mobileNumber = phoneNumber.slice(-10);

    setBednum(props.userData);
    seteditBed("editbeddet");
    setcustomerAsignBed(false);

    setId(user?.ID || user?.customerId);
    setFile(user?.profile === "0" ? null : user?.profile);

    const value = user?.Name ? user.Name.split(" ") : ["", ""];
    setFirstname(value[0]?.trim());
    setLastname(value[1]?.trim() || "");

    setAddress(user?.Address || "");
    setAadharNo(user?.AadharNo || "");
    setPancardNo(user?.PancardNo || "");
    setLicence(user?.licence || "");
    setPhone(mobileNumber);
    setCountryCode(countryCode);
    setEmail(user?.Email || "");
    setHostelName(user?.HostelName || "");
    setHostel_Id(user?.Hostel_Id || "");
    setFloor(user?.Floor || "");
    setRooms(user?.Rooms || "");
    setRoomId(user?.room_id || "");
    setBedId(user?.hstl_Bed || "");
    setSelectedDate(user?.joining_Date || "");
    setAdvanceAmount(user?.AdvanceAmount || "");
    setRoomRent(user?.RoomRent || "");
    setPaymentType(user?.PaymentType || "");
    setBalanceDue(user?.BalanceDue || "");
    setPaidAdvance(user?.paid_advance || "");
    setPaidrent(user?.paid_rent || "");

    setHouseNo(sanitize(user?.Address));
    setStreet(sanitize(user?.area));
    setLandmark(sanitize(user?.landmark));
    setCity(sanitize(user?.city));
    setPincode(sanitize(user?.pincode));
    setStateName(sanitize(user?.state));
  }, [props?.userData]);


  const [ProfilePic, setProfilepic] = useState(false)

  useEffect(() => {
    if (state.UsersList.statusCodeForCustomerDetails === 200) {

      setProfilepic(true)
      setFile(state.UsersList?.KycCustomerDetails?.pic)

      setTimeout(() => {
        dispatch({ type: "REMOVEKYC_CUSTOMER_DETAILS" });
      }, 100);
    }
  }, [state.UsersList.statusCodeForCustomerDetails]);

  const isFirstRun = useRef(true);
  const MobileNumber = `${countryCode}${props.userData?.Phone}`;

  const [advanceDetail, setAdvanceDetail] = useState("");


  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }


    if (props.userData?.profile && !file) {
      return;
    }

    if (
      ProfilePic &&
      file &&
      props.userData?.ID &&
      props.userData?.Name &&
      props.userData?.Phone
    ) {
      const name = props.userData?.Name || "";
      const value = name.trim().split(" ");
      setFirstname(value[0] || "");
      setLastname(value[1] || "");



      const payload = {
        profile: file,
        firstname: value[0] || "",
        lastname: value[1] || "",
        Phone: MobileNumber,
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
        Floor: props.userData?.Floor,
        Rooms: props.userData?.room_id,
        Bed: props.userData?.hstl_Bed,
        joining_date: props.userData?.joining_Date,
        AdvanceAmount: props.userData?.AdvanceAmount,
        RoomRent: props.userData?.RoomRent,
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
    }
  }, [ProfilePic, file, props.userData]);



  useEffect(() => {
    const base64Pic = state.UsersList?.KycCustomerDetails?.pic;

    if (base64Pic && base64Pic !== "null" && base64Pic !== undefined) {
      setFile(base64Pic);

    }
  }, [state.UsersList?.KycCustomerDetails?.pic]);
  useEffect(() => {
    const rawAddress = state.UsersList.KycCustomerDetails?.address || "";

    if (rawAddress) {
      const parts = rawAddress.split(",").map((part) => part.trim());


      const addressParts = parts.slice(1);


      const pincodePart = addressParts[addressParts.length - 1];
      const statePart = addressParts[addressParts.length - 2];
      const cityPart = addressParts[addressParts.length - 3];


      const others = addressParts.slice(0, addressParts.length - 3);
      const [streetNumber, streetName, areaPart, landmarkPart] = others;

      setHouseNo(`${streetNumber} ${streetName}`);
      setStreet(areaPart);
      setLandmark(landmarkPart);
      setCity(cityPart);
      setStateName(statePart);
      setPincode(pincodePart);
    }
  }, [state.UsersList.KycCustomerDetails?.address]);



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
    if (state.UsersList.editBasicSuccessStatusCode === 200) {
      dispatch({ type: "USERLIST", payload: { hostel_id: state.login.selectedHostel_Id } });
      dispatch({ type: "CUSTOMERDETAILS", payload: { customerId: CustomerOverView?.customerId } });
      setEditBasicDetailsShow(false)
      setEditAddressDetailsShow(false)
      setTimeout(() => {
        dispatch({ type: "REMOVE_EDIT_BASIC_DETAILS" });
      }, 100);
    }
  }, [state.UsersList.editBasicSuccessStatusCode]);


  useEffect(() => {
    if (state.UsersList.addCheckoutCustomerStatusCode === 201) {
      dispatch({ type: "CUSTOMERDETAILS", payload: { customerId: CustomerOverView?.customerId } });
      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_CHECKOUT_CUSTOMER" });
      }, 1000);
    }
  }, [state.UsersList.addCheckoutCustomerStatusCode])

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

  // const handleContactEdit = (u) => {
  //   setEditAdditional(true);
  //   setContactEdit(u);
  //   setAdditionalForm(true);
  // };


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
  const handleChangesupload = (event, newValue) => {
    setDocumentValue(newValue);

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
            id: entry.id || ""

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

  const handleCustomerReAssign = (reuser) => {
    if (reuser?.customerId) {
      dispatch({ type: "CUSTOMERDETAILS", payload: { customerId: reuser?.customerId } });
    }
    setReasignDetail(reuser);
    setCustomerReAssign(true);
  };

  const handleCheckoutGenrateNew = (item) => {
    navigate(`/tenant/final-settlement/${item?.customerId}`, {
      state: {
        data: item
      }
    });
  }

  const handleBacktoCheckout = (item) => {
    setEditObj(item);
    setBacktoCheckInForm(true)

  }

  const handleCloseBackToCheckIn = () => {
    dispatch({ type: 'REMOVE_CANCEL_CHECKOUT_ERROR' })
    setBacktoCheckInForm(false)
  }

  const handleConformCheckout = (item) => {
    setDueCustomerShow(true)
    setCheckOutDetails(item)

  }
  const handleCloseDuePopup = () => {
    setDueCustomerShow(false)
  }


  useEffect(() => {
    if (state.UsersList.cancelCheckoutStatusCode === 200) {
      setBacktoCheckInForm(false)
      dispatch({ type: "CUSTOMERDETAILS", payload: { customerId: CustomerOverView?.customerId } });
    }

  }, [state.UsersList.cancelCheckoutStatusCode])


  const handleUpdateChange = () => {
    dispatch({ type: 'REMOVE_TENANT_UPDATE_ERROR' })
    setShowUpdateRentForm(true)
  }


  const handleCloseUpdateChange = () => {
    dispatch({ type: 'REMOVE_TENANT_UPDATE_ERROR' })
    setShowUpdateRentForm(false)
  }


  const handleUpdateAdvanceChange = () => {
    setShowUpdateAdvanceForm(true)
  }


  const handleCloseUpdateAdvanceChange = () => {
    setShowUpdateAdvanceForm(false)
    dispatch({ type: 'REMOVE_EDIT_ADVANCE_ERROR' })
  }

  const handleUpdateJoiningChange = () => {
    dispatch({ type: 'REMOVE_TENANT_UPDATE_ERROR' })
    setShowUpdateJoiningForm(true)
  }


  const handleCloseUpdateJoiningChange = () => {
    dispatch({ type: 'REMOVE_TENANT_UPDATE_ERROR' })
    setShowUpdateJoiningForm(false)
  }



  useEffect(() => {
    if (state?.UsersList.editAmountSuccessStatusCode === 200) {
      dispatch({ type: "CUSTOMERDETAILS", payload: { customerId: CustomerOverView?.customerId } });
      setShowUpdateJoiningForm(false)
      setShowUpdateAdvanceForm(false)
      setShowUpdateRentForm(false)
      setTimeout(() => {
        dispatch({ type: 'REMOVE_EDIT_AMOUNT_DETAILS' })
      }, 100)


    }
  }, [state?.UsersList.editAmountSuccessStatusCode])

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
            id: entry.id
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

  // const aadharInputRef = useRef(null);
  // const otherDocInputRef = useRef(null);
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
      state.UsersList.hostelList &&
      state.UsersList.hostelList.filter(
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
    if (Rooms) {
      dispatch({
        type: "BEDNUMBERDETAILS",
        payload: {
          hostelId: state.login.selectedHostel_Id,
        },
      });
    }
  }, [Rooms]);

  const handleRooms = (selectedOption) => {
    const roomIdValue = selectedOption?.value || "";
    setRoomId(roomIdValue);

    // dispatch({
    //   type: "BEDNUMBERDETAILS",
    //   payload: {
    //     hostelId: state.login.selectedHostel_Id,
    //   },
    // });
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



  useEffect(() => {
    if (state.UsersList.editAdvanceStatusCode === 200) {
      setShowUpdateAdvanceForm(false)
      dispatch({ type: "CUSTOMERDETAILS", payload: { customerId: CustomerOverView?.customerId } });
      setTimeout(() => {
        dispatch({ type: 'REMOVE_EDIT_ADVANCE' })
      }, 100)
    }
  }, [state.UsersList.editAdvanceStatusCode])


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

  // const [generateForm, seGenerateForm] = useState(false);

  // const handlegenerateForm = () => {
  //   seGenerateForm(true);
  // };


  useEffect(() => {
    if (state.UsersList.phoneError) {
      setFormLoading(false)
      setLoading(false)
      setPhoneError(state.UsersList.phoneError);
    }
  }, [state.UsersList.phoneError]);

  // const handleCloseGenerateFormShow = () => {
  //   // seGenerateForm(false);
  //   setAdvanceDateError("");
  //   setAdvanceDueDateError("");
  //   setAdvanceDate("");
  //   setAdvanceDueDate("");
  // };

  // const handleGenerateAdvance = () => {
  //   let hasError = false;

  //   if (!advanceDate) {
  //     setAdvanceDateError("Please Select Invoice Date");
  //     hasError = true;
  //   } else {
  //     setAdvanceDateError("");
  //   }

  //   if (!advanceDueDate) {
  //     setAdvanceDueDateError("Please Select Due Date");
  //     hasError = true;
  //   } else {
  //     setAdvanceDueDateError("");
  //   }


  //   if (advanceDate && advanceDueDate && advanceDetail[0]?.joining_Date) {
  //     const joiningDate = dayjs(advanceDetail[0].joining_Date).startOf("day");
  //     const invoiceDate = dayjs(advanceDate).startOf("day");
  //     const dueDate = dayjs(advanceDueDate).startOf("day");

  //     if (invoiceDate.isBefore(joiningDate)) {
  //       setAdvanceDateError("Before Join Date Not Allowed");
  //       hasError = true;
  //     }

  //     if (dueDate.isBefore(invoiceDate)) {
  //       setAdvanceDueDateError("Due Date after Invoice Date only");
  //       hasError = true;
  //     }
  //   }
  //   if (hasError) {
  //     return;
  //   }
  //   const formattedInvoiceDate = formatDate(advanceDate);
  //   const formattedDueDate = formatDate(advanceDueDate);

  //   dispatch({
  //     type: "ADVANCEGENERATE",
  //     payload: {
  //       user_id: props.id,
  //       invoice_date: formattedInvoiceDate,
  //       due_date: formattedDueDate,
  //       isadvance: 1
  //     },
  //   });
  // };
  // const formatDate = (dateObj) => {
  //   const date = new Date(dateObj);
  //   const year = date.getFullYear();
  //   const month = String(date.getMonth() + 1).padStart(2, "0");
  //   const day = String(date.getDate()).padStart(2, "0");
  //   return `${year}-${month}-${day}`;
  // };
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


    const normalizeFields = (current, initial) => {
      const currentMap = current.reduce((map, item) => {
        map[item.id] = { ...item, amount: String(item.amount).trim(), isDeleted: !!item.isDeleted };
        return map;
      }, {});

      return initial.map((initialItem) => {
        const currentItem = currentMap[initialItem.id];
        if (currentItem) {
          return {
            reason_name: currentItem.reason_name,
            amount: currentItem.amount,
            customReason: currentItem.customReason,
            showInput: currentItem.showInput,
            id: currentItem.id,
            isDeleted: !!currentItem.isDeleted,
          };
        } else {

          return {
            reason_name: initialItem.reason_name,
            amount: String(initialItem.amount).trim(),
            customReason: initialItem.customReason,
            showInput: initialItem.showInput,
            id: initialItem.id,
            isDeleted: true,
          };
        }
      }).concat(

        current.filter(item => !initial.some(init => init.id === item.id)).map(item => ({
          reason_name: item.reason_name,
          amount: String(item.amount).trim(),
          customReason: item.customReason,
          showInput: item.showInput,
          id: item.id,
          isDeleted: !!item.isDeleted,
        }))
      );
    };



    const normalizedCurrent = normalizeFields(fields, initialReasonFields);
    const normalizedInitial = normalizeFields(initialReasonFields, initialReasonFields);

    const isReasonChanged =
      JSON.stringify(normalizedCurrent) !== JSON.stringify(normalizedInitial);


    if (!isChangedBed && !isReasonChanged) {
      setFormError("No Changes Detected");
      return;
    } else {
      setFormError("");
    }

    handleOpenAdvance()


    setLoading(true)
    setFormShow(false);
    // dispatch({ type: "INVOICELIST" });
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

      if (!item.isDeleted) {
        if (reason_name && (!item.amount || item.amount.toString().trim() === "")) {
          error.amount = "Please enter amount";
          hasReasonAmountError = true;
        }

        if ((!reason_name || reason_name.toString().trim() === "") && item.amount) {
          error.reason = "Please enter reason";
          hasReasonAmountError = true;
        }
      }

      newErrors.push(error);

      return {
        reason_name,
        amount: item.amount || "",
        showInput: !!item.showInput,
        id: item.id || "",
        isDeleted: item.isDeleted ? true : undefined,
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

      if (!item.isDeleted) {
        if (reason_name && (!item.amount || item.amount.toString().trim() === "")) {
          error.amount = "Please enter amount";
          hasReasonAmountError = true;
        }

        if ((!reason_name || reason_name.toString().trim() === "") && item.amount) {
          error.reason = "Please enter reason";
          hasReasonAmountError = true;
        }
      }

      newErrors.push(error);

      return {
        reason_name,
        amount: item.amount || "",
        showInput: !!item.showInput,
        id: item.id || "",
        isDeleted: item.isDeleted ? true : undefined,
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
    if (state.UsersList.statusCodeForAddUser === 201) {
      dispatch({ type: "USERLIST", payload: { hostel_id: hostel_Id } });
      dispatch({ type: "CUSTOMERALLDETAILS", payload: { user_id: props.id } });
      setFormLoading(false)
      setLoading(false)

      handleCloseEditcustomer();



      setTimeout(() => {
        dispatch({ type: "CLEAR_STATUS_CODES" });
      }, 100);
    }
  }, [state.UsersList.statusCodeForAddUser, state.UsersList.Users.listCustomers]);

  useEffect(() => {
    if (state.UsersList.customerdetails) {
      setAdvanceDetail(state.UsersList.customerdetails);
    }
  }, [state.UsersList.customerdetails]);



  // const [uploadError, setUploadError] = useState("");

  // useEffect(() => {
  //   setUploadError(state.UsersList.adharuploadfileError);
  // }, [state.UsersList.adharuploadfileError]);

  // const handleFileChange = (e, type) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     if (type === "doc1") {
  //       dispatch({
  //         type: "UPLOADDOCUMENT",
  //         payload: {
  //           user_id: props.id,
  //           type,
  //           file1: file,
  //         },
  //       });
  //     } else if (type === "doc2") {
  //       dispatch({
  //         type: "UPLOADOTHERDOCUMENT",
  //         payload: {
  //           user_id: props.id,
  //           type,
  //           file1: file,
  //         },
  //       });
  //     }
  //   }
  // };

  // const handleUploadClick = (ref) => {
  //   if (ref?.current) {
  //     ref.current.click();
  //   }
  //   setUploadError("");
  //   dispatch({ type: "CLEAR_ADHAR_UPLOAD_ERROR" });
  // };



  // useEffect(() => {
  //   if (state.UsersList.statuscodeForAdharFileError === 201) {
  //     setUploadError(state.UsersList.adharuploadfileError);
  //     setTimeout(() => {
  //       dispatch({ type: "CLEAR_ADHAR_UPLOAD_ERROR_STATUSCODE" });
  //     }, 100);
  //   }
  // }, [state.UsersList.statuscodeForAdharFileError]);


  // const handleOtherUploadClick = (ref) => {
  //   ref.current.click();
  // };

  useEffect(() => {
    if (state.UsersList.statusCodeForUploadDocument === 200) {
      dispatch({ type: "CUSTOMERDETAILS", payload: { customerId: CustomerOverView?.customerId } });
      setTimeout(() => {
        dispatch({ type: "CLEAR_UPLOAD_DOCUMENT" });
        dispatch({ type: "CLEAR_ADHAR_UPLOAD_ERROR_STATUSCODE" });
        dispatch({ type: "CLEAR_ADHAR_UPLOAD_ERROR" });
      }, 500);
    }
  }, [state.UsersList.statusCodeForUploadDocument]);

  useEffect(() => {
    if (state.UsersList.statusCodeForOtherDocu === 200) {
      dispatch({ type: "CUSTOMERDETAILS", payload: { customerId: CustomerOverView?.customerId } });
      setTimeout(() => {
        dispatch({ type: "CLEAR_UPLOAD_OTHER_DOCUMENT" });
      }, 100);
    }
  }, [state.UsersList.statusCodeForOtherDocu]);

  // const [contactDeleteId, setContactDeleteId] = useState("");

  // const handleContactDelete = (v) => {
  //   setDeleteAdditional(true);
  //   setContactDeleteId(v.id);
  // };
  const handleCloseDelete = () => {
    setDeleteAdditional(false);
  };

  const handleDeleteContact = () => {
    // dispatch({ type: "CONTACTDELETE", payload: { id: contactDeleteId } });
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
      // handleCloseGenerateFormShow();
      dispatch({ type: "CUSTOMERDETAILS", payload: { customerId: CustomerOverView?.customerId } });
      dispatch({ type: "USERLIST", payload: { hostel_id: hostel_Id } });
      setTimeout(() => {
        dispatch({ type: "REMOVE_GENERATE_ADVANCE" });
      }, 500);
    }
  }, [state.UsersList.statusCodeForGenerateAdvance]);

  useEffect(() => {
    if (state.Booking.StatusCodeInactiveCode === 200) {
      dispatch({ type: "CUSTOMERDETAILS", payload: { customerId: CustomerOverView?.customerId } });
      setTimeout(() => {
        dispatch({ type: 'CLEAR_BOOKING_InActive' })
      }, 1000)
    }

  }, [state.Booking.StatusCodeInactiveCode])

  useEffect(() => {
    if (state.UsersList.statusCodeForDueCustomer === 200 || state.UsersList.statusCodeAddConfirmCheckout === 200) {
      navigate(`/tenant/${state.login.selectedHostel_Id}`)
      setTimeout(() => {
        dispatch({ type: "REMOVE_CONFIRM_CHECKOUT_DUE_CUSTOMER" });
      }, 500);
    }

  }, [state.UsersList.statusCodeForDueCustomer, state.UsersList.statusCodeAddConfirmCheckout])









  const handleClose = () => {
    setShowModal(false);
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




  const handleRemoveField = (index) => {
    const updatedFields = [...fields];
    updatedFields[index] = {
      ...updatedFields[index],
      isDeleted: true,
    };
    setFields(updatedFields);
  };









  const handleEditBasicDetails = (item) => {
    setBasicDetails(item)
    setEditBasicDetailsShow(true)
    setCountryCode("91")

  };
  const handleCloseBasicDetails = () => {
    setEditBasicDetailsShow(false)
    dispatch({ type: 'REMOVE_ALREADY_MOBILE_BASIC_ERROR' })
  }
  const [addressDetails, setAddressDetails] = useState("")
  const handleEditAddressDetailsShow = (item) => {
    setEditAddressDetailsShow(true)
    setAddressDetails(item)

  };
  const handleCloseAddressDetails = () => {
    setEditAddressDetailsShow(false)
  }
  // const [stayDetais, setStayDetails] = useState("")

  // const handleEditStayDetails = (item) => {
  //   setEditStayDetailsShow(true)
  //   setStayDetails(item)

  // };
  const handleCloseStayDetails = () => {
    setEditStayDetailsShow(false)
  }

  const handleShowStayHistory = () => {
    setStayDetailsShow(true)
  }
  const handleCloseStayHistory = () => {
    setStayDetailsShow(false)
  }



  // const MobileNumberupload = `${props.userData?.Phone}`;


  const handleImageUpload = async (event) => {
    const fileImage = event.target.files[0];
    if (!fileImage) return;


    try {
      if (fileImage) {
        dispatch({
          type: "EDITBASICDETAILS",
          payload: {
            customerId: CustomerOverView?.customerId,
            payloads: {
              firstName: CustomerOverView?.firstName || "",
              lastName: CustomerOverView?.lastName || "",
              mailId: CustomerOverView?.emailId || "",
            },
            profilePic: fileImage || "",
          },
        });
      }
    } catch (error) {
      console.error("Image compression error:", error);
    }
  };

  const kycPic = state.UsersList?.KycCustomerDetails?.pic;

  const CustomerOverView = state.UsersList.customerdetails;

  console.log("CustomerOverView", CustomerOverView)

  const imageUrl = kycPic
    ? kycPic.startsWith("data:image")
      ? kycPic
      : `data:image/jpeg;base64,${kycPic}`
    : CustomerOverView?.profilePic
      ? CustomerOverView?.profilePic
      : null;


  console.log("CustomerOverView", CustomerOverView)



  // const handleFileUpload = (index, e) => {
  //   const file = e.target.files[0];

  //   if (!file) return;

  //   const updatedDoc = {
  //     name: file.name,
  //     size: `${Math.round(file.size / 1024)} KB`,
  //     type: file.name.split(".").pop().toUpperCase(),
  //   };

  //   const newDocuments = [...documents];
  //   newDocuments[index] = updatedDoc;
  //   setDocuments(newDocuments);
  // };


  const handleCustomerCheckout = (item) => {
    setCustomerCheckoutpage(true);
    setCustomerCheckoutData(item);
  };



  useEffect(() => {
    setAdvanceList(state.UsersList.customerdetails?.advanceInfo);
  }, [state.UsersList.customerdetails.advanceInfo]);


  const handleShowAssignAmenities = () => {
    setaddamenityShow(true);
  };



  const handleCloseAddamenityShow = () => {
    setaddamenityShow(false);
  }

  // const isDisabled =
  //   !canWriteAmenities ||
  //   state.UsersList.customerdetails?.hostelInfo?.currentStatus === "BOOKED" ||
  //   state.UsersList.customerdetails?.customerCurrentStatus === "INACTIVE" ||
  //   state.UsersList.customerdetails?.customerCurrentStatus === "VACATED";


 useEffect(() => {
        if (state.InvoiceList.manualInvoiceAddStatusCode === 201 || state.InvoiceList.manualInvoiceEditStatusCode === 200) {
           dispatch({ type: "CUSTOMERDETAILS", payload: { customerId: CustomerOverView?.customerId } });
        }
    }, [state.InvoiceList.manualInvoiceAddStatusCode, state.InvoiceList.manualInvoiceEditStatusCode]);


  useEffect(() => {

    if (state.InvoiceList.tenantAssignStatus === 201 || state.InvoiceList?.tenantUnAssignStatus === 201) {
      setaddamenityShow(false);
    }

  }, [state.InvoiceList?.tenantAssignStatus, state.InvoiceList?.tenantUnAssignStatus])


  const [showPreview, setShowPreview] = useState(false);


  const handlePreview = () => {

    setShowPreview(true);
  };

  const handleClosePreview = () => {

    setShowPreview(false);
  };


  const handleNavigateTenant = () => {
    if (isPgWay) {
      navigate(`/paying-guest/${state.login.selectedHostel_Id}`);
    } else {
      navigate(`/tenant/${state.login.selectedHostel_Id}`)
    }

  }

  const handleShowWalletHistory = () => {
    setShowWalletHistory(true);
  }


  const handleCloseWallet = () => {
    setShowWalletHistory(false);
  }


  useEffect(() => {
    if (state.UsersList?.bookingToCheckinStatusCode === 200) {
      setBookingAssignForm(false)
      dispatch({ type: "CUSTOMERDETAILS", payload: { customerId: CustomerOverView?.customerId } });

      setTimeout(() => {
        dispatch({ type: 'REMOVE_BOOKING_TO_CHECKIN' })
      }, 100)
    }

  }, [state.UsersList?.bookingToCheckinStatusCode])

  // console.log("MODE:", import.meta.env.MODE);




  const handleShowBookingToCheckin = () => {
    setBookingAssignForm(true)
  }

  const handleInActive = (item) => {
    setInActiveForm(true)
    setInactiveDetails(item)
  }

  const handleCloseBooking = () => {
    setBookingAssignForm(false)
  }


  const handleCloseInActive = () => {
    dispatch({ type: 'REMOVE_ERROR_MAKEASINACTIVE' })
    setInActiveForm(false)
  }



  return (


    <>


      {
        BookingAssignForm && <BookedCheckIn BookingAssignForm={BookingAssignForm}
          handleClose={handleCloseBooking}
          bookingDetails={CustomerOverView}
        />
      }

      <div
        key={CustomerOverView?.customerId}
        className="h-[97vh] overflow-y-auto mt-2 bgpink-200 w-full max-w-full overflow-x-hidden"
      >

        <div
          className="flex items-center sticky top-0 z-[1000] bg-white py-3 px-3 sm:px-4 h-14 w-full" >
          <img
            src={leftarrow}
            alt="leftarrow"
            width={20}
            height={20}
            onClick={() => handleNavigateTenant()}
            className="cursor-pointer"
          />
          <span className="font-semibold text-lg pl-2.5 font-gilroy">
            Tenant Profile
          </span>
        </div>

        <div className="bg-white !border !border-[#E5E7EB] rounded-3xl mt-3 p-3 w-[95%] max-w-7xl mx-auto">
          <div
            className="flex flex-col md:flex-row items-center justify-between"
          >
            <div
              className="flex items-center py-0 md:py-2"
            >

              <div
                className="relative w-12 h-12 mr-2.5"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={CustomerOverView.fullName || "Default Profile"}
                    className="w-12 h-12 rounded-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = Profiles;
                    }}
                  />
                ) : (

                  <div
                    className="flex w-12 h-12 rounded-full bg-slate-200 text-[#44536A] flex items-center justify-center text-xl font-semibold font-gilroy"
                  >
                    {CustomerOverView?.initials
                      ? CustomerOverView.initials
                      : CustomerOverView?.fullName
                        ? CustomerOverView.fullName
                          .split(" ")
                          .map((w) => w[0]?.toUpperCase())
                          .join("")
                        : "NA"}
                  </div>
                )}

                {!state.UsersList?.KycCustomerDetails?.pic && isHovered && (
                  <div
                    className="absolute inset-0 rounded-full flex items-center justify-center bg-black/30 cursor-pointer"
                    onClick={() => {
                      if (!state.UsersList?.KycCustomerDetails?.pic) {
                        document.getElementById("fileInput").click();
                      }
                    }}
                  >
                    <div className="bg-white rounded-full p-1.5 flex items-center justify-center"
                    >
                      <img
                        src={EditImage}
                        alt="Edit"
                        className="w-4 h-4"
                      />
                    </div>
                  </div>
                )}

                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>







              <div className="ml-2.5">

                <span
                  className="text-xl font-semibold font-gilroy mb-0 block truncate max-w-[200px] cursor-pointer"
                  title={CustomerOverView.fullName}
                >
                  {CustomerOverView.fullName}
                </span>


                {state.UsersList?.KycCustomerDetails?.message === "KYC Completed" &&
                  <>
                    <Button
                      disabled={!canWriteTenant}
                      type="primary"
                      className="rounded-2xl bg-[#1E45E1] border-0 px-4 h-8 flex items-center text-sm"
                    >
                      KYC Verified
                    </Button>
                  </>
                }



                {state.UsersList?.KycCustomerDetails?.retry_completed === false &&
                  <>
                    <Button
                      className="rounded-2xl bg-amber-500 border-0 px-4 h-8 flex items-center text-sm text-white"
                    >
                      <img src={timehalf} alt="time" className="w-4 mr-2" />
                      Pending
                    </Button>
                    <p

                      className="text-sm font-normal font-gilroy mt-1"
                    >
                      Last Attempt: {state.UsersList?.KycCustomerDetails?.updated_at}
                    </p>
                  </>
                }

                {state.UsersList?.KycCustomerDetails?.retry_completed === true &&
                  <>
                    <Button
                      onClick={handleKYCSubmit}

                      className="rounded-xl bg-blue-600 border-0 px-4 h-8 flex items-center text-sm text-white"

                    >
                      <img src={Retry} alt="time" className="w-4 mr-2" />
                      Retry KYC
                    </Button>
                    <p className="text-sm font-normal font-gilroy mt-1"
                    >
                      Last Attempt: {state.UsersList?.KycCustomerDetails?.updated_at}
                    </p>
                  </>
                }

                {
                  state.UsersList?.KycCustomerDetails?.message === "KYC ID not found for this customer" &&
                  <>
                    <Button
                      disabled={!canWriteTenant}
                      type="primary"
                      className="rounded-2xl bg-[#1E45E1] border-0 px-4 h-8 flex items-center text-sm font-gilroy"
                      onClick={handleKYCSubmit}
                    >
                      Verify KYC <RightOutlined className="text-xs ml-1.5 font-gilroy" />
                    </Button>
                    <p className="text-sm font-normal font-gilroy mt-1"
                    >
                      Verify your Customer KYC Details via DigiLocker.
                    </p>
                  </>
                }




              </div>
            </div>


            <div className="flex gap-4 items-center">


              <div className="relative font-gilroy">
                <button
                  onClick={() =>
                    setOpenMenu(!openMenu)
                  }
                  className="p-1 "
                >
                  <PiDotsThreeOutlineVerticalFill size={18} />
                </button>

                {openMenu && (
                  <div className="absolute right-0 mt-2 w-fit whitespace-nowrap rounded-md bg-white shadow-lg border border-gray-200 z-20">


                    {
                      state.UsersList.customerdetails?.customerCurrentStatus === "CHECK_IN" &&
                      <>
                        <button

                          onClick={() => {
                            if (canWriteTenant) {
                              handleCustomerCheckout(CustomerOverView);
                              setOpenMenu(false);
                            }
                          }}
                          className="w-full px-3 py-2 text-left text-sm text-gary-600 hover:bg-gray-100 flex items-center gap-2"
                        >
                          <Notification1 size="18"
                            color="#1E45E1"
                          />
                          Move to Notice Period
                        </button>

                        <button
                          onClick={() => {
                            if (canWriteTenant) {
                              handleCustomerReAssign(CustomerOverView);
                              setOpenMenu(false);
                            }
                          }}
                          className="w-full px-3 py-2 text-left text-sm text-gary-600 hover:bg-gray-100 flex items-center gap-2"
                        >
                          <ArrowSwapHorizontal size={16} color="#1E45E1" />
                          Change Bed
                        </button>
                      </>
                    }

                    {
                      state.UsersList.customerdetails?.customerCurrentStatus === "NOTICE" &&
                      <>
                        <button
                          onClick={() => {
                            if (canWriteTenant) {
                              handleCheckoutGenrateNew(CustomerOverView);
                              setOpenMenu(false);
                            }
                          }}

                          className="w-full px-3 py-2 text-left text-sm text-gary-600 hover:bg-gray-100 flex items-center gap-2"
                        >
                          <LogoutCurve size="18"
                            color="#1E45E1"
                          />
                          Generate
                        </button>

                        <button
                          onClick={() => {
                            if (canWriteTenant) {
                              handleBacktoCheckout(CustomerOverView);
                              setOpenMenu(false);
                            }
                          }}

                          className="w-full px-3 py-2 text-left text-sm text-gary-600 hover:bg-gray-100 flex items-center gap-2"
                        >
                          <Calendar2 size="18"
                            color="#1E45E1"
                            variant="Bold" />
                          Cancel Check-Out
                        </button>
                      </>
                    }
                    {
                      state.UsersList.customerdetails?.customerCurrentStatus === "SETTLEMENT_GENERATED" &&
                      <>
                        <button

                          onClick={() => {
                            if (canWriteTenant) {
                              handleConformCheckout(CustomerOverView);
                              setOpenMenu(false);
                            }
                          }}
                          className="w-full px-3 py-2 text-left text-sm text-gary-600 hover:bg-gray-100 flex items-center gap-2"
                        >
                          <LogoutCurve size="18"
                            color="#1E45E1"
                          />
                          Check-Out
                        </button>
                      </>
                    }

                    {import.meta.env.MODE === "development" &&
                      state.UsersList.customerdetails?.customerCurrentStatus !== "BOOKED" &&

                      <button
                        onClick={() => {
                          handleShowWalletHistory();
                          setOpenMenu(null);
                        }}
                        className="w-full px-3 py-2 text-left text-sm text-gary-600 hover:bg-gray-100 flex items-center gap-2"
                      >
                        <WalletCheck
                          size="18"
                          color="#16A34A"
                          variant="Bold"
                        />   Wallet
                      </button>
                    }

                    {
                      state.UsersList.customerdetails?.customerCurrentStatus === "BOOKED" &&
                      <>
                        <button onClick={() => {
                          handleShowBookingToCheckin();
                          setOpenMenu(null);
                        }}
                          type="button"
                          className="w-full px-3 py-2 text-left text-sm text-gary-600 hover:bg-gray-100 flex items-center gap-2"
                        >
                          <AddCircle size="18"
                            color="#1E45E1" />
                          Check-In
                        </button>

                        <button

                          onClick={() => {
                            if (canWriteTenant) {
                              handleInActive(CustomerOverView);
                              setOpenMenu(false);
                            }
                          }}
                          className="w-full px-3 py-2 text-left text-sm text-gary-600 hover:bg-gray-100 flex items-center gap-2"
                        >
                          <LogoutCurve size="18"
                            color="#1E45E1"
                          />
                          Make as Inactive
                        </button>
                      </>
                    }

                  </div>
                )}
              </div>

            </div>
          </div>
        </div>

        <TabContext value={value}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full">
            <Box
              sx={{ borderBottom: 0, borderColor: "divider" }}
            >
              <TabList
                orientation={
                  isSmallScreen ? "vertical" : "horizontal"
                }

                onChange={handleChanges}
                aria-label="lab API tabs example"
                // className="d-flex flex-column flex-xs-column flex-sm-column flex-lg-row my-4 sm:my-8 ml-2 sm:ml-5"
                className="d-flex flex-column flex-xs-column flex-sm-column flex-lg-row my-4 sm:my-8 ml-2 sm:ml-5"

              >
                <Tab
                  label="Overview"
                  value="1"
                  className={`!text-[17px] !font-gilroy !leading-normal !not-italic !font-medium !normal-case ${value === "1" ?
                    "!text-[#222222]" : "!text-[#6B6B6B]"

                    }`}
                />
                <Tab
                  label="EB Reading"
                  value="2"
                  className={`!text-[17px] !font-gilroy !leading-normal !not-italic !font-medium !normal-case ${value === "2" ? "!text-[#222222]" : "!text-[#6B6B6B]"}`}
                />
                <Tab
                  label="Bill"
                  value="3"
                  className={`!text-[17px] !font-gilroy !leading-normal !not-italic !font-medium !normal-case ${value === "3" ? "!text-[#222222]" : "!text-[#6B6B6B]"}`}
                />

                <Tab
                  label="Transactions"
                  value="4"
                  className={`!text-[17px] !font-gilroy !leading-normal !not-italic !font-medium !normal-case ${value === "4" ? "!text-[#222222]" : "!text-[#6B6B6B]"}`}
                />
              </TabList>
            </Box>
          </div>
          <TabPanel value="1" className="px-4 sm:px-0 mt-2 w-full max-w-full">
            <>
              <div className="flex flex-col lg:flex-row w-full gap-4 items-stretch mb-4">

                <div className="w-full lg:w-[420px] flex flex-col gap-2">
                  <div className="flex-1 bg-white h-auto max-h-[300px] overflow-y-auto border border-[#E5E7EB] rounded-[20px] p-3">
                    <div className="flex items-center justify-between border-b border-gray-300 pb-1 mb-3">
                      <div className="text-[16px] font-gilroy font-semibold">
                        Basic Details
                      </div>
                      <div className={!canUpdateTenant ? "cursor-not-allowed opacity-60" : "cursor-pointer"}>
                        <div
                          onClick={() => {
                            if (canUpdateTenant) {
                              handleEditBasicDetails(CustomerOverView);
                            }
                          }}
                          className={`h-10 w-10 flex items-center justify-center relative z-[1000] ${!canUpdateTenant ? "cursor-not-allowed" : "cursor-pointer"}`}
                        >
                          <img
                            src={EditImage}
                            alt="editimage"
                            className="h-4 w-4"
                            style={{
                              filter: !canUpdateTenant ? "grayscale(100%)" : "none",
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="w-full max-w-[640px] mx-auto">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                        <div className="flex flex-col">
                          <p className="text-xs font-medium font-gilroy text-gray-500">
                            First Name
                          </p>
                          <p className="text-sm font-semibold font-gilroy truncate hover:whitespace-normal hover:overflow-visible">
                            {CustomerOverView?.firstName || "-"}
                          </p>
                        </div>

                        <div className="flex flex-col sm:pl-6">
                          <p className="text-xs font-medium font-gilroy text-gray-500">
                            Last Name
                          </p>
                          <p className="text-sm font-semibold font-gilroy break-words">
                            {CustomerOverView?.lastName || "-"}
                          </p>
                        </div>

                        <div className="flex flex-col">
                          <p className="text-xs font-medium font-gilroy text-gray-500">
                            Email ID
                          </p>
                          <div className="flex items-center gap-2">
                            <Sms size={16} color="#1E45E1" className="shrink-0" />
                            <span className="text-sm font-semibold font-gilroy break-all">
                              {CustomerOverView?.emailId || "N/A"}
                            </span>
                          </div>
                        </div>


                        <div className="flex flex-col sm:pl-6">
                          <p className="text-xs font-medium font-gilroy text-gray-500">
                            Mobile No
                          </p>
                          <div className="flex items-center gap-2">
                            <Call size={16} color="#1E45E1" className="shrink-0" />
                            <span className="text-sm font-semibold font-gilroy whitespace-nowrap">
                              {CustomerOverView?.mobileNo
                                ? `+${CustomerOverView.countryCode} ${CustomerOverView.mobileNo}`
                                : "-"}
                            </span>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>


                  <div className="flex-1 bg-white h-auto max-h-[240px] overflow-y-auto border border-[#E5E7EB] rounded-[20px] p-4">

                    <div className="card-header flex justify-between items-center border-0 bg-transparent" >
                      <div className="card-header p-0 border-0 bg-transparent w-full">
                        <div className="flex items-center justify-start gap-4 w-full border-0 -mt-2">
                          <div
                            onClick={() => setActiveTab("kyc")}
                            className={`flex items-center cursor-pointer px-3 py-1.5 font-semibold 
    ${activeTab === "kyc" ? "border-b-2 border-[#1E45E1] text-[#1E45E1]" : "border-b-2 border-transparent text-[#555]"} font-gilroy whitespace-nowrap`}
                          >
                            KYC Address
                          </div>


                          <div
                            onClick={() => setActiveTab("manual")}
                            className={`flex items-center cursor-pointer px-3 py-1.5 font-semibold 
    ${activeTab === "manual" ? "border-b-2 border-[#1E45E1] text-[#1E45E1]" : "border-b-2 border-transparent text-[#555]"} font-gilroy whitespace-nowrap`}
                          >
                            Manual Address
                          </div>
                          {activeTab === "manual" &&
                            <span className={`${!canUpdateTenant ? "cursor-not-allowed opacity-60" : "cursor-pointer opacity-100"}`} >
                              <div
                                onClick={() => {
                                  if (canUpdateTenant) {
                                    handleEditAddressDetailsShow(CustomerOverView);
                                  }
                                }}
                                className="h-10 w-10 flex justify-center items-center relative z-[1000]"
                              >
                                <img
                                  src={EditImage}
                                  alt="edit"
                                  className={`h-4 w-4 ${!canUpdateTenant ? "text-gray-300" : "text-black"}`}
                                />
                              </div>
                            </span>

                          }
                        </div>
                      </div>




                    </div>


                    <div >
                      {
                        activeTab === "manual" ?
                          <div>
                            <div className="flex flex-wrap p-0 mt-3" >
                              <div className="w-full sm:w-1/2 flex flex-col items-start">
                                <p className="text-xs font-medium font-gilroy" >
                                  House No / Apartment
                                </p>
                                <div className="flex items-center gap-2 -mt-3">
                                  <House size="18" color="#1E45E1" />
                                  <span className="text-sm font-semibold font-gilroy mt-1">
                                    {CustomerOverView.address?.houseNo}
                                  </span>
                                </div>
                              </div>

                              <div className="w-full sm:w-1/2 flex flex-col items-start">
                                <p className="text-xs font-medium font-gilroy" >
                                  Street / Area
                                </p>
                                <div className="flex items-center gap-2 -mt-3">
                                  <img src={Areaimage} alt="area" className="w-4 h-4" />
                                  <span className="text-sm font-semibold font-gilroy truncate mt-1 max-w-xs"
                                    title={CustomerOverView.address?.streetName}
                                  >
                                    {CustomerOverView.address?.streetName}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-wrap mt-3">
                              <div className="w-full sm:w-1/2 flex flex-col items-start">
                                <p className="text-xs font-medium font-gilroy">
                                  Landmark
                                </p>
                                <div className="flex items-center gap-2 -mt-3">
                                  <img src={Landamrkimage} alt="landmark" className="w-4 h-4" />
                                  <span className="text-sm font-semibold font-gilroy truncate mt-1 max-w-xs">
                                    {CustomerOverView.address?.landmark}
                                  </span>
                                </div>
                              </div>

                              <div className="w-full sm:w-1/2 flex flex-col items-start">
                                <p className="text-xs font-medium font-gilroy">
                                  Pincode
                                </p>
                                <div className="flex items-center gap-2 -mt-3">
                                  <img src={PincodeImage} alt="pincode" className="w-4 h-4" />
                                  <span className="text-sm font-semibold font-gilroy truncate mt-1 max-w-xs">
                                    {CustomerOverView.address?.pincode}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-wrap mt-3">
                              <div className="w-full sm:w-1/2 flex flex-col items-start">
                                <p className="text-xs font-medium font-gilroy">
                                  City
                                </p>
                                <div className="flex items-center gap-2 -mt-3">
                                  <img src={CityImage} alt="city" className="w-4 h-4" />
                                  <span className="text-sm font-semibold font-gilroy truncate mt-1 max-w-xs">
                                    {CustomerOverView.address?.city}
                                  </span>
                                </div>
                              </div>
                              <div className="w-full sm:w-1/2 flex flex-col items-start">
                                <p className="text-xs font-medium font-gilroy">
                                  State
                                </p>
                                <div className="flex items-center gap-2 -mt-3">
                                  <img src={CityImage} alt="state" className="w-4 h-4" />
                                  <span className="text-sm font-semibold font-gilroy truncate max-w-xs">
                                    {CustomerOverView.address?.state}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          :
                          <div>
                            <div className="flex flex-wrap mt-3">
                              <div className="w-full sm:w-1/2 flex flex-col items-start">
                                <p className="text-xs font-medium font-gilroy">
                                  House No / Apartment
                                </p>
                                <div className="flex items-center gap-2 -mt-3">
                                  <House size="18" color="#1E45E1" />
                                  <span className="text-sm font-semibold font-gilroy truncate max-w-xs">
                                    {/* {CustomerOverView.address?.houseNo} */}
                                  </span>
                                </div>
                              </div>

                              <div className="w-full sm:w-1/2 flex flex-col items-start">
                                <p className="text-xs font-medium font-gilroy">
                                  Street / Area
                                </p>
                                <div className="flex items-center gap-2 -mt-3">
                                  <img src={Areaimage} alt="area" className="w-4 h-4" />
                                  <span className="text-sm font-semibold font-gilroy truncate max-w-xs">
                                    {/* {CustomerOverView.address?.streetName} */}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-wrap mt-3">
                              <div className="w-full sm:w-1/2 flex flex-col items-start">
                                <p className="text-xs font-medium font-gilroy">
                                  Landmark
                                </p>
                                <div className="flex items-center gap-2 -mt-3">
                                  <img src={Landamrkimage} alt="landmark" className="w-4 h-4" />
                                  <span className="text-sm font-semibold font-gilroy truncate max-w-xs">
                                    {/* {CustomerOverView.address?.landmark} */}
                                  </span>
                                </div>
                              </div>

                              <div className="w-full sm:w-1/2 flex flex-col items-start">
                                <p className="text-xs font-medium font-gilroy" >
                                  Pincode
                                </p>
                                <div className="flex items-center gap-2 -mt-3">
                                  <img src={PincodeImage} alt="pincode" className="w-4 h-4" />
                                  <span className="text-sm font-semibold font-gilroy truncate max-w-xs">
                                    {/* {CustomerOverView.address?.pincode} */}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-wrap mt-3">
                              <div className="w-full sm:w-1/2 flex flex-col items-start">
                                <p className="text-xs font-medium font-gilroy">
                                  City
                                </p>
                                <div className="flex items-center gap-2 -mt-3">
                                  <img src={CityImage} alt="city" className="w-4 h-4" />
                                  <span className="text-sm font-semibold font-gilroy truncate max-w-xs">
                                    {/* {CustomerOverView.address?.city} */}
                                  </span>
                                </div>
                              </div>

                              <div className="w-full sm:w-1/2 flex flex-col items-start">
                                <p className="text-xs font-medium font-gilroy">
                                  State
                                </p>
                                <div className="flex items-center gap-2 -mt-3">
                                  <img src={CityImage} alt="state" className="w-4 h-4" />
                                  <span className="text-sm font-semibold font-gilroy truncate max-w-xs" >
                                    {/* {CustomerOverView.address?.state} */}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                      }


                    </div>
                  </div>



                  <div className="flex-1 bg-white relative h-auto max-h-[200px] overflow-y-auto border border-[#E5E7EB] rounded-[20px]">
                    <TabContext value={documentvalue}
                      className="flex flex-col sm:flex-row justify-center items-center"

                    >
                      <Box
                        sx={{ borderBottom: 0, borderColor: "divider", }}
                        className="sticky top-0 z-[999] bg-white"
                      >
                        <div className="flex flex-col sm:flex-row justify-start items-center bg-white ">
                          <TabList
                            onChange={handleChangesupload}
                            aria-label="custom tabs"
                            className="d-flex justify-content-center flex-sm-row bg-white w-full"
                            TabIndicatorProps={{ style: { display: "none", } }}
                          >
                            <Tab
                              label="KYC Documents"
                              value="1"
                              sx={{
                                textTransform: "capitalize",
                                fontSize: 16,
                                fontWeight: 600,
                                fontFamily: "Gilroy",
                                color: documentvalue === "1" ? "#1E45E1" : "#4B4B4B",
                                borderBottom:
                                  documentvalue === "1"
                                    ? "2px solid #1E45E1"
                                    : "2px solid transparent",
                                minWidth: "auto",

                              }}
                            />

                            <Tab
                              label="Manual Documents"
                              value="2"
                              sx={{
                                textTransform: "capitalize",
                                fontSize: 16,
                                fontWeight: 600,
                                fontFamily: "Gilroy",
                                color: documentvalue === "2" ? "#1E45E1" : "#4B4B4B",
                                borderBottom:
                                  documentvalue === "2"
                                    ? "2px solid #1E45E1"
                                    : "2px solid transparent",
                                minWidth: "auto",

                              }}
                            />
                            {
                              CustomerOverView?.files?.otherDoc?.length > 0 && documentvalue === "2" &&

                              <div
                                className="bg-green-600 absolute right-2 bottom-2 rounded-full px-2 py-2 cursor-pointer shadow-lg hover:scale-105 transition"
                                onClick={handlePreview}
                              >
                                <DocumentUpload size="14" color="#FFFFFF" />
                              </div>
                            }
                          </TabList>
                        </div>
                      </Box>


                      <TabPanel value="1">
                        <KYCDocuments />
                      </TabPanel>
                      <TabPanel value="2">

                        <div className="relative w-full py-2 px-2">


                          <div className="flex items-center mt-3">
                            <div className="w-full">
                              <div className="flex flex-wrap w-full">

                                {CustomerOverView?.files?.otherDoc?.length > 0 ? (
                                  <ManualDocumentsDetails
                                    documents={CustomerOverView?.files?.otherDoc}
                                  />
                                ) : (
                                  <div className="text-center text-sm font-normal font-gilroy w-full">
                                    No Manual Documents are there!

                                    <p>
                                      <button
                                        onClick={handlePreview}
                                        type="button"
                                        className="mt-2 bg-blue-700 text-white font-semibold rounded-xl text-sm font-gilroy py-2 px-3 flex items-center gap-2 mx-auto"
                                        disabled={!canWriteTenant}
                                      >
                                        <img src={FileAdd} alt="" />
                                        <span>Upload Document</span>
                                      </button>
                                    </p>
                                  </div>
                                )}

                              </div>
                            </div>
                          </div>


                        </div>

                        <Modal
                          show={showDocModal}
                          onHide={() => setShowDocModal(false)}
                          size="md"
                          centered
                          backdrop="static"
                        >
                          <Modal.Body className="p-5 relative flex items-center justify-center min-h-72"
                          >
                            <Button className="absolute top-2.5 right-2.5 border-0 text-lg z-10"

                              variant="light"
                              onClick={() => setShowDocModal(false)}
                            >
                              &times;
                            </Button>
                            {/* {previewUrl && previewUrl.match(/\.(jpeg|jpg|png|gif)$/i) ? (
                                  <img src={previewUrl} alt="Document Preview" style={{ maxWidth: "100%", maxHeight: "600px" }} />
                                ) : (
                                  <iframe
                                    src={https://docs.google.com/gview?url=${encodeURIComponent(previewUrl)}&embedded=true}
                                    style={{ width: "100%", height: "600px", border: "none" }}
                                    title="Document Preview"
                                  />
                                )} */}
                          </Modal.Body>
                        </Modal>





                        <Modal
                          show={showDocModaldoc2}
                          onHide={() => setShowDocModaldoc2(false)}
                          size="lg"
                          centered
                          backdrop="static"
                        >
                          <Modal.Body className="p-5 relative flex items-center justify-center min-h-72"
                          >
                            <Button className="absolute top-2.5 right-2.5 border-0 text-lg z-10"
                              variant="light"
                              onClick={() => setShowDocModaldoc2(false)}
                            >
                              &times;
                            </Button>
                            {/* {previewUrl2 && previewUrl2.match(/\.(jpeg|jpg|png|gif)$/i) ? (
                                  <img src={previewUrl2} alt="Document Preview" style={{ maxWidth: "100%", maxHeight: "600px" }} />
                                ) : (
                                  <iframe
                                    src={https://docs.google.com/gview?url=${encodeURIComponent(previewUrl)}&embedded=true}
                                    style={{ width: "100%", height: "600px", border: "none" }}
                                    title="Document Preview"
                                  />
                                )} */}
                          </Modal.Body>
                        </Modal>

                      </TabPanel>


                    </TabContext>

                  </div>

                </div>


                <div className="flex-1 flex flex-col gap-2">

                  <div className="flex flex-col w-full md:mb-0 px-2 sm:px-0">
                    <div className="bg-white border border-[#E5E7EB] rounded-[20px] p-4 sm:p-[20px] w-full mx-0 sm:ml-[10px] sm:mr-0 h-auto max-h-[500px] overflow-y-auto">
                      <div className="flex flex-col justify-between border-0 p-1 bg-transparent">

                        <div className="flex flex-row justify-between">
                          <div className="text-base font-semibold font-gilroy">
                            Stay details
                          </div>
                          <div className="flex flex-row">
                            <div className={`${!canUpdateTenant ? "cursor-not-allowed opacity-60" : "cursor-pointer opacity-100"}`}>
                              <img
                                src={Stayhistory}
                                alt="stayhistoryicon"
                                onClick={() => canUpdateTenant && handleShowStayHistory(CustomerOverView)}
                                className={`${!canUpdateTenant ? "cursor-not-allowed" : "cursor-pointer"} h-4 w-4`}
                              />
                            </div>
                          </div>
                        </div>
                        <hr className="my-2" />


                        <div className="flex flex-wrap mt-4">

                          <div className="w-full sm:w-1/3 flex flex-col items-start">
                            <p className="text-xs font-medium font-gilroy">Floor</p>
                            <p className="flex items-center -mt-3 gap-1">
                              <img src={Floorimage} alt="Floorimage" className="h-4 w-4" />
                              <span className="text-sm font-semibold font-gilroy ml-1 mt-1">
                                {CustomerOverView.hostelInfo?.floorName && CustomerOverView.hostelInfo?.floorName !== "undefined" && CustomerOverView.hostelInfo?.floorName !== 0 && CustomerOverView.hostelInfo?.floorName !== "null"
                                  ? CustomerOverView.hostelInfo.floorName
                                  : "N/A"}
                              </span>
                            </p>
                          </div>

                          <div className="w-full sm:w-1/3 flex flex-col items-start mb-1">
                            <p className="text-xs font-medium font-gilroy">Room</p>
                            <p className="flex items-center -mt-3 gap-1">
                              <img src={RoomImage} alt="room" className="h-4 w-4" />
                              <span className="ml-1 mt-1 text-sm font-semibold font-gilroy">
                                {CustomerOverView?.hostelInfo?.roomName ?? "N/A"}
                              </span>
                            </p>
                          </div>

                          <div className="w-full sm:w-1/3 flex flex-col items-start mb-1">
                            <p className="text-xs font-medium font-gilroy">Bed</p>
                            <p className="flex items-center -mt-3 gap-1">
                              <img src={Group} alt="bed" className="h-4 w-4" />
                              <span className="ml-1 mt-1 text-sm font-semibold font-gilroy">
                                {CustomerOverView?.hostelInfo?.bedName ?? "N/A"}
                              </span>
                            </p>
                          </div>

                          <div className="w-full sm:w-1/3 flex flex-col items-start mb-2">
                            <p className="text-xs font-medium font-gilroy">Booking Date</p>
                            <p className="flex items-center -mt-3 gap-1">
                              <img src={LinkImage} alt="booking" className="mt-px h-4 w-4" />
                              <span className="ml-1 mt-1 text-sm font-semibold font-gilroy">
                                {CustomerOverView.bookingInfo?.bookingDate ?? "N/A"}
                              </span>
                            </p>
                          </div>

                          <div className="w-full sm:w-1/3 flex flex-col items-start mb-2">
                            <p className="flex items-center text-xs font-medium font-gilroy gap-1.5">
                              Joined Date
                              {canUpdateTenant && CustomerOverView.hostelInfo?.joiningDate && CustomerOverView.hostelInfo.currentStatus !== "NOTICE" && (
                                <img
                                  onClick={handleUpdateJoiningChange}
                                  src={EditImage}
                                  alt="EditImage"
                                  className="h-3.5 w-3.5 mt-0.5 cursor-pointer"
                                />
                              )}
                            </p>
                            <p className="flex items-center -mt-3 gap-1">
                              <img src={LinkImage} alt="joining" className="h-4 w-4" />
                              <span className="ml-1 mt-1 text-sm font-semibold font-gilroy text-black">
                                {CustomerOverView.hostelInfo?.joiningDate ?? "N/A"}
                              </span>
                            </p>
                          </div>
                        </div>


                        <label className="text-lg font-semibold font-gilroy mt-2 mb-3">Financial details</label>
                        <div className="w-full mb-0 md:mb-0">
                          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4 mb-4">
                            <div className="flex flex-col items-start">
                              <div className="flex items-center text-xs font-medium font-gilroy gap-1.5">
                                Monthly Rent
                                {canUpdateTenant && CustomerOverView.hostelInfo?.monthlyRent && CustomerOverView.hostelInfo.currentStatus !== "NOTICE" && (
                                  <img
                                    onClick={handleUpdateChange}
                                    src={EditImage}
                                    alt="EditImage"
                                    className="h-3.5 w-3.5 cursor-pointer"
                                  />
                                )}
                              </div>
                              <p className="text-sm font-semibold font-gilroy text-blue-600 pt-2">
                                ₹{CustomerOverView.hostelInfo?.monthlyRent ?? 0}
                              </p>
                            </div>

                            <div className="flex flex-col items-start">
                              <div className="flex items-center text-xs font-medium font-gilroy gap-1.5">
                                Advance Amount
                                {canUpdateTenant &&
                                  advanceList?.advanceAmount !== null &&
                                  advanceList?.advanceAmount !== undefined &&
                                  CustomerOverView.hostelInfo.currentStatus !== "NOTICE" && (
                                    <img
                                      onClick={handleUpdateAdvanceChange}
                                      src={EditImage}
                                      alt="EditImage"
                                      className="h-3.5 w-3.5 cursor-pointer"
                                    />
                                  )}
                              </div>
                              <p className="text-sm font-semibold font-gilroy pt-2">
                                ₹{advanceList?.advanceAmount ?? 0}
                              </p>
                            </div>


                            <div className="flex flex-col items-start">
                              <div className="text-xs font-medium font-gilroy">Booking Amount</div>
                              <p className="text-sm font-semibold font-gilroy pt-2">
                                ₹{CustomerOverView?.bookingInfo?.bookingAmount ?? 0}
                              </p>
                            </div>


                            {CustomerOverView.hostelInfo?.maintenance !== null && (
                              <div className="flex flex-col items-start">
                                <div className="text-xs font-medium font-gilroy">Maintenance</div>
                                <p className="text-sm font-semibold font-gilroy pt-2">
                                  ₹{CustomerOverView.hostelInfo?.maintenance}
                                </p>
                              </div>
                            )}


                            {CustomerOverView?.hostelInfo?.otherDeductionsBreakup?.map((item, index) => (
                              <div key={index} className="flex flex-col items-start">
                                <div className="text-xs font-medium font-gilroy">{item.type}</div>
                                <p className="text-sm font-semibold font-gilroy pt-2">₹{item.amount}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 bg-white border border-[#E5E7EB] rounded-[20px] p-2 h-auto max-h-[240px] overflow-y-auto">
                    <div className="w-full max-w-full px-2 sm:px-3 mt- py-3">
                      <div className="flex justify-between items-center border-b border-gray-300 pb-2">
                        <div className="font-semibold text-[16px] font-gilroy">
                          Parent/Guardian Details
                        </div>
                        <div
                          onClick={() => {
                            if (canUpdateTenant) {
                              // handleEditStayDetails(CustomerOverView);
                            }
                          }}
                          className={`flex justify-center items-center h-7 w-7 relative z-10 ${!canUpdateTenant ? "cursor-not-allowed" : "cursor-pointer"}`}
                        >
                          <img
                            src={EditImage}
                            alt="Edit"
                            className="h-4 w-4"
                            style={{ color: !canUpdateTenant ? "#CCCCCC" : "#000" }}
                          />
                        </div>
                      </div>

                      <div className="pt-4 font-gilroy text-center">
                        {state?.UsersList?.customerAllDetaills?.length === 0 ? (
                          <ParentsGuardian />
                        ) : (
                          <div className="flex flex-col items-center justify-center text-center font-gilroy text-sm text-gray-700">
                            <p>No Contact Details are there!</p>
                            <button
                              type="button"
                              disabled={!canWriteTenant}
                              onClick={handleAdditionalForm}
                              className="mt-3 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-base font-semibold text-white bg-[#1E45E1] disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                            >
                              <img src={FileAdd} alt="add" className="h-4 w-4" />
                              Add
                            </button>
                          </div>
                        )}
                      </div>

                    </div>
                  </div>

                </div>

              </div>



              {/* <div className="row ms-1">
                <div className="col-12 mt-7">
                  <div className="bg-white rounded-[14px] border border-gray-200">


                    <div className="flex justify-between items-center px-4 border-b border-gray-300" style={{ backgroundColor: "transparent" }}>
                      <div className="font-gilroy font-semibold text-black text-[16px] leading-[40px]">
                        Amenities provided
                      </div>

                      <div className="flex justify-start ms-3 p-2">
                        <button
                          disabled={
                            !canWriteAmenities ||
                            state.UsersList.customerdetails?.hostelInfo?.currentStatus === "BOOKED" ||
                            state.UsersList.customerdetails?.customerCurrentStatus === "INACTIVE" ||
                            state.UsersList.customerdetails?.customerCurrentStatus === "VACATED" ||
                            state.UsersList.customerdetails?.customerCurrentStatus === "SETTLEMENT_GENERATED"
                          }
                          onClick={() => handleShowAssignAmenities()}
                          className={`flex items-center gap-1.5 font-gilroy font-semibold text-[14px] h-[35px] rounded-[12px] px-3 ${!canWriteAmenities ? "bg-blue-600/60 cursor-not-allowed" : "bg-blue-600"} text-white`}
                        >
                          <AddSquare size="18" color="#FFFFFF" variant="Bold" />
                          Assign
                        </button>
                      </div>
                    </div>


                    <div className="p-4 font-gilroy">
                      <div>
                        <UserListAmenities
                          id={props.id}
                          setcustomerUser_Id={props?.setcustomerUser_Id}
                          customerUser_Id={customerId}
                          setHostelIds={props.setHostelIds}
                          hostelIds={props.hostelIds}
                          hostelName={props.hostelName}
                          sethosName={props.sethosName}
                          statusAmni={props.statusAmni}
                          customerAdd={props.customerAddPermission}
                          customerEdit={props.customerEditPermission}
                          customerDelete={props.customerDeletePermission}
                        />
                      </div>

                      <div ref={amenitiesRef} className="mt-1">
                        <RequestedAmenities />
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}

              <div className="row">
                <div className="col-12">
                  <div className="bg-white rounded-[14px] border border-gray-200">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-2 px-4 border-b border-gray-300 bg-transparent">
                      <div className="font-gilroy font-semibold text-black text-[16px] leading-[40px] mb-2 sm:mb-0">
                        Amenities provided
                      </div>

                      <div className="flex justify-start sm:justify-end ms-0 sm:ms-3 p-0 sm:p-2 w-full sm:w-auto">
                        <button
                          disabled={
                            !canWriteAmenities ||
                            state.UsersList.customerdetails?.hostelInfo?.currentStatus === "BOOKED" ||
                            state.UsersList.customerdetails?.customerCurrentStatus === "INACTIVE" ||
                            state.UsersList.customerdetails?.customerCurrentStatus === "VACATED" ||
                            state.UsersList.customerdetails?.customerCurrentStatus === "SETTLEMENT_GENERATED"
                          }
                          onClick={() => handleShowAssignAmenities()}
                          className={`flex items-center gap-1.5 font-gilroy font-semibold text-[14px] h-[35px] rounded-[12px] px-3 ${!canWriteAmenities ? "bg-blue-600/60 cursor-not-allowed" : "bg-blue-600"
                            } text-white`}
                        >
                          <AddSquare size="18" color="#FFFFFF" variant="Bold" />
                          Assign
                        </button>
                      </div>
                    </div>


                    <div className="p-4 font-gilroy flex flex-col gap-4">
                      <div className="w-full">
                        <UserListAmenities
                          id={props.id}
                          setcustomerUser_Id={props?.setcustomerUser_Id}
                          customerUser_Id={customerId}
                          setHostelIds={props.setHostelIds}
                          hostelIds={props.hostelIds}
                          hostelName={props.hostelName}
                          sethosName={props.sethosName}
                          statusAmni={props.statusAmni}
                          customerAdd={props.customerAddPermission}
                          customerEdit={props.customerEditPermission}
                          customerDelete={props.customerDeletePermission}
                        />
                      </div>

                      <div ref={amenitiesRef} className="mt-1 w-full">
                        <RequestedAmenities />
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
                  // contactEdit={contactEdit}
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
            <Modal.Dialog className="m-0 p-0 max-w-[666px] pr-[10px] rounded-[30px]"  >
              <Modal.Body>
                <div className="flex items-center">
                  {customerdetailShow ? (
                    <div>
                      <Modal.Header className="relative pt-[3px]"  >
                        <div className="text-[20px] font-semibold font-gilroy">
                          Edit Customer
                        </div>

                        <CloseCircle
                          size="24"
                          color="#000"
                          onClick={handleCloseEditcustomer}
                          className="cursor pointer"
                        />
                      </Modal.Header>
                      <div className="max-h-[380px] overflow-y-scroll show-scroll p-2 mt-3 me-3">
                        <div className="d-flex align-items-center">
                          <div
                            className="h-24 w-24 relative"
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
                              className="h-24 w-24"
                            />

                            <label htmlFor="imageInput" className="">
                              <Image
                                src={Plus}
                                roundedCircle
                                className="h-5 w-5 absolute bottom-0 right-0 -translate-x-1/2 -translate-y-1/2"

                              />
                              <input
                                type="file"
                                accept="image/*"
                                multiple
                                className="sr-only"
                                id="imageInput"
                                onChange={handleImageChange}
                              />
                            </label>
                          </div>
                          <div className="ps-3">
                            <div>
                              <label
                                className="text-base font-medium text-gray-900 font-gilroy"
                              >
                                Profile Photo
                              </label>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-600 font-gilroy">
                                Max size of image 10MB
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="row mt-4">
                          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-2">
                            <Form.Group className="">
                              <Form.Label className="text-sm font-medium text-gray-900 font-gilroy">
                                First Name {" "}
                                <span className="text-red-500 text-xl"

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
                                className="text-base text-gray-600 font-gilroy font-medium
             shadow-none border border-gray-300
             h-12 rounded-lg"
                              />
                            </Form.Group>
                            {firstnameError && (
                              <ErrorMessage message={firstnameError} type="error" />
                            )}
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 ">
                            <Form.Group >
                              <Form.Label className="text-sm font-medium text-gray-600 font-gilroy"
                              >
                                Last Name {" "}
                              </Form.Label>
                              <FormControl
                                type="text"
                                id="form-controls"
                                placeholder="Enter Last Name"
                                value={lastname}
                                onChange={(e) => handleLastName(e)}
                                className="text-base text-gray-600 font-gilroy font-medium
             shadow-none border border-gray-300
             h-12 rounded-lg mt-2"
                              />
                            </Form.Group>
                          </div>

                          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-1">
                            <Form.Group>
                              <Form.Label className="text-sm font-medium text-gray-600 font-gilroy"
                              >
                                Mobile Number {" "}
                                <span className="text-red-500 text-xl"  >
                                  {" "}
                                  *{" "}
                                </span>
                              </Form.Label>

                              <InputGroup>
                                <Form.Select
                                  value={countryCode}
                                  ref={phoneRef}
                                  id="vendor-select-pg"
                                  className={`border border-gray-300 rounded-l-lg h-12
              text-base text-gray-600 font-gilroy
              shadow-none bg-white
              max-w-[90px] pr-2
              ${countryCode ? "font-semibold" : "font-medium"}`}
                                >
                                  <option> +{countryCode}</option>
                                </Form.Select>
                                <Form.Control
                                  value={Phone}
                                  onChange={handlePhone}
                                  type="text"
                                  placeholder="9876543210"
                                  maxLength={10}
                                  className={`h-12 text-base text-gray-600 font-gilroy
            shadow-none
            border border-gray-300 border-l-0
            rounded-r-lg
            ${Phone ? "font-semibold" : "font-medium"}`}

                                />
                              </InputGroup>
                              <p
                                id="MobileNumberError"
                                className="text-red-500 text-[11px] mt-1" ></p>
                              {phoneError && (
                                <ErrorMessage message={phoneError} type="error" />
                              )}

                              {phoneErrorMessage && (
                                <ErrorMessage message={phoneErrorMessage} type="error" />
                              )}
                            </Form.Group>
                          </div>

                          <div className="w-full md:w-1/2 lg:w-1/2 mb-1">
                            <Form.Group >
                              <Form.Label className="text-[14px] text-gray-900 font-medium font-gilroy">
                                Email ID {" "}
                              </Form.Label>
                              <FormControl
                                type="text"
                                id="form-controls"
                                placeholder="Enter email address"
                                value={Email}
                                ref={emailRef}
                                onChange={(e) => handleEmail(e)}
                                className="text-base text-gray-700 font-medium font-gilroy shadow-none border border-gray-300 h-12 rounded-md mt-1.5"

                              />

                              {emailError && (
                                <ErrorMessage message={emailError} type="error" />
                              )}

                              {emailErrorMessage && (
                                <ErrorMessage message={emailErrorMessage} type="error" />
                              )}
                            </Form.Group>
                          </div>

                          <div className="w-full md:w-1/2 lg:w-1/2 mb-1">
                            <Form.Group>
                              <Form.Label className="text-sm text-gray-900 font-medium font-gilroy" >
                                Flat , House no , Building , Company ,
                                Apartment{" "}
                              </Form.Label>
                              <FormControl
                                type="text"
                                id="form-controls"
                                placeholder="Enter House No"
                                value={house_no}
                                onChange={(e) => handleHouseNo(e)}
                                className="text-base text-gray-700 font-medium font-gilroy shadow-none border border-gray-300 h-12 rounded-md"

                              />
                            </Form.Group>
                            {house_noError && (
                              <ErrorMessage message={house_noError} type="error" />
                            )}
                          </div>

                          <div className="w-full md:w-1/2 lg:w-1/2 mb-1">
                            <Form.Group>
                              <Form.Label className="text-sm text-gray-900 font-medium font-gilroy"
                              >
                                Area , Street , Sector , Village{" "}
                              </Form.Label>
                              <FormControl
                                type="text"
                                id="form-controls"
                                placeholder="Enter Street"
                                value={street}
                                onChange={(e) => handleStreetName(e)}
                                className="text-base text-gray-700 font-medium font-gilroy shadow-none border border-gray-300 h-12 rounded-md"

                              />
                            </Form.Group>
                            {streetError && (
                              <ErrorMessage message={streetError} type="error" />
                            )}
                          </div>

                          <div className="w-full md:w-1/2 lg:w-1/2 mb-1">
                            <Form.Group >
                              <Form.Label className="text-sm text-gray-900 font-medium font-gilroy">
                                Landmark {" "}
                              </Form.Label>
                              <FormControl
                                type="text"
                                id="form-controls"
                                placeholder="E.g , near appollo hospital"
                                value={landmark}
                                onChange={(e) => handleLandmark(e)}
                                className="text-base text-gray-700 font-medium font-gilroy shadow-none border border-gray-300 h-12 rounded-md"

                              />
                            </Form.Group>
                            {landmarkError && (
                              <ErrorMessage message={landmarkError} type="error" />
                            )}
                          </div>

                          <div className="w-full md:w-1/2 lg:w-1/2">
                            <Form.Group
                              className="mb-3"
                              controlId="exampleForm.ControlInput1"
                            >
                              <Form.Label className="text-sm text-gray-900 font-medium font-gilroy" >
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
                                className="text-base text-gray-700 font-medium font-gilroy shadow-none border border-gray-300 h-12 rounded-md"

                              />
                              {pincodeError && (
                                <ErrorMessage message={pincodeError} type="error" />
                              )}
                            </Form.Group>
                          </div>

                          <div className="w-full md:w-1/2 lg:w-1/2 mb-1">
                            <Form.Group className="">
                              <Form.Label className="text-sm text-gray-900 font-medium font-gilroy"

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
                                className="text-base text-gray-700 font-medium font-gilroy shadow-none border border-gray-300 h-12 rounded-md"

                              />
                            </Form.Group>
                            {cityError && (
                              <ErrorMessage message={cityError} type="error" />
                            )}
                          </div>

                          <div className="w-full md:w-1/2 lg:w-1/2 ">
                            <Form.Group
                              className="mb-3"
                              controlId="exampleForm.ControlInput5"
                            >
                              <Form.Label className="text-sm text-gray-900 font-medium font-gilroy" >
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

                          </div>




                        </div>
                        {formError && (
                          <ErrorMessage message={formError} type="error" />
                        )}
                      </div>



                      {formLoading && <div
                        className="absolute top-[100px] inset-x-0 bottom-0 flex items-center justify-center bg-transparent opacity-75 z-10"

                      >
                        <div className="w-10 h-10 rounded-full border-t-4 border-t-[#1E45E1] border-r-4 border-r-transparent animate-spin"

                        ></div>
                      </div>}
                      <Button
                        className="w-full bg-[#1E45E1] font-semibold h-[50px] rounded-[12px] text-[16px] font-['Montserrat'] mt-5"
                        onClick={handleSaveUserlist}
                      >
                        Edit Customer
                      </Button>

                    </div>
                  ) : (
                    ""
                  )}

                  {customerAsignBed && customerAsignBed ? (

                    <div className="container mx-auto">
                      <div className="grid grid-cols-12"></div>

                      <Modal.Header className="relative pt-0" >
                        <div className="text-xl font-semibold font-gilroy">
                          Edit Assign bed
                        </div>

                        <CloseCircle
                          size="24"
                          color="#000"
                          onClick={handleCloseEditcustomer}
                          className="cursor-pointer"
                        />
                      </Modal.Header>
                      <div className="max-h-96 overflow-y-scroll pt-1 mr-1 mt-2 mb-1 show-scroll"

                      >
                        <div className="grid grid-cols-12 mb-3 mr-1">
                          <div className="col-span-12">
                            <Form.Label className="text-sm font-medium font-gilroy">
                              Floor {" "}
                              <span className="text-red-500 text-xl">
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
                              <ErrorMessage message={floorError} type="error" />
                            )}
                          </div>

                          <div className="col-span-12 mt-1">
                            <div className="mb-2">
                              <Form.Label className="text-sm font-medium font-gilroy" >
                                Room {" "}
                                <span className="text-red-500 text-xl">
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
                                <ErrorMessage message={roomError} type="error" />
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-12 gap-4">
                            <Form.Label className="text-sm font-medium font-gilroy" >
                              Bed {" "}
                              <span className="text-red-500 text-xl" >
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
                              <ErrorMessage message={bedError} type="error" />
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
                              <ErrorMessage message={dateError} type="error" />
                            )}


                            {joiningDateErrmsg.trim() !== "" && (
                              <ErrorMessage message={joiningDateErrmsg} type="error" />
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
                              <ErrorMessage message={advanceAmountError} type="error" />
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
                              <ErrorMessage message={roomrentError} type="error" />
                            )}
                          </div>
                        </div>


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



                          {fields.filter(f => !f.isDeleted).map((item, index) => {

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
                                          backgroundColor: state.isFocused
                                            ? "#E7F1FF"
                                            : state.isDisabled
                                              ? "#f0f0f0"
                                              : "#fff",
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
                                    <ErrorMessage message={errors[index]?.reason} type="error" />
                                  )}




                                </div>


                                <div className="col-md-4">

                                  <input
                                    type="text"
                                    placeholder="Enter amount"
                                    value={CustomerOverView.amount}
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
                                    <ErrorMessage message={errors[index]?.amount} type="error" />
                                  )}
                                </div>


                                <div className="col-md-2 d-flex justify-content-center align-items-center">

                                  {index !== 0 && (
                                    <Trash
                                      size="20"
                                      color="red"
                                      variant="Bold"
                                      className="cursor-pointer"
                                      onClick={() => handleRemoveField(index)}
                                    />
                                  )}
                                </div>
                              </div>
                            );
                          })}




                        </div>



                      </div>





                      {formError && (
                        <ErrorMessage message={formError} type="error" />
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

          {/* <Modal
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
                          <ErrorMessage message={advanceDateError} type="error" />
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
                          <ErrorMessage message={advanceDueDateError} type="error" />
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
          </Modal> */}




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
                        className="cursor-pointer"
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
                          <ErrorMessage message={advanceDateError} type="error" />
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
                          <ErrorMessage message={advanceDueDateError} type="error" />
                        )}
                      </div>
                    </div>


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

          <TabPanel value="2" className="w-full max-w-full px-2 sm:px-0">
            <UserEb
              id={customerId}
              handleEditRoomItem={handleEditRoomItem}
              handleEditHostelItem={handleEditHostelItem}
              handleDeleteHostelItem={handleDeleteHostelItem}
              handleDeleteRoomItem={handleDeleteRoomItem}

            />
          </TabPanel>
          <TabPanel value="3" className="w-full max-w-full px-2 sm:px-0">
            <UserListInvoice
              id={customerId}
              handleEditItem={handleEditItem}
              handleDeleteItem={handleDeleteItem}
              handleAddItem={handleAddItem}
              customerAdd={props.customerAddPermission}
              customerEdit={props.customerEditPermission}
              customerDelete={props.customerDeletePermission}
            />
          </TabPanel>

          <TabPanel value="4">
            <TransactionHistory />
          </TabPanel>
        </TabContext>


        {
          editBasicDetailsShow && <EditBasicDetails show={editBasicDetailsShow} handleClose={handleCloseBasicDetails} basicDetails={basicDetails} />
        }

        {
          editAddressDetailsShow && <EditAddressDetails show={editAddressDetailsShow} handleClose={handleCloseAddressDetails} addressDetails={addressDetails} />
        }

        {
          editStayDetailsShow && <EditStayDetails show={editStayDetailsShow} handleClose={handleCloseStayDetails}
          //  stayDetais={stayDetais} 
          />
        }


        {
          stayDetailsShow && <StayHistory show={stayDetailsShow} handleClose={handleCloseStayHistory} />
        }

        {
          showUpdateRentForm && <EditRentalAmount show={showUpdateRentForm} handleClose={handleCloseUpdateChange} />
        }

        {
          showUpdateAdvanceForm && <EditAdvanceAmount show={showUpdateAdvanceForm} handleClose={handleCloseUpdateAdvanceChange} />
        }

        {
          showUpdateJoiningForm && <EditJoiningDate show={showUpdateJoiningForm} handleClose={handleCloseUpdateJoiningChange} />
        }

      </div>


      <Modal show={showModal} onHide={handleClose} size="md" centered>
        <Modal.Header closeButton>
          <Modal.Title >KYC Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              borderRadius: 10,
              padding: 20,
              textAlign: "center",
              fontFamily: "Gilroy",
            }}
          >
            <div style={{ marginBottom: 15 }}>
              <img
                src={`data:image/jpeg;base64,${state.UsersList?.KycCustomerDetails?.pic}`}
                alt="KYC"
                style={{
                  height: 120,
                  width: 120,
                  borderRadius: "25%",
                  border: "3px solid #f0f0f0",
                  objectFit: "cover",
                }}
              />
            </div>

            <h5
              style={{
                fontWeight: "bold",
                fontSize: 18,
                marginBottom: 20,
                color: "#222",
              }}
            >
              {state.UsersList?.KycCustomerDetails?.name || "****"}
            </h5>

            <div
              className="d-flex align-items-start"
              style={{ justifyContent: "center", marginBottom: 15 }}
            >
              <i
                className="bi bi-geo-alt"
                style={{ fontSize: 18, color: "#3D5AFE", marginRight: 10 }}
              ></i>
              <p
                style={{
                  fontSize: 14,
                  color: "#4B4B4B",
                  maxWidth: 220,
                  textAlign: "left",
                  margin: 0,
                }}
              >
                Address<br />
                {/* <span>
            {state.UsersList?.KycCustomerDetails?.address ||
              "No address provided"}
          </span> */}
                <div style={{
                  maxWidth: "400px",
                  wordBreak: "break-word",
                  whiteSpace: "pre-wrap"
                }}>
                  {state.UsersList?.KycCustomerDetails?.address || "No address provided"}
                </div>
              </p>
            </div>

            <div
              className="d-flex align-items-start"
              style={{ justifyContent: "center", marginBottom: 5 }}
            >
              <img
                src={adhar}
                alt="Aadhaar"
                style={{ width: 20, height: 20, marginRight: 10 }}
              />
              <p
                style={{
                  fontSize: 14,
                  color: "#4B4B4B",
                  maxWidth: 220,
                  textAlign: "left",
                  margin: 0,
                }}
              >
                Aadhaar Number<br />
                <span>{state.UsersList?.KycCustomerDetails?.aadhaarNumber}</span>
              </p>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {
        addamenityShow && <TenantAmenities show={addamenityShow} handleClose={handleCloseAddamenityShow} />
      }


      {
        showPreview && <ManualDocumentsUpload show={showPreview} handleClose={handleClosePreview} />
      }



      {
        showWalletHistory && <WalletHistory show={showWalletHistory} handleClose={handleCloseWallet} />
      }

      {customerCheckoutpage && (
        <CustomerCheckout
          customerCheckoutpage={customerCheckoutpage}
          setCustomerCheckoutpage={setCustomerCheckoutpage}
          bedData={customercheckoutdata}
        />
      )}


      {customerReassign && (
        <CustomerReAssign
          customerReassign={customerReassign}
          setCustomerReAssign={setCustomerReAssign}
          reAssignDetail={reAssignDetail}
        />
      )}

      {
        bactocheckinForm && <BackToCheckIn show={bactocheckinForm} handleClose={handleCloseBackToCheckIn}
          checkInDetails={EditObj} />

      }


      {
        DueCustomerShow && <DueCustomerConfirmCheckout show={DueCustomerShow} data={CheckOutDetails} handleClose={handleCloseDuePopup} />
      }


      {
        inactiveForm && <MakeAsInactive show={inactiveForm} handleCloseInActive={handleCloseInActive} inActiveDetails={inActiveDetails} />}







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
export default withErrorBoundary(UserListRoomDetail);

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import Profiles from "../../Assets/Images/New_images/profile-picture.png";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import "./UserList.css";
import {
  Call,
  Sms,
  House,
  MoneyTick,
  ExportCurve,
  ArrowSwapHorizontal,
  Calendar2,
  LogoutCurve,
  AddCircle,
  Notification1,
  DocumentText,
  ArrowUp,
  InfoCircle,
  ArrowLeft,
  Timer1,
} from "iconsax-react";
import Group from "../../Assets/Images/Group.png";
import { useDispatch, useSelector } from "react-redux";
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
import "react-datepicker/dist/react-datepicker.css";
import UserAdditionalContact from "./UserAdditionalContact";
import { Trash } from "iconsax-react";
import PropTypes from "prop-types";
import BookingToCheckin from "../CustomerFile/BookingToCheckin";
import { DocumentUpload, WalletCheck } from "iconsax-react";
import { Verify } from "iconsax-react";
import EditImage from "../../Assets/Images/New_images/cus_edit.svg";
import Landamrkimage from "../../Assets/Images/landmark.png";
import Areaimage from "../../Assets/Images/area_icon.png";
import PincodeImage from "../../Assets/Images/pin.png";
import CityImage from "../../Assets/Images/buildings.png";
import Floorimage from "../../Assets/Images/floor_icon.png";
import RoomImage from "../../Assets/Images/room_icon.png";
import LinkImage from "../../Assets/Images/home-link.png";
import BackToCheckIn from "./BackToCheckIn";
import DueCustomerConfirmCheckout from "./DueCustomerConfirmCheckout";
import EditBasicDetails from "./EditBasicDetails";
import EditAddressDetails from "./EditAddressDetails";
import EditStayDetails from "./EditStayDetails";
import StayHistory from "./StayHistory";
import FileAdd from "../../Assets/Images/New_images/file_add.svg";
import { useHasPermission } from "../../Utils/Permission";
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
import MoveToNoticePGAndTenant from "./MoveToNoticePGAndTenant";
import ChangeBedTenantWay from "./ChangeBedTenantWay";
import MakeAsInactive from "./MakeAsInactive";
import icon from "../../Assets/Images/New_images/Icon (1).svg";
import TenantActions from "./TenantActions";
import KYCTenantDetails from "./KYCTenantDetails";
import TenantJobDetails from "./TenantJobDetails";
import RemoveRentRevision from "./RemoveRentRevision";
import TenantRetainerInvoice from "./TenantRetainerInvoice";

function TenantOverview(props) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const [value, setValue] = useState("1");

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [activeTab, setActiveTab] = useState("kyc");
  const [showKYCModal, setShowKYCModal] = useState(false);
  const [inactiveForm, setInActiveForm] = useState(false);
  const [inActiveDetails, setInactiveDetails] = useState("");

  const [additionalForm, setAdditionalForm] = useState(false);
  const [additionalContact, setAdditionalContact] = useState([]);
  const [editAdditional, setEditAdditional] = useState(false);
  // const [deleteAdditional, setDeleteAdditional] = useState(false);

  const [editBasicDetailsShow, setEditBasicDetailsShow] = useState(false);
  const [editAddressDetailsShow, setEditAddressDetailsShow] = useState(false);
  const [editStayDetailsShow, setEditStayDetailsShow] = useState(false);
  const [stayDetailsShow, setStayDetailsShow] = useState(false);

  const [documentvalue, setDocumentValue] = useState("1");
  const [showWalletHistory, setShowWalletHistory] = useState(false);
  const [BookingAssignForm, setBookingAssignForm] = useState(false);

  const [basicDetails, setBasicDetails] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [advanceList, setAdvanceList] = useState("");
  const [addamenityShow, setaddamenityShow] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [customerCheckoutpage, setCustomerCheckoutpage] = useState(false);
  const [customercheckoutdata, setCustomerCheckoutData] = useState("");

  const [showUpdateRentForm, setShowUpdateRentForm] = useState(false);
  const [showUpdateAdvanceForm, setShowUpdateAdvanceForm] = useState(false);
  const [showUpdateJoiningForm, setShowUpdateJoiningForm] = useState(false);
  const [reAssignDetail, setReasignDetail] = useState("");
  const [customerReassign, setCustomerReAssign] = useState(false);
  const [bactocheckinForm, setBacktoCheckInForm] = useState(false);
  const [DueCustomerShow, setDueCustomerShow] = useState(false);
  const [showAction, setShowAction] = useState(false);
  const [CheckOutDetails, setCheckOutDetails] = useState("");
  const [EditObj, setEditObj] = useState("");
  const menuRef = useRef(null);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const handleShowActions = () => {
    setShowAction(true);
  };

  const handleCloseActions = () => {
    setShowAction(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsPopupOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const {
    canWriteModule: canWriteTenant,

    canUpdateModule: canUpdateTenant,
  } = useHasPermission("Customers");

  const {
    canWriteModule: canWriteCheckout,
    canUpdateModule: canUpdateCheckout,
  } = useHasPermission("Checkout");

  const { canWriteModule: canWriteBooking } = useHasPermission("Booking");

  const { canWriteModule: canWriteAmenities } = useHasPermission("Amenities");

  const amenitiesRef = useRef(null);

  const {
    customerId,
    totriggerBillTap,
    isPgWay,
    IsOverView,
    scrollTo,
    isDashboardWay,
    isBillWay,
    isReceiptWay,
    isBookingWay,
    isTenantWay,

    navigatePg,
    navigateTenant,
  } = location.state || {};

  const CustomerOverView = state?.UsersList?.customerdetails;

  const handleNavigateTenant = () => {
    if (isPgWay || navigatePg) {
      navigate(`/paying-guest/${state.login.selectedHostel_Id}`);
    } else if (isDashboardWay) {
      navigate(`/dashboard/${state.login.selectedHostel_Id}`);
    } else if (isBillWay) {
      navigate(`/invoice/${state.login.selectedHostel_Id}`);
    } else if (isReceiptWay) {
      navigate(`/receipts/${state.login.selectedHostel_Id}`);
    } else if (isBookingWay) {
      navigate(`/retainer-invoice/${state.login.selectedHostel_Id}`);
    } else if (isTenantWay || navigateTenant) {
      navigate(`/tenant/${state.login.selectedHostel_Id}`);
    } else {
      navigate(`/tenant/${state.login.selectedHostel_Id}`);
    }
  };

  const handleCheckoutGenrateNew = (item) => {
    navigate(`/tenant/final-settlement/${item?.customerId}`, {
      state: {
        data: item,
        isTenantOverview: true,
        isPgWayTrigger: isPgWay,
        isTenantWayTrigger: isTenantWay,
      },
    });
  };

  useEffect(() => {
    if (state.UsersList.createRetainerInvoiceStatusCode === 201) {
      setValue("5");
      dispatch({
        type: "CUSTOMERDETAILS",
        payload: { customerId: CustomerOverView?.customerId },
      });
      dispatch({
        type: "REMOVE_CREATE_RETAINER_REDUCER",
      });
    }
  }, [state.UsersList.createRetainerInvoiceStatusCode]);

  useEffect(() => {
    if (state?.Booking?.applyinvoiceSuccessCode === 201) {
      dispatch({
        type: "CUSTOMERDETAILS",
        payload: { customerId: CustomerOverView?.customerId },
      });

      dispatch({ type: "REMOVE_APPLY_INVOICE_REDUCER" });
    }
  }, [state?.Booking?.applyinvoiceSuccessCode]);

  useEffect(() => {
    if (state.UsersList?.removeRentRevisionSuccess) {
      dispatch({
        type: "CUSTOMERDETAILS",
        payload: { customerId: CustomerOverView?.customerId },
      });
      dispatch({ type: "REMOVE_CANCEL_RENT_REVISION_UPDATE_REDUCER" });
    }
  }, [state.UsersList?.removeRentRevisionSuccess]);

  useEffect(() => {
    if (isDashboardWay) {
      dispatch({
        type: "CUSTOMERDETAILS",
        payload: { customerId: customerId },
      });
    }
  }, [isDashboardWay]);

  useEffect(() => {
    if (totriggerBillTap) {
      setTimeout(() => setValue("3"), 0);
    }

    if (IsOverView) {
      setTimeout(() => setValue("1"), 0);
    }

    if (scrollTo === "amenities") {
      setTimeout(() => {
        amenitiesRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300);
    }
  }, [totriggerBillTap, IsOverView, scrollTo]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (CustomerOverView) {
      setAdditionalContact(CustomerOverView?.additionalContacts);
    }
  }, [CustomerOverView]);

  useEffect(() => {
    if (state.UsersList?.CustomerdetailsgetStatuscode === 200) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_CUSTOMER_DETAILS" });
      }, 500);
    }
  }, [state.UsersList?.CustomerdetailsgetStatuscode]);

  useEffect(() => {
    if (state.UsersList.statusCodeForCustomerDetails === 200) {
      setTimeout(() => {
        dispatch({ type: "REMOVEKYC_CUSTOMER_DETAILS" });
      }, 100);
    }
  }, [state.UsersList.statusCodeForCustomerDetails]);

  useEffect(() => {
    if (state.UsersList.statusCodeforverifyKYC === 200) {
      dispatch({
        type: "KYCCUSTOMERDETAILS",
        payload: { customer_id: props.id },
      });

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
      dispatch({
        type: "CUSTOMERDETAILS",
        payload: { customerId: CustomerOverView?.customerId },
      });
      setEditBasicDetailsShow(false);
      setEditAddressDetailsShow(false);
      setTimeout(() => {
        dispatch({ type: "REMOVE_EDIT_BASIC_DETAILS" });
      }, 100);
    }
  }, [state.UsersList.editBasicSuccessStatusCode]);

  useEffect(() => {
    if (state.UsersList.kycRemindeSuccess === 200) {
      dispatch({
        type: "CUSTOMERDETAILS",
        payload: { customerId: CustomerOverView?.customerId },
      });
      setShowAction(false);
      dispatch({ type: "REMOVE_KYC_REMINDER_REDUCER" });
    }
  }, [state.UsersList.kycRemindeSuccess]);

  useEffect(() => {
    if (state.UsersList.addCheckoutCustomerStatusCode === 201) {
      dispatch({
        type: "CUSTOMERDETAILS",
        payload: { customerId: CustomerOverView?.customerId },
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_CHECKOUT_CUSTOMER" });
      }, 1000);
    }
  }, [state.UsersList.addCheckoutCustomerStatusCode]);

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

  const handleEditRoomItem = (item) => {
    props?.onEditRoomItem(item);
  };
  const handleEditHostelItem = (item) => {
    props?.onEditHostelItem(item);
  };

  const handleDeleteHostelItem = (user) => {
    props?.onDeleteHostelItem(user);
  };

  const handleDeleteRoomItem = (user) => {
    props?.onDeleteRoomItem(user);
  };

  const handleAdditionalForm = () => {
    setEditAdditional(false);
    setAdditionalForm(true);
  };

  const handleCloseAdditionalForm = () => {
    setAdditionalForm(false);
  };

  const handleChanges = (event, newValue) => {
    setValue(newValue);
  };

  const handleCustomerReAssign = (reuser) => {
    if (reuser?.customerId) {
      dispatch({
        type: "CUSTOMERDETAILS",
        payload: { customerId: reuser?.customerId },
      });
    }
    setReasignDetail(reuser);
    setCustomerReAssign(true);
  };

  const handleBacktoCheckout = (item) => {
    setEditObj(item);
    setBacktoCheckInForm(true);
  };

  const handleCloseBackToCheckIn = () => {
    dispatch({ type: "REMOVE_CANCEL_CHECKOUT_ERROR" });
    setBacktoCheckInForm(false);
  };

  const handleConformCheckout = (item) => {
    setDueCustomerShow(true);
    setCheckOutDetails(item);
  };
  const handleCloseDuePopup = () => {
    setDueCustomerShow(false);
  };

  useEffect(() => {
    if (state.UsersList.cancelCheckoutStatusCode === 200) {
      setBacktoCheckInForm(false);
      dispatch({
        type: "CUSTOMERDETAILS",
        payload: { customerId: CustomerOverView?.customerId },
      });
    }
  }, [state.UsersList.cancelCheckoutStatusCode]);

  const handleUpdateChange = () => {
    dispatch({ type: "REMOVE_TENANT_UPDATE_ERROR" });
    setShowUpdateRentForm(true);
  };

  const handleCloseUpdateChange = () => {
    dispatch({ type: "REMOVE_TENANT_UPDATE_ERROR" });
    setShowUpdateRentForm(false);
  };

  const handleUpdateAdvanceChange = () => {
    setShowUpdateAdvanceForm(true);
  };

  const handleCloseUpdateAdvanceChange = () => {
    setShowUpdateAdvanceForm(false);
    dispatch({ type: "REMOVE_EDIT_ADVANCE_ERROR" });
  };

  const handleUpdateJoiningChange = () => {
    dispatch({ type: "REMOVE_TENANT_UPDATE_ERROR" });
    setShowUpdateJoiningForm(true);
  };

  const handleCloseUpdateJoiningChange = () => {
    dispatch({ type: "REMOVE_TENANT_UPDATE_ERROR" });
    setShowUpdateJoiningForm(false);
  };

  useEffect(() => {
    if (state?.UsersList.editAmountSuccessStatusCode === 200) {
      dispatch({
        type: "CUSTOMERDETAILS",
        payload: { customerId: CustomerOverView?.customerId },
      });
      setShowUpdateJoiningForm(false);
      setShowUpdateAdvanceForm(false);
      setShowUpdateRentForm(false);
      setTimeout(() => {
        dispatch({ type: "REMOVE_EDIT_AMOUNT_DETAILS" });
      }, 100);
    }
  }, [state?.UsersList.editAmountSuccessStatusCode]);

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
  }, [state.login.selectedHostel_Id]);

  const handleCloseEditcustomer = () => {
    dispatch({ type: "CLEAR_EMAIL_ERROR" });
  };

  useEffect(() => {
    if (state.UsersList.editAdvanceStatusCode === 200) {
      setShowUpdateAdvanceForm(false);
      dispatch({
        type: "CUSTOMERDETAILS",
        payload: { customerId: CustomerOverView?.customerId },
      });
      setTimeout(() => {
        dispatch({ type: "REMOVE_EDIT_ADVANCE" });
      }, 100);
    }
  }, [state.UsersList.editAdvanceStatusCode]);

  useEffect(() => {
    if (state.UsersList.statusCodeForReassinBed === 200) {
      dispatch({
        type: "CUSTOMERDETAILS",
        payload: { customerId: CustomerOverView?.customerId },
      });
    }
  }, [state.UsersList.statusCodeForReassinBed]);

  useEffect(() => {
    if (state.UsersList.statusCodeForCustomerCoatact === 200) {
      dispatch({
        type: "CUSTOMERDETAILS",
        payload: { customerId: CustomerOverView?.customerId },
      });
      setAdditionalForm(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_CUSTOMER_ADD_CONTACT" });
      }, 100);
    }
  }, [state.UsersList.statusCodeForCustomerCoatact]);

  useEffect(() => {
    if (state.UsersList.statusCodeForAddUser === 201) {
      dispatch({ type: "CUSTOMERALLDETAILS", payload: { user_id: props.id } });
      handleCloseEditcustomer();

      setTimeout(() => {
        dispatch({ type: "CLEAR_STATUS_CODES" });
      }, 100);
    }
  }, [
    state.UsersList.statusCodeForAddUser,
    state.UsersList.Users.listCustomers,
  ]);

  useEffect(() => {
    if (state.UsersList.statusCodeForUploadDocument === 200) {
      dispatch({
        type: "CUSTOMERDETAILS",
        payload: { customerId: CustomerOverView?.customerId },
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_UPLOAD_DOCUMENT" });
        dispatch({ type: "CLEAR_ADHAR_UPLOAD_ERROR_STATUSCODE" });
        dispatch({ type: "CLEAR_ADHAR_UPLOAD_ERROR" });
      }, 500);
    }
  }, [state.UsersList.statusCodeForUploadDocument]);

  useEffect(() => {
    if (state.UsersList.statusCodeForOtherDocu === 200) {
      dispatch({
        type: "CUSTOMERDETAILS",
        payload: { customerId: CustomerOverView?.customerId },
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_UPLOAD_OTHER_DOCUMENT" });
      }, 100);
    }
  }, [state.UsersList.statusCodeForOtherDocu]);

  useEffect(() => {
    if (state.UsersList.statusCodeDeleteContact === 200) {
      // handleCloseDelete();
      dispatch({ type: "CONTACTALLDETAILS", payload: { user_id: props.id } });
      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_CONTACT" });
      }, 100);
    }
  }, [state.UsersList.statusCodeDeleteContact]);

  useEffect(() => {
    if (state.UsersList.statusCodeForGenerateAdvance === 200) {
      // handleCloseGenerateFormShow();
      dispatch({
        type: "CUSTOMERDETAILS",
        payload: { customerId: CustomerOverView?.customerId },
      });
      // dispatch({ type: "USERLIST", payload: { hostel_id: hostel_Id } });
      setTimeout(() => {
        dispatch({ type: "REMOVE_GENERATE_ADVANCE" });
      }, 500);
    }
  }, [state.UsersList.statusCodeForGenerateAdvance]);

  useEffect(() => {
    if (state.Booking.StatusCodeInactiveCode === 200) {
      setInActiveForm(false);
      navigate(`/tenant/${state.login.selectedHostel_Id}`);
      dispatch({
        type: "CUSTOMERDETAILS",
        payload: { customerId: CustomerOverView?.customerId },
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_BOOKING_InActive" });
      }, 1000);
    }
  }, [state.Booking.StatusCodeInactiveCode]);

  useEffect(() => {
    if (state.UsersList?.updateJobDetailsSuccessCode === 200) {
      dispatch({
        type: "CUSTOMERDETAILS",
        payload: { customerId: CustomerOverView?.customerId },
      });

      dispatch({ type: "REMOVE_JOB_UPDATE_REDUCER" });
    }
  }, [state.UsersList?.updateJobDetailsSuccessCode]);

  useEffect(() => {
    if (state.UsersList.statusCodeForFinalSettlement === 201) {
      dispatch({
        type: "CUSTOMERDETAILS",
        payload: { customerId: CustomerOverView?.customerId },
      });
    }
  }, [state.UsersList.statusCodeForFinalSettlement]);

  useEffect(() => {
    if (state.UsersList.statuscodeForConformCheckout === 200) {
      handleNavigateTenant();
    }
  }, [state.UsersList.statuscodeForConformCheckout]);

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 3000);
    }
  }, [state.createAccount?.networkError]);

  const handleEditBasicDetails = (item) => {
    setBasicDetails(item);
    setEditBasicDetailsShow(true);
  };
  const handleCloseBasicDetails = () => {
    setEditBasicDetailsShow(false);
    dispatch({ type: "REMOVE_ALREADY_MOBILE_BASIC_ERROR" });
  };
  const [addressDetails, setAddressDetails] = useState("");
  const handleEditAddressDetailsShow = (item) => {
    setEditAddressDetailsShow(true);
    setAddressDetails(item);
  };
  const handleCloseAddressDetails = () => {
    setEditAddressDetailsShow(false);
  };

  const handleCloseStayDetails = () => {
    setEditStayDetailsShow(false);
  };

  const handleShowStayHistory = () => {
    setStayDetailsShow(true);
  };
  const handleCloseStayHistory = () => {
    setStayDetailsShow(false);
  };

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

  const imageUrl =
    CustomerOverView?.profilePic ||
    CustomerOverView?.kycInfo?.aadhaarImage ||
    null;

  const canShowEdit = !!CustomerOverView?.profilePic || !imageUrl;

  const handleCustomerCheckout = (item) => {
    setCustomerCheckoutpage(true);
    setCustomerCheckoutData(item);
  };

  useEffect(() => {
    if (state.UsersList.addCheckoutCustomerStatusCode === 201) {
      navigate(`/tenant/${state.login.selectedHostel_Id}`);
    }
  }, [state.UsersList.addCheckoutCustomerStatusCode]);

  useEffect(() => {
    setAdvanceList(state.UsersList.customerdetails?.advanceInfo);
  }, [state.UsersList.customerdetails.advanceInfo]);

  const handleShowAssignAmenities = () => {
    setaddamenityShow(true);
  };

  const handleCloseAddamenityShow = () => {
    setaddamenityShow(false);
  };

  const isDisabled =
    !canWriteAmenities ||
    state.UsersList.customerdetails?.hostelInfo?.currentStatus === "BOOKED" ||
    state.UsersList.customerdetails?.hostelInfo?.currentStatus ===
      "CANCELLED" ||
    state.UsersList.customerdetails?.customerCurrentStatus === "INACTIVE" ||
    state.UsersList.customerdetails?.customerCurrentStatus === "VACATED" ||
    state.UsersList.customerdetails?.customerCurrentStatus ===
      "SETTLEMENT_GENERATED" ||
    state.UsersList.customerdetails?.customerCurrentStatus === "DRAFT";

  const isDisabledButton =
    !canWriteTenant ||
    state.UsersList.customerdetails?.hostelInfo?.currentStatus === "BOOKED" ||
    state.UsersList.customerdetails?.hostelInfo?.currentStatus ===
      "CANCELLED" ||
    state.UsersList.customerdetails?.customerCurrentStatus === "INACTIVE" ||
    state.UsersList.customerdetails?.customerCurrentStatus === "VACATED" ||
    state.UsersList.customerdetails?.customerCurrentStatus ===
      "SETTLEMENT_GENERATED" ||
    state.UsersList.customerdetails?.customerCurrentStatus === "DRAFT";

  const isKYCDisabledButton =
    !canWriteTenant ||
    state.UsersList.customerdetails?.hostelInfo?.currentStatus === "BOOKED" ||
    state.UsersList.customerdetails?.hostelInfo?.currentStatus ===
      "CANCELLED" ||
    state.UsersList.customerdetails?.customerCurrentStatus === "INACTIVE" ||
    state.UsersList.customerdetails?.customerCurrentStatus === "VACATED" ||
    state.UsersList.customerdetails?.customerCurrentStatus === "DRAFT";

  const isEditDisabled =
    !canUpdateTenant ||
    state.UsersList.customerdetails?.hostelInfo?.currentStatus ===
      "CANCELLED" ||
    state.UsersList.customerdetails?.customerCurrentStatus === "DRAFT";

  useEffect(() => {
    if (
      state.InvoiceList.manualInvoiceAddStatusCode === 201 ||
      state.InvoiceList.manualInvoiceEditStatusCode === 200
    ) {
      dispatch({
        type: "CUSTOMERDETAILS",
        payload: { customerId: CustomerOverView?.customerId },
      });
    }
  }, [
    state.InvoiceList.manualInvoiceAddStatusCode,
    state.InvoiceList.manualInvoiceEditStatusCode,
  ]);

  useEffect(() => {
    if (
      state.InvoiceList.tenantAssignStatus === 201 ||
      state.InvoiceList?.tenantUnAssignStatus === 201
    ) {
      setaddamenityShow(false);
    }
  }, [
    state.InvoiceList?.tenantAssignStatus,
    state.InvoiceList?.tenantUnAssignStatus,
  ]);

  const [showPreview, setShowPreview] = useState(false);
  const [isKyc, setKyc] = useState(false);

  const handlePreview = () => {
    setKyc(false);
    setShowPreview(true);
  };

  const handlePreviewKYC = () => {
    setKyc(true);
    setShowPreview(true);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
  };

  const handleShowWalletHistory = () => {
    setShowWalletHistory(true);
  };

  const handleCloseWallet = () => {
    setShowWalletHistory(false);
  };

  useEffect(() => {
    if (
      state.UsersList?.bookingToCheckinStatusCode === 200 ||
      state.UsersList?.bookingToCheckinStatusCode === 201
    ) {
      setBookingAssignForm(false);
      dispatch({
        type: "CUSTOMERDETAILS",
        payload: { customerId: CustomerOverView?.customerId },
      });

      setTimeout(() => {
        dispatch({ type: "REMOVE_BOOKING_TO_CHECKIN" });
      }, 100);
    }
  }, [state.UsersList?.bookingToCheckinStatusCode]);

  useEffect(() => {
    if (state.UsersList?.bookingToCheckinSuccessCode === 201) {
      setBookingAssignForm(false);
      dispatch({
        type: "CUSTOMERDETAILS",
        payload: { customerId: CustomerOverView?.customerId },
      });

      dispatch({ type: "REMOVE_BOOKING_TO_CHECK_IN_REDUCER" });
    }
  }, [state.UsersList?.bookingToCheckinSuccessCode]);

  const handleShowBookingToCheckin = () => {
    setBookingAssignForm(true);
  };

  const handleInActive = (item) => {
    setInActiveForm(true);
    setInactiveDetails(item);
  };

  const handleCloseBooking = () => {
    setBookingAssignForm(false);
  };

  const handleCloseInActive = () => {
    dispatch({ type: "REMOVE_ERROR_MAKEASINACTIVE" });
    setInActiveForm(false);
  };

  const handleCloseKYC = () => {
    setShowKYCModal(false);
  };

  return (
    <>
      {/* {BookingAssignForm && (
        <BookedCheckIn
          BookingAssignForm={BookingAssignForm}
          handleClose={handleCloseBooking}
          bookingDetails={CustomerOverView}
        />
      )} */}

      {BookingAssignForm && (
        <BookingToCheckin
          show={BookingAssignForm}
          handleClose={handleCloseBooking}
          tenantDetails={CustomerOverView}
        />
      )}

      {showKYCModal && (
        <KYCTenantDetails show={showKYCModal} handleClose={handleCloseKYC} />
      )}

      <div
        key={CustomerOverView?.customerId}
        className="h-[97vh] mt-2 w-full max-w-full overflow-y-auto"
      >
        <>
          <div className="flex items-center justify-between sticky top-0 z-40 bg-white py-3 px-4 h-14 w-full">
            <div className="flex items-center">
              <ArrowLeft
                onClick={() => handleNavigateTenant()}
                className="cursor-pointer"
              />
              <span className="font-semibold text-lg pl-2.5 font-gilroy">
                Tenant Profile
              </span>
            </div>
            <div className="relative">
              <img
                src={icon}
                alt="icon"
                width={24}
                height={24}
                className="cursor-pointer mr-2"
                onClick={() => setIsPopupOpen(!isPopupOpen)}
              />

              {isPopupOpen && (
                <div
                  ref={menuRef}
                  className="
    absolute right-2 sm:right-12
    w-fit
        px-2 sm:px-2 py-2 sm:py-2
    rounded-md bg-white
    shadow-inner border border-gray-200
    z-20 font-gilroy shadow
  "
                >
                  <div className="font-gilroy font-normal text-[13px] border-b border-gray-200 p-2">
                    Created by
                  </div>
                  <div className="flex items-center gap-1 p-2">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                      {CustomerOverView?.createdByPic ? (
                        <img
                          src={CustomerOverView?.createdByPic}
                          alt={CustomerOverView?.createdByPic || "profile"}
                          className="w-10 h-10 rounded-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "/default-profile.png";
                          }}
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full whitespace-nowrap bg-gray-200 flex items-center justify-center font-semibold text-base text-gray-700">
                          {CustomerOverView?.createdByInitials}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-gilroy font-semibold text-sm mb-1 whitespace-nowrap">
                        {CustomerOverView?.createdByName}
                      </span>
                      <span className="text-xs text-gray-500 ont-gilroy font-medium whitespace-nowrap flex">
                        {CustomerOverView?.createdAt}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>

        <div className="bg-white !border !border-[#E5E7EB] rounded-3xl p-3 mx-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center py-0 md:py-2">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="relative w-24 h-24 shrink-0 flex items-center justify-center"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div className="absolute inset-0 rounded-full p-[5px] bg-[conic-gradient(#22c55e_0deg_140deg,transparent_155deg_200deg,#22c55e_220deg_360deg)]">
                    <div className="w-full h-full bg-white rounded-full p-[3px]">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={CustomerOverView.fullName || "profile"}
                          className="w-full h-full rounded-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = Profiles;
                          }}
                        />
                      ) : (
                        <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center font-semibold text-xl">
                          {CustomerOverView?.initials || "NA"}
                        </div>
                      )}
                    </div>
                  </div>

                  <span className="absolute -bottom-[4px] text-[12px] text-green-600 font-semibold">
                    100%
                  </span>

                  {canShowEdit && isHovered && (
                    <div
                      className={`absolute inset-0 rounded-full flex items-center justify-center bg-black/30 z-20
              ${canUpdateTenant ? "cursor-pointer" : "opacity-50 cursor-not-allowed"}`}
                      onClick={() => {
                        if (canUpdateTenant)
                          document.getElementById("fileInput").click();
                      }}
                    >
                      <img
                        alt="image"
                        src={EditImage}
                        className="w-5 h-5 bg-white p-1 rounded-full"
                      />
                    </div>
                  )}

                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (canUpdateTenant) handleImageUpload(e);
                    }}
                  />
                </div>

                <div className="min-w-0 font-gilroy">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-[24px] font-semibold truncate max-w-[180px] ">
                      {CustomerOverView.fullName}
                    </h2>
                    {CustomerOverView?.kycInfo?.status === "VERIFIED" && (
                      <div className="flex items-center gap-2 ">
                        <div className="inline-flex items-center mb-1 ">
                          <Verify size={18} variant="Bold" color="#038c3d" />
                        </div>
                        <div
                          onClick={() => setShowKYCModal(true)}
                          className="inline-flex items-center gap-1 mb-1 text-[11px] text-[#1E45E1] cursor-pointer"
                        >
                          {" "}
                          KYC Info{" "}
                          <InfoCircle
                            size={14}
                            color="#1E45E1"
                            className="cursor-pointer"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-1 flex-wrap pb-1">
                    <span className="bg-[#FFEFCF99] text-orange-600 text-xs px-2 py-[2px] rounded-md">
                      {CustomerOverView?.hostelInfo?.floorName}
                    </span>
                    <span className="bg-[#E7F1FF99] text-blue-600 text-xs px-2 py-[2px] rounded-md">
                      {CustomerOverView?.hostelInfo?.roomName} -{" "}
                      {CustomerOverView?.hostelInfo?.bedName}
                    </span>
                  </div>
                  <hr className="w-full my-1 pb-1 text-gray-600" />

                  <div className="flex items-center gap-4 mt-1 text-xs text-gray-600 flex-wrap">
                    <div className="flex items-center gap-1 text-xs text-blue-600">
                      <Call size={16} color="#1E45E1" variant="Bold" /> +{" "}
                      {CustomerOverView?.countryCode}{" "}
                      {CustomerOverView?.mobileNo}
                    </div>

                    <span className="flex items-center gap-1">
                      <MoneyTick size={16} color="#1E45E1" />₹{" "}
                      {CustomerOverView?.hostelInfo?.monthlyRent}
                      <span className="text-[10px]">/pm</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className=" rounded-xl border-1 border-[#FFF7E8] bg-[#FFF7E8] p-4  font-gilroy">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md border border-[#D9D9D9] bg-white">
                    <DocumentText size={18} color="#222222" variant="Linear" />
                  </div>

                  <div className="flex items-center gap-1 text-[13px] font-medium text-[#222222]">
                    <span>Verify KYC, Address,</span>

                    <button className="font-semibold text-[#1E45E1] hover:underline">
                      +2 More
                    </button>
                  </div>
                </div>

                <div className="rounded-full bg-[#ECFDF3] px-2 py-1 text-[11px] font-semibold text-[#16A34A]">
                  ↑ 30%
                </div>
              </div>

              <button
                disabled={isKYCDisabledButton}
                onClick={handleShowActions}
                className="
    mt-4
    h-10
    w-full
    rounded-full
    border
    border-[#FF9500]
    bg-[#FF9500]
    text-[14px]
    font-medium
    text-white
    transition-all
    hover:bg-[#F57C00]
    disabled:bg-gray-300
    disabled:border-gray-300
    disabled:text-gray-500
    disabled:cursor-not-allowed
    disabled:hover:bg-gray-300
  "
              >
                Add Pending Actions
              </button>
            </div>

            <div className="flex gap-4 items-center">
              <div className="mb-1.5">
                <ExportCurve size="20" color="black" variant="Outline" />
              </div>

              <div className="relative font-gilroy">
                <button onClick={() => setOpenMenu(!openMenu)} className="p-1 ">
                  <PiDotsThreeOutlineVerticalFill
                    size={18}
                    className="text-gray-500"
                  />
                </button>

                {openMenu && (
                  <div
                    ref={menuRef}
                    className="absolute right-8 -mt-[52px] w-fit whitespace-nowrap rounded-md bg-gray-100 border border-gray-200 z-20"
                  >
                    {state.UsersList.customerdetails?.customerCurrentStatus ===
                      "CHECK_IN" && (
                      <>
                        <button
                          disabled={!canUpdateCheckout}
                          onClick={() => {
                            if (canUpdateCheckout) {
                              handleCustomerCheckout(CustomerOverView);
                              setOpenMenu(false);
                            }
                          }}
                          className="
    w-full px-3 py-2 text-left text-sm flex items-center gap-2
    text-gray-900 hover:bg-blue-100
    disabled:text-gray-400
    disabled:cursor-not-allowed
    disabled:hover:bg-transparent
  "
                        >
                          <Notification1
                            size="18"
                            color={canUpdateCheckout ? "#1E45E1" : "#9CA3AF"}
                          />
                          Move to Notice Period
                        </button>

                        <button
                          disabled={!canWriteTenant}
                          onClick={() => {
                            if (canWriteTenant) {
                              handleCustomerReAssign(CustomerOverView);
                              setOpenMenu(false);
                            }
                          }}
                          className="w-full px-3 py-2 text-left text-sm flex items-center gap-2 text-gray-900 hover:bg-blue-100 disabled:text-gray-400 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                        >
                          <ArrowSwapHorizontal
                            size={16}
                            color={canWriteTenant ? "#1E45E1" : "#9CA3AF"}
                          />
                          Change Bed
                        </button>
                      </>
                    )}

                    {state.UsersList.customerdetails?.customerCurrentStatus ===
                      "NOTICE" && (
                      <>
                        <button
                          disabled={!canWriteCheckout}
                          onClick={() => {
                            if (canWriteCheckout) {
                              handleCheckoutGenrateNew(CustomerOverView);
                              setOpenMenu(false);
                            }
                          }}
                          className="w-full px-3 py-2 text-left text-sm flex items-center gap-2 text-gray-900 hover:bg-blue-100 disabled:text-gray-400 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                        >
                          <LogoutCurve
                            size="18"
                            color={canWriteCheckout ? "#1E45E1" : "#9CA3AF"}
                          />
                          Generate
                        </button>
                        <div className="h-px bg-gray-300" />
                        <button
                          disabled={!canWriteTenant}
                          onClick={() => {
                            if (canWriteTenant) {
                              handleBacktoCheckout(CustomerOverView);
                              setOpenMenu(false);
                            }
                          }}
                          className="
    w-full px-3 py-2 text-left text-sm flex items-center gap-2
    text-gray-900 hover:bg-blue-100
    disabled:text-gray-400
    disabled:cursor-not-allowed
    disabled:hover:bg-transparent
  "
                        >
                          <Calendar2
                            size="18"
                            color={canWriteTenant ? "#1E45E1" : "#9CA3AF"}
                            variant="Bold"
                          />
                          Cancel Check-Out
                        </button>
                        <div className="h-px bg-gray-300" />
                      </>
                    )}
                    {state.UsersList.customerdetails?.customerCurrentStatus ===
                      "SETTLEMENT_GENERATED" && (
                      <>
                        <button
                          disabled={!canWriteCheckout}
                          onClick={() => {
                            if (canWriteCheckout) {
                              handleConformCheckout(CustomerOverView);
                              setOpenMenu(false);
                            }
                          }}
                          className="
    w-full px-3 py-2 text-left text-sm flex items-center gap-2
    text-gray-900 hover:bg-blue-100
    disabled:text-gray-400
    disabled:cursor-not-allowed
    disabled:hover:bg-transparent
  "
                        >
                          <LogoutCurve
                            size="18"
                            color={canWriteCheckout ? "#1E45E1" : "#9CA3AF"}
                          />
                          Check-Out
                        </button>
                      </>
                    )}

                    {import.meta.env.MODE === "development" &&
                      state.UsersList.customerdetails?.customerCurrentStatus !==
                        "BOOKED" &&
                      state.UsersList.customerdetails?.hostelInfo
                        ?.currentStatus !== "CANCELLED" && (
                        <button
                          onClick={() => {
                            handleShowWalletHistory();
                            setOpenMenu(null);
                          }}
                          className="w-full px-3 py-2 text-left text-sm text-gray-900 hover:bg-blue-100 flex items-center gap-2"
                        >
                          <WalletCheck
                            size="18"
                            color="#16A34A"
                            variant="Bold"
                          />{" "}
                          Wallet
                        </button>
                      )}

                    {state.UsersList.customerdetails?.customerCurrentStatus ===
                      "BOOKED" && (
                      <>
                        <button
                          disabled={!canWriteTenant}
                          onClick={() => {
                            handleShowBookingToCheckin();
                            setOpenMenu(null);
                          }}
                          type="button"
                          className="w-full px-3 py-2 text-left text-sm text-gray-900 hover:bg-blue-100 flex items-center gap-2 disabled:hover:bg-transparent         disabled:text-gray-400
        disabled:cursor-not-allowed"
                        >
                          <AddCircle
                            size="18"
                            color={canWriteTenant ? "#1E45E1" : "#9CA3AF"}
                          />
                          Check-In
                        </button>

                        <button
                          disabled={!canWriteBooking}
                          onClick={() => {
                            if (canWriteBooking) {
                              handleInActive(CustomerOverView);
                              setOpenMenu(false);
                            }
                          }}
                          className="
        w-full px-3 py-2 text-left text-sm flex items-center gap-2
        text-gray-900 hover:bg-blue-100
        disabled:text-gray-400
        disabled:cursor-not-allowed
        disabled:hover:bg-transparent
      "
                        >
                          <LogoutCurve
                            size="18"
                            color={canWriteBooking ? "#1E45E1" : "#9CA3AF"}
                          />
                          Make as Inactive
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <TabContext value={value}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full max-h-[80px]">
            <Box sx={{ borderBottom: 0, borderColor: "divider" }}>
              <TabList
                orientation={isSmallScreen ? "vertical" : "horizontal"}
                onChange={handleChanges}
                aria-label="lab API tabs example"
                className="d-flex flex-column flex-xs-column flex-sm-column flex-lg-row my-4 sm:my-8 ml-2 sm:ml-5"
              >
                <Tab
                  label="Overview"
                  value="1"
                  className={`!text-[17px] !font-gilroy !leading-normal !not-italic !font-medium !normal-case ${
                    value === "1" ? "!text-[#222222]" : "!text-[#6B6B6B]"
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

                <Tab
                  label="Retainer"
                  value="5"
                  className={`!text-[17px] !font-gilroy !leading-normal !not-italic !font-medium !normal-case ${value === "5" ? "!text-[#222222]" : "!text-[#6B6B6B]"}`}
                />
              </TabList>
            </Box>
          </div>
          <TabPanel
            value="1"
            className="px-4 sm:px-0 mt-2 w-full max-w-full h-[450px] 2xl:h-[650px] overflow-y-auto show-scrolls"
          >
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 items-stretch">
                <div>
                  <div className=" bg-white border border-[#E5E7EB] rounded-[20px] p-4 flex flex-col mb-4 ">
                    <div className="flex items-center justify-between border-b border-gray-300 pb-1 mb-3">
                      <div className="text-[16px] font-gilroy font-semibold">
                        Basic Details
                      </div>
                      <div
                        className={
                          isEditDisabled
                            ? "cursor-not-allowed opacity-60"
                            : "cursor-pointer"
                        }
                      >
                        <div
                          onClick={() => {
                            if (!isEditDisabled) {
                              handleEditBasicDetails(CustomerOverView);
                            }
                          }}
                          className={`h-10 w-10 flex items-center justify-center relative 
      ${isEditDisabled ? "cursor-not-allowed" : "cursor-pointer"}`}
                        >
                          <img
                            src={EditImage}
                            alt="editimage"
                            className="h-4 w-4"
                            style={{
                              filter: isEditDisabled
                                ? "grayscale(100%)"
                                : "none",
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
                            {CustomerOverView?.firstName || ""}
                          </p>
                        </div>

                        <div className="flex flex-col sm:pl-6">
                          <p className="text-xs font-medium font-gilroy text-gray-500">
                            Last Name
                          </p>
                          <p className="text-sm font-semibold font-gilroy truncate hover:whitespace-normal hover:overflow-visible">
                            {CustomerOverView?.lastName || ""}
                          </p>
                        </div>

                        <div className="flex flex-col">
                          <p className="text-xs font-medium font-gilroy text-gray-500">
                            Email ID
                          </p>
                          <div className="flex items-center gap-2">
                            <Sms
                              size={16}
                              color="#1E45E1"
                              className="shrink-0"
                            />
                            <span className="text-sm font-semibold font-gilroy break-all">
                              {CustomerOverView?.emailId || "N/A"}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col sm:pl-6 my-2">
                          <p className="text-xs font-medium font-gilroy text-gray-500">
                            Mobile No
                          </p>
                          <div className="flex items-center gap-2">
                            <Call
                              size={16}
                              color="#1E45E1"
                              className="shrink-0"
                            />
                            <span className="text-sm font-semibold font-gilroy whitespace-nowrap">
                              {CustomerOverView?.mobileNo
                                ? `+${CustomerOverView.countryCode} ${CustomerOverView.mobileNo}`
                                : ""}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col ">
                          <p className="text-xs font-medium font-gilroy text-gray-500">
                            ID Proof
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold font-gilroy whitespace-nowrap">
                              {CustomerOverView?.idProofType || "N/A"}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col pl-6">
                          <p className="text-xs font-medium font-gilroy text-gray-500">
                            Document No
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold font-gilroy whitespace-nowrap">
                              {CustomerOverView?.idProofNo || "N/A"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className=" bg-white  overflow-hidden border border-[#E5E7EB] rounded-[20px] p-4">
                    <div className="card-header flex justify-between items-center border-0 bg-transparent">
                      <div className="card-header p-0 border-0 bg-transparent w-full">
                        <div className="flex items-center justify-around gap-4 w-full border-0 -mt-2">
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
                            {activeTab === "manual" && (
                              <span
                                className={
                                  isEditDisabled
                                    ? "cursor-not-allowed opacity-60"
                                    : "cursor-pointer"
                                }
                              >
                                <div
                                  onClick={() => {
                                    if (!isEditDisabled) {
                                      handleEditAddressDetailsShow(
                                        CustomerOverView,
                                      );
                                    }
                                  }}
                                  className="h-10 w-10 flex justify-center items-center relative z-[1000]"
                                >
                                  <img
                                    src={EditImage}
                                    alt="edit"
                                    className="h-4 w-4"
                                    style={{
                                      filter: isEditDisabled
                                        ? "grayscale(100%)"
                                        : "none",
                                    }}
                                  />
                                </div>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      {activeTab === "manual" ? (
                        <div>
                          <div className="flex flex-wrap p-0 mt-3">
                            <div className="w-full sm:w-1/2 flex flex-col items-start">
                              <p className="text-xs font-medium font-gilroy">
                                House No / Apartment
                              </p>
                              <div className="flex items-center gap-2 -mt-3">
                                <House size="18" color="#1E45E1" />
                                <span
                                  className="text-sm font-semibold font-gilroy mt-1 block truncate w-20"
                                  title={CustomerOverView.address?.houseNo}
                                >
                                  {CustomerOverView.address?.houseNo || ""}
                                </span>
                              </div>
                            </div>

                            <div className="w-full sm:w-1/2 flex flex-col items-start">
                              <p className="text-xs font-medium font-gilroy">
                                Street / Area
                              </p>
                              <div className="flex items-center gap-2 -mt-3">
                                <img
                                  src={Areaimage}
                                  alt="area"
                                  className="w-4 h-4"
                                />
                                <span
                                  className="text-sm font-semibold font-gilroy mt-1 block truncate w-20"
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
                                <img
                                  src={Landamrkimage}
                                  alt="landmark"
                                  className="w-4 h-4"
                                />
                                <span className="text-sm font-semibold font-gilroy mt-1 block truncate w-20">
                                  {CustomerOverView.address?.landmark}
                                </span>
                              </div>
                            </div>

                            <div className="w-full sm:w-1/2 flex flex-col items-start">
                              <p className="text-xs font-medium font-gilroy">
                                Pincode
                              </p>
                              <div className="flex items-center gap-2 -mt-3">
                                <img
                                  src={PincodeImage}
                                  alt="pincode"
                                  className="w-4 h-4"
                                />
                                <span className="text-sm font-semibold font-gilroy truncate mt-1 max-w-xs">
                                  {CustomerOverView.address?.pincode || ""}
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
                                <img
                                  src={CityImage}
                                  alt="city"
                                  className="w-4 h-4"
                                />
                                <span className="text-sm font-semibold font-gilroy mt-1 block truncate w-20">
                                  {CustomerOverView.address?.city}
                                </span>
                              </div>
                            </div>
                            <div className="w-full sm:w-1/2 flex flex-col items-start">
                              <p className="text-xs font-medium font-gilroy">
                                State
                              </p>
                              <div className="flex items-center gap-2 -mt-3">
                                <img
                                  src={CityImage}
                                  alt="state"
                                  className="w-4 h-4"
                                />
                                <span className="text-sm font-semibold font-gilroy truncate max-w-xs">
                                  {CustomerOverView.address?.state}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex flex-wrap mt-3">
                            <div className="w-full sm:w-1/2 flex flex-col items-start">
                              <p className="text-xs font-medium font-gilroy">
                                House No / Apartment
                              </p>
                              <div className="flex items-center gap-2 -mt-3">
                                <House size="18" color="#1E45E1" />
                                <span className="text-sm font-semibold font-gilroy truncate max-w-xs">
                                  {
                                    CustomerOverView.kycInfo?.permanentAddress
                                      ?.houseNo
                                  }
                                </span>
                              </div>
                            </div>

                            <div className="w-full sm:w-1/2 flex flex-col items-start">
                              <p className="text-xs font-medium font-gilroy">
                                Street / Area
                              </p>
                              <div className="flex items-center gap-2 -mt-3">
                                <img
                                  src={Areaimage}
                                  alt="area"
                                  className="w-4 h-4"
                                />
                                <span className="text-sm font-semibold font-gilroy truncate max-w-xs">
                                  {
                                    CustomerOverView.kycInfo?.permanentAddress
                                      ?.streetName
                                  }
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
                                <img
                                  src={Landamrkimage}
                                  alt="landmark"
                                  className="w-4 h-4"
                                />
                                <span className="text-sm font-semibold font-gilroy truncate max-w-xs">
                                  {CustomerOverView.kycInfo?.permanentAddress
                                    ?.landMark || "N/A"}
                                </span>
                              </div>
                            </div>

                            <div className="w-full sm:w-1/2 flex flex-col items-start">
                              <p className="text-xs font-medium font-gilroy">
                                Pincode
                              </p>
                              <div className="flex items-center gap-2 -mt-3">
                                <img
                                  src={PincodeImage}
                                  alt="pincode"
                                  className="w-4 h-4"
                                />
                                <span className="text-sm font-semibold font-gilroy truncate max-w-xs">
                                  {
                                    CustomerOverView.kycInfo?.permanentAddress
                                      ?.pinCode
                                  }
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
                                <img
                                  src={CityImage}
                                  alt="city"
                                  className="w-4 h-4"
                                />
                                <span className="text-sm font-semibold font-gilroy truncate max-w-xs">
                                  {
                                    CustomerOverView.kycInfo?.permanentAddress
                                      ?.city
                                  }
                                </span>
                              </div>
                            </div>

                            <div className="w-full sm:w-1/2 flex flex-col items-start">
                              <p className="text-xs font-medium font-gilroy">
                                State
                              </p>
                              <div className="flex items-center gap-2 -mt-3">
                                <img
                                  src={CityImage}
                                  alt="state"
                                  className="w-4 h-4"
                                />
                                <span className="text-sm font-semibold font-gilroy truncate max-w-xs">
                                  {
                                    CustomerOverView.kycInfo?.permanentAddress
                                      ?.state
                                  }
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className=" gap-2">
                  <div className="flex flex-col w-full md:mb-0 px-2 sm:px-0">
                    <div className="bg-white border border-[#E5E7EB] rounded-[20px] p-3 sm:p-[20px] w-full mx-0 sm:ml-[10px] sm:mr-0  min-h-[500px] overflow-y-auto">
                      <div className="flex flex-col justify-between border-0 p-1 bg-transparent">
                        <div className="flex flex-row justify-between">
                          <div className="text-base font-semibold font-gilroy">
                            Stay details
                          </div>
                          <div className="flex flex-row">
                            <div
                              className={`${!canUpdateTenant ? "cursor-not-allowed opacity-60" : "cursor-pointer opacity-100"}`}
                            >
                              <Timer1
                                size="18"
                                className={`${!canUpdateTenant ? "cursor-not-allowed" : "cursor-pointer"} h-4 w-4`}
                                onClick={() =>
                                  canUpdateTenant &&
                                  handleShowStayHistory(CustomerOverView)
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <hr className="my-2" />

                        <div className="flex flex-wrap mt-4">
                          <div className="w-full sm:w-1/3 flex flex-col items-start">
                            <p className="text-xs font-medium font-gilroy">
                              Floor
                            </p>
                            <p className="flex items-center -mt-3 gap-1">
                              <img
                                src={Floorimage}
                                alt="Floorimage"
                                className="h-4 w-4"
                              />
                              <span className="text-sm font-semibold font-gilroy ml-1 mt-1">
                                {CustomerOverView.hostelInfo?.floorName &&
                                CustomerOverView.hostelInfo?.floorName !==
                                  "undefined" &&
                                CustomerOverView.hostelInfo?.floorName !== 0 &&
                                CustomerOverView.hostelInfo?.floorName !==
                                  "null"
                                  ? CustomerOverView.hostelInfo.floorName
                                  : "N/A"}
                              </span>
                            </p>
                          </div>

                          <div className="w-full sm:w-1/3 flex flex-col items-start mb-1">
                            <p className="text-xs font-medium font-gilroy">
                              Room
                            </p>
                            <p className="flex items-center -mt-3 gap-1">
                              <img
                                src={RoomImage}
                                alt="room"
                                className="h-4 w-4"
                              />
                              <span className="ml-1 mt-1 text-sm font-semibold font-gilroy">
                                {CustomerOverView?.hostelInfo?.roomName ??
                                  "N/A"}
                              </span>
                            </p>
                          </div>

                          <div className="w-full sm:w-1/3 flex flex-col items-start mb-1">
                            <p className="text-xs font-medium font-gilroy">
                              Bed
                            </p>
                            <p className="flex items-center -mt-3 gap-1">
                              <img src={Group} alt="bed" className="h-4 w-4" />
                              <span className="ml-1 mt-1 text-sm font-semibold font-gilroy">
                                {CustomerOverView?.hostelInfo?.bedName ?? "N/A"}
                              </span>
                            </p>
                          </div>

                          <div className="w-full sm:w-1/3 flex flex-col items-start mb-2">
                            <p className="text-xs font-medium font-gilroy">
                              Booking Date
                            </p>
                            <p className="flex items-center -mt-3 gap-1">
                              <img
                                src={LinkImage}
                                alt="booking"
                                className="mt-px h-4 w-4"
                              />
                              <span className="ml-1 mt-1 text-sm font-semibold font-gilroy">
                                {CustomerOverView.bookingInfo?.bookingDate ??
                                  "N/A"}
                              </span>
                            </p>
                          </div>

                          <div className="w-full sm:w-1/3 flex flex-col items-start mb-2">
                            <p className="flex items-center text-xs font-medium font-gilroy gap-1.5">
                              Joined Date
                              {canUpdateTenant &&
                                CustomerOverView.hostelInfo?.joiningDate &&
                                CustomerOverView.hostelInfo?.currentStatus !==
                                  "NOTICE" &&
                                CustomerOverView?.isJoiningDateEditable && (
                                  <img
                                    onClick={handleUpdateJoiningChange}
                                    src={EditImage}
                                    alt="EditImage"
                                    className="h-3.5 w-3.5 mt-0.5 cursor-pointer"
                                  />
                                )}
                            </p>
                            <p className="flex items-center -mt-3 gap-1">
                              <img
                                src={LinkImage}
                                alt="joining"
                                className="h-4 w-4"
                              />
                              <span className="ml-1 mt-1 text-sm font-semibold font-gilroy text-black">
                                {CustomerOverView.hostelInfo?.joiningDate ??
                                  "N/A"}
                              </span>
                            </p>
                          </div>
                          <div className="w-full sm:w-1/3 flex flex-col items-start mb-2">
                            <p className="flex items-center text-xs font-medium font-gilroy gap-1.5">
                              Checkout Date
                            </p>
                            <p className="flex items-center -mt-3 gap-1">
                              <img
                                src={LinkImage}
                                alt="joining"
                                className="h-4 w-4"
                              />
                              <span className="ml-1 mt-1 text-sm font-semibold font-gilroy text-black">
                                {CustomerOverView.checkoutInfo
                                  ?.requestedLeavingDate ?? "N/A"}
                              </span>
                            </p>
                          </div>
                        </div>

                        <label className="text-lg font-semibold font-gilroy mt-2 mb-3">
                          Financial details
                        </label>
                        <div className="w-full mb-0 md:mb-0">
                          <div className="grid grid-cols-2 gap-1  mb-4">
                            <div className="flex flex-col items-start">
                              <div className="flex items-center text-xs font-medium font-gilroy gap-1.5">
                                Monthly Rent
                                {canUpdateTenant &&
                                  Number(
                                    CustomerOverView.hostelInfo?.monthlyRent ??
                                      0,
                                  ) > 0 &&
                                  CustomerOverView.hostelInfo?.currentStatus !==
                                    "NOTICE" && (
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
                            {CustomerOverView?.isNewRentApplied && (
                              <div
                                className="group relative bg-[#FFF8EB] rounded-xl px-3 w-full
                              py-2 flex flex-col items-start min-w-0   "
                              >
                                {/* {isDevelopment && ( */}
                                <button
                                  onClick={() => setShowDeletePopup(true)}
                                  className="absolute top-2 right-2 z-50 bg-white p-1 rounded
            hidden group-hover:!block
             transition-opacity duration-200"
                                >
                                  <Trash size={14} color="red" />
                                </button>
                                {/* )} */}

                                <p className="text-xs text-[#4B4B4B] font-medium font-gilroy whitespace-nowrap mb-1">
                                  New Monthly Rent
                                </p>
                                <p className="text-sm font-semibold text-black font-gilroy mt-1 mb-0">
                                  ₹ {CustomerOverView?.newRentAmount ?? 0}
                                </p>

                                <div className="flex items-start gap-1 mt-2 text-[12px] text-[#C27B0D] font-medium font-gilroy w-full min-w-0">
                                  <ArrowUp
                                    size="14"
                                    className="shrink-0 mt-[2px]"
                                  />

                                  <span className="font-semibold break-words  min-w-0">
                                    {CustomerOverView?.newRentLabel || ""}
                                  </span>
                                </div>
                              </div>
                            )}
                            <div className="  flex flex-col items-start">
                              <div className="flex items-center text-xs font-medium font-gilroy gap-1.5">
                                Advance Amount
                                {canUpdateTenant &&
                                  advanceList?.advanceAmount !== null &&
                                  advanceList?.advanceAmount !== undefined &&
                                  CustomerOverView.hostelInfo?.currentStatus !==
                                    "NOTICE" &&
                                  CustomerOverView.advanceInfo
                                    ?.canEditAdvance && (
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

                            <div className="  flex flex-col items-start">
                              <div className="text-xs font-medium font-gilroy">
                                Booking Amount
                              </div>
                              <p className="text-sm font-semibold font-gilroy pt-2">
                                ₹
                                {CustomerOverView?.bookingInfo?.bookingAmount ??
                                  0}
                              </p>
                            </div>

                            {CustomerOverView.hostelInfo?.maintenance !==
                              null && (
                              <div className=" flex flex-col items-start">
                                <div className="text-xs font-medium font-gilroy">
                                  Maintenance
                                </div>
                                <p className="text-sm font-semibold font-gilroy pt-2">
                                  ₹
                                  {CustomerOverView.hostelInfo?.maintenance ||
                                    0}
                                </p>
                              </div>
                            )}

                            {CustomerOverView?.hostelInfo?.otherDeductionsBreakup?.map(
                              (item, index) => (
                                <div
                                  key={index}
                                  className="  flex flex-col items-start"
                                >
                                  <div className="text-xs font-medium font-gilroy">
                                    {item.type}
                                  </div>
                                  <p className="text-sm font-semibold font-gilroy pt-2">
                                    ₹{item.amount}
                                  </p>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className=" bg-white overflow-hidden relative border border-[#E5E7EB] rounded-[20px]">
                  <div className="sticky top-0 z-[999] bg-white flex justify-between items-center px-3 pt-3   rounded-t-[20px]">
                    <div className="flex justify-around w-full">
                      <button
                        onClick={() => setDocumentValue("1")}
                        className={`text-[16px] font-semibold font-[Gilroy] pb-2 transition
        ${
          documentvalue === "1"
            ? "text-[#1E45E1] border-b-2 border-[#1E45E1]"
            : "text-[#4B4B4B] border-b-2 border-transparent"
        }`}
                      >
                        KYC Documents
                      </button>

                      <button
                        onClick={() => setDocumentValue("2")}
                        className={`text-[16px] font-semibold font-[Gilroy] pb-2 transition
        ${
          documentvalue === "2"
            ? "text-[#1E45E1] border-b-2 border-[#1E45E1]"
            : "text-[#4B4B4B] border-b-2 border-transparent"
        }`}
                      >
                        Manual Documents
                      </button>
                    </div>
                  </div>

                  {documentvalue === "1" &&
                    CustomerOverView?.files?.kycDoc?.length > 0 && (
                      <button
                        disabled={isDisabledButton}
                        className="bg-green-600  disabled:bg-blue-700/60 disabled:cursor-not-allowed rounded-full p-2 cursor-pointer shadow hover:scale-105 transition absolute bottom-4 right-4"
                        onClick={handlePreviewKYC}
                      >
                        <DocumentUpload size="14" color="#FFF" />
                      </button>
                    )}

                  {documentvalue === "2" &&
                    CustomerOverView?.files?.otherDoc?.length > 0 && (
                      <button
                        disabled={isDisabledButton}
                        className="bg-green-600  disabled:bg-blue-700/60 disabled:cursor-not-allowed rounded-full p-2 cursor-pointer shadow hover:scale-105 transition absolute bottom-4 right-4"
                        onClick={handlePreview}
                      >
                        <DocumentUpload size="14" color="#FFF" />
                      </button>
                    )}

                  <div className="p-3 max-h-[300px] overflow-y-auto">
                    {documentvalue === "1" && (
                      <>
                        {CustomerOverView?.files?.kycDoc?.length > 0 ? (
                          <KYCDocuments
                            documents={CustomerOverView?.files?.kycDoc}
                          />
                        ) : (
                          <div className="text-center text-sm font-normal font-gilroy w-full flex items-center  justify-center min-h-[200px]">
                            <div>
                              <p className="mb-1">
                                {" "}
                                No KYC Documents are there!
                              </p>

                              <button
                                onClick={handlePreviewKYC}
                                disabled={isDisabledButton}
                                className="mt-2 bg-blue-700 text-white font-medium rounded-xl text-sm font-gilroy py-2 px-3 flex items-center gap-2 mx-auto
              disabled:bg-blue-700/60 disabled:cursor-not-allowed"
                              >
                                <img src={FileAdd} alt="" />
                                <span>Upload Document</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {documentvalue === "2" && (
                      <div className="w-full py-2 px-2">
                        {CustomerOverView?.files?.otherDoc?.length > 0 ? (
                          <ManualDocumentsDetails
                            documents={CustomerOverView?.files?.otherDoc}
                          />
                        ) : (
                          <div className="text-center text-sm font-normal font-gilroy w-full flex items-center  justify-center  min-h-[200px]">
                            <div>
                              <p className="mb-1">
                                {" "}
                                No Manual Documents are there!
                              </p>

                              <button
                                onClick={handlePreview}
                                disabled={isDisabledButton}
                                className="mt-2 bg-blue-700 text-white font-medium rounded-xl text-sm font-gilroy py-2 px-3 flex items-center gap-2 mx-auto
              disabled:bg-blue-700/60 disabled:cursor-not-allowed"
                              >
                                <img src={FileAdd} alt="" />
                                <span>Upload Document</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex-1 bg-white border border-[#E5E7EB] rounded-[20px] p-2  ">
                  <div className="w-full max-w-full px-2 sm:px-3 py-3">
                    <div className="flex justify-between items-center border-b border-gray-300 pb-2">
                      <div className="font-semibold text-[16px] font-gilroy">
                        Parent/Guardian Details
                      </div>
                      {additionalContact?.length > 0 && (
                        <div className="flex items-center gap-3">
                          <button
                            disabled={isDisabledButton}
                            type="button"
                            onClick={handleAdditionalForm}
                            className={`flex justify-center gap-2 items-center px-4 py-1 rounded-md font-gilroy 
    ${
      !isDisabledButton
        ? "bg-[#1E45E1] text-white cursor-pointer"
        : "bg-gray-100 text-gray-400 cursor-not-allowed"
    }
  `}
                          >
                            <AddCircle
                              size="20"
                              color={!isDisabledButton ? "#FFFFFF" : "#CCCCCC"}
                            />{" "}
                            Additional
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 font-gilroy text-center max-h-[220px] overflow-y-auto show-scroll">
                      {additionalContact?.length > 0 ? (
                        <ParentsGuardian
                          additionalContact={additionalContact}
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-center font-gilroy text-sm text-gray-700 min-h-[150px]">
                          <p className="mb-1">No Contact Details are there!</p>
                          <button
                            type="button"
                            disabled={isDisabledButton}
                            onClick={handleAdditionalForm}
                            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-base font-semibold text-white bg-[#1E45E1] disabled:bg-gray-300 disabled:cursor-not-allowed transition"
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
              <div>
                <TenantJobDetails />
              </div>

              <div className="row">
                <div className="col-12">
                  <div className="bg-white rounded-[14px] border border-gray-200">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-2 px-4 border-b border-gray-300 bg-transparent">
                      <div className="font-gilroy font-semibold text-black text-[16px] leading-[40px] mb-2 sm:mb-0">
                        Amenities provided
                      </div>

                      <div className="flex justify-start sm:justify-end ms-0 sm:ms-3 p-0 sm:p-2 w-full sm:w-auto">
                        <button
                          disabled={isDisabled}
                          onClick={() => handleShowAssignAmenities()}
                          className={`flex items-center gap-1.5 font-gilroy font-semibold text-[14px] h-[35px] rounded-[12px] px-3 text-white
    ${isDisabled ? "bg-blue-600/60 cursor-not-allowed" : "bg-blue-600 cursor-pointer"}
  `}
                        >
                          <AddSquare size="18" color="#FFFFFF" variant="Bold" />
                          Assign
                        </button>
                      </div>
                    </div>

                    <div className="p-4 font-gilroy flex flex-col gap-4">
                      <div className="w-full">
                        <UserListAmenities />
                      </div>

                      <div ref={amenitiesRef} className="mt-1 w-full">
                        <RequestedAmenities />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* {kycdetailsForm === true ? (
                <UserListKyc
                  kycdetailsForm={kycdetailsForm}
                  setKycDetailForm={setKycDetailForm}
                />
              ) : null} */}
              {additionalForm && (
                <UserAdditionalContact
                  show={additionalForm}
                  handleClose={handleCloseAdditionalForm}
                  editAdditional={editAdditional}
                />
              )}
            </>
          </TabPanel>

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
            <UserListInvoice />
          </TabPanel>

          <TabPanel value="4">
            <TransactionHistory />
          </TabPanel>

          <TabPanel value="5">
            <TenantRetainerInvoice />
          </TabPanel>
        </TabContext>

        {editBasicDetailsShow && (
          <EditBasicDetails
            show={editBasicDetailsShow}
            handleClose={handleCloseBasicDetails}
            basicDetails={basicDetails}
          />
        )}

        {editAddressDetailsShow && (
          <EditAddressDetails
            show={editAddressDetailsShow}
            handleClose={handleCloseAddressDetails}
            addressDetails={addressDetails}
          />
        )}

        {editStayDetailsShow && (
          <EditStayDetails
            show={editStayDetailsShow}
            handleClose={handleCloseStayDetails}
            //  stayDetais={stayDetais}
          />
        )}

        {stayDetailsShow && (
          <StayHistory
            show={stayDetailsShow}
            handleClose={handleCloseStayHistory}
          />
        )}

        {showUpdateRentForm && (
          <EditRentalAmount
            show={showUpdateRentForm}
            handleClose={handleCloseUpdateChange}
          />
        )}

        {showUpdateAdvanceForm && (
          <EditAdvanceAmount
            show={showUpdateAdvanceForm}
            handleClose={handleCloseUpdateAdvanceChange}
          />
        )}

        {showUpdateJoiningForm && (
          <EditJoiningDate
            show={showUpdateJoiningForm}
            handleClose={handleCloseUpdateJoiningChange}
          />
        )}
      </div>

      {showAction && (
        <TenantActions show={showAction} handleClose={handleCloseActions} />
      )}

      {addamenityShow && (
        <TenantAmenities
          show={addamenityShow}
          handleClose={handleCloseAddamenityShow}
        />
      )}

      {showPreview && (
        <ManualDocumentsUpload
          show={showPreview}
          handleClose={handleClosePreview}
          isKyc={isKyc}
        />
      )}

      {showWalletHistory && (
        <WalletHistory
          show={showWalletHistory}
          handleClose={handleCloseWallet}
        />
      )}

      {customerCheckoutpage && (
        <MoveToNoticePGAndTenant
          customerCheckoutpage={customerCheckoutpage}
          setCustomerCheckoutpage={setCustomerCheckoutpage}
          bedData={customercheckoutdata}
        />
      )}

      {customerReassign && (
        <ChangeBedTenantWay
          customerReassign={customerReassign}
          setCustomerReAssign={setCustomerReAssign}
          reAssignDetail={reAssignDetail}
        />
      )}

      {bactocheckinForm && (
        <BackToCheckIn
          show={bactocheckinForm}
          handleClose={handleCloseBackToCheckIn}
          checkInDetails={EditObj}
        />
      )}

      {DueCustomerShow && (
        <DueCustomerConfirmCheckout
          show={DueCustomerShow}
          data={CheckOutDetails}
          handleClose={handleCloseDuePopup}
        />
      )}

      {inactiveForm && (
        <MakeAsInactive
          show={inactiveForm}
          handleCloseInActive={handleCloseInActive}
          inActiveDetails={inActiveDetails}
        />
      )}

      {showDeletePopup && (
        <RemoveRentRevision
          open={showDeletePopup}
          onClose={() => setShowDeletePopup(false)}
        />
      )}
    </>
  );
}

TenantOverview.propTypes = {
  onEditItem: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onClick: PropTypes.func,
  handleBack: PropTypes.func,
  onAddItem: PropTypes.func,

  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hostelIds: PropTypes.array,
  hostelName: PropTypes.string,
  setHostelIds: PropTypes.func,
  sethosName: PropTypes.func,

  customerUser_Id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setcustomerUser_Id: PropTypes.func,

  value: PropTypes.any,
  userDetails: PropTypes.object,
  roomDetail: PropTypes.object,
  userData: PropTypes.object,

  onEditRoomItem: PropTypes.func,
  onEditHostelItem: PropTypes.func,
  onDeleteHostelItem: PropTypes.func,
  onDeleteRoomItem: PropTypes.func,
};

export default withErrorBoundary(TenantOverview);

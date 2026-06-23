/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import { StoreSelectedHostelAction } from "../Redux/Action/LoginAction";
import "../Components/Sidebar.css";
import Dashboards from "../Pages/Dashboard/Dashboard";
import PgLists from "../Pages/PayingGuestFile/PgList";
import UserLists from "../Pages/CustomerFile/UserList";
import EbHostel from "../Pages/ElectrictyFile/EB_Hostel";
import Invoices from "../Pages/Bills/Invoice";
import Compliances from "../Pages/Compliants/Compliance";
import Report from "../Reports/Reports";
import VendorComponent from "../Pages/VendorFIle/Vendor";
import { useDispatch, useSelector } from "react-redux";
import Image from "react-bootstrap/Image";
import "bootstrap/dist/css/bootstrap.min.css";
import "sweetalert2/dist/sweetalert2.min.css";
import CryptoJS from "crypto-js";
import Smartstay from "../Assets/Images/New_images/LogoSmart.svg";
import Assets from "../Pages/AssetFile/Asset";
import Expenses from "../Pages/ExpenseFile/Expense";
import Banking from "../Pages/Banking/Banking";
import {
  ArrowUp2,
  ArrowDown2,
  Chart2,
  DocumentText,
  Buildings,
  Calendar,
} from "iconsax-react";
import SettingAllPages from "../Pages/Settings/SettingAllPages";
import SettingIcon from "../Assets/Images/sidebariconOne.svg";
import HelpVideoIcon from "../Assets/Images/sidebariconFour.svg";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { Route, Routes, NavLink } from "react-router-dom";
import Cookies from "universal-cookie";
import { checkoutCustomerProfile } from "../Redux/Action/LoginAction";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import CreateBill from "../Pages/Bills/CreateBill";
import UserListRoomDetail from "../Pages/CustomerFile/UserListRoomDetail";
import CheckoutProfile from "../Pages/CustomerFile/CheckoutProfile";
import SettingSubscription from "../Pages/SubscriptionFile/SettingSubscription";
import SettingIntergration from "../Pages/Settings/SettingIntergration";
import SettingElectricity from "../Pages/Settings/SettingElectricity";
import SettingInvoice from "../Pages/Settings/SettingInvoice";
import SettingExpenses from "../Pages/Settings/SettingExpenses";
import SettingCompliance from "../Pages/Settings/SettingCompliance";
import SettingAmenities from "../Pages/Settings/SettingAmenities";
import SettingNewUser from "../Pages/Settings/SettingUserNew";
import SettingNewRole from "../Pages/Settings/RoleFile/SettingNewRole";
import SettingsNotifications from "../Pages/Settings/SettingsNotifications";
import SettingAgreement from "../Pages/Settings/SettingAgreement";
import BillingRule from "../Pages/Settings/BillingRule/BillingRule";
import SettingGeneral from "../Pages/Settings/SettingGeneral";
import SettingManage from "../Pages/Settings/SettingManage";
import {
  Notification,
  RulerPen,
  CalendarAdd,
  Setting2,
  Chart,
  MoneySend,
  MessageQuestion,
  Flash,
  Receipt,
  Bank,
  Shop,
  Box,
  Profile2User,
  Location,
} from "iconsax-react";
import NotificationForm from "../Utils/Notification";
import SidebarProfile from "./SidebarProfile";
import SidebarQuickActions from "./SidebarQuickActions";
import PaymentPreview from "../Pages/SubscriptionFile/PaymentPreview";
import SettingSecurity from "../Pages/Settings/SettingSecurityPage";
import Booking from "../Pages/Bookings/Booking";
import RecurringBills from "../Pages/Recurring/RecurringBills";
import Receipts from "../Pages/Receipt/Receipt";
import BillsPdfDetails from "../Pages/Bills/BillsPdfDetails";
import ReceiptPdfDetails from "../Pages/Receipt/ReceiptPdfDetails";
import BookingsPdfDetails from "../Pages/Bookings/BookingsPdfDetails";
import FinalSettlement from "../Pages/CustomerFile/FinalSettlement";
import SearchVector from "../Assets/Images/New_images/SearchVector.svg";
import Logout from "./Logout";
import InvoiceRegister from "../Reports/InvoiceRegister/InvoiceRegister";
import TenantsRegister from "../Reports/TenantsRegister/TenantsRegister";
import ComplaintsRegister from "../Reports/ComplaintsRegister/ComplaintsRegister";
import FinalSettlementRegister from "../Reports/FianlSettlementRegister/FinalSettlementRegister";
import RequestRegister from "../Reports/RequestRegister/RequestRegister";
import ElectricityRegister from "../Reports/ElectricityRegister/ElectricityRegister";
import VendorRegister from "../Reports/VendorRegister/VendorRegister";
import ExpenseRegister from "../Reports/ExpenseRegister/ExpenseRegister";
import OccupancyRegister from "../Reports/OccupancyRegister/OccupancyRegister";
import BankTransactionRegister from "../Reports/BankTransactionRegister/BankTransactionRegister";
import ReceiptRegister from "../Reports/ReceiptRegister/ReceiptRegister";
import DashboardOld from "../Pages/Dashboard/DashboardOld";
import Dashboard from "../Pages/Dashboard/Dashboard";
import AnalyticalCollectedOutstanding from "../Reports/AnalyticalCollectedVsOutstanding.jsx/AnalyticalCollectedOutstanding";
import AnalyticalMonthRevenue from "../Reports/AnalyticalMonthRevenue/AnalyticalMonthRevenue";
import AnalyticalVacantOcupied from "../Reports/AnalyticalVacantOcupied/AnalyticalVacantOcupied";
import AnalyticalExpenseTrend from "../Reports/AnalyticalExpenseTrend/AnalyticalExpenseTrend";
import AnalyticalInvoiceTrend from "../Reports/AnalyticalInvoiceTrend/AnalyticalInvoiceTrend";
import AnalyticalComplaintsResolved from "../Reports/AnalyticalComplaintsResolved/AnalyticalComplaintsResolved";
import GraphQL from "../Pages/Dashboard/GraphQL";
import LongStayRecurringModal from "../Pages/Settings/BillingRule/LongStay";
import BillingRuleOld from "../Pages/Settings/BillingRule/BillingRuleOld";
import SettingsElectricityNew from "../Pages/Settings/ElectricityRule/SettingsElectricityNew";
import ElectricityRule from "../Pages/Settings/ElectricityRule/ElectricityRule";
import AllPlans from "../Pages/SubscriptionFile/AllPlans";
import VendorNew from "../Pages/VendorFIle/VendorNew";
import AddVendorNew from "../Pages/VendorFIle/AddVendorNew";
import VendorOverView from "../Pages/VendorFIle/VendorOverView";
import ExpenseNew from "../Pages/ExpenseFile/ExpenseNew";
import AddExpenseNew from "../Pages/ExpenseFile/AddExpenseNew";
import BankingNew from "../Pages/Banking/BankingNew";
import VendorCategory from "../Pages/Settings/Vendor/VendorCategory";
import ReceiptNew from "../Pages/Receipt/ReceiptNew";
import RetainerInvoice from "../Pages/RetainerInvoice/RetainerInvoice";
import AddRetainerInvoice from "../Pages/RetainerInvoice/AddRetainerInvoice";

function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const state = useSelector((state) => state);

  const stateData = useSelector((state) => state.createAccount);
  const [manageOpen, setManageOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [allPageHostel_Id, setAllPageHostel_Id] = useState("");
  const [payingGuestName, setPayingGuestName] = useState("payingGuest");
  const [billingOpen, setBillingOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMdSidebarExpanded, setIsMdSidebarExpanded] = useState(false);
  const isFirstLogin = useRef(true);
  const dropdownRef = useRef(null);
  const [isVisibleSidebar, setIsVisibleSidebar] = useState(false);
  const [showNotify, setShowNotify] = useState(false);
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const profileCardRef = useRef(null);
  const profileAreaRef = useRef(null);
  const cookies = new Cookies();

  const pageMap = {
    // "/dashboard/:hostelId": "dashboard",
    "/dashboard/:hostelId": "dashboard",
    "/paying-guest/:hostelId": "pg-list",
    "/tenant/:hostelId": "user-list",
    "/tenant/details/:hostelId": "user-details",

    "/invoice/:hostelId": "invoice",
    "/invoice/new/:hostelId": "invoice",

    "/booking/:hostelId": "booking",

    "/recurring/:hostelId": "recurring",
    "/receipts/:hostelId": "receipts",
    // "/receipts/new/:hostelId": "receipts-new",
    "/retainer-invoice/:hostelId": "retainer-invoice",

    "/vendor/:hostelId": "vendor",
    // "/vendor/new/:hostelId": "vendor-new",
    "/compliance/:hostelId": "compliance",
    "/asset/:hostelId": "asset",
    "/reports/:hostelId": "reports",
    "/electricity/:hostelId": "eb",
    "/expense/:hostelId": "expenses",
    // "/expense/new/:hostelId": "expenses-new",
    "/banking/:hostelId": "banking",
    "/banking/new/:hostelId": "banking-new",
    "/settings/:hostelId": "settingNewDesign",
  };

  useEffect(() => {
    const path = location.pathname;

    const matchedPage = Object.keys(pageMap)
      .sort((a, b) => b.length - a.length)
      .find((route) => {
        const regex = new RegExp(
          "^" + route.replace("/:hostelId", "/[^/]+") + "$",
        );
        return regex.test(path);
      });

    if (matchedPage) {
      setCurrentPage(pageMap[matchedPage]);
      localStorage.setItem("lastPage", path);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (
      currentPage === "invoice" ||
      currentPage === "booking" ||
      currentPage === "recurring" ||
      currentPage === "receipts" ||
      currentPage === "receipts-new" ||
      currentPage === "retainer-invoice"
    ) {
      setBillingOpen(true);
    } else {
      setBillingOpen(false);
    }
  }, [currentPage]);

  // useEffect(()=>{
  //   if(currentPage === "dashboard"){
  //     navigate(`/dashboard`, { replace: true });

  //   }
  // },[currentPage])

  // const LastPageIs = localStorage.getItem("lastPage")

  useEffect(() => {
    if (state.login?.isLoggedIn && state.login.selectedHostel_Id) {
      if (isFirstLogin.current) {
        navigate(`/dashboard/${state.login.selectedHostel_Id}`, {
          replace: true,
        });
        isFirstLogin.current = false;
      }
    } else {
      const lastPage = localStorage.getItem("lastPage");

      if (lastPage) {
        navigate(lastPage, { replace: true });
      } else {
        navigate(`/dashboard`);
      }
    }
  }, [state.login?.isLoggedIn, state.login.selectedHostel_Id]);
  const lastPage = localStorage.getItem("lastPage");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
    setCurrentPage("dashboard");
    localStorage.setItem("currentPage", "dashboard");
  };

  useEffect(() => {
    localStorage.setItem("manageOpen", manageOpen);
  }, [manageOpen]);

  useEffect(() => {
    if (["pg-list", "user-list", "asset", "vendor"].includes(currentPage)) {
      setManageOpen(true);
      localStorage.setItem("manageOpen", true);
    }
  }, [currentPage]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    const handleProfileClickOutside = (e) => {
      if (showProfileCard) {
        if (
          profileCardRef.current &&
          !profileCardRef.current.contains(e.target) &&
          profileAreaRef.current &&
          !profileAreaRef.current.contains(e.target)
        ) {
          setShowProfileCard(false);
        }
      }
    };
    document.addEventListener("mousedown", handleProfileClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("mousedown", handleProfileClickOutside);
    };
  }, []);

  const [hostelListDetail, setHostelDetail] = useState("");

  useEffect(() => {
    dispatch({ type: "ACCOUNTDETAILS" });
  }, []);

  useEffect(() => {
    dispatch({ type: "HOSTELLIST" });
  }, []);

  useEffect(() => {
    if (
      state.login.selectedHostel_Id ||
      state.PgList?.createPgStatusCode === 201
    ) {
      dispatch({
        type: "PARTICULAR_HOSTEL_DETAILS",
        payload: { hostel_id: state.login.selectedHostel_Id },
      });
    }
  }, [state.login.selectedHostel_Id, state.PgList.createPgStatusCode]);

  useEffect(() => {
    if (state.PgList.deletePgSuccessStatusCode === 200) {
      dispatch({ type: "HOSTELLIST" });

      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_PG_STATUS_CODE" });
      }, 1000);
    }
  }, [state.PgList.deletePgSuccessStatusCode]);

  useEffect(() => {
    if (state.UsersList.hosteListStatusCode === 200) {
      setHostelDetail(state.UsersList.hostelList);
      setTimeout(() => {
        dispatch({ type: "CLEAR_HOSTELLIST_STATUS_CODE" });
      }, 500);
    }
  }, [state.UsersList.hosteListStatusCode]);

  useEffect(() => {
    if (stateData.statusCodeForAccountList === 200) {
      const loginInfo = stateData.accountList;

      if (loginInfo) {
        const LoginId = loginInfo.userId;
        const phoneId = loginInfo.mobileNo;
        const emilidd = loginInfo.mailId;
        const Is_Enable = loginInfo?.two_step_verification_status;

        const encryptedLoginId = CryptoJS.AES.encrypt(
          LoginId.toString(),
          "abcd",
        ).toString();
        const encryptedphone = CryptoJS.AES.encrypt(
          phoneId.toString(),
          "abcd",
        ).toString();
        const encryptedemail = CryptoJS.AES.encrypt(
          emilidd.toString(),
          "abcd",
        ).toString();
        const encryptIsEnable = CryptoJS.AES.encrypt(
          Is_Enable.toString(),
          "abcd",
        ).toString();

        localStorage.setItem("loginId", encryptedLoginId);
        localStorage.setItem("phoneId", encryptedphone);
        localStorage.setItem("emilidd", encryptedemail);
        localStorage.setItem("IsEnable", encryptIsEnable);

        if (Is_Enable) {
          const encryptData = CryptoJS.AES.encrypt(
            JSON.stringify(false),
            "abcd",
          );
          localStorage.setItem("login", encryptData.toString());
        } else {
          const encryptData = CryptoJS.AES.encrypt(
            JSON.stringify(true),
            "abcd",
          );
          localStorage.setItem("login", encryptData.toString());
        }
      }
      setTimeout(() => {
        dispatch({ type: "CLEAR_ACCOUNT_STATUS_CODE" });
      }, 100);
    }
  }, [stateData.statusCodeForAccountList]);

  const [profiles, setProfiles] = useState(null);
  const [profilename, setProfileArray] = useState("");

  useEffect(() => {
    if (stateData.accountList) {
      try {
        const FilteredProfile = stateData.accountList;

        const profilePictures = FilteredProfile?.profilePic;

        const profileName = FilteredProfile?.firstName;
        setProfiles(profilePictures);
        setProfileArray(profileName);
      } catch (error) {
        console.error("Error decrypting loginid", error);
      }
    }
  }, [
    stateData.accountList,
    state.UsersList.hostelList,
    stateData.statusCodeForAccount,
  ]);

  // useEffect(() => {
  //   setCurrentPage(localStorage.getItem("currentPage"));
  // }, [currentPage]);

  const hostelId = state?.login?.selectedHostel_Id;

  useEffect(() => {
    if (!state.login?.selectedHostel_Id) return;

    const pathParts = location.pathname.split("/").filter(Boolean);

    const mainPage = pathParts[0];

    const validPages = [
      "dashboard",
      "paying-guest",
      "tenant",
      "invoice",
      "compliance",
      "reports",
      "electricity",
      "expense",
      "banking",
      "settingNewDesign",
      "vendor",
      "asset",
      "booking",
    ];

    if (validPages.includes(mainPage) && pathParts.length > 1) {
      navigate(`/${mainPage}/${hostelId}`, { replace: true });
    }
  }, [state.login?.selectedHostel_Id]);

  const handlePageClick = (page) => {
    handleFormPage(false);
    setCurrentPage(page);
    setIsDropdownOpen(false);
    setIsMdSidebarExpanded(false);
    localStorage.setItem("currentPage", page);
    setIsSidebarOpen(false);
    dispatch(checkoutCustomerProfile(true));
  };

  useEffect(() => {
    if (state.login?.isLoggedIn) {
      setCurrentPage("dashboard");
    }
  }, [state.login?.isLoggedIn]);

  useEffect(() => {
    if (state.login?.isLoggedIn === false) {
      dispatch({ type: "CLEAR_HOSTEL_LIST" });
      dispatch({ type: "CLEAR_DASHBOARD" });
      dispatch({ type: "CLEAR_HOSTEL_DATA" });
      setAllPageHostel_Id("");
      dispatch(StoreSelectedHostelAction(""));
    }
  }, [state.login?.isLoggedIn]);

  const [logoutformshow, setLogoutformshow] = useState(false);

  const handleShowLogout = () => {
    setLogoutformshow(true);
  };

  const handleCloseLogout = () => {
    setLogoutformshow(false);
  };

  // const handleLogout = () => {
  //   dispatch({ type: 'LOGOUTADMINSAGA', payload: { source: "WEB" } })
  //   const token = cookies.get('v2-token');

  //   if (!token) {
  //     dispatch({ type: "LOG_OUT" });
  //     dispatch({ type: 'RESET_ALL' })
  //     const encryptData = CryptoJS.AES.encrypt(JSON.stringify(false), "abcd");
  //     localStorage.setItem("login", encryptData.toString());
  //     return;
  //   }
  // };

  useEffect(() => {
    if (state.login?.logoutAdminStatusCode === 200) {
      dispatch({ type: "LOG_OUT" });
      dispatch({ type: "RESET_ALL" });
      const encryptData = CryptoJS.AES.encrypt(JSON.stringify(false), "abcd");
      localStorage.setItem("login", encryptData.toString());
      cookies.remove("selected_hostelId", { path: "/" });
      cookies.remove("v2-token", { path: "/" });
      cookies.remove("token", { path: "/" });
      localStorage.setItem("loginId", "");
      localStorage.setItem("phoneId", "");
      localStorage.setItem("emilidd", "");
      localStorage.setItem("selectedHostelName", "");
      localStorage.removeItem("lastPage");
      localStorage.removeItem("currentPage");

      setTimeout(() => {
        dispatch({ type: "REMOVE_LOGOUT_ADMIN" });
      }, 1000);
    }
  }, [state.login?.logoutAdminStatusCode]);

  const handledisplaycompliace = () => {
    setCurrentPage("compliance");
    localStorage.setItem("currentPage", "compliance");
    setIsSidebarOpen(false);
  };

  const [settignspgshow, setSettingsPGShow] = useState(false);

  const handledisplaySettingsPG = () => {
    setCurrentPage("settingNewDesign");
    localStorage.setItem("currentPage", "settingNewDesign");
    setSettingsPGShow(true);
    setIsSidebarOpen(false);
  };

  const [selectedProfileImage, setSelectedProfileImage] = useState("");
  const [initials, setInitials] = useState("");
  const [locationName, setLocationName] = useState("");

  const handleHostelId = (id, name, mainImage, initials, locations) => {
    setLocationName(locations);
    setInitials(initials);
    setPayingGuestName(name);
    setAllPageHostel_Id(id);
    setSelectedProfileImage(
      mainImage && mainImage !== "0" && mainImage !== ""
        ? mainImage
        : mainImage,
    );
    setIsDropdownOpen(false);
    dispatch({ type: "SAVE_RESPONSE_HOSTEL", payload: id });
    dispatch(StoreSelectedHostelAction(id));
    localStorage.setItem("selectedHostelName", name);
    cookies.set("selected_hostelId", id, { path: "/" });
    setIsSidebarOpen(false);
  };

  // const handleSettingspage = (view) => {
  //   handlePageClick("settingNewDesign");
  //   setSettingsPGShow(false);
  //   const hostelId = state.login?.selectedHostel_Id;
  //   if (hostelId) {
  //     navigate(`/settings/${hostelId}`);
  //   } else {
  //     navigate(`/settings`);
  //   }
  // };

  const settingsPath = hostelId ? `/settings/${hostelId}` : `/settings`;

  const handleShowsettingsGenaral = () => {
    setShowProfileCard(false);
    handlePageClick("settingNewDesign");
    setSettingsPGShow(false);
    const hostelId = state.login?.selectedHostel_Id;
    if (hostelId) {
      navigate(`/settings/${hostelId}`);
    } else {
      navigate(`/settings`);
    }
  };

  const cookieHostelId = cookies.get("selected_hostelId");

  useEffect(() => {
    if (!hostelListDetail?.length || initials) return;

    const selectedHostel =
      hostelListDetail.find(
        (h) => String(h.hostelId) === String(cookieHostelId),
      ) || hostelListDetail[0];

    if (!selectedHostel) return;

    setAllPageHostel_Id(selectedHostel?.hostelId);
    dispatch(StoreSelectedHostelAction(selectedHostel?.hostelId));
    setPayingGuestName(selectedHostel?.name);
    setLocationName(selectedHostel?.city);
    setInitials(selectedHostel?.initials);

    setSelectedProfileImage(
      selectedHostel.mainImage &&
        selectedHostel.mainImage !== "0" &&
        selectedHostel.mainImage !== ""
        ? selectedHostel.mainImage
        : "",
    );

    dispatch(StoreSelectedHostelAction(selectedHostel.hostelId));
  }, [hostelListDetail, cookieHostelId]);

  useEffect(() => {
    if (allPageHostel_Id) {
      dispatch(StoreSelectedHostelAction(allPageHostel_Id));
    }
  }, [allPageHostel_Id]);

  const handleShowsettingsPG = (settingNewDesign) => {
    const hostelId = state.login?.selectedHostel_Id;
    if (hostelId) {
      navigate(`/settings/${hostelId}`);
    } else {
      navigate(`/settings`);
    }
    handledisplaySettingsPG(settingNewDesign);
    dispatch({ type: "MANAGE_PG" });
    setIsSidebarOpen(false);
  };

  const [hoveredIcon, setHoveredIcon] = useState(null);

  const handleMouseEnter = (icon) => setHoveredIcon(icon);
  const handleMouseLeave = () => setHoveredIcon(null);

  useEffect(() => {
    if (state.createAccount?.accountList?.roleId) {
      dispatch({
        type: "PERMISSIONROLELIST",
        payload: state.createAccount?.accountList?.roleId,
      });
    }
  }, [state.createAccount.accountList.roleId]);

  const handleFormPage = (isVisible) => {
    setIsVisibleSidebar(isVisible);
  };

  // const getZoomLevel = () => {
  //   const zoom = Math.round(window.devicePixelRatio * 100);
  //   return zoom;
  // };

  // useEffect(() => {
  //   const handleZoomDetect = () => {
  //     const zoom = getZoomLevel();
  //     setZoom(zoom);
  //   };

  //   window.addEventListener("resize", handleZoomDetect);
  //   window.addEventListener("mousemove", handleZoomDetect);

  //   return () => {
  //     window.removeEventListener("resize", handleZoomDetect);
  //     window.removeEventListener("mousemove", handleZoomDetect);
  //   };
  // }, []);

  const handleClose = () => {
    setShowNotify(false);
  };

  const handleShowNotification = () => {
    setShowNotify(true);
  };

  const withHostel = (path) => {
    const finalPath = hostelId ? `${path}/${hostelId}` : path;

    return finalPath;
  };

  const TooltipWrapper = ({ title, children }) => {
    return (
      <>
        <div className="block lg:hidden">
          <OverlayTrigger
            trigger={tooltipTrigger}
            placement="right"
            container={document.body}
            delay={{ show: 200, hide: 0 }}
            overlay={<Tooltip className="custom-tooltip">{title}</Tooltip>}
          >
            {children}
          </OverlayTrigger>
        </div>

        <div className="hidden lg:block">{children}</div>
      </>
    );
  };

  const [isMd, setIsMd] = React.useState(
    window.innerWidth >= 768 && window.innerWidth < 1024,
  );

  React.useEffect(() => {
    const handleResize = () => {
      setIsMd(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const tooltipTrigger = isMd ? ["hover", "focus"] : [];

  const isDevelopment = import.meta.env.MODE === "development";

  return (
    <>
      {showNotify && (
        <NotificationForm show={showNotify} handleClose={handleClose} />
      )}

      <div className="w-full p-0">
        <div className="flex w-full h-screen overflow-y-hidden flex-row">
          {/* <div className="d-md-none p-2 bg-white">
            <button
              onClick={toggleSidebar}
              className="bg-transparent border-none text-2xl cursor-pointer"
            >
              ☰
            </button>
          </div> */}

          <div
            className={`sidebar-left w-20 min-w-20 md:w-20 md:min-w-20 lg:w-64 lg:min-w-48 flex flex-col h-screen bg-white relative border-r-2 border-gray-200 shadow-md ${isMdSidebarExpanded ? "md-expanded" : ""}`}
          >
            <div>
              <div className="p-3 flex-shrink-0 mt-1.5">
                <img
                  src={Smartstay}
                  alt="smartstay"
                  className="sidebar-logo Title mb-1 w-36 h-6 hidden lg:block"
                  onClick={() => handlePageClick("dashboard")}
                />

                <button
                  onClick={closeSidebar}
                  className={`bg-transparent border-none textbase cursor-pointer md:hidden ${
                    isSidebarOpen ? "block" : "hidden"
                  }`}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 18L18 6M6 6L18 18"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {hostelListDetail && hostelListDetail?.length > 0 && (
                  <li
                    ref={dropdownRef}
                    onClick={toggleDropdown}
                    className={`list-none flex items-center relative cursor-pointer font-gilroy text-[13px] shadow-[0_2px_4px_rgba(0,0,0,0.08)] rounded-[8px] bg-white mt-2 list-Item-Hostel ${
                      currentPage === "settingNewDesign" ? "active" : ""
                    }`}
                  >
                    {selectedProfileImage &&
                    selectedProfileImage !== null &&
                    selectedProfileImage !== "" ? (
                      <OverlayTrigger
                        trigger={tooltipTrigger}
                        placement="right"
                        container={document.body}
                        overlay={
                          <Tooltip className="custom-tooltip">
                            {payingGuestName} {locationName}
                          </Tooltip>
                        }
                      >
                        <img
                          src={selectedProfileImage}
                          className="h-9 w-9 rounded-full mr-2"
                          alt="Selected Profile"
                        />
                      </OverlayTrigger>
                    ) : (
                      <OverlayTrigger
                        trigger={tooltipTrigger}
                        placement="right"
                        container={document.body}
                        overlay={
                          <Tooltip className="custom-tooltip">
                            {payingGuestName} {locationName}
                          </Tooltip>
                        }
                      >
                        <div className="shrink-0 h-9 w-9 min-w-9 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-semibold text-xs mr-2 md:-ml-0.5 uppercase leading-none">
                          {initials}
                        </div>
                      </OverlayTrigger>
                    )}

                    <span className="sidebar-label hidden lg:inline-block text-smfont-semibold font-gilroy max-w-[150px] truncate align-middle text-[#222222] cursor-pointer">
                      {payingGuestName}

                      <div>
                        <OverlayTrigger
                          trigger={tooltipTrigger}
                          placement="right"
                          container={document.body}
                          overlay={
                            <Tooltip className="custom-tooltip">
                              {payingGuestName} {locationName}
                            </Tooltip>
                          }
                        >
                          <span className="flex items-center gap-1 text-[12px] text-[#9C9C9C] max-w-[100px] cursor-pointer">
                            <Location
                              className="mr-1 shrink-0"
                              size="16"
                              color="#FF8A65"
                              variant="Bold"
                            />

                            <span className="truncate min-w-0">
                              {locationName}
                            </span>
                          </span>
                        </OverlayTrigger>
                      </div>
                    </span>

                    <span className="ms-auto hidden lg:inline-flex">
                      {isDropdownOpen ? (
                        <ArrowUp2 size="16" color="#4B4B4B" />
                      ) : (
                        <ArrowDown2 size="16" color="#4B4B4B" />
                      )}
                    </span>

                    {isDropdownOpen && (
                      <div
                        className="absolute top-full mt-1 left-0 bg-white shadow-md py-1 border rounded w-full md:w-[50px] lg:w-full z-50 max-h-48 overflow-y-auto
                        overflow-x-visible 
                         show-scrolls"
                        style={{ overflow: "visible" }}
                      >
                        <ul style={{ margin: 0, padding: 0 }}>
                          {hostelListDetail.map((item) => (
                            <li
                              key={item.id}
                              className="relative group inline-block hover:bg-gray-100 flex items-center 
                              py-2 mx-2 px-2 rounded cursor-pointer text-blue-600  truncate align-middle overflow-visible"
                              onClick={() =>
                                handleHostelId(
                                  item.hostelId,
                                  item.name,
                                  item.mainImage,
                                  item.initials,
                                  item.city,
                                )
                              }
                            >
                              {item.mainImage &&
                              item.mainImage !== "0" &&
                              item.mainImage !== "" ? (
                                <img
                                  src={item.mainImage}
                                  className="w-6 h-6 md:w-7 md:h-7  rounded-full mr-2"
                                  alt={item.initials || "Default Profile"}
                                />
                              ) : (
                                <div className="shrink-0 min-w-6 w-6 h-6 md:w-7 md:h-7 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-semibold text-xs mr-2 uppercase">
                                  {item.initials}
                                </div>
                              )}

                              <span className="hidden lg:inline-block truncate ">
                                {item.name}
                              </span>
                              <div
                                className="absolute left-1/2 top-full mt-1
    -translate-x-1/2
    hidden group-hover:block transition-opacity duration-150
    bg-[#1E45E1] text-white text-xs rounded px-2 py-1 whitespace-nowrap
    z-[9999] "
                              >
                                {item.name}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                )}

                {!(hostelListDetail ?? []).length && (
                  <NavLink
                    to={settingsPath}
                    className="flex items-center justify-center mt-2 list-none font-gilroy text-white font-medium bg-[#1E45E1] shadow-sm p-2 rounded-lg cursor-pointer no-underline"
                    onClick={() => {
                      handledisplaySettingsPG("manage-pg", "Manage PG");
                      dispatch({ type: "MANAGE_PG" });
                      setIsSidebarOpen(false);
                    }}
                  >
                    + Add PG
                  </NavLink>
                )}
              </div>
              <div className="show-scrolls-sidebar overflow-y-auto overflow-x-hidden h-[calc(100vh-130px)] p-1">
                <ul className="flex-1 min-h-0 overflow-y-auto list-none p-0.5 mb-0 w-full">
                  {/* <li
                    className="list-none flex items-center" >
                      <NavLink
                        to={withHostel("/dashboard")}
                        className={({ isActive }) =>
                          `align-items-center d-flex list-Item ${isActive ? "active" : ""}`
                        }
                        onClick={() => handlePageClick("dashboard")}
                      >
                        <Chart2
                          size="20" variant="Bold"
                        />
                        <span className="sidebar-label hidden lg:inline-block text-sm font-semibold font-gilroy Title" >
                          Home
                        </span>
                      </NavLink>
                       </li> */}

                  <li className="list-none flex items-center">
                    <NavLink
                      to={withHostel("/dashboard")}
                      className={({ isActive }) =>
                        `align-items-center d-flex list-Item ${isActive ? "active" : ""}`
                      }
                      onClick={() => handlePageClick("dashboard")}
                    >
                      <Chart2 size="20" variant="Bold" />
                      <span className="sidebar-label hidden lg:inline-block text-sm font-semibold font-gilroy Title mt-1">
                        Home
                      </span>
                    </NavLink>
                  </li>

                  <li
                    className={`flex relative list-none mt-[${manageOpen ? "0.5" : "2.5"}] items-center px-3 py-2 rounded collapsible-header
    ${manageOpen ? "bg-[#F6F8FF] text-[#1E45E1]" : "bg-white text-[#64748B]"} cursor-pointer list-Item`}
                    onClick={() => {
                      const next = !manageOpen;
                      setManageOpen(next);
                      setBillingOpen(false);
                      setIsMdSidebarExpanded(next);
                      localStorage.setItem("manageOpen", !manageOpen);
                    }}
                  >
                    <Setting2 size={20} variant="Bold" className="mt-1" />
                    <span className="sidebar-label hidden lg:inline-block mt-1.5 font-gilroy font-semibold text-sm">
                      Manage
                    </span>
                    <span className="ml-auto mt-1.5 inline-flex">
                      {manageOpen ? (
                        <ArrowUp2 size={16} color="#4B4B4B" />
                      ) : (
                        <ArrowDown2 size={16} color="#4B4B4B" />
                      )}
                    </span>
                  </li>

                  {manageOpen && (
                    <div className={`submenu ${manageOpen ? "open" : ""}`}>
                      <ul className="pl-2 relative p-1.5">
                        <li className="list-none flex">
                          <NavLink
                            to={withHostel("/paying-guest")}
                            className={({ isActive }) =>
                              `align-items-center d-flex list-Item ${isActive ? "active" : ""}`
                            }
                            onClick={() => handlePageClick("pg-list")}
                          >
                            <Buildings size="20" variant="Bold" />

                            <span className="sidebar-label hidden lg:inline-block Title font-gilroy font-semibold text-sm">
                              Paying Guest
                            </span>
                          </NavLink>
                        </li>

                        <li className="list-none">
                          <NavLink
                            to={withHostel("/tenant")}
                            className={({ isActive }) =>
                              `list-sub-Item no-underline d-flex align-items-center ${
                                isActive || currentPage === "user-details"
                                  ? "active"
                                  : ""
                              }`
                            }
                            onClick={() => handlePageClick("user-list")}
                          >
                            <Profile2User size="20" variant="Bold" />

                            <span className="sidebar-label hidden lg:inline-block Title font-gilroy font-semibold text-sm">
                              Tenant
                            </span>
                          </NavLink>
                        </li>

                        <li className="list-none">
                          <NavLink
                            to={withHostel("/asset")}
                            className={({ isActive }) =>
                              `align-items-center list-sub-Item no-underline d-flex ${
                                isActive || currentPage === "asset"
                                  ? "active"
                                  : ""
                              }`
                            }
                            onClick={() => handlePageClick("asset")}
                          >
                            <Box size="20" variant="Bold" />

                            <span className="sidebar-label hidden lg:inline-block Title font-gilroy font-semibold text-sm">
                              Assets
                            </span>
                          </NavLink>
                        </li>

                        <li className="list-none">
                          <NavLink
                            to={withHostel("/vendor")}
                            className={({ isActive }) =>
                              `align-items-center list-sub-Item no-underline d-flex ${
                                isActive || currentPage === "vendor"
                                  ? "active"
                                  : ""
                              }`
                            }
                            onClick={() => handlePageClick("vendor")}
                          >
                            <Shop size="20" variant="Bold" />

                            <span className="sidebar-label hidden lg:inline-block Title font-gilroy font-semibold text-sm">
                              Vendor
                            </span>
                          </NavLink>
                        </li>
                        {/* {isDevelopment && (
                          // <li className="list-none">
                          //   <NavLink
                          //     to={withHostel("/vendor/new")}
                          //     className={({ isActive }) =>
                          //       `align-items-center list-sub-Item no-underline d-flex ${
                          //         isActive || currentPage === "vendor-new"
                          //           ? "active"
                          //           : ""
                          //       }`
                          //     }
                          //     onClick={() => handlePageClick("vendor-new")}
                          //   >
                          //     <Shop size="20" variant="Bold" />

                          //     <span className="sidebar-label hidden lg:inline-block Title font-gilroy font-semibold text-sm">
                          //       Vendor New
                          //     </span>
                          //   </NavLink>
                          // </li>
                        )} */}
                      </ul>
                    </div>
                  )}

                  <li
                    className={`list-none  flex items-center  ${manageOpen ? "mt-1" : "mt-2.5"}`}
                  >
                    <OverlayTrigger
                      trigger={tooltipTrigger}
                      placement="right"
                      container={document.body}
                      delay={{ show: 200, hide: 0 }}
                      overlay={
                        <Tooltip className="custom-tooltip">Banking</Tooltip>
                      }
                    >
                      <NavLink
                        to={withHostel("/banking")}
                        className={({ isActive }) =>
                          `align-items-center list-Item  d-flex ${
                            isActive || currentPage === "banking"
                              ? "active"
                              : ""
                          }`
                        }
                        onClick={() => handlePageClick("banking")}
                      >
                        <Bank size="20" variant="Bold" className="-mt-1" />

                        <span className="sidebar-label hidden lg:inline-block Title font-gilroy font-semibold text-sm">
                          Banking
                        </span>
                      </NavLink>
                    </OverlayTrigger>
                  </li>
                  {isDevelopment && (
                    <li
                      className={`list-none  flex items-center  ${manageOpen ? "mt-1" : "mt-2.5"}`}
                    >
                      <OverlayTrigger
                        trigger={tooltipTrigger}
                        placement="right"
                        container={document.body}
                        delay={{ show: 200, hide: 0 }}
                        overlay={
                          <Tooltip className="custom-tooltip">Banking</Tooltip>
                        }
                      >
                        <NavLink
                          to={withHostel("/banking/new")}
                          className={({ isActive }) =>
                            `align-items-center list-Item  d-flex ${
                              isActive || currentPage === "banking-new"
                                ? "active"
                                : ""
                            }`
                          }
                          onClick={() => handlePageClick("banking-new")}
                        >
                          <Bank size="20" variant="Bold" className="-mt-1" />

                          <span className="sidebar-label hidden lg:inline-block Title font-gilroy font-semibold text-sm">
                            Banking New
                          </span>
                        </NavLink>
                      </OverlayTrigger>
                    </li>
                  )}
                  <li
                    className={`flex relative list-none mt-[${billingOpen ? "0.5" : "2.5"}] items-center px-3 py-3 rounded collapsible-header
    ${billingOpen ? "bg-[#F6F8FF] text-[#1E45E1]" : "bg-white text-[#64748B]"} cursor-pointer list-Item`}
                    onClick={() => {
                      const next = !billingOpen;
                      setBillingOpen(next);
                      setManageOpen(false);
                      setIsMdSidebarExpanded(next);
                    }}
                  >
                    <OverlayTrigger
                      trigger={tooltipTrigger}
                      placement="right"
                      container={document.body}
                      delay={{ show: 200, hide: 0 }}
                      overlay={
                        <Tooltip className="custom-tooltip">
                          Billing & Payments
                        </Tooltip>
                      }
                    >
                      <DocumentText
                        size={21}
                        variant="Bold"
                        className="-mt-1"
                      />
                    </OverlayTrigger>

                    <span className="sidebar-label hidden lg:inline-block Title font-gilroy font-semibold text-[14px]">
                      Billing & Payments
                    </span>

                    <span className="ml-auto inline-flex">
                      {billingOpen ? (
                        <ArrowUp2 size={16} />
                      ) : (
                        <ArrowDown2 size={16} />
                      )}
                    </span>
                  </li>

                  {billingOpen && (
                    <div
                      className={`submenu ${billingOpen ? "open" : ""}`}
                      style={{}}
                    >
                      <ul className="p-1 relative">
                        <li
                          className={`list-none ${billingOpen ? "mt-0.5" : "mt-2.5"}`}
                        >
                          <NavLink
                            to={withHostel("/invoice")}
                            className={({ isActive }) =>
                              `align-items-center list-sub-Item d-flex ${
                                isActive || currentPage === "invoice"
                                  ? "active"
                                  : ""
                              }`
                            }
                            onClick={() => handlePageClick("invoice")}
                            style={{ textDecoration: "none" }}
                          >
                            <OverlayTrigger
                              trigger={tooltipTrigger}
                              placement="right"
                              container={document.body}
                              delay={{ show: 200, hide: 0 }}
                              overlay={
                                <Tooltip className="custom-tooltip">
                                  Bills
                                </Tooltip>
                              }
                            >
                              <Receipt
                                size="22"
                                variant="Bold"
                                className="ml-1 -mt-1"
                              />
                            </OverlayTrigger>

                            <span className="sidebar-label hidden lg:inline-block Title font-gilroy font-semibold text-sm">
                              Bills
                            </span>
                          </NavLink>
                        </li>

                        <li className="list-none rounded-md">
                          <NavLink
                            to={withHostel("/booking")}
                            className={({ isActive }) =>
                              `list-sub-Item d-flex no-underline cursor-pointer align-items-center ${
                                isActive || currentPage === "booking"
                                  ? "active"
                                  : ""
                              }`
                            }
                            onClick={() => handlePageClick("booking")}
                          >
                            <OverlayTrigger
                              trigger={tooltipTrigger}
                              placement="right"
                              container={document.body}
                              delay={{ show: 200, hide: 0 }}
                              overlay={
                                <Tooltip className="custom-tooltip">
                                  Bookings
                                </Tooltip>
                              }
                            >
                              <CalendarAdd
                                variant="Bold"
                                size="22"
                                className="-mt-1"
                              />
                            </OverlayTrigger>

                            <span className="sidebar-label hidden lg:inline-block Title font-gilroy font-semibold text-sm">
                              Bookings
                            </span>
                          </NavLink>
                        </li>

                        <li className="list-none">
                          <NavLink
                            to={withHostel("/recurring")}
                            className={({ isActive }) =>
                              `list-sub-Item d-flex no-underline cursor-pointer align-items-center ${
                                isActive || currentPage === "recurring"
                                  ? "active"
                                  : ""
                              }`
                            }
                            onClick={() => handlePageClick("recurring")}
                          >
                            <OverlayTrigger
                              trigger={tooltipTrigger}
                              placement="right"
                              container={document.body}
                              delay={{ show: 200, hide: 0 }}
                              overlay={
                                <Tooltip className="custom-tooltip">
                                  Recurring bills
                                </Tooltip>
                              }
                            >
                              <RulerPen
                                variant="Bold"
                                size="22"
                                className="-mt-1"
                              />
                            </OverlayTrigger>

                            <span className="sidebar-label hidden lg:inline-block Title font-gilroy font-semibold text-sm">
                              Recurring bills
                            </span>
                          </NavLink>
                        </li>

                        <li className="list-none">
                          <NavLink
                            to={withHostel("/receipts")}
                            className={({ isActive }) =>
                              `list-sub-Item d-flex no-underline cursor-pointer align-items-center ${
                                isActive || currentPage === "receipts"
                                  ? "active"
                                  : ""
                              }`
                            }
                            onClick={() => handlePageClick("receipts")}
                          >
                            <OverlayTrigger
                              trigger={tooltipTrigger}
                              placement="right"
                              container={document.body}
                              delay={{ show: 200, hide: 0 }}
                              overlay={
                                <Tooltip className="custom-tooltip">
                                  Receipts
                                </Tooltip>
                              }
                            >
                              <DocumentText
                                variant="Bold"
                                size="22"
                                className="-mt-1"
                              />
                            </OverlayTrigger>

                            <span className="sidebar-label hidden lg:inline-block Title font-gilroy font-semibold text-sm">
                              Receipts
                            </span>
                          </NavLink>
                        </li>

                        {isDevelopment && (
                          <>
                            {/* <li className="list-none">
                              <NavLink
                                to={withHostel("/receipts/new/")}
                                className={({ isActive }) =>
                                  `list-sub-Item d-flex no-underline cursor-pointer align-items-center ${
                                    isActive || currentPage === "receipts-new"
                                      ? "active"
                                      : ""
                                  }`
                                }
                                onClick={() => handlePageClick("receipts")}
                              >
                                <OverlayTrigger
                                  trigger={tooltipTrigger}
                                  placement="right"
                                  container={document.body}
                                  delay={{ show: 200, hide: 0 }}
                                  overlay={
                                    <Tooltip className="custom-tooltip">
                                      Receipts
                                    </Tooltip>
                                  }
                                >
                                  <DocumentText
                                    variant="Bold"
                                    size="22"
                                    className="-mt-1"
                                  />
                                </OverlayTrigger>

                                <span className="sidebar-label hidden lg:inline-block Title font-gilroy font-semibold text-sm">
                                  Receipts New
                                </span>
                              </NavLink>
                            </li> */}
                            <li className="list-none">
                              <NavLink
                                to={withHostel("/retainer-invoice")}
                                className={({ isActive }) =>
                                  `list-sub-Item d-flex no-underline cursor-pointer align-items-center ${
                                    isActive ||
                                    currentPage === "retainer-invoice"
                                      ? "active"
                                      : ""
                                  }`
                                }
                                onClick={() =>
                                  handlePageClick("retainer-invoice")
                                }
                              >
                                <OverlayTrigger
                                  trigger={tooltipTrigger}
                                  placement="right"
                                  container={document.body}
                                  delay={{ show: 200, hide: 0 }}
                                  overlay={
                                    <Tooltip className="custom-tooltip">
                                      Retainer Invoice
                                    </Tooltip>
                                  }
                                >
                                  <Calendar
                                    variant="Bold"
                                    size="22"
                                    className="-mt-1"
                                  />
                                </OverlayTrigger>

                                <span className="sidebar-label hidden lg:inline-block Title font-gilroy font-semibold text-sm">
                                  Retainer Invoice
                                </span>
                              </NavLink>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  )}

                  <li className={`list-none ${manageOpen ? "mt-0.5" : "mt-2"}`}>
                    <OverlayTrigger
                      trigger={tooltipTrigger}
                      placement="right"
                      container={document.body}
                      delay={{ show: 200, hide: 0 }}
                      overlay={
                        <Tooltip className="custom-tooltip">
                          Electricity
                        </Tooltip>
                      }
                    >
                      <NavLink
                        to={withHostel("/electricity")}
                        className={({ isActive }) =>
                          `align-items-center list-Item d-flex no-underline cursor-pointer ${
                            isActive || currentPage === "eb" ? "active" : ""
                          }`
                        }
                        onClick={() => handlePageClick("eb")}
                      >
                        <Flash size="22" variant="Bold" />

                        <span className="sidebar-label hidden lg:inline-block Title font-gilroy font-semibold text-sm">
                          Electricity
                        </span>
                      </NavLink>
                    </OverlayTrigger>
                  </li>

                  <li className={`list-none ${manageOpen ? "mt-0.5" : "mt-2"}`}>
                    <OverlayTrigger
                      trigger={tooltipTrigger}
                      placement="right"
                      container={document.body}
                      delay={{ show: 200, hide: 0 }}
                      overlay={
                        <Tooltip className="custom-tooltip">Compliants</Tooltip>
                      }
                    >
                      <NavLink
                        to={withHostel("/compliance")}
                        className={({ isActive }) =>
                          `align-items-center list-Item d-flex no-underline cursor-pointer ${
                            isActive || currentPage === "compliance"
                              ? "active"
                              : ""
                          }`
                        }
                        onClick={() => handlePageClick("compliance")}
                      >
                        <MessageQuestion size="22" variant="Bold" />

                        <span className="sidebar-label hidden lg:inline-block Title font-gilroy font-semibold text-sm">
                          Compliants
                        </span>
                      </NavLink>
                    </OverlayTrigger>
                  </li>

                  <li className={`list-none ${manageOpen ? "mt-0.5" : "mt-2"}`}>
                    <OverlayTrigger
                      trigger={tooltipTrigger}
                      placement="right"
                      container={document.body}
                      delay={{ show: 200, hide: 0 }}
                      overlay={
                        <Tooltip className="custom-tooltip">Expenses</Tooltip>
                      }
                    >
                      <NavLink
                        to={withHostel("/expense")}
                        className={({ isActive }) =>
                          `align-items-center list-Item d-flex no-underline cursor-pointer ${
                            isActive || currentPage === "expenses"
                              ? "active"
                              : ""
                          }`
                        }
                        onClick={() => handlePageClick("expenses")}
                      >
                        <MoneySend size="20" variant="Bold" />

                        <span className="sidebar-label hidden lg:inline-block Title font-gilroy font-semibold text-sm">
                          Expenses
                        </span>
                      </NavLink>
                    </OverlayTrigger>
                  </li>

                  {/* {isDevelopment && (
                    <li
                      className={`list-none ${manageOpen ? "mt-0.5" : "mt-2"}`}
                    >
                      <OverlayTrigger
                        trigger={tooltipTrigger}
                        placement="right"
                        container={document.body}
                        delay={{ show: 200, hide: 0 }}
                        overlay={
                          <Tooltip className="custom-tooltip">Expenses</Tooltip>
                        }
                      >
                        <NavLink
                          to={withHostel("/expense/new")}
                          className={({ isActive }) =>
                            `align-items-center list-Item d-flex no-underline cursor-pointer ${
                              isActive || currentPage === "expenses-new"
                                ? "active"
                                : ""
                            }`
                          }
                          onClick={() => handlePageClick("expenses-new")}
                        >
                          <MoneySend size="20" variant="Bold" />

                          <span className="sidebar-label hidden lg:inline-block Title font-gilroy font-semibold text-sm">
                            Expenses New
                          </span>
                        </NavLink>
                      </OverlayTrigger>
                    </li>
                  )} */}
                  <li className={`list-none ${manageOpen ? "mt-0.5" : "mt-2"}`}>
                    <OverlayTrigger
                      trigger={tooltipTrigger}
                      placement="right"
                      container={document.body}
                      delay={{ show: 200, hide: 0 }}
                      overlay={
                        <Tooltip className="custom-tooltip">Reports</Tooltip>
                      }
                    >
                      <NavLink
                        to={withHostel("/reports")}
                        className={({ isActive }) =>
                          `align-items-center list-Item d-flex no-underline cursor-pointer ${
                            isActive || currentPage === "reports"
                              ? "active"
                              : ""
                          }`
                        }
                        onClick={() => handlePageClick("reports")}
                      >
                        <Chart size="20" variant="Bold" />

                        <span className="sidebar-label hidden lg:inline-block Title font-gilroy font-semibold text-sm">
                          Reports
                        </span>
                      </NavLink>
                    </OverlayTrigger>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto h-screen min-w-0">
            <Routes>
              <Route path="/payment-preview" element={<PaymentPreview />} />
              <Route path="/graph" element={<GraphQL />} />

              <Route
                path="/dashboard/:hostelId?"
                element={
                  <div className="bg-[#FAFAFA] pt-1 pl-3 pr-1">
                    <Dashboard
                      displayCompliance={handledisplaycompliace}
                      allPageHostel_Id={allPageHostel_Id}
                      setAllPageHostel_Id={setAllPageHostel_Id}
                    />
                  </div>
                }
              />

              <Route
                path="/paying-guest/:hostelId?"
                element={
                  <div className="mt-1 ml-2.5 mr-1">
                    <PgLists
                      displaysettings={handledisplaySettingsPG}
                      allPageHostel_Id={allPageHostel_Id}
                      setAllPageHostel_Id={setAllPageHostel_Id}
                    />
                  </div>
                }
              />

              <Route
                path="/tenant/:hostelId?"
                element={
                  <div className="mt-1 ml-2.5 mr-1">
                    <UserLists
                      allPageHostel_Id={allPageHostel_Id}
                      setAllPageHostel_Id={setAllPageHostel_Id}
                    />
                  </div>
                }
              />
              <Route
                path="/tenant/final-settlement/:tenantId?"
                element={
                  <div>
                    <FinalSettlement />
                  </div>
                }
              />

              <Route
                path="/invoice/:hostelId?"
                element={
                  <div className="mt-1 ml-2.5 mr-1">
                    <Invoices
                      allPageHostel_Id={allPageHostel_Id}
                      setAllPageHostel_Id={setAllPageHostel_Id}
                    />
                  </div>
                }
              />

              <Route
                path="/booking/:hostelId?"
                element={
                  <div className="mt-1 ml-2.5 mr-1">
                    <Booking />
                  </div>
                }
              />
              <Route
                path="/booking/details/:hostelId?"
                element={
                  <div className="mt-1 ml-2.5 mr-1">
                    <BookingsPdfDetails />
                  </div>
                }
              />

              <Route
                path="/recurring/:hostelId?"
                element={
                  <div className="mt-1 ml-2.5 mr-1">
                    <RecurringBills />
                  </div>
                }
              />
              <Route
                path="/receipts/:hostelId?"
                element={
                  <div className="mt-1 ml-2.5 mr-1">
                    <ReceiptNew />
                  </div>
                }
              />
              <Route
                path="/receipts/details/:receiptId?"
                element={
                  <div className="mt-1 ml-2.5 mr-1">
                    <ReceiptPdfDetails />
                  </div>
                }
              />
              <Route
                path="/invoice/details/:invoiceId?"
                element={
                  <div className="mt-1 ml-2.5 mr-1">
                    <BillsPdfDetails />
                  </div>
                }
              />
              {/* <Route
                path="/vendor/:hostelId?"
                element={
                  <div className="mt-1 ml-2.5 mr-1">
                    <VendorComponent
                      allPageHostel_Id={allPageHostel_Id}
                      setAllPageHostel_Id={setAllPageHostel_Id}
                    />
                  </div>
                }
              /> */}

              <Route
                path="/vendor/:hostelId?"
                element={
                  <div className="mt-1 ml-2.5 mr-1">
                    <VendorNew />
                  </div>
                }
              />

              <Route
                path="/add-expense/:hostelId?"
                element={
                  <div className="mt-1 ml-2.5 mr-1">
                    <AddExpenseNew />
                  </div>
                }
              />

              <Route
                path="/add-vendor/:hostelId?"
                element={
                  <div className="mt-1 ml-2.5 mr-1">
                    <AddVendorNew />
                  </div>
                }
              />
              {isDevelopment && (
                <>
                  {/* <Route
                    path="/vendor/new/:hostelId?"
                    element={
                      <div className="mt-1 ml-2.5 mr-1">
                        <VendorNew />
                      </div>
                    }
                  /> */}

                  {/* <Route
                    path="/expense/new/:hostelId?"
                    element={
                      <div className="mt-1 ml-2.5 mr-1">
                        <ExpenseNew />
                      </div>
                    }
                  /> */}

                  <Route
                    path="/banking/new/:hostelId?"
                    element={
                      <div className="mt-1 ml-2.5 mr-1">
                        <BankingNew />
                      </div>
                    }
                  />

                  <Route
                    path="/add-retainer/:hostelId?"
                    element={
                      <div className="mt-1 ml-2.5 mr-1">
                        <AddRetainerInvoice />
                      </div>
                    }
                  />

                  <Route
                    path="/retainer-invoice/:hostelId?"
                    element={
                      <div className="mt-1 ml-2.5 mr-1">
                        <RetainerInvoice />
                      </div>
                    }
                  />

                  {/* <Route
                    path="/receipts/new/:hostelId?"
                    element={
                      <div className="mt-1 ml-2.5 mr-1">
                        <ReceiptNew />
                      </div>
                    }
                  /> */}
                </>
              )}
              <Route
                path="/compliance/:hostelId?"
                element={
                  <div className="mt-1 ml-2.5 mr-1">
                    <Compliances
                      allPageHostel_Id={allPageHostel_Id}
                      setAllPageHostel_Id={setAllPageHostel_Id}
                    />
                  </div>
                }
              />
              <Route
                path="/asset/:hostelId?"
                element={
                  <div className="mt-1 ml-2.5 mr-1">
                    <Assets allPageHostel_Id={allPageHostel_Id} />
                  </div>
                }
              />
              <Route
                path="/reports/:hostelId?"
                element={
                  <div className="mt-1 ml-2.5 mr-2.5">
                    <Report
                      allPageHostel_Id={allPageHostel_Id}
                      setAllPageHostel_Id={setAllPageHostel_Id}
                    />
                  </div>
                }
              />
              <Route
                path="/electricity/:hostelId?"
                element={
                  <div className="mt-1 ml-2.5 mr-1">
                    <EbHostel
                      allPageHostel_Id={allPageHostel_Id}
                      setAllPageHostel_Id={setAllPageHostel_Id}
                    />
                  </div>
                }
              />

              <Route
                path="/expense/:hostelId?"
                element={
                  <div className="mt-1 ml-2.5 mr-1">
                    <ExpenseNew />
                  </div>
                }
              />
              <Route
                path="/banking/:hostelId?"
                element={
                  <div className="mt-1 ml-2.5 mr-1">
                    <Banking
                      allPageHostel_Id={allPageHostel_Id}
                      setAllPageHostel_Id={setAllPageHostel_Id}
                    />
                  </div>
                }
              />

              <Route
                path="/create-bill"
                element={
                  <div className="mt-1 ml-2.5 mr-1">
                    <CreateBill />
                  </div>
                }
              />

              <Route
                path="/tenant/details/:tenantId"
                element={
                  <div className="mt-1 ml-2.5 mr-1">
                    <UserListRoomDetail />
                  </div>
                }
              />

              <Route
                path="/tenant/checkout/details/:tenantId"
                element={
                  <div className="mt-1 ml-2.5 mr-1">
                    <CheckoutProfile />
                  </div>
                }
              />

              <Route
                path="/reports/invoice-register/:hostelId"
                element={
                  <div>
                    <InvoiceRegister />
                  </div>
                }
              />
              <Route
                path="/reports/tenant-register/:hostelId"
                element={
                  <div>
                    <TenantsRegister />
                  </div>
                }
              />
              <Route
                path="/reports/receipt-register/:hostelId"
                element={
                  <div>
                    <ReceiptRegister />
                  </div>
                }
              />
              <Route
                path="/reports/expense-register/:hostelId"
                element={
                  <div>
                    <ExpenseRegister />
                  </div>
                }
              />

              {import.meta.env.MODE === "development" ||
                (import.meta.env.MODE === "qa" && (
                  <>
                    <Route
                      path="/reports/bank-transaction-register/:hostelId"
                      element={
                        <div>
                          <BankTransactionRegister />
                        </div>
                      }
                    />

                    <Route
                      path="/reports/occupancy-register/:hostelId"
                      element={
                        <div>
                          <OccupancyRegister />
                        </div>
                      }
                    />

                    <Route
                      path="/reports/vendor-register/:hostelId"
                      element={
                        <div>
                          <VendorRegister />
                        </div>
                      }
                    />
                    <Route
                      path="/reports/electricity-billing-register/:hostelId"
                      element={
                        <div>
                          <ElectricityRegister />
                        </div>
                      }
                    />
                    <Route
                      path="/reports/request-register/:hostelId"
                      element={
                        <div>
                          <RequestRegister />
                        </div>
                      }
                    />
                    <Route
                      path="/reports/final-settlement-register/:hostelId"
                      element={
                        <div>
                          <FinalSettlementRegister />
                        </div>
                      }
                    />

                    <Route
                      path="/reports/complaint-register/:hostelId"
                      element={
                        <div>
                          <ComplaintsRegister />
                        </div>
                      }
                    />
                  </>
                ))}

              <Route
                path="/reports/month-revenue/:hostelId"
                element={
                  <div className="bg-[#FFFFFF] ">
                    <AnalyticalMonthRevenue />
                  </div>
                }
              />

              <Route
                path="/reports/collected-outstanding/:hostelId"
                element={
                  <div className="bg-[#FFFFFF]">
                    <AnalyticalCollectedOutstanding />
                  </div>
                }
              />

              <Route
                path="/reports/vacant-occupied/:hostelId"
                element={
                  <div>
                    <AnalyticalVacantOcupied />
                  </div>
                }
              />

              <Route
                path="/reports/expense-trend/:hostelId"
                element={
                  <div>
                    <AnalyticalExpenseTrend />
                  </div>
                }
              />
              <Route
                path="/reports/overdue-invoice-trend/:hostelId"
                element={
                  <div>
                    <AnalyticalInvoiceTrend />
                  </div>
                }
              />
              <Route
                path="/reports/complaints-resolved/:hostelId"
                element={
                  <div>
                    <AnalyticalComplaintsResolved />
                  </div>
                }
              />
              <Route
                path="/settings/:hostelId?/*"
                element={
                  <div>
                    <SettingAllPages
                      allPageHostel_Id={allPageHostel_Id}
                      setAllPageHostel_Id={setAllPageHostel_Id}
                      payingGuestName={payingGuestName}
                      settignspgshow={settignspgshow}
                      onhandleShowsettingsPG={handleShowsettingsPG}
                      isVisibleSidebar={isVisibleSidebar}
                    />
                  </div>
                }
              >
                <Route index element={<Navigate to="general" replace />} />
                <Route path="general" element={<SettingGeneral />} />
                <Route path="manage-pg" element={<SettingManage />} />
                <Route path="security" element={<SettingSecurity />} />
                <Route path="subscription" element={<SettingSubscription />} />
                <Route path="allplans" element={<AllPlans />} />

                <Route path="integration" element={<SettingIntergration />} />
                <Route
                  path="electricity"
                  element={<SettingsElectricityNew />}
                />
                {/* <Route path="electricity-old" element={<SettingElectricity />} /> */}
                <Route path="electricity-rule" element={<ElectricityRule />} />
                {/* <Route path="billing-rule-old" element={<BillingRuleOld />} /> */}
                <Route path="billing-rule" element={<BillingRule />} />

                <Route
                  path="long-stay-recurring"
                  element={<LongStayRecurringModal />}
                />
                <Route
                  path="notifications"
                  element={<SettingsNotifications />}
                />
                <Route
                  path="invoice"
                  element={<SettingInvoice handleFormPage={handleFormPage} />}
                />
                <Route path="expenses" element={<SettingExpenses />} />
                <Route path="vendor-category" element={<VendorCategory />} />
                <Route path="complaints" element={<SettingCompliance />} />
                <Route path="amenities" element={<SettingAmenities />} />
                <Route path="user" element={<SettingNewUser />} />
                <Route path="role" element={<SettingNewRole />} />
                <Route path="agreement" element={<SettingAgreement />} />
              </Route>
            </Routes>
          </div>

          <div className="right-panel w-14 flex flex-col h-screen bg-slate-50 border-l border-slate-200 shadow-sm overflow-y-auto items-center flex-shrink-0">
            {/* Profile Area */}
            <div
              ref={profileAreaRef}
              onClick={() => setShowProfileCard((s) => !s)}
              role="button"
              tabIndex={0}
              className="flex flex-col items-center justify-center text-center gap-2 pt-2.5 cursor-pointer"
            >
              {profiles === "null" ||
              profiles === null ||
              profiles === undefined ||
              profiles === "undefined" ||
              profiles === "" ||
              profiles === 0 ||
              profiles === "0" ? (
                <div className="h-11 w-11 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-semibold text-base uppercase flex-shrink-0 mx-2">
                  {stateData?.accountList?.initial || ""}
                </div>
              ) : (
                <Image
                  src={profiles}
                  alt="profile-image"
                  roundedCircle
                  className="h-12 w-12 object-cover flex-shrink-0"
                />
              )}
            </div>

            <button
              onClick={() => setShowMenuModal(true)}
              title="Quick Add"
              className="w-8 h-8 rounded-lg bg-emerald-700 hover:bg-emerald-600 border-0 text-white text-xl font-bold cursor-pointer flex items-center justify-center mt-4 transition-colors leading-none pb-0.5"
            >
              +
            </button>

            <div className="flex flex-col items-center justify-start gap-4 mt-7">
              <div
                className="relative flex flex-col items-center gap-1 cursor-pointer"
                title="Search"
              >
                <img src={SearchVector} alt="Search" className="w-6 h-6" />
              </div>

              <div
                onClick={handleShowNotification}
                onMouseEnter={() => handleMouseEnter("notification")}
                onMouseLeave={handleMouseLeave}
                className="relative flex flex-col items-center gap-1 cursor-pointer"
                title="Notifications"
              >
                <div className="relative">
                  <Notification
                    className="w-6 h-6"
                    color={
                      hoveredIcon === "notification" ? "#1E45E1" : "#64748B"
                    }
                    onClick={handleShowNotification}
                  />

                  {state.UsersList.hotelDetailsinPg.unreadNotificationCount >
                    0 && (
                    <span className="absolute -top-1.5 -right-1.5 min-h-[18px] min-w-[18px] px-1 flex justify-center items-center bg-orange-500 text-white text-[10px] text-center rounded-full border-2 border-white font-semibold leading-none">
                      {
                        state.UsersList?.hotelDetailsinPg
                          ?.unreadNotificationCount
                      }
                    </span>
                  )}
                </div>
              </div>

              <NavLink
                to={settingsPath}
                onMouseEnter={() => handleMouseEnter("settings")}
                onMouseLeave={handleMouseLeave}
                onClick={() => {
                  handlePageClick("settingNewDesign");
                  setSettingsPGShow(false);
                }}
                className={({ isActive }) =>
                  `settings-link ${isActive ? "active" : ""} cursor-pointer relative flex flex-col items-center gap-1 no-underline transition-transform`
                }
                title="Settings"
              >
                <img
                  src={SettingIcon}
                  alt="Settings Icon"
                  className="w-6 h-6"
                />
              </NavLink>

              <div
                onMouseEnter={() => handleMouseEnter("helpVideo")}
                onMouseLeave={handleMouseLeave}
                className="relative flex flex-col items-center gap-1 cursor-pointer"
                title="Help Video"
              >
                <img
                  src={HelpVideoIcon}
                  alt="Help Video Icon"
                  className="w-6 h-6"
                />
              </div>
            </div>
          </div>
        </div>

        <SidebarProfile
          profiles={profiles}
          stateData={stateData}
          profilename={profilename}
          payingGuestName={payingGuestName}
          showProfileCard={showProfileCard}
          setShowProfileCard={setShowProfileCard}
          handleShowLogout={handleShowLogout}
          navigate={navigate}
          profileCardRef={profileCardRef}
          handleShowsettingsGenaral={handleShowsettingsGenaral}
        />

        <SidebarQuickActions
          showMenuModal={showMenuModal}
          setShowMenuModal={setShowMenuModal}
          navigate={navigate}
          hostelId={allPageHostel_Id}
        />
      </div>

      {logoutformshow && (
        <Logout show={logoutformshow} handleClose={handleCloseLogout} />
      )}
    </>
  );
}

export default Sidebar;

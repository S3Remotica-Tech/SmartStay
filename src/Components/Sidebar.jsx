/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { StoreSelectedHostelAction } from "../Redux/Action/LoginAction";
import "../Components/Sidebar.css";
import PgLists from "../Pages/PayingGuestFile/PgList";
import UserLists from "../Pages/CustomerFile/UserList";
import EbHostel from "../Pages/ElectrictyFile/EB_Hostel";
import Invoices from "../Pages/Bills/Invoice";
import Compliances from "../Pages/Compliants/Compliance";
import Report from "../Reports/Reports";
import { useDispatch, useSelector } from "react-redux";
import Image from "react-bootstrap/Image";
import "bootstrap/dist/css/bootstrap.min.css";
import "sweetalert2/dist/sweetalert2.min.css";
import CryptoJS from "crypto-js";
import Smartstay from "../Assets/Images/New_images/LogoSmart.svg";
import Assets from "../Pages/AssetFile/Asset";
// import Banking from "../Pages/Banking/Banking";
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
import TenantOverview from "../Pages/CustomerFile/TenantOverview";
import CheckoutProfile from "../Pages/CustomerFile/CheckoutProfile";
import SettingSubscription from "../Pages/SubscriptionFile/SettingSubscription";
import SettingIntergration from "../Pages/Settings/SettingIntergration";
import SettingInvoice from "../Pages/Settings/SettingInvoice";
import SettingExpenses from "../Pages/Settings/SettingExpenses";
import SettingCompliance from "../Pages/Settings/SettingCompliance";
import SettingAmenities from "../Pages/Settings/SettingAmenities";
import SettingNewUser from "../Pages/Settings/SettingUserNew";
import SettingNewRole from "../Pages/Settings/RoleFile/SettingNewRole";
import SettingsNotifications from "../Pages/Settings/SettingsNotifications";
import SettingAgreement from "../Pages/Settings/Agreement/SettingAgreement";
import BillingRule from "../Pages/Settings/BillingRule/BillingRule";
import SettingGeneral from "../Pages/Settings/SettingGeneral";
import SettingManage from "../Pages/Settings/SettingManage";
import ManagePg from "../Pages/Settings/ManagePG/ManagePg";
import ChangeBedTenantWay from "../Pages/CustomerFile/ChangeBedTenantWay";
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
  ArrowUp2,
  ArrowDown2,
  Chart2,
  DocumentText,
  Buildings,
  Messages1,
  Chart1,
  SearchNormal1,
  HambergerMenu,
} from "iconsax-react";
import NotificationForm from "../Utils/Notification";
import SidebarProfile from "./SidebarProfile";
import SidebarQuickActions from "./SidebarQuickActions";
import PaymentPreview from "../Pages/SubscriptionFile/PaymentPreview";
import SettingSecurity from "../Pages/Settings/SettingSecurityPage";
import Booking from "../Pages/Bookings/Booking";
import RecurringBills from "../Pages/Recurring/RecurringBills";
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
import MoveToNoticePGAndTenant from "../Pages/CustomerFile/MoveToNoticePGAndTenant";
import Dashboard from "../Pages/Dashboard/Dashboard";
import AnalyticalCollectedOutstanding from "../Reports/AnalyticalCollectedVsOutstanding.jsx/AnalyticalCollectedOutstanding";
import AnalyticalMonthRevenue from "../Reports/AnalyticalMonthRevenue/AnalyticalMonthRevenue";
import AnalyticalVacantOcupied from "../Reports/AnalyticalVacantOcupied/AnalyticalVacantOcupied";
import AnalyticalExpenseTrend from "../Reports/AnalyticalExpenseTrend/AnalyticalExpenseTrend";
import AnalyticalInvoiceTrend from "../Reports/AnalyticalInvoiceTrend/AnalyticalInvoiceTrend";
import AnalyticalComplaintsResolved from "../Reports/AnalyticalComplaintsResolved/AnalyticalComplaintsResolved";
import GraphQL from "../Pages/Dashboard/GraphQL";
import LongStayRecurringModal from "../Pages/Settings/BillingRule/LongStay";
import SettingsElectricityNew from "../Pages/Settings/ElectricityRule/SettingsElectricityNew";
import ElectricityRule from "../Pages/Settings/ElectricityRule/ElectricityRule";
import AllPlans from "../Pages/SubscriptionFile/AllPlans";
import VendorNew from "../Pages/VendorFIle/VendorNew";
import AddVendorNew from "../Pages/VendorFIle/AddVendorNew";
import ExpenseNew from "../Pages/ExpenseFile/ExpenseNew";
import AddExpenseNew from "../Pages/ExpenseFile/AddExpenseNew";
import BankingNew from "../Pages/Banking/BankingNew";
import VendorCategory from "../Pages/Settings/Vendor/VendorCategory";
import ReceiptNew from "../Pages/Receipt/ReceiptNew";
import AddRetainerInvoice from "../Pages/Bookings/AddRetainerInvoice";
import Request from "../Pages/Request/Request";
import ChangeBedPgView from "../Pages/Request/ChangeBedPgView";
import TenantAppControls from "../Pages/Settings/TenantAppControls";
import AddTemplate from "../Pages/Settings/Agreement/AddTemplate";
import NewInvoice from "../Pages/Bills/NewInvoice";
import BillTemplates from "../Pages/Settings/BillTemplates/BillTemplates";
import CustomTooltip from "../Utils/CustomTooltip";

function Sidebar() {
  // Laptop density (index.css): only the logged-in product, not login/landing.
  useEffect(() => {
    document.documentElement.classList.add("app-density");
    return () => document.documentElement.classList.remove("app-density");
  }, []);
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
  const [serviceDesk, setServiceDesk] = useState(false);
  // Mobile (<md) drawer visibility. Closed by default so the page is visible on load.
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMdSidebarExpanded, setIsMdSidebarExpanded] = useState(false);
  const isFirstLogin = useRef(true);
  const dropdownRef = useRef(null);
  const [isVisibleSidebar, setIsVisibleSidebar] = useState(false);
  const [showNotify, setShowNotify] = useState(false);
  const [customerDetails, setCustomerDetails] = useState(null);
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const profileCardRef = useRef(null);
  const profileAreaRef = useRef(null);
  const cookies = new Cookies();
  const [hostelListDetail, setHostelDetail] = useState([]);
  const [profiles, setProfiles] = useState(null);
  const [profilename, setProfileArray] = useState("");
  const hostelId = state?.login?.selectedHostel_Id;
  const [logoutformshow, setLogoutformshow] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [settignspgshow, setSettingsPGShow] = useState(false);
  const [selectedProfileImage, setSelectedProfileImage] = useState("");
  const [initials, setInitials] = useState("");
  const [locationName, setLocationName] = useState("");
  const [isMd, setIsMd] = React.useState(
    window.innerWidth >= 768 && window.innerWidth < 1024,
  );
  const settingsPath = hostelId ? `/settings/${hostelId}` : `/settings`;
  const RoleAccess =
    state.createAccount?.accountList?.roleId === 1 ||
    state.createAccount?.accountList?.roleId === 2;
  const cookieHostelId = cookies.get("selected_hostelId");
  const [changebedShow, setChangeBedShow] = useState(false);
  const [customerCheckoutpage, setCustomerCheckoutpage] = useState(false);

  const tooltipTrigger = isMd ? ["hover", "focus"] : [];

  const [hostelSearch, setHostelSearch] = useState("");
  const isDevelopment = import.meta.env.MODE === "development";
  // const isProduction = import.meta.env.MODE === "production";


  const handleSearchChange = (e) => {
    setHostelSearch(e.target.value);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    setCurrentPage("dashboard");
    localStorage.setItem("currentPage", "dashboard");
  };

  const handlePageClick = (page) => {
    handleFormPage(false);
    setCurrentPage(page);
    setIsDropdownOpen(false);
    setIsMdSidebarExpanded(false);
    localStorage.setItem("currentPage", page);
    setIsSidebarOpen(false);
    dispatch(checkoutCustomerProfile(true));
  };

  const handleMouseEnter = (icon) => setHoveredIcon(icon);
  const handleMouseLeave = () => setHoveredIcon(null);

  const handleShowLogout = () => {
    setLogoutformshow(true);
  };

  const handleCloseLogout = () => {
    setLogoutformshow(false);
  };

  // const handledisplaycompliace = () => {
  //   setCurrentPage("compliance");
  //   localStorage.setItem("currentPage", "compliance");
  //   setIsSidebarOpen(false);
  // };

  const handledisplaySettingsPG = () => {
    setCurrentPage("settingNewDesign");
    localStorage.setItem("currentPage", "settingNewDesign");
    setSettingsPGShow(true);
    setIsSidebarOpen(false);
  };

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
    setHostelSearch("");
  };

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

  const handleFormPage = (isVisible) => {
    setIsVisibleSidebar(isVisible);
  };

  const handleClose = () => {
    setShowNotify(false);
  };

  const handleShowChangeBed = () => {
    setChangeBedShow(true);
    setShowNotify(false);
  }

  const handleMoveToNotice = (data) => {
    setCustomerCheckoutpage(true)
    setShowNotify(false);
    setCustomerDetails(data)
  }


  const handleShowNotification = () => {
    setShowNotify(true);
  };

  const withHostel = (path) => {
    const finalPath = hostelId ? `${path}/${hostelId}` : path;

    return finalPath;
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



  const pageMap = {
    "/dashboard": "dashboard",
    "/dashboard/:hostelId": "dashboard",
    "/paying-guest/:hostelId": "pg-list",
    "/tenant/:hostelId": "user-list",
    "/tenant/details/:tenantId": "tenant-details",
    "/invoice/:hostelId": "invoice",
    "/invoice/new/:hostelId": "invoice",
    "/invoice/details/:invoiceId": "invoice-details",
    "/booking/:hostelId": "booking",
    "/recurring/:hostelId": "recurring",
    "/receipts/:hostelId": "receipts",
    "/retainer-invoice/:hostelId": "retainer-invoice",
    "/retainer-invoice/details/:invoiceId": "retainer-invoice",
    "/vendor/:hostelId": "vendor",
    "/compliance/:hostelId": "compliance",
    "/asset/:hostelId": "asset",
    "/reports/:hostelId": "reports",
    "/electricity/:hostelId": "eb",
    "/expense/:hostelId": "expenses",
    "/banking/:hostelId": "banking",
    "/settings/:hostelId": "settingNewDesign",
    "/receipts/details/:receiptId": "receipts",
    "/tenant/checkout/details/:tenantId": "user-list",
  };



  useEffect(() => {
    const path = location.pathname;



    const matchedPage = Object.keys(pageMap)
      .sort((a, b) => b.length - a.length)
      .find((route) => {
        const regexPattern = route
          .split("/")
          .map((segment) =>
            segment.startsWith(":") ? "[^/]+" : segment
          )
          .join("/");

        const regex = new RegExp(`^${regexPattern}$`);

        return regex.test(path);
      });



    if (matchedPage) {
      setCurrentPage(pageMap[matchedPage]);
      localStorage.setItem("lastPage", path);
    }
  }, [location.pathname]);

  const lastPage = localStorage.getItem("lastPage");

  useEffect(() => {
    if (state.login?.isLoggedIn && state.login?.selectedHostel_Id) {
      if (isFirstLogin.current) {
        navigate(`/dashboard/${state.login.selectedHostel_Id}`, {
          replace: true,
        });

        isFirstLogin.current = false;
      }
    }

    else {

      if (lastPage) {
        navigate(lastPage, { replace: true });
      }
      else {
        navigate("/dashboard", { replace: true });
      }
    }
  }, [state.login?.isLoggedIn, state.login?.selectedHostel_Id, lastPage]);






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






  const isCalledRef = useRef(false);

  useEffect(() => {
    if (isCalledRef.current) return;

    isCalledRef.current = true;

    dispatch({ type: "ACCOUNTDETAILS" });
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

  // useEffect(() => {
  //   if (!state.login?.selectedHostel_Id) return;

  //   const pathParts = location.pathname.split("/").filter(Boolean);

  //   const mainPage = pathParts[0];

  //   const validPages = [
  //     "dashboard",
  //     "paying-guest",
  //     "tenant",
  //     "invoice",
  //     "compliance",
  //     "reports",
  //     "electricity",
  //     "expense",
  //     "banking",
  //     "banking-new",
  //     "settingNewDesign",
  //     "vendor",
  //     "asset",
  //     "booking",
  //     "requests",
  //   ];

  //   if (validPages.includes(mainPage) && pathParts.length > 1) {
  //     navigate(`/${mainPage}/${hostelId}`, { replace: true });
  //   }
  // }, [state.login?.selectedHostel_Id]);

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

  useEffect(() => {
    if (!hostelListDetail?.length) return;

    const selectedHostel =
      hostelListDetail.find(
        (h) =>
          String(h.hostelId) === String(cookieHostelId) ||
          String(h.hostelId) === String(state.login.selectedHostel_Id),
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
  }, [hostelListDetail, cookieHostelId, state.login.selectedHostel_Id]);

  const filteredHostels =
    hostelListDetail &&
    hostelListDetail?.filter((item) =>
      item?.name?.toLowerCase().includes(hostelSearch.toLowerCase()),
    );

  useEffect(() => {
    if (allPageHostel_Id) {
      dispatch(StoreSelectedHostelAction(allPageHostel_Id));
    }
  }, [allPageHostel_Id]);

  useEffect(() => {
    if (state.createAccount?.accountList?.roleId) {
      dispatch({
        type: "PERMISSIONROLELIST",
        payload: state.createAccount?.accountList?.roleId,
      });
    }
  }, [state.createAccount.accountList.roleId]);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMd(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close the mobile drawer with Escape.
  useEffect(() => {
    if (!isSidebarOpen) return undefined;
    const handleKey = (e) => {
      if (e.key === "Escape") setIsSidebarOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isSidebarOpen]);

  // ---- Responsive UI classes ----
  // Mobile drawer + desktop (lg): full width with labels.
  // Tablet (md): icon-only rail, widens like desktop while isMdSidebarExpanded.
  const isRailCollapsed = !isMdSidebarExpanded;
  const labelClass = isRailCollapsed
    ? "inline-block md:hidden lg:inline-block"
    : "inline-block";
  const railItemLayout = isRailCollapsed
    ? "gap-[15px] px-[16px] md:justify-center md:gap-0 md:px-0 lg:justify-start lg:gap-[15px] lg:px-[16px]"
    : "gap-[15px] px-[16px]";
  const navItemClass = (active) =>
    `flex w-full items-center py-[10px] rounded-[6px] no-underline outline-none focus:outline-none focus:ring-0 transition-colors duration-200 font-gilroy font-semibold text-sm ${railItemLayout} ${active
      ? "bg-[#1E45E1] text-white hover:bg-[#1E45E1] hover:text-white"
      : "text-[#64748B] hover:bg-[#F6F8FF] hover:text-[#1E45E1]"
    }`;
  const groupHeaderClass = (open) =>
    `flex w-full items-center py-[10px] rounded-[6px] cursor-pointer select-none border-0 transition-colors duration-200 font-gilroy font-semibold text-sm ${isRailCollapsed
      ? "gap-[15px] px-[16px] md:flex-col md:justify-center md:gap-[4px] md:px-0 lg:flex-row lg:justify-start lg:gap-[15px] lg:px-[16px]"
      : "gap-[15px] px-[16px]"
    } ${open
      ? "bg-[#F6F8FF] text-[#1E45E1]"
      : "bg-white text-[#64748B] hover:bg-[#F6F8FF] hover:text-[#1E45E1]"
    }`;
  const groupArrowClass = isRailCollapsed
    ? "inline-flex ml-auto md:ml-0 lg:ml-auto"
    : "inline-flex ml-auto";
  const submenuClass = isRailCollapsed
    ? "flex flex-col gap-[4px] list-none mb-0 mt-[4px] ml-[20px] pl-[8px] border-l border-[#E2E8F0] md:ml-0 md:pl-0 md:border-l-0 lg:ml-[20px] lg:pl-[8px] lg:border-l"
    : "flex flex-col gap-[4px] list-none mb-0 mt-[4px] ml-[20px] pl-[8px] border-l border-[#E2E8F0]";
  const sidebarWidthClass = isRailCollapsed ? "md:w-20" : "md:w-64";
  const logoClass = isRailCollapsed ? "block md:hidden lg:block" : "block";
  const hostelCardLayout = isRailCollapsed
    ? "gap-[10px] px-[8px] md:justify-center md:px-0 lg:justify-start lg:px-[8px]"
    : "gap-[10px] px-[8px]";
  const hostelDropdownPosition = isRailCollapsed
    ? "top-full left-0 w-full mt-[4px] md:top-0 md:left-full md:ml-[8px] md:mt-0 md:w-64 lg:top-full lg:left-0 lg:ml-0 lg:mt-[4px] lg:w-full"
    : "top-full left-0 w-full mt-[4px]";

  const hasProfileImage = !(
    profiles === "null" ||
    profiles === null ||
    profiles === undefined ||
    profiles === "undefined" ||
    profiles === "" ||
    profiles === 0 ||
    profiles === "0"
  );
  const unreadNotificationCount =
    state?.UsersList?.hotelDetailsinPg?.unreadNotificationCount;

  return (
    <>
      {currentPage === "settingNewDesign" ? (
        <>
          <Routes>
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
              <Route path="manage-pg-new" element={<ManagePg />} />
              <Route path="security" element={<SettingSecurity />} />
              <Route path="subscription" element={<SettingSubscription />} />
              <Route path="allplans" element={<AllPlans />} />

              <Route path="integration" element={<SettingIntergration />} />
              <Route path="electricity" element={<SettingsElectricityNew />} />
              {/* <Route path="electricity-old" element={<SettingElectricity />} /> */}
              <Route path="electricity-rule" element={<ElectricityRule />} />
              {/* <Route path="billing-rule-old" element={<BillingRuleOld />} /> */}
              <Route path="billing-rule" element={<BillingRule />} />

              <Route
                path="long-stay-recurring"
                element={<LongStayRecurringModal />}
              />
              <Route path="notifications" element={<SettingsNotifications />} />
              <Route
                path="invoice"
                element={<SettingInvoice handleFormPage={handleFormPage} />}
              />

              <Route path="bill-templates" element={<BillTemplates />} />
              <Route path="expenses" element={<SettingExpenses />} />
              <Route path="vendor-category" element={<VendorCategory />} />
              <Route path="complaints" element={<SettingCompliance />} />
              <Route path="amenities" element={<SettingAmenities />} />
              <Route path="user" element={<SettingNewUser />} />
              <Route path="role" element={<SettingNewRole />} />
              <Route path="agreement" element={<SettingAgreement />} />
              <Route path="add-template" element={<AddTemplate />} />
              <Route
                path="tenant-app-controls"
                element={<TenantAppControls />}
              />
            </Route>
          </Routes>
        </>
      ) : (
        <div className="w-full p-0">
          <div className="flex flex-col md:flex-row w-full h-screen overflow-hidden">
            {/* Mobile top bar (<md): menu, logo, quick add, notifications, profile */}
            <header className="md:hidden flex items-center justify-between h-14 shrink-0 px-[12px] bg-white border-b border-[#E2E8F0] shadow-sm z-[1020]">
              <div className="flex items-center gap-[10px] min-w-0">
                <button
                  type="button"
                  aria-label="Open menu"
                  aria-expanded={isSidebarOpen}
                  onClick={() => setIsSidebarOpen(true)}
                  className="flex items-center justify-center h-10 w-10 rounded-[8px] bg-transparent border-0 text-[#222222] hover:bg-[#F6F8FF] cursor-pointer"
                >
                  <HambergerMenu size="24" color="#222222" />
                </button>
                <img
                  src={Smartstay}
                  alt="smartstay"
                  className="h-6 w-auto max-w-[130px] cursor-pointer"
                  onClick={() => handlePageClick("dashboard")}
                />
              </div>

              <div className="flex items-center gap-[12px]">
                <button
                  type="button"
                  aria-label="Quick actions"
                  onClick={() => setShowMenuModal(true)}
                  className="w-8 h-8 rounded-[8px] bg-emerald-700 hover:bg-emerald-600 border-0 text-white text-xl font-bold cursor-pointer flex items-center justify-center leading-none pb-0.5"
                >
                  +
                </button>

                <button
                  type="button"
                  aria-label="Notifications"
                  onClick={handleShowNotification}
                  className="relative flex items-center justify-center bg-transparent border-0 p-0 cursor-pointer"
                >
                  <Notification size="24" color="#64748B" />
                  {unreadNotificationCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 min-h-[18px] min-w-[18px] px-1 flex justify-center items-center bg-orange-500 text-white text-[10px] rounded-full border-2 border-white font-semibold leading-none">
                      {unreadNotificationCount}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  aria-label="Profile"
                  onClick={() => setShowProfileCard((s) => !s)}
                  className="flex items-center justify-center bg-transparent border-0 p-0 cursor-pointer"
                >
                  {hasProfileImage ? (
                    <Image
                      src={profiles}
                      alt="profile-image"
                      roundedCircle
                      className="h-9 w-9 object-cover"
                    />
                  ) : (
                    <span className="h-9 w-9 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-semibold text-sm uppercase">
                      {stateData?.accountList?.initial || ""}
                    </span>
                  )}
                </button>
              </div>
            </header>

            {/* Mobile drawer backdrop */}
            {isSidebarOpen && (
              <div
                className="md:hidden fixed inset-0 bg-black/40 z-[1030]"
                onClick={() => setIsSidebarOpen(false)}
                aria-hidden="true"
              />
            )}

            {/* Left sidebar: drawer (<md), icon rail (md), full (lg+) */}
            <aside
              className={`fixed inset-y-0 left-0 z-[1040] w-64 max-w-[85vw] flex flex-col h-screen bg-white border-r border-[#E2E8F0] shadow-md transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:static md:z-auto md:max-w-none md:translate-x-0 md:shadow-sm md:shrink-0 md:transition-[width] ${sidebarWidthClass} lg:w-64`}
            >
              <div className="shrink-0 px-[12px] pt-[14px] pb-[8px]">
                <div className="flex items-center justify-between min-h-[24px]">
                  <img
                    src={Smartstay}
                    alt="smartstay"
                    className={`${logoClass} w-36 h-6 cursor-pointer`}
                    onClick={() => handlePageClick("dashboard")}
                  />

                  <button
                    type="button"
                    aria-label="Close menu"
                    onClick={closeSidebar}
                    className="md:hidden flex items-center justify-center h-8 w-8 rounded-[8px] bg-transparent border-0 cursor-pointer hover:bg-[#F6F8FF]"
                  >
                    <svg
                      width="22"
                      height="22"
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
                </div>

                {hostelListDetail && hostelListDetail?.length > 0 && (
                  <div
                    ref={dropdownRef}
                    onClick={toggleDropdown}
                    role="button"
                    tabIndex={0}
                    className={`relative flex items-center w-full mt-[12px] py-[10px] rounded-[8px] cursor-pointer font-gilroy text-[13px] shadow-[0_2px_4px_rgba(0,0,0,0.08)] transition-colors duration-200 ${hostelCardLayout} ${currentPage === "settingNewDesign"
                      ? "bg-[#1E45E1] text-white"
                      : "bg-white text-[#64748B] hover:bg-[#F6F8FF] hover:text-[#1E45E1]"
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
                          className="shrink-0 h-9 w-9 rounded-full object-cover"
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
                        <div className="shrink-0 h-9 w-9 min-w-9 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-semibold text-xs uppercase leading-none">
                          {initials}
                        </div>
                      </OverlayTrigger>
                    )}

                    <span className={`${labelClass} min-w-0 flex-1`}>
                      <span className="block truncate text-sm font-semibold font-gilroy text-[#222222]">
                        {payingGuestName}
                      </span>
                      <span className="flex items-center gap-1 text-[12px] text-[#9C9C9C] min-w-0">
                        <Location
                          className="shrink-0"
                          size="16"
                          color="#FF8A65"
                          variant="Bold"
                        />
                        <span className="truncate min-w-0">{locationName}</span>
                      </span>
                    </span>

                    <span
                      className={
                        isRailCollapsed
                          ? "inline-flex shrink-0 ml-auto md:hidden lg:inline-flex"
                          : "inline-flex shrink-0 ml-auto"
                      }
                    >
                      {isDropdownOpen ? (
                        <ArrowUp2 size="16" color="#4B4B4B" />
                      ) : (
                        <ArrowDown2 size="16" color="#4B4B4B" />
                      )}
                    </span>

                    {isDropdownOpen && (
                      <div
                        className={`absolute z-50 bg-white shadow-md border-[1px] border-[#E2E8F0] rounded-[8px] overflow-hidden ${hostelDropdownPosition}`}
                      >
                        <div className="px-2 py-2 border-b border-[#E2E8F0] bg-gray-100">
                          <div className="relative">
                            <SearchNormal1
                              size="16"
                              color="#9C9C9C"
                              variant="Linear"
                              className="absolute left-2 top-1/2 -translate-y-1/2"
                            />
                            <input
                              type="text"
                              value={hostelSearch}
                              onChange={handleSearchChange}
                              placeholder="Search hostel"
                              className="w-full h-9 pl-8 pr-2 text-xs border-[1px] border-gray-200 rounded-md outline-none focus:border-[#1E45E1] text-[#222222]"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                        </div>
                        <div className="max-h-48 overflow-y-auto overflow-x-hidden show-scrolls">
                          <ul className="m-0 p-0 py-1 list-none">
                            {filteredHostels?.length > 0 ? (
                              filteredHostels?.map((item) => (
                                <li
                                  key={item.id}
                                  className="flex items-center gap-2 py-2 mx-1 px-2 rounded-[6px] cursor-pointer text-[#1E45E1] hover:bg-gray-100"
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
                                      className="shrink-0 w-7 h-7 rounded-full object-cover"
                                      alt={item.initials || "Default Profile"}
                                    />
                                  ) : (
                                    <div className="shrink-0 w-7 h-7 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-semibold text-xs uppercase">
                                      {item.initials}
                                    </div>
                                  )}

                                  <div className="min-w-0 flex-1">
                                    <span
                                      className="block truncate text-sm font-gilroy"
                                      title={item.name}
                                    >
                                      {item.name}
                                    </span>
                                    <div className="flex items-center gap-1 text-[12px] text-[#9C9C9C] min-w-0">
                                      <Location
                                        className="shrink-0"
                                        size="14"
                                        color="#FF8A65"
                                        variant="Bold"
                                      />
                                      <span className="truncate min-w-0">
                                        {item.city}
                                      </span>
                                    </div>
                                  </div>
                                </li>
                              ))
                            ) : (
                              <li className="px-2 py-2 text-center text-xs text-gray-400">
                                No hostel found
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {!(hostelListDetail ?? []).length && (
                  <NavLink
                    to={RoleAccess ? settingsPath : "#"}
                    className={`flex items-center justify-center mt-[12px] font-gilroy text-white font-medium bg-[#1E45E1] shadow-sm py-2 px-2 rounded-[8px] no-underline whitespace-nowrap ${RoleAccess
                      ? "cursor-pointer"
                      : "cursor-not-allowed opacity-50 pointer-events-none"
                      }`}
                    onClick={(e) => {
                      if (!RoleAccess) {
                        e.preventDefault();
                        return;
                      }

                      handledisplaySettingsPG("manage-pg", "Manage PG");
                      dispatch({ type: "MANAGE_PG" });
                      setIsSidebarOpen(false);
                    }}
                  >
                    +<span className={`${labelClass} ml-1`}>Add PG</span>
                  </NavLink>
                )}
              </div>

              <nav className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-[8px] pb-[12px] [&::-webkit-scrollbar]:w-[2px] [&::-webkit-scrollbar-thumb]:bg-[#CBD5E1] [&::-webkit-scrollbar-thumb]:rounded-[8px]">
                <ul className="flex flex-col gap-[4px] list-none p-0 mb-0 mt-[4px] w-full">
                  <li>
                    <NavLink
                      to={withHostel("/dashboard")}
                      className={({ isActive }) => navItemClass(isActive)}
                      onClick={() => handlePageClick("dashboard")}
                    >
                      <Chart2 size="20" variant="Bold" className="shrink-0" />
                      <span className={labelClass}>Home</span>
                    </NavLink>
                  </li>

                  <li>
                    <button
                      type="button"
                      aria-expanded={manageOpen}
                      className={groupHeaderClass(manageOpen)}
                      onClick={() => {
                        const next = !manageOpen;
                        setManageOpen(next);
                        setBillingOpen(false);
                        setIsMdSidebarExpanded(next);
                        localStorage.setItem("manageOpen", !manageOpen);
                      }}
                    >
                      <Setting2 size={20} variant="Bold" className="shrink-0" />
                      <span className={labelClass}>Manage</span>
                      <span className={groupArrowClass}>
                        {manageOpen ? (
                          <ArrowUp2 size={16} color="#4B4B4B" />
                        ) : (
                          <ArrowDown2 size={16} color="#4B4B4B" />
                        )}
                      </span>
                    </button>

                    {manageOpen && (
                      <ul className={submenuClass}>
                        <li>
                          <NavLink
                            to={withHostel("/paying-guest")}
                            className={({ isActive }) => navItemClass(isActive)}
                            onClick={() => handlePageClick("pg-list")}
                          >
                            <Buildings size="20" variant="Bold" className="shrink-0" />
                            <span className={labelClass}>Paying Guest</span>
                          </NavLink>
                        </li>

                        <li>
                          <NavLink
                            to={withHostel("/tenant")}
                            className={({ isActive }) =>
                              navItemClass(
                                isActive || currentPage === "tenant-details",
                              )
                            }
                            onClick={() => handlePageClick("user-list")}
                          >
                            <Profile2User size="20" variant="Bold" className="shrink-0" />
                            <span className={labelClass}>Tenant</span>
                          </NavLink>
                        </li>

                        <li>
                          <NavLink
                            to={withHostel("/asset")}
                            className={({ isActive }) =>
                              navItemClass(isActive || currentPage === "asset")
                            }
                            onClick={() => handlePageClick("asset")}
                          >
                            <Box size="20" variant="Bold" className="shrink-0" />
                            <span className={labelClass}>Assets</span>
                          </NavLink>
                        </li>

                        <li>
                          <NavLink
                            to={withHostel("/vendor")}
                            className={({ isActive }) =>
                              navItemClass(isActive || currentPage === "vendor")
                            }
                            onClick={() => handlePageClick("vendor")}
                          >
                            <Shop size="20" variant="Bold" className="shrink-0" />
                            <span className={labelClass}>Vendor</span>
                          </NavLink>
                        </li>
                      </ul>
                    )}
                  </li>

                  <li>
                    <NavLink
                      to={withHostel("/banking")}
                      className={({ isActive }) =>
                        navItemClass(isActive || currentPage === "banking-new")
                      }
                      onClick={() => handlePageClick("banking")}
                    >
                      <Bank size="20" variant="Bold" className="shrink-0" />
                      <span className={labelClass}>Banking</span>
                    </NavLink>
                  </li>

                  <li>
                    <button
                      type="button"
                      aria-expanded={billingOpen}
                      className={groupHeaderClass(billingOpen)}
                      onClick={() => {
                        const next = !billingOpen;
                        setBillingOpen(next);
                        setManageOpen(false);
                        setIsMdSidebarExpanded(next);
                      }}
                    >
                      <DocumentText size={20} variant="Bold" className="shrink-0" />
                      <span className={`${labelClass} whitespace-nowrap`}>
                        Billing & Payments
                      </span>
                      <span className={groupArrowClass}>
                        {billingOpen ? (
                          <ArrowUp2 size={16} />
                        ) : (
                          <ArrowDown2 size={16} />
                        )}
                      </span>
                    </button>

                    {billingOpen && (
                      <ul className={submenuClass}>
                        <li>
                          <NavLink
                            to={withHostel("/invoice")}
                            className={({ isActive }) =>
                              navItemClass(isActive || currentPage === "invoice")
                            }
                            onClick={() => handlePageClick("invoice")}
                          >
                            <Receipt size="20" variant="Bold" className="shrink-0" />
                            <span className={labelClass}>Bills</span>
                          </NavLink>
                        </li>

                        <li>
                          <NavLink
                            to={withHostel("/retainer-invoice")}
                            className={({ isActive }) =>
                              navItemClass(isActive || currentPage === "booking")
                            }
                            onClick={() => handlePageClick("retainer-invoice")}
                          >
                            <CalendarAdd variant="Bold" size="20" className="shrink-0" />
                            <span className={labelClass}>Retainer Invoice</span>
                          </NavLink>
                        </li>

                        <li>
                          <NavLink
                            to={withHostel("/recurring")}
                            className={({ isActive }) =>
                              navItemClass(isActive || currentPage === "recurring")
                            }
                            onClick={() => handlePageClick("recurring")}
                          >
                            <RulerPen variant="Bold" size="20" className="shrink-0" />
                            <span className={labelClass}>Recurring bills</span>
                          </NavLink>
                        </li>

                        <li>
                          <NavLink
                            to={withHostel("/receipts")}
                            className={({ isActive }) =>
                              navItemClass(isActive || currentPage === "receipts")
                            }
                            onClick={() => handlePageClick("receipts")}
                          >
                            <DocumentText variant="Bold" size="20" className="shrink-0" />
                            <span className={labelClass}>Receipts</span>
                          </NavLink>
                        </li>
                      </ul>
                    )}
                  </li>

                  <li>
                    <NavLink
                      to={withHostel("/electricity")}
                      className={({ isActive }) =>
                        navItemClass(isActive || currentPage === "eb")
                      }
                      onClick={() => handlePageClick("eb")}
                    >
                      <Flash size="20" variant="Bold" className="shrink-0" />
                      <span className={labelClass}>Electricity</span>
                    </NavLink>
                  </li>

                  <li>
                    <button
                      type="button"
                      aria-expanded={serviceDesk}
                      className={groupHeaderClass(serviceDesk)}
                      onClick={() => {
                        const next = !serviceDesk;
                        setServiceDesk(next);
                        setManageOpen(false);
                        // setIsMdSidebarExpanded(next);
                      }}
                    >
                      <Messages1 size="20" variant="Bold" className="shrink-0" />
                      <span className={labelClass}>Service Desk</span>
                      <span className={groupArrowClass}>
                        {serviceDesk ? (
                          <ArrowUp2 size={16} />
                        ) : (
                          <ArrowDown2 size={16} />
                        )}
                      </span>
                    </button>

                    {serviceDesk && (
                      <ul className={submenuClass}>
                        <li>
                          <NavLink
                            to={withHostel("/compliance")}
                            className={({ isActive }) =>
                              navItemClass(isActive || currentPage === "compliance")
                            }
                            onClick={() => handlePageClick("compliance")}
                          >
                            <MessageQuestion size="20" variant="Bold" className="shrink-0" />
                            <span className={labelClass}>Compliants</span>
                          </NavLink>
                        </li>
                        {isDevelopment && (
                          <li>
                            <NavLink
                              to={withHostel("/requests")}
                              className={({ isActive }) =>
                                navItemClass(isActive || currentPage === "requests")
                              }
                              onClick={() => handlePageClick("requests")}
                            >
                              <Chart1 size="20" variant="Bold" className="shrink-0" />
                              <span className={labelClass}>Requests</span>
                            </NavLink>
                          </li>
                        )}
                      </ul>
                    )}
                  </li>

                  <li>
                    <NavLink
                      to={withHostel("/expense")}
                      className={({ isActive }) =>
                        navItemClass(isActive || currentPage === "expenses")
                      }
                      onClick={() => handlePageClick("expenses")}
                    >
                      <MoneySend size="20" variant="Bold" className="shrink-0" />
                      <span className={labelClass}>Expenses</span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to={withHostel("/reports")}
                      className={({ isActive }) =>
                        navItemClass(isActive || currentPage === "reports")
                      }
                      onClick={() => handlePageClick("reports")}
                    >
                      <Chart size="20" variant="Bold" className="shrink-0" />
                      <span className={labelClass}>Reports</span>
                    </NavLink>
                  </li>

                  {/* Settings + Help live in the right panel on md+; show them in the mobile drawer */}
                  <li className="md:hidden mt-[8px] pt-[8px] border-t border-[#E2E8F0]">
                    <NavLink
                      to={settingsPath}
                      className={({ isActive }) => navItemClass(isActive)}
                      onClick={() => {
                        handlePageClick("settingNewDesign");
                        setSettingsPGShow(false);
                      }}
                    >
                      <img src={SettingIcon} alt="" className="w-5 h-5 shrink-0" />
                      <span className={labelClass}>Settings</span>
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </aside>

            <main className="flex-1 min-w-0 min-h-0 overflow-y-auto md:h-screen">
              <Routes>
                <Route path="/payment-preview" element={<PaymentPreview />} />
                <Route path="/graph" element={<GraphQL />} />

                <Route path="/dashboard" element={<Dashboard />} />
                <Route
                  path="/dashboard/:hostelId?"
                  element={
                    <div className="bg-[#FAFAFA] pt-1 pl-3 pr-1">
                      <Dashboard />
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
                  path="/retainer-invoice/:hostelId?"
                  element={
                    <div className="mt-1 ml-2.5 mr-1">
                      <Booking />
                    </div>
                  }
                />
                <Route
                  path="/retainer-invoice/details/:invoiceId?"
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

                <Route
                  path="/add-retainer/:hostelId?"
                  element={
                    <div className="mt-1 ml-2.5 mr-1">
                      <AddRetainerInvoice />
                    </div>
                  }
                />
                <Route
                  path="/banking/:hostelId?"
                  element={
                    <div className="mt-1 ml-2.5 mr-1">
                      <BankingNew />
                    </div>
                  }
                />

                {isDevelopment && (
                  <>
                    {/* <Route
                      path="/banking/:hostelId?"
                      element={
                        <div className="mt-1 ml-2.5 mr-1">
                          <Banking
                            allPageHostel_Id={allPageHostel_Id}
                            setAllPageHostel_Id={setAllPageHostel_Id}
                          />
                        </div>
                      }
                    /> */}
                    <Route
                      path="/requests/:hostelId?"
                      element={
                        <div className="mt-1 ml-2.5 mr-1">
                          <Request />
                        </div>
                      }
                    />

                    <Route
                      path="/change-bed/:hostelId?"
                      element={
                        <div className="mt-1 ml-2.5 mr-1">
                          <ChangeBedPgView />
                        </div>
                      }
                    />
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
                  path="/create-bill"
                  element={
                    <div className="mt-1 ml-2.5 mr-1">
                      <CreateBill />
                    </div>
                  }
                />
                <Route
                  path="/create-invoice"
                  element={
                    <div className="mt-1 ml-2.5 mr-1">
                      <NewInvoice />
                    </div>
                  }
                />
                <Route
                  path="/tenant/details/:tenantId"
                  element={
                    <div className="mt-1 ml-2.5 mr-1">
                      <TenantOverview />
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
              </Routes>
            </main>

            {/* Right utility panel (md+). On mobile these actions live in the top bar / drawer. */}
            <aside className="hidden md:flex w-14 shrink-0 flex-col items-center h-screen overflow-y-auto bg-slate-50 border-l border-slate-200 shadow-sm">
              <CustomTooltip text="profile" direction="right-full" usePortal={true}>
                <div
                  ref={profileAreaRef}
                  onClick={() => setShowProfileCard((s) => !s)}
                  role="button"
                  tabIndex={0}
                  className="flex flex-col items-center justify-center text-center pt-[10px] cursor-pointer"
                >
                  {hasProfileImage ? (
                    <Image
                      src={profiles}
                      alt="profile-image"
                      roundedCircle
                      className="h-10 w-10 object-cover shrink-0"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-semibold text-base uppercase shrink-0">
                      {stateData?.accountList?.initial || ""}
                    </div>
                  )}
                </div>
              </CustomTooltip>

              <CustomTooltip text="Quick" direction="right-full" usePortal={true}>
                <button
                  type="button"
                  onClick={() => setShowMenuModal(true)}
                  className="w-8 h-8 rounded-[8px] bg-emerald-700 hover:bg-emerald-600 border-0 text-white text-xl font-bold cursor-pointer flex items-center justify-center mt-[16px] transition-colors leading-none pb-0.5"
                >
                  +
                </button>
              </CustomTooltip>

              <div className="flex flex-col items-center justify-start gap-[16px] mt-[28px]">
                <CustomTooltip text="Search" direction="right-full" usePortal={true}>
                  <div className="relative flex flex-col items-center cursor-pointer">
                    <img src={SearchVector} alt="Search" className="w-6 h-6" />
                  </div>
                </CustomTooltip>

                <CustomTooltip text="Notify" direction="right-full" usePortal={true}>
                  <div
                    onClick={handleShowNotification}
                    onMouseEnter={() => handleMouseEnter("notification")}
                    onMouseLeave={handleMouseLeave}
                    className="relative flex flex-col items-center cursor-pointer"
                  >
                    <div className="relative">
                      <Notification
                        className="w-6 h-6"
                        color={
                          hoveredIcon === "notification" ? "#1E45E1" : "#64748B"
                        }
                      />
                      {unreadNotificationCount > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 min-h-[18px] min-w-[18px] px-1 flex justify-center items-center bg-orange-500 text-white text-[10px] text-center rounded-full border-2 border-white font-semibold leading-none">
                          {unreadNotificationCount}
                        </span>
                      )}
                    </div>
                  </div>
                </CustomTooltip>

                <CustomTooltip text="Settings" direction="right-full" usePortal={true}>
                  <NavLink
                    to={settingsPath}
                    onMouseEnter={() => handleMouseEnter("settings")}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => {
                      handlePageClick("settingNewDesign");
                      setSettingsPGShow(false);
                    }}
                    className={({ isActive }) =>
                      `relative flex flex-col items-center no-underline cursor-pointer transition-transform hover:scale-110 ${isActive ? "opacity-100" : ""}`
                    }
                  >
                    <img src={SettingIcon} alt="Settings Icon" className="w-6 h-6" />
                  </NavLink>
                </CustomTooltip>

                <CustomTooltip text="Help" direction="right-full" usePortal={true}>
                  <div
                    onMouseEnter={() => handleMouseEnter("helpVideo")}
                    onMouseLeave={handleMouseLeave}
                    className="relative flex flex-col items-center cursor-pointer"
                  >
                    <img src={HelpVideoIcon} alt="Help Video Icon" className="w-6 h-6" />
                  </div>
                </CustomTooltip>
              </div>
            </aside>
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
      )}

      {logoutformshow && (
        <Logout show={logoutformshow} handleClose={handleCloseLogout} />
      )}
      {showNotify && (
        <NotificationForm show={showNotify} handleClose={handleClose} handleShowChangeBed={handleShowChangeBed} handleMoveToNotice={handleMoveToNotice} />
      )}

      {changebedShow && (
        <ChangeBedTenantWay
          customerReassign={changebedShow}
          setCustomerReAssign={setChangeBedShow}

        />
      )}

      {customerCheckoutpage && (
        <MoveToNoticePGAndTenant
          customerCheckoutpage={customerCheckoutpage}
          setCustomerCheckoutpage={setCustomerCheckoutpage}
          bedData={customerDetails}
        />
      )}
    </>
  );
}

export default Sidebar;

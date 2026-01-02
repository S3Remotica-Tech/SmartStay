/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import { StoreSelectedHostelAction } from "../Redux/Action/smartStayAction";
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
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Assets from "../Pages/AssetFile/Asset";
import Expenses from "../Pages/ExpenseFile/Expense";
import Banking from "../Pages/Banking/Banking";
import { ArrowUp2, ArrowDown2, Chart2, DocumentText, Buildings, LogoutCurve } from "iconsax-react";
import SettingAllPages from "../Pages/Settings/SettingAllPages";
import SettingIcon from "../Assets/Images/sidebariconOne.svg";
import HelpVideoIcon from "../Assets/Images/sidebariconFour.svg";
// import Logout from "../Assets/Images/turn-off.png";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { Route, Routes, NavLink } from "react-router-dom";
import Cookies from 'universal-cookie';
import { checkoutCustomerProfile } from "../Redux/Action/smartStayAction";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip"
import CreateBill from "../Pages/Bills/CreateBill";
import UserListRoomDetail from "../Pages/CustomerFile/UserListRoomDetail";
import CheckoutProfile from '../Pages/CustomerFile/CheckoutProfile';
// import BillsDetails from '../Pages/Bills/BillsDetails';
// import UserlistCheckout from '../Pages/CustomerFile/UserlistCheckout'
import SettingSubscription from "../Pages/SubscriptionFile/SettingSubscription";
import SettingIntergration from "../Pages/Settings/SettingIntergration";
import SettingElectricity from "../Pages/Settings/SettingElectricity";
import SettingInvoice from "../Pages/Settings/SettingInvoice";
import SettingExpenses from "../Pages/Settings/SettingExpenses";
import SettingCompliance from "../Pages/Settings/SettingCompliance";
import SettingAmenities from "../Pages/Settings/SettingAmenities";
import SettingNewUser from "../Pages/Settings/SettingUserNew";
import SettingNewRole from "../Pages/Settings/SettingNewRole";
import SettingsNotifications from "../Pages/Settings/SettingsNotifications";
import SettingAgreement from "../Pages/Settings/SettingAgreement";
import BillingRule from "../Pages/Settings/BillingRule/BillingRule";
import SettingGeneral from "../Pages/Settings/SettingGeneral";
import SettingManage from "../Pages/Settings/SettingManage";
import {
  Notification, RulerPen, CalendarAdd, Setting2, Chart, MoneySend, MessageQuestion, Flash, Receipt,
  Bank, Shop, Box, Profile2User, Location
} from 'iconsax-react'
import NotificationForm from "../Utils/Notification";
import PaymentPreview from "../Pages/SubscriptionFile/PaymentPreview";
import SettingSecurity from "../Pages/Settings/SettingSecurityPage";
import Booking from "../Pages/Bookings/Booking";
import RecurringBills from "../Pages/Recurring/RecurringBills";
import Receipts from "../Pages/Receipt/Receipt"
import BillsPdfDetails from "../Pages/Bills/BillsPdfDetails";
import ReceiptPdfDetails from "../Pages/Receipt/ReceiptPdfDetails";
import BookingsPdfDetails from "../Pages/Bookings/BookingsPdfDetails";



function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const state = useSelector((state) => state);

  const stateData = useSelector((state) => state.createAccount);
  // const [zoom, setZoom] = useState('')
  const [manageOpen, setManageOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [allPageHostel_Id, setAllPageHostel_Id] = useState("");
  const [payingGuestName, setPayingGuestName] = useState("payingGuest");
  const [billingOpen, setBillingOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isFirstLogin = useRef(true);
  const dropdownRef = useRef(null);
  const [isVisibleSidebar, setIsVisibleSidebar] = useState(false)
  const [showNotify, setShowNotify] = useState(false);
  const cookies = new Cookies();


  // const hideSidebarRoutes = ["/payment-preview"];

  // const path = location.pathname.split("?")[0].replace(/\/$/, "");
  // const shouldHideSidebar = hideSidebarRoutes.includes(path);


  const pageMap = {
    "/dashboard/:hostelId": "dashboard",
    "/paying-guest/:hostelId": "pg-list",
    "/tenant/:hostelId": "user-list",
    "/tenant/details/:hostelId": "user-details",
    "/invoice/:hostelId": "invoice",
    "/invoice/new/:hostelId": "invoice",
    "/vendor/:hostelId": "vendor",
    "/compliance/:hostelId": "compliance",
    "/asset/:hostelId": "asset",
    "/reports/:hostelId": "reports",
    "/electricity/:hostelId": "eb",
    "/expense/:hostelId": "expenses",
    "/banking/:hostelId": "banking",
    "/settings/:hostelId": "settingNewDesign",
    "/booking/:hostelId": "booking",
  };

  useEffect(() => {
    const path = location.pathname;

    const matchedPage = Object.keys(pageMap)
      .sort((a, b) => b.length - a.length)
      .find((route) => {
        const regex = new RegExp(
          "^" + route.replace("/:hostelId", "/[^/]+") + "$"
        );
        return regex.test(path);
      });

    if (matchedPage) {
      setCurrentPage(pageMap[matchedPage]);
      localStorage.setItem("lastPage", path);
    }
  }, [location.pathname]);





  // useEffect(()=>{
  //   if(currentPage === "dashboard"){
  //     navigate(`/dashboard`, { replace: true });

  //   }
  // },[currentPage])


  // const LastPageIs = localStorage.getItem("lastPage")



  useEffect(() => {
    if (state.login?.isLoggedIn && state.login.selectedHostel_Id) {

      if (isFirstLogin.current) {
        navigate(`/dashboard/${state.login.selectedHostel_Id}`, { replace: true });
        isFirstLogin.current = false;
      }
    }
    else if (!state.login.selectedHostel_Id && state.login?.isLoggedIn) {

      const lastPage = localStorage.getItem("lastPage");
      if (lastPage) {
        navigate(lastPage, { replace: true })
      } else {
        navigate(`/dashboard`)
      }

    }
  }, [state.login?.isLoggedIn, state.login.selectedHostel_Id]);



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

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [hostelListDetail, setHostelDetail] = useState("");

  useEffect(() => {
    dispatch({ type: "ACCOUNTDETAILS" });
  }, []);

  useEffect(() => {
    dispatch({ type: "HOSTELLIST" })
  }, []);



  useEffect(() => {
    if (state.login.selectedHostel_Id || state.PgList?.createPgStatusCode === 201) {
      dispatch({ type: "PARTICULAR_HOSTEL_DETAILS", payload: { hostel_id: state.login.selectedHostel_Id } })

    }
  }, [state.login.selectedHostel_Id, state.PgList.createPgStatusCode]);






  useEffect(() => {
    if (state.PgList.deletePgSuccessStatusCode === 200) {
      dispatch({ type: "HOSTELLIST" })

      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_PG_STATUS_CODE" });
      }, 1000);
    }
  }, [
    state.PgList.deletePgSuccessStatusCode,
  ]);




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
          "abcd"
        ).toString();
        const encryptedphone = CryptoJS.AES.encrypt(
          phoneId.toString(),
          "abcd"
        ).toString();
        const encryptedemail = CryptoJS.AES.encrypt(
          emilidd.toString(),
          "abcd"
        ).toString();
        const encryptIsEnable = CryptoJS.AES.encrypt(
          Is_Enable.toString(),
          "abcd"
        ).toString();

        localStorage.setItem("loginId", encryptedLoginId);
        localStorage.setItem("phoneId", encryptedphone);
        localStorage.setItem("emilidd", encryptedemail);
        localStorage.setItem("IsEnable", encryptIsEnable);

        if (Is_Enable) {
          const encryptData = CryptoJS.AES.encrypt(
            JSON.stringify(false),
            "abcd"
          );
          localStorage.setItem("login", encryptData.toString());
        } else {
          const encryptData = CryptoJS.AES.encrypt(
            JSON.stringify(true),
            "abcd"
          );
          localStorage.setItem("login", encryptData.toString());
        }
      }
      setTimeout(() => {
        dispatch({ type: "CLEAR_ACCOUNT_STATUS_CODE" });
      }, 100);
    }
  }, [stateData.statusCodeForAccountList,]);

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



  const hostelId = state.login?.selectedHostel_Id;


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
      "booking"
    ];

    if (validPages.includes(mainPage) && pathParts.length > 1) {
      navigate(`/${mainPage}/${hostelId}`, { replace: true });
    }

  }, [state.login?.selectedHostel_Id]);









  const handlePageClick = (page) => {
    handleFormPage(false)
    setCurrentPage(page);
    setIsDropdownOpen(false);
    localStorage.setItem("currentPage", page);
    setIsSidebarOpen(false);
    dispatch(checkoutCustomerProfile(true))
  };

  useEffect(() => {
    if (state.login?.isLoggedIn) {
      setCurrentPage("dashboardd");
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

  const handleLogout = () => {
    cookies.remove('selected_hostelId', { path: '/' });
    cookies.remove('v2-token', { path: '/' });
    cookies.remove('token', { path: '/' });
    dispatch({ type: "LOG_OUT" });
    dispatch({ type: 'RESET_ALL' })
    const encryptData = CryptoJS.AES.encrypt(JSON.stringify(false), "abcd");
    localStorage.setItem("login", encryptData.toString());
    localStorage.setItem("loginId", "");
    localStorage.setItem("phoneId", "");
    localStorage.setItem("emilidd", "");
    // localStorage.setItem("selectedResponseHostelId", "");
    // localStorage.setItem("selectedHostelId", "");
    localStorage.setItem("selectedHostelName", "");
    localStorage.removeItem("lastPage");
    localStorage.removeItem("currentPage")


  };







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
  const [initials, setInitials] = useState('')
  const [locationName, setLocationName] = useState('')


  const handleHostelId = (id, name, mainImage, initials, locations) => {
    setLocationName(locations)
    setInitials(initials)
    setPayingGuestName(name);
    setAllPageHostel_Id(id);
    setSelectedProfileImage(
      mainImage && mainImage !== "0" && mainImage !== "" ? mainImage : mainImage
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

  const settingsPath = hostelId
    ? `/settings/${hostelId}`
    : `/settings`;

  useEffect(() => {
    if (allPageHostel_Id) {
      dispatch(StoreSelectedHostelAction(allPageHostel_Id));
    }
  }, [allPageHostel_Id]);





  // useEffect(() => {
  //   const hostelId = state.login?.apiResponseHostelId;

  //   if (hostelId && hostelId !== "undefined") {
  //     cookies.set("selected_hostelId", hostelId, { path: "/" });
  //   }
  // }, [state.login?.apiResponseHostelId]);



  // const reduxHostelId = state.login?.apiResponseHostelId;
  const cookieHostelId = cookies.get("selected_hostelId");

  const finalHostelId = cookieHostelId;



  // console.log("cookieHostelId", cookieHostelId,)


  useEffect(() => {
    if (!hostelListDetail?.length || initials) return;

    const selectedHostel = hostelListDetail.find(
      h => h.hostelId === finalHostelId
    ) || hostelListDetail[0];

    if (!selectedHostel) return;

    setAllPageHostel_Id(selectedHostel.hostelId);
    setPayingGuestName(selectedHostel.name);
    setLocationName(selectedHostel.city)
    setInitials(selectedHostel.initials);

    setSelectedProfileImage(
      selectedHostel.mainImage &&
        selectedHostel.mainImage !== "0" &&
        selectedHostel.mainImage !== ""
        ? selectedHostel.mainImage
        : ""
    );

    dispatch(StoreSelectedHostelAction(selectedHostel.hostelId));
  }, [hostelListDetail, finalHostelId,]);






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
      dispatch({ type: 'PERMISSIONROLELIST', payload: state.createAccount?.accountList?.roleId })
    }
  }, [state.createAccount.accountList.roleId])

  const handleFormPage = (isVisible) => {
    setIsVisibleSidebar(isVisible)
  }

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
    setShowNotify(false)
  }

  const handleShowNotification = () => {
    setShowNotify(true);
  }


  const withHostel = (path) =>
    hostelId ? `${path}/${hostelId}` : path;




  return (
    <>
      {
        showNotify && <NotificationForm show={showNotify} handleClose={handleClose} />
      }
      <Container fluid className="p-0" >
        <div style={{
          display: "flex",
          width: "100%",
          height: "100vh",
          overflowY: "hidden",
        }}
        >
          <div className="d-md-none p-2 bg-white">
            <button
              onClick={toggleSidebar}
              style={{
                background: "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
              }}
            >
              ☰
            </button>
          </div>
          {/* sidebar */}
          <div
            className=""
            style={{
              width: "18%",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#fff",
              boxShadow: "5px 0 2px -2px rgba(0,0,0,0.12)", position: "relative",
              // padding: 3,

            }}
          >
            <div  >

              <div

                style={{ padding: "8px 16px", flexShrink: 0 }}
              >
                <img
                  src={Smartstay}
                  alt="smartstay"
                  style={{ height: 25.06, width: 134 }}
                  className="Title"
                  onClick={() => handlePageClick("dashboard")}
                />
                <button
                  onClick={closeSidebar}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "24px",
                    cursor: "pointer",
                    display: isSidebarOpen ? "block" : "none",
                  }}
                  className="d-md-none"
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
                  <li ref={dropdownRef}
                    className={`align-items-center list-Item-Hostel mt-2 ${currentPage === "settingNewDesign" ? "active" : ""}`}
                    onClick={toggleDropdown}
                    style={{
                      listStyleType: "none",
                      display: "flex",
                      position: "relative",
                      cursor: "pointer",
                      fontFamily: "Gilroy", fontSize: 13,
                      boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
                      borderRadius: "8px",
                      backgroundColor: "#fff",
                    }}
                  >

                    {selectedProfileImage && selectedProfileImage !== null && selectedProfileImage !== "" ? (
                      <img
                        src={selectedProfileImage}
                        style={{
                          height: 35,
                          width: 35,
                          borderRadius: "50%",
                          marginRight: 8,
                        }}
                        alt="Selected Profile"
                      />
                    ) : (
                      <div
                        style={{
                          flexShrink: 0,
                          height: 35,
                          width: 35,
                          minWidth: 35,
                          borderRadius: "50%",
                          backgroundColor: "#E2E8F0",
                          color: "#44536A",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 600,
                          fontSize: 12,
                          marginRight: 8,
                          textTransform: "uppercase",
                          lineHeight: "1",
                        }}
                      >
                        {initials}
                      </div>
                    )}

                    <span
                      className="Title"
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        display: "inline-block",
                        fontFamily: "Gilroy",
                        maxWidth: "150px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        verticalAlign: "middle", color: "#222222", cursor: "pointer",
                      }}
                    >
                      {payingGuestName}
                      <div>
                        <OverlayTrigger
                          placement="right"
                          overlay={
                            <Tooltip className="custom-tooltip">
                              {payingGuestName} {locationName}
                            </Tooltip>
                          }
                        >
                          <span
                            style={{
                              fontSize: 12,
                              color: "#9C9C9C",
                              maxWidth: "100px",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            <Location
                              className="me-1"
                              size="16"
                              color="#FF8A65"
                              variant="Bold"
                              style={{ flexShrink: 0 }}
                            />
                            <span
                              style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                minWidth: 0,
                              }}
                            >
                              {locationName}
                            </span>
                          </span>
                        </OverlayTrigger>

                      </div>
                    </span>
                    <span className="ms-auto">
                      {isDropdownOpen ? (
                        <ArrowUp2 size="16" color="#4B4B4B" />
                      ) : (
                        <ArrowDown2 size="16" color="#4B4B4B" />
                      )}
                    </span>


                    {isDropdownOpen && (
                      <div
                        className="show-scrolls"
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: 0,
                          backgroundColor: "white",
                          boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                          padding: "5px 0",
                          borderRadius: "4px",
                          width: "100%",
                          zIndex: 10,
                          maxHeight: "200px",
                          overflowY: "auto",
                          overflowX: "hidden",
                        }}
                      >
                        <ul style={{ margin: 0, padding: 0 }}>
                          {hostelListDetail.map((item) => (
                            <OverlayTrigger
                              key={item.id}
                              placement="right"
                              overlay={<Tooltip className="custom-tooltip" id={`tooltip-${item.id}`}>{item.name}</Tooltip>}
                            >
                              <li
                                key={item.id}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  padding: "8px 12px",
                                  cursor: "pointer",
                                  color: "#1e45e1",
                                  maxWidth: "160px",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  verticalAlign: "middle",
                                }}
                                onClick={() => handleHostelId(item.hostelId, item.name, item.mainImage, item.initials, item.city)}
                              >
                                {item.mainImage && item.mainImage !== "0" && item.mainImage !== "" ? (
                                  <img
                                    src={item.mainImage}
                                    style={{
                                      height: 25,
                                      width: 25,
                                      borderRadius: "50%",
                                      marginRight: 8,
                                    }}
                                    alt={item.initials || "Default Profile"}
                                  />
                                ) : (
                                  <div
                                    style={{
                                      flexShrink: 0,
                                      minWidth: 25,
                                      height: 25,
                                      width: 25,
                                      borderRadius: "50%",
                                      backgroundColor: "#E2E8F0",
                                      color: "#44536A",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      fontWeight: 600,
                                      fontSize: 12,
                                      marginRight: 8,
                                      textTransform: "uppercase",
                                    }}
                                  >
                                    {item.initials}
                                  </div>
                                )}
                                {item.name}
                              </li>
                            </OverlayTrigger>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                )}


                {!(hostelListDetail ?? []).length && (
                  <NavLink
                    to={settingsPath}
                    className="align-items-center d-flex justify-content-center mt-2 list-Button mb-2"
                    style={{
                      listStyleType: "none",
                      display: "flex",
                      fontFamily: "Gilroy",
                      color: "#FFFFFF",
                      fontWeight: 500,
                      backgroundColor: "#1E45E1",
                      boxShadow: "5px 0 2px -2px rgba(0,0,0,0.12)",
                      padding: 8,
                      borderRadius: "8px",
                      cursor: "pointer",
                      textDecoration: "none",
                    }}
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
              <div
                className="show-scrolls-sidebar"
                style={{
                  flex: 1,
                                   maxHeight: 415,
                  overflow: "auto",
                  display: "flex",
                  flexDirection: "column",
                  margin: 5,
                  overflowY: "auto",
                }}
              >

                <ul
                  className=""
                  style={{
                    flex: 1,
                    minHeight: 0,
                    overflowY: "auto",
                    listStyle: "none",
                    padding: 2,
                    marginBottom: 0,
                    width: "100%",
                  }}
                >

                  <li

                    style={{
                      listStyleType: "none",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <NavLink
                      to={withHostel("/dashboard")}
                      className={({ isActive }) =>
                        `align-items-center d-flex list-Item ${isActive ? "active" : ""}`
                      }
                      onClick={() => handlePageClick("dashboard")}
                    >
                      <Chart2
                        size="20" variant="Bold"
                      // color={currentPage === "dashboard" ? "#1E45E1" : "#4B4B4B"}
                      />
                      <span
                        className="Title"
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          display: "inline-block",
                          fontFamily: "Gilroy",
                        }}
                      >
                        Home
                      </span>
                    </NavLink>
                  </li>

                  <li
                    className={`align-items-center list-Item ${manageOpen ? "active" : ""
                      }`}
                    onClick={() => {
                      setManageOpen(!manageOpen);
                      setBillingOpen(false);
                      localStorage.setItem("manageOpen", !manageOpen);
                    }}
                    style={{
                      listStyleType: "none",
                      display: "flex",
                      position: "relative",
                      marginTop: manageOpen ? "2px" : "10px",
                      backgroundColor: manageOpen ? "#F6F8FF" : "#FFF",
                      color: manageOpen ? "#1E45E1" : "#64748B",

                    }}
                  >
                    <Setting2 size="20" variant="Bold" />
                    <span
                      className="Title"
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        display: "inline-block",
                        fontFamily: "Gilroy",
                      }}
                    >
                      Manage
                    </span>
                    <span className="ms-auto ">
                      {manageOpen ? (
                        <ArrowUp2 size="16" color="#4B4B4B" />
                      ) : (
                        <ArrowDown2 size="16" color="#4B4B4B" />
                      )}
                    </span>
                  </li>

                  {manageOpen && (
                    <div className={`submenu ${manageOpen ? "open" : ""}`}>
                      <ul
                        className="p-1 "
                        style={{
                          marginLeft: 10, position: "relative",
                        }}
                      >
                        <li

                          style={{ listStyleType: "none", display: "flex" }}
                        >
                          <NavLink
                            to={withHostel("/paying-guest")}
                            className={({ isActive }) =>
                              `align-items-center d-flex list-Item ${isActive ? "active" : ""}`
                            }
                            onClick={() => handlePageClick("pg-list")}
                          >
                            <Buildings size="20" variant="Bold" />

                            <span
                              className="Title"
                              style={{
                                fontSize: 14,
                                fontWeight: 600,
                                display: "inline-block",
                                fontFamily: "Gilroy",
                              }}
                            >
                              Paying Guest
                            </span>
                          </NavLink>
                        </li>
                        <li style={{ listStyleType: "none" }}>
                          <NavLink
                            to={withHostel("/tenant")}
                            className={({ isActive }) =>
                              `list-sub-Item d-flex align-items-center ${isActive || currentPage === "user-details" ? "active" : ""
                              }`
                            }
                            onClick={() => handlePageClick("user-list")}
                            style={{ textDecoration: "none" }}
                          >
                            <Profile2User size="20" variant="Bold" />

                            <span
                              className="Title"
                              style={{
                                fontSize: 14,
                                fontWeight: 600,
                                display: "inline-block",
                                fontFamily: "Gilroy",
                              }}
                            >
                              Tenant
                            </span>
                          </NavLink>
                        </li>
                        <li style={{ listStyleType: "none" }}>
                          <NavLink
                            to={withHostel("/asset")}
                            className={({ isActive }) =>
                              `align-items-center list-sub-Item d-flex ${isActive || currentPage === "asset" ? "active" : ""
                              }`
                            }
                            onClick={() => handlePageClick("asset")}
                            style={{ textDecoration: "none" }}
                          >
                            <Box size="20" variant="Bold" />

                            <span
                              className="Title"
                              style={{
                                fontSize: 14,
                                fontWeight: 600,
                                display: "inline-block",
                                fontFamily: "Gilroy",
                              }}
                            >
                              Assets
                            </span>
                          </NavLink>
                        </li>

                        <li style={{ listStyleType: "none" }}>
                          <NavLink
                            to={withHostel("/vendor")}
                            className={({ isActive }) =>
                              `align-items-center list-sub-Item d-flex ${isActive || currentPage === "vendor" ? "active" : ""
                              }`
                            }
                            onClick={() => handlePageClick("vendor")}
                            style={{ textDecoration: "none" }}
                          >
                            <Shop size="20" variant="Bold" />

                            <span
                              className="Title"
                              style={{
                                fontSize: 14,
                                fontWeight: 600,
                                display: "inline-block",
                                fontFamily: "Gilroy",
                              }}
                            >
                              Vendor
                            </span>
                          </NavLink>
                        </li>

                      </ul>
                    </div>
                  )}

                  <li style={{ listStyleType: "none", marginTop: manageOpen ? "5px" : "10px" }}>
                    <NavLink
                      to={withHostel("/banking")}
                      className={({ isActive }) =>
                        `align-items-center list-Item d-flex ${isActive || currentPage === "banking" ? "active" : ""
                        }`
                      }
                      onClick={() => handlePageClick("banking")}
                      style={{ textDecoration: "none" }}
                    >
                      <Bank size="20" variant="Bold" />

                      <span
                        className="Title"
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          display: "inline-block",
                          fontFamily: "Gilroy",
                        }}
                      >
                        Banking
                      </span>
                    </NavLink>
                  </li>




                  <li
                    className={`align-items-center list-Item ${currentPage.startsWith("billing") ? "active" : ""}`}
                    onClick={() => {
                      setBillingOpen(!billingOpen);
                      setManageOpen(false);
                    }}
                    style={{
                      listStyleType: "none",
                      display: "flex",
                      alignItems: "center",
                      // padding: "10px",
                      cursor: "pointer", backgroundColor: billingOpen ? "#F6F8FF" : "#FFF",
                      color: billingOpen ? "#1E45E1" : "#64748B",
                      marginTop: manageOpen ? "5px" : "10px"
                    }}
                  >
                    <DocumentText
                      size="22"
                      variant="Bold"
                    />
                    <span className="Title"
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        fontFamily: "Gilroy",
                        // marginLeft: 10,
                      }}
                    >
                      Billing & Payments
                    </span>
                    <span className="ms-auto">
                      {billingOpen ? <ArrowUp2 size={14} /> : <ArrowDown2 size={14} />}
                    </span>
                  </li>

                  {billingOpen && (
                    <div className={`submenu ${billingOpen ? "open" : ""}`} style={{}}>
                      <ul
                        className="p-1 "
                        style={{
                          marginLeft: 10, position: "relative",


                        }}
                      >

                        <li
                          style={{
                            listStyleType: "none",
                            marginTop: billingOpen ? "2px" : "10px",
                          }}
                        >
                          <NavLink
                            to={withHostel("/invoice")}
                            className={({ isActive }) =>
                              `align-items-center list-sub-Item d-flex ${isActive || currentPage === "invoice" ? "active" : ""
                              }`
                            }
                            onClick={() => handlePageClick("invoice")}
                            style={{ textDecoration: "none" }}
                          >
                            <Receipt size="20" variant="Bold" />

                            <span
                              className="Title"
                              style={{
                                fontSize: 14,
                                fontWeight: 600,
                                display: "inline-block",
                                fontFamily: "Gilroy",
                              }}
                            >
                              Bills
                            </span>
                          </NavLink>
                        </li>

                        <li
                          style={{
                            listStyleType: "none",
                            borderRadius: 6,
                          }}
                        >
                          <NavLink
                            to={withHostel("/booking")}
                            className={({ isActive }) =>
                              `list-sub-Item d-flex align-items-center ${isActive || currentPage === "booking" ? "active" : ""
                              }`
                            }
                            onClick={() => handlePageClick("booking")}
                            style={{ textDecoration: "none", cursor: "pointer" }}
                          >
                            <CalendarAdd variant="Bold" size="22" />

                            <span
                              style={{
                                fontSize: 14,
                                fontWeight: 600,
                                display: "inline-block",
                                fontFamily: "Gilroy",
                              }}
                            >
                              Bookings
                            </span>
                          </NavLink>
                        </li>


                        <li
                          style={{
                            listStyleType: "none",
                          }}
                        >
                          <NavLink
                            to={withHostel("/recurring")}
                            className={({ isActive }) =>
                              `list-sub-Item d-flex align-items-center ${isActive || currentPage === "recurring" ? "active" : ""
                              }`
                            }
                            onClick={() => handlePageClick("recurring")}
                            style={{ textDecoration: "none", cursor: "pointer" }}
                          >
                            <RulerPen variant="Bold" size="22" />

                            <span
                              style={{
                                fontSize: 14,
                                fontWeight: 600,
                                display: "inline-block",
                                fontFamily: "Gilroy",
                              }}
                            >
                              Recurring bills
                            </span>
                          </NavLink>
                        </li>


                        <li
                          style={{
                            listStyleType: "none",
                          }}
                        >
                          <NavLink
                            to={withHostel("/receipts")}
                            className={({ isActive }) =>
                              `list-sub-Item d-flex align-items-center ${isActive || currentPage === "receipts" ? "active" : ""
                              }`
                            }
                            onClick={() => handlePageClick("receipts")}
                            style={{ textDecoration: "none", cursor: "pointer" }}
                          >
                            <DocumentText variant="Bold" size="22" />

                            <span
                              style={{
                                fontSize: 14,
                                fontWeight: 600,
                                display: "inline-block",
                                fontFamily: "Gilroy",
                              }}
                            >
                              Receipts
                            </span>
                          </NavLink>
                        </li>

                      </ul>
                    </div>
                  )}


                  <li
                    style={{
                      listStyleType: "none",
                      marginTop: manageOpen ? "2px" : "8px",
                    }}
                  >
                    <NavLink
                      to={withHostel("/electricity")}
                      className={({ isActive }) =>
                        `align-items-center list-Item d-flex ${isActive || currentPage === "eb" ? "active" : ""
                        }`
                      }
                      onClick={() => handlePageClick("eb")}
                      style={{ textDecoration: "none" }}
                    >
                      <Flash size="20" variant="Bold" />

                      <span
                        className="Title"
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          display: "inline-block",
                          fontFamily: "Gilroy",
                        }}
                      >
                        Electricity
                      </span>
                    </NavLink>
                  </li>


                  <li
                    style={{
                      listStyleType: "none",
                      marginTop: manageOpen ? "2px" : "8px",
                    }}
                  >
                    <NavLink
                      to={withHostel("/compliance")}
                      className={({ isActive }) =>
                        `align-items-center list-Item d-flex ${isActive || currentPage === "compliance" ? "active" : ""
                        }`
                      }
                      onClick={() => handlePageClick("compliance")}
                      style={{ textDecoration: "none" }}
                    >
                      <MessageQuestion size="20" variant="Bold" />

                      <span
                        className="Title"
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          display: "inline-block",
                          fontFamily: "Gilroy",
                        }}
                      >
                        Compliants
                      </span>
                    </NavLink>
                  </li>

                  <li
                    style={{
                      listStyleType: "none",
                      marginTop: manageOpen ? "2px" : "8px",
                    }}
                  >
                    <NavLink
                      to={withHostel("/expense")}
                      className={({ isActive }) =>
                        `align-items-center list-Item d-flex ${isActive || currentPage === "expenses" ? "active" : ""
                        }`
                      }
                      onClick={() => handlePageClick("expenses")}
                      style={{ textDecoration: "none" }}
                    >
                      <MoneySend size="20" variant="Bold" />

                      <span
                        className="Title"
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          display: "inline-block",
                          fontFamily: "Gilroy",
                        }}
                      >
                        Expenses
                      </span>
                    </NavLink>
                  </li>


                  <li
                    style={{
                      listStyleType: "none",
                      marginTop: manageOpen ? "2px" : "8px",
                    }}
                  >
                    <NavLink
                      to={withHostel("/reports")}
                      className={({ isActive }) =>
                        `align-items-center list-Item d-flex ${isActive || currentPage === "reports" ? "active" : ""
                        }`
                      }
                      onClick={() => handlePageClick("reports")}
                      style={{ textDecoration: "none" }}
                    >
                      <Chart size="20" variant="Bold" />

                      <span
                        className="Title"
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          display: "inline-block",
                          fontFamily: "Gilroy",
                        }}
                      >
                        Reports
                      </span>
                    </NavLink>
                  </li>

                </ul>
              </div>



              <div
                style={{
                  flexShrink: 0,
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  backgroundColor: "#fff",
                  padding: "12px 0",
                  zIndex: 5,

                }}
              >
                <hr style={{ color: "#E2E8F0" }} className="p-0 m-0" />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    height: "fit-content",
                    width: "100%",
                    padding: 16,
                    marginBottom: 12,
                  }}
                >
                  <div className="Profile_Hover" style={{ display: "flex", width: 190, margin: "-20px auto", gap: 10 }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "start",
                        width: "fit-content",
                        textAlign: "center",
                      }}
                    >
                      {profiles === "null" ||
                        profiles === null ||
                        profiles === undefined ||
                        profiles === "undefined" ||
                        profiles === "" ||
                        profiles === 0 ||
                        profiles === "0" ? (

                        <div
                          style={{
                            height: "35px",
                            width: "35px",
                            borderRadius: "50%",
                            backgroundColor: "#1e45e1",
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "bold",
                            fontSize: "14px",
                            textTransform: "uppercase",
                          }}
                        >
                          {stateData?.accountList?.initial || ""}
                        </div>
                      ) : (

                        <Image
                          src={profiles}
                          alt="profile-image"
                          roundedCircle
                          style={{ height: "35px", width: "35px", objectFit: "cover" }}
                        />
                      )}
                    </div>


                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span

                        title={profilename}
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          fontFamily: "Gilroy",
                          textTransform: "capitalize",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "inline-block",
                          maxWidth: 120,
                        }}

                      >
                        {profilename}
                      </span>
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          fontFamily: "Gilroy",
                          color: "blue",
                        }}
                      >
                        {stateData?.accountList?.roleName}
                      </span>
                    </div>
                  </div>
                </div>


                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    width: "100%",
                    marginTop: 8,
                    zIndex: 1000,
                    overflow: "visible"

                  }}
                >

                  <NavLink
                    to={settingsPath}
                    onMouseEnter={() => handleMouseEnter("settings")}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => {
                      handlePageClick("settingNewDesign");
                      setSettingsPGShow(false);
                    }}
                    className={({ isActive }) =>
                      `settings-link ${isActive ? "active" : ""}`
                    }
                    style={{
                      cursor: "pointer",
                      position: "relative",
                      display: "inline-block",
                      textDecoration: "none",
                    }}
                  >
                    <img src={SettingIcon} alt="Settings Icon" />
                    {hoveredIcon === "settings" && (
                      <span
                        style={{
                          display: "block",
                          position: "absolute",
                          top: "-30px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          backgroundColor: "#E0ECFF",
                          color: "black",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Settings
                      </span>
                    )}
                  </NavLink>


                  <div
                    onMouseEnter={() => handleMouseEnter("logout")}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleShowLogout}
                    style={{
                      position: "relative",
                      display: "inline-block",
                      cursor: "pointer",
                    }}
                  >
                    <LogoutCurve
                      size="20"
                      color="#FF0000"
                    />
                    {hoveredIcon === "logout" && (
                      <span
                        style={{
                          display: "block",
                          position: "absolute",
                          top: "-30px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          backgroundColor: "#E0ECFF",
                          color: "black",
                          padding: "5px 8px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Logout
                      </span>
                    )}
                  </div>




                  <div onClick={handleShowNotification}
                    onMouseEnter={() => handleMouseEnter("notification")}
                    onMouseLeave={handleMouseLeave}
                    style={{
                      position: "relative",
                      display: "inline-block",
                      cursor: "pointer",
                    }}
                  >

                    <Notification
                      size="24"
                      color="#64748B"
                      onClick={handleShowNotification} />
                    {hoveredIcon === "notification" && (
                      <span
                        style={{
                          display: "block",
                          position: "absolute",
                          top: "-30px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          backgroundColor: "#E0ECFF",
                          color: "black",
                          padding: "5px 8px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Notifications
                      </span>
                    )}


                    {state.UsersList.hotelDetailsinPg.unreadNotificationCount > 0 && (
                      <span
                        style={{
                          position: "absolute",
                          top: "-2px",
                          right: "-2px",
                          minHeight: "16px",
                          minWidth: "16px",
                          padding: "0px 3px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "#F97316",
                          color: "white",
                          fontSize: 10, textAlign: "center",
                          borderRadius: "50%",
                          border: "2px solid white",
                          fontWeight: 600,
                          lineHeight: 1,

                        }}
                      >{state.UsersList?.hotelDetailsinPg?.unreadNotificationCount}</span>
                    )}
                  </div>

                  <div
                    onMouseEnter={() => handleMouseEnter("helpVideo")}
                    onMouseLeave={handleMouseLeave}
                    style={{
                      position: "relative",
                      display: "inline-block",
                      cursor: "pointer",
                      zIndex: 10,
                      overflow: "visible"

                    }}
                  >
                    <img src={HelpVideoIcon} alt="Help Video Icon" />
                    {hoveredIcon === "helpVideo" && (
                      <span
                        style={{
                          display: "block",
                          position: "absolute",
                          top: "-30px",
                          left: "0%",
                          transform: "translateX(-50%)",
                          backgroundColor: "#E0ECFF",
                          color: "black",
                          padding: "5px 8px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          whiteSpace: "nowrap",
                          zIndex: 1000,
                        }}
                      >
                        Help Video
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* main content */}

          <div
            style={{ width: "82%", overflowY: "auto", height: "100vh", }}
          >

            <Routes>

              <Route path="/payment-preview" element={<PaymentPreview />} />
              <Route
                path="/dashboard/:hostelId?"
                element={
                  <div style={{ marginTop: 5, marginLeft: 13, marginRight: 5 }}>
                    <Dashboards
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
                  <div style={{ marginTop: 5, marginLeft: 10, marginRight: 5 }}>
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
                  <div style={{ marginTop: 5, marginLeft: 10, marginRight: 5 }}>
                    <UserLists
                      allPageHostel_Id={allPageHostel_Id}
                      setAllPageHostel_Id={setAllPageHostel_Id}
                    />
                  </div>
                }
              />


              <Route
                path="/invoice/:hostelId?"
                element={
                  <div style={{ marginTop: 5, marginLeft: 15, marginRight: 5 }}>
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
                  <div style={{ marginTop: 5, marginLeft: 10, marginRight: 5 }}>
                    <Booking
                    />
                  </div>
                }
              />
              <Route
                path="/booking/details/:hostelId?"
                element={
                  <div style={{ marginTop: 5, marginLeft: 10, marginRight: 5 }}>
                    <BookingsPdfDetails
                    />
                  </div>
                }
              />

              <Route
                path="/recurring/:hostelId?"
                element={
                  <div style={{ marginTop: 5, marginLeft: 10, marginRight: 5 }}>
                    <RecurringBills
                    />
                  </div>
                }
              />
              <Route
                path="/receipts/:hostelId?"
                element={
                  <div style={{ marginTop: 5, marginLeft: 10, marginRight: 5 }}>
                    <Receipts
                    />
                  </div>
                }
              />
              <Route
                path="/receipts/details/:receiptId?"
                element={
                  <div style={{ marginTop: 5, marginLeft: 15, marginRight: 5 }}>
                    <ReceiptPdfDetails />

                  </div>
                }
              />
              <Route
                path="/invoice/details/:invoiceId"
                element={
                  <div style={{ marginTop: 5, marginLeft: 15, marginRight: 5 }}>
                    <BillsPdfDetails />
                  </div>
                }
              />
              <Route
                path="/vendor/:hostelId?"
                element={
                  <div style={{ marginTop: 5, marginLeft: 10, marginRight: 5 }}>
                    <VendorComponent
                      allPageHostel_Id={allPageHostel_Id}
                      setAllPageHostel_Id={setAllPageHostel_Id}
                    />
                  </div>
                }
              />
              <Route
                path="/compliance/:hostelId?"
                element={
                  <div style={{ marginTop: 5, marginLeft: 10, marginRight: 5 }}>
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
                  <div style={{ marginTop: 5, marginLeft: 10, marginRight: 5 }}>
                    <Assets allPageHostel_Id={allPageHostel_Id} />
                  </div>
                }
              />
              <Route
                path="/reports/:hostelId?"
                element={
                  <div style={{ marginTop: 5, marginLeft: 10, marginRight: 5 }}>
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
                  <div style={{ marginTop: 5, marginLeft: 10, marginRight: 5 }}>
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
                  <div style={{ marginTop: 5, marginLeft: 10, marginRight: 5 }}>
                    <Expenses
                      allPageHostel_Id={allPageHostel_Id}
                      setAllPageHostel_Id={setAllPageHostel_Id}
                    />
                  </div>
                }
              />
              <Route
                path="/banking/:hostelId?"
                element={
                  <div style={{ marginTop: 5, marginLeft: 10, marginRight: 5 }}>
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
                  <div style={{ marginTop: 5, marginLeft: 10, marginRight: 5 }}>
                    <CreateBill
                    />
                  </div>
                }
              />

              <Route
                path="/tenant/details/:tenantId"
                element={
                  <div style={{ marginTop: 5, marginLeft: 10, marginRight: 5 }}>
                    <UserListRoomDetail
                    />
                  </div>
                }
              />

              <Route
                path="/tenant/checkout/details/:tenantId"
                element={
                  <div style={{ marginTop: 5, marginLeft: 10, marginRight: 5 }}>
                    <CheckoutProfile />
                  </div>

                }
              />



              <Route
                path="/settings/:hostelId?/*"
                element={
                  <div style={{ marginTop: 5, marginLeft: 2, marginRight: 5 }}>
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
                <Route path="integration" element={<SettingIntergration />} />
                <Route path="electricity" element={<SettingElectricity />} />
                <Route path="billing-rule" element={<BillingRule />} />
                <Route path="notifications" element={<SettingsNotifications />} />
                <Route
                  path="invoice"
                  element={
                    <SettingInvoice
                      handleFormPage={handleFormPage}
                    />
                  }
                />
                <Route path="expenses" element={<SettingExpenses />} />
                <Route path="complaints" element={<SettingCompliance />} />
                <Route path="amenities" element={<SettingAmenities />} />
                <Route path="user" element={<SettingNewUser />} />
                <Route path="role" element={<SettingNewRole />} />
                <Route path="agreement" element={<SettingAgreement />} />


              </Route>

            </Routes>

          </div>
        </div>
      </Container >


      <Modal
        show={logoutformshow}
        onHide={handleCloseLogout}
        centered
        backdrop="static"
        className="logout-card d-flex justify-content-center align-items-center"
        dialogClassName="custom-modal-width"
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
            Logout?
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
          Are you sure you want Logout?
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
            onClick={handleCloseLogout}
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
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Sidebar;

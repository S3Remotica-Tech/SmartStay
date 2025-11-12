/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { StoreSelectedHostelAction, setPlanStatus } from "../Redux/Action/smartStayAction";
import "../Components/Sidebar.css";
import Dashboards from "../Pages/Dashboard";
import PgLists from "../Pages/PayingGuestFile/PgList";
import UserLists from "../Pages/CustomerFile/UserList";
import EbHostel from "../Pages/ElectrictyFile/EB_Hostel";
import Invoices from "../Pages/Bills/Invoice";
import Compliances from "../Pages/Compliance";
import Report from "../Reports/Reports";
import VendorComponent from "../Pages/VendorFIle/Vendor";
import { useDispatch, useSelector } from "react-redux";
import Profileimage from "../Assets/Images/New_images/profile-picture.png";
import Image from "react-bootstrap/Image";
import "bootstrap/dist/css/bootstrap.min.css";
import "sweetalert2/dist/sweetalert2.min.css";
import CryptoJS from "crypto-js";
import Smartstay from "../Assets/Images/New_images/LogoSmart.svg";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Manage from "../Assets/Images/New_images/category.png";
import Paying from "../Assets/Images/New_images/house.png";
import Custom from "../Assets/Images/New_images/customers.png";
import Vendor from "../Assets/Images/New_images/vendor.png";
import Invo from "../Assets/Images/New_images/invoice.png";
import Asset from "../Assets/Images/New_images/Asset.png";
import Eb from "../Assets/Images/New_images/electricity.png";
import Compl from "../Assets/Images/New_images/messages_gray.png";
import Expense from "../Assets/Images/New_images/expenses.png";
import Repo from "../Assets/Images/New_images/reports.png";
import Assets from "../Pages/AssetFile/Asset";
import Expenses from "../Pages/ExpenseFile/Expense";
import Paying2 from "../Assets/Images/New_images/housepay.png";
import Custom2 from "../Assets/Images/New_images/profile_blue.png";
import Invoice2 from "../Assets/Images/New_images/clipboard-text.png";
import Vendor2 from "../Assets/Images/New_images/shop.png";
import Asset2 from "../Assets/Images/rupee.png";
import Eb2 from "../Assets/Images/New_images/ele-active.png";
import Compl2 from "../Assets/Images/New_images/messages-active.png";
import Expense2 from "../Assets/Images/New_images/coin.png";
import Repo2 from "../Assets/Images/New_images/clipboard-text.png";
import Banking from "../Pages/Banking";
import bank from "../Assets/Images/New_images/bank.png";
import bankblank from "../Assets/Images/New_images/blank_bank.png";
import { ArrowUp2, ArrowDown2, Chart2 } from "iconsax-react";
import SettingAllPages from "../Pages/SettingAllPages";
import SettingIcon from "../Assets/Images/sidebariconOne.svg";
import HelpDocumentIcon from "../Assets/Images/sidebariconThree.svg";
import HelpVideoIcon from "../Assets/Images/sidebariconFour.svg";
import Logout from "../Assets/Images/turn-off.png";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { Route, Routes, } from "react-router-dom";
import Cookies from 'universal-cookie';
import { checkoutCustomerProfile } from "../Redux/Action/smartStayAction";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip"
import CreateBill from "../Pages/Bills/CreateBill";
import UserListRoomDetail from "../Pages/CustomerFile/UserListRoomDetail";
import CheckoutProfile from '../Pages/CustomerFile/CheckoutProfile';
import BillsDetails from '../Pages/Bills/BillsDetails';
import UserlistCheckout from '../Pages/CustomerFile/UserlistCheckout'
import SettingSecurity from "../Pages/SettingSecurityPage";
import SettingSubscription from "../Pages/SubscriptionFile/SettingSubscription";
import SettingIntergration from "../Pages/SettingIntergration";
import SettingElectricity from "../Pages/SettingElectricity";
import SettingInvoice from "../Pages/SettingInvoice";
import SettingExpenses from "../Pages/SettingExpenses";
import SettingCompliance from "../Pages/SettingCompliance";
import SettingAmenities from "../Pages/SettingAmenities";
import SettingNewUser from "../Pages/SettingUserNew";
import SettingNewRole from "../Pages/SettingNewRole";
import SettingsNotifications from "../Pages/SettingsNotifications";
import SettingAgreement from "../Pages/SettingAgreement";
import BillingRule from "../Pages/Settings/BillingRule/BillingRule";
import SettingGeneral from "../Pages/Settings/SettingGeneral";
import SettingManage from "../Pages/SettingManage";

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
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isFirstLogin = useRef(true);
  const dropdownRef = useRef(null);
  const [isVisibleSidebar, setIsVisibleSidebar] = useState(false)



  const pageMap = {
    "/dashboard/:hostelId": "dashboard",
    "/paying-guest/:hostelId": "pg-list",
    "/tenant/:hostelId": "user-list",
    "/invoice/:hostelId": "invoice",
    "/vendor/:hostelId": "vendor",
    "/compliance/:hostelId": "compliance",
    "/asset/:hostelId": "asset",
    "/reports/:hostelId": "reports",
    "/electricity/:hostelId": "eb",
    "/expense/:hostelId": "expenses",
    "/banking/:hostelId": "banking",
    "/settings/:hostelId": "settingNewDesign",
  };


  useEffect(() => {
    const path = location.pathname;
    if (pageMap[path]) {
      setCurrentPage(pageMap[path]);
      localStorage.setItem("lastPage", path);
    }
  }, [location.pathname]);


  useEffect(() => {
    if (state.login?.isLoggedIn && state.login.selectedHostel_Id) {
      if (isFirstLogin.current) {
        navigate(`/dashboard/${state.login.selectedHostel_Id}`, { replace: true });
        isFirstLogin.current = false;
      }
    } else if (!state.login.selectedHostel_Id) {
      navigate(`/dashboard`)
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


  // need this command line
  // useEffect(() => {
  //   if (state.login.selectedHostel_Id) {
  //     dispatch({ type: "ACCOUNTDETAILS" });
  //   }
  // }, [state.login.selectedHostel_Id]);






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

  useEffect(() => {
    setCurrentPage(localStorage.getItem("currentPage"));
  }, [currentPage]);

  const handlePageClick = (page) => {
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
    dispatch({ type: "LOG_OUT" });
    dispatch({ type: 'RESET_ALL' })
    const encryptData = CryptoJS.AES.encrypt(JSON.stringify(false), "abcd");
    localStorage.setItem("login", encryptData.toString());
    localStorage.setItem("loginId", "");
    localStorage.setItem("phoneId", "");
    localStorage.setItem("emilidd", "");
    localStorage.setItem("selectedHostelId", "");
    localStorage.setItem("selectedHostelName", "");
    localStorage.removeItem("lastPage");
    localStorage.removeItem("currentPage")
    const cookies = new Cookies();
    cookies.remove('v2-token', { path: '/' });
    cookies.remove('token', { path: '/' });
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

  const handleHostelId = (id, name, mainImage, initials) => {

    setInitials(initials)
    setPayingGuestName(name);
    setAllPageHostel_Id(id);
    setSelectedProfileImage(
      mainImage && mainImage !== "0" && mainImage !== "" ? mainImage : mainImage
    );
    setIsDropdownOpen(false);

    localStorage.setItem("selectedHostelId", id);
    localStorage.setItem("selectedHostelName", name);
    setIsSidebarOpen(false);
  };

  const handleSettingspage = (view) => {
       handlePageClick("settingNewDesign");
    setSettingsPGShow(false);
     const hostelId = state.login?.selectedHostel_Id;
  if (hostelId) {
    navigate(`/settings/${hostelId}`);
  } else {
    navigate(`/settings`);
  }
  };

  useEffect(() => {
    if (allPageHostel_Id) {
      dispatch(StoreSelectedHostelAction(allPageHostel_Id));
    }
  }, [allPageHostel_Id]);



  useEffect(() => {
    if (hostelListDetail && hostelListDetail?.length > 0) {
      const firstHostel = hostelListDetail[0]
      setInitials(firstHostel.initials)
      setAllPageHostel_Id(firstHostel.hostelId);
      setPayingGuestName(firstHostel.name);
      setSelectedProfileImage(
        firstHostel.mainImage &&
        firstHostel.mainImage !== "0" &&
        firstHostel.mainImage !== ""
        && firstHostel.mainImage

      );
    }
  }, [state.UsersList.hosteListStatusCode]);

  useEffect(() => {
    const savedHostelId = localStorage.getItem("selectedHostelId");
    if (
      !isInitialized &&
      hostelListDetail?.length > 0 &&
      state.UsersList.hosteListStatusCode === 200
    ) {
      const currentHostel =
        savedHostelId &&
        hostelListDetail?.find(
          (item) => item.hostelId === parseInt(savedHostelId, 10)
        );


      if (currentHostel) {
        setPayingGuestName(currentHostel.Name);
        setAllPageHostel_Id(currentHostel.hostelId);
        setSelectedProfileImage(
          currentHostel.mainImage &&
          currentHostel.mainImage !== "0" &&
          currentHostel.mainImage !== ""
          && currentHostel.mainImage

        );
      } else {
        const lowestIdItem = hostelListDetail?.reduce((prev, current) =>
          prev.id < current.id ? prev : current
        );



        setPayingGuestName(lowestIdItem.Name);
        setAllPageHostel_Id(lowestIdItem.hostelId);
        setSelectedProfileImage(
          lowestIdItem.mainImage &&
          lowestIdItem.mainImage !== "0" &&
          lowestIdItem.mainImage !== ""
          && lowestIdItem.mainImage

        );
      }

      setIsInitialized(true);
    }
  }, [
    state.UsersList.hosteListStatusCode,
    isInitialized,
  ]);




  useEffect(() => {
    if (state.login?.isLoggedIn && hostelListDetail?.length > 0) {
      const firstHostel = hostelListDetail[0];
      setInitials(firstHostel.initials)
      setAllPageHostel_Id(firstHostel.hostelId);
      setPayingGuestName(firstHostel.name);
      setSelectedProfileImage(
        firstHostel.mainImage &&
        firstHostel.mainImage !== "0" &&
        firstHostel.mainImage !== ""
        && firstHostel.mainImage

      );

      dispatch(StoreSelectedHostelAction(firstHostel.hostelId));
    }
  }, [
    state.login?.isLoggedIn,
    state.UsersList.hosteListStatusCode,
  ]);


  useEffect(() => {
    if (hostelListDetail && hostelListDetail?.length > 0) {
      const firstHostel = hostelListDetail[0]
      setInitials(firstHostel.initials)
      setAllPageHostel_Id(firstHostel.hostelId);
      setPayingGuestName(firstHostel.name);
      setSelectedProfileImage(
        firstHostel.mainImage &&
        firstHostel.mainImage !== "0" &&
        firstHostel.mainImage !== ""
        && firstHostel.mainImage

      );
    }
  }, [state.UsersList.hosteListStatusCode]);



  const handleShowsettingsPG = (settingNewDesign) => {
    console.log("settingNewDesign",settingNewDesign)
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
    if (state?.login?.selectedHostel_Id) {
      const accountList = state.createAccount?.accountList;

      if (
        accountList &&
        accountList.length > 0 &&
        accountList[0]?.plan_data &&
        accountList[0].plan_data.length > 0
      ) {
        if (accountList[0].plan_data[0]?.plan_type === "trail") {
          const trailPlanStatus = accountList[0].plan_data[0]?.status;
          if (trailPlanStatus !== "") {
            dispatch(setPlanStatus(trailPlanStatus));
          }
        } else {
          const hostelDetails = accountList[0].plan_data[0]?.hostel_details || [];

          const particularHostelPlan = hostelDetails?.find(
            (view) => view.id === state.login.selectedHostel_Id
          );

          if (particularHostelPlan && particularHostelPlan.plan_status !== "") {
            dispatch(setPlanStatus(particularHostelPlan.plan_status));
          }
        }
      }
    }
  }, [state.login?.selectedHostel_Id]);

  useEffect(() => {
    if (state.createAccount?.accountList?.roleId) {
      dispatch({ type: 'PERMISSIONROLELIST', payload: state.createAccount?.accountList.roleId })
    }
  }, [state.createAccount.accountList.roleId])

const handleFormPage = (isVisible) =>{
setIsVisibleSidebar(isVisible)
}


  return (
    <>
      <Container fluid className="p-0">
        <Row className="g-0 m-0">
          <Col xs={12} sm={12} className="d-md-none p-2 bg-white position-relative">
            <button
              onClick={toggleSidebar}
              style={{
                background: "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6H20M4 12H20M4 18H20"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </Col>
          <Col
            lg={2}
            md={2}
            sm={3}
            xs={12}
            className={`sidebar h-100 
              ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"} d-md-block`}
            style={{
              cursor: "pointer",
              backgroundColor: "#E0ECFF",
              position: "fixed",
              top: 0,
              bottom: 0,
              left: 0,
              overflowY: "auto",
              zIndex: 1000,
              minWidth: 210,
            }}
          >

            <div className="container" style={{ position: "relative" }}>
              <div
                className="d-flex align-items-center justify-content-between"
                style={{ padding: "16px 10px" }}
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
              </div>



              {hostelListDetail && hostelListDetail?.length > 0 && (
                <li ref={dropdownRef}
                  className={`align-items-center list-Item ${currentPage === "settingNewDesign" ? "active" : ""}`}
                  onClick={toggleDropdown}
                  style={{
                    listStyleType: "none",
                    display: "flex",
                    position: "relative",
                    cursor: "pointer",
                    fontFamily: "Gilroy",
                  }}
                >

                  {selectedProfileImage && selectedProfileImage !== null && selectedProfileImage !== "" ? (
                    <img
                      src={selectedProfileImage}
                      style={{
                        height: 25,
                        width: 25,
                        borderRadius: "50%",
                        marginRight: 8,
                      }}
                      alt="Selected Profile"
                    />
                  ) : (
                    <div
                      style={{
                        flexShrink: 0,
                        height: 25,
                        width: 25,
                        minWidth: 25,
                        borderRadius: "50%",
                        backgroundColor: "#1e45e1",
                        color: "white",
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
                      verticalAlign: "middle",
                    }}
                  >
                    {payingGuestName}
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
                              onClick={() => handleHostelId(item.hostelId, item.name, item.mainImage, item.initials)}
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
                                    backgroundColor: "#1e45e1",
                                    color: "white",
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
                <li
                  className="align-items-center d-flex justify-content-center
                   list-Button mb-2"
                  style={{
                    listStyleType: "none",
                    display: "flex",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                  onClick={() => handleShowsettingsPG("manage-pg", "Manage PG")}
                >
                  + Add PG
                </li>
              )}

              <ul
                className="first p-2 show-scrolls-sidebar"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  position: "relative",
                  marginBottom: "20px",
                  maxHeight: manageOpen ? "400px" : "500px",
                  overflowY: manageOpen ? "auto" : "hidden",
                  paddingBottom: "10px",
                }}
              >

                <li
                  className={`align-items-center  list-Item ${currentPage === "dashboard" ? "active" : ""
                    }`}
                  onClick={() => {
                    handlePageClick("dashboard");

                    const hostelId = state.login?.selectedHostel_Id;
                    if (hostelId) {
                      navigate(`/dashboard/${hostelId}`);
                    } else {
                      navigate(`/dashboard`);
                    }
                  }}

                  style={{
                    listStyleType: "none",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Chart2
                    size="20"
                    color={currentPage === "dashboard" ? "#1E45E1" : "#4B4B4B"}
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
                </li>

                <li
                  className={`align-items-center list-Item ${currentPage === "manage" ? "active" : ""
                    }`}
                  onClick={() => {
                    setManageOpen(!manageOpen);
                    localStorage.setItem("manageOpen", !manageOpen);
                  }}
                  style={{
                    listStyleType: "none",
                    display: "flex",
                    position: "relative",
                    marginTop: manageOpen ? "2px" : "10px"

                  }}
                >
                  <img
                    src={Manage}
                    style={{ height: 20, width: 20 }}
                    alt="manage"
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
                  <ul
                    className="p-1"
                    style={{ marginLeft: 10, zIndex: 1, position: "relative" }}
                  >
                    <li
                      className={`align-items-center list-sub-Item ${currentPage === "pg-list" ? "active" : ""
                        }`}
                      onClick={() => {
                        handlePageClick("pg-list");

                        const hostelId = state.login?.selectedHostel_Id;
                        if (hostelId) {
                          navigate(`/paying-guest/${hostelId}`);
                        } else {
                          navigate(`/paying-guest`);
                        }
                      }}

                      style={{ listStyleType: "none", display: "flex" }}
                    >
                      <img
                        src={currentPage === "pg-list" ? Paying2 : Paying}
                        alt="pg"
                        style={{ height: 20, width: 20 }}
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
                        Paying Guest
                      </span>
                    </li>
                    <li
                      className={`align-items-center list-sub-Item ${currentPage === "user-list" ? "active" : ""
                        }`}
                      onClick={() => {
                        handlePageClick("user-list");

                        const hostelId = state.login?.selectedHostel_Id;
                        if (hostelId) {
                          navigate(`/tenant/${hostelId}`);
                        } else {
                          navigate(`/tenant`);
                        }
                      }}

                      style={{ listStyleType: "none", display: "flex" }}
                    >
                      <img
                        src={currentPage === "user-list" ? Custom2 : Custom}
                        alt="user"
                        style={{ height: 20, width: 20 }}
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
                        Tenant
                      </span>
                    </li>
                    <li
                      className={`align-items-center list-sub-Item ${currentPage === "asset" ? "active" : ""
                        }`}
                      onClick={() => {
                        handlePageClick("asset");

                        const hostelId = state.login?.selectedHostel_Id;
                        if (hostelId) {
                          navigate(`/asset/${hostelId}`);
                        } else {
                          navigate(`/asset`);
                        }
                      }}

                      style={{ listStyleType: "none", display: "flex" }}
                    >
                      <img
                        src={currentPage === "asset" ? Asset2 : Asset}
                        alt="asset"
                        style={{ height: 20, width: 20 }}
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
                        Assets
                      </span>
                    </li>
                    <li
                      className={`align-items-center list-sub-Item ${currentPage === "vendor" ? "active" : ""
                        }`}
                      onClick={() => {
                        handlePageClick("vendor");

                        const hostelId = state.login?.selectedHostel_Id;
                        if (hostelId) {
                          navigate(`/vendor/${hostelId}`);
                        } else {
                          navigate(`/vendor`);
                        }
                      }}

                      style={{ listStyleType: "none", display: "flex" }}
                    >
                      <img
                        src={currentPage === "vendor" ? Vendor2 : Vendor}
                        alt="vendor"
                        style={{ height: 20, width: 20 }}
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
                        Vendor
                      </span>
                    </li>
                  </ul>
                )}

                <li
                  className={`align-items-center list-Item ${currentPage === "banking" ? "active" : ""
                    }`}
                  onClick={() => {
                    handlePageClick("banking");

                    const hostelId = state.login?.selectedHostel_Id;
                    if (hostelId) {
                      navigate(`/banking/${hostelId}`);
                    } else {
                      navigate(`/banking`);
                    }
                  }}

                  style={{ listStyleType: "none", display: "flex", marginTop: manageOpen ? "2px" : "10px" }}
                >
                  <img
                    src={currentPage === "banking" ? bank : bankblank}
                    alt="banking"
                    style={{ height: 20, width: 20 }}
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
                    Banking
                  </span>
                </li>

                <li
                  className={`align-items-center list-Item ${currentPage === "invoice" ? "active" : ""
                    }`}
                  onClick={() => {
                    handlePageClick("invoice");

                    const hostelId = state.login?.selectedHostel_Id;
                    if (hostelId) {
                      navigate(`/invoice/${hostelId}`);
                    } else {
                      navigate(`/invoice`);
                    }
                  }}

                  style={{ listStyleType: "none", display: "flex", marginTop: manageOpen ? "2px" : "10px" }}
                >
                  <img
                    src={currentPage === "invoice" ? Invoice2 : Invo}
                    alt="invoice"
                    style={{ height: 20, width: 20 }}
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
                    Bills
                  </span>
                </li>

                <li
                  className={`align-items-center list-Item ${currentPage === "eb" ? "active" : ""
                    }`}
                  onClick={() => {
                    handlePageClick("eb");

                    const hostelId = state.login?.selectedHostel_Id;
                    if (hostelId) {
                      navigate(`/electricity/${hostelId}`);
                    } else {
                      navigate(`/electricity`);
                    }
                  }}

                  style={{ listStyleType: "none", display: "flex", marginTop: manageOpen ? "2px" : "8px" }}
                >
                  <img
                    src={currentPage === "eb" ? Eb2 : Eb}
                    alt="eb"
                    style={{ height: 20, width: 20 }}
                  />
                  <span
                    className=" Title"
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      display: "inline-block",
                      fontFamily: "Gilroy",
                    }}
                  >
                    Electricity
                  </span>
                </li>

                <li
                  className={` align-items-center list-Item ${currentPage === "compliance" ? "active" : ""
                    }`}
                  onClick={() => {
                    handlePageClick("compliance");

                    const hostelId = state.login?.selectedHostel_Id;
                    if (hostelId) {
                      navigate(`/compliance/${hostelId}`);
                    } else {
                      navigate(`/compliance`);
                    }
                  }}


                  style={{ listStyleType: "none", display: "flex", marginTop: manageOpen ? "2px" : "8px" }}
                >
                  <img
                    src={currentPage === "compliance" ? Compl2 : Compl}
                    alt="compliance"
                    style={{ height: 20, width: 20, }}
                  />
                  <span
                    className=" Title"
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      display: "inline-block",
                      fontFamily: "Gilroy",
                    }}
                  >
                    Compliants
                  </span>
                </li>
                <li
                  className={`align-items-center list-Item ${currentPage === "expenses" ? "active" : ""
                    }`}
                  onClick={() => {
                    handlePageClick("expenses");

                    const hostelId = state.login?.selectedHostel_Id;
                    if (hostelId) {
                      navigate(`/expense/${hostelId}`);
                    } else {
                      navigate(`/expense`);
                    }
                  }}

                  style={{ listStyleType: "none", display: "flex", marginTop: manageOpen ? "2px" : "8px" }}
                >
                  <img
                    src={currentPage === "expenses" ? Expense2 : Expense}
                    alt="expence"
                    style={{ height: 20, width: 20 }}
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
                    Expenses
                  </span>
                </li>

                <li
                  className={` align-items-center list-Item ${currentPage === "reports" ? "active" : ""
                    }`}
                  onClick={() => {
                    handlePageClick("reports");

                    const hostelId = state.login?.selectedHostel_Id;
                    if (hostelId) {
                      navigate(`/reports/${hostelId}`);
                    } else {
                      navigate(`/reports`);
                    }
                  }}

                  style={{ listStyleType: "none", display: "flex", marginTop: manageOpen ? "2px" : "8px" }}
                >
                  <img
                    src={currentPage === "reports" ? Repo2 : Repo}
                    alt="report"
                    style={{ height: 20, width: 20 }}
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
                    Reports
                  </span>
                </li>
              </ul>


            </div>

            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "auto",
                padding: "12px 0",
                backgroundColor: "#E0ECFF",

              }}
            >
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

                <div
                  onMouseEnter={() => handleMouseEnter("settings")}
                  onMouseLeave={handleMouseLeave}
                  onClick={handleSettingspage}
                  style={{
                    cursor: "pointer",
                    position: "relative",
                    display: "inline-block",
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
                        backgroundColor: "white",
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
                </div>


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
                  <img src={Logout} alt="Logout Icon" style={{ width: 24, height: 24 }} />
                  {hoveredIcon === "logout" && (
                    <span
                      style={{
                        display: "block",
                        position: "absolute",
                        top: "-30px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: "white",
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


                <div
                  onMouseEnter={() => handleMouseEnter("helpDoc")}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    position: "relative",
                    display: "inline-block",
                    cursor: "pointer",
                  }}
                >
                  <img src={HelpDocumentIcon} alt="Help Document Icon" />
                  {hoveredIcon === "helpDoc" && (
                    <span
                      style={{
                        display: "block",
                        position: "absolute",
                        top: "-30px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: "white",
                        color: "black",
                        padding: "5px 8px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Help Document
                    </span>
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
                        backgroundColor: "white",
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

          </Col>
          <Col
            className="bg-white main-content"
            lg={{ span: 10, offset: 2 }}
            md={{ span: 10, offset: 2 }}
            sm={{ span: 9, offset: 3 }}
            xs={{ span: 9, offset: 3 }}
            style={{
              height: "100vh",
              overflowY: "auto",
              zIndex: 10,
            }}
          >
            <Routes>


              <Route
                path="/dashboard/:hostelId?"
                element={
                  <Dashboards
                    displayCompliance={handledisplaycompliace}
                    allPageHostel_Id={allPageHostel_Id}
                    setAllPageHostel_Id={setAllPageHostel_Id}
                  />
                }
              />
              <Route
                path="/paying-guest/:hostelId?"
                element={
                  <PgLists
                    displaysettings={handledisplaySettingsPG}
                    allPageHostel_Id={allPageHostel_Id}
                    setAllPageHostel_Id={setAllPageHostel_Id}
                  />
                }
              />

              <Route
                path="/tenant/:hostelId?"
                element={
                  <UserLists
                    allPageHostel_Id={allPageHostel_Id}
                    setAllPageHostel_Id={setAllPageHostel_Id}
                  />
                }
              />
              <Route
                path="/invoice/:hostelId?"
                element={
                  <Invoices
                    allPageHostel_Id={allPageHostel_Id}
                    setAllPageHostel_Id={setAllPageHostel_Id}
                  />
                }
              />
              <Route
                path="/invoice/details/:invoiceId"
                element={
                  <BillsDetails />
                }
              />
              <Route
                path="/vendor/:hostelId?"
                element={
                  <VendorComponent
                    allPageHostel_Id={allPageHostel_Id}
                    setAllPageHostel_Id={setAllPageHostel_Id}
                  />
                }
              />
              <Route
                path="/compliance/:hostelId?"
                element={
                  <Compliances
                    allPageHostel_Id={allPageHostel_Id}
                    setAllPageHostel_Id={setAllPageHostel_Id}
                  />
                }
              />
              <Route
                path="/asset/:hostelId?"
                element={<Assets allPageHostel_Id={allPageHostel_Id} />}
              />
              <Route
                path="/reports/:hostelId?"
                element={
                  <Report
                    allPageHostel_Id={allPageHostel_Id}
                    setAllPageHostel_Id={setAllPageHostel_Id}
                  />
                }
              />
              <Route
                path="/electricity/:hostelId?"
                element={
                  <EbHostel
                    allPageHostel_Id={allPageHostel_Id}
                    setAllPageHostel_Id={setAllPageHostel_Id}
                  />
                }
              />
              <Route
                path="/expense/:hostelId?"
                element={
                  <Expenses
                    allPageHostel_Id={allPageHostel_Id}
                    setAllPageHostel_Id={setAllPageHostel_Id}
                  />
                }
              />
              <Route
                path="/banking/:hostelId?"
                element={
                  <Banking
                    allPageHostel_Id={allPageHostel_Id}
                    setAllPageHostel_Id={setAllPageHostel_Id}
                  />
                }
              />
           



              <Route
                path="/create-bill"
                element={
                  <CreateBill
                  />
                }
              />

              <Route
                path="/tenant/details/:tenantId"
                element={
                  <UserListRoomDetail
                  />
                }
              />

              <Route
                path="/tenant/checkout/details/:tenantId"
                element={
                  <CheckoutProfile />

                }
              />



   <Route
                path="/settings/:hostelId?/*"
                element={
                  <SettingAllPages
                    allPageHostel_Id={allPageHostel_Id}
                    setAllPageHostel_Id={setAllPageHostel_Id}
                    payingGuestName={payingGuestName}
                    settignspgshow={settignspgshow}
                    onhandleShowsettingsPG={handleShowsettingsPG}
                    isVisibleSidebar={isVisibleSidebar}
                  />
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

          </Col>
        </Row>
      </Container>


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

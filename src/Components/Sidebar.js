/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { StoreSelectedHostelAction } from "../Redux/Action/smartStayAction";
import "../Components/Sidebar.css";
import Dashboards from "../Pages/Dashboard";
import PgLists from "../Pages/PayingGuestFile/PgList";
import UserLists from "../Pages/UserList";
import EbHostel from "../Pages/EB_Hostel";
import Invoices from "../Pages/Invoice";
import Compliances from "../Pages/Compliance";
import Report from "../Reports/Reports";
import VendorComponent from "../Pages/VendorFIle/Vendor";
import { useDispatch, useSelector } from "react-redux";
import Profileimage from "../Assets/Images/New_images/profile-picture.png";
import Image from "react-bootstrap/Image";
import "bootstrap/dist/css/bootstrap.min.css";
import "sweetalert2/dist/sweetalert2.min.css";
// import { useNavigate } from "react-router-dom";
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
import Asset2 from "../Assets/Images/New_images/Money.png";
import Eb2 from "../Assets/Images/New_images/ele-active.png";
import Compl2 from "../Assets/Images/New_images/messages-active.png";
import Expense2 from "../Assets/Images/New_images/coin.png";
import Repo2 from "../Assets/Images/New_images/clipboard-text.png";
// import Profilesettings from "../Pages/AccountSettings";
import Banking from "../Pages/Banking";
import bank from "../Assets/Images/New_images/bank.png";
import bankblank from "../Assets/Images/New_images/blank_bank.png";
import {
  ArrowUp2,
  ArrowDown2,
} from "iconsax-react";
import SettingAllPages from "../Pages/SettingAllPages";
import hostelimage from "../Assets/Images/New_images/hostelImage.png";
import Profile from "../Assets/Images/New_images/profile-picture.png";
import SettingIcon from "../Assets/Images/sidebariconOne.svg";
import HelpDocumentIcon from "../Assets/Images/sidebariconThree.svg";
import HelpVideoIcon from "../Assets/Images/sidebariconFour.svg";
import Logout from "../Assets/Images/turn-off.png";
import SettingManage from "../Pages/SettingManage";

function Sidebar() {

  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const stateData = useSelector((state) => state.createAccount);

  const [manageOpen, setManageOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [allPageHostel_Id, setAllPageHostel_Id] = useState("");
  const [payingGuestName, setPayingGuestName] = useState("payingGuest");
  const [isInitialized, setIsInitialized] = useState(false);

  const [currentPage, setCurrentPage] = useState("dashboard");
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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

  // let LoginId = localStorage.getItem("loginId");
  // let checkedValue = localStorage.getItem("checked");
  const [hostelListDetail, setHostelDetail] = useState("")

  // const loginId = localStorage.getItem("loginId");

  useEffect(() => {
    // dispatch({ type: "HOSTELLIST" });
    dispatch({ type: "ACCOUNTDETAILS" });
  }, []);
  useEffect(() => {
    dispatch({ type: "HOSTELIDDETAILS" });
  }, [])

  // useEffect(()=>{
  //   if(state.UsersList.hosteListStatusCode === 200){
  //     setHostelDetail(state.UsersList.hostelList)
  //     setTimeout(()=>{
  //       dispatch({ type: "CLEAR_HOSTELLIST_STATUS_CODE"});
  //     },500)
  //   }
  //   },[state.UsersList.hosteListStatusCode])
  useEffect(() => {
    if (state.UsersList.statusCodeForhostelListNewDetails === 200) {
      setHostelDetail(state.UsersList.hostelListNewDetails.data)
      setTimeout(() => {
        dispatch({ type: "CLEAR_HOSTEL_ID_LIST" });
      }, 500)
    }
  }, [state.UsersList.statusCodeForhostelListNewDetails])

  // const [show, setShow] = useState(false);
  // const [notification, setNotification] = useState([]);
  // const [hostel_Id, setHostel_Id] = useState("");

  useEffect(() => {
    dispatch({ type: "ALL-NOTIFICATION-LIST" });
  }, []);






  useEffect(() => {
    if (stateData.statusCodeForAccountList === 200) {
      const loginInfo = stateData.accountList[0].user_details;

      if (loginInfo) {
        const LoginId = loginInfo.id;
        // const NameId = loginInfo.Name;
        const phoneId = loginInfo.mobileNo;
        const emilidd = loginInfo.email_Id;
        const Is_Enable = loginInfo.isEnable;
        const Pass_word = loginInfo.password;

        const encryptedLoginId = CryptoJS.AES.encrypt(
          LoginId.toString(),
          "abcd"
        ).toString();
        // const encryptedname = CryptoJS.AES.encrypt(NameId.toString(), 'abcd').toString();
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
        const encryptPassword = CryptoJS.AES.encrypt(
          Pass_word.toString(),
          "abcd"
        ).toString();

        localStorage.setItem("loginId", encryptedLoginId);
        // localStorage.setItem("NameId", encryptedname);
        localStorage.setItem("phoneId", encryptedphone);
        localStorage.setItem("emilidd", encryptedemail);
        localStorage.setItem("IsEnable", encryptIsEnable);
        localStorage.setItem("Password", encryptPassword);

        if (Is_Enable === 0) {
          const encryptData = CryptoJS.AES.encrypt(
            JSON.stringify(true),
            "abcd"
          );
          localStorage.setItem("login", encryptData.toString());
        } else {
          const encryptData = CryptoJS.AES.encrypt(
            JSON.stringify(false),
            "abcd"
          );
          localStorage.setItem("login", encryptData.toString());
        }
      } else {
        console.log("No data found");
      }
      setTimeout(() => {
        dispatch({ type: "CLEAR_ACCOUNT_STATUS_CODE" });
      }, 100);
    }
  }, [stateData.statusCodeForAccountList]);

  // const [filterhostellist, setFilterhostellist] = useState([]);
  // const [loginCustomerid, setLoginCustomerId] = useState('')
  const [profiles, setProfiles] = useState(null);
  const [profilename, setProfileArray] = useState("");

  useEffect(() => {
    if (stateData.accountList.length > 0) {
      try {
        const FilteredProfile = stateData.accountList[0]?.user_details;

        const profilePictures = FilteredProfile.profile;

        const profileName = FilteredProfile.first_name;
        setProfiles(profilePictures);
        setProfileArray(profileName);
      } catch (error) {
        console.log("Error decrypting loginid", error);
      }
    }
  }, [stateData.accountList, state.UsersList.hostelListNewDetails.data, stateData.statusCodeForAccount]);


  useEffect(() => {
    setCurrentPage(localStorage.getItem("currentPage"));
  }, [currentPage]);

  const handlePageClick = (page) => {
    setCurrentPage(page);
    setIsDropdownOpen(false);
    localStorage.setItem("currentPage", page);
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

  const handleLogout = () => {
    dispatch({ type: "LOG_OUT" });

    const encryptData = CryptoJS.AES.encrypt(JSON.stringify(false), "abcd");
    localStorage.setItem("login", encryptData.toString());
    localStorage.setItem("loginId", "");
    localStorage.setItem("phoneId", "");
    localStorage.setItem("emilidd", "");
    localStorage.setItem("selectedHostelId", "");
    localStorage.setItem("selectedHostelName", "");
  };

  // const stateAccount = useSelector((state) => state.createAccount);



  // useEffect(() => {
  //   if (stateAccount.statusCodeForAccountList === 200) {
  // const loginProfile = stateAccount.accountList[0].user_details.profile;
  // setProfile(loginProfile);
  //   }
  // }, [stateAccount.statusCodeForAccountList]);

  const handledisplaycompliace = () => {
    setCurrentPage("compliance");
    localStorage.setItem("currentPage", "compliance");
  };

  const [settignspgshow, setSettingsPGShow] = useState(false);

  const handledisplaySettingsPG = () => {
    setCurrentPage("settingNewDesign");
    localStorage.setItem("currentPage", "settingNewDesign");
    setSettingsPGShow(true);
  };

  const [selectedProfileImage, setSelectedProfileImage] = useState("");

  const handleHostelId = (id, name, profile) => {
    setPayingGuestName(name);
    setAllPageHostel_Id(id);
    setSelectedProfileImage(
      profile && profile !== "0" && profile !== "" ? profile : Profile
    );
    setIsDropdownOpen(false);


    localStorage.setItem("selectedHostelId", id);
    localStorage.setItem("selectedHostelName", name);
  };

  const handleSettingspage = () => {
    handlePageClick("settingNewDesign");
    setSettingsPGShow(false);
  };

  useEffect(() => {
    if (allPageHostel_Id) {
      dispatch(StoreSelectedHostelAction(allPageHostel_Id));
    }
  }, [allPageHostel_Id]);



  useEffect(() => {
    const savedHostelId = localStorage.getItem("selectedHostelId");
    // const savedHostelName = localStorage.getItem("selectedHostelName");

    if (
      !isInitialized &&
      hostelListDetail?.length > 0 &&
      state.UsersList.statusCodeForhostelListNewDetails === 200
    ) {
      const currentHostel =
        savedHostelId &&
        hostelListDetail?.find(
          (item) => item.id === parseInt(savedHostelId, 10)
        );

      if (currentHostel) {
        // Restore saved hostel data if available
        setPayingGuestName(currentHostel.Name);
        setAllPageHostel_Id(currentHostel.id);
        setSelectedProfileImage(
          currentHostel.profile &&
            currentHostel.profile !== "0" &&
            currentHostel.profile !== ""
            ? currentHostel.profile
            : Profile
        );
      } else {
        const lowestIdItem = hostelListDetail?.reduce(
          (prev, current) => (prev.id < current.id ? prev : current)
        );
        setPayingGuestName(lowestIdItem.Name);
        setAllPageHostel_Id(lowestIdItem.id);
        setSelectedProfileImage(
          lowestIdItem.profile &&
            lowestIdItem.profile !== "0" &&
            lowestIdItem.profile !== ""
            ? lowestIdItem.profile
            : Profile
        );
      }

      setIsInitialized(true);
    }
  }, [
    state.UsersList.hostelListNewDetails.data,
    hostelListDetail,
    state.UsersList.statusCodeForhostelListNewDetails,
    isInitialized,
  ]);

  useEffect(() => {
    // Check if the user is logged in
    if (state.login?.isLoggedIn && hostelListDetail?.length > 0) {
      const firstHostel = hostelListDetail.reduce((prev, current) =>
        prev.id < current.id ? prev : current
      );

      // Update state after login with the first hostel
      setAllPageHostel_Id(firstHostel.id); // State update here
      setPayingGuestName(firstHostel.Name); // State update here
      setSelectedProfileImage(
        firstHostel.profile &&
          firstHostel.profile !== "0" &&
          firstHostel.profile !== ""
          ? firstHostel.profile
          : Profile
      );

      // Store the selected hostel id in the Redux store
      dispatch(StoreSelectedHostelAction(firstHostel.id));

      // Clear localStorage when logging out
      // localStorage.removeItem("selectedHostelId");
    }
  }, [
    state.login?.isLoggedIn,
    state.UsersList.hostelListNewDetails.data,
    hostelListDetail,
    state.UsersList.statusCodeForhostelListNewDetails,
  ]);



  const [pgshow, setPgshow] = useState(false);
  // const [pgformshow, setPgformshow] = useState(true);

  const handleShowsettingsPG = (settingNewDesign) => {
    handledisplaySettingsPG(settingNewDesign);
    dispatch({ type: "MANAGE_PG" });
    setPgshow(true);
  };

  const [hoveredIcon, setHoveredIcon] = useState(null);

  const handleMouseEnter = (icon) => setHoveredIcon(icon);
  const handleMouseLeave = () => setHoveredIcon(null);



  // const hostelList = state.UsersList?.hostelListNewDetails?.data ?? [];

  return (
    <>
      <Container fluid className="p-0">
        <Row className="g-0 m-0">
          <Col
            lg={2}
            md={2}
            sm={3}
            xs={3}
            className="d-sm-block  sidebar h-100"
            style={{
              cursor: "pointer",
              backgroundColor: "#E0ECFF",
              position: "fixed",
              //  maxWidth: 240, width: "100%", height: "100%", maxHeight: 768
            }}
          >
            <div className="container" style={{ position: "relative" }}>
              <div
                className="d-flex align-items-center justify-content-start"
                style={{ padding: "16px 10px" }}
              >
                <img
                  src={Smartstay}
                  alt="smartstay"
                  style={{ height: 25.06, width: 134 }}
                  className="Title"
                  onClick={() => handlePageClick("dashboard")}
                />
              </div>

              {hostelListDetail &&
                hostelListDetail?.length > 0 && (
                  <li
                    className={`align-items-center list-Item ${currentPage === "settingNewDesign" ? "active" : ""
                      }`}
                    onClick={toggleDropdown}
                    style={{
                      listStyleType: "none",
                      display: "flex",
                      position: "relative",
                      cursor: "pointer",
                      fontFamily: "Gilroy",
                    }}
                  >
                    <img
                      src={
                        selectedProfileImage &&
                          selectedProfileImage !== "0" &&
                          selectedProfileImage !== ""
                          ? selectedProfileImage
                          : hostelimage
                      }

                      style={{
                        height: 25,
                        width: 25,
                        borderRadius: "50%",
                        marginRight: 8,
                      }}
                      alt="Selected Profile"
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
                      {payingGuestName}
                    </span>
                    <span className="ms-auto">
                      {isDropdownOpen ? (
                        <ArrowUp2 size="16" color="#4B4B4B" />
                      ) : (
                        <ArrowDown2 size="16" color="#4B4B4B" />
                      )}
                    </span>

                    {/* Dropdown */}
                    {isDropdownOpen && (
                      <div
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
                        }}
                      >
                        <ul style={{ margin: 0, padding: 0 }}>
                          {hostelListDetail.map((item) => (
                            <li
                              key={item.id}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                padding: "8px 12px",
                                cursor: "pointer",
                                color: "#007bff",
                              }}
                              onClick={() =>
                                handleHostelId(item.id, item.Name, item.profile)
                              }
                            >
                              <img
                                src={
                                  item.profile &&
                                    item.profile !== "0" &&
                                    item.profile !== ""
                                    ? item.profile
                                    : Profile
                                }
                                style={{
                                  height: 25,
                                  width: 25,
                                  borderRadius: "50%",
                                  marginRight: 8,
                                }}
                                alt={item.Name || "Default Profile"}
                              />
                              {item.Name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                )}

              {!(hostelListDetail ?? []).length && (
                <li
                  className="align-items-center d-flex justify-content-center list-Button mb-2"
                  style={{
                    listStyleType: "none",
                    display: "flex",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                  onClick={() => handleShowsettingsPG()}
                >
                  + Add PG
                </li>
              )}


              <ul
                className="first p-0 show-scrolls"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  position: "relative",
                  marginBottom: "20px",
                  maxHeight: manageOpen ? "310px" : "unset",
                  overflowY: manageOpen ? "auto" : "hidden",
                  paddingBottom: "30px",
                }}
              >


                <li
                  className={`align-items-center list-Item ${currentPage === "dashboard" ? "active" : ""
                    }`}
                  onClick={() => handlePageClick("dashboard")}
                  style={{
                    listStyleType: "none",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke={currentPage === "dashboard" ? "#1E45E1" : "#4B4B4B"}
                  // style={{ marginRight: 8 }}
                  >
                    <path
                      d="M7.5013 18.3332H12.5013C16.668 18.3332 18.3346 16.6665 18.3346 12.4998V7.49984C18.3346 3.33317 16.668 1.6665 12.5013 1.6665H7.5013C3.33464 1.6665 1.66797 3.33317 1.66797 7.49984V12.4998C1.66797 16.6665 3.33464 18.3332 7.5013 18.3332Z"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.9167 15.4168C13.8333 15.4168 14.5833 14.6668 14.5833 13.7502V6.25016C14.5833 5.3335 13.8333 4.5835 12.9167 4.5835C12 4.5835 11.25 5.3335 11.25 6.25016V13.7502C11.25 14.6668 11.9917 15.4168 12.9167 15.4168Z"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.08464 15.4165C8.0013 15.4165 8.7513 14.6665 8.7513 13.7498V10.8332C8.7513 9.9165 8.0013 9.1665 7.08464 9.1665C6.16797 9.1665 5.41797 9.9165 5.41797 10.8332V13.7498C5.41797 14.6665 6.15964 15.4165 7.08464 15.4165Z"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <span
                    className="Title"
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      display: "inline-block",
                      fontFamily: "Gilroy",
                    }}
                  >
                    Home
                  </span>
                </li>

                {/* manage */}
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
                  }}
                >
                  <img src={Manage} style={{ height: 20, width: 20 }} alt="manage" />
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
                      onClick={() => handlePageClick("pg-list")}
                      style={{ listStyleType: "none", display: "flex" }}
                    >
                      <img
                        src={currentPage === "pg-list" ? Paying2 : Paying} alt="pg"
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
                      onClick={() => handlePageClick("user-list")}
                      style={{ listStyleType: "none", display: "flex" }}
                    >
                      <img
                        src={currentPage === "user-list" ? Custom2 : Custom} alt="user"
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
                        Customers
                      </span>
                    </li>
                    <li
                      className={`align-items-center list-sub-Item ${currentPage === "asset" ? "active" : ""
                        }`}
                      onClick={() => handlePageClick("asset")}
                      style={{ listStyleType: "none", display: "flex" }}
                    >
                      <img
                        src={currentPage === "asset" ? Asset2 : Asset} alt="asset"
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
                      onClick={() => handlePageClick("vendor")}
                      style={{ listStyleType: "none", display: "flex" }}
                    >
                      <img
                        src={currentPage === "vendor" ? Vendor2 : Vendor} alt="vendor"
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
                  onClick={() => handlePageClick("banking")}
                  style={{ listStyleType: "none", display: "flex" }}
                >
                  <img
                    src={currentPage === "banking" ? bank : bankblank} alt="banking"
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
                  onClick={() => handlePageClick("invoice")}
                  style={{ listStyleType: "none", display: "flex" }}
                >
                  <img
                    src={currentPage === "invoice" ? Invoice2 : Invo} alt="invoice"
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

                {/* <li className={`p-2 mb-2 align-items-center list-Item ${currentPage == 'asset' ? 'active' : ''}`} onClick={() => handlePageClick('asset')} style={{ listStyleType: "none", display: "flex" ,backgroundColor: currentPage === 'asset' ? '#FFFFFF' : 'inherit',color: currentPage === 'asset' ? 'rgba(30, 69, 225, 1)' : 'inherit'}}>
                <img src={currentPage == 'asset' ? Asset2 : Asset} style={{ height:20,width:20 ,color:currentPage == 'asset' && "rgba(30, 69, 225, 1)" }} />
                <span className="ms-3 Title" style={{ fontSize: 14, fontWeight: 600, display: "inline-block", fontFamily: "Gilroy" }}>Assets</span></li> */}

                <li
                  className={`align-items-center list-Item ${currentPage === "eb" ? "active" : ""
                    }`}
                  onClick={() => handlePageClick("eb")}
                  style={{ listStyleType: "none", display: "flex" }}
                >
                  <img
                    src={currentPage === "eb" ? Eb2 : Eb} alt="eb"
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
                  onClick={() => handlePageClick("compliance")}
                  style={{ listStyleType: "none", display: "flex" }}
                >
                  <img
                    src={currentPage === "compliance" ? Compl2 : Compl} alt="compliance"
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
                    Compliants
                  </span>
                </li>
                <li
                  className={`align-items-center list-Item ${currentPage === "expenses" ? "active" : ""
                    }`}
                  onClick={() => handlePageClick("expenses")}
                  style={{ listStyleType: "none", display: "flex" }}
                >
                  <img
                    src={currentPage === "expenses" ? Expense2 : Expense} alt="expence"
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
                  onClick={() => handlePageClick("reports")}
                  style={{ listStyleType: "none", display: "flex" }}
                >
                  <img
                    src={currentPage === "reports" ? Repo2 : Repo} alt="report"
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

                {/* <li className={`align-items-center list-Item ${currentPage === 'settings' ? 'active' : ''}`} onClick={() => handlePageClick('settings')} style={{ listStyleType: "none", display: "flex" }}>
                  <img src={currentPage === 'settings' ? Sett2 : Sett} style={{ height: 20, width: 20 }} />
                  <span className="Title" style={{ fontSize: 14, fontWeight: 600, display: "inline-block", fontFamily: "Gilroy" }}>Settings</span>
                </li> */}
              </ul>
            </div>

            <div
              className="mb-3"
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <ul className=" p-0">
                <li
                  className={` align-items-center list-Items ${currentPage === "profile" ? "active" : ""
                    }`}
                  //  onClick={() => handlePageClick('profile')}
                  style={{ listStyleType: "none", display: "flex", width: 200 }}
                >
                  <div className="mr-3" style={{ cursor: "pointer" }}>
                    <Image
                      src={
                        profiles === "null" ||
                          profiles === null ||
                          profiles === undefined ||
                          profiles === "undefined" ||
                          profiles === "" ||
                          profiles === 0 ||
                          profiles === "0"
                          ? Profileimage
                          : profiles
                      }
                      alt="profile-image"
                      roundedCircle
                      style={{ height: "40px", width: "40px" }}
                    // onClick={() => handlePageClick('profile')}
                    />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span
                      className="ms-3 Title"
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        display: "inline-block",
                        fontFamily: "Gilroy",
                        textTransform: "capitalize",
                      }}
                    >
                      {profilename}
                    </span>
                    <span
                      className="ms-3 Title"
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        display: "inline-block",
                        fontFamily: "Gilroy",
                        color: "blue",
                      }}
                    >
                      Admin
                    </span>
                  </div>
                </li>
              </ul>
              <div style={{ border: "1px solid white " }}></div>

              {/* Four sidebar icons */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
                className=" w-100"
              >
                {/* Settings Icon */}
                <div
                  onMouseEnter={() => handleMouseEnter("settings")}
                  onMouseLeave={handleMouseLeave}
                  onClick={handleSettingspage}
                  style={{
                    position: "relative",
                    display: "inline-block",
                    cursor: "pointer",
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
                        backgroundColor: "White",
                        color: "black",
                        padding: "5px 8px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Settings
                    </span>
                  )}
                </div>

                {/* log out */}
                <div
                  className="logout"
                  onMouseEnter={() => handleMouseEnter("logout")}
                  onMouseLeave={handleMouseLeave}
                  onClick={handleShowLogout}
                  style={{
                    position: "relative",
                    display: "inline-block",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={Logout}
                    alt="Logout Icon"
                    style={{ width: 24, height: 24 }}
                  />
                  {hoveredIcon === "logout" && (
                    <span
                      style={{
                        display: "block",
                        position: "absolute",
                        top: "-30px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: "White",
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

                {/* Help Document Icon */}
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
                        backgroundColor: "White",
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

                {/* Help Video Icon */}
                <div
                  onMouseEnter={() => handleMouseEnter("helpVideo")}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    position: "relative",
                    display: "inline-block",
                    cursor: "pointer",
                  }}
                >
                  <img src={HelpVideoIcon} alt="Help Video Icon" />
                  {hoveredIcon === "helpVideo" && (
                    <span
                      style={{
                        display: "block",
                        position: "absolute",
                        top: "-30px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: "White",
                        color: "black",
                        padding: "5px 8px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        whiteSpace: "nowrap",
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
            style={
              {
                // maxWidth: 1126,
                //  width: "100%"
              }
            }
          >
            {/* <div className='container d-flex justify-content-end align-items-center m-0' style={{ marginTop: '20px' }}>

              <div > */}
            {/* <InputGroup>
    <InputGroup.Text style={{ backgroundColor: "#ffffff", borderRight: "none" }}>
      <CiSearch style={{ fontSize: 20 }} />
    </InputGroup.Text>
    <FormControl size="lg" style={{ boxShadow: "none", borderColor: "lightgray", borderLeft: "none", fontSize: 15, fontWeight: 600, '::placeholder': { color: "gray", fontWeight: 600 } }}
      placeholder="Search..."
    />
  </InputGroup> */}
            {/* </div> */}
            {/* <div className="mr-3" onClick={handleShowpopup} style={{cursor:"pointer"}}>
  <img src={Notify} alt="notification" />
</div> */}

            {/* </div> */}

            {/* <Offcanvas placement="end" show={show} onHide={handleClosepopup} style={{ width: "69vh" }}>
              <Offcanvas.Title style={{ background: "#2F74EB", color: "white", paddingLeft: "20px", height: "35px", fontSize: "16px", paddingTop: "5px" }} >Notification</Offcanvas.Title>
              <Offcanvas.Body style={{ maxHeight: 'calc(100vh - 35px)', overflowY: 'auto' }}>
                <div class="d-flex flex-row bd-highlight mb-3  item" style={{ marginTop: "-20px", fontSize: "15px" }}>
                  <div class="p-1 bd-highlight user-menu">
                    <div>
                      {newNotificationsCount > 0 && <p style={{ marginTop: '10px' }}><span style={{ backgroundColor: '#DBE1FB', padding: '8px 12px', color: '#222222', borderRadius: '14px', fontWeight: 500 }}>{newNotificationsCount} new notifications</span></p>}
                    </div>
                    <div className='container' style={{ marginTop: "30px" }}>
                      <>
                        <div className='row mb-3'>
                          {state.login.Notification && state.login.Notification?.length > 0 && state.login.Notification.map((val) => (
                            <div key={val.id} className='border-bottom' style={{ marginBottom: '10px', display: 'flex', flexDirection: 'row', justifyContent: "space-between" }}>
                              <p style={{ color: val.status === 1 ? 'black' : '#939393', width: '75%' }}>{val.message}</p>
                              {val.status === 1 && <div style={{ width: '10px', height: '10px', backgroundColor: 'blue', borderRadius: '50%', marginTop: '5px' }}>
                              </div>}


                            </div>
                          ))}

                        </div>
                      </>


                    </div>
                  </div>
                </div>

              </Offcanvas.Body>
            </Offcanvas> */}

            {currentPage === "dashboard" && (
              <Dashboards
                displayCompliance={handledisplaycompliace}
                allPageHostel_Id={allPageHostel_Id}
                setAllPageHostel_Id={setAllPageHostel_Id}
              />
            )}
            {currentPage === "pg-list" && (
              <PgLists
                displaysettings={handledisplaySettingsPG}
                allPageHostel_Id={allPageHostel_Id}
                setAllPageHostel_Id={setAllPageHostel_Id}
              />
            )}
            {currentPage === "user-list" && (
              <UserLists
                allPageHostel_Id={allPageHostel_Id}
                setAllPageHostel_Id={setAllPageHostel_Id}
              />
            )}
            {currentPage === "invoice" && (
              <Invoices
                allPageHostel_Id={allPageHostel_Id}
                setAllPageHostel_Id={setAllPageHostel_Id}
              />
            )}
            {currentPage === "vendor" && (
              <VendorComponent
                allPageHostel_Id={allPageHostel_Id}
                setAllPageHostel_Id={setAllPageHostel_Id}
              />
            )}
            {currentPage === "compliance" && (
              <Compliances
                allPageHostel_Id={allPageHostel_Id}
                setAllPageHostel_Id={setAllPageHostel_Id}
              />
            )}
            {currentPage === "asset" && (
              <Assets allPageHostel_Id={allPageHostel_Id} />
            )}
            {currentPage === "reports" && (
              <Report
                allPageHostel_Id={allPageHostel_Id}
                setAllPageHostel_Id={setAllPageHostel_Id}
              />
            )}
            {/* {currentPage === 'settings' && < Setting allPageHostel_Id={allPageHostel_Id} setAllPageHostel_Id={setAllPageHostel_Id}/>} */}
            {currentPage === "eb" && (
              <EbHostel
                allPageHostel_Id={allPageHostel_Id}
                setAllPageHostel_Id={setAllPageHostel_Id}
              />
            )}
            {currentPage === "expenses" && (
              <Expenses
                allPageHostel_Id={allPageHostel_Id}
                setAllPageHostel_Id={setAllPageHostel_Id}
              />
            )}
            {/* {currentPage === "profile" && (
              <Profilesettings
                allPageHostel_Id={allPageHostel_Id}
                setAllPageHostel_Id={setAllPageHostel_Id}
              />
            )} */}
            {currentPage === "banking" && (
              <Banking
                allPageHostel_Id={allPageHostel_Id}
                setAllPageHostel_Id={setAllPageHostel_Id}
              />
            )}
            {currentPage === "settingNewDesign" && (
              <SettingAllPages
                allPageHostel_Id={allPageHostel_Id}
                setAllPageHostel_Id={setAllPageHostel_Id}
                payingGuestName={payingGuestName}
                settignspgshow={settignspgshow}
                onhandleShowsettingsPG={handleShowsettingsPG}
              />
            )}
          </Col>
        </Row>
      </Container>
      {pgshow === true ? (
        <SettingManage pgshow={pgshow} setPgshow={setPgshow} />
      ) : null}

      <Modal
        show={logoutformshow}
        onHide={handleCloseLogout}
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

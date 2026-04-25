/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
// import { Button } from "react-bootstrap";
// import Modal from "react-bootstrap/Modal";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { checkoutCustomerProfile } from "../../Redux/Action/LoginAction";
import { Call, Sms, House, DocumentUpload, AddCircle } from "iconsax-react";
import Areaimage from "../../Assets/Images/area_icon.png";
import PincodeImage from "../../Assets/Images/pin.png";
import CityImage from "../../Assets/Images/buildings.png";
import Landamrkimage from "../../Assets/Images/landmark.png";
import Floorimage from "../../Assets/Images/floor_icon.png";
import RoomImage from "../../Assets/Images/room_icon.png";
import LinkImage from "../../Assets/Images/home-link.png";
import Group from "../../Assets/Images/Group.png";
// import MoneyImage from "../../Assets/Images/Money.png";
import Stayhistory from "../../Assets/Images/stay_history.png";
import viewdoc from "../../Assets/Images/New_images/viewdoc.png";
import StayHistory from "./StayHistory";
import PropTypes from "prop-types";
import leftarrow from "../../Assets/Images/arrow-left.png";
import Profiles from "../../Assets/Images/New_images/profile-picture.png";
import repeat from "../../Assets/Images/repeate-one.png";
import { useNavigate } from "react-router-dom";
import UserEb from "./UserListEb";
import UserListInvoice from "./UserListInvoice";
import UserListAmenities from "./UserListAmenities";
import TransactionHistory from "./TransactionHistory";
// import RequestedAmenities from "./RequestedAmenities";
import { useHasPermission } from "../../Utils/Permission";
// import EditImage from "../../Assets/Images/New_images/cus_edit.svg"
import FileAdd from "../../Assets/Images/New_images/file_add.svg";
import ParentsGuardian from "./Parents&Guardian";
import KYCDocuments from "./KYCDocuments";
import ManualDocumentsDetails from "./ManualDocumentsDetails";
function CustomerProfile(props) {
  const state = useSelector((state) => state);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [details, setDetails] = useState("");
  // const [deductionDetails, setDeductionDetails] = useState("")
  const [value, setValue] = useState("1");
  // const [show, setShow] = useState(false);
  // const [showDoc2, setShowDoc2] = useState(false)
  const [stayDetailsShow, setStayDetailsShow] = useState(false);
  // const [previewUrl, setPreviewUrl] = useState(null);
  // const [previewUrl2, setPreviewUrl2] = useState(null)
  const [advanceList, setAdvanceList] = useState("");
  const [documentvalue, setDocumentValue] = useState("1");
  const [activeTab, setActiveTab] = useState("kyc");
  const [additionalContact, setAdditionalContact] = useState([]);

  const handleChangesupload = (event, newValue) => {
    setDocumentValue(newValue);
  };

  const handleShowStayHistory = () => {
    setStayDetailsShow(true);
  };
  const handleCloseStayHistory = () => {
    setStayDetailsShow(false);
  };

  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    setDocuments([]);
  }, []);

  const getFileName = (url) => {
    if (!url) return "";
    try {
      return decodeURIComponent(url.split("/").pop());
    } catch (e) {
      console.error("Error decoding file name:", e);
      return url;
    }
  };
  const handleFileOpen = (url) => {
    if (!url) return;

    const lowerUrl = url.toLowerCase();

    if (
      lowerUrl.endsWith(".pdf") ||
      lowerUrl.endsWith(".jpg") ||
      lowerUrl.endsWith(".jpeg") ||
      lowerUrl.endsWith(".png")
    ) {
      // setPreviewUrl(url);
      // setShow(true);
    } else if (lowerUrl.endsWith(".xlsx") || lowerUrl.endsWith(".xls")) {
      const viewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`;
      window.open(viewerUrl, "_blank");
    } else {
      window.open(url, "_blank");
    }
  };

  const cleanFileName = (url) => {
    const fullName = getFileName(url);
    const parts = fullName.split("_");
    return parts.slice(2).join("_");
  };

  useEffect(() => {
    if (state.UsersList.StatuscodeforCheckoutProfile) {
      setDetails(state.UsersList.checkoutprofileDetails.hostelData);
      // setDeductionDetails(state.UsersList.checkoutprofileDetails.deduction_details)
      setTimeout(() => {
        dispatch({ type: "REMOVE_CHECKOUT_PROFILE_DETAILS" });
      }, 100);
    }
  }, [state.UsersList.StatuscodeforCheckoutProfile]);

  // const [advanceReturn, setAdvanceReturn] = useState(null);
  // const [otherDetails, setOtherDetails] = useState([]);

  useEffect(() => {
    setAdvanceList(state.UsersList.customerdetails.advanceInfo);
  }, [state.UsersList.customerdetails.advanceInfo]);

  // useEffect(() => {
  //   if (Array.isArray(deductionDetails) && deductionDetails.length > 0) {
  //     // const adv = deductionDetails.find(item => item.reason === "Advance Return");
  //     // const others = deductionDetails.filter(item => item.reason !== "Advance Return" && item.reason !== "DueAmount");

  //     // setAdvanceReturn(adv || null);
  //     setOtherDetails(others);
  //   }
  // }, [details]);

  const handleBack = () => {
    navigate(`/tenant/${state.login.selectedHostel_Id}`);
    dispatch(checkoutCustomerProfile(true));
    props.setcheckoutTableShow(true);
    props.handleCloseCheckoutProfile(false);
  };
  const handleChanges = (event, newValue) => {
    setValue(newValue);
  };

  const CustomerOverView = state?.UsersList?.customerdetails;

  useEffect(() => {
    if (CustomerOverView) {
      setAdditionalContact(CustomerOverView?.additionalContacts);
    }
  }, [CustomerOverView]);

  const {
    // canWriteModule: canWriteTenant,
    // canReadModule: canReadInvoice,
    canUpdateModule: canUpdateTenant,
    // canDeleteModule: canDeleteTenant,
  } = useHasPermission("Customers");

  const isDisabledButton =
    state.UsersList.customerdetails?.hostelInfo?.currentStatus ===
      "CANCELLED" ||
    state.UsersList.customerdetails?.customerCurrentStatus === "INACTIVE" ||
    state.UsersList.customerdetails?.customerCurrentStatus === "VACATED" ||
    state.UsersList.customerdetails?.customerCurrentStatus ===
      "SETTLEMENT_GENERATED";

  return (
    <>
      <nav className="sticky top-0 z-[1000] bg-white h-[60px] flex items-center ">
        <div className="w-full px-4 flex items-center gap-2">
          <img
            src={leftarrow}
            alt="leftarrow"
            className="w-5 h-5 cursor-pointer"
            onClick={handleBack}
          />
          <span className="text-[18px] font-semibold font-gilroy pl-2">
            Tenant Profile
          </span>
        </div>
      </nav>

      <div className="bg-white rounded-[12px] border border-gray-200  mx-4 ">
        <div className="p-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-14 h-14 rounded-full overflow-hidden bg-[#C6D1FF] flex items-center justify-center">
              {CustomerOverView?.profilePic ? (
                <img
                  src={CustomerOverView.profilePic}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              ) : (
                <span className="text-[#1E45E1] font-semibold text-lg font-gilroy">
                  {CustomerOverView?.initials || "NA"}
                </span>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-[18px] font-medium font-gilroy text-[#222] mb-0">
                  {CustomerOverView?.fullName}
                </p>
                <i
                  className="bi bi-patch-check-fill text-blue-600"
                  title="Verified"
                ></i>
              </div>

              <div className="flex items-center gap-2 mt-1">
                <span className="flex items-center gap-1 px-2 py-[3px] rounded-full text-[12px] font-gilroy bg-[#FFD1D1] text-red-600">
                  <span className="w-[6px] h-[6px] rounded-full bg-red-600"></span>
                  {CustomerOverView?.hostelInfo?.currentStatus}
                </span>
              </div>

              <div className="text-[14px] font-semibold font-gilroy text-gray-500 mt-2">
                {CustomerOverView?.hostelInfo?.currentStatus === "Write-Off" ? (
                  <>
                    Guest unreachable during final settlement. Attempted contact
                    on <br />3 occasions.
                  </>
                ) : (
                  <>
                    “Very disciplined tenant, paid on time and maintained the
                    room well.”
                  </>
                )}
              </div>
            </div>
          </div>

          {CustomerOverView?.hostelInfo?.currentStatus !== "Write-Off" && (
            <div className="flex items-center">
              <button
                disabled
                className="
              flex items-center justify-center gap-2
              h-[40px] px-4
              rounded-[10px]
              text-[14px] font-medium font-gilroy
              border border-[#1E45E1]
              bg-[#1E45E1] text-white
              disabled:opacity-50 disabled:cursor-not-allowed
            "
              >
                <img
                  src={repeat}
                  alt="repeat"
                  className="w-[18px] h-[18px] object-contain"
                />
                <span>Re Check-In</span>
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="w-full  px-4 ">
        <TabContext value={value}>
          <div className="sticky top-[60px] z-[900] bg-white">
            <Box sx={{ borderBottom: 0, borderColor: "divider" }}>
              <TabList
                orientation={isSmallScreen ? "vertical" : "horizontal"}
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
                  label="Transaction"
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
          <TabPanel value="1" className="px-0 mt-4">
            <div className="container mt-3">
              <div className="row">
                <div className="col-md-6">
                  <div
                    className="card  p-3 mb-3"
                    style={{ borderRadius: 10, border: "1px solid #DCDCDC" }}
                  >
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <p
                        style={{
                          fontSize: 16,
                          fontFamily: "Gilroy",
                          fontWeight: 400,
                        }}
                        className="mb-0"
                      >
                        Basic Details
                      </p>
                    </div>
                    <hr style={{ marginTop: "-10px" }} />

                    <div className="row">
                      <div className="col-6">
                        <p
                          style={{
                            fontSize: 12,
                            fontFamily: "Gilroy",
                            fontWeight: 400,
                            color: "#4B4B4B",
                          }}
                          className="mb-1 "
                        >
                          First Name
                        </p>
                        <p
                          style={{
                            fontSize: 14,
                            fontFamily: "Gilroy",
                            fontWeight: 600,
                          }}
                        >
                          {" "}
                          {CustomerOverView?.firstName}
                        </p>
                      </div>
                      <div className="col-6">
                        <p
                          style={{
                            fontSize: 12,
                            fontFamily: "Gilroy",
                            fontWeight: 400,
                            color: "#4B4B4B",
                          }}
                          className="mb-1"
                        >
                          Last Name
                        </p>
                        <p
                          style={{
                            fontSize: 14,
                            fontFamily: "Gilroy",
                            fontWeight: 600,
                          }}
                        >
                          {" "}
                          {CustomerOverView?.lastName}
                        </p>
                      </div>
                      <div className="col-6">
                        <p
                          style={{
                            fontSize: 12,
                            fontFamily: "Gilroy",
                            fontWeight: 400,
                            color: "#4B4B4B",
                          }}
                          className="mb-1"
                        >
                          Email
                        </p>
                        <p
                          style={{
                            fontSize: 14,
                            fontFamily: "Gilroy",
                            fontWeight: 600,
                          }}
                        >
                          <Sms
                            size="16"
                            color="#1E45E1"
                            className="me-0"
                            style={{ flexShrink: 0 }}
                          />
                          {CustomerOverView?.emailId || "N/A"}
                        </p>
                      </div>
                      <div className="col-6">
                        <p
                          style={{
                            fontSize: 12,
                            fontFamily: "Gilroy",
                            fontWeight: 400,
                            color: "#4B4B4B",
                          }}
                          className="mb-1 "
                        >
                          Mobile no.
                        </p>
                        <p
                          style={{
                            fontSize: 14,
                            fontFamily: "Gilroy",
                            fontWeight: 600,
                          }}
                        >
                          {" "}
                          <Call size="16" color="#1E45E1" className="me-0" />
                          {CustomerOverView && CustomerOverView.mobileNo
                            ? `+ ${CustomerOverView.countryCode} ${CustomerOverView.mobileNo}`
                            : ""}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className="card p-3"
                    style={{ borderRadius: 10, border: "1px solid #DCDCDC" }}
                  >
                    <div
                      className="card-header p-0 border-0"
                      style={{ background: "transparent", width: "100%" }}
                    >
                      <div
                        className="d-flex gap-5 align-items-center justify-content-around border-0"
                        style={{ width: "100%" }}
                      >
                        <div
                          className="d-flex align-items-center "
                          onClick={() => setActiveTab("kyc")}
                          style={{
                            cursor: "pointer",
                            padding: "6px 12px",
                            borderBottom:
                              activeTab === "kyc"
                                ? "2px solid #1E45E1"
                                : "2px solid transparent",
                            color: activeTab === "kyc" ? "#1E45E1" : "#555",
                            fontWeight: 600,
                            fontFamily: "Gilroy",
                          }}
                        >
                          KYC Address
                        </div>

                        <div
                          className="d-flex align-items-center "
                          onClick={() => setActiveTab("manual")}
                          style={{
                            cursor: "pointer",
                            padding: "6px 12px",
                            borderBottom:
                              activeTab === "manual"
                                ? "2px solid #1E45E1"
                                : "2px solid transparent",
                            color: activeTab === "manual" ? "#1E45E1" : "#555",
                            fontWeight: 600,
                            fontFamily: "Gilroy",
                          }}
                        >
                          Manual Address
                        </div>

                        {activeTab === "manual" && (
                          <span
                            style={{
                              cursor: !canUpdateTenant
                                ? "not-allowed"
                                : "pointer",
                              opacity: !canUpdateTenant ? 0.6 : 1,
                            }}
                          ></span>
                        )}
                      </div>
                    </div>
                    <div className="card-body">
                      {activeTab === "manual" ? (
                        <div>
                          <div className="row p-0">
                            <div className="col-sm-6 col-lg-6 d-flex flex-column align-items-start">
                              <p
                                style={{
                                  fontSize: 12,
                                  fontWeight: 500,
                                  fontFamily: "Gilroy",
                                }}
                              >
                                House No / Apartment
                              </p>
                              <div className="d-flex align-items-center gap-2">
                                <House size="18" color="#1E45E1" />
                                <span
                                  style={{
                                    fontSize: 14,
                                    fontWeight: 600,
                                    fontFamily: "Gilroy",
                                  }}
                                >
                                  {CustomerOverView.address?.houseNo}
                                </span>
                              </div>
                            </div>

                            <div className="col-sm-6 col-lg-6 d-flex flex-column align-items-start">
                              <p
                                style={{
                                  fontSize: 12,
                                  fontWeight: 500,
                                  fontFamily: "Gilroy",
                                }}
                              >
                                Street / Area
                              </p>
                              <div className="d-flex align-items-center gap-2">
                                <img
                                  src={Areaimage}
                                  alt="area"
                                  style={{ width: 16, height: 16 }}
                                />
                                <span
                                  title={CustomerOverView.address?.streetName}
                                  style={{
                                    fontSize: 14,
                                    fontWeight: 600,
                                    fontFamily: "Gilroy",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    maxWidth: "200px",
                                  }}
                                >
                                  {CustomerOverView.address?.streetName}
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
                              <div className="d-flex align-items-center gap-2">
                                <img
                                  src={Landamrkimage}
                                  alt="landmark"
                                  style={{ width: 16, height: 16 }}
                                />
                                <span
                                  style={{
                                    fontSize: 14,
                                    fontWeight: 600,
                                    fontFamily: "Gilroy",
                                  }}
                                >
                                  {CustomerOverView.address?.landmark}
                                </span>
                              </div>
                            </div>

                            <div className="col-sm-4 col-lg-6 d-flex flex-column align-items-start">
                              <p
                                style={{
                                  fontSize: 12,
                                  fontWeight: 500,
                                  fontFamily: "Gilroy",
                                }}
                              >
                                Pincode
                              </p>
                              <div className="d-flex align-items-center gap-2">
                                <img
                                  src={PincodeImage}
                                  alt="pincode"
                                  style={{ width: 16, height: 16 }}
                                />
                                <span
                                  style={{
                                    fontSize: 14,
                                    fontWeight: 600,
                                    fontFamily: "Gilroy",
                                  }}
                                >
                                  {CustomerOverView.address?.pincode}
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
                                City
                              </p>
                              <div className="d-flex align-items-center gap-2">
                                <img
                                  src={CityImage}
                                  alt="city"
                                  style={{ width: 16, height: 16 }}
                                />
                                <span
                                  style={{
                                    fontSize: 14,
                                    fontWeight: 600,
                                    fontFamily: "Gilroy",
                                  }}
                                >
                                  {CustomerOverView.address?.city}
                                </span>
                              </div>
                            </div>

                            <div className="col-sm-4 col-lg-6 d-flex flex-column align-items-start">
                              <p
                                style={{
                                  fontSize: 12,
                                  fontWeight: 500,
                                  fontFamily: "Gilroy",
                                }}
                              >
                                State
                              </p>
                              <div className="d-flex align-items-center gap-2">
                                <img
                                  src={CityImage}
                                  alt="state"
                                  style={{ width: 16, height: 16 }}
                                />
                                <span
                                  style={{
                                    fontSize: 14,
                                    fontWeight: 600,
                                    fontFamily: "Gilroy",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    maxWidth: "200px",
                                  }}
                                >
                                  {CustomerOverView.address?.state}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="row p-0">
                            <div className="col-sm-6 col-lg-6 d-flex flex-column align-items-start">
                              <p
                                style={{
                                  fontSize: 12,
                                  fontWeight: 500,
                                  fontFamily: "Gilroy",
                                }}
                              >
                                House No / Apartment
                              </p>
                              <div className="d-flex align-items-center gap-2">
                                <House size="18" color="#1E45E1" />
                                <span
                                  style={{
                                    fontSize: 14,
                                    fontWeight: 600,
                                    fontFamily: "Gilroy",
                                  }}
                                >
                                  {/* {CustomerOverView.address?.houseNo} */}
                                </span>
                              </div>
                            </div>

                            <div className="col-sm-6 col-lg-6 d-flex flex-column align-items-start">
                              <p
                                style={{
                                  fontSize: 12,
                                  fontWeight: 500,
                                  fontFamily: "Gilroy",
                                }}
                              >
                                Street / Area
                              </p>
                              <div className="d-flex align-items-center gap-2">
                                <img
                                  src={Areaimage}
                                  alt="area"
                                  style={{ width: 16, height: 16 }}
                                />
                                <span
                                  // title={CustomerOverView.address?.streetName}
                                  style={{
                                    fontSize: 14,
                                    fontWeight: 600,
                                    fontFamily: "Gilroy",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    maxWidth: "200px",
                                  }}
                                >
                                  {/* {CustomerOverView.address?.streetName} */}
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
                              <div className="d-flex align-items-center gap-2">
                                <img
                                  src={Landamrkimage}
                                  alt="landmark"
                                  style={{ width: 16, height: 16 }}
                                />
                                <span
                                  style={{
                                    fontSize: 14,
                                    fontWeight: 600,
                                    fontFamily: "Gilroy",
                                  }}
                                >
                                  {/* {CustomerOverView.address?.landmark} */}
                                </span>
                              </div>
                            </div>

                            <div className="col-sm-4 col-lg-6 d-flex flex-column align-items-start">
                              <p
                                style={{
                                  fontSize: 12,
                                  fontWeight: 500,
                                  fontFamily: "Gilroy",
                                }}
                              >
                                Pincode
                              </p>
                              <div className="d-flex align-items-center gap-2">
                                <img
                                  src={PincodeImage}
                                  alt="pincode"
                                  style={{ width: 16, height: 16 }}
                                />
                                <span
                                  style={{
                                    fontSize: 14,
                                    fontWeight: 600,
                                    fontFamily: "Gilroy",
                                  }}
                                >
                                  {/* {CustomerOverView.address?.pincode} */}
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
                                City
                              </p>
                              <div className="d-flex align-items-center gap-2">
                                <img
                                  src={CityImage}
                                  alt="city"
                                  style={{ width: 16, height: 16 }}
                                />
                                <span
                                  style={{
                                    fontSize: 14,
                                    fontWeight: 600,
                                    fontFamily: "Gilroy",
                                  }}
                                >
                                  {/* {CustomerOverView.address?.city} */}
                                </span>
                              </div>
                            </div>

                            <div className="col-sm-4 col-lg-6 d-flex flex-column align-items-start">
                              <p
                                style={{
                                  fontSize: 12,
                                  fontWeight: 500,
                                  fontFamily: "Gilroy",
                                }}
                              >
                                State
                              </p>
                              <div className="d-flex align-items-center gap-2">
                                <img
                                  src={CityImage}
                                  alt="state"
                                  style={{ width: 16, height: 16 }}
                                />
                                <span
                                  style={{
                                    fontSize: 14,
                                    fontWeight: 600,
                                    fontFamily: "Gilroy",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    maxWidth: "200px",
                                  }}
                                >
                                  {/* {CustomerOverView.address?.state} */}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-md-6 row ">
                  <div
                    className="card  mb-3"
                    style={{
                      borderRadius: 10,
                      border: "1px solid #DCDCDC",
                      paddingLeft: 10,
                      paddingRight: 20,
                      paddingTop: 2,
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <p
                        style={{
                          fontSize: 16,
                          fontFamily: "Gilroy",
                          fontWeight: 400,
                        }}
                        className="mb-0"
                      >
                        Stay details
                      </p>

                      <div
                        style={{
                          backgroundColor: "#fff",
                          borderRadius: "50%",
                          padding: "6px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                      >
                        <img
                          onClick={handleShowStayHistory}
                          src={Stayhistory}
                          className="me-2"
                          alt="Edit"
                          style={{ width: "25px", height: "25px" }}
                        />
                      </div>
                    </div>
                    <hr style={{ marginTop: "-10px" }} />
                    <div className="row">
                      <div className="col-4">
                        <p
                          style={{
                            fontSize: 12,
                            fontFamily: "Gilroy",
                            fontWeight: 400,
                            color: "#4B4B4B",
                          }}
                          className="mb-1"
                        >
                          Floor
                        </p>
                        <p
                          style={{
                            fontSize: 14,
                            fontFamily: "Gilroy",
                            fontWeight: 600,
                          }}
                        >
                          <img
                            src={Floorimage}
                            alt="Floorimage"
                            size="16"
                            color="#1E45E1"
                          />{" "}
                          {CustomerOverView.hostelInfo?.floorName &&
                          CustomerOverView.hostelInfo?.floorName !==
                            "undefined" &&
                          CustomerOverView.hostelInfo?.floorName !== 0 &&
                          CustomerOverView.hostelInfo?.floorName !== "null"
                            ? CustomerOverView.hostelInfo?.floorName
                            : "N/A"}
                        </p>
                      </div>
                      <div className="col-4">
                        <p
                          style={{
                            fontSize: 12,
                            fontFamily: "Gilroy",
                            fontWeight: 400,
                            color: "#4B4B4B",
                          }}
                          className="mb-1"
                        >
                          Room
                        </p>
                        <p
                          style={{
                            fontSize: 14,
                            fontFamily: "Gilroy",
                            fontWeight: 600,
                          }}
                        >
                          <img
                            src={RoomImage}
                            alt="Floorimage"
                            size="16"
                            color="#1E45E1"
                          />
                          {CustomerOverView?.hostelInfo?.roomName
                            ? CustomerOverView?.hostelInfo?.roomName
                            : "N/A"}
                        </p>
                      </div>
                      <div className="col-4">
                        <p
                          style={{
                            fontSize: 12,
                            fontFamily: "Gilroy",
                            fontWeight: 400,
                            color: "#4B4B4B",
                          }}
                          className="mb-1"
                        >
                          Bed
                        </p>
                        <p
                          style={{
                            fontSize: 14,
                            fontFamily: "Gilroy",
                            fontWeight: 600,
                          }}
                        >
                          <img
                            src={Group}
                            alt="Floorimage"
                            size="16"
                            color="#1E45E1"
                          />{" "}
                          {CustomerOverView?.hostelInfo?.bedName
                            ? CustomerOverView?.hostelInfo?.bedName
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4">
                        <p
                          style={{
                            fontSize: 12,
                            fontFamily: "Gilroy",
                            fontWeight: 400,
                            color: "#4B4B4B",
                          }}
                          className="mb-1"
                        >
                          Joined Date
                        </p>
                        <p
                          style={{
                            fontSize: 14,
                            fontFamily: "Gilroy",
                            fontWeight: 600,
                          }}
                        >
                          <img
                            src={LinkImage}
                            alt="Floorimage"
                            size="16"
                            color="#1E45E1"
                          />{" "}
                          {CustomerOverView.hostelInfo?.joiningDate
                            ? CustomerOverView.hostelInfo?.joiningDate
                            : "N/A"}
                        </p>
                      </div>
                      <div className="col-4">
                        <p
                          style={{
                            fontSize: 12,
                            fontFamily: "Gilroy",
                            fontWeight: 400,
                            color: "#4B4B4B",
                          }}
                          className="mb-1 "
                        >
                          Checkout Date
                        </p>
                        <p
                          style={{
                            fontSize: 14,
                            fontFamily: "Gilroy",
                            fontWeight: 600,
                          }}
                        >
                          <img
                            src={LinkImage}
                            alt="Floorimage"
                            size="16"
                            color="#1E45E1"
                          />
                          {CustomerOverView.checkoutInfo?.checkoutDate
                            ? CustomerOverView.checkoutInfo?.checkoutDate
                            : "N/A"}
                        </p>
                      </div>
                      <div className="col-4">
                        <p
                          style={{
                            fontSize: 12,
                            fontFamily: "Gilroy",
                            fontWeight: 400,
                            color: "#4B4B4B",
                          }}
                          className="mb-1 "
                        >
                          Booking Date
                        </p>
                        <p
                          style={{
                            fontSize: 14,
                            fontFamily: "Gilroy",
                            fontWeight: 600,
                          }}
                        >
                          <img
                            src={LinkImage}
                            alt="Floorimage"
                            size="16"
                            color="#1E45E1"
                          />
                          {CustomerOverView.bookingInfo?.bookingDate
                            ? CustomerOverView.bookingInfo?.bookingDate
                            : "N/A"}
                        </p>
                      </div>
                    </div>

                    <hr />

                    <p
                      style={{
                        fontSize: 18,
                        fontFamily: "Gilroy",
                        fontWeight: 400,
                      }}
                      className=""
                    >
                      Financial details
                    </p>
                    <div className="col-md-12 col-lg-12 mb-md-0">
                      <div
                        className="card border-0 p-0"
                        style={{
                          borderRadius: "10px",
                          // backgroundColor: 'rgba(247, 249, 255, 1)'
                        }}
                      >
                        <div className="card-body border-0 p-0">
                          <div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-3">
                              <div className="flex flex-col items-start">
                                <div className="text-xs font-medium font-gilroy text-[#4B4B4B]">
                                  Monthly Rent
                                </div>
                                <p className="text-sm font-semibold font-gilroy text-blue-600 pt-2">
                                  ₹
                                  {CustomerOverView.hostelInfo?.monthlyRent ??
                                    0}
                                </p>
                              </div>

                              {CustomerOverView?.isNewRentApplied && (
                                <div className="flex flex-col items-start">
                                  <div className="text-xs font-medium font-gilroy text-[#4B4B4B]">
                                    Monthly New Rent
                                  </div>
                                  <p className="text-sm font-semibold font-gilroy text-blue-600 pt-2">
                                    ₹{CustomerOverView.newRentAmount ?? 0}
                                  </p>
                                </div>
                              )}

                              <div className="flex flex-col items-start">
                                <div className="text-xs font-medium font-gilroy text-[#4B4B4B]">
                                  Advance Amount
                                </div>
                                <p className="text-sm font-semibold font-gilroy pt-2">
                                  ₹{advanceList?.advanceAmount ?? 0}
                                </p>
                              </div>

                              <div className="flex flex-col items-start">
                                <div className="text-xs font-medium font-gilroy text-[#4B4B4B]">
                                  Booking Amount
                                </div>
                                <p className="text-sm font-semibold font-gilroy text-[#222] pt-2">
                                  ₹
                                  {CustomerOverView.bookingInfo
                                    ?.bookingAmount ?? 0}
                                </p>
                              </div>

                              {CustomerOverView.hostelInfo?.maintenance !==
                                null && (
                                <div className="flex flex-col items-start">
                                  <div className="text-xs font-medium font-gilroy text-[#4B4B4B]">
                                    Maintenance
                                  </div>
                                  <p className="text-sm font-semibold font-gilroy pt-2">
                                    ₹
                                    {CustomerOverView.hostelInfo?.maintenance ??
                                      0}
                                  </p>
                                </div>
                              )}

                              {/* Other Deductions */}
                              {CustomerOverView.hostelInfo?.otherDeductionsBreakup?.map(
                                (item, index) => (
                                  <div
                                    key={index}
                                    className="flex flex-col items-start"
                                  >
                                    <div className="text-xs font-medium font-gilroy text-[#4B4B4B]">
                                      {item.type || ""}
                                    </div>
                                    <p className="text-sm font-semibold font-gilroy pt-2">
                                      ₹{item.amount ?? 0}
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
                </div>

                <div className="flex-1 bg-white relative    border border-[#E5E7EB] rounded-[20px] ms-2 mt-3">
                  <div className="sticky top-0 z-[999] bg-white flex justify-between items-center px-3 pt-3   rounded-t-[20px]">
                    <div className="flex justify-around w-full   ">
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
                        // onClick={handlePreviewKYC}
                      >
                        <DocumentUpload size="14" color="#FFF" />
                      </button>
                    )}

                  {documentvalue === "2" &&
                    CustomerOverView?.files?.otherDoc?.length > 0 && (
                      <button
                        disabled={isDisabledButton}
                        className="bg-green-600  disabled:bg-blue-700/60 disabled:cursor-not-allowed rounded-full p-2 cursor-pointer shadow hover:scale-105 transition absolute bottom-4 right-4"
                        // onClick={handlePreview}
                      >
                        <DocumentUpload size="14" color="#FFF" />
                      </button>
                    )}

                  <div className="p-3 max-h-[300px] overflow-y-auto ">
                    {documentvalue === "1" && (
                      <>
                        {CustomerOverView?.files?.kycDoc?.length > 0 ? (
                          <KYCDocuments
                            documents={CustomerOverView?.files?.kycDoc}
                          />
                        ) : (
                          <div className="text-center text-sm font-normal font-gilroy w-full flex items-center  justify-center  min-h-[200px]">
                            <div>
                              <p className="mb-1">
                                {" "}
                                No KYC Documents are there!
                              </p>

                              <button
                                // onClick={handlePreviewKYC}
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
                                // onClick={handlePreview}
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

                <div className="flex-1 bg-white border border-[#E5E7EB] rounded-[20px] p-2 h-auto me-4 ms-2">
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
                            // onClick={handleAdditionalForm}
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

                    <div className="pt-4 font-gilroy text-center max-h-[220px] overflow-y-auto show-scrolls">
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
                            // onClick={handleAdditionalForm}
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

                {/* <div
                  className="col-md-6"
                  style={{
                    paddingLeft: 20,
                    paddingRight: 20,
                    marginTop: 30,
                    marginLeft: 0
                  }}
                >
                  <div
                    className="card"
                    style={{
                      borderRadius: "20px",
                      padding: "8px", marginLeft: 0
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
                        Parent/Guardian Details
                      </div>


                    </div>

                    <div className="card-body" style={{ fontFamily: "Gilroy" }}>
                      <ParentsGuardian />
                    </div>
                  </div>
                </div> */}
              </div>

              <div className="row">
                <div
                  className="col-md-12 col-lg-12 "
                  style={{
                    marginTop: 30,
                  }}
                >
                  <div
                    className="card m-"
                    style={{
                      borderRadius: "14px",
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
                          fontFamily: "Gilroy",
                          color: "#000",
                        }}
                      >
                        Amenities provided
                      </div>

                      <div className="d-flex justify-content-start ms-3"></div>
                    </div>

                    <div className="card-body" style={{ fontFamily: "Gilroy" }}>
                      <div>
                        <UserListAmenities />
                      </div>

                      {/* <div className="mt-1">
              
                                        <RequestedAmenities />
              
              
                                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel value="2" className="px-0 mt-4">
            <UserEb id={state.UsersList?.customerdetails?.customerId} />
          </TabPanel>
          <TabPanel value="3" className="px-0 mt-16">
            <UserListInvoice />
          </TabPanel>
          <TabPanel value="4" className="px-0 mt-4">
            <TransactionHistory />
          </TabPanel>
        </TabContext>
      </div>

      {stayDetailsShow && (
        <StayHistory
          show={stayDetailsShow}
          handleClose={handleCloseStayHistory}
        />
      )}
    </>
  );
}
CustomerProfile.propTypes = {
  setcheckoutTableShow: PropTypes.func.isRequired,
  handleCloseCheckoutProfile: PropTypes.func.isRequired,
  CheckoutProfile: PropTypes.func.isRequired,
  checkoutWithoutPay: PropTypes.func.isRequired,
};
export default CustomerProfile;

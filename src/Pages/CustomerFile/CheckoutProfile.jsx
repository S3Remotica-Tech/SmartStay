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
import { ArrowUp } from "iconsax-react";
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
    navigate(`/tenant/${state.login.selectedHostel_Id}`, {
      state: {
        isCheckoutWay: true,
      },
    });
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
      <div className="w-full">
        <div className="sticky top-[60px] z-[900] bg-white">
          <div className="my-2">
            <div
              role="tablist"
              aria-label="lab API tabs example"
              className={`ml-5 flex  gap-10 ${
                isSmallScreen ? "flex-col" : "flex-col sm:flex-col lg:flex-row"
              }`}
            >
              <button
                onClick={(e) => handleChanges(e, "1")}
                className={`text-[16px] font-[Gilroy] leading-normal font-medium normal-case  py-2 text-left border-b-4  transition-all duration-200 ${
                  value === "1"
                    ? "text-[#222222] border-[#1E45E1]"
                    : "text-[#4B4B4B] border-transparent"
                }`}
              >
                Overview
              </button>

              <button
                onClick={(e) => handleChanges(e, "2")}
                className={`text-[16px] font-[Gilroy] leading-normal font-medium normal-case  py-2 text-left border-b-4 transition-all duration-200 ${
                  value === "2"
                    ? "text-[#222222] border-[#1E45E1]"
                    : "text-[#4B4B4B] border-transparent"
                }`}
              >
                EB Reading
              </button>

              <button
                onClick={(e) => handleChanges(e, "3")}
                className={`text-[16px] font-[Gilroy] leading-normal font-medium normal-case  py-2 text-left border-b-4 transition-all duration-200 ${
                  value === "3"
                    ? "text-[#222222] border-[#1E45E1]"
                    : "text-[#4B4B4B] border-transparent"
                }`}
              >
                Bill
              </button>

              <button
                onClick={(e) => handleChanges(e, "4")}
                className={`text-[16px] font-[Gilroy] leading-normal font-medium normal-case  py-2 text-left border-b-4 transition-all duration-200 ${
                  value === "4"
                    ? "text-[#222222] border-[#1E45E1]"
                    : "text-[#4B4B4B] border-transparent"
                }`}
              >
                Transaction
              </button>
            </div>
          </div>
        </div>
        {value === "1" && (
          <div className="px-0 mt-4">
            <div className="container  mt-3 ">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-[10px] border border-[#DCDCDC] p-4 bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-[16px] font-[Gilroy] font-normal mb-0">
                        Basic Details
                      </p>
                    </div>
                    <hr className="-mt-[10px]" />

                    <div className="grid grid-cols-2 gap-y-4 pt-3">
                      <div>
                        <p className="text-[12px] font-[Gilroy] font-normal text-[#4B4B4B] mb-1">
                          First Name
                        </p>
                        <p className="text-[14px] font-[Gilroy] font-semibold">
                          {" "}
                          {CustomerOverView?.firstName}
                        </p>
                      </div>
                      <div>
                        <p className="text-[12px] font-[Gilroy] font-normal text-[#4B4B4B] mb-1">
                          Last Name
                        </p>
                        <p className="text-[14px] font-[Gilroy] font-semibold">
                          {" "}
                          {CustomerOverView?.lastName}
                        </p>
                      </div>
                      <div>
                        <p className="text-[12px] font-[Gilroy] font-normal text-[#4B4B4B] mb-1">
                          Email
                        </p>

                        <p className="text-[14px] font-[Gilroy] font-semibold flex items-center gap-1">
                          <Sms size="16" color="#1E45E1" />
                          {CustomerOverView?.emailId || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-[12px] font-[Gilroy] font-normal text-[#4B4B4B] mb-1">
                          Mobile no.
                        </p>

                        <p className="text-[14px] font-[Gilroy] font-semibold flex items-center gap-1">
                          <Call size="16" color="#1E45E1" />

                          {CustomerOverView?.mobileNo
                            ? `+ ${CustomerOverView.countryCode} ${CustomerOverView.mobileNo}`
                            : ""}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border border-[#DCDCDC] rounded-[10px] p-3">
                    <div className="w-full bg-transparent">
                      <div className="flex items-center justify-around gap-5 w-full">
                        <div
                          onClick={() => setActiveTab("kyc")}
                          className={`flex items-center cursor-pointer px-3 py-[6px] border-b-2 font-[Gilroy] font-semibold transition-all duration-200 ${
                            activeTab === "kyc"
                              ? "border-[#1E45E1] text-[#1E45E1]"
                              : "border-transparent text-[#555]"
                          }`}
                        >
                          KYC Address
                        </div>

                        <div
                          onClick={() => setActiveTab("manual")}
                          className={`flex items-center cursor-pointer px-3 py-[6px] border-b-2 font-[Gilroy] font-semibold transition-all duration-200 ${
                            activeTab === "manual"
                              ? "border-[#1E45E1] text-[#1E45E1]"
                              : "border-transparent text-[#555]"
                          }`}
                        >
                          Manual Address
                        </div>

                        {activeTab === "manual" && (
                          <span
                            className={`${
                              !canUpdateTenant
                                ? "cursor-not-allowed opacity-60"
                                : "cursor-pointer opacity-100"
                            }`}
                          ></span>
                        )}
                      </div>
                    </div>

                    <div className="mt-4">
                      {activeTab === "manual" ? (
                        <div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col items-start">
                              <p className="text-[12px] font-medium font-[Gilroy]">
                                House No / Apartment
                              </p>

                              <div className="flex items-center gap-2">
                                <House size={18} color="#1E45E1" />

                                <span className="text-[14px] font-semibold font-[Gilroy]">
                                  {CustomerOverView.address?.houseNo}
                                </span>
                              </div>
                            </div>

                            <div className="flex flex-col items-start">
                              <p className="text-[12px] font-medium font-[Gilroy]">
                                Street / Area
                              </p>

                              <div className="flex items-center gap-2">
                                <img
                                  src={Areaimage}
                                  alt="area"
                                  className="w-4 h-4"
                                />

                                <span
                                  title={CustomerOverView.address?.streetName}
                                  className="text-[14px] font-semibold font-[Gilroy] whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]"
                                >
                                  {CustomerOverView.address?.streetName}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                            <div className="flex flex-col items-start">
                              <p className="text-[12px] font-medium font-[Gilroy]">
                                Landmark
                              </p>

                              <div className="flex items-center gap-2">
                                <img
                                  src={Landamrkimage}
                                  alt="landmark"
                                  className="w-4 h-4"
                                />

                                <span className="text-[14px] font-semibold font-[Gilroy]">
                                  {CustomerOverView.address?.landmark}
                                </span>
                              </div>
                            </div>

                            <div className="flex flex-col items-start">
                              <p className="text-[12px] font-medium font-[Gilroy]">
                                Pincode
                              </p>

                              <div className="flex items-center gap-2">
                                <img
                                  src={PincodeImage}
                                  alt="pincode"
                                  className="w-4 h-4"
                                />

                                <span className="text-[14px] font-semibold font-[Gilroy]">
                                  {CustomerOverView.address?.pincode}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                            <div className="flex flex-col items-start">
                              <p className="text-[12px] font-medium font-[Gilroy]">
                                City
                              </p>

                              <div className="flex items-center gap-2">
                                <img
                                  src={CityImage}
                                  alt="city"
                                  className="w-4 h-4"
                                />

                                <span className="text-[14px] font-semibold font-[Gilroy]">
                                  {CustomerOverView.address?.city}
                                </span>
                              </div>
                            </div>

                            <div className="flex flex-col items-start">
                              <p className="text-[12px] font-medium font-[Gilroy]">
                                State
                              </p>

                              <div className="flex items-center gap-2">
                                <img
                                  src={CityImage}
                                  alt="state"
                                  className="w-4 h-4"
                                />

                                <span className="text-[14px] font-semibold font-[Gilroy] whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
                                  {CustomerOverView.address?.state}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col items-start">
                              <p className="text-[12px] font-medium font-[Gilroy]">
                                House No / Apartment
                              </p>

                              <div className="flex items-center gap-2">
                                <House size={18} color="#1E45E1" />

                                <span className="text-[14px] font-semibold font-[Gilroy]">
                                  {/* {CustomerOverView.address?.houseNo} */}
                                </span>
                              </div>
                            </div>

                            <div className="flex flex-col items-start">
                              <p className="text-[12px] font-medium font-[Gilroy]">
                                Street / Area
                              </p>

                              <div className="flex items-center gap-2">
                                <img
                                  src={Areaimage}
                                  alt="area"
                                  className="w-4 h-4"
                                />

                                <span className="text-[14px] font-semibold font-[Gilroy] whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
                                  {/* {CustomerOverView.address?.streetName} */}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Row 2 */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                            <div className="flex flex-col items-start">
                              <p className="text-[12px] font-medium font-[Gilroy]">
                                Landmark
                              </p>

                              <div className="flex items-center gap-2">
                                <img
                                  src={Landamrkimage}
                                  alt="landmark"
                                  className="w-4 h-4"
                                />

                                <span className="text-[14px] font-semibold font-[Gilroy]">
                                  {/* {CustomerOverView.address?.landmark} */}
                                </span>
                              </div>
                            </div>

                            <div className="flex flex-col items-start">
                              <p className="text-[12px] font-medium font-[Gilroy]">
                                Pincode
                              </p>

                              <div className="flex items-center gap-2">
                                <img
                                  src={PincodeImage}
                                  alt="pincode"
                                  className="w-4 h-4"
                                />

                                <span className="text-[14px] font-semibold font-[Gilroy]">
                                  {/* {CustomerOverView.address?.pincode} */}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                            <div className="flex flex-col items-start">
                              <p className="text-[12px] font-medium font-[Gilroy]">
                                City
                              </p>

                              <div className="flex items-center gap-2">
                                <img
                                  src={CityImage}
                                  alt="city"
                                  className="w-4 h-4"
                                />

                                <span className="text-[14px] font-semibold font-[Gilroy]">
                                  {/* {CustomerOverView.address?.city} */}
                                </span>
                              </div>
                            </div>

                            <div className="flex flex-col items-start">
                              <p className="text-[12px] font-medium font-[Gilroy]">
                                State
                              </p>

                              <div className="flex items-center gap-2">
                                <img
                                  src={CityImage}
                                  alt="state"
                                  className="w-4 h-4"
                                />

                                <span className="text-[14px] font-semibold font-[Gilroy] whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
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

                <div className="">
                  <div className="border border-[#DCDCDC] rounded-[10px] px-[10px] pr-5 pt-[2px]  bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <p className="mb-0 text-[16px] font-[Gilroy] font-normal">
                        Stay details
                      </p>

                      <div
                        className="bg-white rounded-full p-[6px] flex items-center justify-center cursor-pointer"
                        onClick={handleShowStayHistory}
                      >
                        <img
                          src={Stayhistory}
                          alt="Edit"
                          className="w-[25px] h-[25px]"
                        />
                      </div>
                    </div>

                    <hr className="-mt-[10px]" />

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <p className="mb-1 text-[12px] font-[Gilroy] font-normal text-[#4B4B4B]">
                          Floor
                        </p>

                        <p className="text-[14px] font-[Gilroy] font-semibold flex items-center gap-1">
                          <img
                            src={Floorimage}
                            alt="Floorimage"
                            className="w-4 h-4"
                          />

                          {CustomerOverView.hostelInfo?.floorName &&
                          CustomerOverView.hostelInfo?.floorName !==
                            "undefined" &&
                          CustomerOverView.hostelInfo?.floorName !== 0 &&
                          CustomerOverView.hostelInfo?.floorName !== "null"
                            ? CustomerOverView.hostelInfo?.floorName
                            : "N/A"}
                        </p>
                      </div>

                      <div>
                        <p className="mb-1 text-[12px] font-[Gilroy] font-normal text-[#4B4B4B]">
                          Room
                        </p>

                        <p className="text-[14px] font-[Gilroy] font-semibold flex items-center gap-1">
                          <img
                            src={RoomImage}
                            alt="Roomimage"
                            className="w-4 h-4"
                          />

                          {CustomerOverView?.hostelInfo?.roomName || "N/A"}
                        </p>
                      </div>

                      <div>
                        <p className="mb-1 text-[12px] font-[Gilroy] font-normal text-[#4B4B4B]">
                          Bed
                        </p>

                        <p className="text-[14px] font-[Gilroy] font-semibold flex items-center gap-1">
                          <img src={Group} alt="Bedimage" className="w-4 h-4" />

                          {CustomerOverView?.hostelInfo?.bedName || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                      <div>
                        <p className="mb-1 text-[12px] font-[Gilroy] font-normal text-[#4B4B4B]">
                          Joined Date
                        </p>

                        <p className="text-[14px] font-[Gilroy] font-semibold flex items-center gap-1">
                          <img
                            src={LinkImage}
                            alt="Joineddate"
                            className="w-4 h-4"
                          />

                          {CustomerOverView.hostelInfo?.joiningDate || "N/A"}
                        </p>
                      </div>

                      <div>
                        <p className="mb-1 text-[12px] font-[Gilroy] font-normal text-[#4B4B4B]">
                          Checkout Date
                        </p>

                        <p className="text-[14px] font-[Gilroy] font-semibold flex items-center gap-1">
                          <img
                            src={LinkImage}
                            alt="Checkoutdate"
                            className="w-4 h-4"
                          />

                          {CustomerOverView.checkoutInfo?.checkoutDate || "N/A"}
                        </p>
                      </div>

                      <div>
                        <p className="mb-1 text-[12px] font-[Gilroy] font-normal text-[#4B4B4B]">
                          Booking Date
                        </p>

                        <p className="text-[14px] font-[Gilroy] font-semibold flex items-center gap-1">
                          <img
                            src={LinkImage}
                            alt="Bookingdate"
                            className="w-4 h-4"
                          />

                          {CustomerOverView.bookingInfo?.bookingDate || "N/A"}
                        </p>
                      </div>
                    </div>

                    <hr className="my-4" />

                    <p className="text-[18px] font-[Gilroy] font-normal mb-4">
                      Financial details
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                      <div className="flex flex-col items-start">
                        <div className="text-xs font-medium font-[Gilroy] text-[#4B4B4B]">
                          Monthly Rent
                        </div>

                        <p className="pt-2 text-sm font-semibold font-[Gilroy] text-blue-600">
                          ₹{CustomerOverView.hostelInfo?.monthlyRent ?? 0}
                        </p>
                      </div>

                      {CustomerOverView?.isNewRentApplied && (
                        <div className="bg-[#FFF8EB] rounded-xl px-3 py-2 flex flex-col items-start w-full min-w-0">
                          <p className="mb-1 text-xs text-[#4B4B4B] font-medium font-[Gilroy] whitespace-nowrap">
                            New Monthly Rent
                          </p>

                          <p className="mt-1 mb-0 text-sm font-semibold text-black font-[Gilroy]">
                            ₹ {CustomerOverView?.newRentAmount ?? 0}
                          </p>

                          <div className="flex items-start gap-1 mt-2 text-[12px] text-[#C27B0D] font-medium font-[Gilroy] w-full min-w-0">
                            <ArrowUp size={14} className="shrink-0 mt-[2px]" />

                            <span className="font-semibold break-words min-w-0">
                              {CustomerOverView?.newRentLabel || ""}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="flex flex-col items-start">
                        <div className="text-xs font-medium font-[Gilroy] text-[#4B4B4B]">
                          Advance Amount
                        </div>

                        <p className="pt-2 text-sm font-semibold font-[Gilroy]">
                          ₹{advanceList?.advanceAmount ?? 0}
                        </p>
                      </div>

                      <div className="flex flex-col items-start">
                        <div className="text-xs font-medium font-[Gilroy] text-[#4B4B4B]">
                          Booking Amount
                        </div>

                        <p className="pt-2 text-sm font-semibold font-[Gilroy] text-[#222]">
                          ₹{CustomerOverView.bookingInfo?.bookingAmount ?? 0}
                        </p>
                      </div>

                      {CustomerOverView.hostelInfo?.maintenance !== null && (
                        <div className="flex flex-col items-start">
                          <div className="text-xs font-medium font-[Gilroy] text-[#4B4B4B]">
                            Maintenance
                          </div>

                          <p className="pt-2 text-sm font-semibold font-[Gilroy]">
                            ₹{CustomerOverView.hostelInfo?.maintenance ?? 0}
                          </p>
                        </div>
                      )}

                      {CustomerOverView.hostelInfo?.otherDeductionsBreakup?.map(
                        (item, index) => (
                          <div
                            key={index}
                            className="flex flex-col items-start"
                          >
                            <div className="text-xs font-medium font-[Gilroy] text-[#4B4B4B]">
                              {item.type || ""}
                            </div>

                            <p className="pt-2 text-sm font-semibold font-[Gilroy]">
                              ₹{item.amount ?? 0}
                            </p>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>

                <div className=" bg-white relative    border border-[#E5E7EB] rounded-[10px] ">
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

                <div className=" bg-white border border-[#E5E7EB] rounded-[10px] p-2 h-auto mt-[-80px] ">
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
              </div>

              <div className="grid grid-cols-1 mt-[30px]">
                <div className="w-full">
                  <div className="rounded-[14px] border border-[#E5E7EB] bg-white">
                    <div className="flex items-center justify-between border-b border-[#e0e0e0] bg-transparent px-4 py-3">
                      <div className="font-semibold text-[16px] leading-[40px] text-black font-[Gilroy]">
                        Amenities provided
                      </div>

                      <div className="flex justify-start ml-3"></div>
                    </div>

                    <div className="p-4 font-[Gilroy]">
                      <div>
                        <UserListAmenities />
                      </div>

                      {/* 
        <div className="mt-1">
          <RequestedAmenities />
        </div> 
        */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {value === "2" && (
          <div className="px-0 mt-4">
            <UserEb id={state.UsersList?.customerdetails?.customerId} />
          </div>
        )}
        {value === "3" && (
          <div className="px-0 mt-16">
            <UserListInvoice />
          </div>
        )}
        {value === "4" && (
          <div className="px-0 mt-4">
            <TransactionHistory />
          </div>
        )}
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

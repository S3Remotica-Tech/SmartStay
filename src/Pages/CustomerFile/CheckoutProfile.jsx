
/* eslint-disable react-hooks/exhaustive-deps */import React, { useEffect, useState } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { checkoutCustomerProfile } from "../../Redux/Action/smartStayAction";
import { Call, Sms, House } from "iconsax-react";
import Areaimage from "../../Assets/Images/area_icon.png";
import PincodeImage from "../../Assets/Images/pin.png";
import CityImage from "../../Assets/Images/buildings.png";
import Landamrkimage from "../../Assets/Images/landmark.png";
import Floorimage from "../../Assets/Images/floor_icon.png";
import RoomImage from "../../Assets/Images/room_icon.png";
import LinkImage from "../../Assets/Images/home-link.png";
import Group from "../../Assets/Images/Group.png";
import MoneyImage from "../../Assets/Images/Money.png";
import Stayhistory from "../../Assets/Images/stay_history.png";
import viewdoc from "../../Assets/Images/New_images/viewdoc.png";
import StayHistory from "./StayHistory";
import PropTypes from "prop-types";
import leftarrow from "../../Assets/Images/arrow-left.png";
import Profiles from "../../Assets/Images/New_images/profile-picture.png";
import repeat from "../../Assets/Images/repeate-one.png";
import { useNavigate, useLocation } from "react-router-dom";
import UserEb from "./UserListEb";
import UserListInvoice from "./UserListInvoice";
import UserListAmenities from "./UserListAmenities";
import TransactionHistory from "./TransactionHistory";
import RequestedAmenities from "./RequestedAmenities";
function CustomerProfile(props) {
  const state = useSelector((state) => state);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [details, setDetails] = useState("")
  const [deductionDetails, setDeductionDetails] = useState("")
  const [value, setValue] = useState("1");
  const [show, setShow] = useState(false);
  const [showDoc2, setShowDoc2] = useState(false)
  const [stayDetailsShow, setStayDetailsShow] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewUrl2, setPreviewUrl2] = useState(null)
  const [advanceList, setAdvanceList] = useState("")

  const handleShowStayHistory = () => {
    setStayDetailsShow(true)
  }
  const handleCloseStayHistory = () => {
    setStayDetailsShow(false)
  }



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

      setPreviewUrl(url);
      setShow(true);
    } else if (lowerUrl.endsWith(".xlsx") || lowerUrl.endsWith(".xls")) {
      const viewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`;
      window.open(viewerUrl, "_blank");
    } else {
      window.open(url, "_blank");
    }
  };

  const handleFileOpen2 = (url) => {
    if (!url) return;

    const lowerUrl = url.toLowerCase();

    if (
      lowerUrl.endsWith(".pdf") ||
      lowerUrl.endsWith(".jpg") ||
      lowerUrl.endsWith(".jpeg") ||
      lowerUrl.endsWith(".png")
    ) {

      setPreviewUrl2(url);
      setShowDoc2(true);
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
    return parts.slice(2).join("_"); // remove prefix (RADH809_12345_)
  };



  useEffect(() => {
    if (state.UsersList.StatuscodeforCheckoutProfile) {
      setDetails(state.UsersList.checkoutprofileDetails.hostelData)
      setDeductionDetails(state.UsersList.checkoutprofileDetails.deduction_details)
      setTimeout(() => {
        dispatch({ type: "REMOVE_CHECKOUT_PROFILE_DETAILS" });

      }, 100)

    }

  }, [state.UsersList.StatuscodeforCheckoutProfile])


  const [advanceReturn, setAdvanceReturn] = useState(null);
  const [otherDetails, setOtherDetails] = useState([]);


  
    useEffect(() => {
      setAdvanceList(state.UsersList.customerdetails.advanceInfo);
    }, [state.UsersList.customerdetails.advanceInfo]);

  useEffect(() => {
    if (Array.isArray(deductionDetails) && deductionDetails.length > 0) {
      const adv = deductionDetails.find(item => item.reason === "Advance Return");
      const others = deductionDetails.filter(item => item.reason !== "Advance Return" && item.reason !== "DueAmount");

      setAdvanceReturn(adv || null);
      setOtherDetails(others);
    }
  }, [details]);


  const handleBack = () => {
    navigate(`/tenant/${state.login.selectedHostel_Id}`)
    dispatch(checkoutCustomerProfile(true))
    props.setcheckoutTableShow(true)
    props.handleCloseCheckoutProfile(false)


  }
  const handleChanges = (event, newValue) => {
    setValue(newValue);

  };




  const CustomerOverView = state.UsersList.customerdetails;







  return (
    <>

      <nav className="navbar navbar-expand-lg bg-white  sticky-top mt-2">
        <div className="container-fluid px-3">
          <div className="d-flex align-items-center gap-2">
            <img
              src={leftarrow}
              alt="leftarrow"
              width={20}
              height={20}
              onClick={handleBack}
              style={{ cursor: "pointer" }}
            />
            <span className="fw-medium" style={{
              fontWeight: 600,
              fontSize: "18px",
              fontFamily: "Gilroy",
              paddingLeft: "10px",
            }}>Tenant Profile</span>
          </div>

        </div>
      </nav>


      <div className="container my-4">
        <div style={{ paddingLeft: 15, paddingRight: 15 }}>
          <div className="card " style={{ borderRadius: 10 }}>
            <div className="card-body">
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">

                <div className="d-flex align-items-center gap-3">
                  <img src={Profiles} className="rounded-circle" width="56" height="56" alt="Avatar" />
                  <div>
                    <div className="d-flex align-items-center gap-2 flex-wrap">
                      <p style={{ fontFamily: "Gilroy", fontSize: 18, fontWeight: 500 }} className="mb-0">{CustomerOverView?.fullName}</p>
                      <i className="bi bi-patch-check-fill text-primary" title="Verified"></i>
                    </div>
                    <div className="d-flex align-items-center gap-2 mt-1" >
                      <span
                        style={{
                          backgroundColor: "#FFD1D1",
                          padding: "3px 8px",
                          color: "red",
                          borderRadius: 15,
                          fontFamily: "Gilroy",
                          fontSize: 12,
                          fontWeight: 400,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 5,
                        }}
                      >
                        <span
                          style={{
                            display: "inline-block",
                            height: 6,
                            width: 6,
                            borderRadius: "50%",
                            backgroundColor: "#ff0000",
                          }}
                        ></span>
                        {CustomerOverView?.hostelInfo?.currentStatus}
                      </span>

                      {CustomerOverView?.hostelInfo?.currentStatus === "Write-Off" && (
                        <div className="d-flex align-items-center gap-2">
                          <button className="btn btn-primary " style={{ borderRadius: 30, fontSize: 14, fontFamily: "Gilroy", fontWeight: 400 }}><img src={repeat} alt="repeat" /> Record Payment</button>
                        </div>
                      )}
                    </div>
                    <div
                      className="text-secondary small mt-2"
                      style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 600 }}
                    >
                      {CustomerOverView?.hostelInfo?.currentStatus === "Write-Off" ? (
                        <>
                          Guest unreachable during final settlement.Attempted contact on <br />
                          3 occasions.
                        </>
                      ) : (
                        <>“Very disciplined tenant, paid on time and maintained the room well.”</>
                      )}
                    </div>

                  </div>
                </div>


                <div className="d-flex align-items-center gap-2">
                  {CustomerOverView?.hostelInfo?.currentStatus !== "Write-Off" && (
                    <button
                      style={{
                        backgroundColor: "#1E45E1",
                        color: "#fff",
                        fontWeight: 500,
                        height: 40,
                        borderRadius: 10,
                        fontSize: 16,
                        fontFamily: "Gilroy",
                        border: "1px solid #1E45E1",
                        padding: "0 14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        cursor: "pointer",
                      }}
                    >
                      <img
                        src={repeat}
                        alt="repeat"
                        style={{ width: 18, height: 18, objectFit: "contain" }}
                      />
                      <span>Re Check-In</span>
                    </button>
                  )}
                </div>



                {props.checkoutWithoutPay?.status === "Write-Off" && (
                  <div className="col-md-3 col-sm-6 mb-3">
                    <div
                      className="p-3 rounded d-flex justify-content-between align-items-center"
                      style={{
                        backgroundColor: "#fffaf5",
                        border: "1px solid #f0e0d6",
                      }}
                    >

                      <div className="d-flex align-items-center">
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
                          alt="PDF"
                          style={{ width: "24px", height: "24px", marginRight: "10px" }}
                        />
                        <div>
                          <div style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                            {cleanFileName(details.doc1) || "Untitled Document"}
                          </div>
                          <small style={{ fontSize: "0.75rem", color: "#6c757d" }}>
                            160 KB • PDF
                          </small>
                        </div>
                      </div>


                      <div className="d-flex align-items-center gap-3">
                        <img
                          src={viewdoc}
                          alt="View Document"
                          onClick={() => handleFileOpen(details?.doc1)}
                          style={{ width: 20, height: 20, cursor: "pointer" }}
                        />
                        <i
                          className="bi bi-download"
                          style={{ cursor: "pointer", fontSize: "1.2rem" }}
                          onClick={() => window.open(details?.doc1, "_blank")}
                        ></i>
                      </div>
                    </div>
                  </div>

                )}

              </div>




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
          <TabPanel value="1" className="px-0 mt-2">

            <div className="container mt-3">
              <div className="row">

                <div className="col-md-6">

                  <div className="card  p-3 mb-3" style={{ borderRadius: 10, border: "1px solid #DCDCDC" }}>

                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <p style={{ fontSize: 16, fontFamily: "Gilroy", fontWeight: 400 }} className="mb-0">
                        Basic Details
                      </p>

                    </div>
                    <hr style={{ marginTop: "-10px" }} />


                    <div className="row">
                      <div className="col-6">
                        <p style={{ fontSize: 12, fontFamily: "Gilroy", fontWeight: 400, color: "#4B4B4B" }} className="mb-1 ">First Name</p>
                        <p style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 600 }}>  {CustomerOverView?.firstName}</p>
                      </div>
                      <div className="col-6">
                        <p style={{ fontSize: 12, fontFamily: "Gilroy", fontWeight: 400, color: "#4B4B4B" }} className="mb-1">Last Name</p>
                        <p style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 600 }}> {CustomerOverView?.lastName}</p>
                      </div>
                      <div className="col-6">
                        <p style={{ fontSize: 12, fontFamily: "Gilroy", fontWeight: 400, color: "#4B4B4B" }} className="mb-1">Email</p>
                        <p style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 600 }}><Sms size="16" color="#1E45E1" className="me-0" style={{ flexShrink: 0 }} />{CustomerOverView?.emailId || "N/A"}</p>
                      </div>
                      <div className="col-6">
                        <p style={{ fontSize: 12, fontFamily: "Gilroy", fontWeight: 400, color: "#4B4B4B" }} className="mb-1 ">Mobile no.</p>
                        <p style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 600 }}> <Call size="16" color="#1E45E1" className="me-0" />{CustomerOverView && CustomerOverView.mobileNo ? `+ ${CustomerOverView.countryCode} ${CustomerOverView.mobileNo}` : ''}</p>
                      </div>
                    </div>
                  </div>


                  <div className="card p-3" style={{ borderRadius: 10, border: "1px solid #DCDCDC" }}>

                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <p style={{ fontSize: 16, fontFamily: "Gilroy", fontWeight: 400 }} className="mb-0">
                        Address Details
                      </p>

                    </div>
                    <hr style={{ marginTop: "-10px" }} />
                    <div className="row">
                      <div className="col-6">
                        <p style={{ fontSize: 12, fontFamily: "Gilroy", fontWeight: 400, color: "#4B4B4B" }} className="mb-1">House No / Apartment</p>
                        <p style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 600 }}>  <House
                          size="18"
                          color="#1E45E1"
                          className="me-2"
                          style={{ marginBottom: "2px" }}
                        />  {CustomerOverView.address?.houseNo}</p>
                      </div>
                      <div className="col-6">
                        <p style={{ fontSize: 12, fontFamily: "Gilroy", fontWeight: 400, color: "#4B4B4B" }} className="mb-1">Street / Area</p>
                        <div className="d-flex align-items-center gap-2">
                          <img src={Areaimage} alt="area" style={{ width: 16, height: 16 }} />
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
                      <div className="col-6">
                        <p style={{ fontSize: 12, fontFamily: "Gilroy", fontWeight: 400, color: "#4B4B4B" }} className="mb-1">Landmark</p>
                        <div className="d-flex align-items-center gap-2">
                          <img src={Landamrkimage} alt="landmark" style={{ width: 16, height: 16 }} />
                          <span style={{ fontSize: 14, fontWeight: 600, fontFamily: "Gilroy" }}>
                            {CustomerOverView.address?.landmark}
                          </span>
                        </div>
                      </div>
                      <div className="col-6">
                        <p className="mb-1 " style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 400, color: "#4B4B4B" }}>Pincode</p>
                        <div className="d-flex align-items-center gap-2">
                          <img src={PincodeImage} alt="pincode" style={{ width: 16, height: 16 }} />
                          <span style={{ fontSize: 14, fontWeight: 600, fontFamily: "Gilroy" }}>
                            {CustomerOverView.address?.pincode}
                          </span>
                        </div>
                      </div>
                      <div className="col-6">
                        <p style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 400, color: "#4B4B4B" }} className="mb-1">City</p>
                        <div className="d-flex align-items-center gap-2">
                          <img src={CityImage} alt="city" style={{ width: 16, height: 16 }} />
                          <span style={{ fontSize: 14, fontWeight: 600, fontFamily: "Gilroy" }}>
                            {CustomerOverView.address?.city}
                          </span>
                        </div>
                      </div>
                      <div className="col-6">
                        <p style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 400, color: "#4B4B4B" }} className="mb-1">State</p>
                        <div className="d-flex align-items-center gap-2">
                          <img src={CityImage} alt="state" style={{ width: 16, height: 16 }} />
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

                </div>



                <div className="col-md-6 row " >



                  <div className="card  mb-3" style={{ borderRadius: 10, border: "1px solid #DCDCDC", paddingLeft: 10, paddingRight: 20, paddingTop: 2 }}>

                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <p style={{ fontSize: 16, fontFamily: "Gilroy", fontWeight: 400 }} className="mb-0">
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
                          cursor: "pointer" 
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
                        <p style={{ fontSize: 12, fontFamily: "Gilroy", fontWeight: 400, color: "#4B4B4B" }} className="mb-1">Floor</p>
                        <p style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 600 }}>
                          <img src={Floorimage} alt="Floorimage" size="16" color="#1E45E1" /> {" "}
                          {CustomerOverView.hostelInfo?.floorName &&
                            CustomerOverView.hostelInfo?.floorName !== "undefined" &&
                            CustomerOverView.hostelInfo?.floorName !== 0 &&
                            CustomerOverView.hostelInfo?.floorName !== "null"
                            ? CustomerOverView.hostelInfo?.floorName
                            : "N/A"}</p>
                      </div>
                      <div className="col-4">
                        <p style={{ fontSize: 12, fontFamily: "Gilroy", fontWeight: 400, color: "#4B4B4B" }} className="mb-1">Room</p>
                        <p style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 600 }}>
                          <img src={RoomImage} alt="Floorimage" size="16" color="#1E45E1" />
                          {CustomerOverView?.hostelInfo?.roomName ? CustomerOverView?.hostelInfo?.roomName : "N/A"}
                        </p>
                      </div>
                      <div className="col-4">
                        <p style={{ fontSize: 12, fontFamily: "Gilroy", fontWeight: 400, color: "#4B4B4B" }} className="mb-1">Bed</p>
                        <p style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 600 }}><img src={Group} alt="Floorimage" size="16" color="#1E45E1" />   {CustomerOverView?.hostelInfo?.bedName ? CustomerOverView?.hostelInfo?.bedName : "N/A"}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4">
                        <p style={{ fontSize: 12, fontFamily: "Gilroy", fontWeight: 400, color: "#4B4B4B" }} className="mb-1">Joined Date</p>
                        <p style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 600 }}><img src={LinkImage} alt="Floorimage" size="16" color="#1E45E1" />  {CustomerOverView.hostelInfo?.joiningDate
                          ? CustomerOverView.hostelInfo?.joiningDate
                          : "N/A"}</p>
                      </div>
                      <div className="col-4">
                        <p style={{ fontSize: 12, fontFamily: "Gilroy", fontWeight: 400, color: "#4B4B4B" }} className="mb-1 ">Checkout Date</p>
                        <p style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 600 }}><img src={LinkImage} alt="Floorimage" size="16" color="#1E45E1" />
                          {CustomerOverView.checkoutInfo?.checkoutDate
                            ? CustomerOverView.checkoutInfo?.checkoutDate
                            : "N/A"}
                        </p>
                      </div>
                      <div className="col-4">
                        <p style={{ fontSize: 12, fontFamily: "Gilroy", fontWeight: 400, color: "#4B4B4B" }} className="mb-1 ">Booking Date</p>
                        <p style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 600 }}><img src={LinkImage} alt="Floorimage" size="16" color="#1E45E1" />
                          {CustomerOverView.bookingInfo?.bookingDate
                            ? CustomerOverView.bookingInfo?.bookingDate
                            : "N/A"}</p>
                      </div>
                    </div>


                    <hr />

                    <p style={{ fontSize: 18, fontFamily: "Gilroy", fontWeight: 400 }} className="">Financial details</p>
                    <div
                                                className="col-md-12 col-lg-12 mb-md-0"
                  
                                              >
                                                <div
                                                  className="card border-0 p-0"
                                                  style={{
                                                    borderRadius: "10px",
                                                    // backgroundColor: 'rgba(247, 249, 255, 1)'
                  
                                                  }}
                                                >
                  
                  
                                                  <div className="card-body border-0 p-0">
                  
                                                    <div>
                                                      <div className="row mb-3">
                                                        <div className="col-sm-4 col-lg-4 d-flex flex-column align-items-start">
                                                          <div
                                                            style={{
                                                              fontSize: 12,
                                                              fontWeight: 500,
                                                              fontFamily: "Gilroy", color:"#4B4B4B"
                                                            }}
                                                          >
                                                            Monthly Rent
                                                            
                                                          </div>
                                                          <p
                                                            style={{
                                                              fontSize: 14,
                                                              fontWeight: 600,
                                                              fontFamily: "Gilroy",
                                                              color: 'rgba(30, 69, 225, 1)',
                                                              paddingTop: 7
                                                            }}
                                                          >
                                                            {CustomerOverView.hostelInfo?.monthlyRent != null
                                                              ? `₹${CustomerOverView.hostelInfo?.monthlyRent}`
                                                              : 0
                                                            }
                                                          </p>
                                                        </div>
                                                        <div className="col-sm-4 col-lg-4 d-flex flex-column align-items-start">
                                                          <div
                                                            style={{
                                                              fontSize: 12,
                                                              fontWeight: 500,
                                                              fontFamily: "Gilroy", color:"#4B4B4B"
                                                            }}
                                                          >
                                                            Advance Amount  
                                                          
                                                          </div>
                                                          <p
                                                            style={{
                                                              fontSize: 14,
                                                              fontWeight: 600,
                                                              fontFamily: "Gilroy", paddingTop: 7
                                                            }}
                                                          >
                                                            {advanceList?.advanceAmount != null
                                                              ? `₹${advanceList?.advanceAmount}`
                                                              : 0
                                                            }
                  
                  
                  
                                                          </p>
                                                        </div>
                  
                  
                  
                                                        <div className="col-sm-4 col-lg-4 d-flex flex-column align-items-start">
                                                          <div
                                                            style={{
                                                              fontSize: 12,
                                                              fontWeight: 500,
                                                              fontFamily: "Gilroy", color:"#4B4B4B"
                                                            }}
                                                          >
                                                            Booking Amount
                                                          </div>
                                                          <p
                                                            style={{
                                                              fontSize: 14,
                                                              fontWeight: 600,
                                                              fontFamily: "Gilroy",
                                                              color: '#222',
                                                              paddingTop: 7
                                                            }}
                                                          >
                  
                                                            {CustomerOverView.bookingInfo?.bookingAmount != null
                                                              ? `₹${CustomerOverView.bookingInfo.bookingAmount}`
                                                              : 0
                                                            }
                                                          </p>
                                                        </div>
                  
                                                        {
                                                          CustomerOverView.hostelInfo?.maintenance !== null &&
                                                          <div className="col-sm-4 col-lg-4 d-flex flex-column align-items-start">
                                                            <div
                                                              style={{
                                                                fontSize: 12,
                                                                fontWeight: 500,
                                                                fontFamily: "Gilroy", color:"#4B4B4B"
                                                              }}
                                                            >
                                                              Maintenance
                                                            </div>
                                                            <p
                                                              style={{
                                                                fontSize: 14,
                                                                fontWeight: 600,
                                                                fontFamily: "Gilroy",
                                                                // color: 'rgba(30, 69, 225, 1)',
                                                                paddingTop: 7
                                                              }}
                                                            >
                                                              ₹ {CustomerOverView.hostelInfo?.maintenance ?? 0}
                                                            </p>
                                                          </div>
                  
                                                        }
                                                        {CustomerOverView?.hostelInfo?.otherDeductionsBreakup?.map((item, index) => (
                                                          <div key={index} className="col-sm-4 col-lg-4 d-flex flex-column align-items-start">
                                                            <div
                                                              style={{
                                                                fontSize: 12,
                                                                fontWeight: 500,
                                                                fontFamily: "Gilroy",
                                                              }}
                                                            >
                                                              {item.type ? item.type : ""}
                                                            </div>
                                                            <p
                                                              style={{
                                                                fontSize: 14,
                                                                fontWeight: 600,
                                                                fontFamily: "Gilroy",
                                                                paddingTop: 7,
                                                              }}
                                                            >
                                                              ₹ {item.amount}
                                                            </p>
                                                          </div>
                                                        ))}
                  
                                                       
                  
                  
                                                      </div>
                  
                  
                  
                                                    </div>
                  
                  
                                                  </div>
                  
                  
                                                </div>
                                              </div>
                  </div>
                </div>



                <div className="mt-2" style={{ paddingLeft: 15, paddingRight: 18 }}>
                  <div className="card p-3 mb-0">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h6 className="mb-0" style={{ fontFamily: "Gilroy", fontWeight: 600 }}>
                        Documents
                      </h6>

                    </div>

                    <div className="row">
                      {!details?.doc1 && !details?.doc2 && (
                        <p className="text-center" style={{
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                          fontSize: 14,
                          color: "#4B4B4B"
                        }}>No documents uploaded</p>
                      )}
                      {details?.doc1 && (
                        <div className="col-md-6 col-sm-6 mb-3">
                          <div
                            className="p-3 rounded"
                            style={{ backgroundColor: "#f6f9ff", border: "1px solid #e0e7ff" }}
                          >
                            <div className="d-flex align-items-center mb-2">
                              <img
                                src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
                                alt="PDF"
                                style={{ width: "20px", height: "20px", marginRight: "8px" }}
                                onClick={() => setShow(true)}
                              />
                              <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                                {cleanFileName(details.doc1)}
                              </span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                              <small>PDF Document</small>
                              <div>

                                <img
                                  src={viewdoc}
                                  alt="View Document"

                                  onClick={() => handleFileOpen(details?.doc1)}
                                  style={{
                                    width: 20,
                                    height: 20,
                                    marginLeft: "10px",
                                    cursor: "pointer",
                                  }}
                                />


                                <i
                                  className="bi bi-download"
                                  style={{ cursor: "pointer", fontSize: "1rem" }}

                                  onClick={() =>
                                    window.open(
                                      details?.doc1,
                                      "_blank"
                                    )
                                  }
                                ></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}



                      {details?.doc2 && (
                        <div className="col-md-6 col-sm-6 mb-3">
                          <div
                            className="p-3 rounded"
                            style={{ backgroundColor: "#f6f9ff", border: "1px solid #e0e7ff" }}
                          >
                            <div className="d-flex align-items-center mb-2">
                              <img
                                src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
                                alt="PDF"
                                style={{ width: "20px", height: "20px", marginRight: "8px" }}
                              />
                              <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>

                                {cleanFileName(details.doc2)}
                              </span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                              <small>PDF Document</small>
                              <div>


                                <img
                                  src={viewdoc}
                                  alt="View Document"

                                  onClick={() => handleFileOpen2(details?.doc2)}
                                  style={{
                                    width: 20,
                                    height: 20,
                                    marginLeft: "10px",
                                    cursor: "pointer",
                                  }}
                                />


                                <i
                                  className="bi bi-download"
                                  style={{ cursor: "pointer", fontSize: "1rem" }}

                                  onClick={() =>
                                    window.open(
                                      details?.doc2,
                                      "_blank"
                                    )
                                  }
                                ></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}




                      <Modal
                        show={show}
                        onHide={() => setShow(false)}
                        size="lg"
                        centered
                        backdrop="static"
                      >
                        <Modal.Body
                          style={{
                            padding: "20px",
                            position: "relative",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            minHeight: "300px",
                          }}
                        >
                          <Button
                            variant="light"
                            onClick={() => setShow(false)}
                            style={{
                              position: "absolute",
                              top: 10,
                              right: 10,
                              border: "none",
                              fontSize: "20px",
                              zIndex: 1,
                            }}
                          >
                            &times;
                          </Button>
                          {previewUrl && previewUrl.match(/\.(jpeg|jpg|png|gif)$/i) ? (
                            <img src={previewUrl} alt="Document Preview" style={{ maxWidth: "100%", maxHeight: "600px" }} />
                          ) : (
                            <iframe
                              src={`https://docs.google.com/gview?url=${encodeURIComponent(previewUrl)}&embedded=true`}
                              style={{ width: "100%", height: "600px", border: "none" }}
                              title="Document Preview"
                            />
                          )}
                        </Modal.Body>
                      </Modal>




                      <Modal show={showDoc2} onHide={() => setShowDoc2(false)} size="lg" centered backdrop="static">
                        <Modal.Body
                          style={{
                            padding: "20px",
                            position: "relative",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            minHeight: "300px",
                          }}
                        >
                          <Button
                            variant="light"
                            onClick={() => setShowDoc2(false)}
                            style={{
                              position: "absolute",
                              top: 10,
                              right: 10,
                              border: "none",
                              fontSize: "20px",
                              zIndex: 1,
                            }}
                          >
                            &times;
                          </Button>


                          {previewUrl2 && previewUrl2.match(/\.(jpeg|jpg|png|gif)$/i) ? (
                            <img src={previewUrl2} alt="Document Preview" style={{ maxWidth: "100%", maxHeight: "600px" }} />
                          ) : (
                            <iframe
                              src={`https://docs.google.com/gview?url=${encodeURIComponent(previewUrl)}&embedded=true`}
                              style={{ width: "100%", height: "600px", border: "none" }}
                              title="Document Preview"
                            />
                          )}
                        </Modal.Body>
                      </Modal>
                    </div>



                  </div>
                </div>
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
                          fontFamily: "Gilroy", color: "#000"
                        }}
                      >
                        Amenities provided
                      </div>

                      <div
                        className="d-flex justify-content-start ms-3"

                      >


                      </div>

                    </div>

                    <div className="card-body" style={{ fontFamily: "Gilroy", }}>


                      <div>
                        <UserListAmenities

                        />
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
          <TabPanel value="2" className="px-0 mt-2">
            <UserEb
              id={state.UsersList?.customerdetails?.customerId}


            />
          </TabPanel>
          <TabPanel value="3" className="px-0 mt-2">
            <UserListInvoice

            />
          </TabPanel>
          <TabPanel value="4" className="px-0 mt-2">
            <TransactionHistory />
          </TabPanel>
        </TabContext>
      </div>

      {
        stayDetailsShow && <StayHistory show={stayDetailsShow} handleClose={handleCloseStayHistory} />
      }

    </>
  )

}
CustomerProfile.propTypes = {
  setcheckoutTableShow: PropTypes.func.isRequired,
  handleCloseCheckoutProfile: PropTypes.func.isRequired,
  CheckoutProfile: PropTypes.func.isRequired,
  checkoutWithoutPay: PropTypes.func.isRequired,

};
export default CustomerProfile
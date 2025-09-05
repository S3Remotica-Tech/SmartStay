
/* eslint-disable react-hooks/exhaustive-deps */import React,{useEffect, useState} from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch,useSelector } from "react-redux";
import { Button} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
// import EditImage from "../../Assets/Images/New_images/edit.png"
import { checkoutCustomerProfile } from "../../Redux/Action/smartStayAction";
import { Call, Sms, House} from "iconsax-react";
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
// import checkooueye from "../../Assets/Images/New_images/checkouteye.png"
// import docDown from "../../Assets/Images/New_images/downdoc.png";
import viewdoc from "../../Assets/Images/New_images/viewdoc.png";
import StayHistory from "./StayHistory";
import PropTypes from "prop-types";
import leftarrow from "../../Assets/Images/arrow-left.png";
import Profiles from "../../Assets/Images/New_images/profile-picture.png";
import repeat from "../../Assets/Images/repeate-one.png";

function CustomerProfile(props){
   const state = useSelector((state) => state);

   console.log("CustomerProfile",state)
    const dispatch = useDispatch();
    const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [details,setDetails] = useState("")
  const [deductionDetails,setDeductionDetails] = useState("")
     const [value, setValue] = useState("1");
     const [show, setShow] = useState(false);
     const [showDoc2,setShowDoc2] =useState(false)
      const [stayDetailsShow, setStayDetailsShow] = useState(false)
      const [previewUrl, setPreviewUrl] = useState(null);
      const [previewUrl2, setPreviewUrl2]=useState(null)
  // const [previewFile, setPreviewFile] = useState(null);
  //  const [showDocModaldoc2, setShowDocModaldoc2] = useState(false);

  // // Collect docs dynamically


    const handleShowStayHistory = () => {
    setStayDetailsShow(true)
  }
  const handleCloseStayHistory = () => {
    setStayDetailsShow(false)
  }
 


const getFileName = (url) => {
  if (!url) return "";
  try {
    return decodeURIComponent(url.split("/").pop()); // full file name
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
    // direct set without encoding
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
    // direct set without encoding
    setPreviewUrl2(url);
    setShowDoc2(true);
  } else if (lowerUrl.endsWith(".xlsx") || lowerUrl.endsWith(".xls")) {
    const viewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`;
    window.open(viewerUrl, "_blank");
  } else {
    window.open(url, "_blank");
  }
};

// const handleFileOpen2 = (url) => {
//   if (!url) return;

//   const safeUrl = encodeURI(url);
//   const lowerUrl = safeUrl.toLowerCase();

//   if (
//     lowerUrl.endsWith(".pdf") ||
//     lowerUrl.endsWith(".jpg") ||
//     lowerUrl.endsWith(".jpeg") ||
//     lowerUrl.endsWith(".png")
//   ) {
//     // image & pdf modal preview
//     setPreviewUrl2(safeUrl);
//     setShowDoc2(true);
//   } else if (lowerUrl.endsWith(".xlsx") || lowerUrl.endsWith(".xls")) {
//     // excel viewer (office online)
//     const viewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${safeUrl}`;
//     window.open(viewerUrl, "_blank");
//   } else {
//     // fallback → download / open in browser
//     window.open(safeUrl, "_blank");
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
//     // PDF / Image → Modal-ல் preview
//     setPreviewUrl2(url);
//     setShowDoc2(true);
//   } else {
//     // Other docs (xlsx, docx, etc.) → Direct download / open
//     window.open(url, "_blank");
//   }
// };

const cleanFileName = (url) => {
  const fullName = getFileName(url);
  const parts = fullName.split("_");
  return parts.slice(2).join("_"); // remove prefix (RADH809_12345_)
};

  // const handlePreview = (doc) => {
  //   setPreviewFile(doc);
  //   setShow(true);
  // };

  // const handleDownload = (doc) => {
  //   const link = document.createElement("a");
  //   link.href = doc.url;
  //   link.download = doc.name; // custom name
  //   link.click();
  // };
  // const [selectedDoc, setSelectedDoc] = useState(null);

// const handlePreview = (doc) => {
//   setSelectedDoc(doc);
//   setShow(true);
// };

// const handleDownload = (doc) => {
//   const link = document.createElement("a");
//   link.href = doc.url; // or doc.file if you store file path
//   link.download = doc.name;
//   link.click();
// };

     useEffect(()=>{
      if(state.UsersList.StatuscodeforCheckoutProfile){
        setDetails(state.UsersList.checkoutprofileDetails.hostelData)
        setDeductionDetails(state.UsersList.checkoutprofileDetails.deduction_details)
        setTimeout(()=>{
            dispatch({ type: "REMOVE_CHECKOUT_PROFILE_DETAILS" });

        },100)

      }

     },[state.UsersList.StatuscodeforCheckoutProfile])


     const [advanceReturn, setAdvanceReturn] = useState(null);
const [otherDetails, setOtherDetails] = useState([]);

useEffect(() => {
  if (Array.isArray(deductionDetails) && deductionDetails.length > 0) {
    const adv = deductionDetails.find(item => item.reason === "Advance Return");
    const others = deductionDetails.filter(item => item.reason !== "Advance Return" && item.reason !== "DueAmount");

    setAdvanceReturn(adv || null);
    setOtherDetails(others);
  }
}, [details]);
     console.log("otherDetails",otherDetails)

    const handleBack =()=>{
          dispatch(checkoutCustomerProfile(true))
        props.setcheckoutTableShow(true)
        props.handleCloseCheckoutProfile(false)


    }
     const handleChanges = (event, newValue) => {
    setValue(newValue);
    // setFormShow(false);
    // setKycDetailForm(false);
  };
console.log("propssss",props.CheckoutProfile)
    return(
        <>
       
        <nav className="navbar navbar-expand-lg bg-white  sticky-top">
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
<span className="fw-medium">Customer Profile</span>
</div>

</div>
</nav>


<div className="container my-4">
<div style={{paddingLeft:15,paddingRight:15}}>
<div className="card " style={{borderRadius:10}}>
<div className="card-body">
<div className="d-flex flex-wrap align-items-center justify-content-between gap-3">

<div className="d-flex align-items-center gap-3">
<img src={Profiles} className="rounded-circle" width="56" height="56" alt="Avatar" />
<div>
<div className="d-flex align-items-center gap-2 flex-wrap">
<p style={{fontFamily:"Gilroy",fontSize:18,fontWeight:500}} className="mb-0">{details.Name}</p>
<i className="bi bi-patch-check-fill text-primary" title="Verified"></i>
</div>
<div className="d-flex align-items-center gap-2 mt-1" >
<span style={{backgroundColor:"#FFD1D1",padding:3,color:"red",borderRadius:15,fontFamily:"Gilroy",fontSize:12,fontWeight:400}}><span className="me-1 small" >•</span>Checked Out</span>
</div>
<div className="text-secondary small mt-2" style={{fontSize:14,fontFamily:"Gilroy",fontWeight:600}}>“Very disciplined tenant, paid on time and maintained the room well.”</div>
</div>
</div>

<div className="d-flex align-items-center gap-2">
<button className="btn btn-primary"><img src={repeat} alt="repeat"/> Re Check-In</button>
</div>
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
                            label="Amenities"
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
         
          <div className="card  p-3 mb-3" style={{borderRadius:10,border:"1px solid #DCDCDC"}}>
           
                  <div className="d-flex justify-content-between align-items-center mb-3">
  <p style={{ fontSize: 18, fontFamily: "Gilroy", fontWeight: 400 }} className="mb-0">
    Basic Details
  </p>
  {/* <div
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
      src={EditImage}
      alt="Edit"
      style={{ width: "20px", height: "20px" }}
    />
  </div> */}
</div>
<hr style={{marginTop:"-10px"}}/>

            
            <div className="row">
              <div className="col-6">
                <p style={{fontSize:14,fontFamily:"Gilroy",fontWeight:400,color:"grey"}} className="mb-1 ">First Name</p>
                <p style={{fontSize:16,fontFamily:"Gilroy",fontWeight:600}}>{details.Name}</p>
              </div>
              <div className="col-6">
                <p style={{fontSize:14,fontFamily:"Gilroy",fontWeight:400,color:"grey"}} className="mb-1">Last Name</p>
                <p style={{fontSize:16,fontFamily:"Gilroy",fontWeight:600}}>-</p>
              </div>
              <div className="col-6">
                <p style={{fontSize:14,fontFamily:"Gilroy",fontWeight:400,color:"grey"}} className="mb-1">Email</p>
                <p style={{fontSize:16,fontFamily:"Gilroy",fontWeight:600}}><Sms size="16" color="#1E45E1" className="me-0" style={{ flexShrink: 0 }} />{details.Email}</p>
              </div>
              <div className="col-6">
                <p style={{fontSize:14,fontFamily:"Gilroy",fontWeight:400,color:"grey"}} className="mb-1 ">Mobile no.</p>
                <p style={{fontSize:16,fontFamily:"Gilroy",fontWeight:600}}> <Call size="16" color="#1E45E1" className="me-0" />+{details.Phone}</p>
              </div>
            </div>
          </div>

         
          <div className="card p-3" style={{borderRadius:10,border:"1px solid #DCDCDC"}}>
           {/* <p style={{fontSize:18,fontFamily:"Gilroy",fontWeight:400}} className="mb-3">Address Details</p> */}
                          <div className="d-flex justify-content-between align-items-center mb-3">
  <p style={{ fontSize: 18, fontFamily: "Gilroy", fontWeight: 400 }} className="mb-0">
    Address Details
  </p>
  {/* <div
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
      src={EditImage}
      alt="Edit"
      style={{ width: "20px", height: "20px" }}
    />
  </div> */}
</div>
<hr style={{marginTop:"-10px"}}/>
            <div className="row">
              <div className="col-6">
                <p style={{fontSize:14,fontFamily:"Gilroy",fontWeight:400,color:"grey"}} className="mb-1">House No / Apartment</p>
                <p style={{fontSize:16,fontFamily:"Gilroy",fontWeight:600}}>  <House
                                                          size="18"
                                                          color="#1E45E1"
                                                          className="me-2"
                                                          style={{ marginBottom: "2px" }}
                                                        />{details?.Address || "N/A"}</p>
              </div>
              <div className="col-6">
                <p style={{fontSize:14,fontFamily:"Gilroy",fontWeight:400,color:"grey"}} className="mb-1">Street / Area</p>
                <p style={{fontSize:16,fontFamily:"Gilroy",fontWeight:600}}> <img src={Areaimage}
                                                          alt="Areaimage"
                                                          size="18"
                                                          color="#1E45E1"
                                                          className="me-2"
                                                          style={{ marginBottom: "2px" }}
                                                        />{details?.area || "N/A"}</p>
              </div>
              <div className="col-6">
                <p style={{fontSize:14,fontFamily:"Gilroy",fontWeight:400,color:"grey"}} className="mb-1">Landmark</p>
                <p style={{fontSize:16,fontFamily:"Gilroy",fontWeight:600}}><img src={Landamrkimage} alt="Landamrkimage" size="16" color="#1E45E1" className="me-2" style={{ flexShrink: 0 }} />{details?.landmark || "N/A"}</p>
              </div>
              <div className="col-6">
                <p className="mb-1 text-muted">Pincode</p>
                <p style={{fontSize:16,fontFamily:"Gilroy",fontWeight:600}}><img src={PincodeImage} alt="Landamrkimage" size="16" color="#1E45E1" className="me-2" style={{ flexShrink: 0 }} /> {details?.pincode && details.pincode !== "undefined" && details.pincode.trim()
    ? details.pincode
    : "N/A"}</p>
              </div>
              <div className="col-6">
                <p style={{fontSize:14,fontFamily:"Gilroy",fontWeight:400,color:"grey"}} className="mb-1">City</p>
                <p style={{fontSize:16,fontFamily:"Gilroy",fontWeight:600}}> <img src={CityImage} alt="CityImage" size="16" color="#1E45E1" className="me-2" style={{ flexShrink: 0 }} /> {details?.city && details.city !== "undefined" && details.city.trim()
    ? details.city
    : "N/A"}</p>
              </div>
              <div className="col-6">
                <p style={{fontSize:14,fontFamily:"Gilroy",fontWeight:400,color:"grey"}} className="mb-1">State</p>
                <p style={{fontSize:16,fontFamily:"Gilroy",fontWeight:600}}><img src={CityImage} alt="CityImage" size="16" color="#1E45E1" className="me-2"/> {details?.state && details.state !== "undefined" && details.state.trim()
    ? details.state
    : "N/A"}</p>
              </div>
            </div>
          </div>
   
        </div>
        

       
        <div className="col-md-6 row " >
   

        
          <div className="card  mb-3" style={{borderRadius:10,border:"1px solid #DCDCDC",paddingLeft:10,paddingRight:20,paddingTop:2}}>
          
                                 <div className="d-flex justify-content-between align-items-center mb-3">
  <p style={{ fontSize: 18, fontFamily: "Gilroy", fontWeight: 400}} className="mb-0">
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
      style={{ width: "30px", height: "30px" }}
    />
    
    {/* <img
      src={EditImage}
      alt="Edit"
      style={{ width: "20px", height: "20px" }}
    /> */}
  </div>
 
</div>
 <hr style={{marginTop:"-10px"}}/>
            <div className="row">
              <div className="col-4">
                <p style={{fontSize:14,fontFamily:"Gilroy",fontWeight:400,color:"grey"}} className="mb-1">Floor</p>
                <p style={{fontSize:16,fontFamily:"Gilroy",fontWeight:600}}> <img src={Floorimage} alt="Floorimage" size="16" color="#1E45E1" />{details.floor_name || "N/A"}</p>
              </div>
              <div className="col-4">
                <p style={{fontSize:14,fontFamily:"Gilroy",fontWeight:400,color:"grey"}} className="mb-1">Room</p>
                <p style={{fontSize:16,fontFamily:"Gilroy",fontWeight:600}}><img src={RoomImage} alt="Floorimage" size="16" color="#1E45E1" />{details["Room Name"] || "N/A"}</p>
              </div>
              <div className="col-4">
                <p style={{fontSize:14,fontFamily:"Gilroy",fontWeight:400,color:"grey"}} className="mb-1">Bed</p>
                <p style={{fontSize:16,fontFamily:"Gilroy",fontWeight:600}}><img src={Group} alt="Floorimage" size="16" color="#1E45E1" />{details["Bed Name"] || "N/A"}</p>
              </div>
              </div>
               <div className="row">
              <div className="col-4">
                <p style={{fontSize:14,fontFamily:"Gilroy",fontWeight:400,color:"grey"}} className="mb-1">Joined Date</p>
                <p style={{fontSize:16,fontFamily:"Gilroy",fontWeight:600}}><img src={LinkImage} alt="Floorimage" size="16" color="#1E45E1" />{details.joining_Date
  ? new Date(details.joining_Date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  : "N/A"}</p>
              </div>
              <div className="col-4">
                <p style={{fontSize:14,fontFamily:"Gilroy",fontWeight:400,color:"grey"}} className="mb-1 ">Checkout Date</p>
                <p style={{fontSize:16,fontFamily:"Gilroy",fontWeight:600}}><img src={LinkImage} alt="Floorimage" size="16" color="#1E45E1" />{details.joining_Date
  ? new Date(details.CheckoutDate).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  : "N/A"}</p>
              </div>
              </div>
           

            <hr />

            <p style={{fontSize:18,fontFamily:"Gilroy",fontWeight:400}} className="">Financial details</p>
            <div className="row p-2">
                <div className="card p-2"style={{marginTop:"-10px"}}>
                    <div className="row">
              <div className="col-4">
                <p style={{fontSize:14,fontFamily:"Gilroy",fontWeight:400,color:"grey"}}  className="mb-1">Advance Amount</p>
                <p style={{fontSize:16,fontFamily:"Gilroy",fontWeight:600}}><img src={MoneyImage} alt="Money Icon"  height={14} width={14} className="me-1"/>{" "}{details.AdvanceAmount}</p>
              </div>
              <div className="col-4">
                <p style={{fontSize:14,fontFamily:"Gilroy",fontWeight:400,color:"grey"}}  className="mb-1">Return Amount</p>
                <p style={{fontSize:16,fontFamily:"Gilroy",fontWeight:600}}><img src={MoneyImage} alt="Money Icon"  height={14} width={14} className="me-1"/>{advanceReturn?.amount !== undefined && advanceReturn?.amount !== null
  ? advanceReturn.amount
  : "N/A"}</p>
              </div>
                <div className="col-4">
                <p style={{fontSize:14,fontFamily:"Gilroy",fontWeight:400,color:"grey"}}  className="mb-1">Monthly Rent</p>
                <p style={{fontSize:16,fontFamily:"Gilroy",fontWeight:600}}>₹{details.RoomRent}</p>
              </div>
             
              </div>
              </div>
            
            <p style={{fontSize:18,fontFamily:"Gilroy",fontWeight:400}} className="">Deduction details </p>
              <div className="card p-2">
                  <div className="row">
              {/* {otherDetails.length > 0 &&
  otherDetails.map((item) => (
   
    <div key={item.id} className="col-4">
      <p style={{fontSize:14,fontFamily:"Gilroy",fontWeight:400,color:"grey"}}  className="mb-1 ">{item.reason}</p>
      <p style={{fontSize:16,fontFamily:"Gilroy",fontWeight:600}}>₹{item.amount}</p>
    </div>
    
  ))} */}
  {otherDetails && otherDetails.length > 0 ? (
  otherDetails.map((item) => (
    <div key={item.id} className="col-4">
      <p
        style={{
          fontSize: 14,
          fontFamily: "Gilroy",
          fontWeight: 400,
          color: "grey",
          textAlign:"center"
        }}
        className="mb-1"
      >
        {item.reason}
      </p>
      <p
        style={{
          fontSize: 16,
          fontFamily: "Gilroy",
          fontWeight: 600,
          textAlign:"center"
        }}
      >
        ₹{item.amount}
      </p>
    </div>
  ))
) : (
  <div className="col-12 text-center">
    <p style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 400, color: "grey" }}>
      No Deduction details available
    </p>
  </div>
)}

  </div>
  </div>
             
          
            </div>
          </div>
        </div>



 <div style={{paddingLeft:15,paddingRight:18}}>
                       <div className="card p-3 mb-0">
  <div className="d-flex justify-content-between align-items-center mb-3">
    <h6 className="mb-0" style={{ fontFamily: "Gilroy", fontWeight: 600 }}>
      Documents
    </h6>
   
  </div>

<div className="row">
  {!details?.doc1 && !details?.doc2 && (
    <p className="text-muted text-center">No documents uploaded</p>
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
                // onClick={() => setShow(true)}
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
            {/* {doc.name} */}
            {cleanFileName(details.doc2)}
          </span>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <small>PDF Document</small>
          <div>
          
           
              <img
                src={viewdoc}
                alt="View Document"
                // onClick={() => setShowDoc2(true)}
                onClick={() => handleFileOpen2(details?.doc2)}
                style={{
                  width: 20,
                  height: 20,
                  marginLeft: "10px",
                  cursor: "pointer",
                }}
              />

            {/* Download Only */}
            <i
              className="bi bi-download"
              style={{ cursor: "pointer", fontSize: "1rem" }}
              // onClick={() => handleDownload(doc)}
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
  {/* ))} */}


{/* <Modal
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

    <img
      src={details?.doc1}
      alt="Document Preview"
      style={{
        maxWidth: "100%",
        maxHeight: "70vh",
        height: "auto",
        width: "auto",
        borderRadius: "10px",
        objectFit: "contain",
      }}
    />
  </Modal.Body>
</Modal> */}
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




{/* <Modal
  show={showDoc2}
  onHide={() => setShowDoc2(false)}
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
      minHeight: "300px", // optional fallback height
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

    <img
      src={details?.doc2}
      alt="Document Preview"
      style={{
        maxWidth: "100%",
        maxHeight: "70vh",
        height: "auto",
        width: "auto",
        borderRadius: "10px",
        objectFit: "contain",
      }}
    />
  </Modal.Body>
</Modal> */}
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

    {/* Render preview only for PDF/Image */}
    {/* {previewUrl2 && previewUrl2.toLowerCase().endsWith(".pdf") && (
      <object
        data={previewUrl2}
        type="application/pdf"
        width="100%"
        height="500px"
        style={{ border: "none", borderRadius: "10px" }}
      />
    )}

    {previewUrl2 &&
      (previewUrl2.toLowerCase().endsWith(".jpg") ||
        previewUrl2.toLowerCase().endsWith(".jpeg") ||
        previewUrl2.toLowerCase().endsWith(".png")) && (
        <img
          src={previewUrl2}
          alt="Preview"
          style={{
            maxWidth: "100%",
            maxHeight: "70vh",
            borderRadius: "10px",
            objectFit: "contain",
          }}
        />
      )} */}
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
    </div>
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

};
export default CustomerProfile
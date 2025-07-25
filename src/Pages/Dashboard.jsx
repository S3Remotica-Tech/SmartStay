/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import "../Pages/Dashboard.css";
import Card from "react-bootstrap/Card";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import vector from "../Assets/Images/New_images/Asset_Arrow.png";
import key from "../Assets/Images/key.png";
import clock from "../Assets/Images/Car.png";
import { useDispatch, useSelector } from "react-redux";
import drop from "../Assets/Images/New_images/arrow-down.png";
import DashboardAnnouncement from "./DashboardAnnouncement";
import DashboardUpdates from "./DashboardUpdates";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { MdWarningAmber } from "react-icons/md";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { MdError } from "react-icons/md";
import Emptystate from "../Assets/Images/Empty-State.jpg";
import LoaderComponent from "./LoaderComponent";
import PropTypes from "prop-types";
import Marquee from "react-fast-marquee";
import pendingimg from "../Assets/Images/New_images/pending_rent.png";
import currentMatch from "../Assets/Images/New_images/currentmatch.png";
import activeImage from "../Assets/Images/New_images/Active compliant.png";
import coinImage from "../Assets/Images/New_images/coinimage.png";
import advancedHand from "../Assets/Images/New_images/AdvancedHand.png";
import newBooking from "../Assets/Images/New_images/NewBooking.png";




function Dashboard() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [dashboardList, setDashboardList] = useState([]);
  const [lablesdata, setLables] = useState([]);
  const [totalAmount, setTotalAmount] = useState([]);
  const [rolePermission, setRolePermission] = useState("");
  const [permissionError, setPermissionError] = useState("");
 
  const [AnnouncementAddPermission,setAnnouncementAddPermission] = useState("");
   const [AnnouncementEditPermission,setAnnouncementEditPermission] = useState("")
    const [AnnouncementDeletePermission,setAnnouncementDeletePermission] = useState("")
  const [updatePermissionError, setupdatePermissionError] = useState("");
  const [value, setValue] = React.useState("1");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectExpence, setSelectExpence] = useState("this_month");
  const [selectCashback, setSelectCashback] = useState("this_month");
  const [cashBackData, setCashBackData] = useState("");
  const [selectRevenu, setSelectRevenu] = useState("six_month");
  const [hostel_id, setHostel_Id] = useState("");
  const [loading, setLoading] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [daysLeft, setDaysLeft] = useState(null);
  const [selectAdvance, setSelectAdvance] = useState("six_month");
  const [accountList, setAccountList] = useState("");


  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const formattedChart = state.PgList?.dashboardFilterAdvance.advance_data?.map(item => {
    const [year, month] = item.month.split("-");
    const monthIndex = parseInt(month, 10) - 1;
    return {
      name: `${monthNames[monthIndex]} ${year}`,
      Advance: Number(item.advance_amount),
      AdvanceReturn: Number(item.return_advance),
    };
  });

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      setHostel_Id(state.login.selectedHostel_Id);
    }
  }, [state.login.selectedHostel_Id]);




  useEffect(() => {
    if (state?.createAccount?.accountList[0]?.plan_data) {
      const customerDetailsPage =
        state?.createAccount?.accountList[0]?.plan_data;
      setAccountList(customerDetailsPage);
    }
  }, [state?.createAccount?.accountList[0]?.plan_data]);

  


  useEffect(() => {
  if (accountList?.length > 0 && accountList[0]?.plan_end) {
    const planEndDate = new Date(accountList[0].plan_end);
    const currentDate = new Date();

    const diffInDays = Math.ceil(
      (planEndDate - currentDate) / (1000 * 60 * 60 * 24)
    );

    setDaysLeft(diffInDays);

    setShowWarning(diffInDays <= 19);
  }
}, [accountList]);


  const handleOkClick = () => {
    setShowWarning(false);
  };

  useEffect(() => {
    if (hostel_id) {
      dispatch({ type: "PGDASHBOARD", payload: { hostel_id: hostel_id } });
    }
  }, [hostel_id]);

  const handleSelectedReceived = (e) => {
    setSelectCashback(e.target.value);
  };
  const handleSelectedRevenue = (e) => {
    setSelectRevenu(e.target.value);
  };
  const handleSelectedAdvance = (e) => {
    setSelectAdvance(e.target.value);
  };


  useEffect(() => {

    setLoading(true);
    dispatch({
      type: "DASHBOARDFILTERCASHBACK",
      payload: {
        type: "cashback",
        range: selectCashback,
        hostel_id: hostel_id,
      },
    });

  }, [selectCashback, hostel_id]);



  useEffect(() => {
    if (hostel_id) {
      dispatch({
        type: "DASHBOARDFILTERREVENUE",
        payload: {
          type: "exp_vs_rev",
          range: selectRevenu,
          hostel_id: hostel_id,
        },
      });
    }
  }, [selectRevenu, hostel_id]);

  useEffect(() => {
    if (hostel_id) {
      dispatch({
        type: "DASHBOARDFILTERADVANCE",
        payload: {
          type: "advance",
          range: selectAdvance,
          hostel_id: hostel_id,
        },
      });
    }
  }, [selectAdvance, hostel_id]);



  useEffect(() => {
    if (state.PgList?.statusCodeForAdvanceFilter === 200) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_DASHBOARD_FILTER_ADVANCE" });
      }, 1000);
    }
  }, [state.PgList?.statusCodeForAdvanceFilter]);


  useEffect(() => {
    const cashBackDataRevenu =
      state.PgList?.dashboardFilterRevenu?.cash_back_data;
    setData(cashBackDataRevenu);
  }, [state.PgList?.dashboardFilterRevenu?.cash_back_data]);

  useEffect(() => {
    if (state.PgList?.statusCodeForDashboardFilterRevenue === 200) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_DASHBOARD_FILTER_REVENUE" });
      }, 1000);
    }
  }, [state.PgList?.statusCodeForDashboardFilterRevenue]);

  useEffect(() => {
    if (state.PgList?.statusCodeForDashboardFilterCashBack === 200) {
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_DASHBOARD_FILTER_DETAILS_CASHBACK" });
      }, 1000);
    }
  }, [state.PgList?.statusCodeForDashboardFilterCashBack]);

  useEffect(() => {
    if (state.PgList?.NoDashboardStatusCode === 201) {
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NO_DASHBOARD_LIST" });
      }, 1000);
    }
  }, [state.PgList?.NoDashboardStatusCode]);

  const handleSelectedExpenses = (e) => {
    setSelectExpence(e.target.value);

  };
  useEffect(() => {
    if (hostel_id) {
      dispatch({
        type: "DASHBOARDFILTER",
        payload: {
          type: "expenses",
          range: selectExpence,
          hostel_id: hostel_id,
        },
      });
    }
  }, [selectExpence, hostel_id]);

  const handleChanges = (event, newValue) => {
    setValue(newValue);
  };



  useEffect(() => {
    setRolePermission(state.createAccount.accountList);
  }, [state.createAccount.accountList]);





 useEffect(() => {
 const userType = rolePermission[0]?.user_details?.user_type 
     const isAdmin = userType   === "admin" ||  userType   === "agent" ;
     if (isAdmin) {
    if (state?.login?.planStatus === 0) {
      setPermissionError("");
      setAnnouncementAddPermission("Permission Denied");
      setAnnouncementEditPermission("Permission Denied");
      setAnnouncementDeletePermission("Permission Denied");

    } else if (state?.login?.planStatus === 1) {
      setPermissionError("");
      setAnnouncementAddPermission("");
      setAnnouncementEditPermission("");
      setAnnouncementDeletePermission("");
    }
  }

  }, [state?.login?.planStatus, state?.login?.selectedHostel_Id,rolePermission])


      

   
      
   useEffect(() => {
       const DashboardPermission = rolePermission[0]?.role_permissions?.find(
         (perm) => perm.permission_name === "Dashboard"
       );
     
       const isOwner = rolePermission[0]?.user_details?.user_type === "staff";
       const planActive = state?.login?.planStatus === 1;
      
       if (!DashboardPermission || !isOwner) return;
     
       
       if (DashboardPermission.per_view === 1 && planActive) {
         setPermissionError("");
       } else {
         setPermissionError("Permission Denied");
       }
        
   
     }, [rolePermission, state?.login?.planStatus,state?.login?.selectedHostel_Id]);
  

useEffect(() => {
     const AnnounceMentPermission = rolePermission[0]?.role_permissions?.find(
       (perm) => perm.permission_name === "Announcement"
     );
   
     const isOwner = rolePermission[0]?.user_details?.user_type === "staff";
     const planActive = state?.login?.planStatus === 1;
    
     if (!AnnounceMentPermission || !isOwner) return;
   
     
     if (AnnounceMentPermission.per_view === 1 && planActive) {
       setPermissionError("");
     } else {
       setPermissionError("Permission Denied");
     }
   
     
     if (AnnounceMentPermission.per_create === 1 && planActive) {
       setAnnouncementAddPermission("");
     } else {
       setAnnouncementAddPermission("Permission Denied");
     }
   
    
     if (AnnounceMentPermission.per_edit === 1 && planActive) {
       setAnnouncementEditPermission("");
     } else {
       setAnnouncementEditPermission("Permission Denied");
     }
   
     if (AnnounceMentPermission.per_delete === 1 && planActive) {
       setAnnouncementDeletePermission("");
     } else {
       setAnnouncementDeletePermission("Permission Denied");
     }
   }, [rolePermission, state?.login?.planStatus,state?.login?.selectedHostel_Id]);



  useEffect(() => {
    if (
      rolePermission[0]?.is_owner === 1 ||
      rolePermission[0]?.role_permissions[2]?.per_view === 1
    ) {
      setupdatePermissionError("");
    } else {
      setupdatePermissionError("Permission Denied");
    }
  }, [rolePermission]);

  useEffect(() => {
    const appearOptions = {
      threshold: 0.5,
    };
    const faders = document.querySelectorAll(".fade-in");
    const appearOnScro1l = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        } else {
          entry.target.classList.add("appear");
          appearOnScro1l.unobserve(entry.target);
        }
      });
    }, appearOptions);
    faders.forEach((fader) => {
      appearOnScro1l.observe(fader);
    });
  });

  useEffect(() => {
    setTotalAmount(state.PgList?.dashboardFilter?.total_amount);
  }, [state.PgList?.dashboardFilter?.total_amount]);



  useEffect(() => {
    setLables(state.PgList?.dashboardFilter?.exp_data || []);
  }, [state.PgList?.dashboardFilter?.exp_data]);

  useEffect(() => {
    if (state.PgList?.statusCodeForDashboardFilter === 200) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_DASHBOARD_FILTER_DETAILS" });
      }, 1000);
    }
  }, [state.PgList?.statusCodeForDashboardFilter]);

  useState(() => {
    if (state.PgList.statuscodeForDashboard === 200) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_CREATE_PG_DASHBOARD" });
      }, 200);
    }
  }, [state.PgList.statuscodeForDashboard]);

  useEffect(() => {
    if (state.PgList?.dashboardDetails?.dashboardList) {
      setDashboardList(state.PgList.dashboardDetails.dashboardList);
    }
  }, [state.PgList.dashboardDetails.dashboardList]);



  useEffect(() => {
    setCashBackData(state.PgList?.dashboardFilterCashback?.cash_back_data);
  }, [state.PgList?.dashboardFilterCashback?.cash_back_data]);

  const currentvalue =
    (Number(cashBackData?.[0]?.Revenue) || 0) +
    (Number(cashBackData?.[0]?.overdue) || 0);

  const percentage = currentvalue
    ? ((currentvalue - Number(cashBackData?.[0]?.overdue)) / currentvalue) * 100
    : 0;

  const pathColor =
    currentvalue > 0
      ? cashBackData?.[0]?.overdue > 0
        ? "#00A32E"
        : "#EBEBEB"
      : "#EBEBEB";
  const trailColor = "#EBEBEB";

  const currentDate = new Date();
  const months = [];

  for (let i = 5; i >= 0; i--) {
    const date = new Date(currentDate);
    date.setMonth(currentDate.getMonth() - i);
    const monthYear = date.toISOString().substring(0, 7);
    months.push({ month: monthYear, revenue: 0, expense: 0 });
  }

  const fixedColors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#E7E9ED",
    "#8DD35F",
    "#D65DB1",
    "#6A4C93",
  ];

  const datum = {
    labels: lablesdata?.map((category) => category.category_Name),
    datasets: [
      {
        data: lablesdata?.map((category) => category.purchase_amount),
        backgroundColor: lablesdata?.map(
          (_, index) => fixedColors[index % fixedColors.length]
        ),
        hoverBackgroundColor: lablesdata?.map(
          (_, index) => fixedColors[index % fixedColors.length]
        ),
        borderWidth: 5,
        borderColor: "#fff",
        borderRadius: 10,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "75%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    elements: {
      arc: {
        borderRadius: 2,
      },
    },
  };

  const { datasets } = datum;



  const CustomLegend = ({ payload }) => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 15,
        }}
      >
        {payload.map((entry, index) => (
          <div
            key={`item-${index}`}
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: 10,
              marginTop: 25,
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: entry.color,
                marginRight: 5,
              }}
            />
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                fontFamily: "Montserrat",
              }}
            >
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="cotainer px-3 py-3">
   <Marquee pauseOnHover gradient={false}>
  {showWarning && (
    <div
      className={`alert mt-3 d-flex justify-content-between align-items-center px-4 py-2  rounded-3`}
      style={{
        backgroundColor: daysLeft > 0 ? "#fff3cd" : "#f8d7da",
        color: daysLeft > 0 ? "#856404" : "#721c24",
        border: `1px solid ${daysLeft > 0 ? "#ffeeba" : "#f5c6cb"}`,
        fontFamily: "Gilroy",
        width: "100%",
        maxWidth: "900px",
        margin: "auto",
        fontSize: "16px",
      }}
      role="alert"
    >
      <div className="d-flex align-items-center">
        {daysLeft > 0 ? (
          <>
            <MdWarningAmber size={24} color="#ffc107" style={{ marginRight: "8px" }} />
            <span>
              Your plan will expire in <strong>{daysLeft}</strong> day
              {daysLeft > 1 ? "s" : ""} !
            </span>
          </>
        ) : (
          <>
                       <span style={{fontFamily: "Gilroy",}}>
              <strong>Your plan has expired!</strong>
            </span>
          </>
        )}
      </div>
      <button
        className="btn btn-sm ms-3"
        style={{
          fontFamily: "Gilroy",
          backgroundColor: daysLeft > 0 ? "#ffc107" : "#dc3545",
          color: "#fff",
          border: "none",
        }}
        onClick={handleOkClick}
      >
        OK
      </button>
    </div>
  )}
</Marquee>

        <TabContext value={value}>
          <div
            className="container-fluid "
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1000,
              backgroundColor: "#FFFFFF",
            }}
          >
            <Box sx={{ borderBottom: 0, borderColor: "divider" }}>
              <TabList
                orientation={isSmallScreen ? "vertical" : "horizontal"}
                onChange={handleChanges}
                aria-label="lab API tabs example"
                style={{ marginLeft: "20px" }}
                className="d-flex flex-column flex-md-row flex-wrap"
              >
                <Tab
                  label="Dashboard"
                  value="1"
                  style={{
                    fontSize: 16,
                    fontFamily: "Gilroy",
                    color: "#4B4B4B",
                    lineHeight: "normal",
                    fontStyle: "normal",
                    fontWeight: 500,
                    textTransform: "none",
                  }}
                />
                <Tab
                  label="Announcement"
                  value="2"
                  style={{
                    fontSize: 16,
                    fontFamily: "Gilroy",
                    color: "#4B4B4B",
                    lineHeight: "normal",
                    fontStyle: "normal",
                    fontWeight: 500,
                    textTransform: "none",
                  }}
                />
                <Tab
                  label="Updates"
                  value="3"
                  style={{
                    fontSize: 16,
                    fontFamily: "Gilroy",
                    color: "#4B4B4B",
                    lineHeight: "normal",
                    fontStyle: "normal",
                    fontWeight: 500,
                    textTransform: "none",
                  }}
                />
              </TabList>
            </Box>
          </div>

          {loading && <LoaderComponent />}

          <div >
            <TabPanel value="1">
              {permissionError ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop:100
                  }}
                >

                  <img
                    src={Emptystate}
                    alt="Empty State"
                    
                  />


                  {permissionError && (
                    <div
                      style={{
                        color: "red",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        marginTop: "1rem",
                      }}
                    >
                      <MdError />
                      <span
                        style={{
                          fontSize: "12px",
                          color: "red",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        {permissionError}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div className="mt-4 dashboard-tab-one">
                    <div className=" my-4">
                      <div className="row g-3">
                        <div className="col-md-2">
                          <div
                            className="border rounded-4 p-4 shadow-sm text-start d-flex flex-column align-items-start justify-content-between bg-white"
                            style={{ minHeight: 160 }}
                          >
                            <div className="text-primary mb-2">
                              <i className="bi bi-house-door-fill fs-4"></i>
                            </div>
                            <h6 className="text-muted mb-1" style={{ fontFamily: "Gilroy" }}>Total Rooms</h6>
                            <h5 className="mb-0" style={{ fontFamily: "Gilroy" }}>
                              {dashboardList[0]?.roomCount || 0}
                            </h5>
                          </div>
                        </div>

                        <div className="col-md-3 d-flex flex-column gap-2">
                          <div className="border rounded-4   p-3 shadow-sm d-flex justify-content-between align-items-center bg-white">
                            <div>
                              <h6 className="text-muted mb-1" style={{ fontFamily: "Gilroy" }}>Total Beds</h6>
                              <h5 className="mb-0" style={{ fontFamily: "Gilroy" }}>
                                {dashboardList[0]?.TotalBed || 0}
                              </h5>
                            </div>
                            <img
                              src={clock}
                              width="30"
                              height="30"
                              alt="Bed Icon"
                            />
                          </div>
                          <div className="border rounded-4 p-3 shadow-sm d-flex justify-content-between align-items-center bg-white">
                            <div>
                              <h6 className="text-muted mb-1" style={{ fontFamily: "Gilroy" }}>Free Beds</h6>
                              <h5 className="mb-0" style={{ fontFamily: "Gilroy" }}>
                                {dashboardList[0]?.availableBed || 0}
                              </h5>
                            </div>
                            <img
                              src={key}
                              width="30"
                              height="30"
                              alt="Key Icon"
                            />
                          </div>
                        </div>

                        <div className="col-md-7">
                          <div
                            className="p-2 rounded-4"
                            style={{ backgroundColor: "#E0ECFF" }}
                          >
                            <div className="row g-2">
                              <div className="col-md-9">
                                <div className="row g-2">
                                  <div className="col-lg-6 col-md-12 col-sm-12">
                                    <div className="border rounded-4 p-3 shadow-sm bg-white text-start">
                                      <h6 className="text-muted contents mb-1" style={{ fontFamily: "Gilroy" }}>
                                        Occupied Beds
                                      </h6>
                                      <h5 className="mb-0 counts" style={{ fontFamily: "Gilroy" }}>
                                        {dashboardList[0]?.occupied_Bed || 0}
                                      </h5>
                                    </div>
                                  </div>
                                  <div className="col-lg-6 col-md-12 col-sm-12">
                                    <div className="border rounded-4 p-3 shadow-sm bg-white text-start">
                                      <h6 className="text-muted mb-1 contents" style={{ fontFamily: "Gilroy" }}>
                                        Next Month Projection
                                      </h6>
                                      <h5 className="mb-0 counts" style={{ fontFamily: "Gilroy" }}>
                                        {dashboardList[0]?.project_amount || 0}
                                      </h5>
                                    </div>
                                  </div>
                                  <div className="col-lg-6 col-md-12 col-sm-12">
                                    <div className="border rounded-4 p-3 shadow-sm bg-white text-start">
                                      <h6 className="text-muted mb-1 contents" style={{ fontFamily: "Gilroy" }}>
                                        Total Customers
                                      </h6>
                                      <h5 className="mb-0 counts" style={{ fontFamily: "Gilroy" }}>
                                        {dashboardList[0]?.customer_count || 0}
                                      </h5>
                                    </div>
                                  </div>
                                  <div className="col-lg-6 col-md-12 col-sm-12">
                                    <div className="border rounded-4 p-3 shadow-sm bg-white text-start">
                                      <h6 className="text-muted mb-1 contents" style={{ fontFamily: "Gilroy" }}>
                                        EB Amount
                                      </h6>
                                      <h5 className="mb-0 counts" style={{ fontFamily: "Gilroy" }}>
                                        {dashboardList[0]?.eb_amount || 0}
                                      </h5>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-3">
                                <div className="border rounded-4 px-3 py-4 shadow-sm bg-white text-start d-flex flex-column justify-content-between align-items-start h-100">
                                  <img
                                    src={vector}
                                    alt="Asset Icon"
                                    width="30"
                                    height="30"
                                    className="mb-3"
                                  />
                                  <p
                                    className="text-muted mb-1 small"
                                    style={{ fontFamily: "Gilroy" }}
                                  >
                                    Total Asset Value
                                  </p>
                                  <h5 className="mt-1" style={{ fontFamily: "Gilroy" }}>
                                    {dashboardList[0]?.asset_amount || 0}
                                  </h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>


                    <div className="row g-3">


                      <div className="col-12 col-md-6 col-lg-4">
                        <div className="d-flex align-items-center p-3 border rounded-4 bg-primary bg-opacity-10">
                          <div className="me-3  text-primary"><img src={advancedHand} alt="advancedhand" width={32} height={32} /></div>
                          <div>
                            <h6 className="text-muted " style={{ fontFamily: "Gilroy" }}>Advance in Hand</h6>
                            <div className="fw-semibold fs-5" style={{ fontFamily: "Gilroy" }}>₹ {dashboardList[0]?.advance_inhand || 0}</div>
                          </div>
                        </div>
                      </div>


                      <div className="col-12 col-md-6 col-lg-4">
                        <div className="d-flex align-items-center p-3 border rounded-4 bg-white">
                          <div className="me-3  text-primary"><img src={activeImage} alt="activeImage" width={32} height={32} /></div>
                          <div>
                            <h6 className="text-muted " style={{ fontFamily: "Gilroy" }}>Active Complaint</h6>
                            <div className="fw-semibold fs-5" style={{ fontFamily: "Gilroy" }}>{dashboardList[0]?.active_complaint || 0}</div>
                          </div>
                        </div>
                      </div>

                      <div className="col-12 col-md-6 col-lg-4">
                        <div className="d-flex align-items-center p-3 border rounded-4 bg-white">
                          <div className="me-3 text-primary"><img src={currentMatch} alt="currentMatch" width={32} height={32} /></div>
                          <div>
                            <h6 className="text-muted " style={{ fontFamily: "Gilroy" }}>Current Month Profit</h6>
                            <div className="fw-semibold fs-5" style={{ fontFamily: "Gilroy" }}>₹ {state.PgList.dashboardDetails.this_month_profit || 0}</div>
                          </div>
                        </div>
                      </div>


                      <div className="col-12 col-md-6 col-lg-4">
                        <div className="d-flex align-items-center p-3 border rounded-4 bg-white">
                          <div className="me-3  text-primary"><img src={coinImage} alt="coinImage" width={32} height={32} /></div>
                          <div>
                            <h6 className="text-muted " style={{ fontFamily: "Gilroy" }}>Other Profit</h6>
                            <div className="fw-semibold fs-5" style={{ fontFamily: "Gilroy" }}>₹{state.PgList.dashboardDetails.this_month_other_income || 0}</div>
                          </div>
                        </div>
                      </div>


                      <div className="col-12 col-md-6 col-lg-4">
                        <div className="d-flex align-items-center p-3 border rounded-4 bg-white">
                          <div className="me-3  text-primary"><img src={pendingimg} alt="coinImage" width={32} height={32} /></div>
                          <div>
                            <h6 className="text-muted " style={{ fontFamily: "Gilroy" }}>Pending invoice count</h6>
                            <div className="fw-semibold fs-5" style={{ fontFamily: "Gilroy" }}>{dashboardList[0]?.pending_invoice || 0}</div>
                          </div>
                        </div>
                      </div>


                      <div className="col-12 col-md-6 col-lg-4">
                        <div className="d-flex align-items-center p-3 border rounded-4 bg-white">
                          <div className="me-3  text-primary"><img src={newBooking} alt="coinImage" width={32} height={32} /></div>
                          <div>
                            <h6 className="text-muted " style={{ fontFamily: "Gilroy" }}>New booking</h6>
                            <div className="fw-semibold fs-5" style={{ fontFamily: "Gilroy" }}>{dashboardList[0]?.new_booking || 0}</div>
                          </div>
                        </div>
                      </div>

                    </div>


                    <div className="circulardes">
                      <div className="animated-text" style={{ flex: 1 }}>
                        <div
                          className="w-full"
                          style={{
                            paddingTop: "20px",
                            border: "1px solid #e0e0e0",
                            borderRadius: "20px",
                            backgroundColor: "#fff",

                            paddingRight: 20,
                            width: "98%",
                            marginTop: 10,
                          }}
                        >

                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: "10px 10px",
                              marginTop: "-15px",
                            }}
                          >

                            <div
                              style={{
                                flex: "1 1 60%",
                                minWidth: "200px",
                                paddingLeft: 15,
                              }}
                            >
                              <p
                                style={{
                                  fontFamily: "Montserrat",
                                  fontSize: 18,
                                  fontWeight: 600,
                                  margin: 12,
                                  whiteSpace: "nowrap"
                                }}
                              >
                                Expenses Vs Revenue
                              </p>
                            </div>


                            <div
                              style={{
                                flex: "1 1 40%",
                                minWidth: "150px",
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                            >
                              <div
                                style={{
                                  position: "relative",
                                  width: "100%",
                                  maxWidth: 250,
                                  height: 36,

                                }}
                              >
                                <select
                                  value={selectRevenu}
                                  onChange={(e) => handleSelectedRevenue(e)}
                                  style={{
                                    fontSize: 12,
                                    color: "#4B4B4B",
                                    fontFamily: "Gilroy",
                                    fontWeight: 600,
                                    boxShadow: "none",
                                    border: "1px solid #D9D9D9",
                                    height: 36,
                                    width: "100%",
                                    borderRadius: 60,
                                    padding: "6px 10px",
                                    appearance: "none",
                                    background: `url(${drop}) no-repeat right 10px center`,
                                    backgroundSize: "16px 16px",
                                    cursor: "pointer",
                                  }}
                                >
                                  <option value="six_month">last six months</option>
                                  <option value="this_year">this year</option>
                                  <option value="last_year">last year</option>
                                </select>
                              </div>
                            </div>
                          </div>




                          <div
                            className="chart-container"
                            style={{
                              position: "relative",
                              height: 350,
                              overflowX: "auto",
                            }}
                          >
                            <div
                              className="chart-wrapper"
                              style={{
                                minWidth: "100%",
                              }}
                            >
                              <ResponsiveContainer width="100%" height={350}>
                                <BarChart
                                  data={data}
                                  margin={{
                                    top: 10,
                                    left: 20,
                                    bottom: 40,
                                    right: 10,
                                  }}
                                  barGap={0}
                                  barCategoryGap="5%"
                                >
                                  <CartesianGrid
                                    horizontal
                                    vertical={false}
                                    stroke="#e0e0e0"
                                  />
                                  <XAxis
                                    dataKey="month"
                                    interval="auto"
                                    tick={{
                                      fontFamily: "Gilroy",
                                      fontSize: 12,
                                      fontWeight: 500,
                                    }}
                                    tickFormatter={(month) => {
                                      const date = new Date(`${month}-01`);
                                      return date.toLocaleDateString("en-US", {
                                        month: "short",
                                      });
                                    }}
                                  />
                                  <YAxis
                                    domain={[0, "dataMax"]}
                                    axisLine={false}
                                    tickLine={false}
                                    tickCount={12}
                                    dx={-10}
                                    tick={{
                                      fontFamily: "Gilroy",
                                      fontSize: 12,
                                      fontWeight: 500,
                                    }}
                                  />
                                  <Tooltip formatter={(value) => `${value}`} />
                                  <Bar
                                    dataKey="revenue"
                                    fill="#00A32E"
                                    barSize={50}
                                    radius={[5, 5, 0, 0]}
                                  >
                                    <LabelList
                                      dataKey="revenue"
                                      position="inside"
                                      angle={270}
                                      style={{
                                        fill: "white",
                                        fontSize: 12,
                                        fontWeight: "bold",
                                      }}
                                    />
                                  </Bar>
                                  <Bar
                                    dataKey="expense"
                                    fill="#E34B4B"
                                    barSize={50}
                                    radius={[5, 5, 0, 0]}
                                  >
                                    <LabelList
                                      dataKey="expense"
                                      position="inside"
                                      angle={270}
                                      style={{
                                        fill: "white",
                                        fontSize: 12,
                                        fontWeight: "bold",
                                      }}
                                    />
                                  </Bar>
                                  <Legend
                                    content={<CustomLegend />}
                                    verticalAlign="bottom"
                                    height={36}
                                  />
                                </BarChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                        </div>

                        <Card
                          className="animated-text mt-4"
                          style={{

                            height: "30%",
                            width: "97%",
                            borderRadius: "20px",
                          }}
                        >
                          <Card.Body>
                            <div
                              style={{
                                display: "flex",
                                flexWrap: "wrap",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "10px 10px",
                                marginTop: "-15px",
                              }}
                            >

                              <div
                                style={{
                                  flex: "1 1 60%",
                                  minWidth: "200px",
                                  paddingLeft: 10,
                                  marginBottom: 10,
                                }}
                              >
                                <p
                                  style={{
                                    fontFamily: "Montserrat",
                                    fontSize: 18,
                                    fontWeight: 600,
                                    margin: 12,
                                    whiteSpace: "nowrap"
                                  }}
                                >
                                  Total Cashback
                                </p>
                              </div>


                              <div
                                style={{
                                  flex: "1 1 40%",
                                  minWidth: "150px",
                                  display: "flex",
                                  justifyContent: "flex-end",
                                  marginTop: "-10px"
                                }}
                              >
                                <div
                                  style={{
                                    position: "relative",
                                    width: "100%",
                                    maxWidth: 250,
                                    height: 36,

                                  }}
                                >
                                  <select
                                    value={selectCashback}
                                    onChange={(e) => handleSelectedReceived(e)}
                                    style={{
                                      fontSize: 12,
                                      color: "#4B4B4B",
                                      fontFamily: "Gilroy",
                                      fontWeight: 600,
                                      boxShadow: "none",
                                      border: "1px solid #D9D9D9",
                                      height: 36,
                                      width: "100%",
                                      borderRadius: 60,
                                      padding: "6px 10px",
                                      appearance: "none",
                                      background: `url(${drop}) no-repeat right 10px center`,
                                      backgroundSize: "16px 16px",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <option value="this_month">This month</option>
                                    <option value="last_month">Last month</option>
                                    <option value="last_three_months">
                                      Last 3 months
                                    </option>
                                    <option value="last_six_months">
                                      Last 6 months
                                    </option>
                                    <option value="this_year">Last 1 year</option>
                                  </select>
                                </div>
                              </div>
                            </div>

                            <div className="d-flex flex-wrap align-items-center">

                              <div
                                className="flex-shrink-0 me-3"
                                style={{
                                  width: "40%",
                                  marginLeft: 15,
                                  marginTop: 5,
                                   fontFamily: "Gilroy",
                                }}
                              >
                                <CircularProgressbar
                                  value={percentage}
                                  
                                  text={`₹${currentvalue || 0}`}
                                  circleRatio={0.5}
                                  styles={buildStyles({
                                    rotation: 0.75,
                                    pathColor: pathColor,
                                    trailColor: trailColor,
                                    textColor: "#000",
                                    textSize: 9,
                                    text: {
                                      fill: "#000",
                                      transform: "rotate(80deg)",
                                      transformOrigin: "center center",
                                      fontFamily: "Gilroy",
                                      fontWeight: 600,
                                      fontSize: "24px",
                                    },
                                  })}
                                />
                              </div>

                              <div className="d-flex flex-column ms-auto pe-5" style={{ marginTop: "-50px" }}>
                                <div className="d-flex align-items-center ">
                                  <div
                                    className="bg-success rounded-circle me-2"
                                    style={{ width: "15px", height: "15px", marginTop: "-25px" }}
                                  ></div>
                                  <div>
                                    <p
                                      className="m-0 "
                                      style={{
                                        fontSize: 12,
                                        fontWeight: 500,
                                        fontFamily: "Gilroy",
                                      }}
                                    >
                                      Received
                                    </p>
                                    <p style={{
                                      fontSize: 13,
                                      fontWeight: 600,
                                      fontFamily: "Montserrat",
                                      marginTop: 2
                                    }}>
                                      ₹{cashBackData?.[0]?.Revenue || 0}
                                    </p>
                                  </div>
                                </div>
                                <div className="d-flex align-items-center">
                                  <div
                                    className="rounded-circle me-2"
                                    style={{
                                      width: "15px",
                                      height: "15px",
                                      backgroundColor: "#EBEBEB",
                                      marginTop: "-25px"
                                    }}
                                  ></div>
                                  <div>
                                    <p
                                      className="m-0 "
                                      style={{
                                        fontSize: 12,
                                        fontWeight: 500,
                                        fontFamily: "Gilroy",
                                      }}
                                    >
                                      Pending
                                    </p>
                                    <p style={{
                                      fontSize: 13,
                                      fontWeight: 600,
                                      fontFamily: "Montserrat",
                                      marginTop: 2
                                    }}>
                                      ₹{cashBackData?.[0]?.overdue || 0}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      </div>

                      <div style={{ flex: 1 }}>
                        <div
                          className="bg-white rounded-2xl  p-4 md:p-6 w-full max-w-4xl mx-auto overflow-x-auto card rounded-full mt-2"
                          style={{ flex: 1, height: "auto", width: "99%", borderRadius: "24px" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: "10px 10px",
                              marginTop: "-15px",
                            }}
                          >
                            <div
                              style={{
                                flex: "1 1 60%",
                                textAlign: "start",
                                paddingLeft: 0,
                                marginBottom: "10px",
                              }}
                            >
                              <p
                                style={{
                                  fontFamily: "Montserrat",
                                  fontSize: 18,
                                  fontWeight: 600,
                                  margin: 0,
                                  whiteSpace: "nowrap"
                                }}
                              >
                                Advance VS Advance Return
                              </p>
                            </div>


                            <div
                              style={{
                                flex: "1 1 40%",
                                maxWidth: "300px",
                                marginLeft: "auto",
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                            >
                              <div
                                style={{
                                  position: "relative",
                                  width: "100%",
                                  height: 36,
                                }}
                              >
                                <select
                                  value={selectAdvance}
                                  onChange={(e) => handleSelectedAdvance(e)}
                                  style={{
                                    fontSize: 12,
                                    color: "#4B4B4B",
                                    fontFamily: "Gilroy",
                                    fontWeight: 600,
                                    boxShadow: "none",
                                    border: "1px solid #D9D9D9",
                                    height: 36,
                                    width: "100%",
                                    maxWidth: "180px",
                                    borderRadius: 60,
                                    padding: "6px 10px",
                                    appearance: "none",
                                    background: `url(${drop}) no-repeat right 10px center`,
                                    backgroundSize: "16px 16px",
                                    cursor: "pointer",
                                  }}
                                >
                                  <option value="six_month">
                                    last six months
                                  </option>
                                  <option value="this_year">this year</option>
                                  <option value="last_year">last year</option>
                                </select>
                              </div>
                            </div>
                          </div>



                          <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={formattedChart}>
                              <CartesianGrid stroke="#e0e0e0" strokeDasharray="0" vertical={false} />

                              <XAxis
                                dataKey="name"
                                tickFormatter={(tick) => {
                                  const date = new Date(tick);
                                  return date.toLocaleString('default', { month: 'short', year: 'numeric' });
                                }}
                                tick={{ fontSize: 12, fontFamily: "Gilroy", fontWeight: 500, fill: "#333" }}
                                axisLine={false}
                                tickLine={false}
                              />

                              <YAxis axisLine={false} tickLine={false} />
                              <Tooltip />
                              <Legend
                                verticalAlign="bottom"
                                align="center"
                                iconType="circle"
                                wrapperStyle={{ marginTop: 10, fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}
                              />
                              <Line
                                type="monotone"
                                dataKey="Advance"
                                stroke="#3366FF"
                                strokeWidth={2}
                                dot={{ r: 4 }}


                              />
                              <Line
                                type="monotone"
                                dataKey="Advance Return"
                                stroke="#FF5733"
                                strokeWidth={2}
                                dot={{ r: 4 }}

                              />
                            </LineChart>
                          </ResponsiveContainer>



                        </div>
                        <div className="expenses-container animated-text mt-4">
                          <div className="dropp d-flex justify-content-between align-items-center flex-wrap py-2 px-3">

                            <div className="d-flex text-start mb-2">
                              <p
                                style={{
                                  fontFamily: "Montserrat",
                                  fontSize: 18,
                                  fontWeight: 600,
                                  paddingLeft: 10,
                                  margin: 0,
                                }}
                              >
                                Expenses
                              </p>
                            </div>


                            <div
                              className="d-flex justify-content-end align-items-center mb-2"
                              style={{ width: "100%", maxWidth: 200 }}
                            >
                              <select
                                aria-label="Default select example"
                                onChange={(e) => handleSelectedExpenses(e)}
                                value={selectExpence}
                                style={{
                                  fontSize: 12,
                                  color: "#4B4B4B",
                                  fontFamily: "Gilroy",
                                  fontWeight: 600,
                                  boxShadow: "none",
                                  border: "1px solid #D9D9D9",
                                  height: 36,
                                  width: "100%",
                                  borderRadius: 60,
                                  paddingTop: 6,
                                  paddingBottom: 6,
                                  paddingRight: 30 /* Allow space for icon */,
                                  paddingLeft: 10,
                                  appearance: "none",
                                  background: `url(${drop}) no-repeat right 10px center`,
                                  backgroundSize: "16px 16px",
                                  cursor: "pointer",
                                }}
                              >
                                <option value="this_month">This month</option>
                                <option value="last_month">Last month</option>
                                <option value="last_three_months">
                                  Last 3 months
                                </option>
                                <option value="last_six_months">
                                  Last 6 months
                                </option>
                                <option value="this_year">This year</option>
                              </select>
                            </div>
                          </div>


                          <div
                            className="content"
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              justifyContent: "space-between",
                            }}
                          >

                            <div className="chart" style={{ flex: "1" }}>
                              {lablesdata && lablesdata?.length > 0 ? (
                                <Doughnut
                                  className="doughnut"
                                  data={datum}
                                  options={options}
                                  style={{ width: 196, height: 196 }}
                                />
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="196"
                                  height="196"
                                  viewBox="0 0 196 196"
                                  fill="none"
                                >
                                  <path
                                    d="M196 98C196 152.124 152.124 196 98 196C43.8761 196 0 152.124 0 98C0 43.8761 43.8761 0 98 0C152.124 0 196 43.8761 196 98ZM29.4 98C29.4 135.887 60.1133 166.6 98 166.6C135.887 166.6 166.6 135.887 166.6 98C166.6 60.1133 135.887 29.4 98 29.4C60.1133 29.4 29.4 60.1133 29.4 98Z"
                                    fill="#DCDCDC"
                                  />
                                </svg>
                              )}
                              <p
                                className="center-text"
                                style={{
                                  fontFamily: "Gilroy",
                                  fontSize: 25,
                                  fontWeight: 600,
                                  textAlign: "center",
                                  marginTop: "10px",
                                }}
                              >
                                ₹{totalAmount > 0 ? totalAmount : 0}
                              </p>
                            </div>


                            <div
                              className="categories"
                              style={{
                                flex: "1",
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: "20px",
                              }}
                            >
                              {lablesdata && lablesdata?.length > 0 ? (
                                lablesdata?.map((label, index) => (
                                  <div
                                    className="category"
                                    key={index}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "10px",
                                    }}
                                  >
                                    <span
                                      className="dot"
                                      style={{
                                        backgroundColor:
                                          datasets[0].backgroundColor[index],
                                        width: "10px",
                                        height: "10px",
                                        borderRadius: "50%",
                                      }}
                                    ></span>
                                    <div
                                      className="text"
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                      }}
                                    >
                                      <p
                                        style={{
                                          fontFamily: "Montserrat",
                                          fontSize: 12,
                                          fontWeight: 600,
                                          color: "#4B4B4B",
                                          margin: 0,
                                        }}
                                      >
                                        {label.category_Name}
                                      </p>
                                      <p
                                        style={{
                                          fontFamily: "Gilroy",
                                          fontSize: 16,
                                          fontWeight: 600,
                                          margin: 0,
                                        }}
                                      >
                                        ₹{label.purchase_amount}
                                      </p>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div
                                  className="no-data-category"
                                  style={{
                                    textAlign: "center",
                                    width: "100%",
                                    marginTop: "25px",
                                    color: "red",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  <p>No Data</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>


                      </div>
                    </div>
                  </div>
                </>
              )}
            </TabPanel>

            <TabPanel value="2" >
              <DashboardAnnouncement
               
                AnnouncementAddPermission = {AnnouncementAddPermission}
                AnnouncementEditPermission = {AnnouncementEditPermission}
                AnnouncementDeletePermission = {AnnouncementDeletePermission}
              />
            </TabPanel>

            <TabPanel value="3">
              <DashboardUpdates updatePermissionError={updatePermissionError} />
            </TabPanel>
          </div>
        </TabContext>
      </div>
    </>
  );
}
Dashboard.propTypes = {
  payload: PropTypes.func.isRequired,
  displayCompliance: PropTypes.func.isRequired,
  billAddPermission: PropTypes.func.isRequired,
};

export default Dashboard;

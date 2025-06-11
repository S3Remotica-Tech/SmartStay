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
// import Profile from "../Assets/Images/New_images/profile-picture.png";
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
// import { Table } from "react-bootstrap";
import LoaderComponent from "./LoaderComponent";
import PropTypes from "prop-types";
import Marquee from "react-fast-marquee";
import pendingimg from "../Assets/Images/New_images/pending_rent.png";
import currentMatch from "../Assets/Images/New_images/currentmatch.png";
import activeImage from "../Assets/Images/New_images/Active compliant.png";
import coinImage from "../Assets/Images/New_images/coinimage.png";
import advancedHand from "../Assets/Images/New_images/AdvancedHand.png";
import newBooking from "../Assets/Images/New_images/NewBooking.png";


// const newChart = [
//   { name: "Jan 2024", Advance: 10000, AdvanceReturn: 9000 },
//   { name: "Feb 2024", Advance: 15000, AdvanceReturn: 13000 },
//   { name: "Mar 2024", Advance: 20000, AdvanceReturn: 18000 },
//   { name: "Apr 2024", Advance: 25000, AdvanceReturn: 23000 },
//   { name: "May 2024", Advance: 20000, AdvanceReturn: 18000 },
//   { name: "Jun 2024", Advance: 15000, AdvanceReturn: 14000 },
// ];

function Dashboard() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [dashboardList, setDashboardList] = useState([]);
  const [lablesdata, setLables] = useState([]);
  const [totalAmount, setTotalAmount] = useState([]);
  // const [activecommpliance, setActivecommpliance] = useState([]);
  const [rolePermission, setRolePermission] = useState("");
  const [permissionError, setPermissionError] = useState("");
  const [announcePermissionError, setAnnouncePermissionError] = useState("");
  const [updatePermissionError, setupdatePermissionError] = useState("");
  const [value, setValue] = React.useState("1");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectExpence, setSelectExpence] = useState("this_month");
  const [selectCashback, setSelectCashback] = useState("this_month");
  const [cashBackData, setCashBackData] = useState("");
  const [selectRevenu, setSelectRevenu] = useState("six_month");
  const [hostel_id, setHostel_Id] = useState("");
  const [loading, setLoading] = useState(true);
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

  // useEffect(() => {
  //   dispatch({ type: "ACCOUNTDETAILS" });
  // }, []);



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
      const diffInDays = Math.floor(
        (planEndDate - currentDate) / (1000 * 60 * 60 * 24)
      );

      setDaysLeft(diffInDays);
      if (diffInDays <= 19) {
        setShowWarning(true);
      } else {
        setShowWarning(false);
      }
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
    // if(hostel_id){
    setLoading(true);
    dispatch({
      type: "DASHBOARDFILTERCASHBACK",
      payload: {
        type: "cashback",
        range: selectCashback,
        hostel_id: hostel_id,
      },
    });
    // }
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
  console.log("state.PgList?.statusCodeForAdvanceFilter",state.PgList?.dashboardFilterAdvance)

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
    // dispatch({ type: "DASHBOARDFILTER", payload: { type:'expenses',range:e.target.value}});
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
    if (
      rolePermission[0]?.is_owner === 1 ||
      rolePermission[0]?.role_permissions[0]?.per_view === 1
    ) {
      setPermissionError("");
    } else {
      setPermissionError("Permission Denied");
    }

    // if (rolePermission) {
    //   setPermissionError('No role permissions found.');
    // } else if (rolePermission?.[0]?.is_owner === 0) {
    //   setPermissionError('Permission Denied');
    // } else {
    //   setPermissionError('');
    // }
  }, [rolePermission]);

  useEffect(() => {
    if (
      rolePermission[0]?.is_owner === 1 ||
      rolePermission[0]?.role_permissions[1]?.per_view === 1
    ) {
      setAnnouncePermissionError("");
    } else {
      setAnnouncePermissionError("Permission Denied");
    }
  }, [rolePermission]);

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

  // const handlecompliance = (compliance) => {
  //   props.displayCompliance(compliance);
  // };

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

  // useEffect(() => {
  //   setActivecommpliance(state.PgList.dashboardDetails?.com_data);
  // }, [state.PgList.dashboardDetails?.com_data]);

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
    const monthYear = date.toISOString().substring(0, 7); // Format: YYYY-MM
    months.push({ month: monthYear, revenue: 0, expense: 0 });
  }

  const fixedColors = [
    "#FF6384", // Red
    "#36A2EB", // Blue
    "#FFCE56", // Yellow
    "#4BC0C0", // Teal
    "#9966FF", // Purple
    "#FF9F40", // Orange
    "#E7E9ED", // Light Grey
    "#8DD35F", // Green
    "#D65DB1", // Pink
    "#6A4C93", // Dark Purple
  ];

  const datum = {
    labels: lablesdata?.map((category) => category.category_Name),
    datasets: [
      {
        data: lablesdata?.map((category) => category.purchase_amount),
        backgroundColor: lablesdata?.map(
          (_, index) => fixedColors[index % fixedColors.length]
        ), // Use colors from the fixed array
        hoverBackgroundColor: lablesdata?.map(
          (_, index) => fixedColors[index % fixedColors.length]
        ), // Keep hover colors the same
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

  // if (!datasets || datasets.length === 0 || !datasets[0].backgroundColor) {
  //   return (
  //     <div
  //       className="d-flex justify-content-center align-items-start gap-3"
  //       style={{ height: "100%" }}
  //     >
  //       <Spinner animation="grow" style={{ color: "rgb(30, 69, 225)" }} />{" "}
  //       <div style={{ color: "rgb(30, 69, 225)", fontWeight: 600 }}>
  //         Loading.....
  //       </div>
  //     </div>
  //   );
  // }

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
      <div className="cotainer">
        <Marquee>
          {/* {showWarning && (
        <div className="alert alert-warning mt-3" role="alert">
          ⚠️ Your plan will expire in {Math.floor((new Date(accountList[0]?.plan_end_date) - new Date()) / (1000 * 60 * 60 * 24))} days!
        </div>
      )} */}
          {/* {showWarning && (
        <div className="alert alert-warning mt-3 d-flex justify-content-between align-items-center" role="alert">
          ⚠️ Your plan will expire in {daysLeft} days!
          <button className="btn btn-sm btn-primary ms-3" onClick={handleOkClick}>OK</button>
        </div>
      )} */}
          {showWarning && (
            <div
              className="alert alert-warning mt-3 d-flex justify-content-between align-items-center"
              role="alert"
            >
              {daysLeft > 0 ? (
                <>
                  ⚠️ Your plan will expire in {daysLeft} day
                  {daysLeft > 1 ? "s" : ""}!
                  <button
                    className="btn btn-sm btn-primary ms-3"
                    onClick={handleOkClick}
                  >
                    OK
                  </button>
                </>
              ) : (
                <>
                  ❌ Your plan has expired!
                  <button
                    className="btn btn-sm btn-primary ms-3"
                    onClick={handleOkClick}
                  >
                    OK
                  </button>
                </>
              )}
            </div>
          )}
        </Marquee>
        <TabContext value={value}>
          <div
            className="container-fluid px-2"
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1000,
              backgroundColor: "#FFFFFF",
              width: "100%",
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

          <div style={{ maxHeight: "calc(100vh - 83px)", overflowY: "auto" }}>
            <TabPanel value="1">
              {permissionError ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* Image */}
                  <img
                    src={Emptystate}
                    alt="Empty State"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />

                  {/* Permission Error */}
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
                            <h6 className="text-muted mb-1">Total Rooms</h6>
                            <h5 className="mb-0">
                              {dashboardList[0]?.roomCount || 0}
                            </h5>
                          </div>
                        </div>

                        <div className="col-md-3 d-flex flex-column gap-2">
                          <div className="border rounded-4   p-3 shadow-sm d-flex justify-content-between align-items-center bg-white">
                            <div>
                              <h6 className="text-muted mb-1">Total Beds</h6>
                              <h5 className="mb-0">
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
                              <h6 className="text-muted mb-1">Free Beds</h6>
                              <h5 className="mb-0">
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
                                      <h6 className="text-muted contents mb-1">
                                        Occupied Beds
                                      </h6>
                                      <h5 className="mb-0 counts">
                                        {dashboardList[0]?.occupied_Bed || 0}
                                      </h5>
                                    </div>
                                  </div>
                                  <div className="col-lg-6 col-md-12 col-sm-12">
                                    <div className="border rounded-4 p-3 shadow-sm bg-white text-start">
                                      <h6 className="text-muted mb-1 contents">
                                        Next Month Projection
                                      </h6>
                                      <h5 className="mb-0 counts">
                                        {dashboardList[0]?.project_amount || 0}
                                      </h5>
                                    </div>
                                  </div>
                                  <div className="col-lg-6 col-md-12 col-sm-12">
                                    <div className="border rounded-4 p-3 shadow-sm bg-white text-start">
                                      <h6 className="text-muted mb-1 contents">
                                        Total Customers
                                      </h6>
                                      <h5 className="mb-0 counts">
                                        {dashboardList[0]?.customer_count || 0}
                                      </h5>
                                    </div>
                                  </div>
                                  <div className="col-lg-6 col-md-12 col-sm-12">
                                    <div className="border rounded-4 p-3 shadow-sm bg-white text-start">
                                      <h6 className="text-muted mb-1 contents">
                                        EB Amount
                                      </h6>
                                      <h5 className="mb-0 counts">
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
                                  <h5 className="mt-1">
                                    {dashboardList[0]?.asset_amount || 0}
                                  </h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
      
  <div className="container">
    <div className="row g-3">

     
      <div className="col-12 col-md-6 col-lg-4">
        <div className="d-flex align-items-center p-3 border rounded-4 bg-primary bg-opacity-10">
          <div className="me-3  text-primary"><img src={advancedHand} alt="advancedhand" width={32} height={32} /></div>
          <div>
            <h6 className="text-muted ">Advance in Hand</h6>
            <div className="fw-semibold fs-5">₹ {dashboardList[0]?.advance_inhand || 0}</div>
          </div>
        </div>
      </div>

     
      <div className="col-12 col-md-6 col-lg-4">
        <div className="d-flex align-items-center p-3 border rounded-4 bg-white">
          <div className="me-3  text-primary"><img src={activeImage} alt="activeImage" width={32} height={32} /></div>
          <div>
            <h6 className="text-muted ">Active Complaint</h6>
            <div className="fw-semibold fs-5">{dashboardList[0]?.active_complaint || 0}</div>
          </div>
        </div>
      </div>

      <div className="col-12 col-md-6 col-lg-4">
        <div className="d-flex align-items-center p-3 border rounded-4 bg-white">
          <div className="me-3 text-primary"><img src={currentMatch} alt="currentMatch" width={32} height={32} /></div>
          <div>
            <h6 className="text-muted ">Current Month Profit</h6>
            <div className="fw-semibold fs-5">₹ 84,550</div>
          </div>
        </div>
      </div>


      <div className="col-12 col-md-6 col-lg-4">
        <div className="d-flex align-items-center p-3 border rounded-4 bg-white">
          <div className="me-3  text-primary"><img src={coinImage} alt="coinImage" width={32} height={32} /></div>
          <div>
            <h6 className="text-muted ">Other Profit</h6>
            <div className="fw-semibold fs-5">₹ 73,800</div>
          </div>
        </div>
      </div>

     
      <div className="col-12 col-md-6 col-lg-4">
        <div className="d-flex align-items-center p-3 border rounded-4 bg-white">
          <div className="me-3  text-primary"><img src={pendingimg} alt="coinImage" width={32} height={32} /></div>
          <div>
            <h6 className="text-muted ">Pending invoice count</h6>
            <div className="fw-semibold fs-5">{dashboardList[0]?.pending_invoice || 0}</div>
          </div>
        </div>
      </div>

     
      <div className="col-12 col-md-6 col-lg-4">
        <div className="d-flex align-items-center p-3 border rounded-4 bg-white">
          <div className="me-3  text-primary"><img src={newBooking} alt="coinImage" width={32} height={32} /></div>
          <div>
            <h6 className="text-muted ">New booking</h6>
            <div className="fw-semibold fs-5">{dashboardList[0]?.new_booking || 0}</div>
          </div>
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
                            // marginLeft: "-3px",
                            paddingRight: 20,
                            width: "98%",
                            marginTop: 10,
                          }}
                        >
                          {/* Header Section */}
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
  {/* Left Side - Title */}
  <div
    style={{
      flex: "1 1 60%",
      minWidth: "200px",
      paddingLeft: 15,
      marginBottom: 10,
    }}
  >
    <p
      style={{
        fontFamily: "Montserrat",
        fontSize: 18,
        fontWeight: 600,
        margin: 12,
       whiteSpace:"nowrap"
      }}
    >
      Expenses Vs Revenue
    </p>
  </div>

  {/* Right Side - Dropdown */}
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



                          {/* Chart Section */}
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
                                      }); // Only "Jan", "Feb", etc.
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
                          className="animated-text"
                          style={{
                            marginTop: 15,
                            height: "auto",
                            width: "97%",
                            borderRadius: "20px",
                          }}
                        >
                          <Card.Body>
                            <div className="d-flex justify-content-between flex-wrap align-items-center">
                              <p
                                style={{
                                  fontFamily: "Montserrat",
                                  fontSize: 18,
                                  fontWeight: 600,
                                  whiteSpace: "nowrap",
                                }}
                              >
                                Receivable vs Pending
                              </p>
                              <div>
                                <select
                                  onChange={(e) => handleSelectedReceived(e)}
                                  value={selectCashback}
                                  className="form-select rounded-pill border-secondary"
                                  style={{
                                    width: "150px",
                                    backgroundImage: `url(${drop})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "right 10px center",
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

                            <div className="d-flex flex-wrap align-items-center">
                              {/* Circular Progress Bar */}
                              <div
                                className="flex-shrink-0 me-3"
                                style={{
                                  width: "40%",
                                  marginLeft: 15,
                                  marginTop: 5,
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
                                    textSize: 15,
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

                              {/* Status Section - Aligned to Right */}
                              <div className="d-flex flex-column ms-auto pe-5">
                                <div className="d-flex align-items-center mb-2">
                                  <div
                                    className="bg-success rounded-circle me-2"
                                    style={{ width: "15px", height: "15px" }}
                                  ></div>
                                  <div>
                                    <p
                                      className="m-0 "
                                      style={{
                                        fontSize: 16,
                                        fontWeight: 600,
                                        fontFamily: "Montserrat",
                                      }}
                                    >
                                      Received
                                    </p>
                                    <p className="m-0 fw-semibold fs-6">
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
                                    }}
                                  ></div>
                                  <div>
                                    <p
                                      className="m-0 "
                                      style={{
                                        fontSize: 16,
                                        fontWeight: 600,
                                        fontFamily: "Montserrat",
                                      }}
                                    >
                                      Receivable
                                    </p>
                                    <p className="m-0 fw-semibold fs-6">
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
                          style={{ flex: 1,height:"auto",width:"97%",borderRadius:"24px" }}
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
                                  whiteSpace:"nowrap"
                                }}
                              >
                                 Advance VS Advance Return
                              </p>
                            </div>

                            {/* Select Dropdown */}
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
    {/* <XAxis dataKey="name" /> */}
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

    <YAxis   axisLine={false} tickLine={false}/>
    <Tooltip />
    <Legend
      verticalAlign="bottom"
      align="center"
      iconType="circle"
      wrapperStyle={{ marginTop: 10,fontSize:12,fontFamily:"Gilroy",fontWeight:500 }}
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
      dataKey="AdvanceReturn"
      stroke="#FF5733"
      strokeWidth={2}
      dot={{ r: 4 }}
     
    />
  </LineChart>
</ResponsiveContainer>



                        </div>
                        <div className="expenses-container animated-text">
                          <div className="dropp d-flex justify-content-between align-items-center flex-wrap py-2 px-3">
                            {/* Left Section: Expenses Text */}
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

                            {/* Right Section: Dropdown */}
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

                          {/* Content Section */}
                          <div
                            className="content"
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              justifyContent: "space-between",
                            }}
                          >
                            {/* Chart Section */}
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

                            {/* Categories Section */}
                            <div
                              className="categories"
                              style={{
                                flex: "1",
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr", // Two columns
                                gap: "20px", // Space between items
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
                                        flexDirection: "column", // Arrange items vertically
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
                announcePermissionError={announcePermissionError}
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

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
import Profile from "../Assets/Images/New_images/profile-picture.png";
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
import {BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer,Label,LabelList,} from "recharts";
import { MdError } from "react-icons/md";
import Emptystate from "../Assets/Images/Empty-State.jpg";
import { Table } from "react-bootstrap";
import LoaderComponent from "./LoaderComponent";
import PropTypes from "prop-types";

function Dashboard(props) {
  

  const state = useSelector((state) => state);
  console.log("dash",state)
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [dashboardList, setDashboardList] = useState([]);
  const [lablesdata, setLables] = useState([]);
  const [totalAmount, setTotalAmount] = useState([]);
  const [activecommpliance, setActivecommpliance] = useState([]);
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

  useEffect(() => {
    if(state.login.selectedHostel_Id){
      setHostel_Id(state.login.selectedHostel_Id);
    }    
  }, [state.login.selectedHostel_Id]);

  console.log("state",state.login.selectedHostel_Id);
  

  const handleSelectedReceived = (e) => {
    setSelectCashback(e.target.value);
  };
  const handleSelectedRevenue = (e) => {
    setSelectRevenu(e.target.value);
  };

  useEffect(() => {
    setLoading(true);
    if(hostel_id){
      dispatch({ type: "PGDASHBOARD", payload: { hostel_id: hostel_id } });
    }
    
  }, [hostel_id]);

  useEffect(() => {
    if(hostel_id){
      dispatch({
        type: "DASHBOARDFILTERCASHBACK",
        payload: {
          type: "cashback",
          range: selectCashback,
          hostel_id: hostel_id,
        },
      });
    }
  
  }, [selectCashback, hostel_id]);
  useEffect(() => {

    if(hostel_id){
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
      setLoading(false)
      setTimeout(() => {
        dispatch({ type: "CLEAR_DASHBOARD_FILTER_DETAILS_CASHBACK" });
      }, 1000);
    }
  }, [state.PgList?.statusCodeForDashboardFilterCashBack]);

  const handleSelectedExpenses = (e) => {
    setSelectExpence(e.target.value);
    // dispatch({ type: "DASHBOARDFILTER", payload: { type:'expenses',range:e.target.value}});
  };
  useEffect(() => {
   if(hostel_id){
    dispatch({
      type: "DASHBOARDFILTER",
      payload: { type: "expenses", range: selectExpence, hostel_id: hostel_id },
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
    const appearOnScro1l = new IntersectionObserver(function (
      entries
    ) {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        } else {
          entry.target.classList.add("appear");
          appearOnScro1l.unobserve(entry.target);
        }
      });
    },
    appearOptions);
    faders.forEach((fader) => {
      appearOnScro1l.observe(fader);
    });
  });

  useEffect(() => {
    setTotalAmount(state.PgList?.dashboardFilter?.total_amount);
  }, [state.PgList?.dashboardFilter?.total_amount]);

  const handlecompliance = (compliance) => {
    props.displayCompliance(compliance);
  };

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

  // useEffect(() => {
  //   setData(state.PgList?.dashboardFilterRevenu?.response?.cash_back_data);
  // }, [state.PgList?.dashboardFilterRevenu?.response?.cash_back_data]);

 

  console.log("loading",state.PgList.statuscodeForDashboard);
  

  useState(()=>{
    
  if(state.PgList.statuscodeForDashboard === 200){

    
  setTimeout(() => {   
    dispatch({ type: "CLEAR_CREATE_PG_DASHBOARD" });
  }, 200);
}
  },[state.PgList.statuscodeForDashboard])

  useEffect(() => {
    if (state.PgList?.dashboardDetails?.dashboardList) {
      setDashboardList(state.PgList.dashboardDetails.dashboardList);
    }
  }, [state.PgList.dashboardDetails.dashboardList]);

  useEffect(() => {
    setActivecommpliance(state.PgList.dashboardDetails?.com_data);
  }, [state.PgList.dashboardDetails?.com_data]);


  useEffect(() => {
    setCashBackData(
      state.PgList?.dashboardFilterCashback?.cash_back_data
    );
  }, [state.PgList?.dashboardFilterCashback?.cash_back_data]);

  const currentvalue =
    (Number(cashBackData?.[0]?.Revenue) || 0) + (Number(cashBackData?.[0]?.overdue) || 0);

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
  // const getRandomColor = () => {
  //   const letters = "0123456789ABCDEF";
  //   let color = "#";
  //   for (let i = 0; i < 6; i++) {
  //     color += letters[Math.floor(Math.random() * 16)];
  //   }
  //   return color;
  // };

  // const datum = {
  //   labels: lablesdata?.map((category) => category.category_Name),
  //   datasets: [
  //     {
  //       data: lablesdata?.map((category) => category.purchase_amount),
  //       backgroundColor: lablesdata?.map(() => getRandomColor()),
  //       hoverBackgroundColor: lablesdata?.map(() => getRandomColor()),
  //       borderWidth: 5,
  //       borderColor: "#fff",
  //       borderRadius: 10,
  //     },
  //   ],
  // };

  // const last6MonthsData = data?.filter((item) => {
  //   const currentDate = new Date();
  //   const startOfSixMonthsAgo = new Date(currentDate);
  //   startOfSixMonthsAgo.setMonth(currentDate.getMonth() - 5);

  //   startOfSixMonthsAgo.setDate(1);
  //   const itemDate = new Date(item.month);

  //   return itemDate >= startOfSixMonthsAgo && itemDate <= currentDate;
  // });
  const currentDate = new Date();
  const months = [];

  // Generate last 6 months
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
        <TabContext value={value}>

          <div
            className="container justify-content-between d-flex align-items-center"
            style={{
              position: "sticky",
              top: 0,
              right: 0,
              left: 0,
              zIndex: 1000,
              backgroundColor: "#FFFFFF",
              height: 83,
              width: "100%", 
              touchAction: "none", 
              marginTop: 0, 
            }}
          >
            <Box sx={{ borderBottom: 0, borderColor: "divider" }}>
              <TabList
                orientation={isSmallScreen ? "vertical" : "horizontal"}
                onChange={handleChanges}
                aria-label="lab API tabs example"
                style={{ marginLeft: "20px" }}
                className="d-flex flex-column flex-xs-column flex-sm-column flex-lg-row"
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
          
          <div style={{maxHeight: "calc(100vh - 83px)", 
      overflowY: "auto",}}>
          
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
                <div className="mt-4">
                  <div className="dashfirst">
                    <div style={{ flex: 1 }}>
                      <div className="border rounded-4 p-4 text-start shadow-sm firstcard">
                        <div className="text-primary mb-3">
                          <i className="bi bi-house-door-fill fs-3"></i>
                        </div>
                        <h6 className="text-muted" style={{fontFamily:"Gilroy"}}>Total Room</h6>
                        {/* <h4 class="mb-0">{dashboardList[0]?.roomCount}</h4> */}
                        <h4 className="mb-0">
                          {dashboardList && dashboardList?.length > 0
                            ? dashboardList[0]?.roomCount
                            : 0}
                        </h4>
                      </div>
                    </div>
                    <div className="spacedash" style={{ flex: 1 }}>
                      <div className="d-flex flex-column gap-3 spacecard">
                        <div className="border rounded-4 p-3 text-start bg-white shadow-sm secondcard d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="text-muted" style={{fontFamily:"Gilroy"}}>Total Beds</h6>
                            <h4 className="mb-0">
                              {dashboardList && dashboardList?.length > 0
                                ? dashboardList[0]?.TotalBed
                                : 0}
                            </h4>
                          </div>
                          <img src={clock} alt="clock" width={30} height={30} />
                        </div>

                        <div className="border rounded-4 p-3 text-start bg-white shadow-sm thirdcard">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h6 className="text-muted mb-0" style={{fontFamily:"Gilroy"}}>Free Bed</h6>
                              <h4 className="mb-0">
                                {dashboardList && dashboardList?.length > 0
                                  ? dashboardList[0]?.availableBed
                                  : 0}
                              </h4>
                            </div>
                            <img src={key} width="30" height="30" alt="Clock" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="spacedash" style={{ flex: 3 }}>
                      <div
                        className="dashtwo"
                        style={{ backgroundColor: "#E0ECFF", borderRadius: 24 }}
                      >
                        <div
                          className="d-flex flex-column gap-3 dashfour"
                          style={{ flex: 1 }}
                        >
                          <div className="border rounded-4 p-3 text-start bg-white shadow-sm fourthcard">
                            <h6 className="text-muted" style={{fontFamily:"Gilroy"}}>Occupied Bed</h6>
                            <h4 className="mb-0">
                              {dashboardList && dashboardList?.length > 0
                                ? dashboardList[0]?.occupied_Bed
                                : 0}
                            </h4>
                          </div>
                          <div className="border rounded-4 p-3 text-start bg-white shadow-sm fifthcard">
                            <h6 className="text-muted" style={{fontFamily:"Gilroy"}}>Total Customer</h6>
                            <h4 className="mb-0">
                              {" "}
                              <h4 className="mb-0">
                                {dashboardList && dashboardList?.length > 0
                                  ? dashboardList[0]?.customer_count
                                  : 0}
                              </h4>
                            </h4>
                          </div>
                        </div>
                        <div
                          className="d-flex flex-column gap-3 dashfive"
                          style={{ flex: 1, padding: 5 }}
                        >
                          <div className="border rounded-4 p-3 text-start bg-white shadow-sm sixthcard">
                            <h6 className="text-muted" style={{fontFamily:"Gilroy"}}>Next Month Projection</h6>
                            <h4 className="mb-0">
                              {/* {dashboardList[0]?.project_amount} */}
                              {dashboardList && dashboardList?.length > 0
                                  ? dashboardList[0]?.project_amount
                                  : 0}
                            </h4>
                          </div>
                          <div className="border rounded-4 p-3 text-start bg-white shadow-sm seventhcard">
                            <h6 className="text-muted" style={{fontFamily:"Gilroy"}}>EB Amount</h6>
                            <h4 className="mb-0">
                              {" "}
                              <h4 className="mb-0">
                                {dashboardList && dashboardList?.length > 0
                                  ? dashboardList[0]?.eb_amount
                                  : 0}
                              </h4>
                            </h4>
                          </div>
                        </div>
                        <div
                          className="d-flex flex-column gap-3 eigthdesign"
                          style={{ flex: 1 }}
                        >
                          <div className="border rounded-4 p-3 text-start bg-white shadow-sm eighthcard">
                            <img src={vector} alt="vector" width={32} height={32} />
                            <p
                              className="text-muted"
                              style={{
                                fontWeight: 400,
                                fontSize: 14,
                                fontFamily: "Gilroy",
                                marginTop: 12,
                              }}
                            >
                              Total Asset Value
                            </p>
                            <h4 className="mb-0">
                              {dashboardList && dashboardList?.length > 0
                                ? dashboardList[0]?.asset_amount
                                : 0}
                            </h4>
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
                          marginLeft: "-3px",
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
                              flex: "1 1 auto",
                              textAlign: "start",
                              paddingLeft: 15,
                              marginBottom: "0",
                            }}
                          >
                            <p
                              style={{
                                fontFamily: "Montserrat",
                                fontSize: 18,
                                fontWeight: 600,
                                margin: 0, // Removes extra margin
                              }}
                            >
                              Expenses Vs Revenue
                            </p>
                          </div>

                          <div
                            style={{
                              flex: "0 0 auto",
                              maxWidth: "350px",
                              marginLeft: "auto",
                            }}
                          >
                            <div
                              style={{
                                position: "relative",
                                width: "150px",
                                height: 36,
                              }}
                            >
                              <select
                                aria-label="Default select example"
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
                                  cursor:'pointer'
                                }}
                              >
                                <option value="six_month">
                                  last six month
                                </option>
                                <option value="this_year">this year</option>
                                <option>last year</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* Chart Container */}
                        <div
                          className="chart-container"
                          style={{
                            position: "relative",
                            height: 350,
                            overflowX: "auto",
                          }}
                        >
                          <div
                            style={{
                              minWidth: "100%",
                            }}
                            className="chart-wrapper"
                          >
                            {/* <div
      style={{
        position: "absolute",
        top: "10px",
        left: "20px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <img
        src={arrow}
        alt="Arrow"
        style={{ width: "10px", height: "30px", marginLeft: "10px" }}
      />
      <div
        style={{
          transform: "rotate(-90deg)",
          transformOrigin: "left center",
          marginTop: "150px",
          color: "#000",
        }}
      >
        <p
          className="me-3"
          style={{
            fontFamily: "Montserrat",
            fontWeight: 600,
            fontSize: 12,
            color: "#4B4B4B",
          }}
        >
          {" "}
          Amount
        </p>
      </div>
</div> */}
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
                                  // interval={1}
                                  // interval={"six_month" ? '0' : '1'}
                                  interval={
                                    selectRevenu === "six_month" ? 0 : 1
                                  }
                                  tick={{
                                    fontFamily: "Gilroy",
                                    fontSize: 12,
                                    fontWeight: 500,
                                  }}
                                  tickFormatter={(month) => {
                                    // const date = new Date(month);
                                    const date = new Date(`${month}-01`);
                                    const options = {
                                      month: "short",
                                      year: "numeric",
                                    };
                                    return date.toLocaleDateString(
                                      "en-US",
                                      options
                                    );
                                  }}
                                >
                                  <Label
                                    value=""
                                    position="insideBottom"
                                    offset={-15}
                                  />
                                </XAxis>
                                <YAxis
                                  domain={[0, "dataMax"]}
                                  axisLine={false}
                                  tickLine={false}
                                  tickCount={12}
                                  // tickFormatter={formatYAxis}
                                  formatter={(value) => `₹ ${value}`}
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
                                  fill="#E34B4B"
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
                                  fill="#00A32E"
                                  barSize={50}
                                  radius={[5, 5, 0, 0]}
                                >
                                  {/* <LabelList
              dataKey="expense"
              position="inside"
              angle={270}
              style={{ fill: "white", fontSize: 12, fontWeight: "bold" }}
            /> */}
                                  <LabelList
                                    dataKey="expense"
                                    position="inside"
                                    angle={270}
                                    // formatter={(value) => `₹ ${value}`}
                                    style={{
                                      fill: "white",
                                      fontSize: 12,
                                      fontWeight: "bold",
                                      whiteSpace: "nowrap",
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

                            {/* <div
      style={{
        position: "absolute",
        bottom: "50px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <span
        style={{
          marginRight: "5px",
          fontFamily: "Montserrat",
          fontWeight: 600,
          fontSize: 12,
          color: "#4B4B4B",
        }}
      >
        Month
      </span>
      <img
        src={leftarrow}
        alt="Arrow"
        style={{ width: "30px", height: "10px" }}
      />
    </div> */}
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
                                    cursor:'pointer'
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
                                  cursor:'pointer'
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

                      <div className="complaints-container p-3 overflow-auto">
                        <div className="d-flex justify-content-between align-items-center">
                          <p
                            className="m-0 "
                            style={{
                              fontSize: 18,
                              fontFamily: "Montserrat",
                              fontWeight: 600,
                            }}
                          >
                            Active Complaints
                          </p>
                          <span
                            className=" text-end"
                            style={{
                              cursor: "pointer",
                              color: "#00C2FF",
                              textDecoration: "none",
                              fontSize: 16,
                              fontFamily: "Montserrat",
                              fontWeight: 600,
                            }}
                            onClick={() => handlecompliance()}
                          >
                            View all
                          </span>
                        </div>
                        <div style={{ marginTop: 10 }}>
                          {activecommpliance?.map((complaint, index) => {
                            let Dated = new Date(complaint.date);
                            let day = Dated.getDate();
                            let month = Dated.getMonth() + 1;
                            let year = Dated.getFullYear();
                            let formattedDate = `${day}/${month}/${year}`;

                            return (
                              <div
                                className="d-flex flex-wrap align-items-center"
                                key={index}
                              >
                                <img
                                  src={
                                    complaint.profile === "0"
                                      ? Profile
                                      : complaint.profile
                                  }
                                  className="rounded-circle me-3"
                                  alt={complaint.name}
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    objectFit: "cover",
                                  }}
                                />
                                <div className="flex-grow-1">
                                  <p
                                    className="m-0 "
                                    style={{
                                      fontSize: 16,
                                      fontFamily: "Gilroy",
                                      fontWeight: 600,
                                    }}
                                  >
                                    {complaint.Name}
                                  </p>
                                  <p
                                    className="m-0 text-muted"
                                    style={{
                                      fontSize: 14,
                                      fontFamily: "Gilroy",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {complaint.complaint_name} &middot;{" "}
                                    {formattedDate}
                                  </p>
                                </div>
                                <div className="text-end">
                                  <p
                                    style={{
                                      fontSize: 14,
                                      fontFamily: "Gilroy",
                                      fontWeight: 500,
                                      color: "#222222",
                                      borderRadius: 60,
                                      paddingTop: 3,
                                      paddingBottom: 0,
                                      paddingLeft: 5,
                                      paddingRight: 20,
                                      marginBottom: "0px",
                                      textAlign: "end",
                                      width: 91,
                                      marginLeft: 18,
                                      whiteSpace: "nowrap",

                                      backgroundColor:
                                        complaint.Status === "Pending"
                                          ? "#FFED9A"
                                          : "#DAFFD9",
                                    }}
                                  >
                                    <span>
                                      {complaint.Status
                                        ? complaint.Status
                                        : "null"}
                                    </span>
                                  </p>
                                  <p
                                    className=" text-muted"
                                    style={{
                                      fontSize: 14,
                                      fontFamily: "Gilroy",
                                      fontWeight: 500,
                                    }}
                                  >
                                    Room #{complaint.Room}, Bed {complaint.Bed}
                                  </p>
                                </div>
                              </div>
                            );
                          })}

                          {(!activecommpliance ||
                            activecommpliance.length === 0) && (
                            <div className="text-center text-danger">
                              <p>No Data</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="booking">
                    <div style={{ flex: 1 }}>
                      <p
                        style={{
                          fontSize: 18,
                          fontFamily: "Montserrat",
                          fontWeight: 600,
                        }}
                      >
                        Booking with Joining Date
                      </p>
                      <Table
                        responsive="md"
                        className="dashTable mt-3 mt-md-0 mt-lg-0 "
                        style={{
                          tableLayout: "auto",
                          borderRadius: "24px",
                          border: "1px solid #DCDCDC",
                        }}
                      >
                        <thead style={{ backgroundColor: "#E7F1FF" ,
                           position:"sticky",
                           top:0,
                           zIndex:1,
                        }}>
                          <tr>
                            <th
                              style={{
                                color: "#222",
                                fontWeight: 600,
                                fontSize: "14px",
                                fontFamily: "Gilroy",
                                borderTopLeftRadius: "24px",
                                textAlign: "center",
                                paddingLeft: 20,
                              }}
                            >
                              Name
                            </th>
                            <th
                              style={{
                                color: "#222",
                                fontWeight: 600,
                                fontSize: "14px",
                                fontFamily: "Gilroy",
                                padding: "10px",
                                textAlign: "center",
                              }}
                            >
                              Booking
                            </th>
                            <th
                              style={{
                                color: "#222",
                                fontWeight: 600,
                                fontSize: "14px",
                                fontFamily: "Gilroy",
                                padding: "10px",
                                textAlign: "center",
                                borderTopRightRadius: "24px",
                              }}
                            >
                              Amount
                            </th>

                            {/* <th
                              style={{
                                padding: "10px",
                                borderTopRightRadius: "24px",
                                textAlign: "center",
                              }}
                            ></th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {state.PgList?.dashboardDetails?.book_data?.map(
                            (item,index) => {
                              let Dated = new Date(item.joining_date);

                              let day = Dated.getDate();
                              let month = Dated.getMonth();
                              let year = Dated.getFullYear();
                              const monthNames = [
                                "Jan",
                                "Feb",
                                "Mar",
                                "Apr",
                                "May",
                                "Jun",
                                "Jul",
                                "Aug",
                                "Sep",
                                "Oct",
                                "Nov",
                                "Dec",
                              ];
                              let formattedMonth = monthNames[month];
                              let formattedDate = `${year} ${formattedMonth} ${day}`;

                              return (
                                <tr key ={index} style={{ overflowX: "auto" }}>
                                  <td
                                    style={{
                                      fontWeight: 500,
                                      fontSize: "16px",
                                      fontFamily: "Gilroy",
                                      textAlign: "center",
                                      paddingTop: 17,
                                      whiteSpace: "nowrap",
                                    }}
                                  >

                                    {item.first_name} {" "}
                                    {item.last_name}
                                    {/* <Image
                                      src={imageUrl}
                                      alt={item.Invoices || "Default Profile"}
                                      roundedCircle
                                      style={{
                                        height: "40px",
                                        width: "40px",
                                        marginRight: "10px",
                                      }}
                                      onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = Profile;
                                      }}
                                    /> */}
                                    {/* <span
                                      className="Customer_Name_Hover"
                                      style={{
                                        fontSize: "16px",
                                        fontWeight: 500,
                                        fontFamily: "Gilroy",
                                        // color: "#1E45E1",
                                        cursor: "pointer",
                                        textAlign: "center",
                                        marginTop: 10,
                                      }}
                                      // onClick={() => handleRoomDetailsPage(user)}
                                    >
                                     
                                    </span> */}
                                  </td>
                                  <td
                                    style={{
                                      fontWeight: 500,
                                      fontSize: "16px",
                                      fontFamily: "Gilroy",
                                      textAlign: "center",
                                      paddingTop: 17,
                                      whiteSpace: "nowrap",
                                    }}
                                  >
                                    {formattedDate}
                                  </td>

                                  <td
                                    style={{
                                      paddingTop: 15,
                                      border: "none",
                                      textAlign: "center",
                                      fontSize: "16px",
                                      fontWeight: 500,
                                      fontFamily: "Gilroy",
                                      marginTop: 10,
                                      whiteSpace: "nowrap",
                                    }}
                                  >
                                    {item.amount}
                                  </td>

                                  {/* <td style={{ textAlign: "center" }}>
                                    <div
                                      style={{
                                        height: "40px",
                                        width: "40px",
                                        borderRadius: "50%",
                                        border: "1px solid #EFEFEF",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
                                    >
                                      <PiDotsThreeOutlineVerticalFill
                                        style={{
                                          height: "20px",
                                          width: "20px",
                                        }}
                                      />
                                    </div>
                                  </td> */}
                                </tr>
                              );
                            }
                          )}
                          {(!state.PgList?.dashboardDetails?.book_data ||
                            state.PgList?.dashboardDetails?.book_data
                              ?.length === 0) && (
                            <tr>
                              <td
                                colSpan="6"
                                style={{
                                  textAlign: "center",
                                  color: "red",
                                  fontSize: 14,
                                }}
                              >
                                No data found
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </div>
                    <div className="invoicepending" style={{ flex: 1 }}>
                      <p
                        style={{
                          fontSize: 18,
                          fontFamily: "Montserrat",
                          fontWeight: 600,
                        }}
                      >
                        Pending Invoice
                      </p>
                      <Table
                        responsive="md"
                        className="dashTable mt-3 mt-md-0 mt-lg-0 "
                        style={{
                          tableLayout: "fixed",
                          borderRadius: "24px",
                          border: "1px solid #DCDCDC",
                        }}
                      >
                        <thead style={{ backgroundColor: "#E7F1FF" }}>
                          <tr>
                            <th
                              style={{
                                color: "#222",
                                fontWeight: 600,
                                fontSize: "14px",
                                fontFamily: "Gilroy",
                                padding: "10px",
                                borderTopLeftRadius: "24px",
                                textAlign: "center",  width: "33.33%",
                                                             }}
                            >
                              Invoice number
                            </th>
                            <th
                              style={{
                                color: "#222",
                                fontWeight: 600,
                                fontSize: "14px",
                                fontFamily: "Gilroy",
                                padding: "10px",
                                textAlign: "center",  width: "33.33%",
                              }}
                            >
                              Due Date
                            </th>
                            <th
                              style={{
                                color: "#222",
                                fontWeight: 600,
                                fontSize: "14px",
                                fontFamily: "Gilroy",
                                padding: "10px",
                                textAlign: "center",
                                borderTopRightRadius: "24px",  width: "33.33%",
                              }}
                            >
                              Amount
                            </th>

                            {/* <th
                              style={{
                                padding: "10px",
                                borderTopRightRadius: "24px",
                                textAlign: "center",
                              }}
                            ></th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {state.PgList?.dashboardDetails?.bill_details?.map(
                            (item,index) => {
                              // const imageUrl = item.profile || Profile;
                              let Dated = new Date(item.DueDate);

                              let day = Dated.getDate();
                              let month = Dated.getMonth();
                              let year = Dated.getFullYear();
                              const monthNames = [
                                "Jan",
                                "Feb",
                                "Mar",
                                "Apr",
                                "May",
                                "Jun",
                                "Jul",
                                "Aug",
                                "Sep",
                                "Oct",
                                "Nov",
                                "Dec",
                              ];
                              let formattedMonth = monthNames[month];
                              let formattedDate = `${year} ${formattedMonth} ${day}`;

                              return (
                                <tr key={index} style={{ overflowX: "auto" }}>
                                  <td title={item.Invoices}
                                    style={{
                                      fontWeight: 500,
                                      fontSize: "16px",
                                      fontFamily: "Gilroy",
                                       textAlign: "center",
                                      //  padding:10,
                                      paddingLeft: 20,
                                      paddingTop: 17,
                                      overflow:"hidden",
                                      textOverflow:"ellipsis",
                                      whiteSpace:"nowrap"
                                    }}
                                  >
                                    {item.Invoices}
                                  </td>
                                  <td
                                    style={{
                                      fontWeight: 500,
                                      fontSize: "16px",
                                      fontFamily: "Gilroy",
                                      textAlign: "center",
                                      paddingTop: 17,
                                      whiteSpace: "nowrap",
                                    }}
                                  >
                                    {formattedDate}
                                  </td>

                                  <td
                                    style={{
                                      paddingTop: 15,
                                      border: "none",
                                      textAlign: "center",
                                      fontSize: "16px",
                                      fontWeight: 500,
                                      fontFamily: "Gilroy",
                                      whiteSpace: "nowrap",
                                    }}
                                  >
                                    {item.total_amount}
                                  </td>

                                  {/* <td style={{ textAlign: "center" }}>
                                    <div
                                      style={{
                                        height: "40px",
                                        width: "40px",
                                        borderRadius: "50%",
                                        border: "1px solid #EFEFEF",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
                                    >
                                      <PiDotsThreeOutlineVerticalFill
                                        style={{
                                          height: "20px",
                                          width: "20px",
                                        }}
                                      />
                                    </div>
                                  </td> */}
                                </tr>
                              );
                            }
                          )}

                          {(!state.PgList?.dashboardDetails?.bill_details ||
                            state.PgList?.dashboardDetails?.bill_details
                              ?.length === 0) && (
                            <tr>
                              <td
                                colSpan="6"
                                style={{
                                  textAlign: "center",
                                  color: "red",
                                  fontSize: 14,
                                }}
                              >
                                No data found
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>
              </>
            )}
          </TabPanel>

          <TabPanel value="2">
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

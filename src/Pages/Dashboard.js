import React, { useState, useEffect } from "react";
import SemiCircleProgressBar from "react-progressbar-semicircle";
import { TbClockCheck, TbClockCancel } from "react-icons/tb";
import { ImClock2 } from "react-icons/im";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown, DropdownButton, ListGroup, Badge } from "react-bootstrap";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import "../Pages/Dashboard.css";
import Card from "react-bootstrap/Card";
import arrow from "../Assets/Images/Arrow 2.png";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import vector from "../Assets/Images/Vector.png";
import leftarrow from "../Assets/Images/Arrow 1.png";
import key from "../Assets/Images/key.png";
import car from "../Assets/Images/profile-2user (1).png";
import clock from "../Assets/Images/profile-2user.png";
import notification from "../Assets/Images/Notification.png";
import rectangle from "../Assets/Images/Rectangle 2.png";
import { useDispatch, useSelector } from "react-redux";
import DashboardChart from "./DashboardChart";
import { FaSearch } from "react-icons/fa";
import { createPortal } from "react-dom";
import Compliance from "./Compliance";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Profile from "../Assets/Images/New_images/profile-picture.png";
import drop from "../Assets/Images/New_images/arrow-down.png";
import { Offcanvas, Form, FormControl } from "react-bootstrap";
import CountUp from "react-countup";
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
import Emptystate from '../Assets/Images/Empty-State.jpg'

function Dashboard(props) {
  const formatYAxis = (tickItem) => {
    return `${tickItem}`;
  };

  const noDataStyle = {
    color:  '#9C9C9C',
fontFamily: 'Gilroy',
fontSize: '16px',
fontStyle: 'normal',
fontWeight: '600',
lineHeight: 'normal',
  };

  const state = useSelector((state) => state);
  console.log("state", state);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [dashboardList, setDashboardList] = useState([]);
  const LoginId = localStorage.getItem("loginId");
  const [login_Id, setLogin_Id] = useState("");
  const [lablesdata, setLables] = useState([]);
  const [totalAmount, setTotalAmount] = useState([]);
  const [activecommpliance, setActivecommpliance] = useState([]);
  const [rolePermission,setRolePermission]=useState("")
  const [permissionError,setPermissionError]=useState("")
  const [announcePermissionError,setAnnouncePermissionError]=useState("")
  const [updatePermissionError,setupdatePermissionError]=useState("")
  const [value, setValue] = React.useState("1");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChanges = (event, newValue) => {
    setValue(newValue);
  };
  console.log("activecommpliance", activecommpliance);

  console.log("lablesdata", lablesdata);


  useEffect(()=>{
    setRolePermission(state.createAccount.accountList)
  },[state.createAccount.accountList])
  
  
  useEffect(() => {

    console.log("=========================================",rolePermission[0]);

    if(rolePermission[0]?.is_owner == 1 || rolePermission[0]?.role_permissions[0]?.per_view == 1){
      setPermissionError('');
    }else{
      setPermissionError('Permission Denied');
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

    console.log("=========================================",rolePermission[0]);

    if(rolePermission[0]?.is_owner == 1 || rolePermission[0]?.role_permissions[1]?.per_view == 1){
      setAnnouncePermissionError('');
    }else{
      setAnnouncePermissionError('Permission Denied');
    }

  }, [rolePermission]);

  useEffect(() => {

    console.log("=========================================",rolePermission[0]);

    if(rolePermission[0]?.is_owner == 1 || rolePermission[0]?.role_permissions[2]?.per_view == 1){
      setupdatePermissionError('');
    }else{
      setupdatePermissionError('Permission Denied');
    }

  }, [rolePermission]);
  

  useEffect(() => {
    const appearOptions = {
      threshold: 0.5,
    };
    const faders = document.querySelectorAll(".fade-in");
    const appearOnScro1l = new IntersectionObserver(function (
      entries,
      appearOnScrool
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
    setTotalAmount(state.PgList.dashboardDetails.total_amount);
  }, [state.PgList.dashboardDetails.total_amount]);

  const handlecompliance = (compliance) => {
    props.displayCompliance(compliance);
  };

  useEffect(() => {
    setLables(state.PgList.dashboardDetails.categoryList);
  }, [state.PgList.dashboardDetails.categoryList]);
  useEffect(() => {
    setData(state.PgList.dashboardDetails.Revenue_reports);
  }, [state.PgList.dashboardDetails.Revenue_reports]);

  useEffect(() => {
    dispatch({ type: "PGDASHBOARD" });
  }, []);

  useEffect(() => {
    if (state.PgList?.dashboardDetails?.dashboardList) {
      setDashboardList(state.PgList.dashboardDetails.dashboardList);
    }
  }, [state.PgList.dashboardDetails.dashboardList]);

  console.log("dashboardList", dashboardList);

  useEffect(() => {
    setActivecommpliance(state.PgList.dashboardDetails?.com_data);
  }, [state.PgList.dashboardDetails?.com_data]);
  //  if (!dashboardList || dashboardList.length === 0) {
  //    return null;
  //  }
  //  const {
  //    hostelCount,
  //    roomCount,
  //    TotalBed,
  //    availableBed,
  //    occupied_Bed,
  //    Revenue,
  //    current,
  //    overdue,
  //  } = dashboardList[0];

  const {
    hostelCount = 0,
    roomCount = 0,
    TotalBed = 0,
    availableBed = 0,
    occupied_Bed = 0,
    Revenue = 0,
    current = 0,
    overdue = 0,
    first_name = '',
    last_name = '',
  } = dashboardList[0] || {};

  console.log(
    hostelCount,
    roomCount,
    TotalBed,
    availableBed,
    occupied_Bed,
    Revenue,
    current,
    overdue
  );

  const total = Revenue;
  const percentage = ((Revenue - overdue) / total) * 100;
  console.log("percentage", percentage);

  const pathColor = current >= overdue ? "#00A32E" : "EBEBEB";
  const trailColor = overdue >= current ? "#EBEBEB" : "#00A32E";

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const datum = {
    labels: lablesdata?.map((category) => category.category_Name),
    datasets: [
      {
        data: lablesdata?.map((category) => category.purchase_amount),
        backgroundColor: lablesdata?.map(() => getRandomColor()),
        hoverBackgroundColor: lablesdata?.map(() => getRandomColor()),
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


      <div className="cotainer  p-4">
     
      {/* <div className="texxttt">
        <div style={{ flex: 1 }}>
          <lable
            style={{
              fontFamily: "Montserrat",
              fontWeight: 600,
              fontSize: "24px",
              lineHeight: "28.63px",
            }}
          >
            Welcome back {" "}
            {first_name != null ? first_name.toLocaleString() : ""}{" "}
            {last_name != null ? last_name.toLocaleString() : ""}!
          </lable>
          <p
            style={{
              fontFamily: "Montserrat",
              fontWeight: 400,
              fontSize: "16px",
              color: "#4B4B4B",
            }}
          >
            Manage all the inventory and analytics form here
          </p>
        </div>
      </div> */}

      <TabContext value={value}>
        <div>
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
        <TabPanel value="1">
          {
            permissionError ? (
<div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
  {/* Image */}
  <img src={Emptystate} alt="Empty State" style={{ maxWidth: "100%", height: "auto" }} />

  {/* Permission Error */}
  {permissionError && (
    <div style={{ color: "red", display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "1rem" }}>
      <MdError size={20} />
      <span>{permissionError}</span>
    </div>
  )}
</div>
            ):
          <>


  
<div class="mt-4">
  <div class="row g-2 align-items-start">
    
   
    <div class="col-12 col-lg-2">
      <div class="border rounded-4 p-4 text-start shadow-sm" style={{height:190}}>
        <div class="text-primary mb-3">
          <i class="bi bi-house-door-fill fs-3"></i>
        </div>
        <h6 class="text-muted">Total Room</h6>
        <h4 class="mb-0">50</h4>
      </div>
    </div>

   
    <div class="col-12 col-lg-3">
      <div class="d-flex flex-column gap-3 " style={{width:200,height:100}} >
        <div class="border rounded-4 p-3 text-start bg-white shadow-sm">
          <h6 class="text-muted">Occupied Bed</h6>
          <h4 class="mb-0">1</h4>
        </div>
        <div class="border rounded-4 p-3 text-start bg-white shadow-sm">
          <h6 class="text-muted">Free Bed</h6>
          <h4 class="mb-0">2</h4>
        </div>
      </div>
    </div>

   
    <div class="col-12 col-lg-4" style={{marginLeft:"-50px"}}>
      <div class="d-grid" style={{display:"grid",    gridTemplateColumns: 'repeat(2, 1fr)',gap:10}}>
      <div class="d-flex flex-column gap-3 "  style={{width:200,height:100}}>
        <div class="border rounded-4 p-3 text-start bg-white shadow-sm">
          <h6 class="text-muted">Occupied Bed</h6>
          <h4 class="mb-0">3</h4>
        </div>
        <div class="border rounded-4 p-3 text-start bg-white shadow-sm">
          <h6 class="text-muted">Occupied Bed</h6>
          <h4 class="mb-0">5</h4>
        </div>
       
      </div>
        
      <div class="d-flex flex-column gap-3 h-100" style={{width:200,height:100}}>
        <div class="border rounded-4 p-3 text-start bg-white shadow-sm">
          <h6 class="text-muted">Occupied Bed</h6>
          <h4 class="mb-0">6</h4>
        </div>
        <div class="border rounded-4 p-3 text-start bg-white shadow-sm">
          <h6 class="text-muted">Occupied Bed</h6>
          <h4 class="mb-0">7</h4>
        </div>
       
      </div>
      </div>
    </div>

    
    <div class="col-12 col-lg-2" style={{marginLeft:40,height:190}}>
      <div class="border rounded-4 p-4 text-start shadow-sm h-100 d-flex flex-column justify-content-center">
        <div class="text-primary mb-3">
          <i class="bi bi-house-door-fill fs-3"></i>
        </div>
        <h6 class="text-muted text-start">Asset</h6>
        <h4 class="mb-0 text-start">50</h4>
      </div>
    </div>

    
  

  </div>





<div style={{display:"flex",flexDirection:"row"}}>
        <div className="w-full animated-text" style={{ flex: 1 }}>
          <div
            className="crddesg w-full"
            style={{
              // padding: "0px",
              paddingTop: "20px",
              border: "1px solid #e0e0e0",
              borderRadius: "20px",
              backgroundColor: "#fff",
              marginLeft:"-3px",
              paddingRight:20,
              width:"98%"
            }}
          >
            <div
              className="dropp"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10 20px",
                
              }}
            >
              <div style={{ display: "flex", textAlign: "start" }} >
                <p
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: 18,
                    fontWeight: 600,
                    paddingLeft: 10,
                  }}
                >
                  Revenus vs Expenses
                </p>
              </div>
              <div
                className="d-flex align-items-end mb-3 justify-content-end"
                style={{ marginTop: 10 }}
              >
                <div style={{ position: "relative", width: 118, height: 36 }}>
                  <select
                    aria-label="Default select example"
                    style={{
                      fontSize: 12,
                      color: "#4B4B4B",
                      fontFamily: "Gilroy",
                      fontWeight: 600,
                      boxShadow: "none",
                      border: "1px solid #D9D9D9",
                      height: 36,
                      width: 118,
                      borderRadius: 60,
                      paddingTop: 6,
                      paddingBottom: 6,
                      paddingRight: 10,
                      paddingLeft: 10,
                      appearance: "none",
                      background: `url(${drop}) no-repeat right 10px center`,
                      backgroundSize: "16px 16px",
                    }}
                  >
                    <option>2023-2024</option>
                    <option>2024-2025</option>
                  </select>
                </div>
              </div>
            </div>

            <div style={{ position: "relative", width: "100%", height: 350 }}>
              <div
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
              </div>

              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  margin={{ top: 10, left: 50, bottom: 40, right: 10 }}
                  barGap={0}
                  barCategoryGap="10%"
                >
                  <CartesianGrid horizontal vertical={false} stroke="#e0e0e0" />
                  <XAxis
                    dataKey="month"
                    style={{ marginTop: "20px" }}
                    tick={{
                      fontFamily: "Gilroy",
                      fontSize: 12,
                      fontWeight: 500,
                    }}
                  >
                    <Label value="" position="insideBottom" offset={-15} />
                  </XAxis>
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={formatYAxis}
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
                    fill="#1E45E1"
                    barSize={24}
                    radius={[5, 5, 0, 0]}
                  >
                    <LabelList
                      dataKey="Revenue"
                      position="top"
                      style={{ fill: "#1E45E1" }}
                    />
                  </Bar>
                  <Bar
                    dataKey="expense"
                    fill="#00C2FF"
                    barSize={24}
                    radius={[5, 5, 0, 0]}
                  >
                    <LabelList
                      dataKey="ExpensesLabel"
                      position="top"
                      style={{ fill: "#00C2FF" }}
                    />
                  </Bar>
                  <Legend
                    content={<CustomLegend />}
                    verticalAlign="bottom"
                    height={36}
                  />
                </BarChart>
              </ResponsiveContainer>

              <div
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
              </div>
            </div>
          </div>



              </div>

<div style={{flex:1}}>
  hgd
</div>

</div>

</div>





          </>
          }
          
        </TabPanel>
        
        <TabPanel value="2">
          <DashboardAnnouncement announcePermissionError={announcePermissionError}
           
          />
        </TabPanel>
          
        <TabPanel value="3">
          <DashboardUpdates updatePermissionError={updatePermissionError}
           
          />
        </TabPanel>
      </TabContext>



     
    </div>
    
   
   </>
  );
}

export default Dashboard;

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
import vector from "../Assets/Images/New_images/Vector (2).png";
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
import Emptystate from '../Assets/Images/Empty-State.jpg';
import { Table } from "react-bootstrap";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";

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

  console.log("lablesdata",data);


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

//   const last6MonthsData = data?.filter((item) => {
//   const currentDate = new Date();
//   const itemDate = new Date(item.month);
//   const sixMonthsAgo = new Date();
//   sixMonthsAgo.setMonth(currentDate.getMonth() - 6);
//   return itemDate >= sixMonthsAgo;
// });
// const last6MonthsData = data?.filter((item) => {
//   const currentDate = new Date();
//   const sixMonthsAgo = new Date(); 
//   sixMonthsAgo.setMonth(currentDate.getMonth() - 5); 

//   const itemDate = new Date(item.month); 
//   return itemDate >= sixMonthsAgo && itemDate <= currentDate; 
// })

// Adjust the calculation to ensure a full 6-month range is included
const last6MonthsData = data?.filter((item) => {
  const currentDate = new Date(); // Current date
  const startOfSixMonthsAgo = new Date(currentDate); 
  startOfSixMonthsAgo.setMonth(currentDate.getMonth() - 5); // Go back 5 months to include June in a range
  
  startOfSixMonthsAgo.setDate(1); // Ensure we start at the beginning of the month
  const itemDate = new Date(item.month); // Parse month from the data

  return itemDate >= startOfSixMonthsAgo && itemDate <= currentDate; // Include only dates in the range
});


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
        backgroundColor: lablesdata?.map((_, index) => fixedColors[index % fixedColors.length]), // Use colors from the fixed array
        hoverBackgroundColor: lablesdata?.map((_, index) => fixedColors[index % fixedColors.length]), // Keep hover colors the same
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
<div className="dashfirst" >
         <div style={{flex:1}}>
           
    
      <div class="border rounded-4 p-4 text-start shadow-sm firstcard">
        <div class="text-primary mb-3">
          <i class="bi bi-house-door-fill fs-3"></i>
        </div>
        <h6 class="text-muted">Total Room</h6>
        <h4 class="mb-0">50</h4>
      </div>
    
         </div>
         <div className="spacedash" style={{flex:1}}>
         <div class="d-flex flex-column gap-3 spacecard">
         <div class="border rounded-4 p-3 text-start bg-white shadow-sm secondcard d-flex justify-content-between align-items-center">
  <div>
    <h6 class="text-muted">Total Beds</h6>
    <h4 class="mb-0">8</h4>
  </div>
  {/* <i class="bi bi-house-door-fill fs-3"></i> */}
  <img src={clock} width={30} height={30}/>
</div>

<div class="border rounded-4 p-3 text-start bg-white shadow-sm thirdcard">
  <div class="d-flex justify-content-between align-items-center">
    <div>
      <h6 class="text-muted mb-0">Free Bed</h6>
      <h4 class="mb-0">9</h4>
    </div>
    <img src={clock} width="30" height="30" alt="Clock" />
  </div>
</div>

      </div>
         </div>
         <div className="spacedash" style={{flex:3}}>
           
<div className="dashtwo" style={{backgroundColor:"#E0ECFF",borderRadius:24}}>
<div class="d-flex flex-column gap-3 dashfour" style={{flex:1}} >
        <div class="border rounded-4 p-3 text-start bg-white shadow-sm fourthcard">
          <h6 class="text-muted">Occupied Bed</h6>
          <h4 class="mb-0">10</h4>
        </div>
        <div class="border rounded-4 p-3 text-start bg-white shadow-sm fifthcard" >
          <h6 class="text-muted">Total Customer</h6>
          <h4 class="mb-0">18</h4>
        </div>
      </div>
      <div class="d-flex flex-column gap-3 dashfive" style={{flex:1,padding:5,}} >
        <div class="border rounded-4 p-3 text-start bg-white shadow-sm sixthcard" >
          <h6 class="text-muted">Next Month Projection</h6>
          <h4 class="mb-0">1</h4>
        </div>
        <div class="border rounded-4 p-3 text-start bg-white shadow-sm seventhcard" >
          <h6 class="text-muted">EB Amount</h6>
          <h4 class="mb-0">2</h4>
        </div>
      </div>
      <div class="d-flex flex-column gap-3 eigthdesign" style={{flex:1}} >
        <div class="border rounded-4 p-3 text-start bg-white shadow-sm eighthcard">
        <img src={vector} width={20} height={20}/>
          <h6 class="text-muted">Total Asset Value</h6>
          <h4 class="mb-0">1</h4>
        </div>
        </div>
     
</div>



     
         </div>
          </div>





          <div className="circulardes">
<div className="w-full animated-text" style={{ flex: 1, }}>
<div
  className="w-full"
  style={{
    // padding: "0px",
    paddingTop: "20px",
    border: "1px solid #e0e0e0",
    borderRadius: "20px",
    backgroundColor: "#fff",
    marginLeft:"-3px",
    paddingRight:20,
    width:"98%",
    marginTop:10
  }}
>
  <div
    // className="dropp"
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
          paddingLeft: 25,
        }}
      >
        Expenses Vs Revenue
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

  <div className="chatwidth" style={{ position: "relative", height: 350 }}>
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

    <ResponsiveContainer>
  <BarChart
    data={last6MonthsData}
    margin={{ top: 10, left: 50, bottom: 40, right: 10 }}
    barGap={0}
    barCategoryGap="5%"
  >
    <CartesianGrid horizontal vertical={false} stroke="#e0e0e0" />
   
  {/* <XAxis
        dataKey="month"
        tick={{
          fontFamily: "Gilroy",
          fontSize: 12,
          fontWeight: 500,
        }}
        tickFormatter={(month) => {
          const date = new Date(month);
          const options = { month: "short", year: "numeric" };
          return date.toLocaleDateString("en-US", options);
        }}
        axisLine={{ stroke: "#e0e0e0", strokeWidth: 2 }}
      >
        <Label value="" position="insideBottom" stroke="#e0e0e0" />
      </XAxis> */}
       <XAxis
  dataKey="month"
  tick={{
    fontFamily: "Gilroy",
    fontSize: 12,
    fontWeight: 500,
  }}
  tickFormatter={(month) => {
    const date = new Date(month);
    const options = { month: "short", year: "numeric" }; // Format e.g., "Jun 2024"
    return date.toLocaleDateString("en-US", options);
  }}
>
  <Label value="" position="insideBottom" offset={-15} />
</XAxis>;
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
    {/* <Tooltip formatter={(value) => `${value}`} /> */}
    <Bar
      dataKey="revenue"
      fill="#E34B4B"
      barSize={100}
      radius={[5, 5, 0, 0]}
    >
      <LabelList
        dataKey="revenue"
        position="inside"
        angle={270} // Rotates the label vertically
        style={{ fill: "white", fontSize: 12, fontWeight: "bold" }}
      />
    </Bar>
    <Bar
      dataKey="expense"
      fill="#00A32E"
      barSize={32}
      radius={[5, 5, 0, 0]}
    >
      <LabelList
        dataKey="expense"
        position="inside"
        angle={270} // Rotates the label vertically
        style={{ fill: "white", fontSize: 12, fontWeight: "bold" }}
      />
    </Bar>
    <Legend content={<CustomLegend />} verticalAlign="bottom" height={36} />
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
        Total Cashback
      </p>
    </div>
    <div
      className="d-flex align-items-end mb-3 justify-content-end"
      
    >
      <div style={{ position: "relative", width: 158, height: 36 }}>
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
            width: 150,
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
          <option>last 6 month</option>
          <option>prev month</option>
          {/* <option>2</option> */}
        </select>
      </div>
    </div>
  </div>
    <div className="circulardesone">
      <div
        className="circular-progressbar-container"
        style={{ width: "35%", marginLeft: 30, marginTop: 10 }}
      >
        {/* <CircularProgressbar
          value={percentage}
          text={"₹" + Revenue.toLocaleString()}
          circleRatio={0.5}
          styles={buildStyles({
            rotation: 0.75,
            pathColor: "#EBEBEB",
            trailColor: "#00A32E",
            textColor: "#000000",
            textSize: 15,
            
            text: {
              fill: "#0000000",

              transform: "rotate(80deg)",
              transformOrigin: "center center",
              fontFamily: "Gilroy",
              fontWeight: 600,
              fontSize: "24px",
            },
          })}
        /> */}
        <CircularProgressbar
  value={percentage}
  text={"₹" + Revenue.toLocaleString()}
  circleRatio={0.5}
  styles={buildStyles({
    rotation: 0.75, 
    pathColor: "#EBEBEB", 
    trailColor: "#00A32E", 
    textColor: "#000000",
    textSize: 15,
    text: {
      fill: "#000000",
      transform: "rotate(80deg)",
      transformOrigin: "center center",
      fontFamily: "Gilroy",
      fontWeight: 600,
      fontSize: "24px",
    },
  })}
/>

      </div>

      <div className="texrtalii">
        <div className="status-item">
          <div className="dot received"></div>
          <div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 600,
                fontFamily: "Montserrat",
              }}
            >
              Received
            </div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 600,
                fontFamily: "Gilry",
              }}
            >
              ₹{current.toLocaleString()}
            </div>
          </div>
        </div>
        <div className="status-item">
          <div className="dot receivable"></div>
          <div style={{ marginTop: 10 }}>
            <div
              style={{
                fontSize: 16,
                fontWeight: 600,
                fontFamily: "Montserrat",
              }}
            >
              Receivable
            </div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 600,
                fontFamily: "Gilry",
              }}
            >
              ₹{overdue.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  </Card.Body>
</Card>
</div>

<div style={{ flex: 1 }}>
<div className="expenses-container animated-text">
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
        Expenses
      </p>
    </div>
    <div
      className="d-flex align-items-end mb-3 justify-content-end"
      
    >
      <div style={{ position: "relative", width: 158, height: 36 }}>
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
            width: 150,
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
          <option>This month</option>
          <option>prev month</option>
          {/* <option>2</option> */}
        </select>
      </div>
    </div>
  </div>
  <div className="content">
    <div className="chart">
      {/* <Doughnut
        data={datum}
        options={options}
        style={{ width: 196, height: 196 }}
      /> */}

{totalAmount > 0 ? (
<Doughnut
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
)
}
      <p
 className="center-text"
 style={{
   fontFamily: "Gilroy",
   fontSize: 25,
   fontWeight: 600,
  
 }}
>
₹{totalAmount > 0 ? totalAmount : 0}
</p>

    </div>
    <div className="categories">
{totalAmount > 0 ? (
lablesdata?.map((label, index) => (
<div className="category" key={index}>
<span
className="dot"
style={{
  backgroundColor: datasets[0].backgroundColor[index],
}}
></span>
<div className="text">
<p
  style={{
    fontFamily: "Montserrat",
    fontSize: 12,
    fontWeight: 600,
    color: "#4B4B4B",
  }}
>
  {label.category_Name}
</p>
<p
  style={{
    fontFamily: "Gilroy",
    fontSize: 16,
    fontWeight: 600,
  }}
>
  ₹{label.purchase_amount}
</p>
</div>
</div>
))
) : (
<div className="no-data-category" style={noDataStyle}>
<p
style={{

textAlign: "center",
width: "100%",
marginTop: "20px",
marginLeft:"50px"
}}
>
No Data
</p>
</div>
)}
</div>

  </div>
</div>
<div className="complaints-container animated-text" 
// style={{
  // overflowY: 'auto'
  >
  <div className="header">
    <p
      style={{
        fontSize: 18,
        fontWeight: 600,
        fontFamily: "Montserrat",
        paddingLeft: "10px",
        marginTop: 15,
      }}
    >
      Active Complaints
    </p>
    <a
      style={{
        textAlign: "right",
        paddingRight: 15,
        fontWeight: 600,
        fontSize: 16,
        fontFamily: "Montserrat",
        color: "#1E45E1",
        cursor: "pointer",
      }}
      onClick={() => handlecompliance()}
    >
      View all
    </a>
  </div>
  {activecommpliance?.map((complaint, index) => {
    let Dated = new Date(complaint.date);
    console.log("Dated..?", Dated);

    let day = Dated.getDate();
    let month = Dated.getMonth() + 1; // Months are zero-based
    let year = Dated.getFullYear();

    let formattedDate = `${day}/${month}/${year}`;

    return (
      <>
        <div className="complaint">
          {/* <img src={Profile} alt={complaint.name} className="avatar" /> */}
          <img
            src={
              complaint.profile === "0" ? Profile : complaint.profile
            }
            className="avatar"
          />

          <div className="complaint-info">
            <p
              className="name"
              style={{
                fontSize: 16,
                fontFamily: "Gilroy",
                fontWeight: 600,
              }}
            >
              {complaint.Name}
            </p>
            <p
              className="details"
              style={{
                fontSize: 14,
                fontFamily: "Gilroy",
                fontWeight: 500,
                color: "#4B4B4B",
              }}
            >
              {complaint.complaint_name} . {formattedDate}
            </p>
          </div>
          <div>
            <div>
              <p
                style={{
                  fontSize: 14,
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                  color: "#222222",
                  borderRadius: 60,
                  paddingTop: 3,
                  paddingBottom: 3,
                  // paddingLeft: 5,
                  paddingRight: 20,
                  marginBottom: "0px",
                  textAlign: "end",
                  width: 91,
                  marginLeft: 18,

                  backgroundColor:
                    complaint.Status === "Pending"
                      ? "#FFED9A"
                      : "#DAFFD9",
                }}
              >
                <span>{complaint.Status}</span>
              </p>
              {/* <p style={{fontSize:14,fontFamily:"Gilroy",fontWeight:500,color:"#222222",paddingTop:3,paddingBottom:3,paddingLeft:2,paddingRight:2,marginBottom:"0px"}}> {complaint.Status}</p> */}
            </div>
            <div
              className="room"
              style={{
                fontSize: 14,
                fontFamily: "Gilroy",
                fontWeight: 500,
                color: "#4B4B4B",
                paddingRight: "10px",
              }}
            >
              Room #{complaint.Room}.Bed{complaint.Bed}{" "}
            </div>
          </div>
        </div>
      </>
    );
  })}
</div>
</div>
</div>


<div className="booking">
 <div style={{flex:1,}} >

  <p style={{fontSize:18,fontFamily:"Montserrat",fontWeight:600}}>Booking with Joining Date</p>
 <Table
       responsive="md"
       className="dashTable mt-3 mt-md-0 mt-lg-0 "
       style={{
         tableLayout: "auto",
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
               borderTopLeftRadius: "24px",
               textAlign: "left",
               paddingLeft:20
             }}
           >
             Users
           </th>
           <th
             style={{
               color: "#222",
               fontWeight: 600,
               fontSize: "14px",
               fontFamily: "Gilroy",
               padding: "10px",
               textAlign: "left",
             }}
           >
             Email
           </th>
           <th
             style={{
               color: "#222",
               fontWeight: 600,
               fontSize: "14px",
               fontFamily: "Gilroy",
               padding: "10px",
               textAlign: "left",
             }}
           >
             Mobile
           </th>
           <th
             style={{
               color: "#222",
               fontWeight: 600,
               fontSize: "14px",
               fontFamily: "Gilroy",
               padding: "10px",
               textAlign: "left",
             }}
           >
             Role
           </th>
           <th
             style={{
               padding: "10px",
               borderTopRightRadius: "24px",
               textAlign: "center",
             }}
           ></th>
         </tr>
       </thead>
       <tbody>
         {/* {
           currentRowUsers?.map((item)=>{
            const imageUrl = item.profile || Profile;
             return( */}
               <tr style={{ overflowX: 'auto' }}>
               {/* <td
                
                 style={{
                   fontWeight: 500,
                   fontSize: "16px",
                   fontFamily: "Gilroy",
                   textAlign: "left",
                   paddingLeft:20,
                   whiteSpace: "nowrap"
                 }}
               >
                {item.first_name}
               </td> */}
               <td
                 style={{
                   fontWeight: 500,
                   fontSize: "16px",
                   fontFamily: "Gilroy",
                  //  textAlign: "left",
                   padding:10

                 }}
               >
                email
               {/* {item.email_Id} */}
               </td>
               <td
                 style={{
                   fontWeight: 500,
                   fontSize: "16px",
                   fontFamily: "Gilroy",
                   textAlign: "left",
                   paddingTop:17

                 }}
               >
                email
               {/* {item.email_Id} */}
               </td>
               {/* <td
                 style={{
                   fontWeight: 500,
                   fontSize: "16px",
                   fontFamily: "Gilroy",
                   textAlign: "left",
                 }}
               >
                {item.mobileNo}
               </td> */}
               <td
                              style={{
                                paddingTop:15,
                                border: "none",
                                textAlign: "start",
                                fontSize: "16px",
                                fontWeight: 500,
                                fontFamily: "Gilroy",
                                marginTop:10,
                                whiteSpace: "nowrap"
                              }}
                            >
                              +jhe
                              {/* {item &&
                                String(item.mobileNo).slice(
                                  0,
                                  String(item.mobileNo).length - 10
                                )}{" "}
                              {item && String(item.mobileNo).slice(-10)} */}
                            </td>
               <td
                 style={{
                   fontWeight: 500,
                   fontSize: "16px",
                   fontFamily: "Gilroy",
                   textAlign: "left",
                   paddingTop:15
                 }}
               >
                name
                 {/* {item.role_name} */}
               </td>
               <td style={{ textAlign: "center" }}>
                 <div
                   style={{
                     height: "40px",
                     width: "40px",
                     borderRadius: "50%",
                     border: "1px solid #EFEFEF",
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center",
                    //  zIndex:EditUser === item.id ? 1000 : "auto",
                   }}
                  //  onClick={() => handleEditUser(item.id)}
                  // onClick={(event) => handleEditUser(item.id, event)}
                 >
                   <PiDotsThreeOutlineVerticalFill
                     style={{ height: "20px", width: "20px" }}
                   />
                     {/* {EditUser === item.id && (
                     <div
                       ref={popupRef}
                       style={{
                        cursor: "pointer",
                        backgroundColor: "#F9F9F9",
                        position: "absolute",
                        top: popupPosition?.top || 0,
                        left: popupPosition?.left || 0,
                        width: 160,
                        height: 70,
                        border: "1px solid #EBEBEB",
                        borderRadius: 10,
                        display: "flex",
                        flexDirection: "column",
                        padding: 10,
                        alignItems: "start",
                      }}
                     >
                       <div
                         className="mb-2 d-flex justify-content-start align-items-center gap-2"
                        //  onClick={() => handleEditForm(item)}
                       >
                         <img
                           src={Edit}
                           style={{ height: 16, width: 16 }}
                           alt="Edit"
                         />
                         <label
                           style={{
                             fontSize: 14,
                             fontWeight: 500,
                             fontFamily: "Gilroy, sans-serif",
                             color: "#000000",
                             cursor: "pointer",
                           }}
                         >
                           Edit
                         </label>
                       </div>
                       <div className="mb-2 d-flex justify-content-start align-items-center gap-2"  onClick={() => handleDeleteForm(item)}>
                         <img
                           src={Delete}
                           style={{ height: 16, width: 16 }}
                           alt="Delete"
                          //  onClick={handleDeleteTransForm}
                          //  onClick={() => handleDeleteTransForm(user)}
                         />
                         <label
                           style={{
                             fontSize: 14,
                             fontWeight: 500,
                             fontFamily: "Gilroy, sans-serif",
                             color: "#FF0000",
                             cursor: "pointer",
                           }}
                         >
                           Delete
                         </label>
                       </div>
                     </div>
                   )} */}
                 </div>
               </td>
             </tr>
             {/* )
           })
     
         } */}
        
       </tbody>
     </Table>
 </div>
 <div style={{flex:1,marginLeft:30}}>
 <p style={{fontSize:18,fontFamily:"Montserrat",fontWeight:600}}>Pending Invoice</p>
 <Table
       responsive="md"
       className="dashTable mt-3 mt-md-0 mt-lg-0 "
       style={{
         tableLayout: "auto",
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
               borderTopLeftRadius: "24px",
               textAlign: "left",
               paddingLeft:20
             }}
           >
             Users
           </th>
           <th
             style={{
               color: "#222",
               fontWeight: 600,
               fontSize: "14px",
               fontFamily: "Gilroy",
               padding: "10px",
               textAlign: "left",
             }}
           >
             Email
           </th>
           <th
             style={{
               color: "#222",
               fontWeight: 600,
               fontSize: "14px",
               fontFamily: "Gilroy",
               padding: "10px",
               textAlign: "left",
             }}
           >
             Mobile
           </th>
           <th
             style={{
               color: "#222",
               fontWeight: 600,
               fontSize: "14px",
               fontFamily: "Gilroy",
               padding: "10px",
               textAlign: "left",
             }}
           >
             Role
           </th>
           <th
             style={{
               padding: "10px",
               borderTopRightRadius: "24px",
               textAlign: "center",
             }}
           ></th>
         </tr>
       </thead>
       <tbody>
         {/* {
           currentRowUsers?.map((item)=>{
            const imageUrl = item.profile || Profile;
             return( */}
               <tr style={{ overflowX: 'auto' }}>
               {/* <td
                
                 style={{
                   fontWeight: 500,
                   fontSize: "16px",
                   fontFamily: "Gilroy",
                   textAlign: "left",
                   paddingLeft:20,
                   whiteSpace: "nowrap"
                 }}
               >
                {item.first_name}
               </td> */}
               <td
                 style={{
                   fontWeight: 500,
                   fontSize: "16px",
                   fontFamily: "Gilroy",
                  //  textAlign: "left",
                   padding:10

                 }}
               >
                email
               {/* {item.email_Id} */}
               </td>
               <td
                 style={{
                   fontWeight: 500,
                   fontSize: "16px",
                   fontFamily: "Gilroy",
                   textAlign: "left",
                   paddingTop:17

                 }}
               >
                email
               {/* {item.email_Id} */}
               </td>
               {/* <td
                 style={{
                   fontWeight: 500,
                   fontSize: "16px",
                   fontFamily: "Gilroy",
                   textAlign: "left",
                 }}
               >
                {item.mobileNo}
               </td> */}
               <td
                              style={{
                                paddingTop:15,
                                border: "none",
                                textAlign: "start",
                                fontSize: "16px",
                                fontWeight: 500,
                                fontFamily: "Gilroy",
                                marginTop:10,
                                whiteSpace: "nowrap"
                              }}
                            >
                              +jhe
                              {/* {item &&
                                String(item.mobileNo).slice(
                                  0,
                                  String(item.mobileNo).length - 10
                                )}{" "}
                              {item && String(item.mobileNo).slice(-10)} */}
                            </td>
               <td
                 style={{
                   fontWeight: 500,
                   fontSize: "16px",
                   fontFamily: "Gilroy",
                   textAlign: "left",
                   paddingTop:15
                 }}
               >
                name
                 {/* {item.role_name} */}
               </td>
               <td style={{ textAlign: "center" }}>
                 <div
                   style={{
                     height: "40px",
                     width: "40px",
                     borderRadius: "50%",
                     border: "1px solid #EFEFEF",
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center",
                    //  zIndex:EditUser === item.id ? 1000 : "auto",
                   }}
                  //  onClick={() => handleEditUser(item.id)}
                  // onClick={(event) => handleEditUser(item.id, event)}
                 >
                   <PiDotsThreeOutlineVerticalFill
                     style={{ height: "20px", width: "20px" }}
                   />
                     {/* {EditUser === item.id && (
                     <div
                       ref={popupRef}
                       style={{
                        cursor: "pointer",
                        backgroundColor: "#F9F9F9",
                        position: "absolute",
                        top: popupPosition?.top || 0,
                        left: popupPosition?.left || 0,
                        width: 160,
                        height: 70,
                        border: "1px solid #EBEBEB",
                        borderRadius: 10,
                        display: "flex",
                        flexDirection: "column",
                        padding: 10,
                        alignItems: "start",
                      }}
                     >
                       <div
                         className="mb-2 d-flex justify-content-start align-items-center gap-2"
                        //  onClick={() => handleEditForm(item)}
                       >
                         <img
                           src={Edit}
                           style={{ height: 16, width: 16 }}
                           alt="Edit"
                         />
                         <label
                           style={{
                             fontSize: 14,
                             fontWeight: 500,
                             fontFamily: "Gilroy, sans-serif",
                             color: "#000000",
                             cursor: "pointer",
                           }}
                         >
                           Edit
                         </label>
                       </div>
                       <div className="mb-2 d-flex justify-content-start align-items-center gap-2"  onClick={() => handleDeleteForm(item)}>
                         <img
                           src={Delete}
                           style={{ height: 16, width: 16 }}
                           alt="Delete"
                          //  onClick={handleDeleteTransForm}
                          //  onClick={() => handleDeleteTransForm(user)}
                         />
                         <label
                           style={{
                             fontSize: 14,
                             fontWeight: 500,
                             fontFamily: "Gilroy, sans-serif",
                             color: "#FF0000",
                             cursor: "pointer",
                           }}
                         >
                           Delete
                         </label>
                       </div>
                     </div>
                   )} */}
                 </div>
               </td>
             </tr>
             {/* )
           })
     
         } */}
        
       </tbody>
     </Table>
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

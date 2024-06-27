
import React, { useState, useEffect } from 'react'
import SemiCircleProgressBar from "react-progressbar-semicircle";
import { TbClockCheck, TbClockCancel } from "react-icons/tb";
import { ImClock2 } from "react-icons/im";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownButton,ListGroup, Badge } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import '../Pages/Dashboard.css';
import Card from 'react-bootstrap/Card';
import arrow from "../Assets/Images/Arrow 2.png"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import vector from "../Assets/Images/Vector.png"
import leftarrow from "../Assets/Images/Arrow 1.png"
import key from "../Assets/Images/key.png"
import car from "../Assets/Images/profile-2user (1).png"
import clock from "../Assets/Images/profile-2user.png"
import notification from "../Assets/Images/Notification.png"
import rectangle from "../Assets/Images/Rectangle 2.png";
import { useDispatch, useSelector } from 'react-redux';
import DashboardChart from './DashboardChart';
import { FaSearch } from "react-icons/fa";
import { createPortal } from 'react-dom';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,Label,LabelList
} from 'recharts';
import { borderRadius } from '@mui/system';

function Dashboard() {
  const complaintsData = [
    {
      name: "Akash Rathod",
      type: "Invoice",
      date: "26 May 2024",
      status: "Pending",
      room: "Room #F205, Bed 1",
      img: "D:\smartHostel+Update\backend_Smart\smartstay\src\Assets\Images/Group 1.png" 
    },
    {
      name: "Josie Mary",
      type: "Invoice",
      date: "26 May 2024",
      status: "Pending",
      room: "Room #F205, Bed 1",
      img: "https://randomuser.me/api/portraits/women/2.jpg" 
    },
    {
      name: "Salma Khan",
      type: "Others",
      date: "26 May 2024",
      status: "Assigned",
      room: "Room #F205, Bed 1",
      img: "https://randomuser.me/api/portraits/women/3.jpg" 
    },
    {
      name: "Swetha Pillai",
      type: "Others",
      date: "26 May 2024",
      status: "Assigned",
      room: "Room #F205, Bed 1",
      img: "https://randomuser.me/api/portraits/women/4.jpg" 
    },
  ];


 
  
  
  
  

  const data = [
    { name: 'Jan 2024', Revenue: 300, Expenses: 200 },
    { name: 'Feb 2024', Revenue: 200, Expenses: 100 },
    { name: 'Mar 2024', Revenue: 400, Expenses: 300 },
    { name: 'Apr 2024', Revenue: 150, Expenses: 250 },
    { name: 'May 2024', Revenue: 500, Expenses: 350 },
    { name: 'Jun 2024', Revenue: 350, Expenses: 300 },
  ];
  
  const formatYAxis = (tickItem) => {
    return `$${tickItem}`;
  }

  const state = useSelector(state => state)
  console.log("state", state)
  const dispatch = useDispatch();
  const [dashboardList, setDashboardList] = useState(state.PgList.dashboardDetails.dashboardList)
  const LoginId = localStorage.getItem("loginId")
  const [login_Id, setLogin_Id] = useState('')

  useEffect(() => {
    dispatch({ type: 'PGDASHBOARD' })
  }, [])
  
  useEffect(() => {
    setDashboardList(state.PgList.dashboardDetails.dashboardList)
  }, [state.PgList.dashboardDetails.dashboardList])

  console.log("dashboardList", dashboardList)
  if (!dashboardList || dashboardList.length === 0) {
    return null;
  }


  

  const {
    hostelCount,
    roomCount,
    TotalBed,
    availableBed,
    occupied_Bed,
    Revenue,
    current,
    overdue,
  } = dashboardList[0];

  const total = Revenue;
  const percentage = ((Revenue - overdue) / total) * 100;
  console.log("percentage", percentage);

  const pathColor = current >= overdue ? '#00A32E' : 'EBEBEB';
  const trailColor = overdue >= current ? 'EBEBEB' : '#00A32E';



  const datum = {
    labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5', 'Others'],
    datasets: [
      {
        data: [19500, 19500, 19500, 19500, 19500, 19500],
        backgroundColor: ['#FFA500', '#00FF00', '#0000FF', '#00FFFF', '#FFC0CB', '#FFD700'],
        hoverBackgroundColor: ['#FFA500', '#00FF00', '#0000FF', '#00FFFF', '#FFC0CB', '#FFD700'],
        borderWidth: 5,
        borderColor: '#fff',
        borderRadius:10
      },
    ],
  };

  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
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
  
  
    const { labels, datasets } = datum;
  
    if (!datasets || datasets.length === 0 || !datasets[0].backgroundColor) {
      return <div>Loading...</div>;
    }
   
    
    const CustomLegend = ({ payload }) => {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {payload.map((entry, index) => (
            <div key={`item-${index}`} style={{ display: 'flex', alignItems: 'center', marginRight: 10,marginTop:25 }}>
              <div style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: entry.color,
                marginRight: 5
              }} />
              <span>{entry.value}</span>
            </div>
          ))}
        </div>
      );
    };



   

  return (



<div className='cotainer w-full p-3' >
<div className='texxttt'>
  <div style={{flex:1}}>
<div style={{font:"Gilroy",fontWeight:600,fontSize:"24px",lineHeight:"28.63px"}}>Welcome back, Vikram!</div>
<div>Manage all the inventory and analytics form here</div>
  </div>
  <div style={{flex:1}}>
  <div className="headerone">
    
       <div className="search-container">
      <input type="text" placeholder="Search" className="search-input" />
      <span className="search-icon"></span>
    </div>
      <div className="notification-container">
        <img src={notification} className="notification-icon"/>
          <span className="notification-dot"></span>
        
      </div>
      <div className="profile-container">
        <img src={rectangle}  className="profile-image" />
      </div>
    </div>
  </div>
  </div>


<div className="row " style={{marginTop:30,width:"100%"}}>
      
      <div className="col-lg-3 col-md-3 col-sm-12 col-12 mb-3">
  <Card style={{ height: "auto",width:"100%" }}>
    <Card.Body>
      <div >
        <div >
        <img 
            src={vector} 
            height={35} 
            width={35} 
            
          />
          <h6 style={{paddingTop:15}}>Total Hostel</h6>
        
        </div>
        <div  style={{fontSize:32,fontWeight:600,font:"Gilroy"}}>
          {hostelCount.toLocaleString()}
        </div>
      </div>
    </Card.Body>
  </Card>
</div>

<div className="col-lg-3 col-md-3 col-sm-12 col-12 mb-3">
  <Card style={{ height: "auto",width:"100%" }}>
    <Card.Body>

      <div >
        <div >
        <img 
            src={key} 
            height={35} 
            width={35} 
            
          />
          <h6 style={{paddingTop:15}}>Available Beds</h6>
        
        </div> 
        <div style={{fontSize:32,fontWeight:600,font:"Gilroy"}}>
          {hostelCount.toLocaleString()}
        </div>
      </div>
    </Card.Body>
  </Card>
</div>

<div className="col-lg-3 col-md-3 col-sm-12 col-12 mb-3">
  <Card style={{ height: "auto",width:"100%" }}>
    <Card.Body>
      <div >
        <div >
        <img 
            src={clock} 
            height={35} 
            width={35} 
           
          />
          <h6 style={{paddingTop:15}}>Total Rooms</h6>
        
        </div>
        <div style={{fontSize:32,fontWeight:600,font:"Gilroy"}}>
          {hostelCount.toLocaleString()}
        </div>
      </div>
    </Card.Body>
  </Card>
</div>

<div className="col-lg-3 col-md-3 col-sm-12 col-12 mb-3">
  <Card style={{ height: "auto",width:"100%" }}>
    <Card.Body>
      <div >
        <div >
        <img 
            src={car} 
            height={35} 
            width={35} 
            
          />
          <h6 style={{paddingTop:15}}>Occupied Beds</h6>
        
        </div>
        <div style={{fontSize:32,fontWeight:600,font:"Gilroy"}}>
          {hostelCount.toLocaleString()}
        </div>
      </div>
    </Card.Body>
  </Card>
</div>   







      </div>
<div className='circulardes' >

<div className='w-full' style={{flex:1}}>


<div className='crddesg w-full' style={{ padding: '0px',paddingTop:"20px", border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#fff', maxWidth: '520px', }}>
  <div className='dropp' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10 20px' }}>
    <div style={{ display: 'flex', textAlign: 'start',fontSize:18,fontWeight:600 }}>
      Revenus vs Expenses
    </div>
    <div className="d-flex align-items-end mb-3 justify-content-end" style={{marginTop:10}}>
      <div className="dropdown">
        <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ color: 'black', borderColor: 'grey' }}>
          2024 - 2025
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" href="#">Action</a>
          <a className="dropdown-item" href="#">Another action</a>
          <a className="dropdown-item" href="#">Something else here</a>
        </div>
      </div>
    </div>
  </div>
{/* <ResponsiveContainer width="100%" height={300}>
  <BarChart
    data={data}
    margin={{ top: 10, left: 10, bottom: 40, right: 10 }}
    barGap={0}
    barCategoryGap="10%"
  >
    <CartesianGrid horizontal vertical={false} stroke="#e0e0e0" />
    <XAxis dataKey="name" style={{marginTop:"20px"}}>
      <Label value="Month" position="insideBottom" offset={-5}  />
    </XAxis>
    <YAxis axisLine={false} tickLine={false} tickFormatter={formatYAxis} dx={15}>
      <Label value="Amount" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} dx={20} />
    </YAxis>
    <Tooltip formatter={(value) => `$${value}`} />
    <Bar dataKey="Revenue" fill="#1E45E1" barSize={24} radius={[5, 5, 0, 0]}>
      <LabelList dataKey="RevenueLabel" position="bottom" style={{ fill: '#1E45E1' }} />
    </Bar>
    <Bar dataKey="Expenses" fill="#00C2FF" barSize={24} radius={[5, 5, 0, 0]}>
      <LabelList dataKey="ExpensesLabel" position="bottom" style={{ fill: '#00C2FF' }} />
      
    </Bar>
    <Legend verticalAlign="bottom" height={36} />
  </BarChart>
</ResponsiveContainer> */}



{/* <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 10, left: 10, bottom: 40, right: 10 }}
        barGap={0}
        barCategoryGap="10%"
      >
        <CartesianGrid horizontal vertical={false} stroke="#e0e0e0" />
        <XAxis dataKey="month" style={{marginTop:"20px"}}>
          <Label value="Month" position="insideBottom" offset={-5} />
        </XAxis>
        <YAxis axisLine={false} tickLine={false} tickFormatter={formatYAxis} dx={15}>
          <Label value="Amount" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} dx={20} />
        </YAxis>
        <Tooltip formatter={(value) => `$${value}`} />
        <Bar dataKey="Revenue" fill="#1E45E1" barSize={24} radius={[5, 5, 0, 0]}>
          <LabelList dataKey="RevenueLabel" position="top" style={{ fill: '#1E45E1' }} />
        </Bar>
        <Bar dataKey="Expenses" fill="#00C2FF" barSize={24} radius={[5, 5, 0, 0]}>
          <LabelList dataKey="ExpensesLabel" position="top" style={{ fill: '#00C2FF' }} />
        </Bar>
        <Legend verticalAlign="bottom" height={36} />
      </BarChart>
    </ResponsiveContainer> */}


{/* <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 10, left: 10, bottom: 40, right: 10 }}
        barGap={0}
        barCategoryGap="10%"
      >
        <CartesianGrid horizontal vertical={false} stroke="#e0e0e0" />
        <XAxis dataKey="month" style={{marginTop:"20px"}}>
          <Label value="Month" position="insideBottom" offset={-5} />
        </XAxis>
        <YAxis axisLine={false} tickLine={false} tickFormatter={formatYAxis} dx={15}>
          <Label value="Amount" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} dx={20} />
        </YAxis>
        <Tooltip formatter={(value) => `$${value}`} />
        <Bar dataKey="Revenue" fill="#1E45E1" barSize={24} radius={[5, 5, 0, 0]}>
          <LabelList dataKey="RevenueLabel" position="top" style={{ fill: '#1E45E1' }} />
        </Bar>
        <Bar dataKey="Expenses" fill="#00C2FF" barSize={24} radius={[5, 5, 0, 0]}>
          <LabelList dataKey="ExpensesLabel" position="top" style={{ fill: '#00C2FF' }} />
        </Bar>
        <Legend content={<CustomLegend />} verticalAlign="bottom" height={36} />
      </BarChart>
    </ResponsiveContainer> */}




{/* <div style={{ position: 'relative', width: '100%', height: 300 }}>
      <img src={arrow} alt="Arrow" style={{
        position: 'absolute',
        top: '10px',  // Adjust the position as needed
        left: '10px', // Adjust the position as needed
        width: '30px', // Adjust the size as needed
        height: '30px' // Adjust the size as needed
      }} />
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, left: 10, bottom: 40, right: 10 }}
          barGap={0}
          barCategoryGap="10%"
        >
          <CartesianGrid horizontal vertical={false} stroke="#e0e0e0" />
          <XAxis dataKey="month" style={{ marginTop: "20px" }}>
            <Label value="Month" position="insideBottom" offset={-5} />
          </XAxis>
          <YAxis axisLine={false} tickLine={false} tickFormatter={formatYAxis} dx={15}>
            <Label value="Amount" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} dx={20} />
          </YAxis>
          <Tooltip formatter={(value) => `$${value}`} />
          <Bar dataKey="Revenue" fill="#1E45E1" barSize={24} radius={[5, 5, 0, 0]}>
            <LabelList dataKey="RevenueLabel" position="top" style={{ fill: '#1E45E1' }} />
          </Bar>
          <Bar dataKey="Expenses" fill="#00C2FF" barSize={24} radius={[5, 5, 0, 0]}>
            <LabelList dataKey="ExpensesLabel" position="top" style={{ fill: '#00C2FF' }} />
          </Bar>
          <Legend content={<CustomLegend />} verticalAlign="bottom" height={36} />
        </BarChart>
      </ResponsiveContainer>
    </div> */}






{/* <div style={{ position: 'relative', width: '100%', height: 350 }}>

      <div style={{ position: 'absolute', top: '10px', left: '20px', display: 'flex', alignItems: 'center' }}>
        <img src={arrow} alt="Arrow" style={{
          width: '10px', 
          height: '30px', 
          marginLeft: '10px'
        }} />
        <div style={{ transform: 'rotate(-90deg)', transformOrigin: 'left center', marginTop: '180px', color: '#000' }}>Amount</div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, left: 50, bottom: 40, right: 10 }}
          barGap={0}
          barCategoryGap="10%"
        >
          <CartesianGrid horizontal vertical={false} stroke="#e0e0e0" />
          <XAxis dataKey="name" style={{ marginTop: "20px" }}>
            <Label value="Month" position="insideBottom" offset={-15} />
          </XAxis>
          <YAxis axisLine={false} tickLine={false} tickFormatter={formatYAxis} dx={-10} />
          <Tooltip formatter={(value) => `$${value}`} />
          <Bar dataKey="Revenue" fill="#1E45E1" barSize={24} radius={[5, 5, 0, 0]}>
            <LabelList dataKey="RevenueLabel" position="top" style={{ fill: '#1E45E1' }} />
          </Bar>
          <Bar dataKey="Expenses" fill="#00C2FF" barSize={24} radius={[5, 5, 0, 0]}>
            <LabelList dataKey="ExpensesLabel" position="top" style={{ fill: '#00C2FF' }} />
          </Bar>
          <Legend content={<CustomLegend />} verticalAlign="bottom" height={36} />
        </BarChart>
      </ResponsiveContainer>
    </div> */}


<div style={{ position: 'relative', width: '100%', height: 350 }}>
    <div style={{ position: 'absolute', top: '10px', left: '20px', display: 'flex', alignItems: 'center' }}>
      <img src={arrow} alt="Arrow" style={{ width: '10px', height: '30px', marginLeft: '10px' }} />
      <div style={{ transform: 'rotate(-90deg)', transformOrigin: 'left center', marginTop: '180px', color: '#000' }}>
        Amount
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
        <XAxis dataKey="name" style={{ marginTop: "20px" }}>
          {/* <Label value="Month" position="insideBottom" offset={-15} /> */}
        </XAxis>
        <YAxis axisLine={false} tickLine={false} tickFormatter={formatYAxis} dx={-10} />
        <Tooltip formatter={(value) => `$${value}`} />
        <Bar dataKey="Revenue" fill="#1E45E1" barSize={24} radius={[5, 5, 0, 0]}>
          <LabelList dataKey="RevenueLabel" position="top" style={{ fill: '#1E45E1' }} />
        </Bar>
        <Bar dataKey="Expenses" fill="#00C2FF" barSize={24} radius={[5, 5, 0, 0]}>
          <LabelList dataKey="ExpensesLabel" position="top" style={{ fill: '#00C2FF' }} />
        </Bar>
        <Legend content={<CustomLegend />} verticalAlign="bottom" height={36} />
      </BarChart>
    </ResponsiveContainer>
    {/* <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center',flexDirection:"row" }}>
      <Label value="Month" position="insideBottom" offset={-15} />
      <img src={leftarrow} alt="Arrow" style={{ width: '30px', height: '10px' }} />
    </div> */}
    <div style={{ position: 'absolute', bottom: '50px', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
      <span style={{ marginRight: '5px' }}>Month</span>
      <img src={leftarrow} alt="Arrow" style={{ width: '30px', height: '10px' }} />
    </div>
  </div>
 
</div>

<Card  style={{ marginTop:15,height:"28%",width:"94%"}}>
  <Card.Body className="d-flex flex-column align-items-start">
    <div  style={{fontSize:"18px",fontWeight:600,font:"Montserrat"}}>Revenue Target</div>
    <div className='circulardesone' >
      <div className= 'circular-progressbar-container' style={{ width: '40%',marginLeft:30,marginTop:10 }}>
      <CircularProgressbar
   
     value={percentage}
     text={"₹" + Revenue.toLocaleString()}
     circleRatio={0.5}
     styles={buildStyles({
       rotation: 0.75,
       textSize: '15px',
       pathColor: '#00A32E',
       trailColor: '#EBEBEB',
       textColor: '#000000',
      //  width:"70%",
       text: {
         fill: '#0000000',
         transform: 'rotate(80deg)',
         transformOrigin: 'center center',
       },
     })}
   />
      </div>
     
      <div className="texrtalii">
  <div className="status-item">
    <div className="dot received"></div>
    <div>
      <div>Received</div>
      <div>₹19,500</div>
    </div>
  </div>
  <div className="status-item">
    <div className="dot receivable"></div>
    <div>
      <div>Receivable</div>
      <div>₹30,000</div>
    </div>
  </div>
</div>
    </div>
  </Card.Body>
</Card>
   
              

</div>

<div style={{flex:1}}>


<div className="expenses-container">
      <div className="headertwo">
        <h2>Expenses Breakdown</h2>
      </div>
      <div className="content">
        <div className="chart">
          <Doughnut data={datum} options={options} />
          <div className="center-text">₹19,500</div>
        </div>
        <div className="categories">
          {labels.map((label, index) => (
            <div className="category" key={index}>
              <span className="dot" style={{ backgroundColor: datasets[0].backgroundColor[index] }}></span>
              <div className="text">
                <p>{label}</p>
                <p>₹19,500</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="complaints-container">
  <div className="header">
    <h2>Active Complaints</h2>
    <a href="/view-all" style={{ paddingRight: 20 }}>View all</a>
  </div>
  {complaintsData.map((complaint, index) => (
    <div className="complaint" key={index}>
      <img src={complaint.img} alt={complaint.name} className="avatar" />
      <div className="complaint-info">
        <p className="name">{complaint.name}</p>
        <p className="details">{complaint.type} . {complaint.date}</p>
      </div>
      <div>
        <div className={`status ${complaint.status.toLowerCase()}`}>
          {complaint.status}
        </div>
        <div className="room">{complaint.room}</div>
      </div>
    </div>
  ))}
</div>


</div>

</div>


  </div>


  )
}

export default Dashboard;


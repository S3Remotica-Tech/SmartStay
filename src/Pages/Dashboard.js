
import React, { useState, useEffect } from 'react'
import SemiCircleProgressBar from "react-progressbar-semicircle";
import { TbClockCheck, TbClockCancel } from "react-icons/tb";
import { ImClock2 } from "react-icons/im";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownButton, ListGroup, Badge } from 'react-bootstrap';
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
import Compliance from './Compliance';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Profile from '../Assets/Images/New_images/profile-picture.png';
import drop from '../Assets/Images/New_images/arrow-down.png';
import { Offcanvas, Form, FormControl } from 'react-bootstrap';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label, LabelList
} from 'recharts';
import { borderRadius, color, fontFamily, fontSize, fontWeight } from '@mui/system';

function Dashboard(props) {



  const formatYAxis = (tickItem) => {
    return `${tickItem}`;
  }

  const state = useSelector(state => state)
  console.log("state", state)
  const dispatch = useDispatch();
  const [data, setData] = useState([])
  const [dashboardList, setDashboardList] = useState([])
  const LoginId = localStorage.getItem("loginId")
  const [login_Id, setLogin_Id] = useState('')
  const [lablesdata, setLables] = useState([])
  const [totalAmount, setTotalAmount] = useState([])
  const [activecommpliance, setActivecommpliance] = useState([])
  console.log("activecommpliance", activecommpliance);


  console.log("lablesdata", lablesdata)


  useEffect(() => {
    setTotalAmount(state.PgList.dashboardDetails.totalAmount)
  }, [state.PgList.dashboardDetails.totalAmount])



  const handlecompliance = (compliance) => {
    props.displayCompliance(compliance)
  }


  useEffect(() => {

    setLables(state.PgList.dashboardDetails.categoryList)
  }, [state.PgList.dashboardDetails.categoryList])
  useEffect(() => {
    setData(state.PgList.dashboardDetails.Revenue_reports)



  }, [state.PgList.dashboardDetails.Revenue_reports])

  useEffect(() => {
    dispatch({ type: 'PGDASHBOARD' })
  }, [])

  useEffect(() => {
    if (state.PgList?.dashboardDetails?.dashboardList) {
      setDashboardList(state.PgList.dashboardDetails.dashboardList)

    }
  }, [state.PgList.dashboardDetails.dashboardList])

  console.log("dashboardList", dashboardList)

  useEffect(() => {
    setActivecommpliance(state.PgList.dashboardDetails?.com_data)
  }, [state.PgList.dashboardDetails?.com_data])
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
    first_name = 0,
    last_name = 0,
  } = dashboardList[0] || {};

  console.log(hostelCount, roomCount, TotalBed, availableBed, occupied_Bed, Revenue, current, overdue);

  const total = Revenue;
  const percentage = ((Revenue - overdue) / total) * 100;
  console.log("percentage", percentage);

  const pathColor = current >= overdue ? '#00A32E' : 'EBEBEB';
  const trailColor = overdue >= current ? '#EBEBEB' : '#00A32E';

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const datum = {
    labels: lablesdata?.map(category => category.category_Name),
    datasets: [
      {
        data: lablesdata?.map(category => category.Amount),
        backgroundColor: lablesdata?.map(() => getRandomColor()),
        hoverBackgroundColor: lablesdata?.map(() => getRandomColor()),
        borderWidth: 5,
        borderColor: '#fff',
        borderRadius: 10
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
  
  
    const {  datasets } = datum;
  
    if (!datasets || datasets.length === 0 || !datasets[0].backgroundColor) {
      return <div className="d-flex justify-content-center align-items-start gap-3" style={{height:"100%"}}><Spinner animation="grow" style={{color:"rgb(30, 69, 225)"}} /> <div style={{color:"rgb(30, 69, 225)", fontWeight:600}}>Loading.....</div></div> 
  
    }
   
    
    const CustomLegend = ({ payload }) => {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',paddingTop:15}}>
          {payload.map((entry, index) => (
            <div key={`item-${index}`} style={{ display: 'flex', alignItems: 'center', marginRight: 10,marginTop:25 }}>
              <div style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: entry.color,
                marginRight: 5
              }} />
              <span  style={{fontSize:12,fontWeight:600,fontFamily:"Montserrat"}}>{entry.value}</span>
            </div>
          ))}
        </div>
      );
    };



  return (

    <div className='cotainer  p-4' >
      <div className='texxttt'>
        <div style={{ flex: 1 }}>
          <lable style={{ fontFamily: "Montserrat", fontWeight: 600, fontSize: "24px", lineHeight: "28.63px" }}>Welcome back,   {first_name.toLocaleString()} {last_name.toLocaleString()}!</lable>
          <p style={{ fontFamily: "Montserrat", fontWeight: 400, fontSize: "16px", color: "#4B4B4B" }} >Manage all the inventory and analytics form here</p>
        </div>

      </div>



      <div className="row carddesign">
        <div className="col-lg-4 col-md-12 col-sm-12 col-xl-3 mb-3">
          <Card style={{ height: "auto", width: "100%", borderRadius: "20px" }}>
            <Card.Body>
              <div>
                <div>
                  <img src={vector} height={32} width={32} />
                  <p style={{ paddingTop: 15, fontSize: 16, fontWeight: 400, fontFamily: "Montserrat" }}>Total Hostel</p>
                </div>
                <p style={{ fontSize: 32, fontWeight: 600, fontFamily: "Montserrat" }}>
                  {hostelCount.toLocaleString()}
                </p>
              </div>
            </Card.Body>
          </Card>
        </div>

        <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
          <Card style={{ height: "auto", width: "100%", borderRadius: "20px" }}>
            <Card.Body>
              <div>
                <div>
                  <img src={key} height={32} width={32} />
                  <p style={{ paddingTop: 15, fontSize: 16, fontWeight: 400, fontFamily: "Montserrat" }}>Available Beds</p>
                </div>
                <p style={{ fontSize: 32, fontWeight: 600, fontFamily: "Montserrat" }}>
                  {availableBed.toLocaleString()}
                </p>
              </div>
            </Card.Body>
          </Card>
        </div>

        <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
          <Card style={{ height: "auto", width: "100%", borderRadius: "20px" }}>
            <Card.Body>
              <div>
                <div>
                  <img src={clock} height={32} width={32} />
                  <p style={{ paddingTop: 15, fontSize: 16, fontWeight: 400, fontFamily: "Montserrat" }}>Total Rooms</p>
                </div>
                <p style={{ fontSize: 32, fontWeight: 600, fontFamily: "Montserrat" }}>
                  {roomCount.toLocaleString()}
                </p>
              </div>
            </Card.Body>
          </Card>
        </div>

        <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
          <Card style={{ height: "auto", width: "100%", borderRadius: "20px" }}>
            <Card.Body>
              <div>
                <div>
                  <img src={car} height={35} width={35} />
                  <p style={{ paddingTop: 15, fontSize: 16, fontWeight: 400, fontFamily: "Montserrat" }}>Occupied Beds</p>
                </div>
                <p style={{ fontSize: 32, fontWeight: 600, fontFamily: "Montserrat" }}>
                  {occupied_Bed.toLocaleString()}
                </p>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>


      <div className='circulardes' >

        <div className='w-full' style={{ flex: 1 }}>


          <div className='crddesg w-full' style={{ padding: '0px', paddingTop: "20px", border: '1px solid #e0e0e0', borderRadius: '20px', backgroundColor: '#fff', }}>
            <div className='dropp' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10 20px' }}>
              <div style={{ display: 'flex', textAlign: 'start' }}>
                <p style={{ fontFamily: "Montserrat", fontSize: 18, fontWeight: 600, paddingLeft: 10 }}>Revenus vs Expenses</p>
              </div>
              <div className="d-flex align-items-end mb-3 justify-content-end" style={{ marginTop: 10 }}>
       

<div style={{ position: 'relative', width: 118, height: 36 }}>
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
      backgroundSize: "16px 16px"
    }}
  >
    <option>2023-2024</option>
    <option>2024-2025</option>
  </select>


  
</div>
              </div>
            </div>

            <div style={{ position: 'relative', width: '100%', height: 350 }}>
              <div style={{ position: 'absolute', top: '10px', left: '20px', display: 'flex', alignItems: 'center' }}>
                <img src={arrow} alt="Arrow" style={{ width: '10px', height: '30px', marginLeft: '10px' }} />
                <div style={{ transform: 'rotate(-90deg)', transformOrigin: 'left center', marginTop: '150px', color: '#000' }}>
                  <p className='me-3' style={{ fontFamily: "Montserrat", fontWeight: 600, fontSize: 12, color: "#4B4B4B" }}>  Amount</p>
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
                  <XAxis dataKey="month" style={{ marginTop: "20px" }} tick={{ fontFamily: 'Gilroy', fontSize: 12, fontWeight: 500 }}>
                    <Label value="" position="insideBottom" offset={-15} />
                  </XAxis>
                  <YAxis axisLine={false} tickLine={false} tickFormatter={formatYAxis} dx={-10} tick={{ fontFamily: 'Gilroy', fontSize: 12, fontWeight: 500 }} />
                  <Tooltip formatter={(value) => `${value}`} />
                  <Bar dataKey="revenue" fill="#1E45E1" barSize={24} radius={[5, 5, 0, 0]}>
                    <LabelList dataKey="Revenue" position="top" style={{ fill: '#1E45E1' }} />
                  </Bar>
                  <Bar dataKey="expense" fill="#00C2FF" barSize={24} radius={[5, 5, 0, 0]}>
                    <LabelList dataKey="ExpensesLabel" position="top" style={{ fill: '#00C2FF' }} />
                  </Bar>
                  <Legend content={<CustomLegend />} verticalAlign="bottom" height={36} />
                </BarChart>
              </ResponsiveContainer>

              <div style={{ position: 'absolute', bottom: '50px', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                <span style={{ marginRight: '5px', fontFamily: "Montserrat", fontWeight: 600, fontSize: 12, color: "#4B4B4B" }}>Month</span>
                <img src={leftarrow} alt="Arrow" style={{ width: '30px', height: '10px' }} />

              </div>



            </div>

          </div>

          <Card style={{ marginTop: 15, height: "auto", width: "97%", borderRadius: "20px" }}>
            <Card.Body className="d-flex flex-column align-items-start">
              <div style={{ fontSize: "18px", fontWeight: 600, fontFamily: "Montserrat", paddingLeft: 10 }}>Revenue Target</div>
              <div className='circulardesone' >
                <div className='circular-progressbar-container' style={{ width: '35%', marginLeft: 30, marginTop: 10 }}>
                  <CircularProgressbar

                    value={percentage}
                    text={"₹" + Revenue.toLocaleString()}
                    circleRatio={0.5}
                    styles={buildStyles({
                      rotation: 0.75,
                      pathColor: '#00A32E',
                      trailColor: '#EBEBEB',
                      textColor: '#000000',
                      textSize: 15,

                      //  width:"70%",
                      text: {
                        fill: '#0000000',

                        transform: 'rotate(80deg)',
                        transformOrigin: 'center center',
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
                      <div style={{ fontSize: 16, fontWeight: 600, fontFamily: "Montserrat" }}>Received</div>
                      <div style={{ fontSize: 16, fontWeight: 600, fontFamily: "Gilry" }}>₹{current.toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="status-item">
                    <div className="dot receivable"></div>
                    <div style={{ marginTop: 10 }}>
                      <div style={{ fontSize: 16, fontWeight: 600, fontFamily: "Montserrat" }}>Receivable</div>
                      <div style={{ fontSize: 16, fontWeight: 600, fontFamily: "Gilry" }}>₹{overdue.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>



        </div>

        <div style={{ flex: 1 }}>


          <div className="expenses-container">
            <div className="headertwo">
              <p style={{ fontFamily: "Montserrat", fontSize: 18, fontWeight: 600 }}>Expenses Breakdown</p>
            </div>
            <div className="content">
              <div className="chart">
                <Doughnut data={datum} options={options} style={{ width: 196, height: 196 }} />
                <p className="center-text" style={{ fontFamily: "Gilroy", fontSize: 25, fontWeight: 600 }}>₹{totalAmount}</p>
              </div>
              <div className="categories">
                {lablesdata?.map((label, index) => (
                  <div className="category" key={index}>
                    <span className="dot" style={{ backgroundColor: datasets[0].backgroundColor[index] }}></span>
                    <div className="text">
                      <p style={{ fontFamily: "Montserrat", fontSize: 12, fontWeight: 600, color: "#4B4B4B" }}>{label.category_Name}</p>
                      <p style={{ fontFamily: "Gilroy", fontSize: 16, fontWeight: 600 }}>₹{label.Amount}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="complaints-container">
            <div className="header">
              <p style={{ fontSize: 18, fontWeight: 600, fontFamily: "Montserrat", paddingLeft: "10px", marginTop: 15 }}>Active Complaints</p>
              <a style={{ textAlign: "right", paddingRight: 15, fontWeight: 600, fontSize: 16, fontFamily: "Montserrat", color: "#1E45E1", cursor: "pointer" }} onClick={() => handlecompliance()}>View all</a>
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
                  <div className="complaint"  >
                    {/* <img src={Profile} alt={complaint.name} className="avatar" /> */}
                    <img src={complaint.profile == 0 ? Profile : complaint.profile} className="avatar" />

                    <div className="complaint-info">
                      <p className="name" style={{ fontSize: 16, fontFamily: "Gilroy", fontWeight: 600 }} >{complaint.Name}</p>
                      <p className="details" style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 500, color: "#4B4B4B" }}>{complaint.Complainttype} . {formattedDate}</p>
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

                            backgroundColor: complaint.Status === 'Pending' ? '#FFED9A' : '#DAFFD9'
                          }}
                        >
                          <span>{complaint.Status}</span>
                        </p>
                        {/* <p style={{fontSize:14,fontFamily:"Gilroy",fontWeight:500,color:"#222222",paddingTop:3,paddingBottom:3,paddingLeft:2,paddingRight:2,marginBottom:"0px"}}> {complaint.Status}</p> */}
                      </div>
                      <div className="room" style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 500, color: "#4B4B4B", paddingRight: "10px" }}>Room #{complaint.Room}.Bed{complaint.Bed} </div>
                    </div>
                  </div>
                </>
              )

            })}
          </div>


        </div>

      </div>


    </div>


  )
}

export default Dashboard;
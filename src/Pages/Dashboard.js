
import React, { useState, useEffect } from 'react'
import SemiCircleProgressBar from "react-progressbar-semicircle";
import { TbClockCheck, TbClockCancel } from "react-icons/tb";
import { ImClock2 } from "react-icons/im";
import '../Pages/Dashboard.css';
import Card from 'react-bootstrap/Card';
import File from "../Assets/check-file (1).png"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import UpArrowblue from "../Assets/Images/UP_BLUE.png"
import dots from "../Assets/Images/dots.png"
import UpArrowred from "../Assets/Images/UP_RED.png"
import clock from "../Assets/Images/time-management.png"
import Onclock from "../Assets/Images/on-time.png"
import Delete from "../Assets/Images/delete.png";
import { useDispatch, useSelector } from 'react-redux';
import DashboardChart from './DashboardChart';

function Dashboard() {

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

  const pathColor = current >= overdue ? '#22CBAE' : 'red';
  const trailColor = overdue >= current ? 'red' : '#22CBAE';

  return (
    <div className="container ms-4 mt-5">
      <div className="row">
      
      <div className="col-lg-2 col-md-3 col-sm-6 col-12 mb-3">
  <Card style={{ height: "auto", backgroundColor: "#F6F7FB" }}>
    <Card.Body>
      <div className='row d-flex align-items-center justify-content-between'>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <h6>Total Hostel</h6>
          <img 
            src={File} 
            height={25} 
            width={25} 
            style={{ backgroundColor: "#F4ECFB", padding: 6 }} 
          />
        </div>
        <div style={{ display: "flex", width: "100%" }}>
          <h3>{hostelCount.toLocaleString()}</h3>
        </div>
      </div>
    </Card.Body>
  </Card>
</div>

<div className="col-lg-2 col-md-3 col-sm-6 col-12 mb-3">
  <Card style={{ height: "auto", backgroundColor: "#F6F7FB" }}>
    <Card.Body>
      <div className='row d-flex align-items-center justify-content-between'>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <h6>Total Room</h6>
          <img 
            src={clock} 
            height={18} 
            width={18} 
            style={{ backgroundColor: "#FFECEE" }} 
          />
        </div>
        <div style={{ display: "flex", width: "100%" }}>
          <h3>{roomCount.toLocaleString()}</h3>
        </div>
      </div>
    </Card.Body>
  </Card>
</div>

<div className="col-lg-2 col-md-3 col-sm-6 col-12 mb-3">
  <Card style={{ backgroundColor: "#F6F7FB" }}>
    <Card.Body>
      <div className='row d-flex align-items-center justify-content-between'>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <h6>Total Bed</h6>
          <img 
            src={Onclock} 
            height={28} 
            width={28} 
            style={{ backgroundColor: "#EAFAF7", padding: 6 }} 
          />
        </div>
        <div style={{ display: "flex", width: "100%" }}>
          <h3>{TotalBed.toLocaleString()}</h3>
        </div>
      </div>
    </Card.Body>
  </Card>
</div>

        {/* <div className="col-lg-5 col-md-4 col-sm-12 col-12 mb-3">
          <Card className="h-100" style={{ backgroundColor: "#F6F7FB" }}>
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div className="text-center">
                <h6>Free Bed</h6>
                <img src={Onclock} height={28} width={28} style={{ backgroundColor: "#EAFAF7", padding: 6 }} />
                <h3>{availableBed.toLocaleString()}</h3>
              </div>
              <div className="text-center">
                <h6>Occupied Bed</h6>
                <img src={Delete} height={28} width={28} style={{ backgroundColor: "#FFECEE", padding: 6 }} />
                <h3>{occupied_Bed.toLocaleString()}</h3>
              </div>
            </Card.Body>
          </Card>
        </div> */}


<div className="col-lg-5 col-md-4 col-sm-12 col-12 mb-3">
  <Card className="h-100" style={{ backgroundColor: "#F6F7FB" }}>
    <Card.Body>
      <div className='d-flex  justify-content-between'>
        <div className='d-flex flex-column  m-2'>
          <div className='d-flex align-items-center'>
            <h6 >Free Bed</h6>
            <img src={Onclock} height={28} width={28} style={{ marginLeft: 10, backgroundColor: "#EAFAF7", padding: 6 }} />
          </div>
          <h3>{availableBed.toLocaleString()}</h3>
        </div>
        <div className='d-flex flex-column  m-2'>
          <div className='d-flex align-items-center'>
            <h6>Occupied Bed</h6>
            <img src={Delete} height={28} width={28} style={{ marginLeft: 10, backgroundColor: "#FFECEE", padding: 6 }} />
          </div>
          <h3>{occupied_Bed.toLocaleString()}</h3>
        </div>
      </div>
    </Card.Body>
  </Card>
</div>




      </div>

      <div className="row mt-5">
        <div className="col-lg-4 col-md-6 col-sm-12 col-12 mb-3">
          <Card className="h-100" style={{ backgroundColor: "#F6F7FB" }}>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <h6>Total Receivables</h6>
                <img src={dots} width={20} height={20} />
              </div>
              <p>Revenue Target</p>
              <div className="d-flex justify-content-center" style={{ height: '200px' }}>
                <CircularProgressbar
                  value={percentage}
                  text={"₹" + Revenue.toLocaleString()}
                  circleRatio={0.5}
                  styles={buildStyles({
                    rotation: 0.75,
                    textSize: '15px',
                    pathColor: '#22CBAE', 
                    trailColor: 'red',
                    text: {
                      fill: '#22CBAE',
                      transform: 'rotate(90deg)',
                      transformOrigin: 'center center',
                    },
                  })}
                />
              </div>
              <div className="d-flex justify-content-around">
                <div className="text-center">
                  <p>Current</p>
                  <h5>₹ {current.toLocaleString()} <img src={UpArrowblue} /></h5>
                </div>
                <div className="text-center">
                  <p style={{ color: '#E72222' }}>Overdue</p>
                  <h5>₹ {overdue.toLocaleString()} <img src={UpArrowred} /></h5>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="col-lg-7 col-md-6 col-sm-12 col-12 mb-3">
          <Card className="h-100" style={{ backgroundColor: "#F6F7FB" }}>
            <Card.Body>
              <div className="text-center">
                <h6>Statistics</h6>
                <p>Revenue and Booking</p>
                <DashboardChart />
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;


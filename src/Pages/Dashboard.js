import React, { useState,useEffect } from 'react'
import SemiCircleProgressBar from "react-progressbar-semicircle";
import { TbClockCheck } from "react-icons/tb";
import { TbClockCancel } from "react-icons/tb";
import { ImClock2 } from "react-icons/im";
import '../Pages/Dashboard.css';
import Card from 'react-bootstrap/Card';
import File from "../Assets/check-file (1).png"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import { Flex, Box } from "rebass";
import "react-circular-progressbar/dist/styles.css";
import { borderRadius } from '@mui/system';
import UpArrowblue from "../Assets/Images/UP_BLUE.png"
import UpArrowred from "../Assets/Images/UP_RED.png"
import { useDispatch, useSelector } from 'react-redux';
import CryptoJS from "crypto-js";
import DashboardChart from './DashboardChart';

function Dashboard() {

     const state = useSelector(state => state)
     console.log("state",state)
    const dispatch = useDispatch();
    const [dashboardList,setDashboardList]=useState(state.PgList.dashboardDetails.dashboardList)
    const LoginId = localStorage.getItem("loginId")
    const [login_Id, setLogin_Id] = useState('')
      useEffect(() => {
        if (LoginId) {
          try{
            const decryptedData = CryptoJS.AES.decrypt(LoginId, 'abcd');
            const decryptedIdString = decryptedData.toString(CryptoJS.enc.Utf8);
            const parsedData = Number(decryptedIdString);
            setLogin_Id(parsedData)
                  dispatch({ type: 'PGDASHBOARD', payload:{created_by:parsedData} })
                }
          
            catch(error){
          console.log("Error decrypting loginid",error);
            }
        }
  
      }, [])
      useEffect(()=>{
        setDashboardList(state.PgList.dashboardDetails.dashboardList)
      },[state.PgList.dashboardDetails.dashboardList])
    // const percentage = 70;
   

    console.log("dashboardList",dashboardList)
    if (!dashboardList || dashboardList.length === 0) {
      return null; 
    }
  
    const {
      hostelCount ,
      roomCount ,
      TotalBed ,
      availableBed ,
      occupied_Bed ,
      Revenue ,
      current,
      overdue ,
    } = dashboardList[0];
  
    const percentage = (Revenue / 100000) * 100;
    return (
<div>
           

      {
        dashboardList &&
      
        <div className="container ms-4 mt-5">
        <div className='row' style={{ gap: '15px' }}>
          <div className="col-lg-2 col-md-3 col-sm-6 col-12 mb-3">
            <Card style={{ height: "auto", backgroundColor: "#F6F7FB" }}>
              <Card.Body>
                <div className='row d-flex align-items-center justify-content-center'>
                  <div style={{ display: "flex", flexDirection: 'row', paddingLeft: 10 }}>
                    <h6>Total Hostel</h6>
                    <img src={File} height={18} width={18} style={{ marginLeft: 25, marginTop: 6 }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: 'row', paddingLeft: 20 }}>
                    <h3>{hostelCount.toLocaleString()}</h3>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
  
          <div className="col-lg-2 col-md-3 col-sm-6 col-12 mb-3">
            <Card style={{ height: "auto", backgroundColor: "#F6F7FB" }}>
              <Card.Body>
                <div className='row d-flex align-items-center justify-content-center'>
                  <div style={{ display: "flex", flexDirection: 'row', paddingLeft: 20 }}>
                    <h6>Total Room</h6>
                    <ImClock2 style={{ marginLeft: 25, marginTop: 6, color: 'orangered' }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: 'row', paddingLeft: 20 }}>
                    <h3>{roomCount.toLocaleString()}</h3>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
  
          <div className="col-lg-2 col-md-3 col-sm-6 col-12 mb-3">
            <Card style={{ height: "auto", backgroundColor: "#F6F7FB" }}>
              <Card.Body>
                <div className='row d-flex align-items-center justify-content-center'>
                  <div style={{ display: "flex", flexDirection: 'row', paddingLeft: 20 }}>
                    <h6>Total Bed</h6>
                    <TbClockCheck style={{ marginLeft: 25, marginTop: 6, color: 'green' }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: 'row', paddingLeft: 20 }}>
                    <h3>{TotalBed.toLocaleString()}</h3>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
  
          <div className="col-lg-5 col-md-4 col-sm-12 col-12 mb-3">
            <Card style={{ height: "auto", backgroundColor: "#F6F7FB" }}>
              <Card.Body>
                <div style={{ display: "flex", flexDirection: 'row' }}>
                  <div className='row d-flex align-items-center justify-content-center'>
                    <div style={{ display: "flex", flexDirection: 'row', paddingLeft: 20 }}>
                      <h6>Free Bed</h6>
                      <TbClockCheck style={{ marginLeft: 25, marginTop: 6, color: 'green' }} />
                    </div>
                    <div style={{ display: "flex", flexDirection: 'row', paddingLeft: 20 }}>
                      <h3>{availableBed.toLocaleString()}</h3>
                    </div>
                  </div>
  
                  <div className='row d-flex align-items-center justify-content-center'>
                    <div style={{ display: "flex", flexDirection: 'row', paddingLeft: 20 }}>
                      <h6>Occupied Bed</h6>
                      <TbClockCancel style={{ marginLeft: 25, marginTop: 6, color: 'red' }} />
                    </div>
                    <div style={{ display: "flex", flexDirection: 'row', paddingLeft: 20 }}>
                      <h3>{occupied_Bed.toLocaleString()}</h3>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
  
        <div className='row' style={{ gap: '30px', marginTop: 50 }}>
          <div className="col-lg-4 col-md-6 col-sm-12 col-12">
            <Card style={{ backgroundColor: "#F6F7FB" }}>
              <Card.Body>
                <div className='row d-flex align-items-center justify-content-center'>
                  <div style={{ display: "flex", flexDirection: 'row', paddingLeft: 20 }}>
                    <h6>Total Receivables</h6>
                  </div>
                  <div style={{ display: "flex", flexDirection: 'row', paddingLeft: 20 }}>
                    <p>Revenue Target</p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', height: '200px' }}>
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
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <div>
                      <p style={{ marginLeft: 10 }}>Current</p>
                      <h5 style={{ marginRight: 50 }}>₹ {current.toLocaleString()} <img src={UpArrowblue} /></h5>
                    </div>
                    <div>
                      <p style={{ color: '#E72222', marginLeft: 10 }}>Overdue</p>
                      <h5 style={{ marginRight: 50 }}>₹ {overdue.toLocaleString()} <img src={UpArrowred} /></h5>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
  
          <div className="col-lg-7 col-md-6 col-sm-12 col-12 mb-3">
            <Card style={{ height: "auto", backgroundColor: "#F6F7FB" }}>
              <Card.Body>
                <div className='row d-flex align-items-center justify-content-center'>
                  <div style={{ display: "flex", flexDirection: 'row', paddingLeft: 20 }}>
                    <h6>Statistics</h6>
                  </div>
                  <div style={{ display: "flex", flexDirection: 'row', paddingLeft: 20 }}>
                    <p>Revenue and Booking</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
      
      }
      
      </div>
          

           {
             dashboardList &&
           
                          
                              <div className="container ms-4 mt-5">
             <div className='row' style={{ gap: '15px' }}>
               <div className="col-lg-2 col-md-3 col-sm-6 col-12 mb-3">
                 <Card style={{ height: "auto", backgroundColor: "#F6F7FB" }}>
                   <Card.Body>
                     <div className='row d-flex align-items-center justify-content-center'>
                       <div style={{ display: "flex", flexDirection: 'row', paddingLeft: 10 }}>
                         <h6>Total Hostel</h6>
                         <img src={File} height={18} width={18} style={{ marginLeft: 25, marginTop: 6, color: 'violet' }} />
                       </div>
                       <div style={{ display: "flex", flexDirection: 'row', paddingLeft: 20 }}>
                         <h3>{dashboardList[0].hostelCount}</h3>
                       </div>
                     </div>
                   </Card.Body>
                 </Card>
               </div>
           
               <div className="col-lg-2 col-md-3 col-sm-6 col-12 mb-3">
                 <Card style={{ height: "auto", backgroundColor: "#F6F7FB" }}>
                   <Card.Body>
                     <div className='row d-flex align-items-center justify-content-center'>
                       <div style={{ display: "flex", flexDirection: 'row', paddingLeft: 20 }}>
                         <h6>Total Room</h6>
                         <ImClock2 style={{ marginLeft: 25, marginTop: 6, color: 'orangered' }} />
                       </div>
                       <div style={{ display: "flex", flexDirection: 'row', paddingLeft: 20 }}>
                         <h3>{dashboardList[0].roomCount}</h3>
                       </div>
                     </div>
                   </Card.Body>
                 </Card>
               </div>
           
               <div className="col-lg-2 col-md-3 col-sm-6 col-12 mb-3">
                 <Card style={{ height: "auto", backgroundColor: "#F6F7FB" }}>
                   <Card.Body>
                     <div className='row d-flex align-items-center justify-content-center'>
                       <div style={{ display: "flex", flexDirection: 'row', paddingLeft: 20 }}>
                         <h6>Total Bed</h6>
                         <TbClockCheck style={{ marginLeft: 25, marginTop: 6, color: 'green' }} />
                       </div>
                       <div style={{ display: "flex", flexDirection: 'row', paddingLeft: 20 }}>
                         <h3>{dashboardList[0].TotalBed}</h3>
                       </div>
                     </div>
                   </Card.Body>
                 </Card>
               </div>
           
               <div className="col-lg-5 col-md-4 col-sm-12 col-12 mb-3">
                 <Card style={{ height: "auto", backgroundColor: "#F6F7FB" }}>
                   <Card.Body>
                     <div style={{ display: "flex", flexDirection: 'row' }}>
                       <div className='row d-flex align-items-center justify-content-center'>
                         <div style={{ display: "flex", flexDirection: 'row', paddingLeft: 20 }}>
                           <h6>Free Bed</h6>
                           <TbClockCheck style={{ marginLeft: 25, marginTop: 6, color: 'green' }} />
                         </div>
                         <div style={{ display: "flex", flexDirection: 'row', paddingLeft: 20 }}>
                           <h3>{dashboardList[0].availableBed}</h3>
                         </div>
                       </div>
           
                       <div className='row d-flex align-items-center justify-content-center'>
                         <div style={{ display: "flex", flexDirection: 'row', paddingLeft: 20 }}>
                           <h6>Occupied Bed</h6>
                           <TbClockCancel style={{ marginLeft: 25, marginTop: 6, color: 'red' }} />
                         </div>
                         <div style={{ display: "flex", flexDirection: 'row', paddingLeft: 20 }}>
                           <h3>{dashboardList[0].occupied_Bed}</h3>
                         </div>
                       </div>
                     </div>
                   </Card.Body>
                 </Card>
               </div>
             </div>
           
             <div className='row' style={{ gap: '30px', marginTop: 50 }}>
               <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                 <Card style={{ backgroundColor: "#F6F7FB" }}>
                   <Card.Body>
                     <div className='row d-flex align-items-center justify-content-center'>
                       <div style={{ display: "flex", flexDirection: 'row', paddingLeft: 20 }}>
                         <h6>Total Receivables</h6>
                       </div>
                       <div style={{ display: "flex", flexDirection: 'row', paddingLeft: 20 }}>
                         <p>Revenue Target</p>
                       </div>
                       <div style={{ display: 'flex', justifyContent: 'center',height:'200px' }}>
                       <CircularProgressbar
                   value={percentage}
                   text= {"₹" + dashboardList[0].Revenue}
                   circleRatio={0.5}
                   styles={buildStyles({
                     rotation: 0.75,
                     textSize: '15px', 
                     pathColor: '#22CBAE',
                     trailColor: 'red',
                  
                     root: {
                       transform: 'rotate(0.75turn)',
                     },
                     text: {
                       fill: '#22CBAE',
                       transform: 'rotate(90deg)', 
                       transformOrigin: 'center center',
                     },
                   })}
                 />
                    
                       </div>
                       <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
                       <div >
                        <p style={{marginLeft:10}}>current</p>
                        <h5 style={{marginRight:50}}>₹ {dashboardList[0].current} <img src={UpArrowblue} /></h5>
                       </div>
                       <div>
                       <p style={{color:'#E72222',marginLeft:10}}>overdue</p>
                        <h5 style={{marginRight:50}}>₹ {dashboardList[0].overdue} <img src={UpArrowred} /></h5>
                       </div>
                     </div>
                     </div>
                   </Card.Body>
                 </Card>
               </div>
           
               <div className="col-lg-7 col-md-6 col-sm-12 col-12 mb-3">
                 <Card style={{ height: "auto", backgroundColor: "#F6F7FB" }}>
                   <Card.Body>
                     <div className='row d-flex align-items-center justify-content-center'>
                       <div style={{ display: "flex", flexDirection: 'row', paddingLeft: 20 }}>
                         <h6>Statistics</h6>
                       </div>
                       <div style={{ display: "flex", flexDirection: 'row', paddingLeft: 20 }}>
                         <p>Revenue and Booking</p>
                       </div>
                       <div style={{ display: "flex", flexDirection: 'row', paddingLeft: 20 }}>
                        <DashboardChart/>
                       </div>
                     </div>
                   </Card.Body>
                 </Card>
               </div>
             </div>
           </div>
           
           }
           
           </div>

    )
}

export default Dashboard;
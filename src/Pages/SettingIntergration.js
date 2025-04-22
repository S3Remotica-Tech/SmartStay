import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import whatsapp from "../Assets/Images/New_images/newWhats.png"
import avtar from "../Assets/Images/New_images/settinAvthar.png"
import msg from "../Assets/Images/New_images/message.png"
import './SettingIntergration.css';

function SettingIntergration(){
    return(
        <>
       <div className="container ">
       
        <div style={{marginTop:35}}>
      <div  className="w-100 d-flex justify-content-center justify-content-md-start mt-3">
            <p style={{fontSize:20,fontFamily:"Gilroy",fontWeight:600}}>Integration</p> </div>
        </div>
        {/* <div className="d-md-block d-flex flex-column" style={{ maxHeight: '100vh', overflowY: 'auto' }}> */}
        <div className="scrollable-wrapper">
       <div className="row g-3">
  <div className="col-12 col-md-6">
    <div className="card p-3 cardnewsubs ">
      <div className="d-flex justify-content-between align-items-center ">
        <img src={msg} width={30} height={30} alt="Crown Icon" />
        <button
          className="btn btn-primary"
          style={{ fontSize: 12, fontWeight: 600, fontFamily: "Gilroy",backgroundColor:"transparent",color:"blue" }}
        >
          + Buy Credit
        </button>
      </div>
      <p style={{ fontSize: 14, fontWeight: 600, fontFamily: "Gilroy" }}>
      SMS Credits
      </p>
      <p style={{ fontSize: 12, fontFamily: "Gilroy", color: "#4B4B4B" }}>
        Enhance your customer communication with seamless SMS integration. Instantly reach your audience with personalized message alerts and updates, all within the platform.
      </p>
    </div>
  </div>

  <div className="col-12 col-md-6">
    <div className="card p-3 cardnewsubs">
      <div className="d-flex justify-content-between align-items-center">
        <img src={whatsapp} width={40} height={40} alt="Crown Icon" />
        <button
          className="btn btn-primary"
          style={{ fontSize: 12, fontWeight: 600, fontFamily: "Gilroy",backgroundColor:"transparent",color:"blue" }}
        >
          + Buy Credit
        </button>
      </div>
      <p style={{ fontSize: 14, fontWeight: 600, fontFamily: "Gilroy" }}>
      WhatsApp Credits
      </p>
      <p style={{ fontSize: 12, fontFamily: "Gilroy", color: "#4B4B4B" }}>
        Enhance your customer communication with seamless SMS integration. Instantly reach your audience with personalized message alerts and updates, all within the platform.
      </p>
    </div>
  </div>
  <div className="col-12 col-md-6 mb-4 mb-md-0">
    <div className="card p-3 cardnewsubs ">
      <div className="d-flex justify-content-between align-items-center ">
        <img src={avtar} width={30} height={30} alt="Crown Icon" />
        <button
          className="btn btn-primary"
          style={{ fontSize: 12, fontWeight: 600, fontFamily: "Gilroy",backgroundColor:"transparent",color:"blue" }}
        >
          + Buy Credit
        </button>
      </div>
    
      <p style={{ fontSize: 14, fontWeight: 600, fontFamily: "Gilroy" }}>
      KYC Credits
      </p>
      <p style={{ fontSize: 12, fontFamily: "Gilroy", color: "#4B4B4B" }}>
        Enhance your customer communication with seamless SMS integration. Instantly reach your audience with personalized message alerts and updates, all within the platform.
      </p>
     
    </div>
  </div>
</div>
</div>
    </div>
        </>
    )
}
export default SettingIntergration;
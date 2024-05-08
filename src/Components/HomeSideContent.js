import React from "react";
import Smart from "../Assets/Images/Logo-Icon-White.png";
import Tools from "../Assets/Images/Smart-Tools.png";
import Support from "../Assets/Images/Total-Support.png";
import 'bootstrap/dist/css/bootstrap.min.css';


    const HomeSideComponent = () => {



        return(
           
 <div >
  
  <div className="d-flex justify-content-center pt-5" >
              <img src={Smart} className="img-fluid rounded-3" style={{ height: "35px", width: "35px" }} alt='smart'/>
              <h3 className="ps-2" style={{ fontSize: "25px", fontWeight: 400, }}>smartstay</h3>
            </div>
  <div className="d-flex justify-content-center pt-2 mb-2">
  <p  style={{ fontSize: "15px",marginBottom:0}}>Welcome to Smartstay</p>
    </div>
  <div className="d-flex justify-content-center pt-2 mb-2">
  <p  style={{ fontSize: "11px",   }}>Over 157,000 hotels and homes across 35 countries</p>
  </div>         
          
            <div style={{ paddingTop: "40px" }}>
              <div className="d-flex justify-content-start ps-5" ><img src={Tools} className="img-fluid" style={{ height: "50px", width: "50px" }} alt='Tools'/></div>
              <p className="d-flex justify-content-start ps-5 pt-0 mb-0" style={{ fontSize: "13px" }} >Smart Tools</p>
              <p className="d-flex justify-content-start ps-5 pe-5 pt-2" style={{ fontSize: "11px" }}  >Easy-to-use tools that let you integrate our offerings, search
                and share content, track performance and manage earnings.</p>
            </div>
            <div style={{ paddingTop: "20px" }}>
              <div className="d-flex justify-content-start ps-5"  ><img src={Support} className="img-fluid" style={{ height: "50px", width: "50px" }} alt='Support'/></div>
              <p className="d-flex justify-content-start ps-5 mb-0" style={{ fontSize: "13px" }} >Total Support</p>
              <p className="d-flex justify-content-start ps-5  pe-5 text-justify pt-2 mb-5" style={{ fontSize: "11px" }} >A dedicated team to help resolve any issues you may face while using our products or promoting our hotels.</p>
            </div>
          </div>
           
        )
    }

    export default HomeSideComponent;
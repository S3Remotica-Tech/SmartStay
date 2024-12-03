import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SettingGeneral from "./SettingGeneral";
import SettingManage from "./SettingManage";
import blueArrow from "../Assets/Images/New_images/arrow-down (1).png";
import blackArrow from "../Assets/Images/New_images/arrow-down (2).png";

function SettingAllPages() {
  const [activeItem, setActiveItem] = useState("General");
  const [generalPageShow, setGeneralPageShow] = useState(true);
  const [managePageShow, setManagePageShow] = useState(false);

  const handleShowGeneralPage = () => {
    setGeneralPageShow(true);
    setManagePageShow(false); // Ensure Manage PG is hidden
  };

  const handleShowManagePage = () => {
    setManagePageShow(true);
    setGeneralPageShow(false); // Ensure General is hidden
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <div className="col-12 col-md-3">
            <div
              style={{
                backgroundColor: "#E7F1FF",
                borderRadius: "11px",
                padding: "10px",
                marginBottom: "20px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                marginTop: 20,
                marginLeft: 30,
                width:221,
                height:246
              }}
            >
              {/* General */}
              <p
                // onClick={() => setActiveItem("General")}
                onClick={() => {
                    setActiveItem("General");
                    handleShowGeneralPage();
                  }}
                style={{
                  fontWeight: 500,
                  fontFamily:"Gilroy",
                  fontSize:15,
                  marginBottom: "15px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: activeItem === "General" ? "#4a90e2" : "#000000", // Highlight active
                  cursor: "pointer",
                }}
              >
                General
                {/* <span style={{ color: "#4a90e2" }}>&#8250;</span> */}
                <img
                  src={activeItem === "General" ? blueArrow : blackArrow}
                  width={16}
                  height={16}
                  alt="Arrow Icon"
                />
              </p>
              <hr style={{ width: "auto", border: "1px solid white" ,marginTop:"-6px"}} />

              {/* Manage PG */}
              <p
                onClick={() => {
                    setActiveItem("Manage PG");
                    handleShowManagePage();
                  }}
                style={{
                    fontWeight: 500,
                    fontFamily:"Gilroy",
                    fontSize:15,
                marginTop:"-4px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: activeItem === "Manage PG" ? "#4a90e2" : "#000000",
                  cursor: "pointer",
                }}
              >
                Manage PG
                <img
                  src={activeItem === "Manage PG" ? blueArrow : blackArrow}
                  width={16}
                  height={16}
                  alt="Arrow Icon"
                />
              </p>
              <hr style={{ width: "auto", border: "1px solid white",marginTop:"-6px" }} />

              {/* Security */}
              <p
                onClick={() => setActiveItem("Security")}
                style={{
                    fontWeight: 500,
                    fontFamily:"Gilroy",
                    fontSize:15,
                marginTop:"-4px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: activeItem === "Security" ? "#4a90e2" : "#000000",
                  cursor: "pointer",
                }}
              >
                Security
                {/* <span style={{ color: "#4a90e2" }}>&#8250;</span> */}
                <img
                  src={activeItem === "Security" ? blueArrow : blackArrow}
                  width={16}
                  height={16}
                  alt="Arrow Icon"
                />
              </p>
              <hr style={{ width: "auto", border: "1px solid white",marginTop:"-6px" }} />

              {/* Subscription */}
              <p
                onClick={() => setActiveItem("Subscription")}
                style={{
                    fontWeight: 500,
                    fontFamily:"Gilroy",
                    fontSize:15,
                marginTop:"-4px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: activeItem === "Subscription" ? "#4a90e2" : "#000000",
                  cursor: "pointer",
                }}
              >
                Subscription
                {/* <span style={{ color: "#4a90e2" }}>&#8250;</span> */}
                <img
                  src={activeItem === "Subscription" ? blueArrow : blackArrow}
                  width={16}
                  height={16}
                  alt="Arrow Icon"
                />
              </p>
              <hr style={{ width: "auto", border: "1px solid white",marginTop:"-6px" }} />
              <p
                onClick={() => setActiveItem("Integration")}
                style={{
                    fontWeight: 500,
                    fontFamily:"Gilroy",
                    fontSize:15,
                marginTop:"-4px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: activeItem === "Integration" ? "#4a90e2" : "#000000",
                  cursor: "pointer",
                }}
              >
                Integration
                <img
                  src={activeItem === "Integration" ? blueArrow : blackArrow}
                  width={16}
                  height={16}
                  alt="Arrow Icon"
                />
               
              </p>
            </div>


            
          </div>

   
   

          {/* Main Content Area */}
          <div className="col-12 col-md-8" style={{ padding: "20px",marginLeft:20 }}>
            {generalPageShow && <SettingGeneral />}
            {managePageShow && <SettingManage />}
          </div>
        </div>
      </div>
    </>
  );
}

export default SettingAllPages;

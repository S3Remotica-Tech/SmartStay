/* eslint-disable react-hooks/exhaustive-deps */ 
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SettingGeneral from "./SettingGeneral";
import SettingManage from "./SettingManage";
import blueArrow from "../Assets/Images/New_images/arrow-leftblue.png";
import blackArrow from "../Assets/Images/New_images/arrow-leftblack.png";
import SettingSecurity from "./SettingSecurityPage";
import SettingSubscription from "../../src/Pages/SubscriptionFile/SettingSubscription";
import SettingIntergration from "./SettingIntergration";
import SettingElectricity from "./SettingElectricity";
import SettingInvoice from "./SettingInvoice";
import SettingExpenses from "./SettingExpenses";
import SettingCompliance from "./SettingCompliance";
import SettingAmenities from "./SettingAmenities";
import SettingNewUser from "./SettingUserNew";
import SettingNewRole from "./SettingNewRole";
import "./Settings.css";
import './SettingAll.css';
import { useSelector } from 'react-redux';
import {  ArrowRight2, ArrowLeft2 } from 'iconsax-react'
import SettingsBills from "./SettingsBills";
import SettingAgreement from "./SettingAgreement";


function SettingAllPages() {

 
  const state = useSelector(state => state);
  const [hostel_Id, setHostel_Id] = useState('')
  const [activePage, setActivePage] = useState("General");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);


  useEffect(() => {
    if ( state.login.selectedHostel_Id) {
      setHostel_Id(state.login.selectedHostel_Id)
    }

  }, [state?.login?.selectedHostel_Id]);




  useEffect(() => {
    if (state.PgList.isManageEnable) {
      setActivePage('Manage PG');
    }
    
  }, [state.PgList.isManageEnable]);
  

  // useEffect(() => {
  //   if (state.PgList.isManageEnable) {
  //     setActivePage("Manage PG")
  //     handleShowManagePage()

  //   }
  // }, [state.PgList.isManageEnable])


 


 
 
  
  

  



 





  




  // const handleHostelId = (e) => {
  //   setHostel_Id(e.target.value)
  //   setDisplayError('')
  // }

  // useEffect(() => {
  //   if (hostel_Id) {
  //     dispatch(SettingsStoreSelectedHostelAction(hostel_Id))
  //   }

  // }, [hostel_Id])





  // useEffect(() => {
  //   dispatch({ type: 'HOSTELLIST' })
  // }, [])

  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // console.log("isSidebarOpen", isSidebarOpen)

 


  const handleTabClick = (itemName) => {
    // setActiveItemS(itemName);
    setActivePage(itemName);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false); 
    }
  };

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row " style={{ position: "relative" }}>

          <div
            className="col-12 d-block d-md-none"
            style={{
              height: "auto",
              padding: "10px",
              // backgroundColor: "#f8f9fa",
            }}
          >
            <button 
            // onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            onClick={handleToggleSidebar}
            className="" 
            style={{ backgroundColor: "#1E45E1", border: "1px solid #1E45E1", borderRadius: "50%", color: "white", padding: 5 }}
            >
              {isSidebarOpen ? 
              <ArrowRight2 
                size="22"
                color="#FFF"
              /> :
                <ArrowLeft2   
                  size="22"
                  color="#FFF"
                />
              }


            </button>
          </div>

          <div className={`col-12 col-md-3    ${isSidebarOpen ? "d-block col-3" : "d-none  d-md-block"}`}
            style={{
              // overflowY: "auto",
              // height: "100vh",
              height:600,
              position: "sticky",
              marginLeft: 'auto',
              top: 0,
              left: 0, transition: "all 0.3s ease-in-out",
              zIndex: 10,  
              backgroundColor: isSidebarOpen ? 'white' : 'transparent', 
            }}
          >
            <div className="show-scrolls"
              style={{
                backgroundColor: "#E7F1FF",
                borderRadius: "11px",
                padding: "10px",
                marginBottom: "20px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                marginTop: 20,
                marginLeft: 30,
                maxWidth: 201,
                height: 246
              }}
            >
              <p
                // onClick={() => {
                //   setActiveItem("General");
                //   handleShowGeneralPage();
                // }}
                onClick={() => handleTabClick('General')}
                style={{
                  fontWeight: 500,
                  fontFamily: "Gilroy",
                  fontSize: 15,
                  marginBottom: "15px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: activePage === "General" ? "#4a90e2" : "#000000",
                  cursor: "pointer",
                }}
              >
                General
                <img
                  src={activePage === "General" ? blueArrow : blackArrow}
                  width={16}
                  height={16}
                  alt="Arrow Icon"
                />
              </p>
              <hr style={{ width: "auto", border: "1px solid white", marginTop: "-6px" }} />
              <p
                // onClick={() => {
                //   setActiveItem("Manage PG");
                //   handleShowManagePage();
                // }}
                onClick={() => handleTabClick('Manage PG')}
                style={{
                  fontWeight: 500,
                  fontFamily: "Gilroy",
                  fontSize: 15,
                  marginTop: "-4px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: activePage === "Manage PG" ? "#4a90e2" : "#000000",
                  cursor: "pointer",
                }}
              >
                Manage PG
                <img
                  src={activePage === "Manage PG" ? blueArrow : blackArrow}
                  width={16}
                  height={16}
                  alt="Arrow Icon"
                />
              </p>
              <hr style={{ width: "auto", border: "1px solid white", marginTop: "-6px" }} />

              <p
                // onClick={() => setActiveItem("Security")}
                // onClick={() => {
                //   setActiveItem("Security");
                //   handleShowSecurityPage();
                // }}
                onClick={() => handleTabClick('Security')}
                style={{
                  fontWeight: 500,
                  fontFamily: "Gilroy",
                  fontSize: 15,
                  marginTop: "-4px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: activePage === "Security" ? "#4a90e2" : "#000000",
                  cursor: "pointer",
                }}
              >
                Security
                <img
                  src={activePage === "Security" ? blueArrow : blackArrow}
                  width={16}
                  height={16}
                  alt="Arrow Icon"
                />
              </p>
              <hr style={{ width: "auto", border: "1px solid white", marginTop: "-6px" }} />
              <p
                // onClick={() => setActiveItem("Subscription")}
                // onClick={() => {
                //   setActiveItem("Subscription");
                //   handleShowSubscriptionPage();
                // }}
                onClick={() => handleTabClick('Subscription')}
                style={{
                  fontWeight: 500,
                  fontFamily: "Gilroy",
                  fontSize: 15,
                  marginTop: "-4px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: activePage === "Subscription" ? "#4a90e2" : "#000000",
                  cursor: "pointer",
                }}
              >
                Subscription
                <img
                  src={activePage === "Subscription" ? blueArrow : blackArrow}
                  width={16}
                  height={16}
                  alt="Arrow Icon"
                />
              </p>
              <hr style={{ width: "auto", border: "1px solid white", marginTop: "-6px" }} />
              <p
                // onClick={() => setActiveItem("Integration")}
                // onClick={() => {
                //   setActiveItem("Integration");
                //   handleShowIntgrationPage();
                // }}

                onClick={() => handleTabClick('Integration')}
                style={{
                  fontWeight: 500,
                  fontFamily: "Gilroy",
                  fontSize: 15,
                  marginTop: "-4px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: activePage === "Integration" ? "#4a90e2" : "#000000",
                  cursor: "pointer",
                }}
              >
                Integration
                <img
                  src={activePage === "Integration" ? blueArrow : blackArrow}
                  width={16}
                  height={16}
                  alt="Arrow Icon"
                />

              </p>
            </div>

            <div>

              <div style={{ fontSize: 16, fontWeight: 600, fontFamily: "Gilroy", 
                textAlign: "start", marginLeft: 30 }}>PG Based Setting</div>


              <div
                className="show-scrolls"

                style={{
                  backgroundColor: "#E7F1FF",
                  borderRadius: "11px",
                  padding: "10px",
                  marginBottom: "20px",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                  marginTop: 20,
                  marginLeft: 30,
                  maxWidth: '201px',
                  maxHeight: '250px',
                  // height: "100%",
                  // overflowY: "auto",
                  // WebkitOverflowScrolling: 'touch'
                }} >
                <p
                  // onClick={() => {
                  //   setActiveItem("Electricity");
                  //   handleShowElectricityPage();
                  // }}
                  onClick={() => handleTabClick('Electricity')}
                  style={{
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                    fontSize: 15,
                    marginBottom: "15px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: activePage === "Electricity" ? "#4a90e2" : "#000000", 
                    cursor: "pointer",
                  }}
                >
                  Electricity
                  <img
                    src={activePage === "Electricity" ? blueArrow : blackArrow}
                    width={16}
                    height={16}
                    alt="Arrow Icon"
                  />
                </p>
                <hr style={{ width: "auto", border: "1px solid white", marginTop: "-6px" }} />

                <p
                  // onClick={() => {
                  //   setActiveItem("Invoice");
                  //   handleShowInvoicePage();
                  // }}
                  onClick={() => handleTabClick('Bills')}
                  style={{
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                    fontSize: 15,
                    marginTop: "-8px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: activePage === "Bills" ? "#4a90e2" : "#000000",
                    cursor: "pointer",
                  }}
                >
                  Bills
                  <img
                    src={activePage === "Bills" ? blueArrow : blackArrow}
                    width={16}
                    height={16}
                    alt="Arrow Icon"
                  />
                </p>
                <hr style={{ width: "auto", border: "1px solid white", marginTop: "-6px" }} />
                <p
                  // onClick={() => {
                  //   setActiveItem("Invoice");
                  //   handleShowInvoicePage();
                  // }}
                  onClick={() => handleTabClick('Invoice')}
                  style={{
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                    fontSize: 15,
                    marginTop: "-8px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: activePage === "Invoice" ? "#4a90e2" : "#000000",
                    cursor: "pointer",
                  }}
                >
                  Invoice
                  <img
                    src={activePage === "Invoice" ? blueArrow : blackArrow}
                    width={16}
                    height={16}
                    alt="Arrow Icon"
                  />
                </p>
                <hr style={{ width: "auto", border: "1px solid white", marginTop: "-6px" }} />

                <p
                  // onClick={() => setActiveItem("Security")}
                  // onClick={() => {
                  //   setActiveItem("Expenses");
                  //   handleShowExpensesPage();
                  // }}
                  onClick={() => handleTabClick('Expenses')}
                  style={{
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                    fontSize: 15,
                    marginTop: "-8px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: activePage === "Expenses" ? "#4a90e2" : "#000000",
                    cursor: "pointer",
                  }}
                >
                  Expenses
                  <img
                    src={activePage === "Expenses" ? blueArrow : blackArrow}
                    width={16}
                    height={16}
                    alt="Arrow Icon"
                  />
                </p>
                <hr style={{ width: "auto", border: "1px solid white", marginTop: "-6px" }} />
                <p
                  // onClick={() => setActiveItem("Subscription")}
                  // onClick={() => {
                  //   setActiveItem("Complaints");
                  //   handleShowCompliancePage();
                  // }}
                  onClick={() => handleTabClick('Complaints')}
                  style={{
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                    fontSize: 15,
                    marginTop: "-8px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: activePage === "Complaints" ? "#4a90e2" : "#000000",
                    cursor: "pointer",
                  }}
                >
                  Complaints
                  <img
                    src={activePage === "Complaints" ? blueArrow : blackArrow}
                    width={16}
                    height={16}
                    alt="Arrow Icon"
                  />
                </p>
                <hr style={{ width: "auto", border: "1px solid white", marginTop: "-6px" }} />
                <p
                  // onClick={() => setActiveItem("Integration")}
                  // onClick={() => {
                  //   setActiveItem("Amenities");
                  //   handleShowAmnitiesPage();
                  // }}
                  onClick={() => handleTabClick('Amenities')}
                  style={{
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                    fontSize: 15,
                    marginTop: "-8px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: activePage === "Amenities" ? "#4a90e2" : "#000000",
                    cursor: "pointer",
                  }}
                >
                  Amenities
                  <img
                    src={activePage === "Amenities" ? blueArrow : blackArrow}
                    width={16}
                    height={16}
                    alt="Arrow Icon"
                  />

                </p>


                <hr style={{ width: "auto", border: "1px solid white", marginTop: "-6px" }} />
                <p
                  // onClick={() => setActiveItem("Integration")}
                  // onClick={() => {
                  //   setActiveItem("User");
                  //   handleShowUserPage();
                  // }}
                  onClick={() => handleTabClick('User')}
                  style={{
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                    fontSize: 15,
                    marginTop: "-8px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: activePage === "User" ? "#4a90e2" : "#000000",
                    cursor: "pointer",
                  }}
                >
                  User
                  <img
                    src={activePage === "User" ? blueArrow : blackArrow}
                    width={16}
                    height={16}
                    alt="Arrow Icon"
                  />

                </p>

                <hr style={{ width: "auto", border: "1px solid white", marginTop: "-6px" }} />
                <p
                  // onClick={() => setActiveItem("Integration")}
                  // onClick={() => {
                  //   setActiveItem("Role");
                  //   handleShowRolePage();
                  // }}
                  onClick={() => handleTabClick('Role')}
                  style={{
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                    fontSize: 15,
                    marginTop: "-8px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: activePage === "Role" ? "#4a90e2" : "#000000",
                    cursor: "pointer",
                  }}
                >
                  Role
                  <img
                    src={activePage === "Role" ? blueArrow : blackArrow}
                    width={16}
                    height={16}
                    alt="Arrow Icon"
                  />

                </p>



                 <hr style={{ width: "auto", border: "1px solid white", marginTop: "-6px" }} />
                <p
                  // onClick={() => setActiveItem("Integration")}
                  // onClick={() => {
                  //   setActiveItem("Role");
                  //   handleShowRolePage();
                  // }}
                  onClick={() => handleTabClick('acrement')}
                  style={{
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                    fontSize: 15,
                    marginTop: "-8px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: activePage === "acrement" ? "#4a90e2" : "#000000",
                    cursor: "pointer",
                  }}
                >
                  Agreement & Policy
                  <img
                    src={activePage === "acrement" ? blueArrow : blackArrow}
                    width={16}
                    height={16}
                    alt="Arrow Icon"
                  />

                </p>
              </div>
              {/* </div> */}
              {/* } */}
            </div>
          </div>




          <div 
          // className={`col-9   ${isSidebarOpen ? 'col-9' : ''}   `}
          className={`col-12 col-md-9 ${isSidebarOpen ? 'd-none d-md-block' : ''}`}
            style={{
              overflowY: "auto",
              height: "100vh",
            }}
          >
            {/* {generalPageShow && <SettingGeneral />}
            {managePageShow && <SettingManage />}
            {securityPageShow && <SettingSecurity />}
            {subscriptionPageShow && <SettingSubscription />}
            {intgrationPageShow && <SettingIntergration />}
            {electricityPageShow && <SettingElectricity hostelid={hostel_Id} />}
            {invoicePageShow && <SettingInvoice hostelid={hostel_Id} />}
            {expensesPageShow && <SettingExpenses hostelid={hostel_Id} />}
            {compliancePageShow && <SettingCompliance hostelid={hostel_Id} />}
            {amnitiesPageShow && <SettingAmenities hostelid={hostel_Id} />}
            {userPageShow && <SettingNewUser hostelid={hostel_Id} />}
            {rolePageShow && <SettingNewRole hostelid={hostel_Id} />} */}
             {activePage === 'General' && <SettingGeneral />}
             
          {activePage === 'Manage PG' && <SettingManage />}
          {activePage === 'Security' && <SettingSecurity />}
          {activePage === 'Subscription' && <SettingSubscription />}
          {activePage === 'Integration' && <SettingIntergration />}
          {activePage === 'Electricity' && <SettingElectricity hostelid={hostel_Id} />}
          {activePage === 'Bills' && <SettingsBills  hostelid={hostel_Id}/>}
          {activePage === 'Invoice' && <SettingInvoice hostelid={hostel_Id} />}
          {activePage === 'Expenses' && <SettingExpenses hostelid={hostel_Id} />}
          {activePage === 'Complaints' && <SettingCompliance hostelid={hostel_Id} />}
          {activePage === 'Amenities' && <SettingAmenities hostelid={hostel_Id} />}
          {activePage === 'User' && <SettingNewUser hostelid={hostel_Id} />}
          {activePage === 'Role' && <SettingNewRole hostelid={hostel_Id} />}
           {activePage === 'acrement' && <SettingAgreement hostelid={hostel_Id} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default SettingAllPages;

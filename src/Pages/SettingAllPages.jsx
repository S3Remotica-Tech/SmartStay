/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SettingGeneral from "./Settings/SettingGeneral";
import SettingManage from "./SettingManage";
import blueArrow from "../Assets/Images/New_images/arrow-leftblue.png";
import blackArrow from "../Assets/Images/New_images/arrow-leftblack.png";
import SettingSecurity from "./SettingSecurityPage";
import SettingSubscription from "./SubscriptionFile/SettingSubscription";
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
import { ArrowRight2, ArrowLeft2 } from 'iconsax-react'
// import SettingsBills from "./SettingsBills";
import SettingsNotifications from "./SettingsNotifications";
import SettingAgreement from "./SettingAgreement";
import BillingRule from "./Settings/BillingRule/BillingRule";
import { Routes, Route ,useNavigate,Outlet ,Navigate} from "react-router-dom";

function SettingAllPages() {
const navigate = useNavigate();


  const state = useSelector(state => state);
  const [hostel_Id, setHostel_Id] = useState('')
  const [activePage, setActivePage] = useState("General");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isInvoiceAddMode, setIsInvoiceAddMode] = useState(false);



  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      setHostel_Id(state.login.selectedHostel_Id)
    }

  }, [state?.login?.selectedHostel_Id]);

  useEffect(() => {
    if (state.PgList.isManageEnable) {
      setActivePage('Manage PG');
    }

  }, [state.PgList.isManageEnable]);


  const handleTabClick = (itemName) => {
    setActivePage(itemName);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleAddInvoiceClick = () => {
    setIsInvoiceAddMode(true);

  };




  return (
    <>
     <Outlet />
      <div
        className={`col-12 col-lg-12 col-md-9 ${isInvoiceAddMode ? 'd-none d-md-block' : ''
          }`}
        style={{
          overflowY: "auto",
          height: "100vh",
        }}
      >
        <div className="container-fluid">


          <div className="row gap-0" style={{ position: "relative" }}>

            <div
              className="col-12 d-block d-md-none"
              style={{
                height: "auto",
                padding: "10px",
              }}
            >


              <button

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

            {!isInvoiceAddMode &&
              <div className={`col-12 col-md-3    ${isSidebarOpen ? "d-block col-3" : "d-none  d-md-block"}`}
                style={{
                  height: 600,
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

                    onClick={() => {
    handleTabClick('General');
    navigate(`general`);
  }}
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

                    onClick={() =>{ handleTabClick('Manage PG');
                      navigate(`manage-pg`)

                    }}
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

                    onClick={() =>{ handleTabClick('Security');
                        navigate(`security`)
                    }}
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

                    onClick={() => {
                       handleTabClick('Subscription');
                       navigate(`subscription`)
                    }}
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


                    onClick={() => { handleTabClick('Integration');
                      navigate(`integration`)
                    }}
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

                  <div style={{
                    fontSize: 16, fontWeight: 600, fontFamily: "Gilroy",
                    textAlign: "start", marginLeft: 30
                  }}>PG Based Setting</div>


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
                      maxHeight: '290px',

                    }} >
                    <p

                      onClick={() => { handleTabClick('Electricity');
                         navigate(`electricity`)
                        
                      }
                    }
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

                    {/* <p

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
                  <hr style={{ width: "auto", border: "1px solid white", marginTop: "-6px" }} /> */}

                    <p

                      onClick={() => {handleTabClick('Billing_Rule');
                         navigate(`billing-rule`) 
                      }
                      }
                      style={{
                        fontWeight: 500,
                        fontFamily: "Gilroy",
                        fontSize: 15,
                        marginTop: "-8px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        color: activePage === "Billing_Rule" ? "#4a90e2" : "#000000",
                        cursor: "pointer",
                      }}
                    >
                      Billing Rule
                      <img
                        src={activePage === "Billing_Rule" ? blueArrow : blackArrow}
                        width={16}
                        height={16}
                        alt="Arrow Icon"
                      />
                    </p>
                    <hr style={{ width: "auto", border: "1px solid white", marginTop: "-6px" }} />

                    <p
                      onClick={() =>{
                        handleTabClick('SettingsNotifications')
                        navigate(`notifications`) 
                      }}
                      style={{
                        fontWeight: 500,
                        fontFamily: "Gilroy",
                        fontSize: 15,
                        marginTop: "-8px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        color: activePage === "SettingsNotifications" ? "#4a90e2" : "#000000",
                        cursor: "pointer",
                      }}
                    >
                      Notifications
                      <img
                        src={activePage === "SettingsNotifications" ? blueArrow : blackArrow}
                        width={16}
                        height={16}
                        alt="Arrow Icon"
                      />
                    </p>
                    <hr style={{ width: "auto", border: "1px solid white", marginTop: "-6px" }} />
                    <p

                      onClick={() => {
                        handleTabClick('Invoice');
                         navigate(`invoice`) 
                      }}
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
                      Bill Templates
                      <img
                        src={activePage === "Invoice" ? blueArrow : blackArrow}
                        width={16}
                        height={16}
                        alt="Arrow Icon"
                      />
                    </p>
                    <hr style={{ width: "auto", border: "1px solid white", marginTop: "-6px" }} />

                    <p

                      onClick={() => {
                        handleTabClick('Expenses');
                        navigate(`expenses`) 
                      }}
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

                      onClick={() => {
                        handleTabClick('Complaints');
                       navigate(`complaints`) }}
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

                      onClick={() => {handleTabClick('Amenities');
                        navigate(`amenities`)
                      }}
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

                      onClick={() => {
                        handleTabClick('User');
                      navigate(`user`)
                    }}
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

                      onClick={() => {
                        handleTabClick('Role');
                         navigate(`role`)
                      }}
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

                      onClick={() => { 
                        handleTabClick('agreement');
                         navigate(`agreement`)
                      }}
                      style={{
                        fontWeight: 500,
                        fontFamily: "Gilroy",
                        fontSize: 15,
                        marginTop: "-8px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        color: activePage === "agreement" ? "#4a90e2" : "#000000",
                        cursor: "pointer",
                      }}
                    >
                      Agreement & Policy
                      <img
                        src={activePage === "agreement" ? blueArrow : blackArrow}
                        width={16}
                        height={16}
                        alt="Arrow Icon"
                      />

                    </p>
                  </div>

                </div>
              </div>
            }






            <div
              className={`col-12 ${isSidebarOpen ? 'd-none d-md-block' : ''
                } ${isInvoiceAddMode ? 'col-md-12' : 'col-md-9'}`}

              style={{
                overflowY: "auto",
                height: "100vh",
              }}
            >

              {/* {activePage === 'General' && <SettingGeneral />}
              {activePage === 'Manage PG' && <SettingManage />}
              {activePage === 'Security' && <SettingSecurity />}
              {activePage === 'Subscription' && <SettingSubscription />}
              {activePage === 'Integration' && <SettingIntergration />}
              {activePage === 'Electricity' && <SettingElectricity hostelid={hostel_Id} />}
              {activePage === 'Billing_Rule' && <BillingRule hostelid={hostel_Id} />}
              {activePage === 'SettingsNotifications' && <SettingsNotifications hostelid={hostel_Id} />}
              {activePage === 'Invoice' && <SettingInvoice hostelid={hostel_Id}
                handleAddInvoiceClick={handleAddInvoiceClick}
                setIsInvoiceAddMode={setIsInvoiceAddMode}
                setIsSidebarOpen={setIsSidebarOpen} />}
              {activePage === 'Expenses' && <SettingExpenses hostelid={hostel_Id} />}
              {activePage === 'Complaints' && <SettingCompliance hostelid={hostel_Id} />}
              {activePage === 'Amenities' && <SettingAmenities hostelid={hostel_Id} />}
              {activePage === 'User' && <SettingNewUser hostelid={hostel_Id} />}
              {activePage === 'Role' && <SettingNewRole hostelid={hostel_Id} />}
              {activePage === 'acrement' && <SettingAgreement hostelid={hostel_Id} />} */}



 
 <Routes>
   <Route index element={<Navigate to={`general`} replace />} />
 <Route path="general" element={<SettingGeneral />} />
  <Route path="manage-pg" element={<SettingManage />} />
  <Route path="security" element={<SettingSecurity />} />
  <Route path="subscription" element={<SettingSubscription />} />
  <Route path="integration" element={<SettingIntergration />} />
  <Route path="electricity" element={<SettingElectricity />} />
  <Route path="billing-rule" element={<BillingRule />} />
  <Route path="notifications" element={<SettingsNotifications />} />
  <Route
    path="invoice"
    element={
      <SettingInvoice
        handleAddInvoiceClick={handleAddInvoiceClick}
        setIsInvoiceAddMode={setIsInvoiceAddMode}
        setIsSidebarOpen={setIsSidebarOpen}
      />
    }
  />
  <Route path="expenses" element={<SettingExpenses />} />
  <Route path="complaints" element={<SettingCompliance />} />
  <Route path="amenities" element={<SettingAmenities />} />
  <Route path="user" element={<SettingNewUser />} />
  <Route path="role" element={<SettingNewRole />} />
  <Route path="agreement" element={<SettingAgreement />} />

 </Routes>



            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SettingAllPages;

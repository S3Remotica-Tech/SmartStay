import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SettingGeneral from "./SettingGeneral";
import SettingManage from "./SettingManage";
import blueArrow from "../Assets/Images/New_images/arrow-down (1).png";
import blackArrow from "../Assets/Images/New_images/arrow-down (2).png";
import SettingSecurity from "./SettingSecurityPage";
import SettingSubscription from "./SettingSubscription";
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
import {Button, Offcanvas,Form,FormControl,FormSelect} from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { MdError } from "react-icons/md";
import { SettingsStoreSelectedHostelAction } from '../Redux/Action/smartStayAction';


function  SettingAllPages(props ) {

  console.log("props",props);
  
  
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const [activeItem, setActiveItem] = useState("General");
  const [generalPageShow, setGeneralPageShow] = useState(true);
  const [managePageShow, setManagePageShow] = useState(false);
  const [securityPageShow, setSecurityPageShow] = useState(false);
  const [subscriptionPageShow, setSubscriptionPageShow] = useState(false);
  const [intgrationPageShow, setIntgrationPageShow] = useState(false);
  const [electricityPageShow, setElectricityPageShow] = useState(false);
  const [invoicePageShow, setInvoicePageShow] = useState(false);
  const [compliancePageShow, setCompliancePageShow] = useState(false);
  const [expensesPageShow, setExpensesPageShow] = useState(false);
  const [amnitiesPageShow, setAmnitiesPageShow] = useState(false);
  const [userPageShow, setUserPageShow] = useState(false);
  const [rolePageShow, setRolePageShow] = useState(false);
  const [hostel_Id,setHostel_Id] = useState('')
  const [displayError, setDisplayError] = useState('')


  useEffect(() => {
    if(state.login.selectedHostel_Id){
      setHostel_Id(state.login.selectedHostel_Id)
    }
    
  }, [state?.login?.selectedHostel_Id]);
  

  const handleHostelId = (e) => {
    const selectedHostelId = e.target.value; 
    setHostel_Id(selectedHostelId); 
    setDisplayError('')
  };






  useEffect(()=> {
if(state.PgList.isManageEnable){
  setActiveItem("Manage PG")
  handleShowManagePage()
  
}
  },[state.PgList.isManageEnable])
  

  const handleShowGeneralPage = () => {
    setGeneralPageShow(true);
    setManagePageShow(false); 
    setSecurityPageShow(false)
    setSubscriptionPageShow(false)
    setIntgrationPageShow(false)
    setElectricityPageShow(false)
    setInvoicePageShow(false)
    setCompliancePageShow(false)
    setExpensesPageShow(false)
    setAmnitiesPageShow(false)
    setUserPageShow(false)
    setRolePageShow(false)
  };

  

  const handleShowManagePage = () => {

    setManagePageShow(true);
    setGeneralPageShow(false); 
    setSecurityPageShow(false)
    setSubscriptionPageShow(false)
    setIntgrationPageShow(false)
    setElectricityPageShow(false)
    setInvoicePageShow(false)
    setCompliancePageShow(false)
    setExpensesPageShow(false)
    setAmnitiesPageShow(false)
    setUserPageShow(false)
    setRolePageShow(false)
    // props.onhandleShowsettingsPG()
  };
  const handleShowSecurityPage = () => {
    setManagePageShow(false);
    setGeneralPageShow(false); 
    setSecurityPageShow(true)
    setSubscriptionPageShow(false)
    setIntgrationPageShow(false)
    setElectricityPageShow(false)
    setInvoicePageShow(false)
    setCompliancePageShow(false)
    setExpensesPageShow(false)
    setAmnitiesPageShow(false)
    setUserPageShow(false)
    setRolePageShow(false)
  };
  const handleShowSubscriptionPage = () => {
    setManagePageShow(false);
    setGeneralPageShow(false); 
    setSecurityPageShow(false)
    setSubscriptionPageShow(true)
    setIntgrationPageShow(false)
    setElectricityPageShow(false)
    setInvoicePageShow(false)
    setCompliancePageShow(false)
    setExpensesPageShow(false)
    setAmnitiesPageShow(false)
    setUserPageShow(false)
    setRolePageShow(false)
  };
  const handleShowIntgrationPage = () => {
    setManagePageShow(false);
    setGeneralPageShow(false); 
    setSecurityPageShow(false)
    setSubscriptionPageShow(false)
    setIntgrationPageShow(true)
    setElectricityPageShow(false)
    setInvoicePageShow(false)
    setCompliancePageShow(false)
    setExpensesPageShow(false)
    setAmnitiesPageShow(false)
    setUserPageShow(false)
    setRolePageShow(false)
  };
  const handleShowElectricityPage = () => {
    setManagePageShow(false);
    setGeneralPageShow(false); 
    setSecurityPageShow(false)
    setSubscriptionPageShow(false)
    setIntgrationPageShow(false)
    setElectricityPageShow(true)
    setInvoicePageShow(false)
    setCompliancePageShow(false)
    setExpensesPageShow(false)
    setAmnitiesPageShow(false)
    setUserPageShow(false)
    setRolePageShow(false)
  };
  const handleShowInvoicePage = () => {
    setManagePageShow(false);
    setGeneralPageShow(false); 
    setSecurityPageShow(false)
    setSubscriptionPageShow(false)
    setIntgrationPageShow(false)
    setElectricityPageShow(false)
    setInvoicePageShow(true)
    setCompliancePageShow(false)
    setExpensesPageShow(false)
    setAmnitiesPageShow(false)
    setUserPageShow(false)
    setRolePageShow(false)
  };

  const handleShowCompliancePage = () => {
    setManagePageShow(false);
    setGeneralPageShow(false); 
    setSecurityPageShow(false)
    setSubscriptionPageShow(false)
    setIntgrationPageShow(false)
    setElectricityPageShow(false)
    setInvoicePageShow(false)
    setCompliancePageShow(true)
    setExpensesPageShow(false)
    setAmnitiesPageShow(false)
    setUserPageShow(false)
    setRolePageShow(false)
  }
  const handleShowExpensesPage = () => {
    setManagePageShow(false);
    setGeneralPageShow(false); 
    setSecurityPageShow(false)
    setSubscriptionPageShow(false)
    setIntgrationPageShow(false)
    setElectricityPageShow(false)
    setInvoicePageShow(false)
    setCompliancePageShow(false)
    setExpensesPageShow(true)
    setAmnitiesPageShow(false)
    setUserPageShow(false)
    setRolePageShow(false)
  }

  const handleShowAmnitiesPage = () => {
    setManagePageShow(false);
    setGeneralPageShow(false); 
    setSecurityPageShow(false)
    setSubscriptionPageShow(false)
    setIntgrationPageShow(false)
    setElectricityPageShow(false)
    setInvoicePageShow(false)
    setCompliancePageShow(false)
    setExpensesPageShow(false)
       setAmnitiesPageShow(true)
      
    setUserPageShow(false)
    setRolePageShow(false)
  }





  const handleShowUserPage = () => {
    setManagePageShow(false);
    setGeneralPageShow(false); 
    setSecurityPageShow(false)
    setSubscriptionPageShow(false)
    setIntgrationPageShow(false)
    setElectricityPageShow(false)
    setInvoicePageShow(false)
    setCompliancePageShow(false)
    setExpensesPageShow(false)
    setAmnitiesPageShow(false)
    setUserPageShow(true)
    setRolePageShow(false)
  }


  const handleShowRolePage = () => {
    setManagePageShow(false);
    setGeneralPageShow(false); 
    setSecurityPageShow(false)
    setSubscriptionPageShow(false)
    setIntgrationPageShow(false)
    setElectricityPageShow(false)
    setInvoicePageShow(false)
    setCompliancePageShow(false)
    setExpensesPageShow(false)
    setAmnitiesPageShow(false)
    setUserPageShow(false)
    setRolePageShow(true)
  }


  // const handleHostelId = (e) => {
  //   setHostel_Id(e.target.value)
  //   setDisplayError('')
  // }

useEffect(()=>{
  if(hostel_Id){
     dispatch(SettingsStoreSelectedHostelAction(hostel_Id))
  }

},[hostel_Id])



  

  useEffect(()=>{
    dispatch({type:'HOSTELLIST'})
  },[])


  return (
    <>
      <div className="container-fluid">
        <div className="row">
        <div
  className="col-12 col-md-12 col-lg-3 col-sm-12 col-xs-12"
  style={{
    overflow: "hidden", 
    height: "100vh", 
    position: "sticky", 
    top: 0,
    left: 0,
    
  }}
>
            <div
              style={{
                backgroundColor: "#E7F1FF",
                borderRadius: "11px",
                padding: "10px",
                marginBottom: "20px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                marginTop: 20,
                marginLeft: 30,
                width:201,
                height:246
              }}
            >
              <p
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
                  color: activeItem === "General" ? "#4a90e2" : "#000000", 
                  cursor: "pointer",
                }}
              >
                General
                <img
                  src={activeItem === "General" ? blueArrow : blackArrow}
                  width={16}
                  height={16}
                  alt="Arrow Icon"
                />
              </p>
              <hr style={{ width: "auto", border: "1px solid white" ,marginTop:"-6px"}} />
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

              <p
                // onClick={() => setActiveItem("Security")}
                onClick={() => {
                  setActiveItem("Security");
                  handleShowSecurityPage();
                }}
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
                <img
                  src={activeItem === "Security" ? blueArrow : blackArrow}
                  width={16}
                  height={16}
                  alt="Arrow Icon"
                />
              </p>
              <hr style={{ width: "auto", border: "1px solid white",marginTop:"-6px" }} />
              <p
                // onClick={() => setActiveItem("Subscription")}
                onClick={() => {
                  setActiveItem("Subscription");
                  handleShowSubscriptionPage();
                }}
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
                <img
                  src={activeItem === "Subscription" ? blueArrow : blackArrow}
                  width={16}
                  height={16}
                  alt="Arrow Icon"
                />
              </p>
              <hr style={{ width: "auto", border: "1px solid white",marginTop:"-6px" }} />
              <p
                // onClick={() => setActiveItem("Integration")}
                onClick={() => {
                  setActiveItem("Integration");
                  handleShowIntgrationPage();
                }}
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

<div>

<div style={{fontSize:16,fontWeight:600,fontFamily:"Gilroy",textAlign:"start",marginLeft:30}}>PG Based Setting</div>
                    {/* {
                      state.login.selectedHostel_Id &&  */}
                   

{/* <div 
className="show-scrolls"
              style={{
                // backgroundColor: "#E7F1FF",
                // borderRadius: "11px",
                padding: "10px",
                // marginBottom: "20px",
                // boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                // marginTop: 20,
                // marginLeft: 30,
                // maxWidth:'201px',
                height:'350px',
                overflowY: "auto",
               WebkitOverflowScrolling:'touch'
              }}
            > */}
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
                maxWidth:'201px',
                maxHeight:'250px',
                height:"100%",
                overflowY: "auto",
               WebkitOverflowScrolling:'touch'
              }} >
              <p
                onClick={() => {
                    setActiveItem("Electricity");
                    handleShowElectricityPage();
                  }}
                style={{
                  fontWeight: 500,
                  fontFamily:"Gilroy",
                  fontSize:15,
                  marginBottom: "15px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: activeItem === "Electricity" ? "#4a90e2" : "#000000", // Highlight active
                  cursor: "pointer",
                }}
              >
                Electricity
                <img
                  src={activeItem === "Electricity" ? blueArrow : blackArrow}
                  width={16}
                  height={16}
                  alt="Arrow Icon"
                />
              </p>
              <hr style={{ width: "auto", border: "1px solid white" ,marginTop:"-6px"}} />
              <p
                onClick={() => {
                    setActiveItem("Invoice");
                    handleShowInvoicePage();
                  }}
                style={{
                    fontWeight: 500,
                    fontFamily:"Gilroy",
                    fontSize:15,
                marginTop:"-8px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: activeItem === "Invoice" ? "#4a90e2" : "#000000",
                  cursor: "pointer",
                }}
              >
               Invoice
                <img
                  src={activeItem === "Invoice" ? blueArrow : blackArrow}
                  width={16}
                  height={16}
                  alt="Arrow Icon"
                />
              </p>
              <hr style={{ width: "auto", border: "1px solid white",marginTop:"-6px" }} />

              <p
                // onClick={() => setActiveItem("Security")}
                onClick={() => {
                  setActiveItem("Expenses");
                  handleShowExpensesPage();
                }}
                style={{
                    fontWeight: 500,
                    fontFamily:"Gilroy",
                    fontSize:15,
                    marginTop:"-8px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: activeItem === "Expenses" ? "#4a90e2" : "#000000",
                  cursor: "pointer",
                }}
              >
                Expenses
                <img
                  src={activeItem === "Expenses" ? blueArrow : blackArrow}
                  width={16}
                  height={16}
                  alt="Arrow Icon"
                />
              </p>
              <hr style={{ width: "auto", border: "1px solid white",marginTop:"-6px" }} />
              <p
                // onClick={() => setActiveItem("Subscription")}
                onClick={() => {
                  setActiveItem("Complaints");
                  handleShowCompliancePage();
                }}
                style={{
                    fontWeight: 500,
                    fontFamily:"Gilroy",
                    fontSize:15,
                    marginTop:"-8px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: activeItem === "Complaints" ? "#4a90e2" : "#000000",
                  cursor: "pointer",
                }}
              >
                Complaints
                <img
                  src={activeItem === "Complaints" ? blueArrow : blackArrow}
                  width={16}
                  height={16}
                  alt="Arrow Icon"
                />
              </p>
              <hr style={{ width: "auto", border: "1px solid white",marginTop:"-6px" }} />
              <p
                // onClick={() => setActiveItem("Integration")}
                onClick={() => {
                  setActiveItem("Amenities");
                  handleShowAmnitiesPage();
                }}
                style={{
                    fontWeight: 500,
                    fontFamily:"Gilroy",
                    fontSize:15,
                    marginTop:"-8px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: activeItem === "Amenities" ? "#4a90e2" : "#000000",
                  cursor: "pointer",
                }}
              >
                Amenities
                <img
                  src={activeItem === "Amenities" ? blueArrow : blackArrow}
                  width={16}
                  height={16}
                  alt="Arrow Icon"
                />
               
              </p>


              <hr style={{ width: "auto", border: "1px solid white",marginTop:"-6px" }} />
              <p
                // onClick={() => setActiveItem("Integration")}
                onClick={() => {
                  setActiveItem("User");
                  handleShowUserPage();
                }}
                style={{
                    fontWeight: 500,
                    fontFamily:"Gilroy",
                    fontSize:15,
                    marginTop:"-8px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: activeItem === "User" ? "#4a90e2" : "#000000",
                  cursor: "pointer",
                }}
              >
                User
                <img
                  src={activeItem === "User" ? blueArrow : blackArrow}
                  width={16}
                  height={16}
                  alt="Arrow Icon"
                />
               
              </p>

              <hr style={{ width: "auto", border: "1px solid white",marginTop:"-6px" }} />
              <p
                // onClick={() => setActiveItem("Integration")}
                onClick={() => {
                  setActiveItem("Role");
                  handleShowRolePage();
                }}
                style={{
                    fontWeight: 500,
                    fontFamily:"Gilroy",
                    fontSize:15,
                marginTop:"-8px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: activeItem === "Role" ? "#4a90e2" : "#000000",
                  cursor: "pointer",
                }}
              >
                Role
                <img
                  src={activeItem === "Role" ? blueArrow : blackArrow}
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
          <div className="col-lg-9  col-12 col-md-12 col-sm-12 col-xs-12 "
          
          style={{
            overflowY: "auto",
            height: "100vh",
          }}
          
          
          
          
          >
            {generalPageShow && <SettingGeneral />}
            {managePageShow && <SettingManage />}
            {securityPageShow && <SettingSecurity />}
            {subscriptionPageShow && <SettingSubscription />}
            {intgrationPageShow && <SettingIntergration />}
            {electricityPageShow && <SettingElectricity hostelid={hostel_Id}/>}
            {invoicePageShow && <SettingInvoice hostelid={hostel_Id}/>}
            {expensesPageShow && <SettingExpenses hostelid={hostel_Id} />}
            {compliancePageShow && <SettingCompliance hostelid={hostel_Id}/>}
            {amnitiesPageShow && <SettingAmenities hostelid={hostel_Id}/>}
            {userPageShow && <SettingNewUser  hostelid={hostel_Id}/>}
            {rolePageShow && <SettingNewRole hostelid={hostel_Id}/>}
          </div>
        </div>
      </div>
    </>
  );
}

export default SettingAllPages;

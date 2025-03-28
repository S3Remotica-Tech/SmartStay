/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import crown from "../../Assets/Images/New_images/crown.png";
import {Button,Form,FormControl} from "react-bootstrap";
import { Modal} from "react-bootstrap";
// import phinfo from "../../Assets/Images/New_images/ph_info-fill.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { MdError } from "react-icons/md";

function SettingSubscription() {
   const state = useSelector((state) => state);
    const dispatch = useDispatch();
    console.log("SettingSubscription",state)
  const [plan,setPlan] = useState(false)
  const [changePlan,setChangePlan] = useState(false)
  const [userId,setUserId] = useState("")
  const [customerId,setCustomerId] = useState("")
  const [planCode,setPlanCode] = useState("")
  const [amount,setAmount] = useState("")
  const [selectedPlan, setSelectedPlan] = useState("");
  const [hostelCount, setHostelCount] = useState(1);
  const [selectedPlanError,setSelectedPlanError] = useState("")
  const [hostelCountError,setHostelCountError] = useState("")
  const [planType,setPlanType] = useState("")
  const [getPlanActive,setGetPlanActive] = useState("")

  // const handlePlanChange = (price)=>{
  //   setPlan(true)
  //   setAmount(price)
  //   handleCloseCurrentPlan()
  // }
  // const handlePlanChange = (price) => {
  //   setSelectedPlan(price);
  //   setPlan(true)
  //   setAmount(hostelCount * price);
  //   handleCloseCurrentPlan()
  // };
  useEffect(() => {
    setHostelCount("1");
    setAmount(Number(selectedPlan) || 0);
  }, []);
  const handlePlanChange = (price) => {
    setSelectedPlan(price);
    setPlan(true);
    setAmount(hostelCount * price);
    handleCloseCurrentPlan();

    if (price === 299) {
        setPlanCode("smartstay_monthly");
    } else if (price === 599) {
        setPlanCode("smartstay_threemonth");
    } else if (price === 999) {
        setPlanCode("smartstay_oneyear");
    }
}
 
  
useEffect(() => {
  setHostelCount(1);
  setAmount(Number(selectedPlan) || 0);
}, [selectedPlan]);

const handleHostelCount = (e) => {
  let value = e.target.value;

  if (value === "") {
      setHostelCount("");
      setAmount(0);
      return;
  }

  if (!/^\d+$/.test(value) || Number(value) < 1) {
      return; 
  }

  setHostelCount(Number(value));  // Ensure number type
  setAmount(Number(value) * (Number(selectedPlan) || 0)); 
};





  const handleClosePlanChange = ()=>{
    setPlan(false)
    setHostelCountError("")
    setAmount("")
    setHostelCount("")
  }


  const handleCurrentPlan = ()=>{
    setChangePlan(true)
    handleClosePlanChange()
  }


const handleSubmit = () => {
  let isValid = true;

  if (!selectedPlan) {
      setSelectedPlanError("Please Select a Plan");
      isValid = false;
  } else {
      setSelectedPlanError("");
  }

  if (hostelCount === "" || isNaN(hostelCount) || parseInt(hostelCount, 10) <= 0) {
      setHostelCountError("Please Enter a Valid Hostel Count");
      isValid = false;
  } else {
      setHostelCountError("");
  }

  if (isValid) {
      console.log("Submitting:", { selectedPlan, hostelCount });
      dispatch({
          type: "NEWSUBSCRIPTION",
          payload: {
              user_id: userId,
              customer_id: customerId,
              plan_code: planCode,
              amount: amount
          },
      });
  }
};




  const handleCloseCurrentPlan = ()=>{
    setChangePlan(false)
    const modalElement = document.getElementById("changePlanModal");
    if (modalElement) {
      modalElement.classList.remove("show");
      modalElement.setAttribute("aria-hidden", "true");
      modalElement.style.display = "none";
    }
  
    document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());
  }
  useEffect(() => {
    if (changePlan) {
      const modal = new window.bootstrap.Modal(document.getElementById("changePlanModal"));
      modal.show();
    }
  }, [changePlan]);
 
useEffect(()=>{
dispatch({type:'NEWSUBSCRIPTIONDETAILS'})
},[])

useEffect(()=>{
  dispatch({ type: "ACCOUNTDETAILS"});
},[])
const [customerDetails,setCustomerDetails] = useState("")
useEffect(()=>{
  if(state?.createAccount?.accountList[0]?.user_details){
    const customerDetailsPage = state?.createAccount?.accountList[0]?.user_details;
    setCustomerDetails(customerDetailsPage)
    setUserId(customerDetails.id)
    setCustomerId(customerDetails.customer_id)
    setPlanType(customerDetails.plan_code)

  }
},[state?.createAccount?.accountList[0]?.user_details])
useEffect(()=>{
  if(state?.createAccount?.accountList[0]?.plan_data){
   setGetPlanActive(state?.createAccount?.accountList[0]?.plan_data)

  }
},[state?.createAccount?.accountList[0]?.plan_data])

console.log("planActive",getPlanActive)
useEffect(() => {
  if (state.Settings.statusCodeNewSubscription === 200) {
      // const Redirect_Url = state.Settings.subscriptionNew.url;
      // if (Redirect_Url) {
      //     window.location.href = Redirect_Url; 
      // }
      const Redirect_Url = state.Settings.subscriptionNew.url;
if (Redirect_Url) {
    window.open(Redirect_Url, "_blank");
}


      setTimeout(() => {
          dispatch({ type: 'CLEAR_NEW_SUBSCRIPTION' });
      }, 1000);
  }
}, [state.Settings.statusCodeNewSubscription]);

// const handleFirstPlaneSave = ()=>{
//   // dispatch({type:'NEWSUBSCRIPTION'})
 
// }



console.log("customerDetails", customerDetails);

  return (
    <div className="container">
      <div style={{marginTop:26}}>
        <p className="cardnewsubs" style={{ fontSize: 20, fontFamily: "Gilroy", fontWeight: 600 }}>Subscription</p>

      </div>

      <div className="row g-3">
        <div className="col-12 col-md-6">
        <div className="card p-3 cardnewsubs">
  <div className="d-flex align-items-center justify-content-center rounded-circle bg-light" 
       style={{ width: 40, height: 40 }}>
    <img src={crown} width={30} height={30} alt="Crown Icon" />
  </div>

  <div className="mt-2">
    <p className="text-dark fw-semibold fs-6">Your plan is active</p>
  </div>

  <div className="d-flex justify-content-between align-items-center">
    <p className="text-secondary mb-0 fs-6">Amount</p>
    <p className="fw-semibold mb-0 fs-6">₹{getPlanActive[0]?.total_amount}</p>
  </div>

  <div className="d-flex justify-content-between align-items-center mt-2">
    <p className="text-secondary mb-0 fs-6">Next payment</p>
    <p className="fw-semibold mb-0 fs-6">
  {new Date(getPlanActive[0]?.plan_end_date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })}
</p>
  </div>

  <div className="d-flex justify-content-between align-items-center mt-2">
    <p className="text-secondary mb-0 fs-6">Payment method</p>
    <p className="fw-semibold mb-0 fs-6">{getPlanActive[0]?.payment_method}</p>
  </div>

  <div className="d-flex mt-3 w-100">
    <button className="btn btn-primary w-100 fw-semibold fs-6" onClick={handleCurrentPlan}>
      Manage Plan
    </button>
  </div>
</div>

        </div>


      </div>


      




      <div className="modal" id="changePlanModal" data-bs-backdrop="static"  tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Change Plan</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseCurrentPlan}></button>
          </div>
          <div className="modal-body">
  <div className="row g-3">
    
    {/* Suite Team Plan */}
    <div className="col-12 col-sm-6 col-md-4 d-flex justify-content-center">
      <div className={`card border position-relative ${
    planType === "smartstay_monthly" ? "border-success" : "border-secondary"
  }`} style={{ borderRadius: "14px", backgroundColor: "#F8FAFC", padding: "15px" }}>
        <div className="card-body text-center">
        {planType === "smartstay_monthly" && (
 <div className="position-relative text-center">
 <span
   className="badge bg-success position-absolute start-50 translate-middle"
   style={{ top: "-30px", padding: "5px 10px", fontSize: "12px" }}
 >
   Current Plan
 </span>
</div>

)}
          <h4 className="card-title">1 Month Plan</h4>
          {/* <p className="mb-1">1 Month</p> */}
           <p>per agent/month billed annually</p>
          <p className="fs-4 fw-bold pb-2 border-bottom">₹299</p>
          <p className="fw-semibold text-start mt-3">Team Plan Features:</p>
          <ul className="list-unstyled text-start px-3">
            <li className="d-flex align-items-center gap-2 mb-2">
              <i className="bi bi-info-circle"></i> Paying Guest
            </li>
            <li className="d-flex align-items-center gap-2 mb-2" style={{ whiteSpace: "nowrap" }}>
              <i className="bi bi-info-circle"></i> Manage Customers
            </li>
            <li className="d-flex align-items-center gap-2 mb-2">
              <i className="bi bi-info-circle"></i> Manage Vendors
            </li>
            <li className="d-flex align-items-center gap-2 mb-3" style={{ whiteSpace: "nowrap" }}>
              <i className="bi bi-info-circle"></i> Asset Management
            </li>
          </ul>
          {/* <button className="btn btn-outline-primary w-100" onClick={() => handlePlanChange(1)}>Change Plan</button> */}
          {planType === "smartstay_monthly" ? (
  <button className="btn btn-success w-100 mt-3"  onClick={() => handlePlanChange(299)}>
    Current Plan
  </button>
) : (
  <button className="btn btn-outline-primary w-100" onClick={() => handlePlanChange(1)}>
    Change Plan
  </button>
)}
        </div>
      </div>
    </div>

    {/* Suite Professional Plan */}
    <div className="col-12 col-sm-6 col-md-4 d-flex justify-content-center">
      <div className={`card border position-relative ${
    planType === "smartstay_threemonth" ? "border-success" : "border-secondary"
  }`} style={{ borderRadius: "14px", backgroundColor: "#F8FAFC", padding: "15px" }}>
        <div className="card-body text-center">
        {/* <span className="badge bg-success position-absolute top-0 start-50 translate-middle-x" style={{ padding: "5px 10px", fontSize: "12px" }}>
            Current Plan
          </span> */}
                  {planType === "smartstay_threemonth" && (
  <span
  className="badge bg-success position-absolute start-50 translate-middle"
  style={{ top: "-30px", padding: "5px 10px", fontSize: "12px" }}
>
  Current Plan
</span>
)}
          <h4 className="card-title">3 Month Plan</h4>
          {/* <p className="mb-1">1 Month</p> */}
           <p>per agent/month billed annually</p>
          <p className="fs-4 fw-bold pb-2 border-bottom">₹599</p>
          <p className="fw-semibold text-start mt-3" style={{whiteSpace:"nowrap"}}>Professional Plan Features:</p>
          <ul className="list-unstyled text-start px-3">
            <li className="d-flex align-items-center gap-2 mb-2">
              <i className="bi bi-info-circle"></i> Paying Guest
            </li>
            <li className="d-flex align-items-center gap-2 mb-2" style={{ whiteSpace: "nowrap" }}>
              <i className="bi bi-info-circle"></i> Manage Customers
            </li>
            <li className="d-flex align-items-center gap-2 mb-2">
              <i className="bi bi-info-circle"></i> Manage Vendors
            </li>
            <li className="d-flex align-items-center gap-2 mb-2" style={{ whiteSpace: "nowrap" }}>
              <i className="bi bi-info-circle"></i> Asset Management
            </li>
          </ul>
          {/* <button className="btn btn-outline-primary w-100" onClick={() => handlePlanChange(599)}>Change Plan</button> */}
          {planType === "smartstay_threemonth" ? (
  <button className="btn btn-success w-100 mt-3"  onClick={() => handlePlanChange(599)}>
    Current Plan
  </button>
) : (
  <button className="btn btn-outline-primary w-100" onClick={() => handlePlanChange(599)}>
   Change Plan
  </button>
)}
        </div>
      </div>
    </div>

    {/* Suite Growth Plan (Current Plan) */}
    <div className="col-12 col-sm-6 col-md-4 d-flex justify-content-center">
      <div className={`card border position-relative ${
    planType === "smartstay_oneyear" ? "border-success" : "border-secondary"
  }`} style={{ borderRadius: "14px", backgroundColor: "#F8FAFC", padding: "15px" }}>
        <div className="card-body text-center">
          {/* <span className="badge bg-success position-absolute top-0 start-50 translate-middle-x" style={{ padding: "5px 10px", fontSize: "12px" }}>
            Current Plan
          </span> */}
                           {planType === "smartstay_oneyear" && (
 <span
 className="badge bg-success position-absolute start-50 translate-middle"
 style={{ top: "-30px", padding: "5px 10px", fontSize: "12px" }}
>
 Current Plan
</span>
)}
  
          <h4 className="card-title">1 Year Plan</h4>
          <p>per agent/month billed annually</p>
          <p className="fs-4 fw-bold pb-2 border-bottom">₹999</p>
          <p className="fw-semibold text-start mt-3">Growth Plan Features:</p>
          <ul className="list-unstyled text-start px-3">
            <li className="d-flex align-items-center gap-2 mb-2">
              <i className="bi bi-info-circle"></i> Paying Guest
            </li>
            <li className="d-flex align-items-center gap-2 mb-2" style={{ whiteSpace: "nowrap" }}>
              <i className="bi bi-info-circle"></i> Manage Customers
            </li>
            <li className="d-flex align-items-center gap-2 mb-2">
              <i className="bi bi-info-circle"></i> Manage Vendors
            </li>
            <li className="d-flex align-items-center gap-2 mb-2" style={{ whiteSpace: "nowrap" }}>
              <i className="bi bi-info-circle"></i> Asset Management
            </li>
          </ul>
          {planType === "smartstay_oneyear" ? (
  <button className="btn btn-success w-100 mt-3"  onClick={() => handlePlanChange(999)}>
    Current Plan
  </button>
) : (
  <button className="btn btn-outline-primary w-100" onClick={() => handlePlanChange(999)}>
  Change Plan
  </button>
)}

        </div>
      </div>
    </div>

  </div>
</div>

<div style={{textAlign:"center"}}><h4>{planType === "free_plan" ? "Your plan is free trial" : ""}</h4></div>
          {/* Footer */}
         { planType !== "free_plan" &&
          <div className="p-3">
  <div className="table-responsive border rounded">
    <table
      className="table mb-0 "
      style={{
        // border: "1px solid #DCDCDC",
        // borderRadius: "24px",
        // borderCollapse: "collapse",
        width: "100%",
      }}
    >
      <thead>
        <tr style={{ backgroundColor: "#e9f2ff" }}>
          <th style={{}}>Total Hostel</th>
          <th style={{  }}>Plan Name</th>
          <th style={{ textAlign: "center" }}>Plan Amount</th>
          <th style={{  textAlign: "center" }}>Total Amount</th>
          <th style={{ textAlign: "center",whiteSpace:"nowrap" }}>Plan Start Date</th>
          <th style={{  textAlign: "center" ,whiteSpace:"nowrap"}}>Plan End Date</th>
       
        </tr>
      </thead>
      <tbody>
        <tr>
          <td  style={{ textAlign: "center" }}> {getPlanActive[0]?.hostel_count}</td>
          <td>{getPlanActive[0]?.plan_code}</td>
          <td style={{ textAlign: "center" }}>₹ {getPlanActive[0]?.total_amount}</td>
          <td style={{ textAlign: "center" }}>₹ {getPlanActive[0]?.total_amount}</td>
          <td style={{ textAlign: "center" }}> {new Date(getPlanActive[0]?.plan_start_date).toLocaleDateString("en-GB", {day: "2-digit",month: "long",year: "numeric",})}</td>
          <td style={{ textAlign: "center" }}>  {new Date(getPlanActive[0]?.plan_end_date).toLocaleDateString("en-GB", {day: "2-digit",month: "long",year: "numeric",})}</td>
        
        </tr>
      </tbody>
    </table>
  </div>
</div>
}


        </div>
      </div>
    </div>






       <Modal
                  show={plan}
                  onHide={handleClosePlanChange}
                  backdrop="static"
                  centered
                >
                  <Modal.Dialog
                    style={{
                      maxWidth: 666,
                      paddingRight: "10px",
                      borderRadius: "30px",
                    }}
                    className="m-0 p-0"
                  >
                    <Modal.Body  style={{marginTop:-30}}>
                      <div className="d-flex align-items-center">
                        
                          <div className="container">
                            <div className="row mb-3"></div>
          
                            <Modal.Header
                              style={{ marginBottom: "30px", position: "relative" }}
                            >
                              <div
                                style={{
                                  fontSize: 20,
                                  fontWeight: 600,
                                  fontFamily: "Gilroy",
                                }}
                              >
                                Manage Plan
                              </div>
                              {/* <div style={{paddingRight:40}}>({planCode}-{selectedPlan})</div> */}
                          <div style={{ paddingRight: 40 }}>
  
  ({planCode?.trim() === "smartstay_monthly"
    ? "1 Month Plan"
    : planCode?.trim() === "smartstay_threemonth"
    ? "3 Month Plan"
    : planCode?.trim() === "smartstay_oneyear"
    ? "One Year Plan"
    : planCode} - {selectedPlan})
</div>

                              <button
                                type="button"
                                className="close"
                                aria-label="Close"
                                onClick={handleClosePlanChange}
                                style={{
                                  position: "absolute",
                                  right: "10px",
                                  top: "16px",
                                  border: "1px solid black",
                                  background: "transparent",
                                  cursor: "pointer",
                                  padding: "0",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  width: "32px",
                                  height: "32px",
                                  borderRadius: "50%",
                                }}
                              >
                                <span
                                  aria-hidden="true"
                                  style={{
                                    fontSize: "30px",
                                    paddingBottom: "6px",
                                  }}
                                >
                                  &times;
                                </span>
                              </button>
                            </Modal.Header>
          
          
          
          
                            <div className="row mb-3">
                              
                  
                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                    <Form.Group>
                                      <Form.Label
                                        style={{
                                          fontSize: 14,
                                          color: "#222222",
                                          fontFamily: "Gilroy",
                                          fontWeight: 500,
                                        }}
                                      >
                                        Hostel Count{" "}
                                        <span
                                          style={{
                                            color: "red",
                                            fontSize: "20px",
                                          }}
                                        >
                                          {" "}
                                          *{" "}
                                        </span>
                                      </Form.Label>
                                      <FormControl
                                        id="form-controls"
                                        placeholder="Enter Hostel Count"
                                        type="text"
                                        value={hostelCount}
                                        // onChange={(e) => handleHostelCount(e)}
                                        //  value={hostelCount === "" ? "" : hostelCount}  
      onChange={(e)=>handleHostelCount(e)} 
      onBlur={() => {
        if (!String(hostelCount).trim()) {
            setHostelCount(1);  // Set default to 1
            setAmount(Number(selectedPlan) || 0);
        }
    }}
                                        style={{
                                          fontSize: 16,
                                          color: "#4B4B4B",
                                          fontFamily: "Gilroy",
                                          fontWeight: 500,
                                          boxShadow: "none",
                                          border: "1px solid #D9D9D9",
                                          height: 50,
                                          borderRadius: 8,
                                        }}
                                      />
                                    </Form.Group>
                                    {hostelCountError && (
                                      <div style={{ color: "red" }}>
                                        {" "}
                                        <MdError style={{ fontSize: '11px', fontFamily: "Gilroy", fontWeight: 500,marginRight:"5px" }} />
                                        <span
                                          style={{
                                            fontSize: "13px",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                          }}
                                        >
                                          {hostelCountError}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                    <Form.Group>
                                      <Form.Label
                                        style={{
                                          fontSize: 14,
                                          color: "#222222",
                                          fontFamily: "Gilroy",
                                          fontWeight: 500,
                                        }}
                                      >
                                        Payment{" "} 
                                        <span
                                          style={{
                                            color: "red",
                                            fontSize: "20px",
                                          }}
                                        >
                                          {" "}
                                          *{" "}
                                        </span>
                                      </Form.Label>
                                      <FormControl
                                        type="text"
                                        id="form-controls"
                                        placeholder="Select Payment"
                                        value={amount}
                                        // onChange={(e) => handleLastName(e)}
                                        style={{
                                          fontSize: 16,
                                          color: "#4B4B4B",
                                          fontFamily: "Gilroy",
                                          fontWeight: 500,
                                          boxShadow: "none",
                                          border: "1px solid #D9D9D9",
                                          height: 50,
                                          borderRadius: 8,
                                          
                                        }}
                                      />
                                     {/* <img src={phinfo} alt="phinfo" width={10} height={10}/>  <span style={{color:"#1E45E1",fontFamily:"Gilroy",fontSize:13,fontWeight:500}}>See all features</span> */}

                                    </Form.Group>
                                    {selectedPlanError && (
                                      <div style={{ color: "red" }}>
                                        {" "}
                                        <MdError style={{ fontSize: '12px', fontFamily: "Gilroy", fontWeight: 500,marginRight:"5px" }} />
                                        <span
                                          style={{
                                            fontSize: "13px",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                          }}
                                        >
                                          {selectedPlanError}
                                        </span>
                                      </div>
                                    )}
                                   
                                  </div>
                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <Form.Group >
                                      <Form.Label
                                        style={{
                                          fontSize: 14,
                                          color: "#222222",
                                          fontFamily: "Gilroy",
                                          fontWeight: 500,
                                        }}
                                      >
                                        Comments{" "}
                                      </Form.Label>
                                      <FormControl
                                        id="form-controls"
                                        placeholder="Enter Comments"
                                        type="text"
                                        // value={firstname}
                                        // onChange={(e) => handleFirstName(e)}
                                        style={{
                                          fontSize: 16,
                                          color: "#4B4B4B",
                                          fontFamily: "Gilroy",
                                          fontWeight: 500,
                                          boxShadow: "none",
                                          border: "1px solid #D9D9D9",
                                          height: 50,
                                          borderRadius: 8,
                                        }}
                                      />
                                    </Form.Group>
                                    {/* {firstnameError && (
                                      <div style={{ marginTop:"-15px",color: "red" }}>
                                        {" "}
                                        <MdError style={{ fontSize: '12px', fontFamily: "Gilroy", fontWeight: 500,marginRight:"5px" }} />
                                        <span
                                          style={{
                                            fontSize: "13px",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                          }}
                                        >
                                          {firstnameError}
                                        </span>
                                      </div>
                                    )} */}
                                  </div>
                            </div>
                            
          
                            <Button
                              className="w-100"
                              style={{
                                backgroundColor: "#1E45E1",
                                fontWeight: 600,
                                height: 50,
                                borderRadius: 12,
                                fontSize: 16,
                                fontFamily: "Montserrat",
                              }}
                              onClick={handleSubmit}
                            >
                           Buy Now
                            </Button>
                          </div>
                        {/* )} */}
                      </div>
                    </Modal.Body>
          
                    <Modal.Footer style={{ border: "none" }}></Modal.Footer>
                  </Modal.Dialog>
                </Modal>


        



    </div>
  )
}
export default SettingSubscription;
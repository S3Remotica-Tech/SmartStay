import React,{useState,useEffect} from "react";
import crown from "../../Assets/Images/New_images/crown.png";
import { Table } from "react-bootstrap";
import "./Subscription.css"
import {Button,Form,FormControl} from "react-bootstrap";
import { Modal} from "react-bootstrap";
import phinfo from "../../Assets/Images/New_images/ph_info-fill.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Edit from "../../Assets/Images/Edit-blue.png";
import Delete from "../../Assets/Images/Delete_red.png";
function SettingSubscription() {
  const [plan,setPlan] = useState(false)
  const [changePlan,setChangePlan] = useState(false)

  const handleplanChange = ()=>{
    setPlan(true)
  }
  const handleClosePlanChange = ()=>{
    setPlan(false)
  }


  const handleCurrentPlan = ()=>{
    setChangePlan(true)
    handleClosePlanChange()
  }
  const handleCloseCurrentPlan = ()=>{
    setChangePlan(false)
    const modalElement = document.getElementById("changePlanModal");
    if (modalElement) {
      modalElement.classList.remove("show");
      modalElement.setAttribute("aria-hidden", "true");
      modalElement.style.display = "none";
    }
  
    // Remove any lingering modal backdrop
    document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());
  }
  useEffect(() => {
    if (changePlan) {
      const modal = new window.bootstrap.Modal(document.getElementById("changePlanModal"));
      modal.show();
    }
  }, [changePlan]);
 


  return (
    <div className="container">
      <div style={{marginTop:26}}>
        <p className="cardnewsubs" style={{ fontSize: 20, fontFamily: "Gilroy", fontWeight: 600 }}>Subscription</p>

      </div>

      <div className="row g-3">
        <div className="col-12 col-md-6">
          <div className="card p-3 cardnewsubs">
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: 12,
                backgroundColor: "#eef4ff",
              }}
            >
              <img src={crown} width={40} height={40} alt="Crown Icon" />
            </div>

            <div>
              <p style={{ fontSize: 14, fontWeight: 600, fontFamily: "Gilroy" }}>
                Your plan is active
              </p>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <p
                className="mb-0"
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  fontFamily: "Gilroy",
                  color: "#4B4B4B",
                }}
              >
                Amount
              </p>
              <p
                className="mb-0"
                style={{ fontSize: 12, fontWeight: 600, fontFamily: "Gilroy" }}
              >
                ₹500
              </p>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-2">
              <p
                className="mb-0"
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  fontFamily: "Gilroy",
                  color: "#4B4B4B",
                }}
              >
                Next payment
              </p>
              <p
                className="mb-0"
                style={{ fontSize: 12, fontWeight: 600, fontFamily: "Gilroy" }}
              >
                12 September 2024
              </p>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-2">
              <p
                className="mb-0"
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  fontFamily: "Gilroy",
                  color: "#4B4B4B",
                }}
              >
                Payment method
              </p>
              <p
                className="mb-0"
                style={{ fontSize: 12, fontWeight: 600, fontFamily: "Gilroy" }}
              >
                VISA **60
              </p>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-3 ">
              {/* <img src={msg} width={40} height={40} alt="Crown Icon" /> */}
              <button
                className="btn btn-primary"
                style={{ fontSize: 12, fontWeight: 600, fontFamily: "Gilroy", backgroundColor: "transparent", color: "blue" }}
              >
                Change Payment methods
              </button>
              <button
                className="btn btn-primary"
                style={{ fontSize: 12, fontWeight: 600, fontFamily: "Gilroy" }}
              onClick={handleplanChange}>
                Manage Plan
              </button>
            </div>
          </div>
        </div>


      </div>


      <div className="cardnewsubstable" style={{ marginTop: 40 }}>
        <Table
          responsive="md"
          className="Table_Design"
          style={{
            // width:"100%",
            height: "auto",
            overflow: "visible",
            tableLayout: "auto",
            borderRadius: "24px",
            border: "1px solid #DCDCDC",
          }}
        >
          <thead
            style={{
              width:"700",
              color: "gray",
              fontSize: "11px",
              backgroundColor: "#E7F1FF",
              position: "sticky",
              top: 0,
              zIndex: 1,
            }}
          >
            <tr style={{ height: "30px" }}>

              <th
                style={{
                  color: "rgb(147, 147, 147)",
                  fontWeight: 500,
                  fontSize: "14px",
                  fontFamily: "Gilroy",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  textAlign: "center",
                  borderTopLeftRadius: 24,
                  paddingLeft:"20px"
                }}
              >
                Billing Date
              </th>
              <th
                style={{
                  color: "rgb(147, 147, 147)",
                  fontWeight: 500,
                  fontSize: "14px",
                  fontFamily: "Gilroy",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  textAlign: "center",
                }}
              >
                Paying Guest
              </th>
              <th
                style={{
                  color: "rgb(147, 147, 147)",
                  fontWeight: 500,
                  fontSize: "14px",
                  fontFamily: "Gilroy",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  textAlign: "center",
                }}
              >
                Amount
              </th>
              {/* <th
                  style={{
                    color: "#939393",
                    fontWeight: 500,
                    fontSize: "14px",
                    fontFamily: "Gilroy",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    textAlign: "center",
                  }}
                >
                  Previous
                </th> */}
              <th
                style={{
                  color: "rgb(147, 147, 147)",
                  fontWeight: 500,
                  fontSize: "14px",
                  fontFamily: "Gilroy",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  textAlign: "center",
                }}
              >
                Expiry Date
              </th>
              <th
                style={{
                  color: "rgb(147, 147, 147)",
                  fontWeight: 500,
                  fontSize: "14px",
                  fontFamily: "Gilroy",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  textAlign: "center",
                }}
              >
                Status
              </th>

              <th
                style={{
                  textAlign: "start",
                  fontFamily: "Gilroy",
                  color: "rgb(147, 147, 147)",
                  fontSize: 14,
                  fontWeight: 500,
                  borderTopRightRadius: 24,
                }}
              >
                {" "}
              </th>
            </tr>
          </thead>
          <tbody style={{ fontSize: "12px" }}>
            {/* {currentRowelectricity &&
                currentRowelectricity.map((v) => {
                  const imageUrl = v.profile || Profile;
                 

                  let formattedDate;
if (v.date && v.date != '0000-00-00') {
    let Dated = new Date(v.date);
    let day = Dated.getDate();
    let month = Dated.getMonth() + 1;
    let year = Dated.getFullYear();
    formattedDate = `${day}/${month}/${year}`;
} else {
    // Use a default initial date if v.date is empty or "00-00-00"
    let initialDate = new Date(v.initial_date); // Set your default initial date here
    let day = initialDate.getDate();
    let month = initialDate.getMonth() + 1;
    let year = initialDate.getFullYear();
    formattedDate = `${day}/${month}/${year}`;
}

console.log('Formatted Date:', formattedDate);


                  return ( */}
            <tr>


              <td
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  fontFamily: "Gilroy",
                  textAlign: "center",
                  verticalAlign: "middle",
                  borderBottom: "none",
                  paddingLeft:"20px"
                }}
              >
                {/* {v.floor_name} */}05-12-2024
              </td>
              <td
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  fontFamily: "Gilroy",
                  textAlign: "center",
                  verticalAlign: "middle",
                  borderBottom: "none",
                }}
              >
                {/* {v.Room_Id} */}3
              </td>


              <td
                style={{
                  textAlign: "center",
                  verticalAlign: "middle", // Center vertically
                  borderBottom: "none",
                }}
              >
                <span
                  style={{
                    backgroundColor: "#EBEBEB",
                    paddingTop: "5px",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                    paddingBottom: "5px",
                    borderRadius: "60px",
                    fontSize: "14px",
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                  }}
                >
                  {/* {formattedDate} */}100
                </span>
              </td>
              <td
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  fontFamily: "Gilroy",
                  textAlign: "center",
                  verticalAlign: "middle", 
                  borderBottom: "none",
                }}
              >
                {/* {v.total_reading} */}05-12-2024
              </td>
              <td
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  fontFamily: "Gilroy",
                  textAlign: "center",
                  verticalAlign: "middle",
                  borderBottom: "none",
                }}
              >
                {/* {v.total_amount} */}pending
              </td>
            
            </tr>
            {/* );
                })} */}
          </tbody>
        </Table>
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
                                Change Plan
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
                                        Select Hostel{" "}
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
                                        placeholder="Select Hostel"
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
                                      </Form.Label>
                                      <FormControl
                                        type="text"
                                        id="form-controls"
                                        placeholder="Select Payment"
                                        // value={lastname}
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
                                          marginTop:6
                                        }}
                                      />
                                     <img src={phinfo} alt="phinfo" width={10} height={10}/>  <span style={{color:"#1E45E1",fontFamily:"Gilroy",fontSize:13,fontWeight:500}}>See all features</span>

                                    </Form.Group>
                                   
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
                              onClick={handleCurrentPlan}
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


                <div className="modal" id="changePlanModal" data-bs-backdrop="static"  tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Change Plan</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseCurrentPlan}></button>
          </div>
          <div className="modal-body">
          <div className="row g-3 align-items-stretch">
              {/* Suite Team */}
              <div className="col-md-4 d-flex justify-content-center">
  <div
    className="card  border"
    style={{
      maxWidth: "250px",
      borderRadius: "14px",
      backgroundColor: "#F8FAFC",
      padding: "15px",
      marginBottom: "20px", 
      zIndex: "1", 
      position: "relative",
    }}
  >
    <div className="card-body text-center">
      <h4 className="card-title">Suite Team</h4>
      <p className="mb-1">1 Month</p>
      <p
        className="fs-4 fw-bold pb-2"
        style={{
          marginTop: "-5px",
          borderBottom: "1px solid #DCDCDC",
          display: "inline-block",
          width: "100%",
        }}
      >
        ₹299
      </p>
      <p className="fw-semibold text-start mt-3">Team Plan Features:</p>
      <ul className="list-unstyled text-start px-3">
  <li className="d-flex align-items-center gap-2 mb-2" style={{ whiteSpace: "nowrap" }}>
    <i className="bi bi-info-circle"></i> Paying Guest
  </li>
  <li className="d-flex align-items-center gap-2 mb-2" style={{ whiteSpace: "nowrap" }}>
    <i className="bi bi-info-circle"></i> Manage Customers
  </li>
  <li className="d-flex align-items-center gap-2 mb-2" style={{ whiteSpace: "nowrap" }}>
    <i className="bi bi-info-circle"></i> Manage Vendors
  </li>
  <li className="d-flex align-items-center gap-2 mb-3" style={{ whiteSpace: "nowrap" }}>
    <i className="bi bi-info-circle"></i> Asset Management
  </li>
</ul>

      <button className="btn btn-outline-primary w-100">Change Plan</button>
    </div>
  </div>
</div>



              {/* Suite Professional */}
              <div className="col-md-4 d-flex justify-content-center">
  <div
    className="card border "
    style={{
      maxWidth: "250px",
      borderRadius: "14px",
      backgroundColor: "#F8FAFC",
      padding: "15px",
      marginBottom: "20px", 
      zIndex: "1", 
      position: "relative", 
    }}
  >
    <div className="card-body text-center">
      <h4 className="card-title">Suite Team</h4>
      <p className="mb-1">1 Month</p>
      <p
        className="fs-4 fw-bold pb-2"
        style={{
          marginTop: "-5px",
          borderBottom: "1px solid #DCDCDC",
          display: "inline-block",
          width: "100%",
        }}
      >
        ₹299
      </p>
      <p className="fw-semibold text-start mt-3">Team Plan Features:</p>
      <ul className="list-unstyled text-start px-3">
  <li className="d-flex align-items-center gap-2 mb-2" style={{ whiteSpace: "nowrap" }}>
    <i className="bi bi-info-circle"></i> Paying Guest
  </li>
  <li className="d-flex align-items-center gap-2 mb-2" style={{ whiteSpace: "nowrap" }}>
    <i className="bi bi-info-circle"></i> Manage Customers
  </li>
  <li className="d-flex align-items-center gap-2 mb-2" style={{ whiteSpace: "nowrap" }}>
    <i className="bi bi-info-circle"></i> Manage Vendors
  </li>
  <li className="d-flex align-items-center gap-2 mb-2" style={{ whiteSpace: "nowrap" }}>
    <i className="bi bi-info-circle"></i> Manage Vendors
  </li>
</ul>

      <button className="btn btn-outline-primary w-100">Change Plan</button>
    </div>
  </div>
</div>

              {/* Suite Growth - Current Plan */}
              <div className="col-md-4">
  <div
    className="card  border border-success"
    style={{
      maxWidth: "250px",
      borderRadius: "14px",
      backgroundColor: "#F8FAFC",
      padding: "15px",
      marginBottom: "20px", 
      zIndex: "1", 
      position: "relative",
    }}
  >
    <div className="card-body text-center">
      {/* Badge */}
      <div className="position-relative text-center">
  <span
    className="badge bg-success position-absolute"
    style={{
      top: "-40px",
      left: "50%",
      transform: "translateX(-50%)",
      padding: "5px 10px",
      borderRadius: "8px",
      fontSize: "12px"
    }}
  >
    Current Plan
  </span>
</div>

      {/* Title & Pricing */}
      <h4 className="card-title">Suite Growth</h4>
      <p>1 Year</p>
      <p
        className="fs-4 fw-bold"
        style={{
          marginTop: "-8px",
          paddingBottom: "8px",
          borderBottom: "1px solid #DCDCDC",
        }}
      >
        ₹999
      </p>
      <p className="fw-semibold text-start mt-3">Growth Plan Features:</p>

      {/* Features List */}
      <ul className="list-unstyled text-start px-3">
  <li className="d-flex align-items-center gap-2 mb-2" style={{ whiteSpace: "nowrap" }}>
    <i className="bi bi-info-circle"></i> Paying Guest
  </li>
  <li className="d-flex align-items-center gap-2 mb-2" style={{ whiteSpace: "nowrap" }}>
    <i className="bi bi-info-circle"></i> Manage Customers
  </li>
  <li className="d-flex align-items-center gap-2 mb-2" style={{ whiteSpace: "nowrap" }}>
    <i className="bi bi-info-circle"></i> Manage Vendors
  </li>
  <li className="d-flex align-items-center gap-2 mb-2" style={{ whiteSpace: "nowrap" }}>
    <i className="bi bi-info-circle"></i> Manage Vendors
  </li>
</ul>

      {/* Current Plan Button */}
      <button className="btn btn-success w-100 mt-3" disabled>
        Current Plan
      </button>
    </div>
  </div>
</div>

            </div>
          </div>

          {/* Footer */}
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
          <th style={{ width: "20%" }}>Total Hostel</th>
          <th style={{ width: "30%" }}>Plan</th>
          <th style={{ width: "20%", textAlign: "center" }}>Plan Amount</th>
          <th style={{ width: "20%", textAlign: "center" }}>Total Amount</th>
          <th style={{ width: "10%", textAlign: "right" }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <select className="form-select">
              <option>2 Hostel</option>
            </select>
          </td>
          <td>Suite Growth</td>
          <td style={{ textAlign: "center" }}>₹ 999</td>
          <td style={{ textAlign: "center" }}>₹ 3996</td>
          <td
            style={{
              textAlign: "right",
              display: "flex",
              justifyContent: "end",
              gap: "8px",
            }}
          >
            <img src={Edit} alt="edit" width={20} height={20}/>
            <img src={Delete} alt="delete" width={20} height={20}/>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>



        </div>
      </div>
    </div>




    </div>
  )
}
export default SettingSubscription;
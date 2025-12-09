/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useState, useEffect, useRef } from "react";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min";
import { useDispatch, useSelector } from "react-redux";
// import crown from "../../Assets/Images/New_images/crown.png";
import { Button, Form, FormControl } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import DeleteIcon from "../../Assets/Images/Delete_red.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import { MdError } from "react-icons/md";
import { CloseCircle } from "iconsax-react";
import { ArrowUp2, ArrowDown2, Calendar } from "iconsax-react";
import { Table } from "react-bootstrap";
import "./SettingSubscription.css";
import PaginationList from '../../Components/PaginationList';
import ErrorMessage from '../../Components/ErrorMessage';
import { useHasPermission } from '../../Utils/Permission';
import Emptystate from "../../Assets/Images/Empty-State.jpg";
import withErrorBoundary from "../../Hoc/WithErrorBountry";
import Cookies from 'universal-cookie';
import axios from 'axios'
import { Card, Row, Col } from "react-bootstrap";
import { TbCheck } from "react-icons/tb";

function SettingSubscription() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [plan, setPlan] = useState(false);
  const [changePlan, setChangePlan] = useState(false);
  // const [userId, setUserId] = useState("");
  // const [customerId, setCustomerId] = useState("");
  const [planCode, setPlanCode] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [hostelCount, setHostelCount] = useState("0");
  const [selectedPlanError, setSelectedPlanError] = useState("");
  const [hostelCountError, setHostelCountError] = useState("");
  const [hostelError, setHostelError] = useState("");
  // const [planType, setPlanType] = useState("");
  const [getPlanActive, setGetPlanActive] = useState([]);
  const [selectedHostels, setSelectedHostels] = useState([]);
  const modalRef = useRef();
  const cookies = new Cookies();

  const hostelDetails = getPlanActive?.[0]?.hostel_details || [];






  const {
    canWriteModule: canWriteSubscription,
    canReadModule: canReadSubscription,
    // canUpdateModule: canUpdateSubscription,
    // canDeleteModule: canDeleteSubscription,
  } = useHasPermission("Subscription");






  useEffect(() => {
    if (state?.createAccount?.accountList[0]?.plan_data) {
      setGetPlanActive(state?.createAccount?.accountList[0]?.plan_data);
    }
  }, [state?.createAccount?.accountList[0]?.plan_data]);


  useEffect(() => {
    dispatch({ type: "NEWPLANLIST" });
    dispatch({ type: 'NEWSUBSCRIPTIONDETAILS', payload: state.login.selectedHostel_Id })
  }, []);

  useEffect(() => {
    if (state.Settings.statusCodeNewSubscription === 200) {
      const Redirect_Url = state.Settings.subscriptionNew.url;
      if (Redirect_Url) {
        window.open(Redirect_Url, "_blank");
      }

      setTimeout(() => {
        dispatch({ type: "CLEAR_NEW_SUBSCRIPTION" });
      }, 1000);
    }
  }, [state.Settings.statusCodeNewSubscription]);





  const handleHostelSelect = (selectedOption) => {
    if (!selectedOption) {
      setHostelError("please select hostel");
      return;
    }

    setHostelError("");
    setSelectedHostels((prev) => [...prev, selectedOption]);
  };

  const handleRemoveHostel = (valueToRemove) => {
    const updatedList = selectedHostels.filter(
      (item) => item.value !== valueToRemove
    );
    setSelectedHostels(updatedList);
  };


  const hostelOptions = state.UsersList.hostelListNewDetails.data
    ?.map((item) => ({
      label: item.Name,
      value: item.id,
    }))

    .filter(
      (option) => !selectedHostels.some((sel) => sel.value === option.value)
    );






  useEffect(() => {
    if (selectedHostels) {
      setHostelCount(selectedHostels.length);
    }
  }, [selectedHostels]);

  const [hostelIds, setHostelIds] = useState([]);

  useEffect(() => {
    const ids = selectedHostels.map((item) => item.value);
    setHostelIds(ids);
  }, [selectedHostels]);

  useEffect(() => {
    setHostelCount("0");
    setAmount(Number(selectedPlan) || 0);
  }, [selectedPlan]);

  const handlePlanChange = (price) => {
    setSelectedPlan(price);
    setPlan(true);
    setAmount(hostelCount * price);
    handleCloseCurrentPlan();

    if (price === 1) {
      setPlanCode("basic_smart");
    } else if (price === 2) {
      setPlanCode("advance_prod");
    } else if (price === 999) {
      setPlanCode("smartstay_oneyear");
    }
  };

  useEffect(() => {
    setAmount(hostelCount * (Number(selectedPlan) || 0));
  }, [selectedPlan, hostelCount]);

  useEffect(() => {
    if (changePlan && modalRef.current) {
      const modal = new bootstrap.Modal(modalRef.current);
      modal.show();
    }
  }, [changePlan]);

  const handleClosePlanChange = () => {
    setPlan(false);
    setHostelCountError("");
    setSelectedHostels([]);
  };

  const handleCurrentPlan = () => {
    setChangePlan(true);
  };




  useEffect(() => {
    if (changePlan) {
      handleClosePlanChange();

    }
  }, [changePlan]);

  const handleSubmit = () => {
    let isValid = true;

    if (!selectedPlan) {
      setSelectedPlanError("Please Select a Plan");
      isValid = false;
    } else {
      setSelectedPlanError("");
    }

    if (selectedHostels.length === 0) {
      setHostelError("please select hostel");
      isValid = false;
      return;
    }

    if (isValid && selectedHostels.length > 0) {
      dispatch({
        type: "NEWSUBSCRIPTION",
        payload: {
          // user_id: userId,
          // customer_id: customerId,
          plan_code: planCode,
          amount: amount,
          hostel_ids: hostelIds,
          hostel_count: Number(hostelCount),
        },
      });
    }
  };

  const handleCloseCurrentPlan = () => {
    setChangePlan(false);
    setHostelCountError("");

  };

  // const gotoPayment = () => {
  //   const token = cookies.get('v2-token');

  //   const form = document.createElement("form");
  //   form.method = "GET";
  //   form.action = "http://localhost:8083/smartstay/payment/";
  //   form.target = "_blank";
  //   const hiddenField = document.createElement("input");
  //   hiddenField.type = "hidden";
  //   hiddenField.name = "token";
  //   hiddenField.value = token;

  //   form.appendChild(hiddenField);
  //   document.body.appendChild(form);

  //   form.submit();
  // };


  // const gotoPayment = () => {
  //   const token = cookies.get("v2-token");
  //   window.location.href = `http://localhost:8083/smartstay/payment/?token=${token}`;
  // };


  const gotoPayment = async () => {
    const token = cookies.get("v2-token");

    try {
      const response = await axios.get(
        "http://localhost:8083/smartstay/payment/",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("Payment Response:", response.data);
      if(response.status === 200){
        const newWindow = window.open("http://localhost:8083/smartstay/payment/", "_blank");  
      newWindow.document.write(response.data);      
      newWindow.document.close(); 
      }
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };




  const plans = [
    {
      title: "Basic Plan",
      price: "₹599",
      period: "Monthly",
      features: [
        "Dashboard & Property Management",
        "Tenant & Room Management",
        "Asset and Expenses Management",
        "Auto Recurring Invoices",
        "Complaint Management",
        "Due Reminders (In-App & Email)",
        "EB Calculation",
        "Rent Collection Tracking",
        "Reports & Insights"
      ],
      color: "#EAF5FF"
    },
    {
      title: "Premium Plan",
      price: "₹999",
      period: "Monthly",
      features: [
        "Dashboard & Property Management",
        "Tenant & Room Management",
        "Asset and Expenses Management",
        "Auto Recurring Invoices",
        "Complaint Management",
        "Due Reminders (In-App & Email)",
        "EB Calculation",
        "Rent Collection Tracking",
        "Reports & Insights",
        "Advanced Reports",
        "Smart Automations"
      ],
      color: "#FFF4E8"
    }
  ];











  return (
    <div className="container" style={{ overflowY: 'hidden', height: '100vh' }}>
      <div style={{ marginTop: 35 }}>
        <div className="w-100  mt-4">
          <div>
            <label
              className="cardnewsubs"
              style={{ fontSize: 20, fontFamily: "Gilroy", fontWeight: 600, color: "#222" }}
            >
              Subscription
            </label>
          </div>

          <div>
            <p style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 500, color: "#4B4B4B" }}>Manage your subscription and billing</p>

          </div>

        </div>
      </div>




      {!canReadSubscription ?
        (

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",

            }}
          >
            <img
              src={Emptystate}
              alt="Empty State"

            />
            <ErrorMessage message={['You do not have access to view Subscription']} type="warning" />
          </div>
        )
        :
        (
          <>
            <Button disabled={!canWriteSubscription}
              style={{
                backgroundColor: "#1E45E1",
                fontWeight: 600,
                borderRadius: 12,
                fontSize: 16,
                fontFamily: "Gilroy",
                padding: 10,
                border: "1px solid #1E45E1",
                color: "#FFF"
              }}
              className=" fw-semibold fs-6 me-5"
              // onClick={handleCurrentPlan}
              onClick={gotoPayment}

            >
              Navigate
            </Button>
            {/* <Button disabled={!canWriteSubscription}
              style={{
                backgroundColor: "#1E45E1",
                fontWeight: 600,
                borderRadius: 12,
                fontSize: 16,
                fontFamily: "Gilroy",
                padding: 10,
                border: "1px solid #1E45E1",
                color: "#FFF"
              }}
              className=" fw-semibold fs-6"
              onClick={handleCurrentPlan}


            >
              Upgrade Plan
            </Button> */}



            <div className="container mt-4 show-scroll p-0 m-0" style={{
  fontFamily: "Gilroy", maxHeight: "500px",
  overflowY: "auto",
}}>

  <Card className="p-4 mb-4 me-2" style={{ borderRadius: "14px" }}>
    <div
      style={{
        background: "#1E45E1",
        color: "white",
        padding: "3px 12px",
        borderRadius: "12px",
        fontSize: "12px",
        width: "fit-content",
        textAlign: "center", fontWeight: 500
      }}
    >
      <TbCheck /> {" "}Free Trial
    </div>

    <h6 className="mt-1" style={{ fontWeight: 600, color: "#222222", fontSize: 16 }}>
      You are in Free Trial
    </h6>

    <Row className="mt-2">
      <Col>
        <div className='d-flex gap-2 align-items-center'>
          <Calendar size="16" color="#4B4B4B" />
          <div className=''>
            <div>
                        <label style={{ fontWeight: 400, color: "#4B4B4B", fontSize: 14 }}>Start Date</label>

            </div>
            <div>
                  <label className='' style={{ fontWeight: 400, color: "#4B4B4B", fontSize: 16 }}>Oct 21, 2025</label>

            </div>
</div>
        </div>

      </Col>

      <Col>
        <div className='d-flex gap-2 align-items-center'>
          <Calendar size="16" color="#4B4B4B" />
          <label style={{ fontWeight: 400, color: "#4B4B4B", fontSize: 14 }}>End Date</label>
        </div>

        <label>Oct 21, 2025</label>
      </Col>
    </Row>

    <Card className="mt-3 p-3" style={{ background: "#F5F5F5", borderRadius: "12px" }}>
      Upgrade to continue unlimited access once your trial ends.
    </Card>

    <Button
      className="mt-3"
      style={{
        background: "#2F80ED",
        borderRadius: "10px",
        padding: "10px 25px",
        border: "none"
      }}
    >
      Upgrade to Premium
    </Button>
  </Card>

  <Row className='me-0'>
    {plans.map((plan, idx) => (
      <Col md={6} key={idx}>
        <Card
          className="p-3 mb-3"
          style={{
            borderRadius: "14px",
            border: "1px solid #E5E5E5",
            position: "relative"
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "15px",
              right: "15px",
              background: plan.color,
              padding: "5px 15px",
              borderRadius: "10px",
              fontWeight: 600
            }}
          >
            {plan.price} <span style={{ fontSize: 12 }}>{plan.period}</span>
          </div>

          <h5 className="mt-3" style={{ fontWeight: 700 }}>
            {plan.title}
          </h5>

          <label style={{ color: "#666" }}>Perfect for PGs getting started</label>

          <div
            style={{
              maxHeight: "170px",
              overflowY: "auto",
              paddingRight: "5px"
            }}
          >
            {plan.features.map((f, i) => (
              <div
                key={i}
                className="d-flex align-items-start mb-2"
                style={{ fontSize: "14px" }}
              >
                <span
                  style={{
                    color: "#2F80ED",
                    fontWeight: "bold",
                    marginRight: "8px"
                  }}
                >
                  ✔
                </span>
                <label>{f}</label>
              </div>
            ))}
          </div>

          <Button
            className="mt-3 w-100"
            style={{
              background: "#2F80ED",
              borderRadius: "10px",
              padding: "10px 0",
              border: "none"
            }}
          >
            Select Plan →
          </Button>
        </Card>
      </Col>
    ))}
  </Row>

</div>

          </>
        )
      }

      {/* <button  style={{
                      backgroundColor: "#1E45E1",
                      fontWeight: 600,
                      borderRadius: 12,
                      fontSize: 16,
                      fontFamily: "Gilroy",
                      padding: 12,
                      border: "1px solid #1E45E1",
                      color: "#FFF"
                    }} onClick={gotoPayment}>
  Go to Payment
</button> */}

      {getPlanActive?.length > 0 && getPlanActive[0]?.amount > 0 && (
        <div className="col-lg-12 col-md-12 col-sm-10 mt-3">
          <div
            className="  me-2"
            style={{ paddingBottom: "20px" }}
          >
            {getPlanActive?.length > 0 && (
              <div
                className="show-scrolls"
                style={{
                  maxHeight: "200px",
                  overflowY: "auto",
                  borderTop: "1px solid #E8E8E8",
                  marginBottom: 20,
                  marginTop: "20px",
                  paddingRight: 0,
                  paddingLeft: 0,
                }}
              >
                <Table
                  responsive="md"
                  style={{
                    fontFamily: "Gilroy",
                    color: "rgba(34, 34, 34, 1)",
                    fontSize: 14,
                    fontStyle: "normal",
                    fontWeight: 500,
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                    borderRadius: 0,
                  }}
                >
                  <thead
                    style={{
                      fontFamily: "Gilroy",
                      backgroundColor: "rgba(231, 241, 255, 1)",
                      color: "rgba(34, 34, 34, 1)",
                      fontSize: 12,
                      fontStyle: "normal",
                      fontWeight: 500,
                      position: "sticky",
                      top: 0,
                      zIndex: 1,
                    }}
                  >
                    <tr className="" style={{ height: "30px" }}>
                      <th
                        style={{
                          textAlign: "start",
                          color: "#939393",
                          fontWeight: 500,
                          fontSize: "12px",
                          fontFamily: "Gilroy",
                          paddingTop: "10px",
                          paddingBottom: "10px",
                          paddingLeft: "20px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <div className="d-flex gap-1 align-items-center justify-content-start">
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "2px",
                            }}
                          >
                            <ArrowUp2
                              size="10"
                              variant="Bold"
                              color="#1E45E1"
                              style={{ cursor: "pointer" }}
                            />
                            <ArrowDown2
                              size="10"
                              variant="Bold"
                              color="#1E45E1"
                              style={{ cursor: "pointer" }}
                            />
                          </div>
                          S.No
                        </div>
                      </th>
                      <th
                        style={{
                          color: "#939393",
                          fontWeight: 500,
                          fontSize: "12px",
                          fontFamily: "Gilroy",
                          paddingTop: "10px",
                          paddingBottom: "10px",
                          textAlign: "start",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <div className="d-flex gap-1 align-items-center justify-content-start">
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "2px",
                            }}
                          >
                            <ArrowUp2
                              size="10"
                              variant="Bold"
                              color="#1E45E1"
                              style={{ cursor: "pointer" }}
                            />
                            <ArrowDown2
                              size="10"
                              variant="Bold"
                              color="#1E45E1"
                              style={{ cursor: "pointer" }}
                            />
                          </div>
                          Hostel Name
                        </div>
                      </th>
                      <th
                        style={{
                          color: "#939393",
                          fontWeight: 500,
                          fontSize: "12px",
                          fontFamily: "Gilroy",
                          paddingTop: "10px",
                          paddingBottom: "10px",
                          textAlign: "start",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <div className="d-flex gap-1 align-items-center justify-content-start">
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "2px",
                            }}
                          >
                            <ArrowUp2
                              size="10"
                              variant="Bold"
                              color="#1E45E1"
                              style={{ cursor: "pointer" }}
                            />
                            <ArrowDown2
                              size="10"
                              variant="Bold"
                              color="#1E45E1"
                              style={{ cursor: "pointer" }}
                            />
                          </div>
                          Plan startDate
                        </div>
                      </th>
                      <th
                        style={{
                          color: "#939393",
                          fontWeight: 500,
                          fontSize: "12px",
                          fontFamily: "Gilroy",
                          paddingTop: "10px",
                          paddingBottom: "10px",
                          textAlign: "start",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <div className="d-flex gap-1 align-items-center justify-content-start">
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "2px",
                            }}
                          >
                            <ArrowUp2
                              size="10"
                              variant="Bold"
                              color="#1E45E1"
                              style={{ cursor: "pointer" }}
                            />
                            <ArrowDown2
                              size="10"
                              variant="Bold"
                              color="#1E45E1"
                              style={{ cursor: "pointer" }}
                            />
                          </div>
                          Plan EndDate
                        </div>
                      </th>

                      <th
                        style={{
                          color: "#939393",
                          fontWeight: 500,
                          fontSize: "12px",
                          fontFamily: "Gilroy",
                          paddingTop: "10px",
                          paddingBottom: "10px",
                          textAlign: "start",
                        }}
                      >
                        <div className="d-flex gap-1 align-items-center justify-content-start">
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "2px",
                            }}
                          >
                            <ArrowUp2
                              size="10"
                              variant="Bold"
                              color="#1E45E1"
                              style={{ cursor: "pointer" }}
                            />
                            <ArrowDown2
                              size="10"
                              variant="Bold"
                              color="#1E45E1"
                              style={{ cursor: "pointer" }}
                            />
                          </div>
                          Status
                        </div>
                      </th>

                    </tr>
                  </thead>
                  {/* <tbody
                      style={{
                        height: "50px",
                        fontSize: "11px",
                        verticalAlign: "middle",
                      }}
                    >
                      
                      {paginatedData.length > 0 && paginatedData?.map((view, index) => {
                       let formattedDate = "-";
                    if (view.plan_start) {
                      const Dated = new Date(view.plan_start);
                      const day = Dated.getDate();
                      const month = Dated.getMonth() + 1;
                      const year = Dated.getFullYear();
                      formattedDate = `${day}/${month}/${year}`;
                            }
 

                          let DueformattedDate = "-";
                   if (view.plan_end) {
                         const dueDated = new Date(view.plan_end);
                         const daydue = dueDated.getDate();
                          const monthdue = dueDated.getMonth() + 1;
                         const yeardue = dueDated.getFullYear();
                           DueformattedDate = `${daydue}/${monthdue}/${yeardue}`;
                           }


                          return (
                            <tr key={index} style={{ marginTop: "20px" }}>
                              <td
                                style={{
                                  textAlign: "left",
                                  fontWeight: 500,
                                  fontSize: "13px",
                                  fontFamily: "Gilroy",
                                  borderBottom: "1px solid #E8E8E8",
                                }}
                                className="ps-2 ps-sm-2 ps-md-3 ps-lg-4"
                              >

                               <div style={{marginLeft:10}}>{indexOfFirstItem + index + 1}</div> 
                              </td>
                              <td
                                style={{
                                  textAlign: "start",
                                  fontWeight: 500,
                                  fontSize: "13px",
                                  fontFamily: "Gilroy",
                                  paddingLeft: "20px",
                                  borderBottom: "1px solid #E8E8E8",
                                }}
                                className="ps-2 ps-sm-2 ps-md-3 ps-lg-3"
                              >
                                <div style={{marginLeft:6}}>{view.name}</div>  
                              </td>
                              <td
                                style={{
                                  textAlign: "start",
                                  borderBottom: "1px solid #E8E8E8",
                                }}
                                className="ps-2 ps-sm-2 ps-md-3 ps-lg-3"
                              >
                                <span
                                  style={{
                                    backgroundColor: "#EBEBEB",
                                    paddingTop: "3px",
                                    paddingLeft: "10px",
                                    paddingRight: "10px",
                                    paddingBottom: "3px",
                                    borderRadius: "10px",
                                    lineHeight: "1.5em",
                                    margin: "0",
                                    fontSize: "11px",
                                    fontWeight: 500,
                                    fontFamily: "Gilroy",
                                    textAlign: "start",
                                  }}
                                >
                                  {formattedDate}
                                </span>
                              </td>
                              <td
                                style={{
                                  textAlign: "start",
                                  borderBottom: "1px solid #E8E8E8",
                                }}
                                className="ps-2 ps-sm-2 ps-md-3 ps-lg-3"
                              >
                                <span
                                  style={{
                                    backgroundColor: "#EBEBEB",
                                    paddingTop: "3px",
                                    paddingLeft: "10px",
                                    paddingRight: "10px",
                                    paddingBottom: "3px",
                                    borderRadius: "10px",
                                    lineHeight: "1.5em",
                                    margin: "0",
                                    fontSize: "11px",
                                    fontWeight: 500,
                                    fontFamily: "Gilroy",
                                    textAlign: "start",
                                  }}
                                >
                                  {DueformattedDate}
                                </span>
                              </td>

                              <td
                                style={{
                                  textAlign: "start",
                                  borderBottom: "1px solid #E8E8E8",
                                }}
                                className="ps-2 ps-sm-2 ps-md-3 ps-lg-2"
                              >
                                <span
                                  style={{
                                    color: "black",
                                    backgroundColor: "#D9FFD9",
                                    paddingLeft: "10px",
                                    paddingRight: "10px",
                                    marginLeft:4,
                                    fontSize: "11px",
                                    fontWeight: 500,
                                    borderRadius: "10px",
                                  }}
                                >
                                  {view.plan_status === 1
                                    ? "Active"
                                    : "Not Active"}
                                </span>
                              </td>


                            </tr>
                          );
                        })}
                    </tbody> */}

                  <tbody style={{ fontSize: "11px", verticalAlign: "middle", height: "50px" }}>
                    <PaginationList>
                      {hostelDetails.map((view, index) => {
                        let formattedDate = view.plan_start
                          ? `${new Date(view.plan_start).getDate()}/${new Date(view.plan_start).getMonth() + 1}/${new Date(view.plan_start).getFullYear()}`
                          : "-";
                        let DueformattedDate = view.plan_end
                          ? `${new Date(view.plan_end).getDate()}/${new Date(view.plan_end).getMonth() + 1}/${new Date(view.plan_end).getFullYear()}`
                          : "-";

                        return (
                          <tr key={index} style={{ marginTop: "20px" }}>
                            <td>{index + 1}</td>
                            <td>{view.name}</td>
                            <td>{formattedDate}</td>
                            <td>{DueformattedDate}</td>
                            <td>
                              <span style={{
                                color: "black",
                                backgroundColor: "#D9FFD9",
                                padding: "3px 10px",
                                fontSize: "11px",
                                fontWeight: 500,
                                borderRadius: "10px"
                              }}>
                                {view.plan_status === 1 ? "Active" : "Not Active"}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </PaginationList>
                  </tbody>

                </Table>
              </div>
            )}


          </div>
        </div>
      )}






      <Modal
        show={changePlan}
        onHide={handleCloseCurrentPlan}
        backdrop="static"
        centered
        size="lg"
        className="change-plan-modal" >

        <Modal.Header
          style={{ position: "relative", paddingLeft: 40, paddingRight: 40 }}
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



          <CloseCircle
            size="24"
            color="#000"
            onClick={handleCloseCurrentPlan}
            style={{ cursor: "pointer" }}
          />
        </Modal.Header>


        <Modal.Body className="modal-scroll-body p-2">





          <div className="modal-body">
            <div className="row g-3">
              {state?.Settings?.planList?.map((plan, index) => (
                <div
                  key={index}
                  className="col-12 col-sm-6 col-md-6 d-flex justify-content-center"
                >
                  <div
                    // className={`card   border position-relative ${planType === plan.planName ? "border-success" : "border-secondary"
                    //   }`}
                    style={{
                      borderRadius: "14px",
                      backgroundColor: "#F8FAFC",
                      padding: "15px",
                    }}
                  >
                    <div className="card-body text-center p-0 mt-3">
                      {/* {planType === plan.planName && (
                        <span
                          className="badge bg-success position-absolute start-50 translate-middle"
                          style={{
                            top: "-30px",
                            padding: "5px 10px",
                            fontSize: "12px",
                            fontFamily: "Gilroy",
                            fontWeight: 600,
                          }}
                        >
                          Current Plan
                        </span>
                      )} */}

                      {/* Plan Name */}
                      <h4 className="card-title" style={{ fontFamily: "Gilroy" }}>
                        {plan.planName} Plan
                      </h4>

                      <p style={{ fontFamily: "Gilroy" }}>
                        per agent/month billed {plan.frequency}
                      </p>

                      <p
                        className="fs-4 fw-bold pb-2 border-bottom"
                        style={{ fontFamily: "Gilroy" }}
                      >
                        ₹{plan.discountedPrice || plan.price}
                      </p>

                      <p
                        className="fw-semibold text-start mt-3"
                        style={{ fontFamily: "Gilroy" }}
                      >
                        Plan Features:
                      </p>


                      <ul className="list-unstyled text-start px-3">
                        {plan.features?.map((feature, i) => (
                          <li
                            key={i}
                            className="d-flex align-items-center gap-2 mb-2"
                            style={{ fontFamily: "Gilroy" }}
                          >
                            <i
                              className="bi bi-info-circle"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title={feature}
                            ></i>
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <hr className="m-0" style={{ color: "#BCCAEB" }} />

                      {/* {planType === plan.planName ? (
                        <Button
                          className="btn btn-changeplan btn-success w-100 mt-3"
                          onClick={() => handlePlanChange(plan.planId)}
                          style={{ fontFamily: "Gilroy" }}
                        >
                          Current Plan
                        </Button>
                      ) : ( */}
                      <Button disabled={!canWriteSubscription} className='w-100'
                        style={{
                          backgroundColor: "#1E45E1",
                          fontWeight: 600,
                          borderRadius: 12,
                          fontSize: 16,
                          fontFamily: "Gilroy",
                          padding: 8,
                          border: "1px solid #1E45E1",
                          color: "#FFF"
                        }}
                        onClick={() => handlePlanChange(plan.planId)}

                      >
                        Change Plan
                      </Button>
                      {/* // )} */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>


          {/* <div style={{ textAlign: "center" }}>
  <h4 style={{ fontFamily: "Gilroy" }}>
    {state?.Settings?.subcripitionAllDetails?.planName?.toLowerCase() === "trial" ? (
      "Your plan is on free trial"
    ) : (
      ""
    )}
  </h4>
</div> */}
          {state?.Settings?.subcripitionAllDetails && (
            <div className="p-3">
              <div className="table-responsive border rounded">
                <table
                  className="table mb-0 "
                  style={{
                    width: "100%",
                  }}
                >
                  <thead>
                    <tr style={{ backgroundColor: "#e9f2ff", fontFamily: "Gilroy", fontWeight: 500 }}>
                      <th style={{ fontFamily: "Gilroy", fontWeight: 500, color: "#4B4B4B" }}>Total Hostel</th>
                      <th style={{ fontFamily: "Gilroy", fontWeight: 500, color: "#4B4B4B" }}>Plan Name</th>
                      <th style={{ textAlign: "center", fontFamily: "Gilroy", fontWeight: 500, color: "#4B4B4B" }}>Plan Amount</th>
                      <th style={{ textAlign: "center", fontFamily: "Gilroy", fontWeight: 500, color: "#4B4B4B" }}>Total Amount</th>
                      <th
                        style={{ textAlign: "center", whiteSpace: "nowrap", fontFamily: "Gilroy", fontWeight: 500, color: "#4B4B4B" }}
                      >
                        Plan Start Date
                      </th>
                      <th
                        style={{ textAlign: "center", whiteSpace: "nowrap", fontFamily: "Gilroy", fontWeight: 500, color: "#4B4B4B" }}
                      >
                        Plan End Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ fontFamily: "Gilroy", fontWeight: 500, color: "#222" }}>
                      <td style={{ textAlign: "center", color: "#222" }}>
                        {" "}
                        {getPlanActive[0]?.hostel_count}
                      </td>
                      <td style={{ textAlign: "center", color: "#222" }}>
                        {state?.Settings?.subcripitionAllDetails?.planName || "-"}
                      </td>
                      <td style={{ textAlign: "center", color: "#222222" }}>
                        ₹ {getPlanActive[0]?.amount}
                      </td>
                      <td style={{ textAlign: "center", color: "#222222" }}>
                        ₹ {getPlanActive[0]?.amount}
                      </td>
                      <td style={{ textAlign: "center", color: "#222" }}>
                        {state?.Settings?.subcripitionAllDetails?.currentPlanStartedAt || "-"}
                      </td>
                      <td style={{ textAlign: "center", color: "#222" }}>
                        {state?.Settings?.subcripitionAllDetails?.currentPlanEndingAt || "-"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}





        </Modal.Body>

        <Modal.Footer style={{ border: "none" }}></Modal.Footer>

      </Modal>

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
          <Modal.Body style={{ marginTop: -30 }}>
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
                  <div style={{ paddingRight: 40 }}>
                    (
                    {planCode?.trim() === "basic_smart"
                      ? "1 Month Plan"
                      : planCode?.trim() === "advance_prod"
                        ? "3 Month Plan"
                        :
                        planCode}{" "}
                    - Rs.{selectedPlan})
                  </div>


                  <CloseCircle
                    size="24"
                    color="#000"
                    onClick={handleClosePlanChange}
                    style={{ cursor: "pointer" }}
                  />
                </Modal.Header>

                <div className="row mb-3 change-plan-form">
                  <div className="col-lg-12 col-md-12 col-sm-11 col-xs-11 mb-3">
                    <Form.Group
                      className="mb-1"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label
                        style={{
                          fontFamily: "Gilroy",
                          fontSize: 14,
                          fontWeight: 400,
                          color: "rgba(34, 34, 34, 1)",
                          fontStyle: "normal",
                          lineHeight: "normal",
                        }}
                      >
                        Select PG{" "}
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

                      <Select
                        options={hostelOptions}
                        placeholder="Select Hostel"
                        value={null}
                        onChange={handleHostelSelect}
                        classNamePrefix="custom"
                        menuPlacement="auto"
                        styles={{
                          control: (base) => ({
                            ...base,
                            padding: "2px",
                            marginTop: "5px",
                            fontSize: "16px",
                            fontFamily: "Gilroy",
                            fontWeight: 400,
                            color: "rgba(34, 34, 34, 1)",
                            borderColor: "#ced4da",
                            minHeight: "40px",
                            cursor: 'pointer'
                          }),
                        }}
                      />

                      {selectedHostels.length > 0 && (
                        <div className="mt-3 d-flex flex-wrap gap-2">
                          {selectedHostels.map((hostel) => (
                            <div
                              key={hostel.value}
                              className="d-flex align-items-center px-3 py-1 rounded bg-white"
                              style={{
                                fontWeight: 400,
                                borderRadius: "8px",
                                border: "1px solid rgba(30, 69, 225, 1)",
                              }}
                            >
                              {hostel.label}
                              <img
                                className="ms-2"
                                src={DeleteIcon}
                                alt="delete"
                                height={14}
                                width={14}
                                onClick={() => handleRemoveHostel(hostel.value)}
                                style={{ cursor: "pointer" }}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </Form.Group>

                    {hostelError && (
                      <ErrorMessage message={hostelError} type="error" />
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
                        readOnly

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
                      <ErrorMessage message={hostelCountError} type="error" />
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
                    {selectedPlanError && (
                      <ErrorMessage message={selectedPlanError} type="error" />
                    )}
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 cmt">
                    <Form.Group>
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

                  </div>
                </div>

                <Button
                  className="w-100 buy-now"
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
            </div>
          </Modal.Body>

          <Modal.Footer style={{ border: "none" }}></Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </div>

  );
}
export default withErrorBoundary(SettingSubscription);

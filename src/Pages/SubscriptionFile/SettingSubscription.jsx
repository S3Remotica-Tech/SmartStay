/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useState, useEffect, useRef } from "react";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min";
import { useDispatch, useSelector } from "react-redux";
// import crown from "../../Assets/Images/New_images/crown.png";
import { Button, Form, FormControl, Image } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import DeleteIcon from "../../Assets/Images/Delete_red.png";
import Expire from "../../Assets/Images/New_images/subscriptionexpire.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import { MdError } from "react-icons/md";
import { CloseCircle } from "iconsax-react";
import {
  // ArrowUp2, ArrowDown2,
  Calendar
} from "iconsax-react";
// import { Table } from "react-bootstrap";
import "./SettingSubscription.css";
// import PaginationList from '../../Components/PaginationList';
import ErrorMessage from '../../Components/ErrorMessage';
import { useHasPermission } from '../../Utils/Permission';
import Emptystate from "../../Assets/Images/Empty-State.jpg";
import withErrorBoundary from "../../Hoc/WithErrorBountry";
// import Cookies from 'universal-cookie';
// import axios from 'axios'
import { Card, Row, Col } from "react-bootstrap";
import { TbCheck } from "react-icons/tb";
import { FaSquareCheck } from "react-icons/fa6";
import { MdArrowRightAlt } from "react-icons/md";
import { IoClose } from "react-icons/io5";
// import BasicPlan from '../SubscriptionFile/BasicPlan'
// import PremiumPlan from './PremiumPlan';

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
  // const cookies = new Cookies();

  // const hostelDetails = getPlanActive?.[0]?.hostel_details || [];






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

  // const handleCurrentPlan = () => {
  //   setChangePlan(true);
  // };




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



  // const gotoPayment = async () => {
  //   const token = cookies.get("v2-token");

  //   try {
  //     const response = await axios.get(
  //       "http://localhost:8083/smartstay/payment/",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`
  //         },
  //         responseType: "text"
  //       }
  //     );


  //     if (response.status === 200) {
  //         const newWindow = window.open("http://localhost:8083/smartstay/payment/", "_blank");  
  //       newWindow.document.write(response.data);   
  //       console.log("response&&&&", response.data);


  //       // sessionStorage.setItem("payment_html", response.data);
  //       // dispatch(setPaymentHtml(response.data));
  //       // setTimeout(() => {
  //       //   window.open("/payment-preview", "_blank");
  //       // }, 200);

  //       // newWindow.document.close(); 
  //       // const blob = new Blob([response.data], { type: "text/html" });
  //       // const url = URL.createObjectURL(blob);

  //       // window.open(url, "_blank");
  //     }
  //   } catch (error) {
  //     console.error("Payment Error:", error);
  //   }
  // };







  // const gotoPayment = async () => {
  //   const token = cookies.get("v2-token");

  //   try {
  //     const response = await axios.get("http://localhost:8083/smartstay/payment/", {
  //       headers: { Authorization: `Bearer ${token}` },
  //       responseType: "text"
  //     });

  //     if (response.status === 200) {
  //       console.log("navigated success")
  //       window.location.href = "http://localhost:8083/smartstay/payment/", "_self";
  //       // sessionStorage.setItem("payment_html", response.data);
  //       // window.location.href = "/payment-preview";

  //       // const newWindow = window.open("http://localhost:8083/smartstay/payment/", "_blank");
  //       // newWindow.document.write(response.data);

  //       //  window.open("http://localhost:8083/smartstay/payment/", "_self");

  //       //    const newDoc = document.open("text/html", "replace");
  //       // newDoc.write(response.data);
  //       // newDoc.close();

  //       // const blob = new Blob([response.data], { type: "text/html" });
  //       // const url = URL.createObjectURL(blob);

  //       // window.location.href = url;   
  //     }
  //   } catch (error) {
  //     console.error("Error", error);
  //   }
  // };


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
      bgcolor: "linear-gradient(to bottom, #6FA1FF, #4C5CFB)",
      color: "#fff"
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

      ],
      bgcolor: "linear-gradient(to bottom, #FFA726, #FB8C00)",
      color: "#FFF4E8"
    }
  ];











  return (
    <div className="p-0 m-0 h-screen overflow-hidden">
      <div className="sticky top-2 z-[1000] bg-white h-[50px] px-3 py-2 flex flex-col md:flex-row md:items-center md:justify-between whitespace-nowrap">
        <div className="w-full">

          <label className="block text-[20px] font-semibold font-[Gilroy] text-[#222]">
            Subscription
          </label>

          <p className="mt-1 text-[14px] font-medium font-[Gilroy] text-[#4B4B4B]">
            Manage your subscription and billing
          </p>

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
          //           <>
          //  <BasicPlan />
          //  <PremiumPlan />
          // </>
          <div>
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
              className=" fw-semibold fs-6 me-5"
              // onClick={handleCurrentPlan}
              onClick={gotoPayment}

            >
              Navigate
            </Button> */}
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



            <div className="container mt-4 show-scroll p-0 " style={{
              fontFamily: "Gilroy", maxHeight: "500px",
              overflowY: "auto", marginBottom: 50
            }}>

              <Card className="p-4 mb-4 me-2" style={{
                borderRadius: "14px", backgroundColor: "#F8F9FF",
                border: "2px solid #1E45E1",
                //  border: "2px solid #E8E8E8",
              }}>

                <div className='d-flex justify-content-between align-items-center'>
                  <div>


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
                  </div>
                  <div>
                    <label style={{ fontSize: 16, color: "#1E45E1", fontWeight: 500 }}>18 days left</label>
                  </div>


                </div>

                <Row className="mt-2">
                  <Col>
                    <div className='d-flex gap-2 align-items-start'>
                      <div>
                        <Calendar size="16" color="#4B4B4B" />
                      </div>

                      <div className=''>
                        <div>
                          <label style={{ fontWeight: 400, color: "#4B4B4B", fontSize: 13 }}>Start Date</label>

                        </div>
                        <div>
                          <label className='' style={{ fontWeight: 400, color: "#4B4B4B", fontSize: 16 }}>Oct 21, 2025</label>

                        </div>
                      </div>
                    </div>

                  </Col>

                  <Col>
                    <div className='d-flex gap-2 align-items-start'>
                      <div>
                        <Calendar size="16" color="#4B4B4B" />
                      </div>

                      <div className=''>
                        <div>
                          <label style={{ fontWeight: 400, color: "#4B4B4B", fontSize: 13 }}>End Date</label>

                        </div>
                        <div>
                          <label className='' style={{ fontWeight: 400, color: "#4B4B4B", fontSize: 16 }}>Oct 21, 2025</label>

                        </div>
                      </div>
                    </div>

                  </Col>
                </Row>

                <Card className="mt-3 p-3" style={{ border: "1px solid #E0E0E0", backgroundColor: "#fff", borderRadius: "12px", color: "#4B4B4B", fontSize: 16, fontWeight: 400 }}>
                  Upgrade to continue unlimited access once your trial ends.
                </Card>
                <div className='d-flex justify-content-end'>
                  <Button
                    className="mt-3"
                    style={{
                      background: "#1E45E1",
                      borderRadius: "10px",
                      padding: "10px 25px",
                      border: "none",
                      fontSize: 14, fontWeight: 400
                    }}
                  >
                    Upgrade to Premium
                  </Button>
                </div>

              </Card>

              <Card className="p-4 mb-4 me-2" style={{
                borderRadius: "14px", backgroundColor: "#FFFAFA",
                border: "2px solid #FFB5B8",
                //  border: "2px solid #E8E8E8",
              }}>
                <Row className='g-1'>

                  <Col md={3}>
                    <Image src={Expire} alt="expire" className='img-fluid' />
                  </Col>
                  <Col
                    md={9}
                    className="d-flex flex-column justify-content-center align-items-start"
                  >
                    <div className="text-start">
                      <label style={{ color: "#222222", fontSize: 20, fontWeight: 600 }}>
                        Your Trial Expired
                      </label>
                    </div>
                    <div className="">
                      <label style={{ color: "#8E8E8E", fontSize: 14, fontWeight: 400 }}>
                        Your free trial has ended. Subscribe now to continue accessing all features.
                      </label>
                    </div>
                  </Col>

                </Row>
                <Card className="mt-3 p-3" style={{ border: "1px solid #FFC9C9", backgroundColor: "#fff", borderRadius: "12px", }}>


                  <div>
                    <label style={{ color: "#222222", fontSize: 14, fontWeight: 600 }}>Limited Access Mode</label>
                  </div>


                  <Row>
                    <Col md={6}>
                      <div style={{ color: "#656565", fontSize: 14, fontWeight: 500, textDecoration: "line-through" }}><IoClose /> Dashboard & Property Management</div>
                      <div style={{ color: "#656565", fontSize: 14, fontWeight: 500, textDecoration: "line-through" }}><IoClose /> Asset and Expenses Management</div>
                      <div style={{ color: "#656565", fontSize: 14, fontWeight: 500, textDecoration: "line-through" }}><IoClose /> Complaint Management</div>
                      <div style={{ color: "#656565", fontSize: 14, fontWeight: 500, textDecoration: "line-through" }}><IoClose /> EB Calculation</div>
                    </Col>
                    <Col md={6}>
                      <div style={{ color: "#656565", fontSize: 14, fontWeight: 500, textDecoration: "line-through" }}><IoClose /> Tenant & Room Management</div>
                      <div style={{ color: "#656565", fontSize: 14, fontWeight: 500, textDecoration: "line-through" }}><IoClose /> Auto Recurring Invoices</div>
                      <div style={{ color: "#656565", fontSize: 14, fontWeight: 500, textDecoration: "line-through" }}><IoClose /> Due Reminders (In-App & Email)</div>
                      <div style={{ color: "#656565", fontSize: 14, fontWeight: 500, textDecoration: "line-through" }}><IoClose /> Rent Collection Tracking</div>
                    </Col>
                  </Row>
                </Card>

              </Card>





              <Row className='me-0 '>
                {plans.map((plan, idx) => (
                  <Col md={6} key={idx}>
                    <Card
                      className="p-3 mb-3"
                      style={{
                        borderRadius: "14px",
                        border: "2px solid #E8E8E8",
                        position: "relative"
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "-20px",
                          right: "30px",
                          background: plan.bgcolor,
                          color: plan.color,
                          padding: "5px 10px",
                          borderRadius: "10px",
                          fontWeight: 600
                        }}
                      >
                        <div className='text-center'>
                          <label style={{ fontSize: 12 }}>{plan.price} </label>
                        </div>


                        <div className='text-center'>
                          <span style={{ fontSize: 12 }}>{plan.period}</span>
                        </div>
                      </div>

                      <h5 className="mt-3" style={{ fontWeight: 700, color: "#222222", fontSize: 20 }}>
                        {plan.title}
                      </h5>

                      <label style={{ color: "#666" }}>Perfect for small PGs getting started</label>


                      <hr className="m-2" style={{ border: "1px solid #F0F0F0" }} />


                      <label style={{ color: "#4B4B4B", fontSize: 12 }}>Which includes</label>

                      <div className='show-scroll mt-2'
                        style={{
                          maxHeight: "170px",
                          overflowY: "auto",
                          paddingRight: "5px"
                        }}
                      >
                        {plan.features.map((f, i) => (
                          <div
                            key={i}
                            className="d-flex align-items-start mb-2 mt-1"
                            style={{ fontSize: "14px" }}
                          >
                            <span
                              style={{
                                color: "#1E45E1",
                                fontWeight: "bold",
                                marginRight: "8px"
                              }}
                            >
                              <FaSquareCheck style={{ color: "#1E45E1", fontSize: 15 }} />
                            </span>
                            <label style={{ color: "#1D2127", fontSize: 14, fontWeight: 400 }}>{f}</label>
                          </div>
                        ))}
                      </div>

                      <Button
                        className="mt-3 w-100"
                        style={{
                          background: "#1E45E1",
                          borderRadius: "10px",
                          padding: "8px 16px",
                          border: "none", fontSize: 14
                        }}
                      >
                        Select Plan <MdArrowRightAlt style={{ color: "#FFF", fontSize: 14 }} />
                      </Button>
                    </Card>
                  </Col>
                ))}
              </Row>

            </div>

          </div>



        )
      }









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

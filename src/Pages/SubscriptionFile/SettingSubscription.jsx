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
    if (state.UsersList?.accessRestrictionError) {
      // setFormLoading(false)
      setTimeout(() => {
        dispatch({ type: 'ACCESS_RESTRICTION_ERROR_REMOVE' })
      }, 1000)
    }

  }, [state.UsersList?.accessRestrictionError])



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
      bgcolor: "linear-gradient(to bottom, #3B63FF, #1E45E1)",
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
      bgcolor: "linear-gradient(to bottom, #FF8F00, #EF6C00)",
      color: "#FFF4E8"
    }
  ];


  return (
    <div>
      <div className="h-screen flex flex-col bg-white">
      <div className="sticky top-0 left-0 right-0 z-50 bg-white flex flex-col md:flex-row justify-between items-center px-1.5 whitespace-nowrap">

        <div className="flex flex-col justify-center w-full md:w-auto mt-1">
          <label className="block text-lg font-semibold font-gilroy text-[#222]">
            Subscription
          </label>
          <p className="text-sm font-medium font-gilroy text-[#4B4B4B]">
            Manage your subscription and billing
          </p>
        </div>
      </div>

      {!canReadSubscription ?
        (

          <div className="flex flex-col items-center justify-center mt-20">
            <img
              src={Emptystate}
              alt="Empty State"
            />
            <ErrorMessage
              message={['You do not have access to view Subscription']}
              type="warning"
            />
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


            <div className="container mt-2 p-0 mb-12 max-h-[510px] overflow-y-auto font-gilroy">

              <div className="p-4 mb-4 mr-2 rounded-[14px] bg-[#F8F9FF] border-2 border-[#1E45E1]">


                <div className="flex justify-between items-center">
                  <div className="flex flex-col items-start">

                    <div className="bg-[#1E45E1] text-white px-3 py-1 rounded-xl text-[12px] font-medium w-max text-center mb-1">
                      <TbCheck /> Free Trial
                    </div>

                    <h6 className="text-[16px] font-semibold text-[#222222]">
                      You are in Free Trial
                    </h6>
                  </div>

                  <div>
                    <span className="text-[16px] text-[#1E45E1] font-medium">
                      18 days left
                    </span>
                  </div>
                </div>

                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">

                  <div className="flex gap-2 items-start">
                    <Calendar size="16" color="#4B4B4B" />

                    <div className="flex flex-col">
                      <label className="text-[13px] font-normal text-[#4B4B4B]">
                        Start Date
                      </label>
                      <label className="text-[16px] font-normal text-[#4B4B4B]">
                        Oct 21, 2025
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-2 items-start">
                    <Calendar size="16" color="#4B4B4B" />

                    <div className="flex flex-col">
                      <label className="text-[13px] font-normal text-[#4B4B4B]">
                        End Date
                      </label>
                      <label className="text-[16px] font-normal text-[#4B4B4B]">
                        Oct 21, 2025
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-3 p-3 border-[0.5px] border-[#E0E0E0] bg-white rounded-xl text-[#4B4B4B] text-base font-normal">
                  Upgrade to continue unlimited access once your trial ends.
                </div>

                <div className="flex justify-end">
                  <button className="mt-3 bg-[#1E45E1] text-white rounded-lg px-6 py-2.5 text-sm font-normal border-none">
                    Upgrade to Premium
                  </button>
                </div>

              </div>
              <div className="p-4 mb-4 rounded-[14px] bg-[#FFFAFA] border-2 border-[#FFB5B8]">

                <div className="grid grid-cols-12 gap-3">

                  <div className="col-span-12 md:col-span-3 flex justify-center md:justify-start">
                    <img src={Expire} alt="expire" className="w-full h-auto" />
                  </div>

                  <div className="col-span-12 md:col-span-9 flex flex-col justify-center items-start">
                    <div className="text-left">
                      <span className="text-[#222222] text-xl font-semibold">
                        Your Trial Expired
                      </span>
                    </div>
                    <div className="mt-1">
                      <span className="text-[#8E8E8E] text-sm font-normal">
                        Your free trial has ended. Subscribe now to continue accessing all features.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 p-3 rounded-[12px] !border !border-[#FFC9C9] bg-white">
                  <div>
                    <span className="text-[#222222] text-sm font-semibold">Limited Access Mode</span>
                  </div>
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <div className="text-[#656565] text-sm font-medium line-through flex items-center gap-1">
                        <IoClose /> Dashboard & Property Management
                      </div>
                      <div className="text-[#656565] text-sm font-medium line-through flex items-center gap-1">
                        <IoClose /> Asset and Expenses Management
                      </div>
                      <div className="text-[#656565] text-sm font-medium line-through flex items-center gap-1">
                        <IoClose /> Complaint Management
                      </div>
                      <div className="text-[#656565] text-sm font-medium line-through flex items-center gap-1">
                        <IoClose /> EB Calculation
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-[#656565] text-sm font-medium line-through flex items-center gap-1">
                        <IoClose /> Tenant & Room Management
                      </div>
                      <div className="text-[#656565] text-sm font-medium line-through flex items-center gap-1">
                        <IoClose /> Auto Recurring Invoices
                      </div>
                      <div className="text-[#656565] text-sm font-medium line-through flex items-center gap-1">
                        <IoClose /> Due Reminders (In-App & Email)
                      </div>
                      <div className="text-[#656565] text-sm font-medium line-through flex items-center gap-1">
                        <IoClose /> Rent Collection Tracking
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {plans.map((plan, idx) => (
                  <div
                    key={idx}
                    className="relative p-3 mb-3 border-2 border-gray-200 rounded-lg"
                  >
                    <div
                      className="absolute -top-4 right-4 z-10 px-2.5 py-3 rounded-lg font-semibold text-center flex flex-col items-center shadow"
                      style={{
                        background: plan.bgcolor,
                        color: plan.color,
                      }}
                    >
                      <span className="text-xs font-bold">{plan.price}</span>
                      <span className="text-xs">{plan.period}</span>
                    </div>

                    <h5 className="mt-6 text-lg font-bold text-[#222222]">{plan.title}</h5>
                    <span className="text-gray-700 text-base block">
                      Perfect for small PGs getting started
                    </span>

                    <hr className="my-2 border border-gray-200" />
                    <span className="text-gray-700 text-xs">Which includes</span>

                    <div className="mt-2 max-h-44 overflow-y-auto show-scroll pr-1">
                      {plan.features.map((f, i) => (
                        <div key={i} className="flex items-start mb-2 mt-1 text-sm">
                          <FaSquareCheck className="text-[#1E45E1] mr-2 mt-0.5" />
                          <span className="text-[#1D2127] font-normal">{f}</span>
                        </div>
                      ))}
                    </div>

                    <button className="mt-3 w-full bg-[#1E45E1] text-white py-2 rounded-lg flex items-center justify-center gap-1">
                      Select Plan <MdArrowRightAlt className="text-white text-sm" />
                    </button>
                  </div>
                ))}
              </div>

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
    </div>



  );
}
export default withErrorBoundary(SettingSubscription);

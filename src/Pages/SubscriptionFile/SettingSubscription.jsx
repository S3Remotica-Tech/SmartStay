/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
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
  Calendar,
} from "iconsax-react";
// import { Table } from "react-bootstrap";
import "./SettingSubscription.css";
// import PaginationList from '../../Components/PaginationList';
import ErrorMessage from "../../Components/ErrorMessage";
import { useHasPermission } from "../../Utils/Permission";
import Emptystate from "../../Assets/Images/Empty-State.jpg";
import withErrorBoundary from "../../Hoc/WithErrorBountry";
// import Cookies from 'universal-cookie';
// import axios from 'axios'
import { Card, Row, Col } from "react-bootstrap";
import { TbCheck } from "react-icons/tb";
import { FaSquareCheck } from "react-icons/fa6";
import { MdArrowRightAlt } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import BasicPlan from "../SubscriptionFile/BasicPlan";
import PremiumPlan from "./PremiumPlan";
import ComingSoon from "../../Utils/ComingSoon";
import { Connect } from "../../WebService/SocketConfig";
import AllPlans from "./AllPlans";

function SettingSubscription() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [plan, setPlan] = useState(false);
  const [changePlan, setChangePlan] = useState(false);
  const [planCode, setPlanCode] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [hostelCount, setHostelCount] = useState("0");
  const [selectedPlanError, setSelectedPlanError] = useState("");
  const [hostelCountError, setHostelCountError] = useState("");
  const [hostelError, setHostelError] = useState("");
  const [getPlanActive, setGetPlanActive] = useState([]);
  const [selectedHostels, setSelectedHostels] = useState([]);
  const modalRef = useRef();
  const [formLoading, setFormLoading] = useState(false);

  const {
    canWriteModule: canWriteSubscription,
    canReadModule: canReadSubscription,
    // canUpdateModule: canUpdateSubscription,
    // canDeleteModule: canDeleteSubscription,
  } = useHasPermission("Subscription");

  useEffect(() => {
    if (state.UsersList?.accessRestrictionError) {
      setFormLoading(false);
      setTimeout(() => {
        dispatch({ type: "ACCESS_RESTRICTION_ERROR_REMOVE" });
      }, 1000);
    }
  }, [state.UsersList?.accessRestrictionError]);

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      dispatch({ type: "NEWPLANLIST" });
      dispatch({
        type: "CURRENT_PLAN_SAGA",
        payload: state.login.selectedHostel_Id,
      });
      setFormLoading(true);
    }
  }, [state.login.selectedHostel_Id]);

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

  useEffect(() => {
    if (
      state.Settings.statusCodeForPlanList === 200 ||
      state.Settings.statusCodeForCurrentPlanSubcripition === 200
    ) {
      setFormLoading(false);
      dispatch({ type: "CLEAR_CURRENT_PLAN_REDUCER" });
      dispatch({ type: "REMOVE_NEW_PLAN_LIST" });
    }
  }, [
    state.Settings.statusCodeForPlanList,
    state.Settings.statusCodeForCurrentPlanSubcripition,
  ]);

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

  // const handlePlanChange = (price) => {
  //   setSelectedPlan(price);
  //   setPlan(true);
  //   setAmount(hostelCount * price);
  //   handleCloseCurrentPlan();

  //   if (price === 1) {
  //     setPlanCode("basic_smart");
  //   } else if (price === 2) {
  //     setPlanCode("advance_prod");
  //   } else if (price === 999) {
  //     setPlanCode("smartstay_oneyear");
  //   }
  // };

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

  const handleCloseCurrentPlan = () => {
    setChangePlan(false);
    setHostelCountError("");
  };

  const currentPlan = state?.Settings?.currentPlanDetails;

  // const onMessageReceived = (message) => {
  //   if (message.body === "success") {
  //     window.location.reload();
  //     setIsPaymentOpened(false);
  //   }
  // };

  // useEffect(() => {
  //   if (state.Settings?.statusCodeUpgradePlan === 200) {
  //     setFormLoading(false);
  //     const reDirectURL = state.Settings.upgradePlan?.paymentLink;
  //     if (reDirectURL) {
  //       Connect(onMessageReceived, state.Settings.upgradePlan?.paymentLinkId);
  //       window.open(reDirectURL, "_blank");
  //       setTimeout(() => {
  //         dispatch({ type: "CLEAR_UPGRADE_PLAN_REDUCER" });
  //       }, 100);
  //     }
  //   }
  // }, [state.Settings?.statusCodeUpgradePlan]);

  useEffect(() => {
    if (state.createAccount?.networkError || state.Settings?.upgradePlanError) {
      setFormLoading(false);

      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 3000);
    }
  }, [state.createAccount?.networkError, state.Settings?.upgradePlanError]);
  return (
    <div>
      <div className="h-screen flex flex-col bg-white relative">
        {formLoading && (
          <div className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-transparent opacity-75">
            <div className="h-10 w-10 animate-spin rounded-full border-t-4 border-r-4 border-r-transparent border-t-blue-700"></div>
          </div>
        )}
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

        {!canReadSubscription ? (
          <div className="flex flex-col items-center justify-center mt-20">
            <img src={Emptystate} alt="Empty State" />
            <ErrorMessage
              message={["You do not have access to view Subscription"]}
              type="warning"
            />
          </div>
        ) : (
          <div>
            <div className="container mt-2 p-0 mb-1 h-[510px] lg:h-[510px] xl:h-[510px] 2xl:h-[780px] show-scrolls overflow-y-auto font-gilroy overflow-visible">
              {currentPlan?.isTrial ? (
                currentPlan?.numberOfDaysRemaining > 0 ? (
                  <div className="p-4 mb-4 mr-2 rounded-[14px] bg-[#F8F9FF] border-2 border-[#1E45E1]">
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col items-start">
                        <div className="bg-[#1E45E1] text-white px-3 py-1 rounded-xl text-[12px] font-medium w-max text-center mb-1 flex items-center gap-2">
                          <TbCheck /> Free Trial
                        </div>

                        <h6 className="text-[16px] font-semibold text-[#222222]">
                          You are in Free Trial
                        </h6>
                      </div>

                      <div>
                        <span className="text-[16px] text-[#1E45E1] font-medium">
                          {currentPlan?.numberOfDaysRemaining}{" "}
                          {currentPlan?.numberOfDaysRemaining === 1
                            ? "day"
                            : "days"}{" "}
                          left
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
                            {currentPlan?.planStartDate}
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
                            {currentPlan?.planEndDate}
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 p-3 border-[0.5px] border-[#E0E0E0] bg-white rounded-xl text-[#4B4B4B] text-base font-normal">
                      Upgrade to continue unlimited access once your trial ends.
                    </div>

                    <div className="flex justify-end">
                      <button
                        disabled
                        className="mt-3 px-6 py-2.5 text-sm rounded-lg font-normal border-none
          bg-[#1E45E1] 
          disabled:bg-gray-200 disabled:text-gray-700 disabled:cursor-not-allowed"
                      >
                        Upgrade to Premium
                      </button>
                    </div>
                  </div>
                ) : currentPlan?.numberOfDaysRemaining <= 0 ? (
                  <div className="p-4 mb-4 rounded-[14px] bg-[#FFFAFA] border-2 border-[#FFB5B8]">
                    <div className="grid grid-cols-12 gap-3">
                      <div className="col-span-12 md:col-span-3 flex justify-center md:justify-start">
                        <img
                          src={Expire}
                          alt="expire"
                          className="w-full h-auto"
                        />
                      </div>

                      <div className="col-span-12 md:col-span-9 flex flex-col justify-center items-start">
                        <div className="text-left">
                          <span className="text-[#222222] text-xl font-semibold">
                            Your Trial Expired
                          </span>
                        </div>

                        <div className="mt-1">
                          <span className="text-[#8E8E8E] text-sm font-normal">
                            Your free trial has ended. Subscribe now to continue
                            accessing all features.
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 p-3 rounded-[12px] !border !border-[#FFC9C9] bg-white">
                      <div>
                        <span className="text-[#222222] text-sm font-semibold">
                          Limited Access Mode
                        </span>
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
                ) : null
              ) : (
                <BasicPlan />
              )}

              {currentPlan?.isTrial && <AllPlans />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default withErrorBoundary(SettingSubscription);

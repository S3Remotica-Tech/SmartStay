/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSquareCheck } from "react-icons/fa6";
// import { useParams } from "react-router-dom";
import { Connect } from "../../WebService/SocketConfig";
import { MdArrowRightAlt } from "react-icons/md";

function AllPlans() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  // const { hostelId } = useParams();

  const [formLoading, setFormLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  // if (message.body === "failed")
  const onMessageReceived = (message) => {
    console.log("Payment update:", message);
    if (message.body === "success") {
      setPaymentLoading(false);
      window.location.reload();
    } else {
      setPaymentLoading(false);
    }
  };

  useEffect(() => {
    if (state.Settings?.statusCodeUpgradePlan === 200) {
      setFormLoading(false);
      setPaymentLoading(true);
      const reDirectURL = state.Settings.upgradePlan?.paymentLink;
      if (reDirectURL) {
        Connect(onMessageReceived, state.Settings.upgradePlan?.paymentLinkId);
        window.open(reDirectURL, "_blank");
        setTimeout(() => {
          dispatch({ type: "CLEAR_UPGRADE_PLAN_REDUCER" });
        }, 100);
      }
    }
  }, [state.Settings?.statusCodeUpgradePlan]);

  const plans = state?.Settings?.planList?.map((item) => ({
    planCode: item.planCode,
    title: `${item.planName} Plan`,
    finalPrice: `₹${item.finalPrice}`,
    period: item.frequency,
    features: [...new Set(item.features)],
    bgcolor:
      item.planName === "Basic"
        ? "linear-gradient(to bottom, #6FA1FF, #4C5CFB)"
        : "linear-gradient(to bottom, #FFA726, #FB8C00)",
    color: item.planName === "Basic" ? "#fff" : "#FFF4E8",
  }));

  const handleUpgradePlan = (plan) => {
    dispatch({ type: "CLEAR_NETWORK_ERROR" });
    if (plan) {
      dispatch({
        type: "UPGRADE_PLAN_SAGA",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          planCode: plan?.planCode,
          // discountAmount: ,
          // discountPercentage: ,
        },
      });
      setFormLoading(true);
    }
  };

  // console.log("plans", plans);

  useEffect(() => {
    if (state.createAccount?.networkError || state.Settings?.upgradePlanError) {
      setFormLoading(false);

      dispatch({ type: "CLEAR_NETWORK_ERROR" });
    }
  }, [state.createAccount?.networkError, state.Settings?.upgradePlanError]);

  return (
    <div className="relative ">
      {formLoading && (
        <div className="absolute inset-0 z-[9999] flex items-center justify-center bg-white/60">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-700"></div>
        </div>
      )}
      <h3 className="text-[#222222] font-semibold text-[17px] font-gilroy my-2">
        Choose Your Plan
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-1  font-gilroy max-h-[700px] overflow-y-auto show-scrolls ">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className="relative p-3 mb-3 border-2 border-gray-200 rounded-lg z-10 mt-4"
          >
            <div
              className="absolute -top-4 right-4 z-[9999] px-2.5 py-3 rounded-lg font-semibold text-center flex flex-col items-center shadow"
              style={{
                backgroundImage: plan.bgcolor,
                backgroundSize: "100% 100%",
                color: plan.color,
                minHeight: "60px",
              }}
            >
              <span className="text-xs font-bold truncate">
                {plan.finalPrice}
              </span>
              <span className="text-xs">{plan.period}</span>
            </div>

            <h5 className="mt-6 text-lg font-bold text-[#222222]">
              {plan.title}
            </h5>
            <span className="text-gray-700 text-base block">
              Perfect for small PGs getting started
            </span>

            <hr className="my-2 border border-gray-200" />
            <span className="text-gray-700 text-xs">Which includes</span>

            <div className="mt-2 max-h-44 overflow-y-auto show-scrolls pr-1">
              {plan.features.map((f, i) => (
                <div key={i} className="flex items-start mb-2 mt-1 text-sm">
                  <FaSquareCheck className="text-[#1E45E1] mr-2 mt-0.5" />
                  <span className="text-[#1D2127] font-normal">{f}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => handleUpgradePlan(plan)}
              className="mt-3 w-full bg-[#1E45E1] text-white py-2 rounded-lg flex items-center justify-center gap-1"
            >
              Select Plan <MdArrowRightAlt className="text-white text-sm" />
            </button>
          </div>
        ))}
      </div>
      {paymentLoading && (
        <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center font-gilroy">
          <div className="bg-white rounded-2xl shadow-2xl px-8 py-8 w-[360px] text-center">
            <div className="mx-auto w-14 h-14 border-[5px] border-gray-200 border-t-[#1E45E1] rounded-full animate-spin"></div>

            <h2 className="mt-6 text-xl font-semibold text-gray-800">
              Processing Payment...
            </h2>

            <p className="mt-3 text-sm text-gray-500 leading-6">
              Please wait while we confirm your payment.
              <br />
              <span className="font-medium text-[#1E45E1]">
                Do not close or refresh this page.
              </span>
            </p>

            <div className="flex justify-center gap-1 mt-6">
              <span className="w-2 h-2 rounded-full bg-[#1E45E1] animate-bounce"></span>
              <span
                className="w-2 h-2 rounded-full bg-[#1E45E1] animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></span>
              <span
                className="w-2 h-2 rounded-full bg-[#1E45E1] animate-bounce"
                style={{ animationDelay: "0.4s" }}
              ></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllPlans;

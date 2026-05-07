import React from "react";
import { Card, Button, Row, Col, Table } from "react-bootstrap";
import PaginationList from "../../Components/PaginationList";
import { Calendar, Crown } from "iconsax-react";
import { TbCheck } from "react-icons/tb";
import { MdPayment } from "react-icons/md";
import { PiLightning } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { TiTick } from "react-icons/ti";

function SubscriptionCard() {
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const currentPlan = state?.Settings?.currentPlanDetails;

  const handleNavigatePlan = (tabName) => {
    const hostelId = state.login?.selectedHostel_Id;
    if (hostelId) {
      navigate(`/settings/${hostelId}/${tabName}`);
    } else {
      navigate(`/settings/${tabName}`);
    }
  };

  return (
    <div className="mt-4 mb-12 max-h-[500px] overflow-y-auto font-gilroy show-scrolls">
      <div className="p-4 mb-4 mr-2 rounded-[14px] bg-[#F8F9FF] border-2 border-[#1E45E1]">
        <div className="flex justify-between">
          <div className="flex gap-3 mb-3">
            <div>
              <p className="font-semibold text-[#222] text-[16px]">
                Basic Plan
              </p>
              <p className="font-medium text-[#4A4A4A] text-[14px]">
                {currentPlan?.planAmount}
              </p>
            </div>

            <div className="bg-[#00A32E] text-white px-3 py-1 rounded-xl text-[12px] font-medium flex items-center gap-2 h-fit">
              <TbCheck /> {currentPlan?.status}
            </div>
          </div>

          <button
            className="bg-[#1E45E1] text-white px-6 py-2 rounded-[10px] text-sm h-fit"
            onClick={() => handleNavigatePlan("allplans")}
          >
            Change Plan
          </button>
        </div>

        <div className="grid grid-cols-3 mt-2 gap-4">
          <div className="flex gap-2 items-start">
            <Calendar size={16} className="text-[#4B4B4B]" />
            <div>
              <p className="text-[13px] text-[#4B4B4B] mb-1">Renewal Date</p>
              <p className="text-[16px] text-[#4B4B4B]">
                {currentPlan?.renewalDate}
              </p>
            </div>
          </div>

          <div className="flex gap-2 items-start">
            <MdPayment size={16} className="text-[#4B4B4B]" />
            <div>
              <p className="text-[13px] text-[#4B4B4B] mb-1">Payment Method</p>
              <p className="text-[16px] text-[#4B4B4B]">
                {currentPlan?.paymentMethod}
              </p>
            </div>
          </div>

          <div className="flex gap-2 items-start">
            <PiLightning size={16} className="text-[#4B4B4B]" />
            <div>
              <p className="text-[13px] text-[#4B4B4B] mb-1">Status</p>
              <p className="text-[16px] text-[#1E45E1]">
                {currentPlan?.status}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/*  UPGRADE PREMIUM  */}
      {/* <div className="p-3 mb-4 mr-2 rounded-[14px] bg-[#F8F9FF] border-2 border-[#1E45E1]">
        <div className="flex justify-between items-center mb-2">
          <div>
            <p className="font-semibold text-[#222] text-[16px]">
              Upgrade to Premium Plan
            </p>
            <p className="text-[14px] text-[#4A4A4A]">
              Get WhatsApp Integration, Digital KYC, Legal E-Sign & more
            </p>
          </div>

          <div className="bg-[#00A32E] text-white px-3 py-1 rounded-xl text-[12px] font-medium">
            Recommended
          </div>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-[#1E45E1] text-[20px] font-medium">
            ₹999 <span className="text-[#4B4B4B] text-[14px]">/month</span>
          </p>

          <button className="bg-[#1E45E1] text-white px-6 py-2 rounded-[10px] text-sm">
            Upgrade Now
          </button>
        </div>
      </div> */}

      <h5 className="mt-4 mb-1 text-[#222] font-semibold text-[16px]">
        Billing History
      </h5>

      <div className="mt-4">
        <div className="max-h-[200px] overflow-y-auto  border-[#E8E8E8] show-scrolls">
          <table className="w-full text-sm text-[#222]">
            <thead className="bg-gray-50 sticky top-0 z-40 text-[#6B7280] text-xs">
              <tr className="h-8">
                <th className="px-5 py-2 text-left whitespace-nowrap">
                  INVOICE
                </th>
                <th className="py-2 text-left whitespace-nowrap">
                  BILLING DATE
                </th>
                <th className="py-2 text-left whitespace-nowrap">PLAN</th>
                <th className="py-2 text-left whitespace-nowrap">AMOUNT</th>
                <th className="py-2 text-left">STATUS</th>
                <th className="py-2 text-left">ACTION</th>
              </tr>
            </thead>

            <tbody className="text-[12px] align-middle">
              {currentPlan?.billingHistory?.length > 0 ? (
                currentPlan.billingHistory.map((item) => (
                  <tr key={item.historyId} className="border-b">
                    <td className="px-5 py-2 whitespace-nowrap">
                      {item.subscriptionNumber || "-"}
                    </td>

                    <td className="py-2 whitespace-nowrap">{item.createdAt}</td>

                    <td className="py-2">
                      <div className="flex items-center gap-1">
                        <Crown color="#FF9900" size="14" />
                        <span>{item.planName}</span>
                      </div>
                    </td>

                    <td className="py-2 whitespace-nowrap">
                      ₹{item.totalAmount}
                    </td>

                    <td className="py-2">
                      <div className="flex items-center gap-2">
                        {item.orderStatus === "PAID" ? (
                          <>
                            <span className="text-black text-[11px] font-medium rounded-xl bg-green-50 flex items-center gap-1 px-2 py-1">
                              <TiTick className="text-green-600 text-[14px] font-medium" />{" "}
                              PAID
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="text-black text-[11px] font-medium rounded-xl bg-yellow-50 flex items-center gap-1 px-2 py-1">
                              <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                              CREATED
                            </span>
                          </>
                        )}
                      </div>
                    </td>

                    <td className="py-2 text-center">
                      <PiDotsThreeOutlineVerticalFill className="h-5 w-5 rotate-90 cursor-pointer mx-auto" />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-6 text-base text-gray-400"
                  >
                    No billing history found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionCard;

import React from "react";
import { Card, Button, Row, Col, Table } from "react-bootstrap";
import PaginationList from "../../Components/PaginationList";
import { Calendar } from "iconsax-react";
import { TbCheck } from "react-icons/tb";
import { MdPayment } from "react-icons/md";
import { PiLightning } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PremiumPlan() {
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
    <div className="mt-4 max-h-[500px] overflow-y-auto mb-12 font-gilroy show-scrolls">
      <div className="p-4 mb-4 mr-2 rounded-[14px] bg-[#F8F9FF] border-2 border-[#1E45E1]">
        <div className="flex justify-between">
          <div className="flex gap-3 mb-3">
            <div>
              <p className="font-semibold text-[#222222] text-[16px]">
                {currentPlan?.planName}
              </p>
              <p className="font-medium text-[#4A4A4A] text-[14px]">
                ₹999/month
              </p>
            </div>

            <div className="bg-[#00A32E] text-white px-3 py-1 rounded-xl text-[12px] font-medium flex items-center gap-2 h-fit">
              <TbCheck /> Active
            </div>
          </div>

          <button
            onClick={() => handleNavigatePlan("allplans")}
            className="bg-[#1E45E1] text-white text-sm font-normal px-6 py-2.5 rounded-[10px] hover:bg-[#1639c0] h-fit"
          >
            Change Plan
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          <div className="flex gap-2 items-start">
            <Calendar size="16" color="#4B4B4B" />
            <div>
              <p className="text-[13px] text-[#4B4B4B] mb-1">Renewal Date</p>
              <p className="text-[16px] text-[#4B4B4B] mb-1">Oct 21, 2025</p>
            </div>
          </div>

          <div className="flex gap-2 items-start">
            <MdPayment size="16" color="#4B4B4B" />
            <div>
              <p className="text-[13px] text-[#4B4B4B] mb-1">Payment Method</p>
              <p className="text-[16px] text-[#4B4B4B] mb-1">UPI Auto Debit</p>
            </div>
          </div>

          <div className="flex gap-2 items-start">
            <PiLightning size="16" color="#4B4B4B" />
            <div>
              <p className="text-[13px] text-[#4B4B4B] mb-1">Status</p>
              <p className="text-[16px] text-[#1E45E1] mb-1">Active</p>
            </div>
          </div>
        </div>
      </div>

      <h5 className="mt-4 mb-1 text-[#222222] font-semibold text-[16px]">
        Billing History
      </h5>

      <div className="mt-2">
        <div className="mr-2 pb-5">
          <div className="max-h-[200px] overflow-y-auto border-t border-[#E8E8E8] mb-5 show-scrolls">
            <table className="w-full text-sm font-gilroy text-[#222222]">
              <thead className="bg-[#E7F1FF] text-[12px] text-[#939393] sticky top-0 z-10">
                <tr className="h-[30px]">
                  <th className="text-left px-5 py-2 whitespace-nowrap">
                    INVOICE
                  </th>
                  <th className="text-left px-4 py-2 whitespace-nowrap">
                    BILLING DATE
                  </th>
                  <th className="text-left px-4 py-2 whitespace-nowrap">
                    PLAN
                  </th>
                  <th className="text-left px-4 py-2 whitespace-nowrap">
                    AMOUNT
                  </th>
                  <th className="text-left px-4 py-2">STATUS</th>
                  <th className="text-left px-4 py-2">ACTION</th>
                </tr>
              </thead>

              <tbody className="text-[11px] align-middle h-[50px]">
                <PaginationList display={true}></PaginationList>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PremiumPlan;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import {
  CloseCircle,
  Add,
  Flash,
  Call,
  Location,
  Warning2,
  AddCircle,
} from "iconsax-react";
import { useDispatch, useSelector } from "react-redux";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import VendorExpenseHistory from "./VendorExpenseHistory";
import VendorComments from "./VendorComments";
import VendorPaymentHistory from "./VendorPaymentHistory";

function VendorOverView({ show, onClose }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("payments");

  return (
    <div className="font-gilroy">
      <div
        className={`fixed  inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          show ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-2 right-2 h-screen w-[1200px] bg-white z-50 shadow-xl rounded-md transition-transform duration-300 ease-in-out ${
          show ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="px-6 py-2">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-[24px] font-semibold text-[#222]">
                  Vinayaka Electricals
                </h2>

                <span className="px-2 py-1 rounded text-[10px] bg-[#E8F0FF] text-[#338BFF] font-medium">
                  VEN 001
                </span>

                <span className="px-2 py-1 rounded text-[10px] bg-[#038C3D] text-[#FFFFFF] font-medium">
                  Active
                </span>
              </div>

              <div className="flex items-center gap-6 mt-3 text-[13px]">
                <span className="flex items-center gap-1 text-[#4B4B4B]">
                  <Flash size="16" /> Electrical
                </span>
                <span className="flex items-center gap-1 text-[#222222]">
                  <Call size="16" /> +91 9876543210
                </span>
                <span className="flex items-center gap-1 text-[#222222]">
                  <Location size="16" /> Fairlands, Salem
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <PiDotsThreeOutlineVerticalFill
                size={18}
                className="cursor-pointer"
              />

              <button
                onClick={onClose}
                className="h-8 w-8 rounded bg-[#FFF3F3] flex items-center justify-center"
              >
                <Add
                  size="24"
                  color="#FF0000"
                  className="cursor-pointer rotate-45"
                />{" "}
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 overflow-y-auto h-[calc(100vh-80px)]">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#F9F9F9] border border-[#F9F9F9] rounded-xl p-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-[12px] text-[#888] mb-1">Total Expenses</p>
                  <p className="mt-1 font-semibold mb-1">₹ 85,000</p>
                </div>

                <div>
                  <p className="text-[12px] text-[#888] mb-1 ">Total Paid</p>
                  <p className="mt-1 font-semibold mb-1">₹ 80,500</p>
                </div>

                <div>
                  <p className="text-[12px] text-[#888] mb-1">Outstanding</p>
                  <p className="mt-1 font-semibold text-[#F97316] mb-1">
                    ₹ 4,500
                  </p>
                </div>
              </div>

              <p className="mt-2 text-[12px] text-[#1E45E1] mb-1 flex gap-1 items-center">
                <Warning2 size="12" /> Based upon current month
              </p>
            </div>

            <div className="flex justify-end gap-10 items-center">
              <div>
                <p className="text-[12px] text-[#888]">Credit limit</p>

                <p className="font-semibold mt-1">₹ 15,000 / month</p>
              </div>

              <div>
                <p className="text-[12px] text-[#888]">Due date</p>

                <p className="font-semibold mt-1">10th of month</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-8 border-b  ">
            <div className="flex gap-8">
              <button
                onClick={() => setActiveTab("payments")}
                className={`pb-3 font-medium ${
                  activeTab === "payments"
                    ? "border-b-2 border-[#1E45E1] text-[#222]"
                    : "text-[#666]"
                }`}
              >
                Payments Made
              </button>

              <button
                onClick={() => setActiveTab("expenses")}
                className={`pb-3 font-medium ${
                  activeTab === "expenses"
                    ? "border-b-2 border-[#1E45E1] text-[#222]"
                    : "text-[#666]"
                }`}
              >
                Expenses
              </button>

              <button
                onClick={() => setActiveTab("comments")}
                className={`pb-3 font-medium ${
                  activeTab === "comments"
                    ? "border-b-2 border-[#1E45E1] text-[#222]"
                    : "text-[#666]"
                }`}
              >
                Comments
              </button>
            </div>
            {activeTab === "payments" && (
              <button
                onClick={() => {
                  console.log("Record Payment Clicked");
                }}
                className="bg-[#1E45E1] text-white px-4 py-2 rounded-lg text-sm"
              >
                + Record Payment
              </button>
            )}

            {activeTab === "expenses" && (
              <button
                onClick={() => {}}
                className="bg-[#1E45E1] text-white px-4 py-2 rounded-lg text-sm flex items-center gap-1"
              >
                <AddCircle size="14" /> Add Expense
              </button>
            )}
          </div>

          {activeTab === "payments" && <VendorPaymentHistory />}

          {activeTab === "expenses" && <VendorExpenseHistory />}

          {activeTab === "comments" && <VendorComments />}
        </div>
      </div>
    </div>
  );
}

export default VendorOverView;

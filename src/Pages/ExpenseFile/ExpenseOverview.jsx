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
  ExportSquare,
} from "iconsax-react";
import { useDispatch, useSelector } from "react-redux";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import ExpensePaymentHistory from "./ExpensePaymentHistory";
import ExpenseItems from "./ExpenseItems";

function ExpenseOverview({ show, onClose }) {
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
            <div className="mt-3">
              <div className="flex items-center gap-2">
                <h2 className="text-[24px] font-semibold text-[#222] flex items-center gap-2">
                  <span>EXP 001</span>

                  <span className="w-0.5 h-[28px] bg-[#D9D9D9] rounded"></span>

                  <span>Vegetables 50 KG</span>
                </h2>
              </div>

              <div className="flex items-center gap-6 mt-3 text-[13px]">
                <span className="flex items-center gap-1 text-[#4B4B4B]">
                  Daily Operations
                </span>
                <span className="flex items-center gap-1 text-[#222222] font-semibold">
                  <Location size="16" color="#1E45E1" /> Kural kaikani Angadi-
                  Salem
                </span>
                <span className="flex items-center gap-1 text-[#222222]">
                  <ExportSquare size="14" color="#1E45E1" />
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4">
              <div className="mt-4">
                <div className="text-[#4A5565] text-xs font-medium">
                  Expense Amount
                </div>
                <div className="flex items-center gap-4">
                  <div>
                    {" "}
                    <span className="px-2 py-1 rounded text-[10px] bg-[#FFEDCA99] text-[#FF9900] font-medium">
                      <span className="h-2 w-2 bg-[#FF9900] rounded-full"></span>{" "}
                      Paritally Paid
                    </span>
                  </div>
                  <div>₹00.00</div>
                </div>
              </div>
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
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-[#F9F9F9] border-1 border-[#F9F9F9] rounded-md py-2 px-4">
              <div className="">
                <div>
                  <p className="text-[12px] text-[#1A1D1F] mb-1">
                    Description/Notes
                  </p>
                  <p className="mt-1 font-semibold text-[#222222] text-md mb-1">
                    Vegetables purchased from Kural kaikani Angadi
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-8 border-b  ">
            <div className="flex gap-8">
              <button
                onClick={() => setActiveTab("payments")}
                className={`pb-3 font-semibold ${
                  activeTab === "payments"
                    ? "border-b-2 border-[#1E45E1] text-[#222]"
                    : "text-[#666]"
                }`}
              >
                Payments
              </button>

              <button
                onClick={() => setActiveTab("expenses")}
                className={`pb-3 font-semibold ${
                  activeTab === "expenses"
                    ? "border-b-2 border-[#1E45E1] text-[#222]"
                    : "text-[#666]"
                }`}
              >
                Expense Items
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
          </div>

          {activeTab === "payments" && <ExpensePaymentHistory />}

          {activeTab === "expenses" && <ExpenseItems />}
        </div>
      </div>
    </div>
  );
}

export default ExpenseOverview;

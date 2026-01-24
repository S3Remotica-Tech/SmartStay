/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import "react-circular-progressbar/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";

import {

  ArrowUp2,
  ArrowDown2,
  ArrowUp,
  DocumentText,
  Calendar,
   ExportSquare,

} from "iconsax-react";


function DashQuickAccess() {


     const state = useSelector((state) => state);
      const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const [selected, setSelected] = useState("This Month");
    const [open, setOpen] = useState(false)
  const [activeTabDashboard, setActiveTabDashboard] = useState("checkin");

 const billingSummary = {
    title: "Billing Summary",
    invoices: 36,
    totalAmount: "₹ 3,24,000",
    collected: "₹ 54,000",
    outstanding: "₹ 2,70,000",
    collectionRate: 24,
    trend: "3% from last month",
  };

 const dateOptions = [
    "Today",
    "This Week",
    "This Month",
    "Last Month",
    "Last 3 Months",
  ];



 const tabs = [
    { id: "checkin", label: "New Check-ins", count: 3 },
    { id: "overdue", label: "Overdue Invoices", count: 7 },
  ];

  const checkinList = [
    {
      id: 1,
      name: "Mathubala",
      sharing: "1-Sharing",
      room: "Room B",
      bed: "101",
      date: "Check-in: Jan 18, 2026",
    },
    {
      id: 2,
      name: "Jasvika",
      sharing: "1-Sharing",
      room: "Room B",
      bed: "101",
      date: "Check-in: Jan 20, 2026",
    },
    {
      id: 3,
      name: "Baby",
      sharing: "1-Sharing",
      room: "Room B",
      bed: "101",
      date: "Check-in: Jan 20, 2026",
    },
  ];





  return (
     <div className="mt-6 font-[Gilroy]">
                    <h2 className="text-lg font-semibold text-[#101828] mb-4 font-[Gilroy]">
                      Quick Access & Follow-ups
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">


                      <div className="bg-white rounded-xl border border-[#E5E7EB] lg:col-span-5 p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
                              <DocumentText size="18" color="#F97316" variant="Bulk" />
                            </div>
                            <h3 className="font-semibold text-base text-[#101828] my-0 ">
                              {billingSummary.title}
                            </h3>
                          </div>

                          <div className="relative" ref={dropdownRef}>

                            <button
                              onClick={() => setOpen(!open)}
                              className="flex items-center gap-2 text-xs border rounded-md px-3 py-2 bg-white font-[Gilroy] whitespace-nowrap "
                            >
                              <Calendar size="16" />
                              {selected}

                              {open ? (
                                <ArrowUp2 size="16" color="#1E45E1" />
                              ) : (
                                <ArrowDown2 size="16" color="#1E45E1" />
                              )}
                            </button>


                            {open && (
                              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">
                                {dateOptions.map((option) => (
                                  <button
                                    key={option}
                                    onClick={() => {
                                      setSelected(option);
                                      setOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-2 text-xs font-[Gilroy] hover:bg-gray-100 ${selected === option ? "text-blue-600 font-medium " : "text-gray-600"
                                      }`}
                                  >
                                    {option}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex justify-between ">
                          <span className="text-[#4A5565 font-medium text-xs">Invoices Generated</span>
                          <span className="font-semibold text-[#222222] ">{billingSummary.invoices}</span>
                        </div>

                        <div className="flex justify-between text-sm">
                          <span className="text-[#4A5565 font-medium text-xs">Total Amount</span>
                          <span className="font-semibold text-green-600 text-base">
                            ₹ {billingSummary.totalAmount}
                          </span>
                        </div>
                        <hr className="border border-[#F3F4F5] mx-0" />
                        <div className="flex justify-between text-sm">
                          <span className="text-[#4A5565 font-medium text-xs">Collected</span>
                          <span className="font-semibold text-green-600 text-base">
                            ₹{billingSummary.collected}
                          </span>
                        </div>



                        <div className="flex justify-between text-sm">
                          <span className="flex items-center gap-1 text-[#4A5565 font-medium text-xs">
                            Outstanding  <ExportSquare
                              size="14"
                              color="#1E45E1"
                            />
                          </span>
                          <span className="font-semibold text-green-600 text-base ">
                            ₹  {billingSummary.outstanding}
                          </span>
                        </div>
                        <hr className="border border-[#F3F4F5] mx-0" />
                        <div className="">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-[#4A5565 font-medium text-xs"> Collection Rate</span>
                            <span className="font-semibold">
                              {billingSummary.collectionRate}%
                            </span>
                          </div>
                          <div className="h-2 rounded-full bg-gray-100">
                            <div
                              className="h-full bg-[#F54900] rounded-full transition-all"
                              style={{ width: `${billingSummary.collectionRate}%` }}
                            />

                          </div>
                          <p className="text-xs text-gray-500 mt-1 flex ">
                            <ArrowUp
                              size="16"
                              color="#6A7282"
                            /> {billingSummary.trend}
                          </p>
                        </div>
                      </div>


                      <div className="bg-white rounded-xl border border-[#E5E7EB]  p-4 lg:col-span-7">


                        <div className="flex border-b border-[#F3F3F3] justify-around mb-3 w-full">
                          {tabs.map((tab) => (
                            <button
                              key={tab.id}
                              onClick={() => setActiveTabDashboard(tab.id)}
                              className={`px-4 py-2 text-sm font-medium ${activeTabDashboard === tab.id
                                ? "border-b-2 border-[#1E45E1] text-[#1E45E1]"
                                : "text-gray-500"
                                }`}
                            >
                              {tab.label} ({tab.count})
                            </button>
                          ))}
                        </div>

                        {/* List */}
                        <div className="space-y-3 max-h-[280px] overflow-y-auto show-scrolls">
                          {checkinList.map((item) => (
                            <div
                              key={item.id}
                              className="flex justify-between items-center border-b pb-3"
                            >
                              <div >
                                <p className="font-semibold text-base">{item.name}</p>
                                <div className="flex gap-2">
                                  <p className="text-xs text-[#4A5565] text-xs">{item.sharing}</p>
                                  <p className="text-xs text-[#4A5565] text-xs">{item.room}</p>
                                  <p className="text-xs text-[#4A5565] text-xs">{item.bed}</p>
                                  <p className="text-xs text-[#4A5565] text-xs">{item.date}</p>
                                </div>
                              </div>

                              <div className="flex gap-2">
                                <button className="border rounded-md px-3 py-1 text-sm">
                                  View
                                </button>
                                <button className="bg-[#1E45E1] text-white rounded-md px-3 py-1 text-sm">
                                  Check-in
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
  )
}

export default DashQuickAccess
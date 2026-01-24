/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { Calendar } from "iconsax-react";



function DashCoreAnalytics() {

const occupancyData = [
  { label: "Jan 1", occupied: 96, vacant: 22 },
  { label: "Jan 5", occupied: 98, vacant: 20 },
  { label: "Jan 10", occupied: 100, vacant: 18 },
  { label: "Jan 15", occupied: 99, vacant: 19 },
  { label: "Jan 20", occupied: 101, vacant: 17 },
  { label: "Jan 25", occupied: 100, vacant: 18 },
  { label: "Today", occupied: 101, vacant: 19 },
];


const revenueData = [
  { month: "Aug", collected: 12.5, outstanding: 1.2 },
  { month: "Sep", collected: 13.2, outstanding: 0.8 },
  { month: "Oct", collected: 14.1, outstanding: 1.5 },
  { month: "Nov", collected: 13.8, outstanding: 1.1 },
  { month: "Dec", collected: 15.6, outstanding: 0.9 },
  { month: "Jan", collected: 3.1, outstanding: 12.8 },
];








  return (
   <div className="space-y-4">
  <h2 className="text-[18px] font-semibold text-[#0F172A] font-[Gilroy]">
    Core Analytics
  </h2>

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <div className="rounded-xl border border-[#E5E7EB] bg-white p-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-[#0F172A] font-[Gilroy]">
          Occupancy Trend
        </h3>

        <button className="flex items-center gap-2 border px-3 py-1.5 rounded-lg text-sm font-[Gilroy]">
          <Calendar size="16" />
          This Month
        </button>
      </div>

      {/* Chart */}
      <div className="flex items-end h-40 gap-3 mb-4">
        {occupancyData.map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-1">
            <div
              className="w-2 rounded-full bg-[#10B981]"
              style={{ height: `${item.occupied}px` }}
            />
            <div
              className="w-2 rounded-full bg-[#F97316]"
              style={{ height: `${item.vacant}px` }}
            />
          </div>
        ))}
      </div>

      {/* Footer stats */}
      <div className="grid grid-cols-2 border-t pt-4 text-center">
        <div>
          <p className="text-sm text-[#64748B] font-[Gilroy]">Avg Occupied</p>
          <p className="text-xl font-semibold text-[#16A34A] font-[Gilroy]">
            101
          </p>
        </div>
        <div>
          <p className="text-sm text-[#64748B] font-[Gilroy]">Avg Vacant</p>
          <p className="text-xl font-semibold text-[#F97316] font-[Gilroy]">
            19
          </p>
        </div>
      </div>
    </div>

    <div className="rounded-xl border border-[#E5E7EB] bg-white p-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-[#0F172A] font-[Gilroy]">
          Revenue Trend
        </h3>

        <div className="flex items-center gap-4 text-sm font-[Gilroy]">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#16A34A]" /> Collected
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#F97316]" /> Outstanding
          </span>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="flex items-end h-40 gap-5 mb-4">
        {revenueData.map((item, index) => (
          <div key={index} className="flex gap-1 items-end">
            <div
              className="w-5 bg-[#16A34A] rounded-t-md"
              style={{ height: `${item.collected * 8}px` }}
            />
            <div
              className="w-5 bg-[#F97316] rounded-t-md"
              style={{ height: `${item.outstanding * 8}px` }}
            />
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 border-t pt-4">
        <div>
          <p className="text-sm text-[#64748B] font-[Gilroy]">Total Collected</p>
          <p className="text-lg font-semibold text-[#16A34A] font-[Gilroy]">
            ₹ 54,000
          </p>
          <p className="text-xs text-red-500 font-[Gilroy]">
            ↓ 8% from last month
          </p>
        </div>

        <div>
          <p className="text-sm text-[#64748B] font-[Gilroy]">
            Total Outstanding
          </p>
          <p className="text-lg font-semibold text-[#F97316] font-[Gilroy]">
            ₹ 2.7L
          </p>
          <p className="text-xs text-green-600 font-[Gilroy]">
            ↑ 12% from last month
          </p>
        </div>
      </div>
    </div>
 

  </div>
</div>

  )
}

export default DashCoreAnalytics
import React, { useState, useEffect, useRef } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-[#E5E7EB] rounded-lg shadow-md px-4 py-2">
        <div className="text-[#8B5CF6] font-medium">{label}</div>

        <div className="flex items-center gap-2">
          <span className="text-[#6B7280]">Acc Balance</span>

          <span className="font-semibold text-[#111827]">
            ₹{payload[0].value.toLocaleString("en-IN")}
          </span>
        </div>
      </div>
    );
  }

  return null;
};

function BankingChart() {
  return (
    <div className="border border-[#E5E7EB] rounded-xl p-6">
      <div className="text-[24px] font-semibold text-[#111827] mb-6">
        Account Analysis
      </div>

      <div className="h-[380px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{
              top: 20,
              right: 20,
              left: 10,
              bottom: 10,
            }}
          >
            <defs>
              <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C084FC" stopOpacity={0.25} />

                <stop offset="100%" stopColor="#C084FC" stopOpacity={0.03} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="4 4"
              vertical={true}
              stroke="#E5E7EB"
            />

            <XAxis
              dataKey="month"
              tick={{
                fill: "#94A3B8",
                fontSize: 14,
              }}
              axisLine={{
                stroke: "#CBD5E1",
              }}
              tickLine={false}
            />

            <YAxis
              domain={[0, 30000]}
              ticks={[0, 8000, 15000, 23000, 30000]}
              tickFormatter={(value) => `₹${value / 1000}k`}
              tick={{
                fill: "#94A3B8",
                fontSize: 14,
              }}
              axisLine={{
                stroke: "#CBD5E1",
              }}
              tickLine={false}
            />

            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="balance"
              stroke="#C084FC"
              strokeWidth={3}
              fill="url(#balanceGradient)"
              activeDot={{
                r: 7,
                fill: "#8B5CF6",
                stroke: "#FFFFFF",
                strokeWidth: 3,
              }}
              dot={{
                r: 5,
                fill: "#8B5CF6",
                stroke: "#8B5CF6",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Statistics */}

      <div className="flex items-center justify-center gap-8 mt-6 border-t pt-5">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#4F46E5]" />
          <div className="text-[#6B7280]">Average Monthly</div>
          <div className="font-semibold">₹41,833</div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#4F46E5]" />
          <div className="text-[#6B7280]">Highest Month</div>
          <div className="font-semibold">₹97,200</div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#DDD6FE]" />
          <div className="text-[#6B7280]">Lowest Month</div>
          <div className="font-semibold">₹16,500</div>
        </div>
      </div>
    </div>
  );
}

export default BankingChart;

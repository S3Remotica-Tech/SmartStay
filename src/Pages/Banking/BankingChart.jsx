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
import {
  Bank,
  Location,
  Calendar,
  ArrowUp2,
  ArrowUp,
  ArrowDown2,
  Add,
  ArrowSwapVertical,
  Wallet,
} from "iconsax-react";

import { useDispatch, useSelector } from "react-redux";

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
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const bankingChart = state?.bankingDetails?.getBankingOverviewList;

  const summaryCards = [
    {
      title: "Current Balance",
      amount: `₹ ${bankingChart?.currentBalance || 0}`,
      icon: ArrowUp2,
    },
    {
      title: "Opening Balance",
      amount: `₹ ${bankingChart?.openingBalance || 0}`,
    },
    {
      title: "Inflow (Income)",
      amount: `₹ ${bankingChart?.invoiceAmount || 0}`,
    },
    {
      title: "Out flow (Expense)",
      amount: `₹ ${bankingChart?.expenseAmount || 0}`,
    },
    {
      title: "Out flow (Asset)",
      amount: `₹ ${bankingChart?.assetsAmount || 0}`,
    },
    {
      title: "Out flow (Booking Refund)",
      amount: `₹ ${bankingChart?.bookingRefundAmount || 0}`,
    },
    {
      title: "Inflow (Deposit)",
      amount: `₹ ${bankingChart?.depositAmount || 0}`,
    },
    {
      title: "Out flow (Rent Refund)",
      amount: `₹ ${bankingChart?.rentRefundAmount || 0}`,
    },

    {
      title: "Transfers",
      amount: `₹ ${bankingChart?.selfTransferAmount || 0}`,
    },
  ];

  const chartData =
    bankingChart?.monthData?.map((item) => ({
      month: item.month,
      balance: item.currentBalance,
    })) || [];

  const maxBalance = Math.max(...chartData?.map((item) => item?.balance), 0);

  const roundedMax = Math.ceil(maxBalance / 10000) * 10000 || 10000;

  const bankDetails = [
    { label: "Bank Name", value: bankingChart?.bankName },
    { label: "Beneficiary Name", value: bankingChart?.beneficiaryName },
    { label: "Account No", value: bankingChart?.accountNumber },
    { label: "IFSC Code", value: bankingChart?.ifscCode },
    { label: "Branch", value: bankingChart?.branch },
  ];

  return (
    <div>
      <div className="flex gap-4 px-3 py-6 flex-nowrap overflow-x-auto show-scrolls">
        {summaryCards.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className={`flex items-center gap-2 px-2 ${
                index !== summaryCards.length - 1 ? "border-r" : ""
              }`}
            >
              {Icon && (
                <div className="w-11 h-11 rounded-full bg-[#FBF7FF] flex items-center justify-center">
                  <ArrowUp size="18" color="#7840A9" className="rotate-45" />
                </div>
              )}

              <div>
                <div className="text-[12px] text-[#4A5565] font-medium whitespace-nowrap">
                  {item.title}
                </div>

                <div className="text-[18px] font-semibold text-[#101828] whitespace-nowrap">
                  {item.amount}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="h-full flex flex-col">
        <div className="border border-[#E5E7EB] rounded-xl p-3 mx-4 my-4 ">
          <div className="text-[18px] font-semibold text-[#101828] mb-6">
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
                  <linearGradient
                    id="balanceGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#C084FC" stopOpacity={0.25} />

                    <stop
                      offset="100%"
                      stopColor="#C084FC"
                      stopOpacity={0.03}
                    />
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
                  domain={[0, roundedMax]}
                  tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
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

          <div className="flex items-center justify-center gap-8 mt-6 border-t pt-5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#4F46E5]" />
              <div className="text-[#6B7280]">Average Monthly</div>
              <div className="font-semibold">
                ₹ {bankingChart?.averageMonthly}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#4F46E5]" />
              <div className="text-[#6B7280]">Highest Month</div>
              <div className="font-semibold">
                ₹ {bankingChart?.highestMonth?.netChange}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#DDD6FE]" />
              <div className="text-[#6B7280]">Lowest Month</div>
              <div className="font-semibold">
                {" "}
                ₹ {bankingChart?.lowestMonth?.netChange}
              </div>
            </div>
          </div>
        </div>
        {bankingChart?.accountType !== "CASH" && (
          <div className="mx-4 my-4">
            {bankDetails?.map((item) => (
              <div
                key={item.label}
                className="grid grid-cols-[140px_20px_1fr] gap-3 mb-2 "
              >
                <div className="text-[#4B4B4B] text-[13px] ">{item.label}</div>
                <div>:</div>
                <div className="font-semibold text-[14px] text-[#000825]">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BankingChart;

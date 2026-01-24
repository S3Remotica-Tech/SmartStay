/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { Calendar } from "iconsax-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Legend,
} from "recharts";

function DashCoreAnalytics() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("This Month");
  const dropdownRef = useRef(null);
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
  const dateOptions = [
    "Today",
    "This Week",
    "This Month",
    "Last Month",
    "Last 3 Months",
  ];


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);



  const avgOccupied = Math.round(
    occupancyData.reduce((a, b) => a + b.occupied, 0) / occupancyData.length
  );

  const avgVacant = Math.round(
    occupancyData.reduce((a, b) => a + b.vacant, 0) / occupancyData.length
  );


  return (
    <div className="space-y-2 my-4">
      <h2 className="text-[18px] font-semibold text-[#0F172A] font-[Gilroy] mb-4">
        Core Analytics
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-3 lg:col-span-5">
          
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-[#101828] font-[Gilroy] text-[16px]">
              Occupancy Trend
            </h3>

            <div className="relative inline-block">
              {/* Button */}
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 border px-3 py-1.5 rounded-lg text-sm font-[Gilroy] bg-white hover:bg-gray-50"
              >
                <Calendar size="16" />
                {selected}
              </button>

              {/* Dropdown */}
              {open && (
                <div ref={dropdownRef} className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">
                  {dateOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSelected(option);
                        setOpen(false);
                      }}
                      className="
            w-full text-left px-3 py-2 text-sm font-[Gilroy]
            hover:bg-gray-100
          "
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={occupancyData}
              margin={{ top: 20, right: 20, left: 0, bottom: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis
                dataKey="label"
                tick={{ fontFamily: "Gilroy", fontSize: 12 }}
                angle={-40}
                textAnchor="end"
              />

              <YAxis
                tick={{ fontFamily: "Gilroy", fontSize: 12 }}
                domain={[0, "dataMax + 10"]}
              />

              <Tooltip />


              <Line
                type="monotone"
                dataKey="occupied"
                stroke="#16A34A"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
              />


              <Line
                type="monotone"
                dataKey="vacant"
                stroke="#F54900"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>

  <hr className="border border-[#F3F4F5] mx-0 my-2" />

          <div className="grid grid-cols-2 text-center h-auto">
            <div>
              <p className="text-sm text-[#4A5565] font-[Gilroy] font-semibold">Avg Occupied</p>
              <p className="text-xl font-semibold text-[#16A34A] font-[Gilroy]">
                101
              </p>
            </div>
            <div>
              <p className="text-sm text-[#4A5565] font-[Gilroy] font-semibold">Avg Vacant</p>
              <p className="text-xl font-semibold text-[#F97316] font-[Gilroy]">
                19
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[#E5E7EB] bg-white p-3 lg:col-span-7">

          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-[#101828] font-[Gilroy] text-[16px]">
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


          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={revenueData}
              margin={{ top: 20, left: 20, bottom: 40, right: 10 }}
              barCategoryGap={20}
            >
              <CartesianGrid horizontal vertical={false} stroke="#E5E7EB" />

              <XAxis
                dataKey="month"
                tick={{ fontFamily: "Gilroy", fontSize: 12, fontWeight: 500 }}
              />

              <YAxis
                tick={{ fontFamily: "Gilroy", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                domain={[0, "dataMax + 2"]}
                label={{
                  value: "₹ Lakhs",
                  angle: -90,
                  position: "insideLeft",
                  style: { fontFamily: "Gilroy", fontSize: 12 },
                }}
              />

              <Tooltip
                formatter={(value) => [`₹ ${value} L`, ""]}
                cursor={{ fill: "transparent" }}
              />

              {/* Collected */}
              <Bar
                dataKey="collected"
                fill="#16A34A"
                barSize={26}
                radius={[6, 6, 0, 0]}
              />

              {/* Outstanding */}
              <Bar
                dataKey="outstanding"
                fill="#F54900"
                barSize={26}
                radius={[6, 6, 0, 0]}
              />

              {/* <Legend
                verticalAlign="top"
                align="center"
                iconType="circle"
                wrapperStyle={{
                  fontFamily: "Gilroy",
                  fontSize: 12,
                  marginBottom: 16,
                }}
              /> */}
            </BarChart>
          </ResponsiveContainer>

  <hr className="border border-[#F3F4F5] mx-0 my-2" />
          <div className="grid grid-cols-2 ">
            <div>
              <p className="text-sm text-[#4A5565] font-[Gilroy] font-semibold">Total Collected</p>
              <p className="text-lg font-semibold text-[#00A63E] font-[Gilroy]">
                ₹ 54,000
              </p>
              <p className="text-xs text-[#6A7282] font-[Gilroy] font-semibold">
                ↓ 8% from last month
              </p>
            </div>

            <div>
              <p className="text-sm text-[#4A5565] font-[Gilroy] font-semibold">
                Total Outstanding
              </p>
              <p className="text-lg font-semibold text-[#00A63E] font-[Gilroy]">
                ₹ 2.7L
              </p>
              <p className="text-xs text-[#6A7282] font-[Gilroy] font-semibold">
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
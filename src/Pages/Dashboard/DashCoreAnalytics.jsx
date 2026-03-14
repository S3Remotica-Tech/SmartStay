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

} from "recharts";
import { useDispatch, useSelector } from "react-redux";

function DashCoreAnalytics() {

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("This Month");
  const dropdownRef = useRef(null);


  const occupancyData =
    state.PgList?.dashboardList?.occupancyTrend?.map((item) => ({
      label: item.date,
      occupied: item.occupied,
      vacant: item.vacant,
    })) || [];


  // const occupancyData = [
  //   { label: "Jan 1", occupied: 96, vacant: 22 },
  //   { label: "Jan 5", occupied: 98, vacant: 20 },
  //   { label: "Jan 10", occupied: 100, vacant: 18 },
  //   { label: "Jan 15", occupied: 99, vacant: 19 },
  //   { label: "Jan 20", occupied: 101, vacant: 17 },
  //   { label: "Jan 25", occupied: 100, vacant: 18 },
  //   { label: "Today", occupied: 101, vacant: 19 },
  // ];


  // const revenueData = [
  //   { month: "Aug", collected: 12.5, outstanding: 1.2 },
  //   { month: "Sep", collected: 13.2, outstanding: 0.8 },
  //   { month: "Oct", collected: 14.1, outstanding: 1.5 },
  //   { month: "Nov", collected: 13.8, outstanding: 1.1 },
  //   { month: "Dec", collected: 15.6, outstanding: 0.9 },
  //   { month: "Jan", collected: 3.1, outstanding: 12.8 },
  // ];


const revenueData =
    state.PgList?.dashboardList?.revenueTrend?.map((item) => ({
      month: item.month,
      collected: item.collected,
      outstanding: item.outstanding,
    })) || [];





  const dateOptions =
    state.PgList?.dashboardList?.filters?.map((item) => ({
      label: item,
      value: item
    })) || [];

  useEffect(() => {
    if (state.login.selectedHostel_Id) {

      dispatch({
        type: "GET_DASHBOARD_SAGA",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          filters: {
            occupancyFilter: selected
          }
        }
      });

      // setLoading(true);
    }
  }, [selected]);

  useEffect(() => {
    if (state.PgList?.dashboardList) {
      setLoading(false)

    }
  }, [state.PgList?.dashboardList]);


  useState(() => {
    if (state.PgList.getDashboardSuccessStatus === 200) {
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "REMOVE_GET_DASHBOARD_REDUCER" });
      }, 200);
    }
  }, [state.PgList.getDashboardSuccessStatus]);



  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);



  // const avgOccupied = Math.round(
  //   occupancyData?.reduce((a, b) => a + b.occupied, 0) / occupancyData?.length
  // );

  // const avgVacant = Math.round(
  //   occupancyData?.reduce((a, b) => a + b.vacant, 0) / occupancyData?.length
  // );


  return (
    <div className="space-y-2 my-4">
      <h2 className="text-[18px] font-semibold text-[#0F172A] font-[Gilroy] mb-4">
        Core Analytics
      </h2>
      {loading && (
        <div className="fixed top-0 right-0 bottom-0 left-[200px] flex items-center justify-center bg-transparent opacity-75 z-10">
          <div className="w-10 h-10 border-t-4 border-t-[#1E45E1] border-r-4 border-r-transparent rounded-full animate-spin"></div>
        </div>
      )}

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

              {open && (
                <div ref={dropdownRef} className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">
                  {dateOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSelected(option.value);
                        setOpen(false);
                      }}
                      className="
            w-full text-left px-3 py-2 text-sm font-[Gilroy]
            hover:bg-gray-100
          "
                    >
                      {option.label}
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

              <Tooltip contentStyle={{
                fontFamily: "Gilroy",
                borderRadius: 8,
                border: "1px solid #E5E7EB",
              }} />


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
                
              </p>
            </div>
            <div>
              <p className="text-sm text-[#4A5565] font-[Gilroy] font-semibold">Avg Vacant</p>
              <p className="text-xl font-semibold text-[#F97316] font-[Gilroy]">
                
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

              <Tooltip contentStyle={{
                fontFamily: "Gilroy",
                borderRadius: 8,
                border: "1px solid #E5E7EB",
              }}
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
              <p className="text-sm text-[#4A5565] font-[Gilroy] font-semibold">
                {/* Total Collected */}
                </p>
              <p className="text-lg font-semibold text-[#00A63E] font-[Gilroy]">
                {/* ₹ 54,000 */}
              </p>
              <p className="text-xs text-[#6A7282] font-[Gilroy] font-semibold">
                {/* ↓ 8% from last month */}
              </p>
            </div>

            <div>
              <p className="text-sm text-[#4A5565] font-[Gilroy] font-semibold">
                {/* Total Outstanding */}
              </p>
              <p className="text-lg font-semibold text-[#00A63E] font-[Gilroy]">
                {/* ₹ 2.7L */}
              </p>
              <p className="text-xs text-[#6A7282] font-[Gilroy] font-semibold">
                {/* ↑ 12% from last month */}
              </p>
            </div>
          </div>
        </div>


      </div>
    </div>

  )
}

export default DashCoreAnalytics
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState, useRef } from 'react';
import {
  Filter,
  Export, ArrowLeft,
  ArrowDown2,
  TickCircle

} from "iconsax-react";
import "react-datepicker/dist/react-datepicker.css";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";
import { 
  // useDispatch, 
  useSelector } from "react-redux";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  // Legend,
} from "recharts";


function AnalyticalVacantOcupied() {



  const navigate = useNavigate();
  const state = useSelector(state => state)
  const { RangePicker } = DatePicker;
  // const [invoiceFilter, setInvoiceFilter] = useState(false)
  const dropdownRef = useRef(null);
  const [selectedRange, setSelectedRange] = useState(null);
  const [register, setRegister] = useState(false)

  useEffect(() => {
    setSelectedRange({
      from: dayjs().startOf("month").toDate(),
      to: dayjs().endOf("month").toDate(),
    });
  }, []);


  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setRegister(false);
      }
    }

    if (register) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [register]);

  const reportCards = [
    {
      id: 1,
      title: "Month vs Month Revenue",
      subTitle: "MonthRevenue"

    },
    {
      id: 2,
      title: "Collected vs Outstanding",
      subTitle: "Outstanding"
    },
    //   {
    //     id: 3,
    //     title: "Vacant vs Occupied Beds",
    //         subTitle:"Vacant"
    //   },
    {
      id: 4,
      title: "Monthly Expense Trend",
      subTitle: "MonthlyExpenseTrend"
    },
    {
      id: 5,
      title: "Overdue Invoices Trend",
      subTitle: "OverdueInvoicesTrend"

    },
    {
      id: 6,
      title: "Complaints Resolved",
      subTitle: "Complaints"

    }
  ];

  const handleNavigateReports = () => {
    navigate(`/reports/${state.login.selectedHostel_Id}`, {
      state: {
        analytical: true,
      },
    })
  }

  const handleNavigateRegister = (item) => {
    setRegister(false)
    if (item?.subTitle === "MonthRevenue") {
      navigate(`/reports/month-revenue/${state.login?.selectedHostel_Id}`)
    } else if (item?.subTitle === "Outstanding") {
      navigate(`/reports/collected-outstanding/${state.login?.selectedHostel_Id}`)
    } else if (item?.subTitle === "Vacant") {
      navigate(`/reports/vacant-occupied/${state.login?.selectedHostel_Id}`)
    } else if (item?.subTitle === "MonthlyExpenseTrend") {
      navigate(`/reports/expense-trend/${state.login?.selectedHostel_Id}`)
    } else if (item?.subTitle === "OverdueInvoicesTrend") {
      navigate(`/reports/overdue-invoice-trend/${state.login?.selectedHostel_Id}`)
    }
    else if (item?.subTitle === "Complaints") {
      navigate(`/reports/complaints-resolved/${state.login?.selectedHostel_Id}`)
    }
  }

  const handleClickFilter = () => {
    // setInvoiceFilter(true)
  }

  // const handleCloseFilterBills = () => {
  //   setInvoiceFilter(false)
  // }




  const bedStats = [
    {
      id: 1,
      title: "Total Beds",
      value: 50,
      subtitle: "Available capacity",
      valueColor: "text-[#0F172A]",
    },
    {
      id: 2,
      title: "Occupied Beds",
      value: 43,
      progress: 83,
      valueColor: "text-[#2563EB]",
      showProgress: true,
      icon: TickCircle,
      iconBg: "bg-[#DCFCE7]",
      iconColor: "#16A34A",
    },
    {
      id: 3,
      title: "Vacant Beds",
      value: 7,
      tag: "Good availability",
      tagBg: "bg-[#DCFCE7]",
      tagText: "text-[#15803D]",
    },
  ];

  const bedSummary = {
    total: 50,
    occupied: 43,
    vacant: 7,
  };

  const pieData = [
    { name: "Occupied", value: bedSummary.occupied, color: "#3B82F6" },
    { name: "Vacant", value: bedSummary.vacant, color: "#E5E7EB" },
  ];

  const barData = [
    {
      name: "Current Status",
      Occupied: bedSummary.occupied,
      Vacant: bedSummary.vacant,
    },
  ];

  return (
    <div className="h-screen flex flex-col font-gilroy p-2">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 sticky top-0 right-0 left-0 z-30 bg-white">
        <div className='flex items-center gap-2'>
          <ArrowLeft onClick={handleNavigateReports}
            size="20"
            color="#4A5565" className='cursor-pointer'
          />
          <div>
            <div className='flex items-center gap-2 relative w-fit' onClick={() => setRegister(!register)}>
              <h1 className="text-lg font-semibold my-0 text-[#222222]">Vacant vs Occupied Beds</h1>
              <div className='rounded-none border-0'>
                <ArrowDown2
                  size="18"
                  color="#1E45E1"
                  className={`cursor-pointer transition-transform duration-200 ${register ? "rotate-180" : ""
                    }`}
                />
                {register && (
                  <div ref={dropdownRef} className="absolute z-50 mt-2 w-64 bg-white rounded-2xl shadow-lg overflow-hidden border border-[#E5E7EB]">
                    {reportCards.map((item, index) => {
                      const isFirst = index === 0;
                      const isLast = index === reportCards.length - 1;

                      return (
                        <div
                          key={index}
                          onClick={() => {
                            handleNavigateRegister(item)

                          }}
                          className={`
                px-4 py-2 text-sm text-[#222] cursor-pointer
                hover:bg-[#F1F5FF]
                ${isFirst ? "hover:rounded-t-2xl" : ""}
                ${isLast ? "hover:rounded-b-2xl" : ""}
                ${!isLast ? "border-b border-[#E5E7EB]" : ""}
              `}
                        >
                          {item.title}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>


          </div>
        </div>

        <div className="flex flex-wrap gap-3 items-stretch" >

          <div
            className="datepicker-wrapper"
            style={{ position: "relative", }}
          >
            <RangePicker
              style={{
                width: "100%",
                height: "100%",
                cursor: "pointer",
                fontFamily: "Gilroy",

              }}
              format="DD/MM/YYYY"
              placeholder={["From date", "To date"]}
              value={
                selectedRange?.from && selectedRange?.to
                  ? [dayjs(selectedRange.from), dayjs(selectedRange.to)]
                  : null
              }
              onChange={(dates) => {

                if (dates) {
                  setSelectedRange({
                    from: dates[0].toDate(),
                    to: dates[1].toDate(),
                  });
                } else {
                  setSelectedRange(null);
                }
              }}
              disabledDate={(current) => {
                if (!selectedRange?.from) return current > dayjs().endOf("day");
                return (
                  current > dayjs().endOf("day") ||
                  current < dayjs(selectedRange.from).startOf("day")
                );
              }}

              getPopupContainer={(triggerNode) =>
                triggerNode.closest(".datepicker-wrapper")
              }
            />
          </div>

          <button onClick={handleClickFilter}
            className="h-[36px] flex items-center gap-2 px-4 border rounded-lg text-sm font-gilroy"
          >
            <Filter size="16" />
            Filter
          </button>
          <button
            className="h-[36px] flex items-center gap-2 px-4 bg-[#1E45E1] text-white rounded-lg text-sm font-gilroy"
          >
            <Export size="16" />
            Export
          </button>
        </div>
      </div>



      <div className='bg-[#FAFAFA] p-3 mt-3 rounded'>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-[Gilroy]">
          {bedStats.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="rounded-xl border border-[#E5E7EB] bg-white p-3 h-auto"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <label className="text-sm text-[#4A5565] font-semibold">{item.title}</label>
                    <h3 className={`text-2xl font-semibold ${item.valueColor}`}>
                      {item.value}
                    </h3>
                  </div>

                  {Icon && (
                    <div
                      className={`h-7 w-7 rounded-full flex items-center justify-center ${item.iconBg}`}
                    >
                      <Icon size="16" color={item.iconColor} />
                    </div>
                  )}
                </div>

                {item.subtitle && (
                  <label className="mt-1 text-xs text[#4A5565] font-medium">{item.subtitle}</label>
                )}

                {item.showProgress && (
                  <div className="mt-3">
                    <div className="h-1.5 w-full rounded-full bg-[#E5E7EB]">
                      <div
                        className="h-full rounded-full bg-[#3B82F6]"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                    <label className="mt-1 text-right text-xs text-[#64748B]">
                      {item.progress}%
                    </label>
                  </div>
                )}

                {item.tag && (
                  <span
                    className={`mt-3 inline-block rounded-md px-2 py-1 text-xs font-medium ${item.tagBg} ${item.tagText}`}
                  >
                    {item.tag}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 font-[Gilroy]">

          <div className="rounded-xl border border-[#E5E7EB] bg-white p-4">
            <h4 className="text-base font-semibold text-[#101828]">
              Occupancy Distribution
            </h4>
            <p className="text-xs text-[#64748B] mb-4">
              Current bed allocation status
            </p>

            <div className="h-[200px] flex justify-center items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex justify-center gap-4 text-xs mt-2">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#3B82F6] text-[#3B82F6]" />
                Occupied {Math.round((bedSummary.occupied / bedSummary.total) * 100)}%
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#94A3B8] text-[#94A3B8]" />
                Vacant {Math.round((bedSummary.vacant / bedSummary.total) * 100)}%
              </span>
            </div>
          </div>


          <div className="rounded-xl border border-[#E5E7EB] bg-white p-4">
            <h4 className="text-base font-semibold text-[#101828]">
              Bed Comparison
            </h4>
            <p className="text-xs text-[#64748B] mb-4">
              Occupied vs vacant bed count
            </p>

            <div className="h-[200px] flex justify-center items-center">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} barCategoryGap={40}>
                  <CartesianGrid vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip cursor={{ fill: "transparent" }} />

                  <Bar
                    dataKey="Occupied"
                    fill="#3B82F6"
                    radius={[6, 6, 0, 0]}
                    barSize={30}
                  />
                  <Bar
                    dataKey="Vacant"
                    fill="#CBD5E1"
                    radius={[6, 6, 0, 0]}
                    barSize={30}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-3 flex justify-center gap-4 text-xs">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                Occupied
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#CBD5E1]" />
                Vacant
              </span>
            </div>
          </div>

        </div>







      </div>

    </div>
  )
}

export default AnalyticalVacantOcupied


import React, { useEffect, useState, useRef } from 'react';
import {
  Filter,
  Export, ArrowLeft,
  ArrowDown2,
  TrendUp 

} from "iconsax-react";
import "react-datepicker/dist/react-datepicker.css";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";


function AnalyticalMonthRevenue() {



  const navigate = useNavigate();
  const state = useSelector(state => state)

const janRevenue = 178350;
  const decRevenue = 172600;

  const total = janRevenue + decRevenue;
  const janPercent = Math.round((janRevenue / total) * 100);
  const decPercent = 100 - janPercent;
  const { MonthPicker } = DatePicker;
  const [invoiceFilter, setInvoiceFilter] = useState(false)
  const dropdownRef = useRef(null);

  const [register, setRegister] = useState(false)
  const [compareMonth, setCompareMonth] = useState(() =>
  dayjs("2026-01", "YYYY-MM")
);

const [withMonth, setWithMonth] = useState(() =>
  dayjs("2025-12", "YYYY-MM")
);

 const [compareMonthRevenue, setCompareMonthRevenue] = useState(() =>
  dayjs("2026-01", "YYYY-MM")
);
  const [withMonthRevenue, setWithMonthRevenue] = useState(() =>
  dayjs("2025-12", "YYYY-MM")
);



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
    // {
    //   id: 1,
    //   title: "Month vs Month Revenue",
    //   subTitle: "MonthRevenue"

    // },
    {
      id: 2,
      title: "Collected vs Outstanding",
      subTitle: "Outstanding"
    },
    {
      id: 3,
      title: "Vacant vs Occupied Beds",

      subTitle: "Vacant"
    },
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


  const revenueCards = [
  {
    id: 1,
    title: "Revenue (Jan 2026)",
    value: "₹1,78,350",
    sub: "vs Dec 2025: ₹1,72,600",
    icon: TrendUp,
    bg: "bg-[#F5F8FF]",
    border: "border-[#D6E4FF]",
    iconBg: "bg-[#2563EB]",
    iconColor: "#ffffff",
  },
  {
    id: 2,
    title: "Revenue Change (%)",
    value: "+3.3%",
    sub: "Growth",
    icon: TrendUp,
    bg: "bg-[#F0FDF4]",
    border: "border-[#BBF7D0]",
    iconBg: "bg-[#16A34A]",
    iconColor: "#ffffff",
    positive: true,
  },
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
      navigate(`/reports/month-revenue`)
    } else if (item?.subTitle === "Outstanding") {
      navigate(`/reports/collected-outstanding`)
    } else if (item?.subTitle === "Vacant") {
      navigate(`/reports/vacant-occupied`)
    } else if (item?.subTitle === "MonthlyExpenseTrend") {
      navigate(`/reports/expense-trend`)
    } else if (item?.subTitle === "OverdueInvoicesTrend") {
      navigate(`/reports/overdue-invoice-trend`)
    }
    else if (item?.subTitle === "Complaints") {
      navigate(`/reports/complaints-resolved`)
    }
  }

  const handleClickFilter = () => {
    setInvoiceFilter(true)
  }

  // const handleCloseFilterBills = () => {
  //   setInvoiceFilter(false)
  // }


  const revenueData = [
  {
    key: "compare",
    label: "Compare",
    month: "2026-01",
    revenue: 178350,
    color: "#7C3AED",
    trail: "#E9D5FF",
  },
  {
    key: "with",
    label: "With",
    month: "2025-12",
    revenue: 172600,
    color: "#E9D5FF",
    trail: "#F3E8FF",
  },
];


const [data, setData] = useState(revenueData);

const totalRevenue = data.reduce((sum, i) => sum + i.revenue, 0);
const comparePercent = Math.round((data[0].revenue / totalRevenue) * 100);
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
              <h1 className="text-lg font-semibold my-0 text-[#222222]">Month vs Month Revenue</h1>
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

        <div className="flex flex-wrap gap-3 items-stretch" style={{ height: 36 }}>

          <div className="flex items-center gap-3 bg-white  px-3 py-2 w-fit">

            <div className="flex items-center gap-2">
              <span className="text-sm text[#4A5565] font-semibold">
                Compare:
              </span>

              <MonthPicker
                value={compareMonth ? dayjs(compareMonth) : null}
                onChange={(date) => setCompareMonth(date)}
                format="MMMM YYYY"
                className="w-[140px] font-[Gilroy]"
                placeholder="Select month"
              />
            </div>

         
            <span className="text-sm text-gray-400 font-medium">
              vs
            </span>

            <div className="flex items-center gap-2">
              <span className="text-sm text[#4A5565] font-semibold">
                With:
              </span>

              <MonthPicker
                value={withMonth ? dayjs(withMonth) : null}
                onChange={(date) => setWithMonth(date)}
                format="MMMM YYYY"
                 className="w-[140px] font-[Gilroy]"
                placeholder="Select month"
              />
            </div>

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

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

  {revenueCards.map((card) => {
    const Icon = card.icon;

    return (
      <div
        key={card.id}
        className={`relative rounded-xl border p-4 ${card.bg} ${card.border}`}
      >
        {/* Title */}
        <div className="text-xs text-gray-500 mb-1">
          {card.title}
        </div>

        {/* Value */}
        <div
          className={`text-xl font-semibold ${
            card.positive ? "text-green-600" : "text-gray-900"
          }`}
        >
          {card.value}
        </div>

        {/* Sub text */}
        <div
          className={`mt-1 text-xs ${
            card.positive ? "text-green-600" : "text-gray-500"
          }`}
        >
          {card.sub}
        </div>

        {/* Icon */}
        <div
          className={`absolute top-4 right-4 w-9 h-9 rounded-lg flex items-center justify-center shadow-md ${card.iconBg}`}
        >
          <Icon size="18" color={card.iconColor} variant="Bold" />
        </div>

        {/* Progress bar (only for Growth card) */}
        {card.positive && (
          <div className="mt-3 h-2 w-full rounded-full bg-green-100 overflow-hidden">
            <div className="h-full w-[65%] bg-green-500 rounded-full" />
          </div>
        )}
      </div>
    );
  })}

</div>



<div className="bg-white rounded-xl border p-3 mt-4  h-fit">

  {/* Header */}
  <div className="flex items-center justify-between mb-4">
    <div>
      <h3 className="text-sm font-semibold text-gray-800">
        Revenue Comparison
      </h3>
      <p className="text-xs text-gray-500">
        Month-over-month revenue performance
      </p>
    </div>

    <div className="flex items-center gap-2">
     <div className="flex items-center gap-3 bg-white  px-3 py-2 w-fit">

            <div className="flex items-center gap-2">
              <span className="text-sm text[#4A5565] font-semibold">
                Compare:
              </span>

              <MonthPicker
                value={compareMonthRevenue ? dayjs(compareMonthRevenue) : null}
                onChange={(date) => setCompareMonthRevenue(date)}
                format="MMMM YYYY"
                className="w-[140px] font-[Gilroy]"
                placeholder="Select month"
              />
            </div>

         
            <span className="text-sm text-gray-400 font-medium">
              vs
            </span>

            <div className="flex items-center gap-2">
              <span className="text-sm text[#4A5565] font-semibold">
                With:
              </span>

              <MonthPicker
                value={withMonthRevenue ? dayjs(withMonthRevenue) : null}
                onChange={(date) => setWithMonthRevenue(date)}
                format="MMMM YYYY"
                 className="w-[140px] font-[Gilroy]"
                placeholder="Select month"
              />
            </div>

          </div>
      <button
            className="h-[36px] flex items-center gap-2 px-4 bg-[#1E45E1] text-white rounded-lg text-sm font-gilroy"
          >
           
            Export
          </button>
    </div>
  </div>

  {/* Chart + Legend */}
  <div className="flex items-center gap-8">

    {/* Donut */}
    <div className="relative w-[250px] h-[250px]">
      <CircularProgressbar
        value={comparePercent}
        text={`${comparePercent}%`}
        strokeWidth={14}
        styles={buildStyles({
          pathColor: data[0].color,
          trailColor: data[1].color,
          textColor: data[0].color,
          strokeLinecap: "round",
        })}
      />

      <div className="absolute top-4 right-[-95px] bg-[#1F2937] text-white text-xs px-3 py-1 rounded-lg">
        {dayjs(data[0].month).format("MMM YYYY")} <br />
        ₹{data[0].revenue.toLocaleString()}
      </div>
    </div>

    {/* Legend */}
    <div className="space-y-2 text-sm">
      {data.map((item) => (
        <div key={item.key} className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-gray-700">
            Revenue – {dayjs(item.month).format("MMM YYYY")}
          </span>
        </div>
      ))}
    </div>

  </div>
</div>

 













    </div>
  )
}

export default AnalyticalMonthRevenue
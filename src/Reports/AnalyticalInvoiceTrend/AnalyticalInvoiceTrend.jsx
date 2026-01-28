/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import {
  Filter,
  Export, ArrowLeft,
  ArrowDown2, Calendar, ArrowUp2

} from "iconsax-react";
import "react-datepicker/dist/react-datepicker.css";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ResponsiveContainer,

  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  AreaChart,
  Area,

} from "recharts";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FiAlertTriangle } from "react-icons/fi";

function AnalyticalInvoiceTrend() {



  const navigate = useNavigate();
  const state = useSelector(state => state)
  const { MonthPicker } = DatePicker;
  const [invoiceFilter, setInvoiceFilter] = useState(false)
  const dropdownRef = useRef(null);
  const [selectedRange, setSelectedRange] = useState(null);
  const [register, setRegister] = useState(false)
  const [selected, setSelected] = useState("This Month");
  const [open, setOpen] = useState(false)
  const [compareMonthRevenue, setCompareMonthRevenue] = useState(() =>
    dayjs("2026-01", "YYYY-MM")
  );
  const [withMonthRevenue, setWithMonthRevenue] = useState(() =>
    dayjs("2025-12", "YYYY-MM")
  );
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
    // {
    //   id: 5,
    //   title: "Overdue Invoices Trend",
    //       subTitle:"OverdueInvoicesTrend"

    // },
    {
      id: 6,
      title: "Complaints Resolved",
      subTitle: "Complaints"

    }
  ];

  const dateOptions = [
    "Today",
    "This Week",
    "This Month",
    "Last Month",
    "Last 3 Months",
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



  const revenueCards = [
    {
      id: 1,
      title: "Total Overdue Amount",
      value: "₹28,450",
      sub: "vs Last Month:",
      icon: FiAlertTriangle,
      bg: "bg-[#FFFAFA]",
      border: "border-[#FFD6A7]",
      iconBg: "bg-[#FFEDD4]",
      iconColor: "#F54900",
    },
    {
      id: 2,
      title: "Overdue Invoices Count",
      value: "16",

      icon: FaArrowTrendUp,
      bg: "bg-[#FEF2F2]",
      border: "border-[#FFC9C9]",
      iconBg: "bg-[#E7000B]",
      iconColor: "#ffffff",


    },
  ];


  const expenseData = [
    { month: "Jan", expense: 38500 },
    { month: "Feb", expense: 41200 },
    { month: "Mar", expense: 39600 },
    { month: "Apr", expense: 45200 },
    { month: "May", expense: 44800 },
    { month: "Jun", expense: 45000 },
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
              <h1 className="text-lg font-semibold my-0 text-[#222222]">Overdue Invoices Trend</h1>
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

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-3 bg-white  px-3 py-2 w-fit">

            <div className="flex items-center gap-2">
              <span className="text-sm text[#4A5565] font-medium">
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
              <span className="text-sm text[#4A5565] font-medium">
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

      <div className='bg-[#FAFAFA] p-3 mt-3 rounded'>

        <div className="flex items-start gap-3 rounded-lg border border-[#FED7AA] bg-[#FFF7ED] px-4 py-3">


          <FiAlertTriangle className='text-[#F54900]' />

          <div>
            <div className="text-sm font-semibold text-[#7E2A0C]">
              Attention Required
            </div>
            <div className="text-xs text-[#CA3500] mt-0.5">
              You have <span className="font-semibold">7 overdue invoices</span> totaling
              <span className="font-semibold"> ₹28,450</span>. Immediate action recommended to improve cash flow.
            </div>
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">

          {revenueCards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.id}
                className={`relative rounded-xl border-1 p-4 ${card.bg} ${card.border}`}
              >

                <div className="text-sm text-[#4A5565] mb-1 font-semibold">
                  {card.title}
                </div>


                <div
                  className={`text-xl font-semibold ${card.positive ? "text-[#C10007]" : "text-gray-900"
                    }`}
                >
                  {card.value}
                </div>


                <div
                  className={`mt-1 text-sm flex gap-2 
            ${card.positive ? "text-[#C10007]" : "text-gray-500"
                    }`}
                >
                  {card.sub} {
                    !card.positive && <span className='font-semibold text-[#101828] text-sm' > {" "} {card.value}</span>
                  }
                </div>


                <div
                  className={`absolute top-4 right-4 w-9 h-9 rounded-lg flex items-center justify-center shadow-lg ${card.iconBg}`}
                >
                  <Icon size="18" color={card.iconColor} />
                </div>


                {card.positive && (
                  <div className=" px-2 w-full rounded-xl bg-red-100 overflow-hidden ">
                    <label className='text-[#C10007] text-xs p-0 font-semibold'>Increased</label>
                  </div>
                )}

              </div>
            );
          })}

        </div>



        <div className="rounded-xl border border-[#E5E7EB]  p-3 lg:col-span-7 mt-3 ]">

          <div className="flex justify-between items-center mb-2">
            <div>
              <h3 className="font-semibold text-[#101828] font-[Gilroy] text-[16px]">
                Overdue Amount Trend
              </h3>
              <label className="font-normal text-[#4A5565] font-[Gilroy] text-sm">Monthly expense trend over the last 6 months</label>
            </div>
            <div className='flex gap-2 items-center'>
              <div className="relative " ref={dropdownRef}>

                <button
                  onClick={() => setOpen(!open)}
                  className="flex items-center gap-2 text-xs border rounded-md px-3 py-2.5 bg-white font-[Gilroy] whitespace-nowrap "
                >
                  <Calendar size="16" color="#1E45E1" />
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
              <button
                className="h-[36px] flex items-center gap-2 px-4 bg-[#1E45E1] text-white rounded-lg text-sm font-gilroy"
              >

                Export
              </button>
            </div>


          </div>


          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={expenseData}
              margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
            >

              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />


              <defs>
                <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F97316" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#F97316" stopOpacity={0.05} />
                </linearGradient>
              </defs>


              <XAxis
                dataKey="month"
                tick={{ fontFamily: "Gilroy", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />


              <YAxis
                tickFormatter={(v) => `₹${v / 1000}k`}
                tick={{ fontFamily: "Gilroy", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                domain={[0, "dataMax + 5000"]}
              />


              <Tooltip
                contentStyle={{
                  fontFamily: "Gilroy",
                  borderRadius: 8,
                  border: "1px solid #E5E7EB",
                }}
                formatter={(value) => [`₹${value.toLocaleString()}`, "Expense"]}
                labelFormatter={(label) => label}
              />


              <Area
                type="monotone"
                dataKey="expense"
                stroke="#F97316"
                strokeWidth={2}
                fill="url(#expenseGradient)"
                dot={{ r: 5, stroke: "#F97316", strokeWidth: 2, fill: "#fff" }}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>


          <div className="flex justify-center gap-6 mt-4 text-sm font-[Gilroy]">
            <span className="flex items-center gap-2 text-[#6B7280]">
              <span className="w-2 h-2 rounded-full bg-[#F97316]" />
              Average Monthly <b className="text-gray-900">₹41,833</b>
            </span>

            <span className="flex items-center gap-2 text-[#6B7280]">
              <span className="w-2 h-2 rounded-full bg-[#F97316]" />
              Highest Month <b className="text-gray-900">₹45,200</b>
            </span>

            <span className="flex items-center gap-2 text-[#6B7280]">
              <span className="w-2 h-2 rounded-full bg-[#F97313]" />
              Lowest Month <b className="text-gray-900">₹38,500</b>
            </span>
          </div>


        </div>



      </div>







    </div>
  )
}

export default AnalyticalInvoiceTrend
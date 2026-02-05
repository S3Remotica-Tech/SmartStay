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

} from "recharts";

function AnalyticalCollectedOutstanding() {



  const navigate = useNavigate();
  const state = useSelector(state => state)
  const { MonthPicker } = DatePicker;
  const [invoiceFilter, setInvoiceFilter] = useState(false)
  const dropdownRef = useRef(null);
  // const [selectedRange, setSelectedRange] = useState(null);
  const [register, setRegister] = useState(false)
  const [selected, setSelected] = useState("This Month");
  const [open, setOpen] = useState(false)
  const [compareMonthRevenue, setCompareMonthRevenue] = useState(() =>
    dayjs("2026-01", "YYYY-MM")
  );
  const [withMonthRevenue, setWithMonthRevenue] = useState(() =>
    dayjs("2025-12", "YYYY-MM")
  );




  const dateOptions = [
    "Today",
    "This Week",
    "This Month",
    "Last Month",
    "Last 3 Months",
  ];

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
    //   {
    //     id: 2,
    //     title: "Collected vs Outstanding",
    //        subTitle:"Outstanding"
    //   },
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
    setInvoiceFilter(true)
  }

  // const handleCloseFilterBills = () => {
  //   setInvoiceFilter(false)
  // }


  const amountCards = [
    {
      id: 1,
      title: "Collected Amount",
      amount: "₹1,22,350",
      percent: 73,
      percentLabel: "73%",
      gradient: "from-[#22C55E] to-[#16A34A]",
      bg: "bg-[#F6FFFA]",
      textColor: "text-[#16A34A]",
      barBg: "bg-green-100",
    },
    {
      id: 2,
      title: "Outstanding Amount",
      amount: "₹45,650",
      percent: 27,
      percentLabel: "27%",
      gradient: "from-[#FB923C] to-[#F97316]",
      bg: "bg-[#FFF7ED]",
      textColor: "text-[#EA580C]",
      barBg: "bg-orange-100",
    },
    {
      id: 3,
      title: "Total Amount",
      amount: "₹1,68,000",
      note: "Collection Rate: 72.8%",
      bg: "bg-white",
    },
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
    <div className="h-screen flex flex-col font-gilroy p-2">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 sticky top-0 right-0 left-0 z-30 bg-white">
        <div className='flex items-center gap-2'>
          <ArrowLeft onClick={handleNavigateReports}
            size="20"
            color="#4A5565" className='cursor-pointer'
          />
          <div>
            <div className='flex items-center gap-2 relative w-fit' onClick={() => setRegister(!register)}>
              <h1 className="text-lg font-semibold my-0 text-[#222222]">Collected vs Outstanding</h1>
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

        {/* <div className="flex items-center gap-2"> */}
          {/* <div className="flex items-center gap-3 bg-white  px-3 py-2 w-fit">

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

          </div> */}
          {/* <button
            className="h-[36px] flex items-center gap-2 px-4 bg-[#1E45E1] text-white rounded-lg text-sm font-gilroy"
          >

            Export
          </button> */}
        {/* </div> */}
      </div>

      <div className='bg-[#FAFAFA] p-3 mt-3'>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4  bg-[#FAFAFA] ">
          {amountCards.map((card) => (
            <div
              key={card.id}
              className={`rounded-xl border border-gray-200 p-4 ${card.bg}`}
            >

              <div className="text-sm text-gray-500 mb-1">
                {card.title}
              </div>


              <div className={`text-xl font-semibold ${card.textColor ?? "text-gray-900"}`}>
                {card.amount}
              </div>


              {card.percent !== undefined && (
                <>
                  <div className={`mt-3 h-2 w-full rounded-full ${card.barBg} overflow-hidden`}>
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${card.gradient}`}
                      style={{ width: `${card.percent}%` }}
                    />
                  </div>

                  <div className="mt-1 text-right text-xs text-gray-500">
                    {card.percentLabel}
                  </div>
                </>
              )}


              {card.note && (
                <div className="mt-3 text-xs text-gray-500">
                  {card.note}
                </div>
              )}
            </div>
          ))}
        </div>


        <div className="rounded-xl border border-[#E5E7EB]  p-3 lg:col-span-7 mt-3 ]">

          <div className="flex justify-between items-center mb-2">
            <div>
              <h3 className="font-semibold text-[#101828] font-[Gilroy] text-[16px]">
                Collection Breakdown
              </h3>
              <label className="font-normal text-[#4A5565] font-[Gilroy] text-sm">Collected vs outstanding amounts for current month</label>
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
                
                domain={[0, 2]}
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


              <Bar
                dataKey="collected"
                fill="#16A34A"
                barSize={26}
                radius={[6, 6, 0, 0]}
              />


              <Bar
                dataKey="outstanding"
                fill="#F54900"
                barSize={26}
                radius={[6, 6, 0, 0]}
              />


            </BarChart>
          </ResponsiveContainer>

          {/* <hr className="border border-[#F3F4F5] mx-0 my-2" /> */}
          <div className="flex items-center justify-center gap-4 text-sm font-[Gilroy]">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#16A34A]" /> Collected
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#F97316]" /> Outstanding
            </span>
          </div>

        </div>



      </div>







    </div>
  )
}

export default AnalyticalCollectedOutstanding
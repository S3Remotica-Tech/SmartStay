import React, { useEffect, useState, useRef } from 'react';
import {
  Filter,
  Export, ArrowLeft,
  ArrowDown2

} from "iconsax-react";
import "react-datepicker/dist/react-datepicker.css";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


function AnalyticalExpenseTrend() {



  const navigate = useNavigate();
  const state = useSelector(state => state)
  const { RangePicker } = DatePicker;
  const [invoiceFilter, setInvoiceFilter] = useState(false)
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
         subTitle:"MonthRevenue"
    
  },
  {
    id: 2,
    title: "Collected vs Outstanding",
       subTitle:"Outstanding"
  },
  {
    id: 3,
    title: "Vacant vs Occupied Beds",
    
    subTitle:"Vacant"
  },
//   {
//     id: 4,
//     title: "Monthly Expense Trend",
//       subTitle:"MonthlyExpenseTrend"
//   },
  {
    id: 5,
    title: "Overdue Invoices Trend",
        subTitle:"OverdueInvoicesTrend"
   
  },
  {
    id: 6,
    title: "Complaints Resolved",
        subTitle:"Complaints"
    
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
              <h1 className="text-lg font-semibold my-0 text-[#222222]">Monthly Expense Trend</h1>
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
    </div>
  )
}

export default AnalyticalExpenseTrend
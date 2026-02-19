/* eslint-disable react-hooks/exhaustive-deps */
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
import { 
  // useDispatch, 
  useSelector } from "react-redux";
import ComingSoon from "../../Utils/ComingSoon";

function FinalSettlementRegister() {



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
    { title: "Receipt Register" },
     { title: "Bank Transaction Register" },
    { title: "Tenant Register" },
    { title: "Occupancy" },
    { title: "Expense Register" },
    { title: "Vendor Ledger" },
     { title: "Electricity Billing Register" },
     { title: "Complaint Register" },
    { title: "Request Register" },
    // { title: "Final Settlement" },
    { title: "Invoice Register" },
  ];

  const handleNavigateReports = () => {
    navigate(`/reports/${state.login.selectedHostel_Id}`)
  }

  const handleNavigateRegister = (item) => {
    setRegister(false)
    if (item?.title === "Tenant Register") {
      navigate(`/reports/tenant-register/${state.login?.selectedHostel_Id}`)
    } else if (item?.title === "Receipt Register") {
      navigate(`/reports/receipt-register/${state.login?.selectedHostel_Id}`)
    } else if (item?.title === "Bank Transaction Register") {
      navigate(`/reports/bank-transaction-register/${state.login?.selectedHostel_Id}`)
    } else if (item?.title === "Occupancy") {
      navigate(`/reports/occupancy-register/${state.login?.selectedHostel_Id}`)
    } else if (item?.title === "Expense Register") {
      navigate(`/reports/expense-register/${state.login?.selectedHostel_Id}`)
    } else if (item?.title === "Vendor Ledger") {
      navigate(`/reports/vendor-register/${state.login?.selectedHostel_Id}`)
    } else if (item?.title === "Electricity Billing Register") {
      navigate(`/reports/electricity-billing-register/${state.login?.selectedHostel_Id}`)
    } else if (item?.title === "Complaint Register") {
      navigate(`/reports/complaint-register/${state.login?.selectedHostel_Id}`)
    } else if (item?.title === "Request Register") {
      navigate(`/reports/request-register/${state.login?.selectedHostel_Id}`)
    } else if (item?.title === "Final Settlement") {
      navigate(`/reports/final-settlement-register/${state.login?.selectedHostel_Id}`)
    } else if (item?.title === "Invoice Register") {
      navigate(`/reports/invoice-register/${state.login?.selectedHostel_Id}`);
    }
  }

  const handleClickFilter = () => {
    // setInvoiceFilter(true)
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
              <h1 className="text-lg font-semibold my-0 text-[#222222]">FinalSettlement Register</h1>
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

            <label className="text-sm font-normal text-[#4A5565]">
              Reports / FinalSettlement Register
            </label>
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
      <div className="w-full col-span-full flex justify-center items-center" >
                          <ComingSoon />
                        </div>
    </div>
  )
}

export default FinalSettlementRegister
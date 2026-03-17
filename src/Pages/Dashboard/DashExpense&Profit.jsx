/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import {
    MoneyRecive,
    MoneySend,
    Chart2,
    Activity,
    ArrowRight,
    ArrowUp2, ArrowDown2,
    Calendar

} from "iconsax-react";
import { useDispatch, useSelector } from "react-redux";


function DashExpenseProfit() {

    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const [open, setOpen] = useState(false)
    // const [selected, setSelected] = useState("This Month");
    const [calendarOpen, setCalendarOpen] = useState(false);
    const [slectedData, setSelectedData] = useState("This Month");
    const dropdownRef = useRef(null);


    const ExpenseAnDProfit = state.PgList?.dashboardList?.finance







    const statsCards = [
        {
            title: "Revenue",
            amount: `₹ ${ExpenseAnDProfit?.totalIncome ||  0}`,
            subtitle: "this month",
            change: `${ExpenseAnDProfit?.incomeTrend || 0} %`,
            changeColor: "#EF4444",
            compareText: "vs last time",
            iconBg: "#FFFFFF",
            iconColor: "#16A34A",
            Icon: MoneyRecive,
            bgClass: "bg-gradient-to-r from-[#FFFFFF] to-[#F2FFF5]",
        },
        {
            title: "Expenses",
            amount: `₹ ${ExpenseAnDProfit?.totalExpense || 0}`,
            subtitle: "this month",
            change: `${ExpenseAnDProfit?.expenseTrend || 0} %`,
            changeColor: "#16A34A",
            compareText: "",
            iconBg: "#FFFFFF",
            iconColor: "#EF4444",
            Icon: MoneySend,
            bgClass: "bg-gradient-to-r from-[#FFFFFF] to-[#FFF6EB]",
        },
        {
            title: "Profit",
            amount: `₹ ${ExpenseAnDProfit?.netProfit || 0}`,
            subtitle: "this month",
            change: `${ExpenseAnDProfit?.profitTrend || 0} %`,
            changeColor: "#16A34A",
            compareText: "vs last time",
            iconBg: "#FFFFFF",
            iconColor: "#2563EB",
            Icon: Chart2,
            bgClass: "bg-gradient-to-r from-[#FFFFFF] to-[#F6FAFF]",
        },
    ];




    const expenseBreakdown =
        state.PgList?.dashboardList?.expenseSummary?.breakdown?.map((item, index) => {
            const colors = [
                "bg-[#155DFC]",
                "bg-[#00A63E]",
                "bg-[#F54900]",
                "bg-[#9810FA]"
            ];

            return {
                label: item.expenseType,
                amount: `₹${item.amount}`,
                percentage: item.percentage,
                barColor: colors[index % colors.length]
            };
        }) || [];

    const dateOptions =
        state.PgList?.dashboardList?.filters?.map((item) => ({
            label: item,
            value: item
        })) || [];



    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
                setCalendarOpen(false)
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);





    useEffect(() => {
        if (state.login.selectedHostel_Id) {

            dispatch({
                type: "GET_DASHBOARD_SAGA",
                payload: {
                    hostelId: state.login.selectedHostel_Id,
                    filters: {
                        financeFilter: slectedData
                    }
                }
            });

            //   setLoading(true);
        }
    }, [slectedData]);

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






    return (
        <div className="w-full mt-6 font-[Gilroy]">
            {loading && (
                <div className="fixed top-0 right-0 bottom-0 left-[200px] flex items-center justify-center bg-transparent opacity-75 z-10">
                    <div className="w-10 h-10 border-t-4 border-t-[#1E45E1] border-r-4 border-r-transparent rounded-full animate-spin"></div>
                </div>
            )}

            <div className="flex items-center justify-between mb-4">
                <h2 className="text-[18px] font-semibold text-[#0F172A] font-[Gilroy]">
                    Expenses & Profit
                </h2>

                <div className="relative">
                    <button disabled
                        onClick={() => setCalendarOpen(!calendarOpen)}
                        className="flex items-center gap-2 text-xs border rounded-md px-3 py-2 font-[Gilroy] whitespace-nowrap 
   text-black border-gray-300
  disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        <Calendar size="16" color="#1E45E1" />

                        <span>{slectedData}</span>

                        {calendarOpen ? (
                            <ArrowUp2 size="16" color="#1E45E1" />
                        ) : (
                            <ArrowDown2 size="16" color="#1E45E1" />
                        )}
                    </button>

                    {calendarOpen && (
                        <div ref={dropdownRef} className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg z-50">
                            {dateOptions.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => {
                                        setSelectedData(option.value);
                                        setCalendarOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-2 text-xs font-[Gilroy] hover:bg-gray-100
            ${slectedData === option.label
                                            ? "text-blue-600 font-medium"
                                            : "text-gray-600"
                                        }`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {statsCards.map((card, index) => {
                    const IconComponent = card.Icon;

                    return (
                        <div
                            key={index}
                            className={`rounded-xl border border-[#E5E7EB] p-3 ${card.bgClass}
  transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md`}

                            style={{ backgroundColor: card.bgGradient }}
                        >

                            <div className="flex items-center gap-2">
                                <div
                                    className="p-2 rounded-lg shadow-md "
                                    style={{ backgroundColor: card.iconBg }}
                                >
                                    <IconComponent size="20" color={card.iconColor} />
                                </div>
                                <label className="font-semibold text-base text-[#101828] font-[Gilroy]">
                                    {card.title}
                                </label>
                            </div>


                            <p className="mt-4 text-[28px] font-semibold text-[#101828] font-[Gilroy]">
                                {card.amount}{" "}
                                {/* <span className="text-sm font-normal text-[#64748B]">
                                    {card.subtitle}
                                </span> */}
                            </p>


                            <p
                                className="mt-1 text-sm font-[Gilroy]"
                                style={{ color: card.changeColor }}
                            >
                                <Activity
                                    size="16"
                                    color={`${card.changeColor}`}
                                /> {card.change}
                                {card.compareText && (
                                    <span className="text-[#64748B] ml-1">
                                        {card.compareText}
                                    </span>
                                )}
                            </p>

                            {
                                import.meta.env.MODE === "development" &&

                                <div className="mt-4 border-t pt-3 flex justify-between items-center cursor-pointer">
                                    <span className="text-sm text-[#222222] font-semibold font-[Gilroy] cursor-pointer">
                                        View Report
                                    </span>
                                    <span className="text-[#2563EB] text-lg cursor-pointer"> <ArrowRight
                                        size="16"
                                        className="text-blue-600 transition-transform group-hover:translate-x-1"
                                    /></span>
                                </div>
                            }
                        </div>
                    );
                })}
            </div>

            <div className="rounded-xl border border-[#E5E7EB] bg-white p-3 mt-[10px]">

                <div className="flex items-center  gap-3 mb-3 ">
                    <h3 className="text-[20px] font-semibold text-[#101828] font-[Gilroy]">
                        Expense Breakdown
                    </h3>
                    {/* <div className="relative">


                        <button
                            onClick={() => setOpen(!open)}
                            className="flex items-center gap-2 text-xs border rounded-md px-2 py-1 bg-white font-[Gilroy] whitespace-nowrap "
                        >



                            {open ? (
                                <ArrowUp2 size="16" color="#1E45E1" />
                            ) : (
                                <ArrowDown2 size="16" color="#6e7079" />
                            )}
                        </button>
                        {open && (
                            <div ref={dropdownRef} className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">
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
                    </div> */}
                </div>


                <div className="space-y-4">
                    {expenseBreakdown?.length === 0 ? (
                        <div className="text-center text-gray-400 text-sm py-6">
                            No Data Available
                        </div>
                    ) : (
                        expenseBreakdown.map((item, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-[14px] font-medium text-[#364153] font-[Gilroy]">
                                        {item.label}
                                    </span>

                                    <span className="text-sm text-[#101828] font-[Gilroy] font-semibold">
                                        {item.amount} ({item.percentage}%)
                                    </span>
                                </div>

                                <div className="w-full h-2 rounded-full bg-[#F1F5F9]">
                                    <div
                                        className={`h-2 rounded-full ${item.barColor}`}
                                        style={{ width: `${item.percentage}%` }}
                                    />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>





        </div>
    );
}
export default DashExpenseProfit;





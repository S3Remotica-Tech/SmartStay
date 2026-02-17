import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useHasPermission } from '../Utils/Permission';
import ErrorMessage from '../Components/ErrorMessage'
import {
  WalletMoney, ArrowRight, DocumentText, ReceiptText, Bank, UserOctagon, Home,
  Wallet, Shop, Flash, Warning2, ClipboardText,
  TrendUp,
  DollarCircle, Buildings,
  ReceiptItem,
  Clock,
  MessageText
} from "iconsax-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import ComingSoon from '../Utils/ComingSoon';
import Emptystate from "../Assets/Images/Empty-State-svg.svg";



function Reports() {

  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("operational");
  const [selectedRange, setSelectedRange] = useState(null);
  const { RangePicker } = DatePicker;
  const location = useLocation();
  const lastRangeRef = useRef(null);
  const analytical = location.state?.analytical;




  const {
    // canWriteModule: canWriteReports,
    canReadModule: canReadReports,
    // canUpdateModule: canUpdateReports,
    // canDeleteModule: canDeleteReports,
  } = useHasPermission("Reports");


  useEffect(() => {
    if (!canReadReports) {
      setLoading(false);
    }
  }, [canReadReports]);


  useEffect(() => {
    if (state.UsersList?.accessRestrictionError) {
      setLoading(false)
      setTimeout(() => {
        dispatch({ type: 'ACCESS_RESTRICTION_ERROR_REMOVE' })
      }, 1000)
    }

  }, [state.UsersList?.accessRestrictionError])








  const reportsList = state.reports?.getReportsList

  useEffect(() => {

    setLoading(false);
  }, [state.reports?.getReportsList])



  useEffect(() => {
    if (analytical) {
      setActiveTab("analytical")
    } else {
      setActiveTab("operational")
    }

  }, [analytical])

  const tabs = [
    { id: "operational", label: "Operational Reports" },
    { id: "analytical", label: "Analytical Reports" },
  ];

  const reportCards = [
    {
      title: "Invoice Register",
      subTitle: "This Month",
      desc: "Track all invoices, payments, and outstanding amounts",
      value: `₹${reportsList?.invoices?.totalAmount || 0}`,
      icon: DocumentText,
      color: "text-blue-600 bg-blue-100",

    },
    {
      title: "Receipt Register",
      subTitle: "This Month",
      desc: "Monitor all payment receipts and collections",
      value: `₹${reportsList?.receipts?.totalAmount || 0}`,
      icon: ReceiptText,
      color: "text-green-600 bg-green-100",
    },
    // {
    //   title: "Bank Transaction Register",
    //   subTitle: "Net Balance",
    //   desc: "View all banking transactions and reconciliations",
    //   value: `₹${reportsList?.banking?.totalAmount || 0}`,
    //   icon: Bank,
    //   color: "text-purple-600 bg-purple-100",
    // },
    {
      title: "Tenant Register",
      subTitle: "This Month",
      desc: "Complete tenant directory with status tracking",
      value: `${reportsList?.tenantInfo?.totalTenants || 0}`,
      icon: UserOctagon,
      color: "text-[#F59E0B] bg-[#FFEFD3E5]",

    },
    // {
    //   title: "Occupancy",
    //   subTitle: "Occupancy Rate",
    //   desc: "Real-time bed occupancy and availability status",
    //   value: `${reportsList?.tenantInfo?.occupancyRate || 0} %`,
    //   icon: Home,
    //   color: "text-cyan-600 bg-cyan-100",
    // },
    {
      title: "Expense Register",
      subTitle: "This Month",
      desc: "Track all expenses, approvals, and payments",
      value: `₹${reportsList?.expense?.totalExpenseAmount || 0}`,
      icon: Wallet,
      color: "text-red-600 bg-red-100",
    },
    // {
    //   title: "Vendor Ledger",
    //   subTitle: "Active Vendors",
    //   desc: "Vendor-wise transaction history and outstanding",
    //   value: `${reportsList?.vendor?.totalVendors || 0}`,
    //   icon: Shop,
    //   color: "text-pink-600 bg-pink-100",
    // },
    // {
    //   title: "Electricity Billing Register",
    //   subTitle: "Last Month",
    //   desc: "Meter readings, consumption, and billing records",
    //   value: `₹${reportsList?.electricity?.totalAmount || 0}`,
    //   icon: Flash,
    //   color: "text-indigo-600 bg-indigo-100",
    // },
    // {
    //   title: "Complaint Register",
    //   subTitle: "Total Complaints",
    //   desc: "Track complaints, resolution, and SLA compliance",
    //   value: `${reportsList?.complaints?.totalComplaints || 0}`,
    //   icon: Warning2,
    //   color: "text-rose-600 bg-rose-100",
    // },
    // {
    //   title: "Request Register",
    //   subTitle: "This Month",
    //   desc: "Monitor tenant requests and approval workflow",
    //   value: `${reportsList?.requests?.totalRequests || 0}`,
    //   icon: ClipboardText,
    //   color: "text-[#6366F1] bg-[#6366F115]",
    // },
    // {
    //   title: "Final Settlement",
    //   subTitle: "This Month",
    //   desc: "Security deposit refunds and settlement tracking",
    //   value: `₹${reportsList?.settlement?.totalAmount || 0}`,
    //   icon: WalletMoney,
    //   color: "text-[#14B8A6] bg-[#14B8A615]",
    // },
  ];



  const summaryData = [
    {
      label: "Total Revenue (MTD)",
      value: `₹${reportsList?.totalRevenue}`,
      valueColor: "#00A63E",
    },
    {
      label: "Outstanding Amount",
      value: `₹${reportsList?.outStandingAmount}`,
      valueColor: "#222222",
    },
    {
      label: "Active Tenants",
      value: `${reportsList?.tenantInfo?.totalTenants}`,
      valueColor: "#222222",
    },
    {
      label: "Occupancy Rate",
      value: `${reportsList?.tenantInfo?.occupancyRate} %`,
      valueColor: "#222222",
    },
  ];

  const analyticsCards = [
    {
      id: 1,
      title: "Month vs Month Revenue",
      desc: "Compare revenue performance across months with trend analysis",
      icon: TrendUp,
      color: "text-blue-600 bg-blue-100",
      subTitle: "MonthRevenue"

    },
    {
      id: 2,
      title: "Collected vs Outstanding",
      desc: "Track payment collections and outstanding amounts",
      icon: DollarCircle,
      color: "text-green-600 bg-green-100",
      subTitle: "Outstanding"
    },
    {
      id: 3,
      title: "Vacant vs Occupied Beds",
      desc: "Real-time bed occupancy and availability status",
      icon: Buildings,
      color: "text-purple-600 bg-purple-100",
      subTitle: "Vacant"
    },
    {
      id: 4,
      title: "Monthly Expense Trend",
      desc: "Track and analyze monthly expense patterns",
      icon: ReceiptItem,
      color: "text-[#F59E0B] bg-[#FFEFD3E5]",
      subTitle: "MonthlyExpenseTrend"
    },
    {
      id: 5,
      title: "Overdue Invoices Trend",
      desc: "Monitor overdue payment trends and risks",
      icon: Clock,
      color: "text-red-600 bg-red-100",
      subTitle: "OverdueInvoicesTrend"

    },
    {
      id: 6,
      title: "Complaints Resolved",
      desc: "Track complaint resolution performance",
      icon: MessageText,
      color: "text-indigo-600 bg-indigo-100",
      subTitle: "Complaints"

    }
  ];


  useEffect(() => {
    const appearOptions = {
      threshold: 0.5
    };
    const faders = document.querySelectorAll('.fade-in');
    const appearOnScro1l = new IntersectionObserver(function (entries) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        }
        else {
          entry.target.classList.add('appear');
          appearOnScro1l.unobserve(entry.target);
        }
      })
    }, appearOptions)
    faders.forEach(fader => {
      appearOnScro1l.observe(fader);
    })
  });




  useEffect(() => {
    if (state.reports.getSuccessReports === 200) {
      setLoading(false)
      dispatch({ type: 'CLEAR_GET_REPORTS_REDUCER' })
    } else {
      setLoading(false)
    }

  }, [state.reports.getSuccessReports])


  const handleNavigateRegister = (item) => {
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

  const handleNavigateAnalyTics = (item) => {
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




  const apiStart = reportsList?.startDate;
  const apiEnd = reportsList?.endDate;



  const isInitialLoad = useRef(true);

  useEffect(() => {
    if (!apiStart || !apiEnd || !isInitialLoad.current) return;

    isInitialLoad.current = false;

    setSelectedRange({
      from: dayjs(apiStart, "DD/MM/YYYY").toDate(),
      to: dayjs(apiEnd, "DD/MM/YYYY").toDate(),
    });
  }, [apiStart, apiEnd]);



  const handleDateChange = (dates) => {
    if (!dates) {
      setSelectedRange(null);
      dispatch({
        type: "GET_REEPORTS_SAGA",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          filters: {},
        },
      });
      return;
    }

    const [from, to] = dates;

    setSelectedRange({
      from: from ? from.toDate() : null,
      to: to ? to.toDate() : null,
    });
  };

  const startDate = useMemo(() => {
    return selectedRange?.from
      ? dayjs(selectedRange.from).format("DD-MM-YYYY")
      : undefined;
  }, [selectedRange?.from]);

  const endDate = useMemo(() => {
    return selectedRange?.to
      ? dayjs(selectedRange.to).format("DD-MM-YYYY")
      : undefined;
  }, [selectedRange?.to]);




  useEffect(() => {
    if (!state.login?.selectedHostel_Id) return;

    dispatch({
      type: "GET_REEPORTS_SAGA",
      payload: {
        hostelId: state.login.selectedHostel_Id,
        filters: {
          startDate: startDate,
          endDate: endDate,
        },
      },
    });
    setLoading(true);
  }, [
    state.login?.selectedHostel_Id,
    startDate,
    endDate,]);


  useEffect(() => {
    return () => {
      dispatch({
        type: "GET_REEPORTS_SAGA",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          filters: {
          },
        },
      });
    }
  }, [])


  useEffect(() => {
    if (state.createAccount?.networkError) {
      setLoading(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NETWORK_ERROR' })
      }, 3000)
    }

  }, [state.createAccount?.networkError])

  return (

    <div className="w-full h-screen flex flex-col font-[Gilroy] px-0 mt-px">

      {loading && (
        <div className="fixed top-0 right-0 bottom-0 left-[200px] flex items-center justify-center bg-transparent opacity-75 z-10">
          <div className="w-10 h-10 border-t-4 border-t-[#1E45E1] border-r-4 border-r-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="sticky top-0 z-20 bg-white  flex justify-between">


        <div className="px-2 flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2 text-base font-semibold transition ${activeTab === tab.id
                ? "text-[#1E45E1] border-b-2 border-[#1E45E1]"
                : "text-[#64748B]"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
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
            onChange={handleDateChange}
            disabledDate={(current) => {

              if (current && current > dayjs().endOf("day")) {
                return true;
              }

              return false;
            }}

            getPopupContainer={(triggerNode) =>
              triggerNode.closest(".datepicker-wrapper")
            }
          />
        </div>

      </div>

      {!canReadReports ? (
        <div className="flex-1 flex items-center justify-center">
          <div>
            <img src={Emptystate} alt="Empty State" />
            <ErrorMessage
              message={['You do not have access to view Reports']}
              type="warning"
            />
          </div>
        </div>
      ) : (

        <div className="flex-1 overflow-y-auto p-0 my-3 show-scrolls">
          {
            activeTab === "operational" && <div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-[Gilroy] my-2">
                {summaryData?.map((item, index) => {



                  return (
                    <div
                      key={index}
                      className="flex items-center justify-items-center gap-4 rounded-xl border border-[#E5E7EB] bg-white p-3"
                    >
                      <div>
                        <div>
                          <label className="text-sm text-gray-500 font-medium">
                            {item.label}
                          </label></div>
                        <div>
                          <label style={{ color: item.valueColor }}
                            className={`mt-1 text-xl font-semibold `}
                          >
                            {item.value}
                          </label>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3">
                {reportCards.map((item, idx) => {
                  const Icon = item.icon;

                  const isDev = import.meta.env.MODE === "development";
                  const isProd = import.meta.env.MODE === "production";

                  const allowedRegisters = [
                    "Invoice Register",
                    "Expense Register",
                    "Receipt Register",
                    "Tenant Register",
                  ];

                  const isClickable =
                    (isDev && allowedRegisters.includes(item.title) )|| (isProd && allowedRegisters.includes(item.title));

                  return (
                    <div
                      key={idx}
                      className="rounded-2xl  border border-[#E5E7EB] bg-white p-3 hover:shadow-md transition"
                    >
                      <div className={`p-2 rounded-lg w-fit my-1 ${item.color}`}>
                        <Icon size={22} variant="Bold" />
                      </div>
                      <div className="flex items-start gap-4">

                        <div className="flex-1">
                          <h3 className="text-sm font-semibold text-[#101828">
                            {item.title}
                          </h3>
                          <p className="text-xs text-[#4A5565] mt-1">
                            {item.desc}
                          </p>
                          <label className='text-xs text-[#6A7282]'> {item.subTitle}</label>
                        </div>
                      </div>

                      {item.value ? (
                        <div className="mt-2 text-xl font-semibold text-[#101828]">
                          {item.value}
                        </div>
                      ) : (
                        <div className="mt-2 h-6" />
                      )}
                      <hr className="my-2 border-t border-[#F3F4F6] opacity-80" />
                      <div
                        className={`mt-3 flex items-center justify-between gap-1 group
    ${isClickable ? "cursor-pointer" : "cursor-not-allowed opacity-60"}
  `}
                        onClick={() => {
                          if (isClickable) {
                            handleNavigateRegister(item);
                          }
                        }}
                      >
                        <span
                          className={`text-sm font-semibold
      ${isClickable ? "text-[#155DFC] group-hover:underline" : "text-gray-400"}
    `}
                        >
                          {isClickable ? "View Report" : "Coming Soon"}
                        </span>

                        <ArrowRight
                          size="16"
                          className={`transition-transform
      ${isClickable ? "text-blue-600 group-hover:translate-x-1" : "text-gray-400"}
    `}
                        />
                      </div>







                    </div>
                  );
                })}
              </div>
            </div>
          }

          {activeTab === "analytical" && import.meta.env.MODE === "development" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {analyticsCards?.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl  border border-[#E5E7EB] bg-white p-3 hover:shadow-md transition h-full"
                  >
                    <div className={`p-2 rounded-lg w-fit my-1 ${item.color}`}>
                      <Icon size={22} variant="Bold" />
                    </div>
                    <div className="flex items-start gap-4 h-[70px]">

                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-[#101828">
                          {item.title}
                        </h3>
                        <p className="text-xs text-[#4A5565] mt-1">
                          {item.desc}
                        </p>

                      </div>
                    </div>

                    {item.value && (
                      <div className="mt-2 text-xl font-semibold text-[#101828]">
                        {item.value}
                      </div>
                    )}
                    <hr className="my-2 border-t border-[#F3F4F6] opacity-80" />

                    <div className="mt-3 flex items-center justify-between gap-1 group cursor-pointer" onClick={() => handleNavigateAnalyTics
                      (item)}>
                      <span className="text-sm font-semibold text-[#155DFC] group-hover:underline" >
                        View Analytics
                      </span>

                      <ArrowRight
                        size="16"
                        className="text-blue-600 transition-transform group-hover:translate-x-1"
                      />
                    </div>

                  </div>
                );
              })}
            </div>
          )
            :

            activeTab === "analytical" && import.meta.env.MODE === "production" &&
            <ComingSoon />
          }
        </div>
      )}
    </div>

  )
}

export default Reports



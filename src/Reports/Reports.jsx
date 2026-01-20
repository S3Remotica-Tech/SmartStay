import React, { useEffect, useState } from 'react';
import { useHasPermission } from '../Utils/Permission';
import ErrorMessage from '../Components/ErrorMessage'
import { WalletMoney, ArrowRight, DocumentText, ReceiptText, Bank, UserOctagon, Home, 
  Wallet, Shop, Flash, Warning2, ClipboardText } from "iconsax-react";
import { useNavigate } from "react-router-dom";




function Reports() {

  // const dispatch = useDispatch()
  // const state = useSelector(state => state.createAccount)

const navigate = useNavigate();





  const {
    // canWriteModule: canWriteReports,
    canReadModule: canReadReports,
    // canUpdateModule: canUpdateReports,
    // canDeleteModule: canDeleteReports,
  } = useHasPermission("Reports");



  const [activeTab, setActiveTab] = useState("operational");


  const tabs = [
    { id: "operational", label: "Operational Reports" },
    { id: "analytical", label: "Analytical Reports" },
  ];

  const reportCards = [
    {
      title: "Invoices",
      subTitle: "This Month",
      desc: "Track all invoices, payments, and outstanding amounts",
      value: "₹1,60,000",
      icon: DocumentText,
      color: "text-blue-600 bg-blue-100",
      route: "/reports/invoice-register",

    },
    {
      title: "Receipt Register",
      subTitle: "This Month",
      desc: "Monitor all payment receipts and collections",
      value: "₹1,52,350",
      icon: ReceiptText,
      color: "text-green-600 bg-green-100",
    },
    {
      title: "Bank Transaction Register",
      subTitle: "Net Balance",
      desc: "View all banking transactions and reconciliations",
      value: "₹80,350",
      icon: Bank,
      color: "text-purple-600 bg-purple-100",
    },
    {
      title: "Tenant Register",
      subTitle: "This Month",
      desc: "Complete tenant directory with status tracking",
      value: "24",
      icon: UserOctagon,
      color: "text-[#F59E0B] bg-[#FFEFD3E5]",
    },
    {
      title: "Occupancy",
      subTitle: "Occupancy Rate",
      desc: "Real-time bed occupancy and availability status",
      value: "87%",
      icon: Home,
      color: "text-cyan-600 bg-cyan-100",
    },
    {
      title: "Expense Register",
      subTitle: "This Month",
      desc: "Track all expenses, approvals, and payments",
      value: "₹57,000",
      icon: Wallet,
      color: "text-red-600 bg-red-100",
    },
    {
      title: "Vendor Ledger",
      subTitle: "Active Vendors",
      desc: "Vendor-wise transaction history and outstanding",
      value: "12",
      icon: Shop,
      color: "text-pink-600 bg-pink-100",
    },
    {
      title: "Electricity Billing Register",
      subTitle: "This Month",
      desc: "Meter readings, consumption, and billing records",
      value: "₹8,450",
      icon: Flash,
      color: "text-indigo-600 bg-indigo-100",
    },
    {
      title: "Complaint Register",
      subTitle: "Total Complaints",
      desc: "Track complaints, resolution, and SLA compliance",
      value: "27",
      icon: Warning2,
      color: "text-rose-600 bg-rose-100",
    },
    {
      title: "Request Register",
      subTitle: "This Month",
      desc: "Monitor tenant requests and approval workflow",
      value: "",
      icon: ClipboardText,
      color: "text-[#6366F1] bg-[#6366F115]",
    },
    {
      title: "Final Settlement",
      subTitle: "This Month",
      desc: "Security deposit refunds and settlement tracking",
      value: "",
      icon: WalletMoney,
      color: "text-[#14B8A6] bg-[#14B8A615]",
    },
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




  const summaryData = [
    {
      label: "Total Revenue (MTD)",
      value: "₹1,52,350",
      valueColor: "#00A63E",
    },
    {
      label: "Outstanding Amount",
      value: "₹7,650",
      valueColor: "#222222",
    },
    {
      label: "Active Tenants",
      value: "24",
      valueColor: "#222222",
    },
    {
      label: "Occupancy Rate",
      value: "87%",
      valueColor: "#222222",
    },
  ];


  return (

    <div className="w-full h-screen flex flex-col font-[Gilroy] px-0">


      <div className="sticky top-0 z-20 bg-white ">


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
      </div>

      {!canReadReports ? (
        <div className="flex-1 flex items-center justify-center">
          <ErrorMessage
            message={['You do not have access to view Reports']}
            type="warning"
          />
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

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {reportCards.map((item, idx) => {
                  const Icon = item.icon;
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

                      <div className="mt-3 flex items-center justify-between gap-1 group cursor-pointer"  onClick={() => item.route && navigate(item.route)}>
                        <span className="text-sm font-semibold text-[#155DFC] group-hover:underline" >
                          View Report
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
            </div>
          }
        </div>
      )}
    </div>





  )
}

export default Reports



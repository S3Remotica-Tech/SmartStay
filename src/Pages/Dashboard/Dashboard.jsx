/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import "../../Pages/Dashboard/Dashboard.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import vector from "../../Assets/Images/New_images/Asset_Arrow.png";
import key from "../../Assets/Images/key.png";
import clock from "../../Assets/Images/Car.png";
import { useDispatch, useSelector } from "react-redux";
import drop from "../../Assets/Images/New_images/arrow-down.png";
import DashboardAnnouncement from "../../Pages/Dashboard/DashboardAnnouncement";
import DashboardUpdates from "../../Pages/Dashboard/DashboardUpdates";
// import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
// import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
// import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { MdWarningAmber } from "react-icons/md";
import ErrorMessage from '../../Components/ErrorMessage';
import withErrorBoundary from "../../Hoc/WithErrorBountry";
import Select from "react-select";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import Emptystate from "../../Assets/Images/Empty-State.jpg";
import LoaderComponent from "../OthersComponent/LoaderComponent";
import PropTypes from "prop-types";
import Marquee from "react-fast-marquee";
import pendingimg from "../../Assets/Images/New_images/pending_rent.png";
import currentMatch from "../../Assets/Images/New_images/currentmatch.png";
import activeImage from "../../Assets/Images/New_images/Active compliant.png";
import coinImage from "../../Assets/Images/New_images/coinimage.png";
import advancedHand from "../../Assets/Images/New_images/AdvancedHand.png";
import newBooking from "../../Assets/Images/New_images/NewBooking.png";
import { Tabs, Tab } from "react-bootstrap";
import { useHasPermission } from '../../Utils/Permission';
import {
  Buildings,
  // Bed,
  Profile2User,
  WalletMoney,
  InfoCircle,
  ArrowUp2,
  ArrowDown2,
  ArrowUp,
  DocumentText,
  Calendar,
  ArrowRight2,
  ExportSquare
} from "iconsax-react";
import ProgressBar from 'react-bootstrap/ProgressBar';


function Dashboard() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [dashboardList, setDashboardList] = useState('');
  const [activeTab, setActiveTab] = useState("1");

  const [openCards, setOpenCards] = useState({});

  const [selectedMonth, setSelectedMonth] = useState([]);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectExpence, setSelectExpence] = useState("this_month");
  const [selectCashback, setSelectCashback] = useState("this_month");
  const [selectRevenu, setSelectRevenu] = useState("six_month");

  const [loading, setLoading] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [daysLeft, setDaysLeft] = useState(null);
  const [selectAdvance, setSelectAdvance] = useState("six_month");
  const [selected, setSelected] = useState("This Month");
  const dropdownRef = useRef(null);
  const [open, setOpen] = useState(false);
  const {
    // canWriteModule: canWriteComplaints,
    canReadModule: canReadDashboard,
    // canUpdateModule: canUpdateComplaints,
    // canDeleteModule: canDeleteComplaints,
  } = useHasPermission("Dashboard");

  useEffect(() => {
    if (!canReadDashboard) {
      setLoading(false);
    }
  }, [canReadDashboard]);




  const dashboardCards = [
    {
      id: 1,
      title: "Rooms & Beds",
      icon: Buildings,
      iconColor: "text-[#155DFC]",
      iconBg: "bg-[#EFF6FF]",
      stats: [
        { label: "Total Rooms", value1: "20", value2: 24 },
        { label: "Total Beds", value1: "53" },
      ],
      footer: "Sharing Breakdown",
      sharingData: [
        { label: "1-share", value: 12, percent: 40 },
        { label: "2-share", value: 24, percent: 70 },
        { label: "3-share", value: 12, percent: 40 },
      ]
    },
    {
      id: 2,
      title: "Occupancy",
      icon: WalletMoney,
      iconColor: "text-[#00A63E]",
      iconBg: "bg-[#F0FDF4]",
      stats: [
        { label: "Occupied Beds", value1: "43", valueColor: "text-green-600" },
        { label: "Available Beds", value1: "10", valueColor: "text-red-500" },
      ],
      footer: "Occupancy Rate",
      nextMonth: "3% from last month",
      sharingData: [
        { percent: 85 },

      ]
    },
    {
      id: 3,
      title: "Tenants",
      icon: Profile2User,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-100",
      stats: [
        { label: "Total Tenants", value1: "306" },
        { label: "Check-in Tenants", value1: "43", valueColor: "text-green-600" },
      ],
      footer: "Notice Period",
      footerValue: "4 Tenants",
      nextCheckout: "Feb 20, 2026"
    },
    {
      id: 4,
      title: "Advance Holding",
      icon: WalletMoney,
      iconColor: "text-orange-600",
      iconBg: "bg-orange-100",
      stats: [
        { label: "Total Advance", value1: "₹1.5L" },
        { label: "Refunded", value1: "₹10,000", valueColor: "text-red-500" },

      ],
      footer: "Others",
    },
  ];


  const dateOptions = [
    "Today",
    "This Week",
    "This Month",
    "Last Month",
    "Last 3 Months",
  ];

  const toggleCard = (id) => {
    setOpenCards((prev) => ({
      ...Object.keys(prev).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {}),
      [id]: !prev[id],
    }));
  };



  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const billingSummary = {
    title: "Billing Summary",
    invoices: 36,
    totalAmount: "₹ 3,24,000",
    collected: "₹ 54,000",
    outstanding: "₹ 2,70,000",
    collectionRate: 24,
    trend: "3% from last month",
  };


  // useEffect(() => {
  //   throw new Error("Test HOC Error Boundary");
  // }, []);


  // const monthNames = [
  //   "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  //   "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  // ];


  const tabs = [
    { id: "checkin", label: "New Check-ins", count: 3 },
    { id: "overdue", label: "Overdue Invoices", count: 7 },
  ];

  const checkinList = [
    {
      id: 1,
      name: "Mathubala",
      sharing: "1-Sharing",
      room: "Room B",
      bed: "101",
      date: "Check-in: Jan 18, 2026",
    },
    {
      id: 2,
      name: "Jasvika",
      sharing: "1-Sharing",
      room: "Room B",
      bed: "101",
      date: "Check-in: Jan 20, 2026",
    },
    {
      id: 3,
      name: "Baby",
      sharing: "1-Sharing",
      room: "Room B",
      bed: "101",
      date: "Check-in: Jan 20, 2026",
    },
  ];









  const remainingDays = state.UsersList?.hotelDetailsinPg?.remainingDaysLeft

  useEffect(() => {
    if (remainingDays !== undefined && remainingDays !== null) {
      setDaysLeft(remainingDays);
      setShowWarning(remainingDays <= 15);
    }
  }, [remainingDays]);



  const handleOkClick = () => {
    setShowWarning(false);
  };

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      dispatch({ type: "PGDASHBOARD", payload: state.login.selectedHostel_Id });
      setLoading(true);
    }
  }, [state.login.selectedHostel_Id]);

  // const handleSelectedReceived = (e) => {
  //   setSelectCashback(e.target.value);
  // };
  // const handleSelectedRevenue = (e) => {
  //   setSelectRevenu(e.target.value);
  // };
  // const handleSelectedAdvance = (e) => {
  //   setSelectAdvance(e.target.value);
  // };

  useEffect(() => {
    if (state.PgList?.statusCodeForAdvanceFilter === 200) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_DASHBOARD_FILTER_ADVANCE" });
      }, 1000);
    }
  }, [state.PgList?.statusCodeForAdvanceFilter]);


  useEffect(() => {
    const cashBackDataRevenu =
      state.PgList?.dashboardFilterRevenu?.cash_back_data;
    setData(cashBackDataRevenu);
  }, [state.PgList?.dashboardFilterRevenu?.cash_back_data]);

  useEffect(() => {
    if (state.PgList?.statusCodeForDashboardFilterRevenue === 200) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_DASHBOARD_FILTER_REVENUE" });
      }, 1000);
    }
  }, [state.PgList?.statusCodeForDashboardFilterRevenue]);

  useEffect(() => {
    if (state.PgList?.statusCodeForDashboardFilterCashBack === 200) {
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_DASHBOARD_FILTER_DETAILS_CASHBACK" });
      }, 1000);
    }
  }, [state.PgList?.statusCodeForDashboardFilterCashBack]);

  useEffect(() => {
    if (state.PgList?.NoDashboardStatusCode === 201) {
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NO_DASHBOARD_LIST" });
      }, 1000);
    }
  }, [state.PgList?.NoDashboardStatusCode]);

  const handleSelectedExpenses = (e) => {
    setSelectExpence(e.target.value);

  };

  const handleChanges = (event, key) => {
    setActiveTab(key);
  };

  useEffect(() => {
    const appearOptions = {
      threshold: 0.5,
    };
    const faders = document.querySelectorAll(".fade-in");
    const appearOnScro1l = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        } else {
          entry.target.classList.add("appear");
          appearOnScro1l.unobserve(entry.target);
        }
      });
    }, appearOptions);
    faders.forEach((fader) => {
      appearOnScro1l.observe(fader);
    });
  });

  // useEffect(() => {
  //   setTotalAmount(state.PgList?.dashboardFilter?.total_amount);
  // }, [state.PgList?.dashboardFilter?.total_amount]);



  // useEffect(() => {
  //   setLables(state.PgList?.dashboardFilter?.exp_data || []);
  // }, [state.PgList?.dashboardFilter?.exp_data]);

  useEffect(() => {
    if (state.PgList?.statusCodeForDashboardFilter === 200) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_DASHBOARD_FILTER_DETAILS" });
      }, 1000);
    }
  }, [state.PgList?.statusCodeForDashboardFilter]);

  useState(() => {
    if (state.PgList.statuscodeForDashboard === 200) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_CREATE_PG_DASHBOARD" });
      }, 200);
    }
  }, [state.PgList.statuscodeForDashboard]);

  useEffect(() => {
    if (state.PgList?.dashboardDetails) {
      setLoading(false)
      setDashboardList(state.PgList?.dashboardDetails);

    }
  }, [state.PgList?.dashboardDetails]);



  // useEffect(() => {
  //   setCashBackData(state.PgList?.dashboardFilterCashback?.cash_back_data);
  // }, [state.PgList?.dashboardFilterCashback?.cash_back_data]);

  // const currentvalue =
  //   (Number(cashBackDataSample?.[0]?.Revenue) || 0) +
  //   (Number(cashBackDataSample?.[0]?.overdue) || 0);

  // const percentage = currentvalue
  //   ? ((currentvalue - Number(cashBackDataSample?.[0]?.overdue)) / currentvalue) * 100
  //   : 0;

  // const pathColor =
  //   currentvalue > 0
  //     ? cashBackDataSample?.[0]?.overdue > 0
  //       ? "#00A32E"
  //       : "#EBEBEB"
  //     : "#EBEBEB";
  const trailColor = "#EBEBEB";

  const currentDate = new Date();
  const months = [];

  for (let i = 5; i >= 0; i--) {
    const date = new Date(currentDate);
    date.setMonth(currentDate.getMonth() - i);
    const monthYear = date.toISOString().substring(0, 7);
    months.push({ month: monthYear, revenue: 0, expense: 0 });
  }

  const fixedColors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#E7E9ED",
    "#8DD35F",
    "#D65DB1",
    "#6A4C93",
  ];

  // const datum = {
  //   labels: lablesdata?.map((category) => category.category_Name),
  //   datasets: [
  //     {
  //       data: lablesdata?.map((category) => category.purchase_amount),
  //       backgroundColor: lablesdata?.map(
  //         (_, index) => fixedColors[index % fixedColors.length]
  //       ),
  //       hoverBackgroundColor: lablesdata?.map(
  //         (_, index) => fixedColors[index % fixedColors.length]
  //       ),
  //       borderWidth: 5,
  //       borderColor: "#fff",
  //       borderRadius: 10,
  //     },
  //   ],
  // };
  // const options = {
  //   responsive: true,
  //   maintainAspectRatio: false,
  //   cutout: "75%",
  //   plugins: {
  //     legend: {
  //       display: false,
  //     },
  //     tooltip: {
  //       enabled: false,
  //     },
  //   },
  //   elements: {
  //     arc: {
  //       borderRadius: 2,
  //     },
  //   },
  // };

  // const { datasets } = datum;



  // const CustomLegend = ({ payload }) => {
  //   return (
  //     <div className="flex justify-center items-center pt-4" >
  //       {payload.map((entry, index) => (
  //         <div
  //           key={`item-${index}`}
  //           className="flex items-center mr-2.5 mt-6">
  //           <div className="w-3 h-3 rounded-full mr-1.5"
  //             style={{ backgroundColor: entry.color }}
  //           />
  //           <span className="text-xs font-semibold font-montserrat">
  //             {entry.value}
  //           </span>
  //         </div>
  //       ))}
  //     </div>
  //   );
  // };


  const [activeTabDashboard, setActiveTabDashboard] = useState("checkin");
















  return (


    <>
      <div className="w-full h-screen  bg-[#FAFAFA] px-3 py-3  grid grid-rows-[auto_1fr]">
        <Marquee pauseOnHover gradient={false}>
          {showWarning && (
            <div className={` mb-[10px] flex flex-col sm:flex-row justify-between items-center gap-2 px-4 py-2 rounded-lg w-full max-w-4xl mx-auto text-base font-gilroy border

  ${daysLeft > 0

                ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                : "bg-red-100 text-red-800 border-red-200"
              }
`}

              role="alert"
            >

              <div className="flex items-center gap-2">
                {daysLeft > 0 ? (
                  <>
                    <MdWarningAmber className="text-yellow-400 text-2xl" />

                    <span>
                      Your plan will expire in{" "}
                      <strong>{daysLeft}</strong> day{daysLeft > 1 ? "s" : ""}!
                    </span>
                  </>
                ) : (
                  <span className="font-gilroy font-semibold">
                    Your plan has expired!
                  </span>
                )}
              </div>


              <button className={`ms-3 px-3 py-1.5 text-sm rounded-md font-gilroy text-white transition-colors ${daysLeft > 0
                ? "bg-yellow-400 hover:bg-yellow-500"
                : "bg-red-500 hover:bg-red-600"
                }`}


                onClick={handleOkClick}
              >
                OK
              </button>
            </div>
          )}
        </Marquee>

        <TabContext value={activeTab} >
          <div className="w-full px-3 sticky top-0 z-[1000] bg-white py-3  border border-[#E5E7EB] rounded-xl" >
            <Tabs
              id="dashboard-tabs"
              activeKey={activeTab}
              onSelect={(k) => handleChanges(null, k)}
              className={`${isSmallScreen ? "flex flex-col items-center" : "flex items-center"} 
    w-1/2 gap-3  border-0 custom-tabs items-center`}
            >
              <Tab
                eventKey="1"
                title={
                  <span
                    className={`
          inline-block capitalize text-base font-medium font-[Gilroy]
          ${activeTab === "1" ? "text-[#1E45E1]  bg-[#F6F8FF] px-[15px] py-[10px] rounded-lg  text-base font-medium" : " px-[15px] py-[10px]  text-[#4B4B4B] text-base font-medium  bg-[#FFFFFF]"}
        
        `}
                  >
                    Dashboard
                  </span>
                }
              />

              <Tab
                eventKey="2"
                title={
                  <span
                    className={`
          inline-block capitalize text-base font-medium font-[Gilroy]
          ${activeTab === "2" ? "text-[#1E45E1]  bg-[#F6F8FF] px-[15px] py-[10px] rounded-lg  text-base font-medium" : " px-[15px] py-[10px]  text-[#4B4B4B] text-base font-medium  bg-[#FFFFFF]"}
       
        `}
                  >
                    Announcement
                  </span>
                }
              />

              <Tab
                eventKey="3"
                title={
                  <span
                    className={`
          inline-block capitalize text-base font-medium font-[Gilroy]
          ${activeTab === "3" ? "text-[#1E45E1]  bg-[#F6F8FF] px-[15px] py-[10px] rounded-lg  text-base font-medium" : " px-[15px] py-[10px]  text-[#4B4B4B] text-base font-medium  bg-[#FFFFFF]"}
        `}
                  >
                    Updates
                  </span>
                }
              />
            </Tabs>





          </div>

          {loading && <LoaderComponent />}

          <div >
            <TabPanel value="1">
              {(!canReadDashboard && !loading) ? (
                <div
                  className="flex flex-col items-center justify-center mt-24">

                  <img
                    src={Emptystate}
                    alt="Empty State"
                  />
                  <ErrorMessage message={['You do not have access to view Dashboard']} type="warning" />

                </div>
              ) : (
                <div className="max-h-[calc(100vh-120px)] overflow-y-auto">


                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-[10px]">
                    {dashboardCards.map((card) => {
                      const Icon = card.icon;

                      return (
                        <div
                          key={card.id}
                          className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
                        >

                          <div className="flex items-center justify-between  mb-4">
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-9 h-9 rounded-lg flex items-center justify-center ${card.iconBg}`}
                              >
                                <Icon size="20" className={card.iconColor} variant="Bulk" />
                              </div>

                              <h3 className="text-[14px] font-semibold text-[#101828] font-[Gilroy]">
                                {card.title}
                              </h3>
                            </div>
                            {["Occupancy", "Tenants", "Advance Holding"].includes(card.title) && (
                              <div className="relative">
                                <span
                                  onClick={() => toggleCard(card.id)}
                                  className="ml-2 bg-white border border-[#D1D5DC] rounded p-1 cursor-pointer whitespace-nowrap inline-flex"
                                >
                                  {openCards[card.id] ? (
                                    <ArrowUp2 size="16" color="#1E45E1" />
                                  ) : (
                                    <ArrowDown2 size="16" color="#1E45E1" />
                                  )}
                                </span>

                                {openCards[card.id] && (
                                  <div
                                    ref={dropdownRef}
                                    className="animate-fadeIn absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg z-50 py-1"
                                  >
                                    {dateOptions.map((option) => {
                                      const isActive = selected === option;

                                      return (
                                        <button
                                          key={option}
                                          onClick={() => {
                                            setSelectedMonth(option);
                                           setOpenCards({});
                                          }}
                                          className={`
            w-full text-left px-4 py-2 text-xs font-[Gilroy]
             transition
            ${isActive
                                              ? "border-l-2 border-[#1E45E1] bg-[#F6F8FF] text-[#222] font-medium"
                                              : "text-gray-600 hover:bg-[#F6F8FF]"
                                            }
          `}
                                        >
                                          {option}
                                        </button>
                                      );
                                    })}
                                  </div>
                                )}

                              </div>
                            )}



                          </div>


                          <div className="space-y-2">
                            {card.stats.map((stat, index) => (
                              <div key={index} className="flex justify-between items-center">
                                <span className="text-[#4A5565] font-[Gilroy] font-semibold text-sm">
                                  {stat.label}
                                </span>

                                <span
                                  className={`font-semibold font-[Gilroy] text-xl ${stat.valueColor || "text-[#737373]"
                                    }`}
                                >
                                  {stat.value1}
                                  {stat.value2 && (
                                    <span className="text-[#101828] ml-1">
                                      / {stat.value2}
                                    </span>
                                  )}
                                </span>
                              </div>
                            ))}
                          </div>


                          {card.footer && (
                            <div className="mt-3 pt-3 border-t text-xs text-gray-500  font-[Gilroy]">

                              <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-semibold text-gray-700 font-[Gilroy]">
                                  {card.footer}
                                </h3>
                                {card.title === "Rooms & Beds" && (
                                  <InfoCircle size="18" className="text-gray-400" variant="Outline" />
                                )}
                                {
                                  card.title === "Occupancy" &&
                                  <h3 className="text-sm font-semibold text-[#101828] font-[Gilroy]">
                                    45%
                                  </h3>
                                }
                                {
                                  card.title === "Advance Holding" && <span className="text-[#00A63E] font-[Gilroy] font-semibold text-sm">₹54,000</span>
                                }

                                {card.footerValue && (
                                  <span className="text-[#F97316] font-semibold bg-[#FFF8F0] px-2 py-2 rounded">
                                    {card.footerValue}
                                  </span>
                                )}

                              </div>
                              <div className="space-y-2">
                                {card?.sharingData?.map((item, index) => (
                                  <div key={index} className="flex items-center gap-3">

                                    <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">



                                      {
                                        card.title === "Occupancy" ?
                                          <div
                                            className="h-full bg-[#00C950] rounded-full transition-all"
                                            style={{ width: `${item.percent}%` }}
                                          />
                                          :
                                          <ProgressBar now={item.percent} />

                                      }


                                    </div>
                                    {card.title === "Rooms & Beds" &&

                                      <span className="text-sm text-gray-600 font-[Gilroy] min-w-[90px] text-right">
                                        {item.label}:{" "}
                                        <span className="font-semibold text-gray-900">
                                          {item.value}
                                        </span>
                                      </span>
                                    }
                                  </div>
                                ))}
                              </div>


                              {
                                card.title === "Advance Holding" &&
                                <>
                                  <span>Non-Refundable & more</span>
                                </>

                              }

                              {
                                card.nextMonth && (
                                  <span className="text-gray-900 font-medium my-2 flex">
                                    <ArrowUp
                                      size="16"
                                      color="#6A7282"
                                    />{card.nextMonth}
                                  </span>
                                )
                              }

                              {card.nextCheckout &&
                                <span className="text-gray-900 font-medium my-2 flex"> Next Checkout:{card.nextCheckout}</span>
                              }
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>



                  <div className="mt-6 font-[Gilroy]">
                    <h2 className="text-lg font-semibold text-[#101828] mb-4 font-[Gilroy]">
                      Quick Access & Follow-ups
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">


                      <div className="bg-white rounded-xl border border-[#E5E7EB] lg:col-span-5 p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
                              <DocumentText size="18" color="#F97316" variant="Bulk" />
                            </div>
                            <h3 className="font-semibold text-base text-[#101828] my-0 ">
                              {billingSummary.title}
                            </h3>
                          </div>

                          <div className="relative" ref={dropdownRef}>

                            <button
                              onClick={() => setOpen(!open)}
                              className="flex items-center gap-2 text-xs border rounded-md px-3 py-2 bg-white font-[Gilroy] whitespace-nowrap "
                            >
                              <Calendar size="16" />
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
                        </div>

                        <div className="flex justify-between ">
                          <span className="text-[#4A5565 font-medium text-xs">Invoices Generated</span>
                          <span className="font-semibold text-[#222222] ">{billingSummary.invoices}</span>
                        </div>

                        <div className="flex justify-between text-sm">
                          <span className="text-[#4A5565 font-medium text-xs">Total Amount</span>
                          <span className="font-semibold text-green-600 text-base">
                            ₹ {billingSummary.totalAmount}
                          </span>
                        </div>
                        <hr className="border border-[#F3F4F5] mx-0" />
                        <div className="flex justify-between text-sm">
                          <span className="text-[#4A5565 font-medium text-xs">Collected</span>
                          <span className="font-semibold text-green-600 text-base">
                            ₹{billingSummary.collected}
                          </span>
                        </div>



                        <div className="flex justify-between text-sm">
                          <span className="flex items-center gap-1 text-[#4A5565 font-medium text-xs">
                            Outstanding  <ExportSquare
                              size="14"
                              color="#1E45E1"
                            />
                          </span>
                          <span className="font-semibold text-green-600 text-base ">
                            ₹  {billingSummary.outstanding}
                          </span>
                        </div>
                        <hr className="border border-[#F3F4F5] mx-0" />
                        <div className="">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-[#4A5565 font-medium text-xs"> Collection Rate</span>
                            <span className="font-semibold">
                              {billingSummary.collectionRate}%
                            </span>
                          </div>
                          <div className="h-2 rounded-full bg-gray-100">
                            <div
                              className="h-full bg-[#F54900] rounded-full transition-all"
                              style={{ width: `${billingSummary.collectionRate}%` }}
                            />

                          </div>
                          <p className="text-xs text-gray-500 mt-1 flex ">
                            <ArrowUp
                              size="16"
                              color="#6A7282"
                            /> {billingSummary.trend}
                          </p>
                        </div>
                      </div>


                      <div className="bg-white rounded-xl border border-[#E5E7EB]  p-4 lg:col-span-7">


                        <div className="flex border-b border-[#F3F3F3] justify-around mb-3 w-full">
                          {tabs.map((tab) => (
                            <button
                              key={tab.id}
                              onClick={() => setActiveTabDashboard(tab.id)}
                              className={`px-4 py-2 text-sm font-medium ${activeTabDashboard === tab.id
                                ? "border-b-2 border-[#1E45E1] text-[#1E45E1]"
                                : "text-gray-500"
                                }`}
                            >
                              {tab.label} ({tab.count})
                            </button>
                          ))}
                        </div>

                        {/* List */}
                        <div className="space-y-3 max-h-[280px] overflow-y-auto show-scrolls">
                          {checkinList.map((item) => (
                            <div
                              key={item.id}
                              className="flex justify-between items-center border-b pb-3"
                            >
                              <div >
                                <p className="font-semibold text-base">{item.name}</p>
                                <div className="flex gap-2">
                                  <p className="text-xs text-[#4A5565] text-xs">{item.sharing}</p>
                                  <p className="text-xs text-[#4A5565] text-xs">{item.room}</p>
                                  <p className="text-xs text-[#4A5565] text-xs">{item.bed}</p>
                                  <p className="text-xs text-[#4A5565] text-xs">{item.date}</p>
                                </div>
                              </div>

                              <div className="flex gap-2">
                                <button className="border rounded-md px-3 py-1 text-sm">
                                  View
                                </button>
                                <button className="bg-[#1E45E1] text-white rounded-md px-3 py-1 text-sm">
                                  Check-in
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>






                </div>
              )}
            </TabPanel>

            <TabPanel value="2" >
              <DashboardAnnouncement />
            </TabPanel>

            <TabPanel value="3">
              <DashboardUpdates />
            </TabPanel>
          </div>
        </TabContext>
      </div>
    </>
  );
}
Dashboard.propTypes = {
  payload: PropTypes.func.isRequired,
  displayCompliance: PropTypes.func.isRequired,
  billAddPermission: PropTypes.func.isRequired,
};

export default withErrorBoundary(Dashboard);

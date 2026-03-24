/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import "chart.js/auto";
import "react-circular-progressbar/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";
import drop from "../../Assets/Images/New_images/arrow-down.png";
import DashboardAnnouncement from "../../Pages/Dashboard/DashboardAnnouncement";
import DashboardUpdates from "../../Pages/Dashboard/DashboardUpdates";
// import Tab from "@mui/material/Tab";
// import TabContext from "@mui/lab/TabContext";
// import TabList from "@mui/lab/TabList";
// import TabPanel from "@mui/lab/TabPanel";
// import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { MdWarningAmber } from "react-icons/md";
import ErrorMessage from '../../Components/ErrorMessage';
import withErrorBoundary from "../../Hoc/WithErrorBountry";
// import Select from "react-select";
import Emptystate from "../../Assets/Images/Empty-State-svg.svg";
// import LoaderComponent from "../OthersComponent/LoaderComponent";
import PropTypes from "prop-types";
import Marquee from "react-fast-marquee";
// import { Tabs, Tab } from "react-bootstrap";
import { useHasPermission } from '../../Utils/Permission';
import {
  Buildings,
  Share,
  Profile2User,
  WalletMoney,
  InfoCircle,
  ArrowUp2,
  ArrowDown2,
  ArrowUp,TrendUp,TrendDown
} from "iconsax-react";
import ProgressBar from 'react-bootstrap/ProgressBar';
import DashExpenseProfit from "./DashExpense&Profit";
import DashQuickAccess from "./DashQuickAccess";
import DashCoreAnalytics from "./DashCoreAnalytics";
import DashRequestAndComplaints from "./DashRequestsAndComplaints";


function Dashboard() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  // const [data, setData] = useState([]);
  const [dashboardList, setDashboardList] = useState('');
  const [activeTab, setActiveTab] = useState("1");

  const [openCards, setOpenCards] = useState({});
  const [showBreakdown, setShowBreakdown] = useState(false);

  const [selectedMonth, setSelectedMonth] = useState([]);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));


  const [loading, setLoading] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [daysLeft, setDaysLeft] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    occupancy: "",
    tenants: "",
    advance: ""
  });

  const dropdownRef = useRef(null);
  const dropdownSharingRef = useRef(null)

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

  useEffect(() => {
    if (state.UsersList?.accessRestrictionError) {
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: 'ACCESS_RESTRICTION_ERROR_REMOVE' })
      }, 1000)
    }

  }, [state.UsersList?.accessRestrictionError])





  const dashboardCards = [
    {
      id: 1,
      title: "Rooms & Beds",
      icon: Buildings,
      iconColor: "text-[#155DFC]",
      iconBg: "bg-[#EFF6FF]",
      stats: [
        { label: "Total Rooms", value1: `${dashboardList?.roomsBeds?.filledRooms || "0"}`, value2: `${dashboardList?.roomsBeds?.totalRooms || "0"}` },
        { label: "Total Beds", value1: `${dashboardList?.roomsBeds?.totalBeds || "0"}` },
      ],
      footer: "Sharing Breakdown",
      sharingData:
        dashboardList?.roomsBeds?.sharingInfo?.map((item) => ({
          label: item.shareType,
          value: item.occupiedBeds,
          percent: item.occupancyRatio
        })) || []
    },
    {
      id: 2,
      title: "Occupancy",
      icon: WalletMoney,
      iconColor: "text-[#00A63E]",
      iconBg: "bg-[#F0FDF4]",
      stats: [
        { label: "Occupied Beds", value1: `${dashboardList?.occupancy?.occupiedBeds || "0"}`, valueColor: "text-green-600" },
        { label: "Available Beds", value1: `${dashboardList?.occupancy?.availableBeds || "0"}`, valueColor: "text-red-500" },
      ],
      footer: "Occupancy Rate",
      nextMonth: `${dashboardList?.occupancy?.occupancyRateFromLastMonth || ""} `,
      sharingData: [
        { percent: parseFloat(dashboardList?.occupancy?.occupancyRate) }
      ]
    },
    {
      id: 3,
      title: "Tenants",
      icon: Profile2User,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-100",
      stats: [
        { label: "Total Tenants", value1: `${dashboardList?.tenantsSummary?.totalTenants || "0"}` },
        { label: "Check-in Tenants", value1: `${dashboardList?.tenantsSummary?.checkInTenants || "0"}`, valueColor: "text-green-600" },
      ],
      footer: "Notice Period",
      footerValue: `${dashboardList?.tenantsSummary?.noticePeriod || "No"} Tenants`,
      nextCheckout: `${dashboardList?.tenantsSummary?.nextCheckout || ""}`
    },
    {
      id: 4,
      title: "Advance Holding",
      icon: WalletMoney,
      iconColor: "text-orange-600",
      iconBg: "bg-orange-100",
      stats: [
        { label: "Total Advance", value1: `₹ ${dashboardList?.advanceSummary?.totalAdvance || "0"}` },
        { label: "Refunded", value1: `₹ ${dashboardList?.advanceSummary?.refunded || "0"}`, valueColor: "text-red-500" },

      ],
      footer: "Others",
      footerOthers: `${dashboardList?.advanceSummary?.other || "0"}`,
    },
  ];




  const dateOptions =
    dashboardList?.filters?.map((item) => ({
      label: item,
      value: item
    })) || [];

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
    if (state.createAccount?.networkError) {
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NETWORK_ERROR' })
      }, 3000)
    }

  }, [state.createAccount?.networkError])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpenCards({});
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownSharingRef.current &&
        !dropdownSharingRef.current.contains(e.target)
      ) {
        setShowBreakdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);










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
      dispatch({
        type: "GET_DASHBOARD_SAGA", payload: {
          hostelId: state.login.selectedHostel_Id,
          filters: {}
        }
      });
      setLoading(true);
    }
  }, [state.login.selectedHostel_Id]);



  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      dispatch({
        type: "USERLIST",
        payload: { hostel_id: state.login.selectedHostel_Id },
      });
      dispatch({
        type: "GET_DASHBOARD_SAGA",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          filters: {
            occupancyFilter: selectedFilters.occupancy,
            tenantsFilter: selectedFilters.tenants,
            advanceFilter: selectedFilters.advance
          }
        }
      });

      setLoading(true);
    }
  }, [selectedFilters]);


  // console.log("selectedFilters", selectedFilters)


  const handleTabChange = (tab) => {
    setActiveTab(String(tab));
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




  useState(() => {
    if (state.PgList.getDashboardSuccessStatus === 200) {
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "REMOVE_GET_DASHBOARD_REDUCER" });
      }, 200);
    }
  }, [state.PgList.getDashboardSuccessStatus]);

  useEffect(() => {
    if (state.PgList?.dashboardList) {
      setLoading(false)
      setDashboardList(state.PgList?.dashboardList);

    }
  }, [state.PgList?.dashboardList]);



  const currentDate = new Date();
  const months = [];

  for (let i = 5; i >= 0; i--) {
    const date = new Date(currentDate);
    date.setMonth(currentDate.getMonth() - i);
    const monthYear = date.toISOString().substring(0, 7);
    months.push({ month: monthYear, revenue: 0, expense: 0 });
  }

  // const handleTriggerFilter = (options) => {
  //   if (state.login.selectedHostel_Id) {

  //     dispatch({
  //       type: "GET_DASHBOARD_SAGA",
  //       payload: {
  //         hostelId: state.login.selectedHostel_Id,
  //         filters: {
  //           billingFilter: options
  //         }
  //       }
  //     });

  //     setLoading(true);
  //   }
  // }


  const isDisabled = import.meta.env.MODE === "production" || import.meta.env.MODE === "qa";

  return (


    <>
      <div className="w-full h-screen  bg-[#FAFAFA] px-3 py-3 overflow-hidden  ">
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


              <button
                className={`ms-3 px-3 py-1.5 text-sm rounded-md font-gilroy text-white transition-colors ${daysLeft > 0
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

        <div className="w-full px-3 sticky top-0 z-[1000] bg-white py-2.5 border border-[#E5E7EB] rounded-xl">
          <div
            className={`flex ${isSmallScreen ? "flex-col items-center" : "items-center"
              } gap-3 w-1/2`}
          >

            <button
              onClick={() => handleTabChange("1")}
              className={`inline-block capitalize font-[Gilroy] px-[15px] py-[10px] rounded-lg text-base font-medium transition
        ${activeTab === "1"
                  ? "text-[#1E45E1] bg-[#F6F8FF]"
                  : "text-[#4B4B4B] bg-white hover:bg-gray-100"
                }`}
            >
              Dashboard
            </button>


            <button
              onClick={() => handleTabChange("2")}
              className={`inline-block capitalize font-[Gilroy] px-[15px] py-[10px] rounded-lg text-base font-medium transition
        ${activeTab === "2"
                  ? "text-[#1E45E1] bg-[#F6F8FF]"
                  : "text-[#4B4B4B] bg-white hover:bg-gray-100"
                }`}
            >
              Announcement
            </button>


            <button
              onClick={() => handleTabChange("3")}
              className={`inline-block capitalize font-[Gilroy] px-[15px] py-[10px] rounded-lg text-base font-medium transition
        ${activeTab === "3"
                  ? "text-[#1E45E1] bg-[#F6F8FF]"
                  : "text-[#4B4B4B] bg-white hover:bg-gray-100"
                }`}
            >
              Updates
            </button>
          </div>

        </div>

        {loading &&
          <div className="!absolute !inset-0 !flex !items-center !justify-center !bg-transparent !z-10">
            <div className="!w-10 !h-10 !border-[4px] !border-blue-700 !border-t-transparent !rounded-full animate-spin">

            </div>
          </div>}

        <div>
          {activeTab === "1" && (
            (!canReadDashboard && !loading) ? (
              <div
                className="flex flex-col items-center justify-center mt-24">

                <img
                  src={Emptystate}
                  alt="Empty State"
                />
                <ErrorMessage message={['You do not have access to view Dashboardss']} type="warning" />

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
                          {
                            !isDisabled &&

                            ["Occupancy", "Tenants", "Advance Holding"].includes(card.title) && (
                              <div className="relative">
                                <span
                                  onClick={() => !isDisabled && toggleCard(card.id)}
                                  className={`ml-2 border rounded p-1 whitespace-nowrap inline-flex
        ${isDisabled
                                      ? "bg-gray-100 border-gray-200 cursor-not-allowed opacity-60"
                                      : "bg-white border-[#D1D5DC] cursor-pointer"}
      `}
                                >
                                  {openCards[card.id] ? (
                                    <ArrowUp2
                                      size="16"
                                      className={isDisabled ? "text-gray-400" : "text-[#1E45E1]"}
                                    />
                                  ) : (
                                    <ArrowDown2
                                      size="16"
                                      className={isDisabled ? "text-gray-400" : "text-[#1E45E1]"}
                                    />
                                  )}
                                </span>

                                {/* Dropdown */}
                                {!isDisabled && openCards[card.id] && (
                                  <div
                                    ref={dropdownRef}
                                    className="animate-fadeIn absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg z-50 py-1"
                                  >
                                    {dateOptions?.map((option) => {
                                      const filterKey =
                                        card.title === "Occupancy"
                                          ? "occupancy"
                                          : card.title === "Tenants"
                                            ? "tenants"
                                            : "advance";

                                      const isActive =
                                        selectedFilters[filterKey] === option.value;

                                      return (
                                        <button
                                          key={option.value}
                                          onClick={() => {
                                            setSelectedFilters((prev) => ({
                                              ...prev,
                                              [filterKey]: option.value,
                                            }));
                                            setOpenCards({});
                                          }}
                                          className={`w-full text-left px-4 py-2 text-xs font-[Gilroy] transition
              ${isActive
                                              ? "border-l-2 border-[#1E45E1] bg-[#F6F8FF] text-[#222] font-medium"
                                              : "text-gray-600 hover:bg-[#F6F8FF]"
                                            }`}
                                        >
                                          {option.label}
                                        </button>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            )
                          }


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
                                {stat?.value1}
                                {stat?.value2 && (
                                  <span className="text-[#101828] ml-1">
                                    / {stat?.value2}
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
                                <div className="relative">
                                  {card.title === "Rooms & Beds" && (
                                    <InfoCircle
                                      size="18"
                                      className="text-gray-400 cursor-pointer"
                                      variant="Outline"
                                      onClick={(e) => {
                                        if (card?.sharingData?.length > 0) {
                                          e.stopPropagation();
                                          setShowBreakdown((prev) => !prev);
                                        }
                                      }}
                                    />
                                  )}


                                  {showBreakdown && (
                                    <div
                                      ref={dropdownSharingRef}
                                      className="absolute left-0 top-6 z-[9999] w-fit"
                                    >
                                      <div className="w-fit bg-white rounded-xl shadow-lg border p-3">

                                        <div className="text-sm font-semibold mb-3 flex gap-2 items-center text-[#101828]">
                                          <Share size="18" color="#1E45E1" />
                                          Detailed Sharing Breakdown
                                        </div>


                                        <div className="space-y-4 overflow-y-auto max-h-[220px] show-scrolls">
                                          {dashboardList?.roomsBeds?.sharingInfo?.map((item, index) => (
                                            <div
                                              key={index}
                                              className="px-3 py-2 border rounded"
                                            >
                                              <div className="flex justify-between text-xs text-gray-500 mb-1">
                                                <div className="text-[#101828] font-semibold text-sm">
                                                  {item.shareType}
                                                </div>

                                                <div className="text-[#64748B] font-semibold text-xs">
                                                  {item.availableRooms} Rooms Available
                                                </div>
                                              </div>

                                              <div className="flex justify-between text-sm whitespace-nowrap border-t pb-1 pt-1 space-x-8">

                                                <div className="gap-1">
                                                  <div className="text-[#6A7282] font-semibold text-xs">Rooms</div>
                                                  <div className="text-[#101828] font-semibold text-base">
                                                    {item.totalRooms}
                                                  </div>
                                                </div>

                                                <div className="gap-1">
                                                  <div className="text-[#6A7282] font-semibold text-xs">Total Beds</div>
                                                  <div className="text-[#101828] font-semibold text-base">
                                                    {item.totalBeds}
                                                  </div>
                                                </div>

                                                <div className="gap-1 text-green-600">
                                                  <div className="text-[#6A7282] font-semibold text-xs">Occupied</div>
                                                  <div className="text-[#00A63E] font-semibold text-base">
                                                    {item.occupiedBeds}
                                                  </div>
                                                </div>

                                              </div>
                                            </div>
                                          ))}
                                        </div>

                                      </div>
                                    </div>
                                  )}


                                </div>
                              )}
                              {
                                card.title === "Occupancy" &&
                                <h3 className="text-sm font-semibold text-[#101828] font-[Gilroy]">
                                  {dashboardList?.occupancy?.occupancyRate}
                                </h3>
                              }
                              {
                                card.title === "Advance Holding" && <span className="text-[#00A63E] font-[Gilroy] font-semibold text-sm">₹ {dashboardList?.advanceSummary?.other || 0}</span>
                              }

                              {card.footerValue && (
                                <span className="text-[#F97316] font-semibold bg-[#FFF8F0] px-2 py-2 rounded">
                                  {card.footerValue}
                                </span>
                              )}


                            </div>
                            <div
                              className={`space-y-2 ${card?.sharingData?.length > 0 ? "max-h-[100px] overflow-y-auto show-scrolls" : ""
                                }`}
                            >
                              {card?.sharingData?.length > 0 ? card?.sharingData?.map((item, index) => (
                                <div key={index} className="flex items-center gap-3 me-3 ">

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
                              )) : card.title === "Rooms & Beds" &&
                              <span className="text-red-500 text-xs font-semibold bg-red-100 px-2 py-2 rounded">
                                No sharing Details are there!
                              </span>

                              }
                            </div>


                            {
                              card.title === "Advance Holding" &&
                              <>
                                <span>Non-Refundable & more</span>
                              </>

                            }

                            {
                              card.nextMonth && (
                                <span
                                  className="font-medium my-2 flex items-center gap-1"
                                  style={{
                                    color: parseFloat(card.nextMonth) >= 0 ? "#00A63E" : "#E53935",
                                  }}
                                >
                                  {parseFloat(card.nextMonth) >= 0 ? (
                                    <TrendUp size="16" color="#00A63E" />
                                  ) : (
                                    <TrendDown size="16" color="#E53935" />
                                  )}

                                  {card.nextMonth} <span className="text-gray-400">from last month</span>
                                </span>
                              )
                            }

                            {card.nextCheckout &&
                              <span className="text-gray-900 font-medium my-2 flex"> Next Checkout : {card.nextCheckout !== "null" ? card.nextCheckout : "-"}</span>
                            }
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>





                <DashQuickAccess
                // billingFilter={handleTriggerFilter}

                />

                <DashExpenseProfit />

                <DashCoreAnalytics />

                <DashRequestAndComplaints />


              </div>
            )

          )}

          {activeTab === "2" && (
            <DashboardAnnouncement />
          )
          }
          {activeTab === "3" &&

            <DashboardUpdates />
          }
        </div>

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

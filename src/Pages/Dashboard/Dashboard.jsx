/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
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
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { MdWarningAmber } from "react-icons/md";
import ErrorMessage from '../../Components/ErrorMessage';
import withErrorBoundary from "../../Hoc/WithErrorBountry";

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

import { useHasPermission } from '../../Utils/Permission';


function Dashboard() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [dashboardList, setDashboardList] = useState('');
  const [lablesdata, setLables] = useState([]);
  const [totalAmount, setTotalAmount] = useState([]);
  // const [rolePermission, setRolePermission] = useState("");
  // const [permissionError, setPermissionError] = useState("");

  // const [AnnouncementAddPermission, setAnnouncementAddPermission] = useState("");
  // const [AnnouncementEditPermission, setAnnouncementEditPermission] = useState("")
  // const [AnnouncementDeletePermission, setAnnouncementDeletePermission] = useState("")
  // const [updatePermissionError, setupdatePermissionError] = useState("");
  const [value, setValue] = React.useState("1");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectExpence, setSelectExpence] = useState("this_month");
  const [selectCashback, setSelectCashback] = useState("this_month");
  const [cashBackData, setCashBackData] = useState("");
  const [selectRevenu, setSelectRevenu] = useState("six_month");
  // const [hostel_id, setHostel_Id] = useState("");
  const [loading, setLoading] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [daysLeft, setDaysLeft] = useState(null);
  const [selectAdvance, setSelectAdvance] = useState("six_month");
  // const [accountList, setAccountList] = useState("");

  // const canReadDashboard =  useHasPermission("Dashboard", "canRead");

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



  // useEffect(() => {
  //   throw new Error("Test HOC Error Boundary");
  // }, []);


  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const formattedChart = state.PgList?.dashboardFilterAdvance?.advance_data?.map(item => {
    const [year, month] = item.month.split("-");
    const monthIndex = parseInt(month, 10) - 1;
    return {
      name: `${monthNames[monthIndex]} ${year}`,
      Advance: Number(item.advance_amount),
      AdvanceReturn: Number(item.return_advance),
    };
  });

  // useEffect(() => {
  //   if (state.login.selectedHostel_Id) {
  //     setHostel_Id(state.login.selectedHostel_Id);
  //   }
  // }, [state.login.selectedHostel_Id]);




  // useEffect(() => {
  //   if (state?.createAccount?.accountList[0]?.plan_data) {
  //     // const customerDetailsPage =
  //     //   state?.createAccount?.accountList[0]?.plan_data;
  //     // setAccountList(customerDetailsPage);
  //   }
  // }, [state?.createAccount?.accountList[0]?.plan_data]);




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

  const handleSelectedReceived = (e) => {
    setSelectCashback(e.target.value);
  };
  const handleSelectedRevenue = (e) => {
    setSelectRevenu(e.target.value);
  };
  const handleSelectedAdvance = (e) => {
    setSelectAdvance(e.target.value);
  };

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

  const handleChanges = (event, newValue) => {
    setValue(newValue);
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

  useEffect(() => {
    setTotalAmount(state.PgList?.dashboardFilter?.total_amount);
  }, [state.PgList?.dashboardFilter?.total_amount]);



  useEffect(() => {
    setLables(state.PgList?.dashboardFilter?.exp_data || []);
  }, [state.PgList?.dashboardFilter?.exp_data]);

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



  useEffect(() => {
    setCashBackData(state.PgList?.dashboardFilterCashback?.cash_back_data);
  }, [state.PgList?.dashboardFilterCashback?.cash_back_data]);

  const currentvalue =
    (Number(cashBackData?.[0]?.Revenue) || 0) +
    (Number(cashBackData?.[0]?.overdue) || 0);

  const percentage = currentvalue
    ? ((currentvalue - Number(cashBackData?.[0]?.overdue)) / currentvalue) * 100
    : 0;

  const pathColor =
    currentvalue > 0
      ? cashBackData?.[0]?.overdue > 0
        ? "#00A32E"
        : "#EBEBEB"
      : "#EBEBEB";
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

  const datum = {
    labels: lablesdata?.map((category) => category.category_Name),
    datasets: [
      {
        data: lablesdata?.map((category) => category.purchase_amount),
        backgroundColor: lablesdata?.map(
          (_, index) => fixedColors[index % fixedColors.length]
        ),
        hoverBackgroundColor: lablesdata?.map(
          (_, index) => fixedColors[index % fixedColors.length]
        ),
        borderWidth: 5,
        borderColor: "#fff",
        borderRadius: 10,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "75%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    elements: {
      arc: {
        borderRadius: 2,
      },
    },
  };

  const { datasets } = datum;



  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex justify-center items-center pt-4" >
        {payload.map((entry, index) => (
          <div
            key={`item-${index}`}
            className="flex items-center mr-2.5 mt-6">
            <div className="w-3 h-3 rounded-full mr-1.5"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs font-semibold font-montserrat">
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (


    <>


      <div className="w-full max-w-full mx-auto p-2">
        <Marquee pauseOnHover gradient={false}>
          {showWarning && (
            <div className={` mt-3 flex flex-col sm:flex-row justify-between items-center gap-2 px-4 py-2 rounded-lg w-full max-w-4xl mx-auto text-base font-gilroy 

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

        <TabContext value={value}>
          <div className="w-full px-3 sticky top-0 z-[1000] bg-white"
          >


            <Box sx={{ borderBottom: 0, borderColor: "divider" }}>
              <TabList
                orientation={isSmallScreen ? "vertical" : "horizontal"}
                onChange={handleChanges}
                aria-label="lab API tabs example"
                className="flex flex-col md:flex-row flex-wrap -ml-4"
                sx={{
                  '& .MuiTabs-indicator': {
                    backgroundColor: '#1E45E1',
                    height: '2px',
                    borderRadius: '2px',
                    bottom: '10px',
                  },
                  '& .MuiTab-root': {
                    paddingBottom: '2px',
                    minHeight: '36px',
                  },
                }}
              >
                <Tab
                  label="Dashboard"
                  value="1"
                  sx={{ textTransform: 'none', fontFamily: 'Gilroy', fontSize: '15px' }}
                  className="px-1 text-base text-neutral-600 leading-normal not-italic normal-case
  font-medium
  [&.Mui-selected]:!text-black
  [&.Mui-selected]:!font-semibold"
                />

                <Tab
                  label="Announcement"
                  value="2"
                  sx={{ textTransform: 'none', fontFamily: 'Gilroy', fontSize: '15px' }}
                  className="px-1 text-base text-neutral-600 leading-normal not-italic normal-case
  font-medium
  [&.Mui-selected]:!text-black
  [&.Mui-selected]:!font-semibold"
                />

                <Tab
                  label="Updates"
                  value="3"
                  sx={{ textTransform: 'none', fontFamily: 'Gilroy', fontSize: '15px' }}
                  className="px-1 text-base text-neutral-600 leading-normal not-italic normal-case
  font-medium
  [&.Mui-selected]:!text-black
  [&.Mui-selected]:!font-semibold"
                />

              </TabList>
            </Box>
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
                <>
                  <div className="overflow-y-auto p-2">
                    <div className="my-4">
                      <div className="grid gap-3 md:grid-cols-12 items-stretch">

                        {/* LEFT SIDE */}
                        <div className="md:col-span-2 h-full">
                          <div
                            className="border rounded-2xl p-4 shadow-sm text-left flex flex-col items-start justify-between bg-white min-h-44 h-full"
                          >
                            <div className="text-blue-600 mb-2">
                              <i className="bi bi-house-door-fill fs-4"></i>
                            </div>
                            <h6 className="text-gray-500 mb-1 font-gilroy">Total Rooms</h6>
                            <h5 className="mb-0 font-gilroy">
                              {dashboardList?.totalRooms || 0}
                            </h5>
                          </div>
                        </div>

                        {/* MIDDLE */}
                        <div className="md:col-span-3 flex flex-col gap-2 h-full">
                          <div className="border rounded-2xl p-3 shadow-sm flex justify-between items-center bg-white h-full">
                            <div>
                              <h6 className="text-gray-500 mb-1 font-gilroy">Total Beds</h6>
                              <h5 className="mb-0 font-gilroy">
                                {dashboardList?.totalBeds || 0}
                              </h5>
                            </div>
                            <img src={clock} alt="Bed Icon" className="w-8 h-8" />

                          </div>

                          <div className="border rounded-2xl p-3 shadow-sm flex justify-between items-center bg-white h-full">
                            <div>
                              <h6 className="text-gray-500 mb-1 font-gilroy">Free Beds</h6>
                              <h5 className="mb-0 font-gilroy">
                                {dashboardList?.freeBeds || 0}
                              </h5>
                            </div>
                            <img src={key} alt="Bed Icon" className="w-8 h-8" />

                          </div>
                        </div>

                        {/* RIGHT SIDE */}
                        <div className="md:col-span-7 h-full">
                          <div className="p-2 rounded-2xl bg-blue-100 h-full">
                            <div className="grid gap-2 md:grid-cols-12 h-full">

                              <div className="md:col-span-9 h-full">
                                <div className="grid gap-2 md:grid-cols-2 sm:grid-cols-1 h-full">

                                  <div>
                                    <div className="border rounded-2xl p-3 shadow-sm bg-white text-left h-full">
                                      <h6 className="text-gray-500 mb-1 font-gilroy">Occupied Beds</h6>
                                      <h5 className="mb-0 font-gilroy">{dashboardList?.occupiedBeds || 0}</h5>
                                    </div>
                                  </div>

                                  <div>
                                    <div className="border rounded-2xl p-3 shadow-sm bg-white text-left h-full">
                                      <h6 className="text-gray-500 mb-1 font-gilroy">Next Month Projection</h6>
                                      <h5 className="mb-0 font-gilroy">{dashboardList?.nextMonthProjection || 0}</h5>
                                    </div>
                                  </div>

                                  <div>
                                    <div className="border rounded-2xl p-3 shadow-sm bg-white text-left h-full">
                                      <h6 className="text-gray-500 mb-1 font-gilroy">Total Customers</h6>
                                      <h5 className="mb-0 font-gilroy">{dashboardList?.totalCustomers || 0}</h5>
                                    </div>
                                  </div>

                                  <div>
                                    <div className="border rounded-2xl p-3 shadow-sm bg-white text-left h-full">
                                      <h6 className="text-gray-500 mb-1 font-gilroy">EB Amount</h6>
                                      <h5 className="mb-0 font-gilroy">{dashboardList?.electricityAmount || 0}</h5>
                                    </div>
                                  </div>

                                </div>
                              </div>

                              <div className="md:col-span-3 h-full">
                                <div className="border rounded-2xl p-4 shadow-sm bg-white text-left flex flex-col justify-between items-start h-full">
                                  <img src={vector} alt="Asset Icon" className="w-8 h-8 mb-3" />
                                  <p className="text-gray-500 mb-1 text-sm font-gilroy">Total Asset Value</p>
                                  <h5 className="mt-1 font-gilroy">{dashboardList?.totalAssetsValue || 0}</h5>
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>

                      </div>
                    </div>





                    <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

                      <div>
                        <div className="flex items-center p-3 border rounded-2xl bg-blue-100">
                          <div className="mr-3 text-blue-600">
                            <img src={advancedHand} alt="advancedHand" className="w-8 h-8" />
                          </div>
                          <div>
                            <h6 className="text-gray-500 font-gilroy">Advance in Hand</h6>
                            <div className="font-semibold text-lg font-gilroy">₹ {dashboardList?.advances || 0}</div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center p-3 border rounded-2xl bg-white">
                          <div className="mr-3 text-blue-600">
                            <img src={activeImage} alt="activeImage" className="w-8 h-8" />
                          </div>
                          <div>
                            <h6 className="text-gray-500 font-gilroy">Active Complaint</h6>
                            <div className="font-semibold text-lg font-gilroy">{dashboardList?.activeComplaint || 0}</div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center p-3 border rounded-2xl bg-white">
                          <div className="mr-3 text-blue-600">
                            <img src={currentMatch} alt="currentMatch" className="w-8 h-8" />
                          </div>
                          <div>
                            <h6 className="text-gray-500 font-gilroy">Current Month Profit</h6>
                            <div className="font-semibold text-lg font-gilroy">₹ {dashboardList.currentMonthProfit || 0}</div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center p-3 border rounded-2xl bg-white">
                          <div className="mr-3 text-blue-600">
                            <img src={coinImage} alt="coinImage" className="w-8 h-8" />
                          </div>
                          <div>
                            <h6 className="text-gray-500 font-gilroy">Other Profit</h6>
                            <div className="font-semibold text-lg font-gilroy">₹ {dashboardList.otherProfit || 0}</div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center p-3 border rounded-2xl bg-white">
                          <div className="mr-3 text-blue-600">
                            <img src={pendingimg} alt="pendingimg" className="w-8 h-8" />
                          </div>
                          <div>
                            <h6 className="text-gray-500 font-gilroy">Pending Invoice Count</h6>
                            <div className="font-semibold text-lg font-gilroy">{dashboardList.pendingInvoiceCount || 0}</div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center p-3 border rounded-2xl bg-white">
                          <div className="mr-3 text-primary">
                            <img src={newBooking} alt="newBooking" className="w-8 h-8" />
                          </div>
                          <div>
                            <h6 className="text-gray-500 font-gilroy">New Booking</h6>
                            <div className="font-semibold text-lg font-gilroy">{dashboardList.bookedBeds || 0}</div>
                          </div>
                        </div>
                      </div>

                    </div>

                    <div className="flex flex-row mt-5 md:flex-col">


                      <div className="flex-1 animated-text">

                        <div className="w-[98%] mt-2.5 rounded-[20px] border border-[#e0e0e0] bg-white pt-5 pr-5">


                          <div className="flex flex-wrap items-center justify-between px-2.5 py-2.5 -mt-14">
                            <div className="flex-[1_1_60%] min-w-[200px] pl-4">
                              <p className="m-3 whitespace-nowrap text-[18px] font-semibold font-[Montserrat]">
                                Expenses Vs Revenue
                              </p>
                            </div>

                            <div className="flex-[1_1_40%] min-w-[150px] flex justify-end">
                              <div className="relative h-9 w-full max-w-[250px]">
                                <select
                                  value={selectRevenu}
                                  onChange={handleSelectedRevenue}
                                  className="h-9 w-full cursor-pointer appearance-none rounded-full border border-[#D9D9D9] px-2.5 text-[12px] font-semibold font-[Gilroy] text-[#4B4B4B]"
                                  style={{
                                    background: `url(${drop}) no-repeat right 10px center`,
                                    backgroundSize: "16px 16px",
                                  }}
                                >
                                  <option value="six_month">last six months</option>
                                  <option value="this_year">this year</option>
                                  <option value="last_year">last year</option>
                                </select>
                              </div>
                            </div>
                          </div>

                          <div className="relative h-[350px] overflow-x-auto">
                            <div className="min-w-full">
                              <ResponsiveContainer width="100%" height={350}>
                                <BarChart data={data} margin={{ top: 10, left: 20, bottom: 40, right: 10 }}>
                                  <CartesianGrid horizontal vertical={false} stroke="#e0e0e0" />
                                  <XAxis
                                    dataKey="month"
                                    tick={{ fontFamily: "Gilroy", fontSize: 12, fontWeight: 500 }}
                                    tickFormatter={(month) =>
                                      new Date(`${month}-01`).toLocaleDateString("en-US", { month: "short" })
                                    }
                                  />
                                  <YAxis
                                    domain={[0, "dataMax"]}
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontFamily: "Gilroy", fontSize: 12, fontWeight: 500 }}
                                  />
                                  <Tooltip />
                                  <Bar dataKey="revenue" fill="#00A32E" barSize={50} radius={[5, 5, 0, 0]}>
                                    <LabelList dataKey="revenue" position="inside" angle={270} fill="#fff" />
                                  </Bar>
                                  <Bar dataKey="expense" fill="#E34B4B" barSize={50} radius={[5, 5, 0, 0]}>
                                    <LabelList dataKey="expense" position="inside" angle={270} fill="#fff" />
                                  </Bar>
                                  <Legend content={<CustomLegend />} verticalAlign="bottom" height={36} />
                                </BarChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                        </div>


                        <div className="mt-4 w-[97%] rounded-[20px] bg-white p-4 shadow">
                          <div className="flex flex-wrap items-center justify-between -mt-4 px-2.5">
                            <div className="flex-[1_1_60%] min-w-[200px] pl-2.5 mb-2.5">
                              <p className="m-3 whitespace-nowrap text-[18px] font-semibold font-[Montserrat]">
                                Total Cashback
                              </p>
                            </div>

                            <div className="flex-[1_1_40%] min-w-[150px] flex justify-end -mt-2.5">
                              <div className="relative h-9 w-full max-w-[250px]">
                                <select
                                  value={selectCashback}
                                  onChange={handleSelectedReceived}
                                  className="h-9 w-full cursor-pointer appearance-none rounded-full border border-[#D9D9D9] px-2.5 text-[12px] font-semibold font-[Gilroy] text-[#4B4B4B]"
                                  style={{
                                    background: `url(${drop}) no-repeat right 10px center`,
                                    backgroundSize: "16px 16px",
                                  }}
                                >
                                  <option value="this_month">This month</option>
                                  <option value="last_month">Last month</option>
                                  <option value="last_three_months">Last 3 months</option>
                                  <option value="last_six_months">Last 6 months</option>
                                  <option value="this_year">Last 1 year</option>
                                </select>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center">
                            <div className="w-[40%] ml-4 mt-1 font-[Gilroy]">
                              <CircularProgressbar
                                value={percentage}
                                text={`₹${currentvalue || 0}`}
                                circleRatio={0.5}
                                styles={buildStyles({
                                  rotation: 0.75,
                                  pathColor,
                                  trailColor,
                                  textColor: "#000",
                                  textSize: "24px",
                                })}
                              />
                            </div>

                            <div className="ml-auto -mt-12 pr-5 flex flex-col gap-4">
                              <div className="flex items-center">
                                <div className="mr-2 -mt-6 h-[15px] w-[15px] rounded-full bg-green-600"></div>
                                <div>
                                  <p className="text-[12px] font-medium font-[Gilroy]">Received</p>
                                  <p className="text-[13px] font-semibold font-[Montserrat]">
                                    ₹{cashBackData?.[0]?.Revenue || 0}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center">
                                <div className="mr-2 -mt-6 h-[15px] w-[15px] rounded-full bg-[#EBEBEB]"></div>
                                <div>
                                  <p className="text-[12px] font-medium font-[Gilroy]">Pending</p>
                                  <p className="text-[13px] font-semibold font-[Montserrat]">
                                    ₹{cashBackData?.[0]?.overdue || 0}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>


                      <div className="flex-1 mt-3">

                        {/* Card Container */}
                        <div className="mx-auto mt-2 w-full max-w-4xl overflow-hidden rounded-xl bg-white p-4 md:p-6 card">

                          <div className="-mt-4 flex flex-wrap items-center justify-between px-2.5 py-2.5">
                            <div className="flex-1 text-start">
                              <p className="whitespace-nowrap text-lg font-semibold font-sans">
                                Advance VS Advance Return
                              </p>
                            </div>

                            <div className="flex-1 max-w-xs flex justify-end">
                              <div className="relative h-9 w-full max-w-[180px]">
                                <select
                                  value={selectAdvance}
                                  onChange={handleSelectedAdvance}
                                  className="h-9 w-full cursor-pointer rounded-full border border-gray-300 px-3 text-xs font-semibold font-sans text-gray-700 appearance-none pr-10"
                                >
                                  <option value="six_month">last six months</option>
                                  <option value="this_year">this year</option>
                                  <option value="last_year">last year</option>
                                </select>

                                {/* Dropdown arrow */}
                                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                                  <img src={drop} alt="arrow" className="h-4 w-4" />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Line Chart */}
                          <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={formattedChart}>
                              <CartesianGrid stroke="#e0e0e0" strokeDasharray="0" vertical={false} />
                              <XAxis
                                dataKey="name"
                                tickFormatter={(tick) => {
                                  const date = new Date(tick);
                                  return date.toLocaleString("default", {
                                    month: "short",
                                    year: "numeric",
                                  });
                                }}
                                tick={{
                                  fontSize: 12,
                                  fontFamily: "sans",
                                  fontWeight: 500,
                                  fill: "#333",
                                }}
                                axisLine={false}
                                tickLine={false}
                              />
                              <YAxis axisLine={false} tickLine={false} />
                              <Tooltip />
                              <Legend
                                verticalAlign="bottom"
                                align="center"
                                iconType="circle"
                                wrapperStyle={{
                                  marginTop: 10,
                                  fontSize: 12,
                                  fontFamily: "sans",
                                  fontWeight: 500,
                                }}
                              />
                              <Line
                                type="monotone"
                                dataKey="Advance"
                                stroke="#3366FF"
                                strokeWidth={2}
                                dot={{ r: 4 }}
                              />
                              <Line
                                type="monotone"
                                dataKey="Advance Return"
                                stroke="#FF5733"
                                strokeWidth={2}
                                dot={{ r: 4 }}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>


                        <div className="expenses-container animated-text mt-4">

                          <div className="dropp flex flex-wrap items-center justify-between px-3 py-2">
                            <div className="mb-2 flex text-start">
                              <p className="pl-2.5 text-lg font-semibold font-sans">
                                Expenses
                              </p>
                            </div>

                            <div className="mb-2 flex w-full max-w-xs items-center justify-end">
                              <div className="relative h-9 w-full max-w-[180px]">
                                <select
                                  value={selectExpence}
                                  onChange={handleSelectedExpenses}
                                  className="h-9 w-full cursor-pointer appearance-none rounded-full border border-gray-300 px-3 text-xs font-semibold font-sans text-gray-700 pr-10"
                                >
                                  <option value="this_month">This month</option>
                                  <option value="last_month">Last month</option>
                                  <option value="last_three_months">Last 3 months</option>
                                  <option value="last_six_months">Last 6 months</option>
                                  <option value="this_year">This year</option>
                                </select>


                                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                                  <img src={drop} alt="arrow" className="h-4 w-4" />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-start justify-between">

                            <div className="flex-1">
                              {lablesdata && lablesdata.length > 0 ? (
                                <Doughnut
                                  className="doughnut"
                                  data={datum}
                                  options={options}
                                  style={{ width: 196, height: 196 }}
                                />
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="196"
                                  height="196"
                                  viewBox="0 0 196 196"
                                  fill="none"
                                >
                                  <path
                                    d="M196 98C196 152.124 152.124 196 98 196C43.8761 196 0 152.124 0 98C0 43.8761 43.8761 0 98 0C152.124 0 196 43.8761 196 98ZM29.4 98C29.4 135.887 60.1133 166.6 98 166.6C135.887 166.6 166.6 135.887 166.6 98C166.6 60.1133 135.887 29.4 98 29.4C60.1133 29.4 29.4 60.1133 29.4 98Z"
                                    fill="#DCDCDC"
                                  />
                                </svg>
                              )}

                              <p className="mt-2.5 text-center text-2xl font-semibold font-sans">
                                ₹{totalAmount > 0 ? totalAmount : 0}
                              </p>
                            </div>

                            <div className="grid flex-1 grid-cols-2 gap-5">
                              {lablesdata && lablesdata.length > 0 ? (
                                lablesdata.map((label, index) => (
                                  <div key={index} className="flex items-center gap-2.5">
                                    <span
                                      className="h-2.5 w-2.5 rounded-full"
                                      style={{
                                        backgroundColor: datasets[0].backgroundColor[index],
                                      }}
                                    ></span>
                                    <div className="flex flex-col">
                                      <p className="text-xs font-semibold font-sans text-gray-700">
                                        {label.category_Name}
                                      </p>
                                      <p className="text-base font-semibold font-sans">
                                        ₹{label.purchase_amount}
                                      </p>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div className="col-span-2 mt-6 w-full whitespace-nowrap text-center text-red-500">
                                  <p>No Data</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>


                    </div>
                  </div>
                </>
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

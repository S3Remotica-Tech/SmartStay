/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

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
    const [totalAmount, setTotalAmount] = useState([]);
  
  const [value, setValue] = React.useState("1");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectExpence, setSelectExpence] = useState("this_month");
  const [selectCashback, setSelectCashback] = useState("this_month");
  const [cashBackData, setCashBackData] = useState("");
  const [selectRevenu, setSelectRevenu] = useState("six_month");
    const [loading, setLoading] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [daysLeft, setDaysLeft] = useState(null);
  const [selectAdvance, setSelectAdvance] = useState("six_month");
 
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


// Total Cashback

const cashBackDataSample = {
  total: 49500,
  currentValue: 19500,
  items: [
    {
      label: "Received",
      value: 19500,
     
    },
    {
      label: "Pending",
      value: 30000,
     
    }
  ]
};


// expenses

const expensesApiResponse = {
  totalAmount: 150,
  categories: [
    {
      category_Id: 1,
      category_Name: "Category 1",
      purchase_amount: 95,
     
    },
    {
      category_Id: 2,
      category_Name: "Category 2",
      purchase_amount: 26,
     
    },
    {
      category_Id: 3,
      category_Name: "Category 3",
      purchase_amount: 17,
     
    },
    {
      category_Id: 4,
      category_Name: "Category 4",
      purchase_amount: 12,
      
    }
  ]
};






const lablesdata = expensesApiResponse.categories;





// advance & advance return


const advanceApiResponse = [
  {
    date: "2024-01-01",
    advance: 12000,
    advanceReturn: 10000
  },
  {
    date: "2024-02-01",
    advance: 18000,
    advanceReturn: 15000
  },
  {
    date: "2024-03-01",
    advance: 25000,
    advanceReturn: 22000
  },
  {
    date: "2024-04-01",
    advance: 32000,
    advanceReturn: 30000
  },
  {
    date: "2024-05-01",
    advance: 28000,
    advanceReturn: 26000
  },
  {
    date: "2024-06-01",
    advance: 15000,
    advanceReturn: 14000
  }
];



const formattedChart = advanceApiResponse.map(item => ({
  name: item.date,               
  Advance: item.advance,           
  "Advance Return": item.advanceReturn 
}));




//  expense & Revenue


const dataExpenseRevenue = [
  {
    month: "2024-01",
    revenue: 400,
    expense: 300
  },
  {
    month: "2024-02",
    revenue: 200,
    expense: 280
  },
  {
    month: "2024-03",
    revenue: 500,
    expense: 400
  },
  {
    month: "2024-04",
    revenue: 200,
    expense: 150
  },
  {
    month: "2024-05",
    revenue: 250,
    expense: 500
  },
  {
    month: "2024-06",
    revenue: 300,
    expense: 380
  }
];







  // useEffect(() => {
  //   throw new Error("Test HOC Error Boundary");
  // }, []);


  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // const formattedChart = state.PgList?.dashboardFilterAdvance?.advance_data?.map(item => {
  //   const [year, month] = item.month.split("-");
  //   const monthIndex = parseInt(month, 10) - 1;
  //   return {
  //     name: `${monthNames[monthIndex]} ${year}`,
  //     Advance: Number(item.advance_amount),
  //     AdvanceReturn: Number(item.return_advance),
  //   };
  // });

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



  useEffect(() => {
    setCashBackData(state.PgList?.dashboardFilterCashback?.cash_back_data);
  }, [state.PgList?.dashboardFilterCashback?.cash_back_data]);

  const currentvalue =
    (Number(cashBackDataSample?.[0]?.Revenue) || 0) +
    (Number(cashBackDataSample?.[0]?.overdue) || 0);

  const percentage = currentvalue
    ? ((currentvalue - Number(cashBackDataSample?.[0]?.overdue)) / currentvalue) * 100
    : 0;

  const pathColor =
    currentvalue > 0
      ? cashBackDataSample?.[0]?.overdue > 0
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

                      {/* <div>
                        <div className="flex items-center p-3 border rounded-2xl bg-white">
                          <div className="mr-3 text-blue-600">
                            <img src={activeImage} alt="activeImage" className="w-8 h-8" />
                          </div>
                          <div>
                            <h6 className="text-gray-500 font-gilroy">Active Complaint</h6>
                            <div className="font-semibold text-lg font-gilroy">{dashboardList?.activeComplaint || 0}</div>
                          </div>
                        </div>
                      </div> */}

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
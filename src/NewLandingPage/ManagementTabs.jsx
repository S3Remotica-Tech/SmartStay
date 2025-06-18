import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import { TabPanel } from "@mui/lab";
// import { TabContent } from "react-bootstrap";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
// import HostelTopBlackImage from "../Assets/Images/landingpageimages/hosteltopimage.png";
// import hostelBackround from "../Assets/Images/landingpageimages/Rectangle 34625101.png"
import dashboardImg from "../Assets/Images/landingpageimages/roommanagement.png";
// import Rectangle from "../Assets/Images/landingpageimages/Rectangle 34624179.png";




const RoomManagement = () => {
  // const [activeTab, setActiveTab] = useState("room-management");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [value, setValue] = React.useState("1");


  const handleChanges = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ height: 'auto', backgroundColor: 'white', padding:40 }}>
      <div className="text-center">
        <label style={{ fontFamily: "Montserrat", color: "#090F29", fontWeight: 700, fontSize: 30, marginBottom: 8 }}>Ready to Simplify Your PG Management?</label>
      </div>
      <div className="text-center">
        <label style={{ fontFamily: "Montserrat", color: "#4C6280", fontWeight: 500, fontSize: 16, marginBottom: 50, opacity:0.6 }}>Efficiently manage rooms, customers, inventory, vendors,<br></br>
        complaints, expenses, and reports—all in one place.</label></div>






      <TabContext value={value}>
        <Box sx={{ borderBottom: 0, borderColor: "divider" }}>
          <TabList
            orientation={isSmallScreen ? "vertical" : "horizontal"}
            onChange={handleChanges}
            aria-label="lab API tabs example"
            style={{ marginLeft: "35px", marginTop: "-15px" }}
            className="custom-tab-list d-flex flex-column justify-content-between gap-5 flex-sm-row p-0"
            TabIndicatorProps={{
          style: {
            backgroundColor: "#1E45E1", 
            height: "3px",
            borderRadius: "2px",
            fontWeight:600
          },
        }}
          >
            {["Room Management", "Customer Management", "Inventory Management", "Vendor Management", "Complaint Management"].map((label, index) => (
              <Tab
                className="p-0 gap-5"
                key={index}
                label={label}
                value={(index + 1).toString()}
                style={{
                  marginRight: isSmallScreen ? 0 : "60px",
                  marginBottom: isSmallScreen ? "16px" : 0,
                  fontSize: 16,
                  fontFamily: "Gilroy",
                  lineHeight: "normal",
                  fontStyle: "normal",
                  fontWeight: 600,
                  textTransform: "none",
                  color: value === (index + 1).toString() ? "#1E45E1" : "#000", 
              borderBottom: value === (index + 1).toString() ? "2px solid #1E45E1" : "none"

                }}
              />
            ))}
          </TabList>
        </Box>


        <TabPanel value="1" >
          <div className="d-flex align-items-center flex-column flex-md-row rounded-3 ps-4 pt-4 pe-5">
            <div className="row g-0" style={{ border: "1px solid #E5ECFF", borderRadius: "10px", boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.05)", }}>

              <div className="col-md-6 ps-3 pt-5 pe-3 " >
                <h2 className="fs-4 fw-bold text-dark" style={{ fontFamily: "Montserrat" }}>Room Management</h2>
                <p className="fs-6 text-muted" style={{ fontFamily: "Montserrat" }}>Easily manage room availability, bookings, and occupancy status.</p>

                <div className="row mt-4">
                  {[
                    { title: "Paying Guest", desc: "Get access to your very own Rental Product and elevate your rental business with Limited-time." },
                    { title: "Manage Customers", desc: "Get access to your very own Rental Product and elevate your rental business with Limited-time." },
                    { title: "Manage Vendors", desc: "Get access to your very own Rental Product and elevate your rental business with Limited-time." },
                    { title: "Asset Management", desc: "Get access to your very own Rental Product and elevate your rental business with Limited-time." }
                  ].map((item, idx) => (
                    <div className="col-6 mb-3" key={idx}>
                      <h6 className="fs-6 fw-bold text-dark" style={{ fontFamily: "Montserrat" }}>{item.title}</h6>
                      <p className="fs-7 text-muted" style={{ fontFamily: "Montserrat" }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>


              <div className="col-md-6 d-flex justify-content-end p-0" >
                <img src={dashboardImg} alt="Room management dashboard from SmartStay hostel software showing bed occupancy, PG bookings, and floor-wise layout"
                  className="img-fluid object-cover" style={{ borderRadius: "10px", height: 450, width: "100%" }} />
              </div>
            </div>
          </div>
        </TabPanel>

        <TabPanel value="2">
          <div className="d-flex align-items-center flex-column flex-md-row rounded-3 ps-4 pt-4 pe-5">
            <div className="row g-0" style={{ border: "1px solid #E5ECFF", borderRadius: "10px", boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.05)", }}>

              <div className="col-md-6 ps-3 pt-5 pe-3 " >
                <h2 className="fs-4 fw-bold text-dark" style={{ fontFamily: "Montserrat" }}>Customer Management</h2>
                <p className="fs-6 text-muted" style={{ fontFamily: "Montserrat" }}>Easily manage room availability, bookings, and occupancy status.</p>

                <div className="row mt-4">
                  {[
                    { title: "Paying Guest", desc: "Get access to your very own Rental Product and elevate your rental business with Limited-time." },
                    { title: "Manage Customers", desc: "Get access to your very own Rental Product and elevate your rental business with Limited-time." },
                    { title: "Manage Vendors", desc: "Get access to your very own Rental Product and elevate your rental business with Limited-time." },
                    { title: "Asset Management", desc: "Get access to your very own Rental Product and elevate your rental business with Limited-time." }
                  ].map((item, idx) => (
                    <div className="col-6 mb-3" key={idx}>
                      <h6 className="fs-6 fw-bold text-dark" style={{ fontFamily: "Montserrat" }}>{item.title}</h6>
                      <p className="fs-7 text-muted" style={{ fontFamily: "Montserrat" }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>


              <div className="col-md-6 d-flex justify-content-end p-0" >
                <img src={dashboardImg} alt="Room management dashboard from SmartStay hostel software showing bed occupancy, PG bookings, and floor-wise layout"
                  className="img-fluid object-cover" style={{ borderRadius: "10px", height: 450, width: "100%" }} />
              </div>
            </div>
          </div>
        </TabPanel>

        <TabPanel value="3" >
          <div className="d-flex align-items-center flex-column flex-md-row rounded-3 ps-4 pt-4 pe-5">
            <div className="row g-0" style={{ border: "1px solid #E5ECFF", borderRadius: "10px" , boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.05)",}}>

              <div className="col-md-6 ps-3 pt-5 pe-3 " >
                <h2 className="fs-4 fw-bold text-dark" style={{ fontFamily: "Montserrat" }}>Inventory Management</h2>
                <p className="fs-6 text-muted" style={{ fontFamily: "Montserrat" }}>Easily manage room availability, bookings, and occupancy status.</p>

                <div className="row mt-4">
                  {[
                    { title: "Paying Guest", desc: "Get access to your very own Rental Product and elevate your rental business with Limited-time." },
                    { title: "Manage Customers", desc: "Get access to your very own Rental Product and elevate your rental business with Limited-time." },
                    { title: "Manage Vendors", desc: "Get access to your very own Rental Product and elevate your rental business with Limited-time." },
                    { title: "Asset Management", desc: "Get access to your very own Rental Product and elevate your rental business with Limited-time." }
                  ].map((item, idx) => (
                    <div className="col-6 mb-3" key={idx}>
                      <h6 className="fs-6 fw-bold text-dark" style={{ fontFamily: "Montserrat" }}>{item.title}</h6>
                      <p className="fs-7 text-muted" style={{ fontFamily: "Montserrat" }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>


              <div className="col-md-6 d-flex justify-content-end p-0" >
                <img src={dashboardImg} alt="Room management dashboard from SmartStay hostel software showing bed occupancy, PG bookings, and floor-wise layout"
                  className="img-fluid object-cover" style={{ borderRadius: "10px", height: 450, width: "100%" }} />
              </div>
            </div>
          </div>
        </TabPanel>

        <TabPanel value="4" >
          <div className="d-flex align-items-center flex-column flex-md-row rounded-3 ps-4 pt-4 pe-5">
            <div className="row g-0" style={{ border: "1px solid #E5ECFF", borderRadius: "10px" , boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.05)",}}>

              <div className="col-md-6 ps-3 pt-5 pe-3 " >
                <h2 className="fs-4 fw-bold text-dark" style={{ fontFamily: "Montserrat" }}>Vendor Management</h2>
                <p className="fs-6 text-muted" style={{ fontFamily: "Montserrat" }}>Easily manage room availability, bookings, and occupancy status.</p>

                <div className="row mt-4">
                  {[
                    { title: "Paying Guest", desc: "Get access to your very own Rental Product and elevate your rental business with Limited-time." },
                    { title: "Manage Customers", desc: "Get access to your very own Rental Product and elevate your rental business with Limited-time." },
                    { title: "Manage Vendors", desc: "Get access to your very own Rental Product and elevate your rental business with Limited-time." },
                    { title: "Asset Management", desc: "Get access to your very own Rental Product and elevate your rental business with Limited-time." }
                  ].map((item, idx) => (
                    <div className="col-6 mb-3" key={idx}>
                      <h6 className="fs-6 fw-bold text-dark" style={{ fontFamily: "Montserrat" }}>{item.title}</h6>
                      <p className="fs-7 text-muted" style={{ fontFamily: "Montserrat" }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>


              <div className="col-md-6 d-flex justify-content-end p-0" >
                <img src={dashboardImg} alt="Room management dashboard from SmartStay hostel software showing bed occupancy, PG bookings, and floor-wise layout"
                  className="img-fluid object-cover" style={{ borderRadius: "10px", height: 450, width: "100%" }} />
              </div>
            </div>
          </div>
        </TabPanel>

        <TabPanel value="5" >
          <div className="d-flex align-items-center flex-column flex-md-row rounded-3 ps-4 pt-4 pe-5">
            <div className="row g-0" style={{ border: "1px solid #E5ECFF", borderRadius: "10px", boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.05)", }}>

              <div className="col-md-6 ps-3 pt-5 pe-3 " >
                <h2 className="fs-4 fw-bold text-dark" style={{ fontFamily: "Montserrat" }}>Complaint Management</h2>
                <p className="fs-6 text-muted" style={{ fontFamily: "Montserrat" }}>Easily manage room availability, bookings, and occupancy status.</p>

                <div className="row mt-4">
                  {[
                    { title: "Paying Guest", desc: "Get access to your very own Rental Product and elevate your rental business with Limited-time." },
                    { title: "Manage Customers", desc: "Get access to your very own Rental Product and elevate your rental business with Limited-time." },
                    { title: "Manage Vendors", desc: "Get access to your very own Rental Product and elevate your rental business with Limited-time." },
                    { title: "Asset Management", desc: "Get access to your very own Rental Product and elevate your rental business with Limited-time." }
                  ].map((item, idx) => (
                    <div className="col-6 mb-3" key={idx}>
                      <h6 className="fs-6 fw-bold text-dark" style={{ fontFamily: "Montserrat" }}>{item.title}</h6>
                      <p className="fs-7 text-muted" style={{ fontFamily: "Montserrat" }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>


              <div className="col-md-6 d-flex justify-content-end p-0" >
                <img src={dashboardImg} alt="Room management dashboard from SmartStay hostel software showing bed occupancy, PG bookings, and floor-wise layout"
                  className="img-fluid object-cover" style={{ borderRadius: "10px", height: 450, width: "100%" }} />
              </div>
            </div>
          </div>
        </TabPanel>

      </TabContext>
    </div>

  );
};

export default RoomManagement;

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
    <div style={{ height: '800px', backgroundColor: 'white', paddingTop: '50px', paddingBottom: '100px' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 0, borderColor: "divider" }}>
          <TabList
            orientation={isSmallScreen ? "vertical" : "horizontal"}
            onChange={handleChanges}
            aria-label="lab API tabs example"
            style={{ marginLeft: "14px", marginTop: "-15px" }}
            className="custom-tab-list d-flex flex-column flex-sm-row"
          >
            {["Room Management", "Customer Management", "Inventory Management", "Vendor Management", "Complaint Management"].map((label, index) => (
              <Tab
                key={index}
                label={label}
                value={(index + 1).toString()}
                style={{
                  marginTop: 0,
                  fontSize: 16,
                  fontFamily: "Gilroy",
                  lineHeight: "normal",
                  fontStyle: "normal",
                  fontWeight: 500,
                  textTransform: "none",
                }}
              />
            ))}
          </TabList>
        </Box>

        {/* Room Management Tab */}
        <TabPanel value="1">
          <div className="row d-flex align-items-center flex-column flex-md-row rounded-3 border p-4">
            {/* Text Section */}
            <div className="col-md-6">
              <h2 className="fs-4 fw-bold text-dark">Room Management</h2>
              <p className="fs-6 text-muted">Easily manage room availability, bookings, and occupancy status.</p>

              <div className="row mt-4">
                {[
                  { title: "Paying Guest", desc: "Get access to your very own Rental Product and elevate your rental business with Limited-time." },
                  { title: "Manage Customers", desc: "Get access to your very own Rental Product and elevate your rental business with Limited-time." },
                  { title: "Manage Vendors", desc: "Get access to your very own Rental Product and elevate your rental business with Limited-time." },
                  { title: "Asset Management", desc: "Get access to your very own Rental Product and elevate your rental business with Limited-time." }
                ].map((item, idx) => (
                  <div className="col-6 mb-3" key={idx}>
                    <h6 className="fs-6 fw-bold text-dark">{item.title}</h6>
                    <p className="fs-7 text-muted">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Section */}
            <div className="col-md-6">
              <img src={dashboardImg} alt="Room management dashboard from SmartStay hostel software showing bed occupancy, PG bookings, and floor-wise layout"
                className="img-fluid" style={{ borderRadius: "10px", marginTop: '-100px' }} />
            </div>
          </div>
        </TabPanel>

        <TabPanel value="2">
          <div className="row d-flex align-items-center flex-column flex-md-row rounded-3 border p-4">
            {/* Text Section */}
            <div className="col-md-6">
              <h2 className="fs-4 fw-bold text-dark">Customer Management</h2>
              <p className="fs-6 text-muted">Easily manage room availability, bookings, and occupancy status.</p>

              <div className="row mt-4">
                {[
                  { title: "Paying Guest", desc: "Get access to your very own Rental Product and elevate your rental business with Limited-time." },
                  { title: "Manage Customers", desc: "Get access to your very own Rental Product and elevate your rental business with Limited-time." },
                  { title: "Manage Vendors", desc: "Get access to your very own Rental Product and elevate your rental business with Limited-time." },
                  { title: "Asset Management", desc: "Get access to your very own Rental Product and elevate your rental business with Limited-time." }
                ].map((item, idx) => (
                  <div className="col-6 mb-3" key={idx}>
                    <h6 className="fs-6 fw-bold text-dark">{item.title}</h6>
                    <p className="fs-7 text-muted">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Section */}
            <div className="col-md-6">
              <img src={dashboardImg} alt="Dashboard" className="img-fluid" style={{ borderRadius: "10px", marginTop: '-100px' }} />
            </div>
          </div>
        </TabPanel>
        <TabPanel value="3">
          {/* Inventory Management Content */}
          <div className="row d-flex align-items-center flex-column flex-md-row rounded-3 border p-4">
            {/* Text Section */}
            <div className="col-md-6">
              <h2 className="fs-4 fw-bold text-dark">Inventory Management</h2>
              <p className="fs-6 text-muted">Easily manage room availability, bookings, and occupancy status.</p>

              <div className="row mt-4">
                {[
                  { title: "Paying Guest", desc: "Get access to your very own Rental Product and elevate your rental business with Limited-time." },
                  { title: "Manage Customers", desc: "Get access to your very own Rental Product and elevate your rental business with Limited-time." },
                  { title: "Manage Vendors", desc: "Get access to your very own Rental Product and elevate your rental business with Limited-time." },
                  { title: "Asset Management", desc: "Get access to your very own Rental Product and elevate your rental business with Limited-time." }
                ].map((item, idx) => (
                  <div className="col-6 mb-3" key={idx}>
                    <h6 className="fs-6 fw-bold text-dark">{item.title}</h6>
                    <p className="fs-7 text-muted">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Section */}
            <div className="col-md-6">
              <img src={dashboardImg} alt="Dashboard" className="img-fluid" style={{ borderRadius: "10px", marginTop: '-100px' }} />
            </div>
          </div>
        </TabPanel>
        <TabPanel value="4">{/* Vendor Management Content */}

          <div className="row d-flex align-items-center flex-column flex-md-row rounded-3 border p-4">
            {/* Text Section */}
            <div className="col-md-6">
              <h2 className="fs-4 fw-bold text-dark">Vendor Management</h2>
              <p className="fs-6 text-muted">Easily manage room availability, bookings, and occupancy status.</p>

              <div className="row mt-4">
                {[
                  { title: "Paying Guest", desc: "Get access to your very own Rental Product and elevate your rental business with Limited-time." },
                  { title: "Manage Customers", desc: "Get access to your very own Rental Product and elevate your rental business with Limited-time." },
                  { title: "Manage Vendors", desc: "Get access to your very own Rental Product and elevate your rental business with Limited-time." },
                  { title: "Asset Management", desc: "Get access to your very own Rental Product and elevate your rental business with Limited-time." }
                ].map((item, idx) => (
                  <div className="col-6 mb-3" key={idx}>
                    <h6 className="fs-6 fw-bold text-dark">{item.title}</h6>
                    <p className="fs-7 text-muted">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Section */}
            <div className="col-md-6">
              <img src={dashboardImg} alt="Dashboard" className="img-fluid" style={{ borderRadius: "10px", marginTop: '-100px' }} />
            </div>
          </div>
        </TabPanel>
        <TabPanel value="5">{/* Complaint Management Content */}
          <div className="row d-flex align-items-center flex-column flex-md-row rounded-3 border p-4">
            {/* Text Section */}
            <div className="col-md-6">
              <h2 className="fs-4 fw-bold text-dark">Complaint Management</h2>
              <p className="fs-6 text-muted">Easily manage room availability, bookings, and occupancy status.</p>

              <div className="row mt-4">
                {[
                  { title: "Paying Guest", desc: "Get access to your very own Rental Product and elevate your rental business with Limited-time." },
                  { title: "Manage Customers", desc: "Get access to your very own Rental Product and elevate your rental business with Limited-time." },
                  { title: "Manage Vendors", desc: "Get access to your very own Rental Product and elevate your rental business with Limited-time." },
                  { title: "Asset Management", desc: "Get access to your very own Rental Product and elevate your rental business with Limited-time." }
                ].map((item, idx) => (
                  <div className="col-6 mb-3" key={idx}>
                    <h6 className="fs-6 fw-bold text-dark">{item.title}</h6>
                    <p className="fs-7 text-muted">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Section */}
            <div className="col-md-6">
              <img src={dashboardImg} alt="Dashboard" className="img-fluid" style={{ borderRadius: "10px", marginTop: '-100px' }} />
            </div>
          </div>
        </TabPanel>
      </TabContext>
    </div>

  );
};

export default RoomManagement;

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
import HostelTopBlackImage from "../Assets/Images/landingpageimages/hosteltopimage.png";
import hostelBackround from "../Assets/Images/landingpageimages/Rectangle 34625101.png"
import dashboardImg from "../Assets/Images/landingpageimages/hostel.png";
import Rectangle from "../Assets/Images/landingpageimages/Rectangle 34624179.png";




const RoomManagement = () => {
  // const [activeTab, setActiveTab] = useState("room-management");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
   const [value, setValue] = React.useState("1");


  const handleChanges = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{height:'800px', backgroundColor:'white', paddingTop:'50px', paddingBottom:'100px'}}>
       <TabContext value={value}>
                 
                   <Box
                    sx={{ borderBottom: 0, borderColor: "divider" ,}}
                     
                   >
                     <TabList
                       orientation={isSmallScreen ? "vertical" : "horizontal"}
                       onChange={handleChanges}
                       aria-label="lab API tabs example"
                       style={{ marginLeft: "14px" ,marginTop:"-15px"}}
                       className="custom-tab-list d-flex flex-column flex-xs-column flex-sm-column flex-lg-row"
                     
                     >
                       <Tab
                         label="Room Management"
                         value="1"
                         style={{
                           marginTop: 0,
                           fontSize: 16,
                           fontFamily: "Gilroy",
                        //    color: "#4B4B4B",
                           lineHeight: "normal",
                           fontStyle: "normal",
                           fontWeight: 500,
                           textTransform: "none",
                         }}
                       />
                       <Tab
                         label="Customer Management"
                         value="2"
                         style={{
                           marginTop: 0,
                           fontSize: 16,
                           fontFamily: "Gilroy",
                        //    color: "#4B4B4B",
                           lineHeight: "normal",
                           fontStyle: "normal",
                           fontWeight: 500,
                           textTransform: "none",
                         }}
                       />
                       <Tab
                         label="Inventory Management"
                         value="3"
                         style={{
                           marginTop: 0,
                           fontSize: 16,
                           fontFamily: "Gilroy",
                        //    color: "#4B4B4B",
                           lineHeight: "normal",
                           fontStyle: "normal",
                           fontWeight: 500,
                           textTransform: "none",
                         }}
                       />

<Tab
                         label="Vendor Management"
                         value="4"
                         style={{
                           marginTop: 0,
                           fontSize: 16,
                           fontFamily: "Gilroy",
                        //    color: "#4B4B4B",
                           lineHeight: "normal",
                           fontStyle: "normal",
                           fontWeight: 500,
                           textTransform: "none",
                         }}
                       />

<Tab
                         label="Complaint Management"
                         value="5"
                         style={{
                           marginTop: 0,
                           fontSize: 16,
                           fontFamily: "Gilroy",
                        //    color: "#4B4B4B",
                           lineHeight: "normal",
                           fontStyle: "normal",
                           fontWeight: 500,
                           textTransform: "none",
                         }}
                       />
                     </TabList>
                   </Box>
                 
     
                 <TabPanel value="1">


                 <div className="row  rounded-3 border" style={{paddingTop:'100px', paddingBottom:'40px'}}>
        <div className="col-md-5">
          <h2 style={{ fontSize: 28, fontWeight: 700, color: 'rgba(9, 15, 41, 1)', fontFamily: 'Montserrat' }}>Room Management</h2>
          <p style={{ fontSize: 15, fontWeight: 500, color: 'rgba(76, 98, 128, 1)', fontFamily: 'Montserrat' }}>Easily manage room availability, bookings, and occupancy status.</p>
          
          <div className="row mt-5">
            <div className="col-md-6 mb-3">
              <h6 style={{ fontSize: 14, fontWeight: 700, color: 'rgba(9, 15, 41, 1)', fontFamily: 'Montserrat' }}>Paying Guest</h6>
              <p style={{ fontSize: 12, fontWeight: 400, color: 'rgba(76, 98, 128, 1)', fontFamily: 'Montserrat' }}>
                Get access to your very own Rental Product and elevate your rental business with Limited-time.
              </p>
            </div>
            <div className="col-md-6 mb-3">
              <h6 style={{ fontSize: 14, fontWeight: 700, color: 'rgba(9, 15, 41, 1)', fontFamily: 'Montserrat' }}>Manage Customers</h6>
              <p style={{ fontSize: 12, fontWeight: 400, color: 'rgba(76, 98, 128, 1)', fontFamily: 'Montserrat' }}>
                Get access to your very own Rental Product and elevate your rental business with Limited-time.
              </p>
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-6 mb-3">
              <h6 style={{ fontSize: 14, fontWeight: 700, color: 'rgba(9, 15, 41, 1)', fontFamily: 'Montserrat' }}>Manage Vendors</h6>
              <p style={{ fontSize: 12, fontWeight: 400, color: 'rgba(76, 98, 128, 1)', fontFamily: 'Montserrat' }}>
                Get access to your very own Rental Product and elevate your rental business with Limited-time.
              </p>
            </div>
            <div className="col-md-6 mb-3">
              <h6 style={{ fontSize: 14, fontWeight: 700, color: 'rgba(9, 15, 41, 1)', fontFamily: 'Montserrat' }}>Asset Management</h6>
              <p style={{ fontSize: 12, fontWeight: 400, color: 'rgba(76, 98, 128, 1)', fontFamily: 'Montserrat' }}>
                Get access to your very own Rental Product and elevate your rental business with Limited-time.
              </p>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="col-md-7 position-relative">
 
              {/* Decorative Ellipses Above Hostel Image */}
    

              {/* Men Image - Right Top */}
           

              {/* Top Black Bar on Dashboard */}
              <img src={HostelTopBlackImage} alt="Hostel Top" className="position-absolute" style={{ top: "-30px", width: "97%", zIndex: "2", }} />
              <img    src={Rectangle} 
    alt="Rectangle" className="position-absolute" style={{ top: "-60px", left:"-5px", right:'30px', height:'600px', width: "100%", zIndex: "1", }} />
    
 <div className="position-relative d-inline-block w-100">
  
  <img 
    src={hostelBackround} 
    alt="hostelBackround" 
    className="img-fluid rounded shadow"
    style={{ position: "relative", zIndex: "2", width: "100%" }} 
  />

  {/* Dashboard Image (Above) */}
  <img 
    src={dashboardImg} 
    alt="Dashboard" 
    className="img-fluid mt-4"
    style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", zIndex: "3", width: "90%" }} 
  />

  {/* Line Image (Bottom-Right) */}
  
</div>





           
        </div>
      </div>
                   </TabPanel>

                   <TabPanel value="2">
                    

                   <div className="row  rounded-3 border" style={{paddingTop:'100px' , paddingBottom:'40px'}}>
        <div className="col-md-5">
          <h2 style={{ fontSize: 28, fontWeight: 700, color: 'rgba(9, 15, 41, 1)', fontFamily: 'Montserrat' }}>Customer Management</h2>
          <p style={{ fontSize: 15, fontWeight: 500, color: 'rgba(76, 98, 128, 1)', fontFamily: 'Montserrat' }}>Easily manage room availability, bookings, and occupancy status.</p>
          
          <div className="row mt-5">
            <div className="col-md-6 mb-3">
              <h6 style={{ fontSize: 14, fontWeight: 700, color: 'rgba(9, 15, 41, 1)', fontFamily: 'Montserrat' }}>Paying Guest</h6>
              <p style={{ fontSize: 12, fontWeight: 400, color: 'rgba(76, 98, 128, 1)', fontFamily: 'Montserrat' }}>
                Get access to your very own Rental Product and elevate your rental business with Limited-time.
              </p>
            </div>
            <div className="col-md-6 mb-3">
              <h6 style={{ fontSize: 14, fontWeight: 700, color: 'rgba(9, 15, 41, 1)', fontFamily: 'Montserrat' }}>Manage Customers</h6>
              <p style={{ fontSize: 12, fontWeight: 400, color: 'rgba(76, 98, 128, 1)', fontFamily: 'Montserrat' }}>
                Get access to your very own Rental Product and elevate your rental business with Limited-time.
              </p>
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-6 mb-3">
              <h6 style={{ fontSize: 14, fontWeight: 700, color: 'rgba(9, 15, 41, 1)', fontFamily: 'Montserrat' }}>Manage Vendors</h6>
              <p style={{ fontSize: 12, fontWeight: 400, color: 'rgba(76, 98, 128, 1)', fontFamily: 'Montserrat' }}>
                Get access to your very own Rental Product and elevate your rental business with Limited-time.
              </p>
            </div>
            <div className="col-md-6 mb-3">
              <h6 style={{ fontSize: 14, fontWeight: 700, color: 'rgba(9, 15, 41, 1)', fontFamily: 'Montserrat' }}>Asset Management</h6>
              <p style={{ fontSize: 12, fontWeight: 400, color: 'rgba(76, 98, 128, 1)', fontFamily: 'Montserrat' }}>
                Get access to your very own Rental Product and elevate your rental business with Limited-time.
              </p>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="col-md-7 position-relative">
 
              {/* Decorative Ellipses Above Hostel Image */}
    

              {/* Men Image - Right Top */}
           

              {/* Top Black Bar on Dashboard */}
              <img src={HostelTopBlackImage} alt="Hostel Top" className="position-absolute" style={{ top: "-30px", width: "97%", zIndex: "2", }} />
              <img    src={Rectangle} 
    alt="Rectangle" className="position-absolute" style={{ top: "-60px", left:"-5px", right:'30px', height:'600px', width: "100%", zIndex: "1", }} />
    
 <div className="position-relative d-inline-block w-100">
  
  <img 
    src={hostelBackround} 
    alt="hostelBackround" 
    className="img-fluid rounded shadow"
    style={{ position: "relative", zIndex: "2", width: "100%" }} 
  />

  {/* Dashboard Image (Above) */}
  <img 
    src={dashboardImg} 
    alt="Dashboard" 
    className="img-fluid mt-4"
    style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", zIndex: "3", width: "90%" }} 
  />

  {/* Line Image (Bottom-Right) */}
  
</div>





           
        </div>
      </div>
                   </TabPanel>

                   <TabPanel value="3">
                    
                 <div className="row  rounded-3 border" style={{paddingTop:'100px' , paddingBottom:'40px'}}>
        <div className="col-md-5">
          <h2 style={{ fontSize: 28, fontWeight: 700, color: 'rgba(9, 15, 41, 1)', fontFamily: 'Montserrat' }}>Inventory Management</h2>
          <p style={{ fontSize: 15, fontWeight: 500, color: 'rgba(76, 98, 128, 1)', fontFamily: 'Montserrat' }}>Easily manage room availability, bookings, and occupancy status.</p>
          
          <div className="row mt-5">
            <div className="col-md-6 mb-3">
              <h6 style={{ fontSize: 14, fontWeight: 700, color: 'rgba(9, 15, 41, 1)', fontFamily: 'Montserrat' }}>Paying Guest</h6>
              <p style={{ fontSize: 12, fontWeight: 400, color: 'rgba(76, 98, 128, 1)', fontFamily: 'Montserrat' }}>
                Get access to your very own Rental Product and elevate your rental business with Limited-time.
              </p>
            </div>
            <div className="col-md-6 mb-3">
              <h6 style={{ fontSize: 14, fontWeight: 700, color: 'rgba(9, 15, 41, 1)', fontFamily: 'Montserrat' }}>Manage Customers</h6>
              <p style={{ fontSize: 12, fontWeight: 400, color: 'rgba(76, 98, 128, 1)', fontFamily: 'Montserrat' }}>
                Get access to your very own Rental Product and elevate your rental business with Limited-time.
              </p>
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-6 mb-3">
              <h6 style={{ fontSize: 14, fontWeight: 700, color: 'rgba(9, 15, 41, 1)', fontFamily: 'Montserrat' }}>Manage Vendors</h6>
              <p style={{ fontSize: 12, fontWeight: 400, color: 'rgba(76, 98, 128, 1)', fontFamily: 'Montserrat' }}>
                Get access to your very own Rental Product and elevate your rental business with Limited-time.
              </p>
            </div>
            <div className="col-md-6 mb-3">
              <h6 style={{ fontSize: 14, fontWeight: 700, color: 'rgba(9, 15, 41, 1)', fontFamily: 'Montserrat' }}>Asset Management</h6>
              <p style={{ fontSize: 12, fontWeight: 400, color: 'rgba(76, 98, 128, 1)', fontFamily: 'Montserrat' }}>
                Get access to your very own Rental Product and elevate your rental business with Limited-time.
              </p>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="col-md-7 position-relative">
 
              {/* Decorative Ellipses Above Hostel Image */}
    

              {/* Men Image - Right Top */}
           

              {/* Top Black Bar on Dashboard */}
              <img src={HostelTopBlackImage} alt="Hostel Top" className="position-absolute" style={{ top: "-30px", width: "97%", zIndex: "2", }} />
              <img    src={Rectangle} 
    alt="Rectangle" className="position-absolute" style={{ top: "-60px", left:"-5px", right:'30px', height:'600px', width: "100%", zIndex: "1", }} />
    
 <div className="position-relative d-inline-block w-100">
  
  <img 
    src={hostelBackround} 
    alt="hostelBackround" 
    className="img-fluid rounded shadow"
    style={{ position: "relative", zIndex: "2", width: "100%" }} 
  />

  {/* Dashboard Image (Above) */}
  <img 
    src={dashboardImg} 
    alt="Dashboard" 
    className="img-fluid mt-4"
    style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", zIndex: "3", width: "90%" }} 
  />

  {/* Line Image (Bottom-Right) */}
  
</div>





           
        </div>
      </div>
                   </TabPanel>

                   <TabPanel value="4">
                    
                 <div className="row  rounded-3 border" style={{paddingTop:'100px', paddingBottom:'40px'}}>
        <div className="col-md-5">
          <h2 style={{ fontSize: 28, fontWeight: 700, color: 'rgba(9, 15, 41, 1)', fontFamily: 'Montserrat' }}>Vendor Management</h2>
          <p style={{ fontSize: 15, fontWeight: 500, color: 'rgba(76, 98, 128, 1)', fontFamily: 'Montserrat' }}>Easily manage room availability, bookings, and occupancy status.</p>
          
          <div className="row mt-5">
            <div className="col-md-6 mb-3">
              <h6 style={{ fontSize: 14, fontWeight: 700, color: 'rgba(9, 15, 41, 1)', fontFamily: 'Montserrat' }}>Paying Guest</h6>
              <p style={{ fontSize: 12, fontWeight: 400, color: 'rgba(76, 98, 128, 1)', fontFamily: 'Montserrat' }}>
                Get access to your very own Rental Product and elevate your rental business with Limited-time.
              </p>
            </div>
            <div className="col-md-6 mb-3">
              <h6 style={{ fontSize: 14, fontWeight: 700, color: 'rgba(9, 15, 41, 1)', fontFamily: 'Montserrat' }}>Manage Customers</h6>
              <p style={{ fontSize: 12, fontWeight: 400, color: 'rgba(76, 98, 128, 1)', fontFamily: 'Montserrat' }}>
                Get access to your very own Rental Product and elevate your rental business with Limited-time.
              </p>
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-6 mb-3">
              <h6 style={{ fontSize: 14, fontWeight: 700, color: 'rgba(9, 15, 41, 1)', fontFamily: 'Montserrat' }}>Manage Vendors</h6>
              <p style={{ fontSize: 12, fontWeight: 400, color: 'rgba(76, 98, 128, 1)', fontFamily: 'Montserrat' }}>
                Get access to your very own Rental Product and elevate your rental business with Limited-time.
              </p>
            </div>
            <div className="col-md-6 mb-3">
              <h6 style={{ fontSize: 14, fontWeight: 700, color: 'rgba(9, 15, 41, 1)', fontFamily: 'Montserrat' }}>Asset Management</h6>
              <p style={{ fontSize: 12, fontWeight: 400, color: 'rgba(76, 98, 128, 1)', fontFamily: 'Montserrat' }}>
                Get access to your very own Rental Product and elevate your rental business with Limited-time.
              </p>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="col-md-7 position-relative">
 
              {/* Decorative Ellipses Above Hostel Image */}
    

              {/* Men Image - Right Top */}
           

              {/* Top Black Bar on Dashboard */}
              <img src={HostelTopBlackImage} alt="Hostel Top" className="position-absolute" style={{ top: "-30px", width: "97%", zIndex: "2", }} />
              <img    src={Rectangle} 
    alt="Rectangle" className="position-absolute" style={{ top: "-60px", left:"-5px", right:'30px', height:'600px', width: "100%", zIndex: "1", }} />
    
 <div className="position-relative d-inline-block w-100">
  
  <img 
    src={hostelBackround} 
    alt="hostelBackround" 
    className="img-fluid rounded shadow"
    style={{ position: "relative", zIndex: "2", width: "100%" }} 
  />

  {/* Dashboard Image (Above) */}
  <img 
    src={dashboardImg} 
    alt="Dashboard" 
    className="img-fluid mt-4"
    style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", zIndex: "3", width: "90%" }} 
  />

  {/* Line Image (Bottom-Right) */}
  
</div>





           
        </div>
      </div>
                   </TabPanel>

                   <TabPanel value="5">
                    
                 <div className="row  rounded-3 border" style={{paddingTop:'100px' , paddingBottom:'40px'}}>
        <div className="col-md-5">
          <h2 style={{ fontSize: 28, fontWeight: 700, color: 'rgba(9, 15, 41, 1)', fontFamily: 'Montserrat' }}>Complaint Management</h2>
          <p style={{ fontSize: 15, fontWeight: 500, color: 'rgba(76, 98, 128, 1)', fontFamily: 'Montserrat' }}>Easily manage room availability, bookings, and occupancy status.</p>
          
          <div className="row mt-5">
            <div className="col-md-6 mb-3">
              <h6 style={{ fontSize: 14, fontWeight: 700, color: 'rgba(9, 15, 41, 1)', fontFamily: 'Montserrat' }}>Paying Guest</h6>
              <p style={{ fontSize: 12, fontWeight: 400, color: 'rgba(76, 98, 128, 1)', fontFamily: 'Montserrat' }}>
                Get access to your very own Rental Product and elevate your rental business with Limited-time.
              </p>
            </div>
            <div className="col-md-6 mb-3">
              <h6 style={{ fontSize: 14, fontWeight: 700, color: 'rgba(9, 15, 41, 1)', fontFamily: 'Montserrat' }}>Manage Customers</h6>
              <p style={{ fontSize: 12, fontWeight: 400, color: 'rgba(76, 98, 128, 1)', fontFamily: 'Montserrat' }}>
                Get access to your very own Rental Product and elevate your rental business with Limited-time.
              </p>
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-6 mb-3">
              <h6 style={{ fontSize: 14, fontWeight: 700, color: 'rgba(9, 15, 41, 1)', fontFamily: 'Montserrat' }}>Manage Vendors</h6>
              <p style={{ fontSize: 12, fontWeight: 400, color: 'rgba(76, 98, 128, 1)', fontFamily: 'Montserrat' }}>
                Get access to your very own Rental Product and elevate your rental business with Limited-time.
              </p>
            </div>
            <div className="col-md-6 mb-3">
              <h6 style={{ fontSize: 14, fontWeight: 700, color: 'rgba(9, 15, 41, 1)', fontFamily: 'Montserrat' }}>Asset Management</h6>
              <p style={{ fontSize: 12, fontWeight: 400, color: 'rgba(76, 98, 128, 1)', fontFamily: 'Montserrat' }}>
                Get access to your very own Rental Product and elevate your rental business with Limited-time.
              </p>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="col-md-7 position-relative">
 
              {/* Decorative Ellipses Above Hostel Image */}
    

              {/* Men Image - Right Top */}
           

              {/* Top Black Bar on Dashboard */}
              <img src={HostelTopBlackImage} alt="Hostel Top" className="position-absolute" style={{ top: "-30px", width: "97%", zIndex: "2", }} />
              <img    src={Rectangle} 
    alt="Rectangle" className="position-absolute" style={{ top: "-60px", left:"-5px", right:'30px', height:'600px', width: "100%", zIndex: "1", }} />
    
 <div className="position-relative d-inline-block w-100">
  
  <img 
    src={hostelBackround} 
    alt="hostelBackround" 
    className="img-fluid rounded shadow"
    style={{ position: "relative", zIndex: "2", width: "100%" }} 
  />

  {/* Dashboard Image (Above) */}
  <img 
    src={dashboardImg} 
    alt="Dashboard" 
    className="img-fluid mt-4"
    style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", zIndex: "3", width: "90%" }} 
  />

  {/* Line Image (Bottom-Right) */}
  
</div>





           
        </div>
      </div>
                    </TabPanel>

                   </TabContext>
    </div>
  );
};

export default RoomManagement;

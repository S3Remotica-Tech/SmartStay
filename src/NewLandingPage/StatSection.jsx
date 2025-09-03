import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Backroundimage from "../Assets/Images/landingpageimages/blackbg.png";
import { Helmet } from "react-helmet-async";
const StatsSection = () => {
  const sectionStyle = {
    background: `url(${Backroundimage}) no-repeat center center/cover`,
    padding: "60px 0",
    color: "white",
  };

  const statBoxStyle = {
    background: "white",
    color: "black",
    padding: "40px 20px",
    borderRadius: "12px",
    textAlign: "left",
    flex: "1 1 45%", // Adjusts for responsiveness
    margin: "10px", // Adds spacing between items
  };

  return (
    <>
      <Helmet prioritizeSeoTags>
            <html lang="en-IN" />
    
           {/* Core SEO */}
      <title>SmartStay PG & Hostel Management Software</title>
      <meta
        name="description"
        content="Indiaâ€™s most trusted hostel software. SmartStay offers rent collection tools, tenant billing, PG booking system, and a complete hostel issue tracking tool."  />
    <link rel="canonical" href="https://smartstay.qbatz.com/" />
      <meta name="robots" content="index, follow" />
    
    {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="SmartStay" />
      <meta property="og:title" content="SmartStay PG & Hostel Management Software" />
      <meta property="og:description" content="Indiaâ€™s most trusted hostel software. SmartStay offers rent collection tools, tenant billing, PG booking system, and a complete hostel issue tracking tool." />
      <meta property="og:url" content="https://smartstay.qbatz.com/" />
      <meta property="og:image" content="https://smartstay.qbatz.com/assets/sm_homepage-CODs4gRc.png" />
      <meta property="og:image:alt" content="SmartStay dashboard showing hostel room availability and bed occupancy" />
       
      
            {/* Schema.org WebPage */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "SmartStay PG & Hostel Management Software",
          url: "https://smartstay.qbatz.com/",
          description:
            "Indiaâ€™s most trusted hostel software. SmartStay offers rent collection tools, tenant billing, PG booking system, and a complete hostel issue tracking tool.",
              })}
            </script>
          </Helmet>
    <div style={sectionStyle} className="d-flex align-items-center">
      <div className="container">
        <div className="row">
          {/* Left Side - Statistics */}
          <div className="col-md-6 d-flex flex-wrap justify-content-center">
            <div style={statBoxStyle} className="w-100 w-md-50">
              <h2 style={{ fontWeight: 700 }}>200K</h2>
              <p style={{
                color: "rgba(9, 15, 41, 1)",
                fontWeight: 400,
                fontFamily: "Montserrat",
                fontSize: 18,
              }}>Users use this platform</p>
            </div>
            <div style={statBoxStyle} className="w-100 w-md-50">
              <h2 style={{ fontWeight: 700 }}>30K+</h2>
              <p style={{
                color: "rgba(9, 15, 41, 1)",
                fontWeight: 400,
                fontFamily: "Montserrat",
                fontSize: 18,
              }}>Active users this month</p>
            </div>
            <div style={statBoxStyle} className="w-100 w-md-50">
              <h2 style={{ fontWeight: 700 }}>25K+</h2>
              <p style={{
                color: "rgba(9, 15, 41, 1)",
                fontWeight: 400,
                fontFamily: "Montserrat",
                fontSize: 18,
              }}>Available states</p>
            </div>
            <div style={statBoxStyle} className="w-100 w-md-50">
              <h2 style={{ fontWeight: 700 }}>100+</h2>
              <p style={{
                color: "rgba(9, 15, 41, 1)",
                fontWeight: 400,
                fontFamily: "Montserrat",
                fontSize: 18,
              }}>PG management</p>
            </div>
          </div>

          {/* Right Side - Text Content */}
          <div className="col-md-6 d-flex flex-column align-items-center align-items-md-start justify-content-center text-center text-md-start mt-4 mt-md-0">

            <p
              style={{
                color: "rgba(207, 215, 226, 1)",
                fontWeight: 400,
                fontFamily: "Montserrat",
                fontSize: 22,
                marginTop: '20px'
              }}
            >
              Efficiently manage your guests, rooms, services, inventory, vendors, complaints and expenses with user friendly and intuitive dashboards and generate a variety of reports that will help, plan and run your business hassle free.
            </p>
          </div>

        </div>
      </div>
    </div>
    </>
  );
};

export default StatsSection;
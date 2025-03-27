import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Backroundimage from "../Assets/Images/landingpageimages/blackbg.png";

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
    <div style={sectionStyle} className="d-flex align-items-center">
      <div className="container">
        <div className="row">
          {/* Left Side - Statistics */}
          <div className="col-md-6 d-flex flex-wrap justify-content-center">
            <div style={statBoxStyle} className="w-100 w-md-50">
              <h2 style={{fontWeight:700}}>200K</h2>
              <p   style={{
      color: "rgba(9, 15, 41, 1)",
      fontWeight: 400,
      fontFamily: "Montserrat",
      fontSize: 18,
    }}>Users use this platform</p>
            </div>
            <div style={statBoxStyle} className="w-100 w-md-50">
              <h2 style={{fontWeight:700}}>30K+</h2>
              <p  style={{
      color: "rgba(9, 15, 41, 1)",
      fontWeight: 400,
      fontFamily: "Montserrat",
      fontSize: 18,
    }}>Active users this month</p>
            </div>
            <div style={statBoxStyle} className="w-100 w-md-50">
              <h2 style={{fontWeight:700}}>25K+</h2>
              <p  style={{
      color: "rgba(9, 15, 41, 1)",
      fontWeight: 400,
      fontFamily: "Montserrat",
      fontSize: 18,
    }}>Available states</p>
            </div>
            <div style={statBoxStyle} className="w-100 w-md-50">
              <h2 style={{fontWeight:700}}>100+</h2>
              <p  style={{
      color: "rgba(9, 15, 41, 1)",
      fontWeight: 400,
      fontFamily: "Montserrat",
      fontSize: 18,
    }}>PG management</p>
            </div>
          </div>

          {/* Right Side - Text Content */}
          <div className="col-md-6 d-flex flex-column align-items-center align-items-md-start justify-content-center text-center text-md-start mt-4 mt-md-0">
  <h2
    style={{
      color: "rgba(255, 255, 255, 1)",
      fontWeight: 700,
      fontFamily: "Montserrat",
      fontSize: 34,
      fontFamily: "Montserrat",
    }}
  >
    Simplify your Paying Guest management with SmartStay
  </h2>
  <p
    style={{
      color: "rgba(207, 215, 226, 1)",
      fontWeight: 400,
      fontFamily: "Montserrat",
      fontSize: 22,
      marginTop:'20px'
    }}
  >
    Efficiently manage rooms, customers, inventory, vendors, complaints,
    expenses, and reports—all in one place.
  </p>
</div>

        </div>
      </div>
    </div>
  );
};

export default StatsSection;
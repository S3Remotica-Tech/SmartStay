import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import { BsArrowRight } from "react-icons/bs";
import dashboardImg from "../Assets/Images/landingpageimages/sm_homepage.png";
// import Men from "../Assets/Images/landingpageimages/men.svg";
// import peopleonboard from "../Assets/Images/landingpageimages/peopleonboard.png";
import TopLeftCurve from "../Assets/Images/landingpageimages/topleftcurve.png";
import HomebgImage from "../Assets/Images/landingpageimages/home_bg_image.png";
// import HostelTopBlackImage from "../Assets/Images/landingpageimages/hosteltopimage.png";
// import Elippsered from "../Assets/Images/landingpageimages/Ellipse_red.png";
// import Elippseblue from "../Assets/Images/landingpageimages/Ellipse_blue.png";
// import Elippseyellow from "../Assets/Images/landingpageimages/Ellipse_yellow.png";
// import Line from "../Assets/Images/landingpageimages/line.png";
// import hostelBackround from "../Assets/Images/landingpageimages/Rectangle 34625101.png"
// import RightArrow from "../Assets/Images/landingpageimages/right_arrow.png";
import "./Homepage.css"

const HomePage = () => {


  let navigate = useNavigate();
  
    const handleSignIn = () => {
      navigate("/login-Page");
    };
  
    const handleSignUp = () => {
      navigate("/create-account");
    };

  return (
    <>
      {/* Background Image */}
      <>
  {/* Background Image */}
  <div
    className="position-relative w-100 "
    style={{
      // minHeight: "100vh",
      backgroundImage: `url(${HomebgImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  >
    <img
      src={TopLeftCurve}
      alt="Top Left Curve"
      className="position-absolute"
      style={{ top: "0", left: "0", width: "150px", zIndex: "1" }}
    />

    <Container fluid className="py-5">
      <Container fluid>
        <Row className="align-items-center flex-column flex-md-row">
          {/* Left Side Content */}
          <Col md={6} className="d-flex flex-column align-items-start justify-content-center text-start">
          <Col md={11} className="mt-5 ms-5 responsive-home-text">
  <h1 className="responsive-title"
    style={{
      color: "rgba(9, 15, 41, 1)",
      fontWeight: 700,
      fontFamily: "Montserrat",
      fontSize: "clamp(24px, 5vw, 40px)",
    }}
  >
    Simplify your Paying Guest management with Hostel{" "}
    <span
      style={{
        color: "#2D5EFF",
        fontWeight: 900,
      }}
    >
      SmartStay
    </span>
  </h1> 
  <p className="responsive-desc"
    style={{
      color: "#3A435C",
      fontWeight: 400,
      fontFamily: "Montserrat",
      fontSize: "clamp(14px, 2vw, 18px)",
      maxWidth: "600px",
    }}
  >
    Efficiently manage rooms, customers, inventory, vendors, complaints, expenses, and reports—all in one place.
  </p>
  <div className="mt-4 d-flex gap-3 responsive-buttons">
    <Button
      className="d-flex align-items-center gap-2 responsive-btn"
      onClick={handleSignUp}
      style={{
        backgroundColor: "#2D5EFF",
        color: "#fff",
        fontSize: "16px",
        fontFamily: "Montserrat",
        fontWeight: 600,
        padding: "12px 20px",
        borderRadius: "8px",
        border: "none",
      }}
    >
      Get Started →
    </Button>
    <Button className="responsive-btn"
      variant="outline-dark"
      onClick={handleSignIn}
      style={{
        fontSize: "16px",
        fontFamily: "Montserrat",
        fontWeight: 600,
        padding: "12px 20px",
        borderRadius: "8px",
      }}
    >
      Sign In →
    </Button>
  </div>
  <Row className="mt-5 w-100 responsive-stats">
    <Col xs={4}>
      <div>
        <h3 className="responsive-count"
          style={{
            color: "#090F29",
            fontSize: "clamp(24px, 4vw, 34px)",
            fontWeight: 700,
          }}
        >
          125K+
        </h3>
        <p className="responsive-label" style={{ color: "#3A435C", fontSize: "clamp(12px, 2vw, 15px)" }}>
          Total Active Hostels
        </p>
      </div>
    </Col>
    <Col xs={4}>
      <div>
        <h3  className="responsive-count"
          style={{
            color: "#090F29",
            fontSize: "clamp(24px, 4vw, 34px)",
            fontWeight: 700,
          }}
        >
          468K+
        </h3>
        <p className="responsive-label" style={{ color: "#3A435C", fontSize: "clamp(12px, 2vw, 15px)" }}>
          Total People Hostels
        </p>
      </div>
    </Col>
  </Row>
  </Col>
</Col>




          {/* Right Side Image */}
          <Col md={6} className="text-center">
  <img
    src={dashboardImg}
    alt="People Onboard"
    className="img-fluid"
    style={{
      width: "100%",  // Increased width
      maxWidth: "700px", // Optional: Restricts the maximum width
      height: "auto"
    }}
  />
</Col>

        </Row>
      </Container>
    </Container>
  </div>
</>

    </>
  );
};

export default HomePage;
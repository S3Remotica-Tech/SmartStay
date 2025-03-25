import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import dashboardImg from "../Assets/Images/landingpageimages/hostel.png";
import Men from "../Assets/Images/landingpageimages/men.svg";
import peopleonboard from "../Assets/Images/landingpageimages/peopleonboard.png";
import TopLeftCurve from "../Assets/Images/landingpageimages/topleftcurve.png";
import HomebgImage from "../Assets/Images/landingpageimages/home_bg_image.png";
import HostelTopBlackImage from "../Assets/Images/landingpageimages/hosteltopimage.png";
import Elippsered from "../Assets/Images/landingpageimages/Ellipse_red.png";
import Elippseblue from "../Assets/Images/landingpageimages/Ellipse_blue.png";
import Elippseyellow from "../Assets/Images/landingpageimages/Ellipse_yellow.png";
import Line from "../Assets/Images/landingpageimages/line.png";
import hostelBackround from "../Assets/Images/landingpageimages/Rectangle 34625101.png"
import RightArrow from "../Assets/Images/landingpageimages/right_arrow.png";

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
      <div className="position-relative w-100 pt-5">
        <img
          src={HomebgImage}
          alt="Background"
          className="position-absolute w-100"
          style={{ zIndex: "-1", top: "0", left: "0" }}
        />
        <img
          src={TopLeftCurve}
          alt="Top Left Curve"
          className="position-absolute"
          style={{ top: "0", left: "0", width: "150px", zIndex: "1" }}
        />
      </div>

      <Container fluid className="py-5">
        <Container>
          <Row className="align-items-center">
            {/* Left Side Content */}
            <Col md={6} className="text-md-start text-center">
              <h1 style={{
      color: "rgba(9, 15, 41, 1)",
      fontWeight: 600,
      fontFamily: "Montserrat",
      fontSize: 42,
      marginTop:'20px'
    }}>
                Simplify your Paying Guest management with Hostel<span 
                style={{  color: "rgba(30, 69, 225, 1)", fontWeight: 900,  fontFamily: "Montserrat",  fontSize: 42, }}
    > SmartStay</span>
              </h1>
              <p  style={{  color: "rgba(9, 15, 41, 1)", fontWeight: 400,  fontFamily: "Montserrat",  fontSize: 18, }}>
                Efficiently manage rooms, customers, inventory, vendors, complaints, expenses, and reports—all in one place.
              </p>
              <div className="mt-4 d-flex justify-content-md-start justify-content-center">
              <Button
                variant=""
                className="d-flex align-items-center gap-2 me-3"
                onClick={handleSignUp}
                style={{
                  backgroundColor: "rgba(30, 69, 225, 1)",
                  color: "rgba(255, 255, 255, 1)",
                  fontSize: 16,
                  fontFamily: "Montserrat",
                  borderRadius: 6,
                  padding: "10px 15px",
                  border: "none",
                }}
              >
                Get Started
                <img src={RightArrow} alt="Arrow Icon" style={{ width: "15px" }} />
              </Button>
                <Button variant="outline-dark"  onClick={handleSignIn} style={{   fontSize: 16,
                  fontFamily: "Montserrat",}}>Sign in <BsArrowRight className="ms-2" /></Button>
              </div>
              <Row className="mt-5">
                <Col xs={6}>
                  <h3    style={{color: "rgba(9, 15, 41, 1)", fontSize: 34,  fontWeight:700,  fontFamily: "Montserrat",}} >125K+</h3>
                  <p style={{color: "rgba(58, 67, 92, 1)", fontSize: 15,  fontWeight:400,  fontFamily: "Montserrat",}}>Total Active Hostels</p>
                </Col>
                <Col xs={6}>
                  <h3 style={{color: "rgba(9, 15, 41, 1)", fontSize: 34,  fontWeight:700,  fontFamily: "Montserrat",}}>468K+</h3>
                  <p style={{color: "rgba(58, 67, 92, 1)", fontSize: 15,  fontWeight:400,  fontFamily: "Montserrat",}}>Total People Hostels</p>
                </Col>
              </Row>
            </Col>

            {/* Right Side Image */}
            <Col md={6} className="text-center position-relative">
              {/* Decorative Ellipses Above Hostel Image */}
    

              {/* Men Image - Right Top */}
              <img
                src={Men}
                alt="People Onboard"
                className="position-absolute d-none d-md-block"
                style={{
                  top: "-90px",
                  right: "-40px",
                  width: "100px",
                  zIndex: "3",
                }}
              />

              {/* Top Black Bar on Dashboard */}
              <img src={HostelTopBlackImage} alt="Hostel Top" className="position-absolute" style={{ top: "-30px", width: "100%",  }} />

              {/* Main Dashboard Image */}
 {/* Background Image for Dashboard */}
 <div className="position-relative d-inline-block w-100">
  {/* Hostel Background Image (Behind) */}
  <img 
    src={hostelBackround} 
    alt="hostelBackround" 
    className="img-fluid rounded shadow"
    style={{ position: "relative", zIndex: "1", width: "100%" }} 
  />

  {/* Dashboard Image (Above) */}
  <img 
    src={dashboardImg} 
    alt="Dashboard" 
    className="img-fluid mt-4"
    style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", zIndex: "2", width: "90%" }} 
  />

  {/* Line Image (Bottom-Right) */}
  <img 
    src={Line} 
    alt="Line" 
    className="position-absolute"
    style={{ bottom: "-60px", left: "auto", right: "-80px", width: "200px",height:'150px', zIndex: "0" }} 
  />
</div>




              <img src={peopleonboard} alt="People Onboard" className="position-absolute" style={{ bottom: "-20px", left: "3%", transform: "translateX(-50%)", width: "200px", zIndex: "2" }} />

            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default HomePage;
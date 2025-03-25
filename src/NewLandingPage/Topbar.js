import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link, Element, animateScroll as scroll } from "react-scroll";
import HomePage from "./Homepage";
import Footers from "./Footers";
import Startup from "./Startup";
import StatsSection from "./StatSection";
import TestimonialSlider from "./ImageSlider";
import Getanswer from "./Getanswer";
import KeyFeatures from "./Keyfeature";
import Logo from "../Assets/Images/New_images/Smartstay_LOGO.svg";
import RightArrow from "../Assets/Images/landingpageimages/right_arrow.png";
import Contact from "./Contact";
import SubscriptionPlan from "./Subscription";
import SmartStaySection from "./Whysmartstay";
import RoomManagement from "./ManagementTabs";

function FrontPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/login-Page");
  };

  const handleSignUp = () => {
    navigate("/create-account");
  };

  const [activeSection, setActiveSection] = useState("firstPage");

  const handleSetActive = (section) => {
    setActiveSection(section);
  };

  const linkStyle = (isActive) => ({
    cursor: "pointer",
    fontSize: 16,
    fontWeight: isActive ? 700 : 500,
    color: isActive ? "rgba(30, 69, 225, 1)" : "#000",
    fontFamily: "Montserrat",
    padding: "10px 25px",
  });

  const handleBrandClick = () => {
    scroll.scrollTo(0);
    setActiveSection("firstPage");
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" fixed="top" style={{ backgroundColor: "#FFFFFF" }}>
        <Container fluid className="px-lg-5 px-md-4 px-sm-3">
          <Navbar.Brand onClick={handleBrandClick}>
            <img src={Logo} alt="logo" style={{ width: 176.45, height: 33, cursor: "pointer" }} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mx-auto text-center">
              <Nav.Link
                className="custom-link"
                as={Link}
                style={linkStyle(activeSection === "firstPage")}
                onClick={() => handleSetActive("firstPage")}
                to="firstPage"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                activeClass="active-link"
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="keyFeature"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                activeClass="active-link"
                style={linkStyle(activeSection === "keyFeature")}
                onClick={() => handleSetActive("keyFeature")}
              >
              Features
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="Pricing"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                activeClass="active-link"
                style={linkStyle(activeSection === "Pricing")}
                onClick={() => handleSetActive("Pricing")}
              >
              Pricing
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="Contact_us"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                activeClass="active-link"
                style={linkStyle(activeSection === "Contact_us")}
                onClick={() => handleSetActive("Contact_us")}
              >
              Contact Us
              </Nav.Link>
            </Nav>
            <Nav className="d-flex align-items-center justify-content-center gap-3 mt-lg-0 mt-3">
              <Nav.Link style={{ fontSize: 16, fontWeight: 500, color: "#000", fontFamily: "Montserrat", marginRight: 20 }} onClick={handleSignIn}>
                Sign in
              </Nav.Link>
              <Button
                onClick={handleSignUp}
                variant=""
                className="d-flex align-items-center gap-2"
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
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {activeSection === "firstPage" && (
        <Element name="firstPage" style={{ paddingTop: "70px", display: "flex", flexDirection: "column" }}>
          <HomePage />
          <Startup />
          <StatsSection />
          <RoomManagement/>
          <TestimonialSlider />
          {/* <SmartStaySection/> */}
          <Getanswer />
        </Element>
      )}

      {activeSection === "keyFeature" && (
        <Element name="keyFeature" style={{ paddingTop: "70px", display: "flex", flexDirection: "column" }}>
          <KeyFeatures />
          <SmartStaySection/>
          <Getanswer />
        </Element>
      )}

{activeSection === "Pricing" && (
        <Element name="Pricing" style={{ paddingTop: "70px", display: "flex", flexDirection: "column" }}>
          <SubscriptionPlan />
          <SmartStaySection/>
          <Getanswer />
        </Element>
      )}

{activeSection === "Contact_us" && (
        <Element name="Contact_us" style={{ paddingTop: "70px", display: "flex", flexDirection: "column" }}>
          <Contact/>
        
          <Getanswer />
        </Element>
      )}

      <Element name="footer">
        <Footers handleLinkName={handleSetActive} />
      </Element>
    </>
  );
}

export default FrontPage;

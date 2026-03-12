import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { Link, Element, animateScroll as scroll } from "react-scroll";
import HomePage from "../NewV2LandingPage/Homepage";
import Footers from "../NewV2LandingPage/Footers";
// import Startup from "./Startup";
// import StatsSection from "./StatSection";
// import TestimonialSlider from "./ImageSlider";
// import Getanswer from "./Getanswer";
// import KeyFeaturesNew from "./KeyFeaturesNew";
import Logo from "../Assets/Images/New_images/Smartstay_LOGO.svg";
import RightArrow from "../Assets/Images/landingpageimages/right_arrow.png";
import Contact from "../NewV2LandingPage/Contact";
// import SubscriptionPlan from "../NewV2LandingPage/Subscription";
// import SmartStaySection from "./Whysmartstay";
// import RoomManagement from "./ManagementTabs";
import Condition from "../NewV2LandingPage/Terms";
import Policy from "../NewV2LandingPage/PrivacyPolicy";
import CookiesPolicy from "../NewV2LandingPage/CookiesPolicy";
import Refundpolicy from '../NewV2LandingPage/Refundpolicy'
import BusinessChallenges from "./BusinessChallenges";
import WhyChoose from "./WhyChoose";
import LifeCycleMethod from "./LifeCycleMethod";
import RecurringInvoice from "./RecurringInvoice";
import HostelProperties from "./HostelProperties";
import OperationsSection from "./OperationsSection";
import Pricing from "./Pricing";
import MobileApp from "./MobileApp";
import FAQSection from "./FAQSection";
import PricingPlans from "./PricingPlans";
import ActiveCustomer from './ActiveCustomer';
import HostelTrial from './HostelTrial';
import WhyChooseWithFAQ from './WhyChooseWithFAQ';
import { CloseCircle, Send2 } from "iconsax-react";
import FeaturesKey from './FeaturesKey'
import HowItsWorking from "./HowItsWorking";
import NativeBuilt from "./NativeBuilt";
import EfficiantOperationSystem from "./EfficiantOperationSystem";
import SmartstayDemo from "./SmartstayDemo";
import { ArrowRight, Star1 } from "iconsax-react";

function FrontPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [showPromoPopup, setShowPromoPopup] = useState(false);


  let navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState(false);

  const handleSignIn = () => {
    navigate("/hostel-management-login");
  };

  const handleSignUp = () => {
    navigate("/hostel-management-signup");
  };

  const [activeSection, setActiveSection] = useState("firstPage");

  const handleSetActive = (section) => {

    setActiveSection(section);
    switch (section) {
      case "keyFeature":
        navigate("/hostel-management-features");
        break;
      case "Pricing":
        navigate("/hostel-software-pricing");
        break;
      case "Contact_us":
        navigate("/pg-software-contact");
        break;
      case "privacy_policy":
        navigate("/privacy-policy");
        break;
      case "refund_policy":
        navigate("/refund_policy");
        break;
      case "demo":
        navigate("/demo");
        break;
      case "firstPage":
        navigate("/");
        break;
      default:
        break;
    }
  };


  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path === "/hostel-management-features") {
      setActiveSection("keyFeature");
      scroll.scrollTo(document.getElementById("keyFeature")?.offsetTop - 70 || 0);
    } else if (path === "/hostel-software-pricing") {
      setActiveSection("Pricing");
      scroll.scrollTo(document.getElementById("Pricing")?.offsetTop - 70 || 0);
    }
    else if (path === "/pg-software-contact") {
      setActiveSection("Contact_us");
      scroll.scrollTo(document.getElementById("Contact_us")?.offsetTop - 70 || 0);
    }
    else if (path === "/privacy-policy") {
      setActiveSection("privacy_policy");
      scroll.scrollTo(document.getElementById("privacy_policy")?.offsetTop - 70 || 0);
    }
    else if (path === "/refund_policy") {
      setActiveSection("refund_policy");
      scroll.scrollTo(document.getElementById("refund_policy")?.offsetTop - 70 || 0);
    } else if (path === "/demo") {
      setActiveSection("demo");
      scroll.scrollTo(document.getElementById("demo")?.offsetTop - 70 || 0);
    }
    else {
      setActiveSection("firstPage");
      scroll.scrollTo(0);
    }
  }, [location.pathname]);

  // useEffect(() => {
  //   let idleTimer;

  //   const resetTimer = () => {
  //     clearTimeout(idleTimer);

  //     idleTimer = setTimeout(() => {
  //       setShowPromoPopup(true);
  //     }, 5000);
  //   };

  //   const events = ["mousemove", "keydown", "scroll", "click"];

  //   events.forEach((event) =>
  //     window.addEventListener(event, resetTimer)
  //   );

  //   resetTimer();

  //   return () => {
  //     clearTimeout(idleTimer);
  //     events.forEach((event) =>
  //       window.removeEventListener(event, resetTimer)
  //     );
  //   };
  // }, []);

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
    <div className="relative">
      <Navbar collapseOnSelect expand="lg" fixed="top" style={{ backgroundColor: "#FFFFFF" }}>
        <Container fluid className="px-lg-5 px-md-4 px-sm-3">
          <Navbar.Brand onClick={handleBrandClick}>
            <img src={Logo} alt="SmartStay hostel management software logo for PG and hostel booking platform" style={{ width: 176.45, height: 33, cursor: "pointer" }} />
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
          <ActiveCustomer />
          <BusinessChallenges />
          <WhyChoose />
          <LifeCycleMethod />
          <RecurringInvoice />
          <HostelProperties />
          <OperationsSection />
          <Pricing />
          <MobileApp />
          <HostelTrial />
          <FAQSection />
          {/* <Startup />
          <StatsSection />
          <RoomManagement />
          <SmartStaySection />
          <TestimonialSlider />
            <Getanswer /> */}
        </Element>
      )}

      {activeSection === "keyFeature" && (
        <Element name="keyFeature" style={{ paddingTop: "70px", display: "flex", flexDirection: "column" }}>
          <FeaturesKey />
          <LifeCycleMethod isFeatureWay={true} />
          <HowItsWorking />
          <RecurringInvoice />
          <NativeBuilt />
          <EfficiantOperationSystem />
          <HostelTrial />

        </Element>
      )}

      {activeSection === "Pricing" && (
        <Element name="Pricing" style={{ paddingTop: "70px", display: "flex", flexDirection: "column" }}>
          <PricingPlans />
          <ActiveCustomer />
          <WhyChooseWithFAQ />
        </Element>
      )}

      {activeSection === "Contact_us" && (
        <Element name="Contact_us" style={{ paddingTop: "70px", display: "flex", flexDirection: "column" }}>
          <Contact />
        </Element>
      )}

      {activeSection === "terms_use" && (
        <Element name="terms_use" style={{ paddingTop: "70px", display: "flex", flexDirection: "column" }}>
          <Condition />
        </Element>
      )}


      {activeSection === "cookies" && (
        <Element name="cookies" style={{ paddingTop: "70px", display: "flex", flexDirection: "column" }}>
          <CookiesPolicy />
        </Element>
      )}


      {activeSection === "privacy_policy" && (
        <Element name="privacy_policy" style={{ paddingTop: "70px", display: "flex", flexDirection: "column" }}>
          <Policy />
        </Element>
      )}


      {activeSection === "refund_policy" && (
        <Element name="refund_policy" style={{ paddingTop: "70px", display: "flex", flexDirection: "column" }}>
          <Refundpolicy />
        </Element>
      )}

      {activeSection === "demo" && (
        <Element name="demo" style={{ paddingTop: "70px", display: "flex", flexDirection: "column" }}>
          <SmartstayDemo />
        </Element>
      )}

      <Element name="footer">
        <Footers handleLinkName={handleSetActive} />
      </Element>

      <div
        className="fixed right-10 bottom-0 -translate-y-1/2 flex items-center"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >

        <div
          className={`absolute right-14 bg-blue-700 font-tasa text-white text-xs px-3 py-2 rounded-md whitespace-nowrap
        transition-all duration-300
        ${showTooltip
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-2 pointer-events-none"
            }`}
        >
          Request Demo
        </div>


        <div onClick={() => handleSetActive("demo")}
          className={`bg-[#1E45E1] hover:bg-[#061759] p-3 rounded-full shadow-md cursor-pointer
        transition-transform duration-300
        ${showTooltip ? "scale-110" : "scale-100"}`}
        >
          <Send2 size="14" color="#FFFFFF" variant="Bold" />
        </div>

      </div>
      {showPromoPopup && (
        <div className="
    fixed bottom-4 right-4 left-4 sm:left-auto
    z-50
   w-auto sm:w-[30px]
    bg-gradient-to-r from-[#FFFFFF] to-[#FFEFCF]
    rounded-xl shadow-lg p-4 border font-tasa
  ">


          <button
            onClick={() => setShowPromoPopup(false)}
            className="absolute top-3 right-3 text-gray-500 hover:text-black"
          >
            <CloseCircle />
          </button>

          <div className="flex flex-col gap-4">





            <div className="flex justify-between items-center">

              <div>
                <h2 className="text-[32px] sm:text-[32px] font-semibold text-[#555555]">
                  Stop Losing Time.
                </h2>

                <h2 className="text-[32px] sm:text-[32px] font-bold text-[#222222]">
                  Start SmartStay.
                </h2>

                <p className="text-sm text-gray-600 mt-2 text-wrap">
                  Experience SmartStay risk-free and see <br /> the difference in just a few days.
                </p>
              </div>

              <div className="bg-white rounded-md px-3 py-1 text-xs shadow w-fit h-fit flex items-center gap-2 ">
                <div className="bg-[#FFEFCF] rounded-md w-fit flex items-center px-1 py-1">
                  <Star1 size="14"
                    color="#FF8A65"
                    variant="Bold" />
                </div>
                <div>
                  <div className="text-[#222222] text-sm">  Saves 40+ hours </div>
                  <div className="text-[#515151] text-xs"> Every month per property </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full">

              <button className="font-dmsans flex items-center justify-center gap-2 px-5 py-2.5 border border-[#CACACA] rounded-lg text-[#222222] font-medium hover:bg-gray-100 transition w-full sm:w-auto">
                Request Demo
                <ArrowRight size="18" />
              </button>

              <button
                onClick={handleSignUp}
                className="font-dmsans flex items-center justify-center gap-2 px-5 py-2.5 bg-[#FF9500] text-white rounded-lg font-medium hover:bg-orange-600 transition shadow-md w-full sm:w-auto"
              >
                30 Day Free Trial
                <ArrowRight size="18" />
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FrontPage;

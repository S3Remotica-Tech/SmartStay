import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Roommangement from "../Assets/Images/landingpageimages/room_manage_icon.png";
import Custommangement from "../Assets/Images/landingpageimages/cus_manage_icon.png";
import Report from "../Assets/Images/landingpageimages/Report.png";
import Hostel from "../Assets/Images/landingpageimages/hostel.png";
import Lists from "../Assets/Images/landingpageimages/list.svg";

const features = [
  { id: 1, name: "Room Management", icon: Roommangement, description: "Efficiently manage rooms, customers, inventory, vendors, complaints, expenses, and reports—all in one place.", image: Hostel },
  { id: 2, name: "Customer Management", icon: Custommangement, description: "Efficiently manage rooms, customers, inventory, vendors, complaints, expenses, and reports—all in one place.", image: Hostel },
  { id: 3, name: "Inventory Management", icon: Report, description: "Efficiently manage rooms, customers, inventory, vendors, complaints, expenses, and reports—all in one place.", image: Hostel },
  { id: 4, name: "Vendor Management", icon: Report, description: "Efficiently manage rooms, customers, inventory, vendors, complaints, expenses, and reports—all in one place.", image: Hostel },
];

const KeyFeatures = () => {
  const [activeFeature, setActiveFeature] = useState(1);
  const sectionRefs = useRef([]);
  const [hideTopbar, setHideTopbar] = useState(false);
  // const [hideContent, setHideContent] = useState(false);
  const lastScrollY = useRef(0);

 
  // const [topbarHeight, setTopbarHeight] = useState(0);
  // const topbarRef = useRef(null);

  useEffect(() => {
    // if (topbarRef.current) {
    //   setTopbarHeight(topbarRef.current.offsetHeight);
    // }
  
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current) {
        setHideTopbar(true);
      } else {
        setHideTopbar(false);
        setHideHeaderContent(false);
      }
      lastScrollY.current = window.scrollY;
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  

  const [hideHeaderContent, setHideHeaderContent] = useState(false);

// Handle scrolling to a feature when a button is clicked
const handleScrollToFeature = (id) => {
  setActiveFeature(id);
  setHideHeaderContent(true);

  // Smooth scroll and offset adjustment
  const element = sectionRefs.current[id - 1];
  if (element) {
    const topOffset = element.getBoundingClientRect().top + window.scrollY - 100; // Adjust -50px for spacing
    window.scrollTo({ top: topOffset, behavior: "smooth" });
  }
};





  return (
    <>
    <Container fluid className="text-center pt-3 ps-0 pe-0 pb-0 position-relative"
      style={{
        backgroundColor: "rgba(226, 230, 255, 1)",
        width: "100vw",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "250px",
        paddingBottom: "50px",
      }}
    >
      {/* {!hideContent && ( */}
  <div 
  className={`text-center ${hideHeaderContent ? "d-none" : "d-block"}`}
  style={{ top: 0, left: 0, zIndex: 1050, transition: "0.3s ease-in-out" }}>
  <h6 style={{ fontSize: "18px", fontWeight: 600, color: "rgba(30, 69, 225, 1)", fontFamily: "Gilroy" }}>
    Key Features
  </h6>
  <h2 style={{ fontSize: "38px", fontWeight: 600, color: "rgba(0, 0, 0, 1)", fontFamily: "Gilroy" }}>
    Ready to Simplify Your PG <br /> Management?
  </h2>
</div>
{/* )} */}

      <div  className={`position-sticky top-10 w-100  p-3 ${hideTopbar ? "d-none" : "d-block"}`} style={{ zIndex: 1000, transition: "0.3s ease-in-out" }}>
        <Row className="justify-content-center ms-2 me-2">
          {features.map((feature) => (
            <Col xs={12} sm={6} md={3} key={feature.id}>
              <Button
                variant="light"
                className="d-flex flex-row align-items-center gap-2 px-4 py-3 w-100 shadow-sm fw-medium"
                style={{
                  borderRadius: "20px",
                  border: activeFeature === feature.id ? "2px solid rgba(30, 69, 225, 1)" : "2px solid transparent",
                  color: activeFeature === feature.id ? "rgba(30, 69, 225, 1)" : "#6c757d",
                }}
                onClick={() => handleScrollToFeature(feature.id)}
              >
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    backgroundColor: "rgba(232, 236, 252)",
                  }}
                >
                  <img src={feature.icon} alt={feature.name} style={{ width: "20px", height: "20px" }} />
                </div>
                <span>{feature.name}</span>
              </Button>
            </Col>
          ))}
        </Row>
      </div>

      <div className="mt-5 pt-5 pb-4 me-0" style={{ backgroundColor: "white" }}>
        {features.map((feature, index) => (
          <Row
            key={feature.id}
            className="align-items-center mt-4 mb-5"
            style={{
              backgroundColor: activeFeature === feature.id ? "white" : "transparent",
              paddingTop: activeFeature === feature.id ? "48px" : "0px",
              // margin: activeFeature === feature.id ? "50px" : "0px",
              borderRadius: "15px",
              transition: "all 0.3s ease",
            }}
            ref={(el) => (sectionRefs.current[index] = el)}
          >
            <Col
              xs={12}
              md={6}
              className={index % 2 === 0 ? "order-md-2" : "order-md-1 text-left"}
              style={{ textAlign: "start", marginTop: "10px", marginBottom: "20px" }}
            >
              <h5 style={{ color: "rgba(30, 69, 225, 1)", marginLeft: "50px", fontSize: 17, fontWeight: 600, fontFamily: "Gilroy" }}>
                Manage Your PG
              </h5>
              <h3 style={{ marginLeft: "50px", fontSize: 32, fontWeight: 800, fontFamily: "Gilroy", color: "rgba(0, 0, 0, 1)" }}>
                {feature.name}
              </h3>
              <p style={{ fontSize: 18, color: "#6c757d", marginLeft: "50px", fontWeight: 400, fontFamily: "Gilroy" }}>
                {feature.description}
              </p>

              <img
                src={Lists}
                alt="list-icon"
                style={{
                  width: "350px",
                  height: "150px",
                  objectFit: "contain",
                  filter: "contrast(1.2) brightness(1.1)",
                  marginLeft: "20px",
                }}
              />
            </Col>
            <Col xs={12} md={6} className={index % 2 === 0 ? "order-md-1" : "order-md-2 text-center"}>
              <img src={feature.image} alt={feature.name} style={{ width: "80%", maxWidth: "500px" }} />
            </Col>
          </Row>
        ))}
      </div>
    </Container>
    </>
  );
};

export default KeyFeatures;

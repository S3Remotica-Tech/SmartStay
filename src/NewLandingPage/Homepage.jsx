import React,{useEffect} from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import dashboardImg from "../Assets/Images/landingpageimages/sm_homepage.png";
import TopLeftCurve from "../Assets/Images/landingpageimages/topleftcurve.png";
import HomebgImage from "../Assets/Images/landingpageimages/home_bg_image.png";
import { Helmet } from "react-helmet-async";
import "./Homepage.css"

const HomePage = () => {



  let navigate = useNavigate();

 useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


  const handleSignIn = () => {
    navigate("/hostel-management-login");
  };

  const handleSignUp = () => {
    navigate("/hostel-management-signup");
  };

  return (
    
      
      <>
       <Helmet prioritizeSeoTags>
        <html lang="en-IN" />

       {/* Core SEO */}
  <title>SmartStay â€“ PG & Hostel Management Software</title>
  <meta
    name="description"
    content="Indiaâ€™s most trusted hostel software. SmartStay offers rent collection tools, tenant billing, PG booking system, and a complete hostel issue tracking tool."  />
<link rel="canonical" href="https://smartstay.qbatz.com/" />
  <meta name="robots" content="index, follow" />

{/* Open Graph */}
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="SmartStay" />
  <meta property="og:title" content="SmartStay â€“ PG & Hostel Management Software" />
  <meta property="og:description" content="Indiaâ€™s most trusted hostel software. SmartStay offers rent collection tools, tenant billing, PG booking system, and a complete hostel issue tracking tool." />
  <meta property="og:url" content="https://smartstay.qbatz.com/" />
  <meta property="og:image" content="https://smartstay.qbatz.com/assets/sm_homepage-CODs4gRc.png" />
  <meta property="og:image:alt" content="SmartStay dashboard showing hostel room availability and bed occupancy" />
   
  
        {/* Schema.org WebPage */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "SmartStay â€“ PG & Hostel Management Software",
      url: "https://smartstay.qbatz.com/",
      description:
        "Indiaâ€™s most trusted hostel software. SmartStay offers rent collection tools, tenant billing, PG booking system, and a complete hostel issue tracking tool.",
          })}
        </script>
      </Helmet>

        <div
          className="position-relative w-100 "
          style={{
            
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
                      Simplify the managing of your Paying Guest accommodation and Homestay services with{" "}
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
                          <h3 className="responsive-count"
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





                <Col md={6} className="text-center">
                  <img
                    src={dashboardImg}
                    alt="SmartStay hostel booking dashboard showing room availability tracker and PG occupancy layout,
                    Working professional managing hostel operations using SmartStay mobile app,
                    Hostel resident profiles onboarded through SmartStay tenant portal app"
                    className="img-fluid"
                    style={{
                      width: "100%",
                      maxWidth: "700px",
                      height: "auto"
                    }}
                  />
                </Col>

              </Row>
            </Container>
          </Container>
        </div>
      </>

    
  );
};

export default HomePage;
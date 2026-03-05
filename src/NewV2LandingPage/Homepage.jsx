import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
// import "./Homepage.css"
import { ArrowRight } from "iconsax-react";
import BgImage from "../Assets/v2LandingImages/Landing_Background_Image.svg";
import Dashboard from "../Assets/v2LandingImages/Dashboard.svg";
import axn from "../Assets/v2LandingImages/AXN.svg";
import lenovo from "../Assets/v2LandingImages/Lenovo.svg";
import slack from "../Assets/v2LandingImages/slack.svg";
import youtube from "../Assets/v2LandingImages/youtube.svg";
import amazon from "../Assets/v2LandingImages/amazon.svg";
import google from "../Assets/v2LandingImages/Google.svg";
import microsoft from "../Assets/v2LandingImages/Microsoft.svg";
import Marquee from "react-fast-marquee";





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
        <title>SmartStay PG & Hostel Management Software</title>
        <meta
          name="description"
          content="Indiaâ€™s most trusted hostel software. SmartStay offers rent collection tools, tenant billing, PG booking system, and a complete hostel issue tracking tool." />
        <link rel="canonical" href="https://smartstay.qbatz.com/" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="SmartStay" />
        <meta property="og:title" content="SmartStay  PG & Hostel Management Software" />
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

      {/* <div
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
        </div> */}
      {/* bg-[center_bottom] */}

      <div
        className="w-screen h-fit bg-cover bg-[bottom] bg-no-repeat relative"
        style={{ backgroundImage: `url(${BgImage})` }}
      >
        <div className="w-full  py-10">
          <div className="max-w-5xl mx-auto text-center px-6">


            <div className="inline-flex items-center gap-2 bg-[#F4F6FF] shadow-sm border border-blue-[#F4F6FF] 
    text-[#0D30BA] text-base font-medium px-4 py-1.5 rounded-full mb-6 font-dmsans">
              Make your Stay Smarter
            </div>


            <h1 className="text-[64px] md:text-5xl font-medium text-gray-800 leading-tight font-tasa">
              Run Your Hostel Smarter <br />
              with <span className="text-blue-600 font-semibold font-tasa">SmartStay</span>
            </h1>

            <label className="mt-6 text-[#4C4C4C] text-[22px] md:text-lg max-w-3xl mx-auto leading-relaxed font-dmsans font-medium">
              SmartStay helps hostel owners and wardens manage rooms, students, attendance, fees, food, complaints, and reports in one simple dashboard. Save time, reduce paperwork, and get full control of your hostel operations from anywhere.
            </label>


            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">

              <button className="font-dmsans flex items-center gap-2 px-6 py-2.5 border-1 border-[#515151] rounded-lg text-[#515151] font-medium hover:bg-gray-100 transition">
                Request Demo
                <ArrowRight size="18" />
              </button>

              <button className="font-dmsans flex items-center gap-2 px-6 py-2.5 bg-[#1E45E1] text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-md">
                Signup for free Trial
                <ArrowRight size="18" variant="Bold" />
              </button>

            </div>

            <div className="w-full flex items-center justify-center mt-4 rounded-2xl border-8 border-[#222222]">
              <img
                src={Dashboard}
                alt="Map"
                className="w-full h-full object-cover"
              />
            </div>




            <div className="w-full bg-[#FDFDFD] py-8 px-[200px] absolute bottom-0 left-0 right-0 z-10">
              <p className="text-center text-[#061C3D] text-lg mb-6 font-semibold font-gilroy">
                Over <span className="text-blue-600 font-semibold font-gilroy italic">1,000+</span> actively paying customers
              </p>


              <Marquee
                speed={100}
                pauseOnHover={true}
                gradient={false}
              >
                <img src={axn} className="h-8 mx-10 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition" />
                <img src={lenovo} className="h-8 mx-10 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition" />
                <img src={slack} className="h-8 mx-10 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition" />
                <img src={youtube} className="h-8 mx-10 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition" />
                <img src={amazon} className="h-8 mx-10 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition" />
                <img src={google} className="h-8 mx-10 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition" />
                <img src={microsoft} className="h-8 mx-10 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition" />
              </Marquee>

            </div>




          </div>
        </div>
      </div>
    </>


  );
};

export default HomePage;
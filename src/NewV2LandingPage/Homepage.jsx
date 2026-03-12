import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
// import "./Homepage.css"
import { ArrowRight } from "iconsax-react";
import BgImage from "../Assets/v2LandingImages/Landing_Background_Image.svg";
import Dashboard from "../Assets/v2LandingImages/Dashboard.svg";
import { BsStars } from "react-icons/bs";




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


      <div
        className="w-screen max-h-[800px] overflow-hidden bg-cover bg-[bottom] bg-no-repeat relative"
        style={{ backgroundImage: `url(${BgImage})` }}
      >
        <div className="w-full">
          <div className="max-w-5xl mx-auto text-center px-6 py-16">


            <div className="inline-flex items-center gap-2 bg-[#F4F6FF] shadow-sm border border-blue-[#F4F6FF] 
    text-[#0D30BA] text-base font-medium px-4 py-1.5 rounded-full mb-6 font-dmsans">
              <BsStars />  Make your Stay Smarter
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

              <button onClick={handleSignUp} className="font-dmsans flex items-center gap-2 px-6 py-2.5 bg-[#1E45E1] text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-md">
                Signup for free Trial
                <ArrowRight size="18" />
              </button>

            </div>

            <div className="w-[1000px] w-full mx-auto flex justify-center mt-4 z-10 rounded-2xl border-8 border-[#222222] relative">
              <img
                src={Dashboard}
                alt="Map"
                className="w-full h-auto object-cover"
              />

              {/* <div className="absolute right-[-70px] top-[350px] -translate-y-1/2 bg-[#1E45E1] p-3 rounded-full shadow-md">
                <Send2 size="14" color="#FFFFFF" variant="Bold" />
              </div> */}
            </div>








          </div>
        </div>
      </div>


    </>


  );
};

export default HomePage;
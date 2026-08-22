import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight } from "iconsax-react";
import BgImage from "../Assets/v2LandingImages/Landing_Background_Image.svg";
import Dashboard from "../Assets/v2LandingImages/Dashboard.svg";
import { BsStars } from "react-icons/bs";




const HomePage = () => {



  let navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const handleNavigateDemo = () => {
    navigate("/demo");
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
        <div className="w-full animate-[fadeUp_0.6s_ease-out]">
          <div className="max-w-5xl mx-auto text-center px-6 py-20">


            {/* <div className="inline-flex items-center gap-2 bg-[#F4F6FF] shadow-sm border border-blue-[#F4F6FF] 
    text-[#0D30BA] text-base font-medium px-4 py-1.5 rounded-full mb-6 font-dmsans">
              <BsStars />  Make your Stay Smarter
            </div> */}

            <div className="inline-flex items-center gap-2 bg-[#F4F6FF] shadow-sm border border-blue-[#F4F6FF] 
text-[#0D30BA] text-base 2xl:text-2xl font-medium px-4 py-1.5 rounded-full mb-6 font-dmsans">
              <BsStars /> Make your Stay Smarter
            </div>


            {/* <h1 className="text-[64px] md:text-5xl font-medium text-gray-800 leading-tight font-tasa mb-3 animate-[fadeUp_0.6s_ease-out]">
              Run Your Hostel Smarter <br />
              with <span className="text-blue-600 font-semibold font-tasa">SmartStay</span>
            </h1> */}
            <h1 className="text-3xl md:text-5xl xl:text-6xl 2xl:text-[60px] font-medium text-gray-800 leading-tight font-tasa mb-3 animate-[fadeUp_0.6s_ease-out]">
              Run Your Hostel Smarter <br />
              with <span className="text-blue-600 font-semibold font-tasa">SmartStay</span>
            </h1>

            {/* <label className="mt-6 mb-2 text-[#4C4C4C] text-[22px] md:text-lg max-w-3xl mx-auto leading-relaxed font-dmsans font-medium animate-[fadeUp_0.6s_ease-out]">
              SmartStay helps hostel owners and wardens manage rooms, students, attendance, fees, food, complaints, and reports in one simple dashboard. Save time, reduce paperwork, and get full control of your hostel operations from anywhere.
            </label> */}


            <label className="mt-6 mb-2 text-[#4C4C4C] text-base md:text-lg xl:text-xl 2xl:text-[22px] max-w-3xl 2xl:max-w-5xl mx-auto leading-relaxed font-dmsans font-medium animate-[fadeUp_0.6s_ease-out]">
              SmartStay helps hostel owners and wardens manage rooms, students, attendance, fees, food, complaints, and reports in one simple dashboard. Save time, reduce paperwork, and get full control of your hostel operations from anywhere.
            </label>

            {/* <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 animate-[fadeUp_0.6s_ease-out]">

              <button onClick={handleNavigateDemo} className="font-dmsans flex items-center gap-2 px-6 py-2.5 border-1 border-[#515151] rounded-lg text-[#515151] font-medium hover:bg-gray-100 transition">
                Request Demo
                <ArrowRight size="18" />
              </button>

              <button onClick={handleSignUp} className="font-dmsans flex items-center gap-2 px-6 py-2.5 bg-[#1E45E1] text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-md">
                Signup for free Trial
                <ArrowRight size="18" />
              </button>

            </div> */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 2xl:gap-6 animate-[fadeUp_0.6s_ease-out]">

              <button
                onClick={handleNavigateDemo}
                className="font-dmsans flex items-center gap-2 px-6 py-2.5 2xl:px-8 2xl:py-3 border-1 border-[#515151] rounded-lg text-[#515151] text-base 2xl:text-lg font-medium hover:bg-gray-100 transition"
              >
                Request Demo
                <ArrowRight size="18" className="2xl:w-5 2xl:h-5" />
              </button>

              <button
                onClick={handleSignUp}
                className="font-dmsans flex items-center gap-2 px-6 py-2.5 2xl:px-8 2xl:py-3 bg-[#1E45E1] text-white rounded-lg text-base 2xl:text-lg font-medium hover:bg-blue-700 transition shadow-md"
              >
                Signup for free Trial
                <ArrowRight size="18" className="2xl:w-5 2xl:h-5" />
              </button>

            </div>

            <div className="w-[1000px] w-full mx-auto flex justify-center mt-4 z-10 rounded-2xl border-8 border-[#222222] relative">
              <img
                src={Dashboard}
                alt="Map"
                className="w-full h-auto object-cover"
              />


            </div>








          </div>
        </div>
      </div>


    </>


  );
};

export default HomePage;
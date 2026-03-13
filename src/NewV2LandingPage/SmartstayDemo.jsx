import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ErrorMessage from "../Components/ErrorMessage";
import { Mobile, Sms, TickCircle, DocumentText, Calendar, Home } from "iconsax-react";
import BottomImage from "../Assets/v2Images/bottom_image.svg";
import SmartstayWhiteLogo from "../Assets/v2LandingImages/SmartstayWhiteLogo.svg"
function SmartstayDemo() {

  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [tenants, setTenants] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [demoDate, setDemoDate] = useState("");
  const [demoTime, setDemoTime] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const steps = [
    {
      id: 1,
      icon: <DocumentText size="26" color="#1E45E1" variant="Bold" />,
      title: "Fill out the Form",
      desc: "Tell us what you need",
    },
    {
      id: 2,
      icon: <Calendar size="26" color="#1E45E1" variant="Bold" />,
      title: "We'll reach out",
      desc: "Our team schedules a time that works for you.",
    },
    {
      id: 3,
      icon: <Home size="26" color="#1E45E1" variant="Bold" />,
      title: "See Smartstay in Action",
      desc: "Get Personalized Demo",
    },
  ];


  return (
    <>
    <div className="relative bg-white py-[80px] font-tasa">

      <div className=" max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-start px-[40px]">


        <div className="rounded-2xl p-10 text-white bg-gradient-to-b from-[#5272F0] to-[#0F2169] ">


          <div className="flex items-center gap-2 mb-6">
            <img src={SmartstayWhiteLogo} alt="logo" />
          </div>


          <div className="inline-block text-xs bg-white/20 px-3 py-1 rounded-full mb-6 text-white">
            Digitally verify your tenants with ease and security
          </div>


          <h3 className="text-[36px] font-semibold leading-[44px] mb-4 font-tasa">
            See Smartstay in Action
          </h3>


          <p className="text-[15px] text-white/90 mb-8 leading-relaxed">
            Discover How Smartstay can streamline your Hostel,
            From Check-in to Check-Out
          </p>


          <h4 className="text-[32px] font-bold mb-5 text-white">
            What’s include in Demo!
          </h4>


          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <TickCircle size="20" variant="Bold" color="#FF9D00" />
              <p className="text-white">A live walkthrough of the platform.</p>
            </div>

            <div className="flex items-start gap-3">
              <TickCircle size="20" variant="Bold" color="#FF9D00" />
              <p className="text-white">
                Personalized guidance on Smartstay to suit your business.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <TickCircle size="20" variant="Bold" color="#FF9D00" />
              <p className="text-white">
                Help choosing the right pricing plan for you.
              </p>
            </div>

          </div>
        </div>



        <div className="bg-white p-[30px] rounded-xl shadow-sm border border-[#D3D3D3] z-50 font-gilroy">

          <h2 className="text-[22px] font-semibold mb-3">
            Get your personalized Demo
          </h2>

          <div className="mb-3">
            <label className="text-sm font-normal">
              Contact Number <span className="text-red-500">*</span>
            </label>

            <div className="w-full mt-1 flex items-center border border-[#DCDCDC] rounded-md overflow-hidden">

              <span className="px-3 py-[8px]  text-[#222222] text-sm">
                +91
              </span>

              <input
                type="text"
                name="user_phone"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                placeholder="Your phone"
                className="w-full p-[8px] bg-[#FFFFFF] text-[#808092] focus:border-[#1E45E1] outline-none"
              />

            </div>


          </div>



          <div className="mb-3">
            <label className="text-sm font-normal">Mail ID</label>

            <input
              type="email"
              placeholder="Enter a Mail ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-[8px] bg-[#FFFFFF] rounded-md text-[#808092] border border-[#DCDCDC] focus:border-[#1E45E1] outline-none"
            />
          </div>


          <div className="mb-3">
            <label className="text-sm font-normal">Organization Name</label>

            <input
              type="text"
              placeholder="Eg: Royal Homes"
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
              className="w-full mt-1 p-[8px] bg-[#FFFFFF] rounded-md text-[#808092] border border-[#DCDCDC] focus:border-[#1E45E1] outline-none"
            />
          </div>

          <div className="mb-3">
            <label className="text-sm font-normal">
              No. of Tenants Managing
            </label>

            <select
              value={tenants}
              onChange={(e) => setTenants(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm"
            >
              <option value="">Select Range</option>
              <option value="1-50">1 - 50</option>
              <option value="50-200">50 - 200</option>
              <option value="200+">200+</option>
            </select>
          </div>


          <div className="grid grid-cols-2 gap-4 mb-3">

            <div>
              <label className="text-sm font-normal">City</label>

              <input
                type="text"
                placeholder="Enter City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full mt-1 p-[8px] bg-[#FFFFFF] rounded-md text-[#808092] border border-[#DCDCDC] focus:border-[#1E45E1] outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-normal">Country</label>

              <input
                type="text"
                placeholder="Enter Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full mt-1 p-[8px] bg-[#FFFFFF] rounded-md text-[#808092] border border-[#DCDCDC] focus:border-[#1E45E1] outline-none"
              />
            </div>

          </div>


          <div className="grid grid-cols-2 gap-4 mb-3">

            <div>
              <label className="text-sm font-normal">Demo Date</label>

              <input
                type="date"
                value={demoDate}
                onChange={(e) => setDemoDate(e.target.value)}
                className="w-full mt-1 p-[8px] bg-[#FFFFFF] rounded-md text-[#808092] border border-[#DCDCDC] focus:border-[#1E45E1] outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-normal">Demo Time</label>

              <input
                type="time"
                value={demoTime}
                onChange={(e) => setDemoTime(e.target.value)}
                className="w-full mt-1 p-[8px] bg-[#FFFFFF] rounded-md text-[#808092] border border-[#DCDCDC] focus:border-[#1E45E1] outline-none"
              />
            </div>

          </div>


          <button className="w-full bg-[#1E45E1] text-white py-2 rounded-md font-medium hover:opacity-90">
            Submit
          </button>

        </div>

      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10">
        <img src={BottomImage} alt="bottom" className="w-full object-cover" />
      </div>
 

 











    </div>
    <section className="py-2 mb-4 bg-white font-tasa">
      
     
      <div className="text-center mb-12 px-4">
        <h2 className="text-[52px] font-bold mt-4 inline-block bg-gradient-to-r from-[#1E45E1] to-[#05A7FF] bg-clip-text text-transparent">
  How it Works...?
</h2>

        <p className="text-[#4A4A4A] mt-2 text-sm md:text-base">
          Three simple steps to your personalized demo.
        </p>
      </div>

      
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6">

        {steps.map((step) => (
          <div key={step.id} className="text-center flex flex-col items-center">

           
            <div className="relative mb-4">

              <div className="w-14 h-14 bg-[#EEF2FF] rounded-xl flex items-center justify-center">
                {step.icon}
              </div>

             
              <span className="absolute -top-2 -right-2 bg-[#FF9500] text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-semibold">
                {step.id}
              </span>

            </div>

          
            <h3 className="font-semibold text-[#222] text-[28px] font-medium">
              {step.title}
            </h3>

            
            <p className="text-[#444444] text-base mt-1 max-w-[220px] font-medium">
              {step.desc}
            </p>

          </div>
        ))}

      </div>
    </section>
    </>
  );
}

export default SmartstayDemo;
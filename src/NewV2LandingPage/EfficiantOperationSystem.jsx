import React, { useEffect, useState, useRef } from "react";
import Expenseinte from "../Assets/v2LandingImages/expense1.svg";
import Assetfeature from "../Assets/v2LandingImages/Assetfeature.svg";
import ComplaintFeature from "../Assets/v2LandingImages/ComplaintFeature.svg";
import Frequency from "../Assets/v2LandingImages/Frequency.svg";
import Graphfeature from "../Assets/v2LandingImages/Graphfeature.svg";
import PaymentFeature from "../Assets/v2LandingImages/paymentFeature.svg";
import RecurringFeature from "../Assets/v2LandingImages/RecurringFeature.svg";
import { motion, useScroll, useTransform } from "framer-motion";

function EfficiantOperationSystem() {




const containerRef = useRef(null)

const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start start", "end end"]
})

const features = [
  {
    title: "Expense Intelligence",
    description:
      "Track, categorize, and analyze every expense with structured financial visibility, improving cost control and profitability decisions.",
    image: Expenseinte,
  },
  {
    title: "Asset Control System",
    description:
      "Digitally monitor hostel assets across rooms and floors to ensure accountability, prevent losses, and maintain organized infrastructure control.",
    image: Assetfeature,
  },
  {
    title: "Utility Billing Automation",
    description:
      "Automatically calculate and split electricity charges accurately by room, floor, or tenant with transparent billing clarity.",
    image: RecurringFeature,
  },
  {
    title: "Smart Complaint Workflow",
    description:
      "Streamline tenant issue resolution through structured complaint tracking, status monitoring, and accountability-driven resolution management.",
    image: ComplaintFeature,
  },
  {
    title: "Real-Time Analytics & Reports",
    description:
      "Access live operational insights, occupancy performance, income analytics, and downloadable reports for confident decision-making.",
    image: Graphfeature,
  },
  {
    title: "Customization",
    description:
      "Make Customized Billing Templates, Table Listings, EB Readings & more as per your Needs",
    image: Frequency,
  },
  {
    title: "Integrations",
    description:
      "Easy to get access integrations with Whatsapp, Razor Pay Payments, AWS Cloud Storages and More..",
    image: PaymentFeature,
  },
];











  return (
    <div ref={containerRef} className="w-full py-[30px] md:py-[40px] px-[20px] md:px-[101px] font-tasa bg-[#1A1A1A] mt-20">

      <div className="max-w-[1200px] mx-auto text-center rounded-2xl">


        <div className="inline-flex items-center gap-2 bg-[#F6F6F64D] border border-[#F6F6F64D] 
    text-white text-base font-medium px-4 py-1.5 rounded-full mb-6 font-dmsans">
          Tailored for your Business
        </div>


        <h1 className="text-[32px] md:text-[52px] font-bold mt-2 text-white leading-tight">
          Efficient Operations <br /> Management
        </h1>

<div className="relative mt-20 space-y-20">

{features.map((item, index) => (
 <div
    key={index}
    data-index={index}
   
    className="feature-card sticky top-[120px] bg-white mx-auto grid md:grid-cols-10 items-center
    border border-gray-200 rounded-xl p-6 md:p-10 gap-6 shadow-lg min-h-[200px]"
  >
   
    {index % 2 !== 0 && (
      <div className="md:col-span-4 flex justify-center items-center">
        <img
          src={item.image}
          alt={item.title}
          className="w-[260px] h-[200px] object-contain"
        />
      </div>
    )}

   
    <div className="md:col-span-6 flex items-center">
      <div className="text-left max-w-[520px]">
        <h2 className="text-2xl md:text-4xl font-semibold text-black">
          {item.title}
        </h2>

        <p className="text-[#2D2D2D] mt-4 text-base md:text-lg">
          {item.description}
        </p>
      </div>
    </div>

    
    {index % 2 === 0 && (
     <div className="md:col-span-4 flex justify-center items-center overflow-hidden h-[200px] ">
        <img
          src={item.image}
          alt={item.title} 
          style={{
      
    }}
          className="w-full max-w-[260px] md:max-w-[320px] transition-transform duration-75 w-[260px] h-[200px] object-contain"
        />
      </div>
    )}

  </div>
))}

</div> 




      

      </div>

    </div>





  )
}

export default EfficiantOperationSystem


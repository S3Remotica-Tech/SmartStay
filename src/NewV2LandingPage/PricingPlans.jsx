import React from 'react';
import { BsStars } from "react-icons/bs";
import { TickCircle, TickSquare } from 'iconsax-react';



function PricingPlans() {

  const features = [
    "30days Free Trials",
    "User-friendly Interfaces",
    "Easy On-Boarding Process",
    "No credit card required"
  ];



  const highlightFeatures = [
    "WhatsApp Integration",
    "Digital KYC + Verification",
    "Rental Agreement + Legal E-Sign",
    "Online Payment Gateway"
  ];




  const pricingPlans = [
    {
      name: "Free Trial",
      price: "0",
      duration: "for 30 Days",
      button: "Trial Now",
     buttonStyle: "bg-[#1E45E1] text-white",
      highlight: true,
      description: "Experience Smartstay for Free",
      bg: "bg-gradient-to-b from-[#CDD7FF57] via-[#FFFFFF] to-[#FFFFFF]",
      features: []
    },
    {
      name: "Standard",
      price: "599",
      duration: "monthly",
      button: "Try for Free",
      text: "Which includes : ",
      buttonStyle: "bg-[#1E45E1] text-white",
       bg: "bg-gradient-to-b from-[#FFFFFF] via-[#FFFFFF] to-[#FFFFFF]",
      disabledFeatures: [
        "WhatsApp Integration",
        "Digital KYC + Verification",
        "Rental Agreement + Legal E-Sign",
        "Online Payment Gateway"
      ],
      features: [
        "Asset and Expenses Management",
        "Auto Recurring Invoices",
        "Complaint Management",
        "Due Reminders (In-App & Email)",
        "EB Calculation",
        "Rent Collection Tracking",
        "Reports & Insights",
        "Unlimited Staff Access",
        "Secure Cloud Storage",
        "WhatsApp Integration",
        "Digital KYC + Verification",
        "Rental Agreement + Legal E-Sign",
        "Online Payment Gateway"

      ]
    },
    {
      name: "Pro",
      price: "999",
      duration: "monthly",
      button: "Try for Free",
      text: "Which includes : ",
      buttonStyle: "bg-[#1E45E1] text-white",
       bg: "bg-gradient-to-b from-[#FFFAEA] via-[#FFF7E8] to-[#FFFFFF]",

      features: [
        "Dashboard (Customizable)",
        "Tenant & Room Management",
        "Asset and Expenses Management",
        "Auto Recurring Invoices",
        "Complaint Management",
        "Due Reminders (In-App & Email)",
        "EB Calculation",
        "Rent Collection Tracking",
        "Reports & Insights",
        "WhatsApp Integration",
        "Digital KYC + Verification",
        "Rental Agreement + Legal E-Sign",
        "Online Payment Gateway"
      ]
    },

  ];













  return (
    <div className='w-screen h-auto  bg-white font-tasa'>

      <div className=" mx-auto text-center px-[120px] py-16 h-auto">


        <div className="inline-flex items-center gap-2 bg-[#F4F6FF] shadow-sm border border-blue-[#F4F6FF] 
    text-[#0D30BA] text-base font-medium px-4 py-1.5 rounded-full mb-6 font-dmsans">
          <BsStars />  Pricing Plans
        </div>
        <h1 className="text-[64px] md:text-5xl font-medium text-gray-800 leading-tight font-tasa">
          Designed for Every Stage of Growth.
        </h1>
        <label className="mt-6 text-[#4C4C4C] text-[22px] md:text-lg max-w-3xl mx-auto leading-relaxed font-dmsans font-medium">
          Choose a plan that fits your hostel size and operational needs.
          Transparent pricing. No hidden charges. Full feature clarity.
        </label>
        <div className="mt-8  flex items-center justify-center gap-3 ">

          {features.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <TickCircle size="20" variant="Bold" color="#00A32E" />
              <label className="text-[#090F29] text-sm font-semibold font-tasa">
                {item}
              </label>
            </div>
          ))}

        </div>




        <div className="grid grid-cols-10 gap-8  h-fit my-32">


          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-xl border  border-[#E5E5E5] p-4 
      transition-all duration-300 ease-in-out transform
      hover:-translate-y-2 hover:shadow-xl hover:scale-[1.02]

      ${plan.bg || "bg-white"}
      
      ${index === 0 ? "col-span-2" : ""}
      ${index === 1 ? "col-span-4" : ""}
      ${index === 2 ? "col-span-4" : ""}
      `}
            >

              <h3 className="text-center text-xl font-semibold text-[#222222] uppercase">{plan.name}</h3>

              <div className="text-center mt-4">
                <span className="text-3xl font-bold text-[#222222]">₹ {plan.price}</span>
                <p className="text-sm  text-[#222222] font-normal">{plan.duration}</p>
              </div>

              <button
                className={`w-full mt-3 py-1.5 rounded-lg font-medium ${plan.buttonStyle}`}
              >
                {plan.button}
              </button>

              <div className='text-start'>
                <label className='text-sm text-[#4B4B4B] text-medium mt-3'>{plan.text} </label>
              </div>

              {plan.features.length > 0 ? (
                <div className="mt-6 space-y-2 max-h-[220px] overflow-y-auto show-scrolls">

                  {plan.features.map((feature, i) => {
                    const isDisabled = plan.disabledFeatures?.includes(feature);
                    const isProHighlight =
                      plan.name === "Pro" && highlightFeatures.includes(feature);

                    return (
                      <div
                        key={i}
                        className={`flex items-center gap-2 text-sm ${isDisabled ? "text-gray-400" : "text-[#1D2127]"
                          }`}
                      >
                        <TickSquare
                          size="14"
                          color={
                            isDisabled
                              ? "#C4C4C4"
                              : isProHighlight
                                ? "#39a039"
                                : "#1E45E1"
                          }
                          variant={isDisabled ? "Linear" : "Bold"}
                        />

                        <span>{feature}</span>
                      </div>
                    );
                  })}

                </div>
              ) : (
                <p className="text-center flex justify-center items-center  h-[160px] md:h-[200px] lg:h-[250px]  text-sm text-gray-600">
                  {plan.description}
                </p>
              )}

            </div>
          ))}

        </div>
















      </div>

    </div>
  )
}

export default PricingPlans
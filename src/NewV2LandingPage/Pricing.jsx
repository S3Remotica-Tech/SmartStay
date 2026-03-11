import { TickSquare } from 'iconsax-react';
import React from 'react'

function Pricing() {

    const highlightFeatures = [
        "WhatsApp Integration",
        "Digital KYC + Verification",
        "Rental Agreement + Legal E-Sign",
        "Online Payment Gateway"
    ];




    const pricingPlans = [
        {
            name: "Standard",
            price: "599",
            duration: "monthly",
            button: "Try for Free",
            text: "Which includes : ",
            buttonStyle: "bg-[#1E45E1] text-white",
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
        {
            name: "Free Trial",
            price: "0",
            duration: "for 30 Days",
            button: "Trial Now",
            buttonStyle: "bg-[#FF9D00] text-white",
            highlight: true,
            description: "Experience Smartstay for Free",
            features: []
        }
    ];








    return (
        <div className="w-full bg-[#FDFDFD] py-[40px] md:py-[53px] px-[20px] md:px-[101px] font-tasa">

            <div className='flex justify-between '>
                <div className="mb-8">
                    <h2 className="text-5xl font-semibold text-[#1E1E1E]">
                        Built to Scale.
                        <br />
                        <span className="bg-gradient-to-r from-[#03A7FF] to-[#0565FF] bg-clip-text text-transparent">Priced to Grow.</span>
                    </h2>
                    <label className="text-[#6B7280] mt-2 text-base font-normal">
                        Start free for 30 days. No credit card required. Cancel anytime.
                    </label>
                </div>

                <div>
                    <span className="px-3 py-1 text-xs  rounded-full bg-[#E9EDFF] text-[#1E45E1] font-medium">
                        Pricing
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-8 gap-8 justify-center">


                {pricingPlans.map((plan, index) => (
                    <div
                        key={index}
                        className={`rounded-xl border border-[#E5E5E5] p-4 
      transition-all duration-300 ease-in-out transform
      hover:-translate-y-2 hover:shadow-xl hover:scale-[1.02]

      ${plan.highlight ? "bg-gradient-to-b from-[#FFF1D6] to-[#FFFFFF]" : "bg-white"}
      
      ${index === 0 ? "col-span-3" : ""}
      ${index === 1 ? "col-span-3" : ""}
      ${index === 2 ? "col-span-2" : ""}
      `}
                    >

                        <h3 className="text-center text-xl font-semibold text-[#676767]">{plan.name}</h3>

                        <div className="text-center mt-2">
                            <span className="text-3xl font-bold text-[#222222]">₹ {plan.price}</span>
                            <p className="text-sm  text-[#222222] font-normal">{plan.duration}</p>
                        </div>

                        <button
                            className={`w-full mt-2 py-1.5 rounded-lg font-medium ${plan.buttonStyle}`}
                        >
                            {plan.button}
                        </button>

                        <div>
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
                            <p className="text-center flex justify-center items-center  h-[160px] md:h-[200px] lg:h-[250px] text-sm text-gray-600">
                                {plan.description}
                            </p>
                        )}

                    </div>
                ))}

            </div>

        </div>
    )
}

export default Pricing
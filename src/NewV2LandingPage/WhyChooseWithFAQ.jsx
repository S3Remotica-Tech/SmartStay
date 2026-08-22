import React, { useState } from "react";
import { TickCircle, Add, Minus } from "iconsax-react";
import Phone from "../Assets/v2LandingImages/whychoose.svg";
import HostelTrial from "./HostelTrial";

function WhyChooseWithFAQ() {
  const features = [
    "Real-time occupancy view",
    "Live payment tracking",
    "Complaint monitoring",
    "Instant performance insights & more",
  ];

  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How does EB bill splitting work?",
      answer:
        "SmartStay allows electricity bills to be automatically split by room, floor, or individual tenant, ensuring accurate and transparent billing without manual calculations.",
    },
    {
      question: "Do you provide after-sales support?",
    },

    {
      question: "Is tenant data secure in SmartStay?",
    },
    {
      question: "Is SmartStay affordable for small hostels?",
    },
    {
      question: "Do I need technical knowledge to use SmartStay?",
    },

    {
      question: "Can tenants pay rent through the app?",
    },
  ];

  return (
    <div>
      <div
        className={`w-full h-[1000px]  bg-[#1A1A1A] text-[#FFFFFF] py-10 px-[70px] relative`}
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center px-[70px]">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold  leading-1 font-tasa  ">
              Why Choose <span className="text-[#0033FF]">Smartstay</span> for
              Your Hostel?
            </h2>

            <p
              className={`text-[#FFFFFF] mt-4 max-w-md text-xl font-tasa font-normal`}
            >
              It transforms manual hostel management into a structured,
              automated, and data-driven system. everything works seamlessly in
              one powerful platform.
            </p>

            <div className="mt-8 space-y-4">
              {features.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <TickCircle size="32" variant="Bold" color="#00A32E" />
                  <label
                    className={` text-[#FFFFFF] text-sm font-semibold font-tasa`}
                  >
                    {item}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex justify-center">
            <img alt="image" src={Phone} className="w-[460px] relative z-10" />
          </div>
        </div>

        <div
          className="mx-auto absolute bottom-[-150px]  left-[70px] right-[70px] max-w-8xl   bg-[#F6F9FF] 
                p-4 rounded-xl font-tasa items-start"
        >
          <h2 className="text-center text-4xl font-semibold mb-4 text-[#16151C]">
            Frequently Asked Questions
          </h2>
          <div
            className="mx-auto grid md:grid-cols-2 gap-6 bg-[#F6F9FF]  
                    rounded-xl font-tasa items-start"
          >
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className="bg-white rounded-lg p-4 shadow-sm cursor-pointer"
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-[#232323]">
                      {faq.question}
                    </h3>

                    <div
                      className={` ${isOpen ? "bg-[#1E45E1]" : "bg-[#F7F7FF]"} rounded-md p-1`}
                    >
                      {isOpen ? (
                        <Minus size="16" color="#FFFFFF" />
                      ) : (
                        <Add size="16" color="#6B7280" />
                      )}
                    </div>
                  </div>

                  {isOpen && faq.answer && (
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        isOpen ? "max-h-40 mt-3" : "max-h-0"
                      }`}
                    >
                      <p className="text-base text-[#6F6C90] leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="mt-[350px] bg-white">
        <HostelTrial />
      </div>
    </div>
  );
}

export default WhyChooseWithFAQ;

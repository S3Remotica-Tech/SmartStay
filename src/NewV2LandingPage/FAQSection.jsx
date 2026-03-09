import React, { useState } from "react";
import { Add, Minus, ArrowRight } from "iconsax-react";
import Building from "../Assets/v2LandingImages/Building.svg";


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

function FAQSection() {
    const [openIndex, setOpenIndex] = useState(0);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="w-full bg-[#FFFFFF] py-[40px] md:py-[53px] px-[20px] md:px-[101px] font-tasa">




            <div className="w-full flex justify-center py-2 bg-[#00051B] rounded-xl">
                <div className="relative w-full rounded-xl overflow-hidden  flex items-center">

                    <div className="max-w-lg text-white p-4">
                        <h2 className="text-2xl md:text-3xl font-semibold text-[#FFFFFF] leading-snug">
                            Straightforward PG Management Solution!
                        </h2>

                        <div className="flex gap-4 mt-6">
                            <button className="bg-white text-[#222222] flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium hover:shadow font-dmsans">
                                Request Demo <ArrowRight size="18" />
                            </button>

                            <button className="bg-[#1E45E1] text-[#FFFFFF] flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1736b6] font-dmsans">
                                Signup for free Trial <ArrowRight size="18" />
                            </button>
                        </div>
                    </div>


                    <div className="absolute right-0 bottom-0 h-full flex items-end">
                        <img
                            src={Building}
                            alt="building"
                            className="h-[160px] md:h-[220px] object-conver"
                        />
                    </div>
                </div>
            </div>












            <h2 className="text-center text-4xl font-semibold my-10 text-[#16151C]">
                Frequently Asked Questions
            </h2>

            <div className="mx-auto grid md:grid-cols-2 gap-6 bg-[#F6F9FF] p-4 rounded-xl font-tasa items-start">

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

                                <div className={` ${isOpen ? "bg-[#1E45E1]" : "bg-[#F7F7FF]"} rounded-md p-1`}>
                                    {isOpen ? (
                                        <Minus size="16" color="#FFFFFF" />
                                    ) : (
                                        <Add size="16" color="#6B7280" />
                                    )}
                                </div>
                            </div>

                            {isOpen &&  faq.answer &&(
                                <div
                                    className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-40 mt-3" : "max-h-0"
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
    );
}
export default FAQSection;
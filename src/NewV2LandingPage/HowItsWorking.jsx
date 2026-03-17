import React, { useState, useRef } from 'react'

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { TickCircle } from "iconsax-react";
import OnboardTenant from "../Assets/v2LandingImages/OnboardTenant.svg";
import Property from "../Assets/v2LandingImages/Property.svg";
import Reports from "../Assets/v2LandingImages/reports.svg";
import Daily from "../Assets/v2LandingImages/Daily.svg";

function HowItsWorking() {

    const swiperRef = useRef(null);
    const howItWorksData = [
        {
            id: "property",
            title: "Add Your Property",
            description:
                "Set up your hostel structure by adding buildings, floors, rooms, and beds in the SmartStay dashboard.",
            points: [
                "Configure rooms and capacity",
                "Set rent and billing structure"
            ],
            image: Property
        },
        {
            id: "tenants",
            title: "Onboard Tenants",
            description:
                "Register tenants digitally with profile details, KYC verification, and rental agreements in minutes.",
            points: [
                "Digital tenant records",
                "KYC & agreement storage"
            ],
            image: OnboardTenant
        },
        {
            id: "automate",
            title: "Automate Daily Operations",
            description:
                "SmartStay automatically handles rent invoices, EB bill splitting, complaint tracking, and expense management.",
            points: [
                "Recurring rent invoices",
                "EB bill splitting",
                "Complaint management"
            ],
            image: Daily
        },
        {
            id: "reports",
            title: "Track Performance & Reports",
            description:
                "Monitor occupancy, collections, and operational insights with real-time analytics.",
            points: [
                "Live dashboard insights",
                "Exportable reports & analytics"
            ],
            image: Reports
        }
    ];


    const [activeTab, setActiveTab] = useState("property");


    const handleTabClick = (id, index) => {
        setActiveTab(id);
        swiperRef.current?.slideToLoop(index);
    };



    return (
        <div className="bg-[#0f0f10] py-16 font-tasa ">


            <div className="text-center mb-10">
                <p className="text-base bg-[#F6F6F6] text-[#2C2C2C] px-3 py-1 rounded-full inline-block">
                    Onboarding to Daily Operations
                </p>

                <h2 className="text-[52px] font-bold mt-4 bg-gradient-to-r from-[#0565FF] to-[#03A7FF] bg-clip-text text-transparent">
                    How it Works...?
                </h2>
            </div>

            <div className="flex justify-center">
                <div className="bg-[#333333] rounded-full w-fit p-1">
                    {howItWorksData.map((tab, index) => (
                        <button
                            key={tab.id}
                            onClick={() => handleTabClick(tab.id, index)}
                            className={`px-12 py-1.5 rounded-full capitalize transition text-base font-semibold font-tasa
  ${activeTab === tab.id
                                    ? "bg-gradient-to-r from-[#1E45E1] to-[#03A7FF] text-white"
                                    : "text-gray-300"
                                }`}
                        >
                            {tab.id}
                        </button>
                    ))}
                </div>
            </div>
            <div className="max-w-[1400px] mx-auto mt-12">

                <Swiper
                    slidesPerView={"auto"}
                    // slidesPerView={3}
                    centeredSlides={true}
                    spaceBetween={10}
                    loop={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    onSlideChange={(swiper) => {
                        const realIndex = swiper.realIndex;
                        setActiveTab(howItWorksData[realIndex].id);
                    }}
                    className="py-12"
                >
                    {howItWorksData.map((item) => (
                        <SwiperSlide key={item.id} className="!w-[720px] w-full ">

                            <div
                                className={`min-h-[220px] md:min-h-[240px] lg:min-h-[400px] grid grid-cols-2 rounded-xl p-6 flex gap-6  transition-all duration-500
  ${activeTab === item.id
                                        ? "bg-white shadow-2xl scale-100"
                                        : "bg-white scale-90 "
                                    }`}
                            >
                                <div className="flex-1">
                                    <label className="font-semibold text-[29px] mb-3  text-[#222222]">
                                        {item.title}
                                    </label>

                                    <label className="text-md text-[#2D2D2D] mb-4">
                                        {item.description}
                                    </label>

                                    <div className="space-y-2">
                                        {item.points.map((point, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center text-sm text-gray-600"
                                            >
                                                <TickCircle
                                                    size="20"
                                                    variant="Bold"
                                                    color="#00A32E"
                                                    className="mr-2"
                                                />
                                                {point}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>

                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="object-cover"
                                    />
                                </div>

                            </div>

                        </SwiperSlide>
                    ))}
                </Swiper>



            </div>
        </div>
    );
}

export default HowItsWorking
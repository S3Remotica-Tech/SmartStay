import React from 'react'
import TenantIcon from "../Assets/v2LandingImages/Tenant_icon.svg";
import Digital from "../Assets/v2LandingImages/Digital.svg";
import Aadhaar from "../Assets/v2LandingImages/Aadhaar.svg";
import Stays from "../Assets/v2LandingImages/Stay.svg";
import Final from "../Assets/v2LandingImages/Final.svg";

import { Shield, TickCircle, ArrowRight } from 'iconsax-react'






function LifeCycleMethod({isFeatureWay}) {

    const lifecycleCards = [
        {
            title: "Tenant Check-In",
            description:
                "Make onboarding fast, organized, and professional.Capture all required details in minutes and allocate rooms instantly",
            icon: "user",
            image: TenantIcon,
        },
        {
            title: "Digital Rental Agreements",
            description:
                "Create legally structured rental agreements online.Avoid printing, signing, and storing physical papers.",
            icon: "document-text",
            image: Digital
        },
        {
            title: "KYC Verifications",
            description:
                "Upload ID proof digitally and verify tenant records instantly.",
            icon: "shield-tick",
            image: Aadhaar,
            stats: [
                "Upload ID proofs digitally",
                "Secure encrypted storage",
                "Verified tenant records",
                "Instant document retrieval"
            ]
        },
        {
            title: "Stay Management",
            description:
                "Track the complete tenant stay with clarity.Monitor payments, complaints, and room history seamlessly.",
            icon: "home",
            image: Stays,
        },
        {
            title: "Final Settlement & Exit",
            description:
                "Close tenant accounts professionally and transparently.Avoid financial disputes during exit.",
            icon: "receipt",
            image: Final,
            fullWidth: true,
            stats: [
                "Automated rent calculation",
                "EB bill adjustments",
                "Deposit settlement tracking",
                "Final settlement summary report"
            ]
        }
    ];


    return (
        <div className={`w-full ${isFeatureWay ? "bg-[#FFFFFF]" : "bg-[#1A1A1A]"}  py-[53px] px-[101px] font-tasa`}>


            <div className="max-w-7xl mx-auto mb-14">
                <div className='flex items-center justify-between'>
                    <h2 className={`text-3xl md:text-4xl font-semibold ${isFeatureWay ? "text-black" : "text-white"}  font-tesa`}>
                        Complete Tenant
                        <span className="text-blue-500 block">
                            Lifecycle Management
                        </span>
                    </h2>

                    <div className='rounded-xl px-4 py-2  bg-[#FFF3EB33] w-fit flex items-center'>
                        <label className='text-xs font-tasa text-[#FFA600]' >Tenant Management</label>
                    </div>
                </div>


            </div>


            <div className="max-w-7xl mx-auto grid grid-cols-10 gap-4">

                {lifecycleCards.map((card, index) => {

                    let span = "col-span-10";

                    if (!card.fullWidth) {
                        if (index === 0) span = "col-span-4";
                        if (index === 1) span = "col-span-6";
                        if (index === 2) span = "col-span-6";
                        if (index === 3) span = "col-span-4";
                    }

                    return (
                        <div
                            key={index}
                            className={`bg-white rounded-xl p-6 shadow-sm flex flex-col border border-gray-100 justify-between ${span}`}
                        >

                            <div>



                                {
                                    (card.icon === "user" || card.icon === "home") &&

                                    <>
                                        <h3 className="text-[24px] font-semibold text-[#222222] mb-2 leading">
                                            {card.title}
                                        </h3>


                                        <label className="text-base text-[#2D2D2D] mb-6">
                                            {card.description}
                                        </label>
                                    </>
                                }


                                {
                                    (card.icon === "document-text" || card.icon === "shield-tick" || card.icon === "receipt") &&
                                    <div className='grid md:grid-cols-2 gap-6 h-full'>
                                        <div >
                                            <h3 className="text-[24px] font-semibold text-[#222222] mb-2 leading">
                                                {card.title}
                                            </h3>
                                            <label className="text-base text-[#2D2D2D] mb-6">
                                                {card.description}
                                            </label>

                                            <div>
                                                {
                                                    card.stats?.map((item, i) => {
                                                        return (
                                                            <div key={i} className="mx-1 my-2 flex items-center gap-2">

                                                                {card.icon === "shield-tick" && i === 0 ? (
                                                                    <TickCircle size="20" variant="Bold" color="#00A32E" />
                                                                ) : (
                                                                    <TickCircle size="20" color="#1E45E1" />
                                                                )}

                                                                <label>{item}</label>

                                                            </div>
                                                        )
                                                    })
                                                }


                                            </div>


                                        </div>

                                        <div className="">
                                            <img
                                                src={card.image}
                                                alt={card.title}
                                                className="h-full object-contain"
                                            />
                                        </div>
                                    </div>
                                }

                            </div>
                            {
                                (card.icon === "user" || card.icon === "home") &&
                                <div className="flex justify-center relative">
                                    <img
                                        src={card.image}
                                        alt={card.title}
                                        className="h-full object-cover"
                                    />
                                    {
                                        card.icon === "user" &&

                                        <div className='absolute right-0  top-[-30px] whitespace-nowrap flex items-center gap-2 bg-white px-6 py-2 shadow rounded-lg'>
                                            <Shield
                                                size="16"
                                                color="#00A32E"
                                                variant="Bold" /> Checked In </div>}


                                </div>
                            }



                        </div>
                    )

                })}
            </div>
            {
                !isFeatureWay &&
            
            <div className='max-w-7xl flex items-center justify-center'>
                <button className="font-dmsans flex items-center justidy-center mt-4 gap-2 px-6 py-2.5 border-1 border-[#FFFFFF] rounded-lg text-[#FFFFFF] font-medium hover:bg-gray-100 hover:text-[#222222] transition">
                    Request Demo
                    <ArrowRight size="18" />
                </button>
            </div>
}

        </div>
    )
}

export default LifeCycleMethod
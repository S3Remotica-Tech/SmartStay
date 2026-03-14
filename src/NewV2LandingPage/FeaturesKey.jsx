import React, { useEffect } from "react";
import { ArrowRight } from "iconsax-react";
import { BsStars } from "react-icons/bs";
import LaptopMen from "../Assets/v2LandingImages/LaptopMen.svg";
import Speed from "../Assets/v2LandingImages/Speed.svg";
import PaymentReceived from "../Assets/v2LandingImages/PaymentReceived.svg";
import VerifyKYC from "../Assets/v2LandingImages/VerifyKYC.svg";

import { useNavigate } from "react-router-dom";




function FeaturesKey() {




    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);




    let navigate = useNavigate();

    const handleSignUp = () => {
        navigate("/hostel-management-signup");
    };


    const handleNavigateDemo = () => {
        navigate("/demo");
    };



    return (
        <div className="px-6 md:px-12 lg:px-[120px] py-12 bg-white font-tasa">

            <div className="relative overflow-hidden rounded-2xl 
  grid grid-cols-1 lg:grid-cols-2 gap-10
  bg-gradient-to-r from-[#1F2D8C] via-[#2B43A5] to-[#429AFF] 
   items-center">


                <div className="text-white p-8 md:p-12">

                    <div className="inline-flex items-center gap-2 bg-[#F4F6FF26] px-3 py-1 rounded-full text-sm mb-6">
                        <BsStars /> Features
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-[45px] font-bold leading-snug mb-3">
                        Powerful Features, <br />
                        Complete Hostel Control.
                    </h1>

                    <p className="text-white text-sm md:text-base lg:text-[18px] mb-8">
                        SmartStay brings every part of your hostel operations into one intelligent platform.
                        From tenant onboarding to financial reporting, automate, monitor, and scale.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <button onClick={handleSignUp} className="bg-[#FF9D00] text-white text-sm md:text-[16px] px-6 py-3 rounded-lg flex items-center gap-2">
                            30 Day Free Trial <ArrowRight size="16" />
                        </button>

                        <button onClick={handleNavigateDemo} className="bg-white text-[#222222] text-sm md:text-[16px] px-6 py-3 rounded-lg flex items-center gap-2">
                            Book Demo <ArrowRight size="16" color="#222222" />
                        </button>
                    </div>
                </div>


                <div className="relative flex justify-center lg:justify-end min-h-[550px] p-0">

                    <div className="absolute right-[-50px]     bottom-[-40px] bg-[#4F84D9] w-[550px] h-[500px] rounded-tl-3xl -rotate-[10deg] z-0"></div>
                    <img
                        src={LaptopMen}
                        alt="hero"
                        className=" object-contain absolute bottom-0 "
                    />


                    <div className="hidden md:block absolute top-80 left-0 animate-float">
                        <img src={VerifyKYC} alt="kyc" />
                    </div>


                    <div className="hidden md:block absolute bottom-10 right-[30px] animate-float-slow">
                        <img src={PaymentReceived} alt="payment" />
                    </div>


                    <div className="hidden md:block absolute top-[200px] right-20 animate-float-fast">
                        <img src={Speed} alt="speed" />
                    </div>

                </div>

            </div>
        </div>
    );
}
export default FeaturesKey
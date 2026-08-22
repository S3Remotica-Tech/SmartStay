import React from "react";
import { TickCircle } from "iconsax-react";
import Phone from "../Assets/v2LandingImages/whychoose.svg";

function WhyChoose() {
  const features = [
    "Real-time occupancy view",
    "Live payment tracking",
    "Complaint monitoring",
    "Instant performance insights & more",
  ];

  return (
    <div className={`w-full  bg-white text-[#000000] py-10 px-[70px]`}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center px-[70px]">
        <div>
          <h2 className="text-3xl md:text-4xl 2xl:text-4xl font-semibold leading-1 font-tasa">
            Why Choose <span className="text-[#0033FF]">Smartstay</span> for
            Your Hostel?
          </h2>

          <p className="text-[#2D2D2D] mt-4 max-w-md text-xl 2xl:text-xl font-tasa font-normal">
            It transforms manual hostel management into a structured, automated,
            and data-driven system. everything works seamlessly in one powerful
            platform.
          </p>

          <div className="mt-8 space-y-4">
            {features.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <TickCircle size="32" variant="Bold" color="#00A32E" />
                <label
                  className={` text-[#090F29] text-sm 2xl:text-lg font-semibold font-tasa`}
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
    </div>
  );
}

export default WhyChoose;

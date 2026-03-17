import React,{ useEffect, useRef, useState } from "react";
import Business from "../Assets/v2LandingImages/business.svg";
import useInView from "./useInview";



function BusinessChallenges() {
  const [ref, isInView] = useInView(0.3);

  return (
    <div ref={ref} className="w-full h-fit bg-[linear-gradient(to_bottom,#FDFDFD_0%,#0565FF1A_80%)] 
    flex flex-col items-center justify-start pt-4 relative overflow-hidden ">


      <h2 className="text-[52px] md:text-4xl font-semibold text-[#000000] text-center font-gilroy">
        Are you facing these <br />
        <span className="text-[#0565FF]">Business Challenges?</span>
      </h2>


      <div className="relative mt-36">

        <img
          src={Business}
          alt="statue"
          className="w-[350px] md:w-[320px] mx-auto"
        />

        <div
          className={`absolute -top-24 left-1/2 -translate-x-1/2 bg-white px-4 py-1.5 rounded-full shadow text-base text-[#090909] font-tasa whitespace-nowrap font-medium
      ${isInView ? "animate-fadeUp" : "opacity-0"}`}
          style={{ animationDelay: "0.1s" }}
        >
          Room Availability Confusion?
        </div>


        <div
          className={`absolute top-16 -left-64 bg-white px-4 py-1.5 rounded-full shadow text-base text-[#090909] font-tasa whitespace-nowrap font-medium
      ${isInView ? "animate-fadeUp" : "opacity-0"}`}
          style={{ animationDelay: "0.3s" }}
        >
          No Clear Income Visibility?
        </div>


        <div
          className={`absolute top-[184px] -left-72 bg-white px-4 py-1.5 rounded-full shadow text-base text-[#090909] font-tasa whitespace-nowrap font-medium
      ${isInView ? "animate-fadeUp" : "opacity-0"}`}
          style={{ animationDelay: "0.5s" }}
        >
          Monthly Rent Follow-Ups?
        </div>


        <div
          className={`absolute top-16 -right-64 bg-white px-4 py-1.5 rounded-full shadow text-base text-[#090909] font-tasa whitespace-nowrap font-medium
      ${isInView ? "animate-fadeUp" : "opacity-0"}`}
          style={{ animationDelay: "0.7s" }}
        >
          Paper Registers Everywhere?
        </div>


        <div
          className={`absolute top-44 -right-72 bg-white px-4 py-1.5 rounded-full shadow text-base text-[#090909] font-tasa whitespace-nowrap font-medium
      ${isInView ? "animate-fadeUp" : "opacity-0"}`}
          style={{ animationDelay: "0.9s" }}
        >
          Tenants Calling For Small Issues?
        </div>
      </div>
    </div>
  )
}

export default BusinessChallenges
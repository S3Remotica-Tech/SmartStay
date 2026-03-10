import React, { useEffect } from "react";
import axn from "../Assets/v2LandingImages/AXN.svg";
import lenovo from "../Assets/v2LandingImages/Lenovo.svg";
import slack from "../Assets/v2LandingImages/slack.svg";
import youtube from "../Assets/v2LandingImages/youtube.svg";
import amazon from "../Assets/v2LandingImages/amazon.svg";
import google from "../Assets/v2LandingImages/Google.svg";
import microsoft from "../Assets/v2LandingImages/Microsoft.svg";
import Marquee from "react-fast-marquee";


function ActiveCustomer() {

    
  return (
    <div className="w-full bg-[#FDFDFD] py-8 px-[200px]">
              <p className="text-center text-[#061C3D] text-lg mb-6 font-semibold font-gilroy">
                Over <span className="text-blue-600 font-semibold font-gilroy italic">1,000+</span> actively paying customers
              </p>


              <Marquee
                speed={100}
                pauseOnHover={true}
                gradient={false}
              >
                <img src={axn} className="h-8 mx-10 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition" />
                <img src={lenovo} className="h-8 mx-10 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition" />
                <img src={slack} className="h-8 mx-10 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition" />
                <img src={youtube} className="h-8 mx-10 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition" />
                <img src={amazon} className="h-8 mx-10 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition" />
                <img src={google} className="h-8 mx-10 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition" />
                <img src={microsoft} className="h-8 mx-10 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition" />
              </Marquee>

            </div>
  )
}

export default ActiveCustomer
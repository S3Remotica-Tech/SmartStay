/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import ComingSoonImage from "../Assets/v2Images/comingsoon.svg";
import BottomImage from "../Assets/v2Images/bottom_image.svg";



function ComingSoon() {
    return (
       <div className="min-h-screen w-screen  px-4 relative overflow-hidden font-[Gilroy] flex flex-col items-center justify-center text-center">


  <img
    src={ComingSoonImage}
    alt="Coming Soon"
    className="w-[280px] md:w-[340px] mb-6"
  />


  <h1 className="text-2xl font-semibold text-gray-900 mb-2">
    Coming Soon
  </h1>


  <p className="text-sm text-gray-500 max-w-md mb-6">
    Our team is building something helpful for you.
    <br />
    Check back again shortly.
  </p>

 



  <img
    src={BottomImage}
    alt="City"
    className="absolute bottom-0 left-0 w-full opacity-40 pointer-events-none"
  />

</div>

    );
}
export default  ComingSoon

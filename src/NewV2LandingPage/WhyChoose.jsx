import React from 'react'

import Phone from "../Assets/v2LandingImages/whychoose.svg";

function WhyChoose() {
  return (
   <div className="w-full bg-white py-20 px-6 md:px-16">
  <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

     <div>

      <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 leading-snug">
        Why Choose <span className="text-blue-600">Smartstay</span> for Your Hostel?
      </h2>

      <p className="text-gray-500 mt-4 max-w-md">
        It transforms manual hostel management into a structured, automated,
        and data-driven system. Everything works seamlessly in one powerful platform.
      </p>

      
      <div className="mt-8 space-y-4">

        <div className="flex items-center gap-3">
          <div className="w-5 h-5 flex items-center justify-center rounded-full bg-green-500">
            <span className="text-white text-xs">✓</span>
          </div>
          <p className="text-gray-700">Real-time occupancy view</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-5 h-5 flex items-center justify-center rounded-full bg-green-500">
            <span className="text-white text-xs">✓</span>
          </div>
          <p className="text-gray-700">Live payment tracking</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-5 h-5 flex items-center justify-center rounded-full bg-green-500">
            <span className="text-white text-xs">✓</span>
          </div>
          <p className="text-gray-700">Complaint monitoring</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-5 h-5 flex items-center justify-center rounded-full bg-green-500">
            <span className="text-white text-xs">✓</span>
          </div>
          <p className="text-gray-700">
            Instant performance insights & more
          </p>
        </div>

      </div>

    </div>


   
    <div className="relative flex justify-center">

     
      <img
        src={Phone}
        className="w-[260px] relative z-10"
      />

     
    
      
     

    </div>

  </div>
</div>
  )
}

export default WhyChoose
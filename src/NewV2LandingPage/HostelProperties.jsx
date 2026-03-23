import React from 'react';
import { Building3, Home2, Buildings2, People } from "iconsax-react";

function HostelProperties() {

 const cards = [    
    {
      icon: <Building3 size="28" color="#2F80FF" />,
      title: "Small & Medium Hostels",
      desc: "Perfect for growing hostels seeking structured digital management solutions."
    },
    {
      icon: <Home2 size="28" color="#2F80FF" />,
      title: "PG & Shared Accommodations",
      desc: "Manage tenants, rooms, and utilities with complete operational clarity."
    },
    {
      icon: <Buildings2 size="28" color="#2F80FF" />,
      title: "Dormitories & Student Housing",
      desc: "Simplify high-occupancy management with automated billing and tracking."
    },
    {
      icon: <People size="28" color="#2F80FF" />,
      title: "Working Women & Men Hostels",
      desc: "Digitize bookings, billing, and reporting with centralized control."
    }
  ];









  return (
     <section className="w-full bg-[#1A1A1A] py-[40px] md:py-[53px] px-[20px] md:px-[101px] font-tasa">

      <div className="max-w-7xl mx-auto text-center">

       
        <span className="px-4 py-1.5 text-xs 2xl:text-base rounded-full bg-[#E9EDFF] opacity-100 text-[#1E45E1] font-medium">
          Tailored for your Business
        </span>

        
          <h2 className="mt-6 text-3xl md:text-5xl 2xl:text-6xl font-medium text-white leading-8 whitespace-wrap">
          A managing solution for  <br/>
                    <span className="text-[#2F80FF] font-semibold"> Every Hostels & Properties</span>
        </h2>

        
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 2xl:gap-12">

          {cards.map((card, index) => (
            <div
              key={index}
             className="bg-[#262626] p-6 rounded-xl text-left border-1 border-[#262626]
transition-all duration-300
hover:-translate-y-2 hover:shadow-2xl hover:border-[#2F80FF]"
            >
              <div className="mb-6">{card.icon}</div>

              <h3 className="text-white font-semibold text-xl 2xl:text-2xl">
                {card.title}
              </h3>

              <p className="text-white text-sm mt-3 leading-relaxed 2xl:text-xl">
                {card.desc}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  )
}

export default HostelProperties
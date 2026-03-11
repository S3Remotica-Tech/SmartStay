import React from 'react';
import Expenseinte from "../Assets/v2LandingImages/expense1.svg";

function EfficiantOperationSystem() {
    return (
       <div className="w-full py-[30px] md:py-[40px] px-[20px] md:px-[101px] font-tasa bg-[#1A1A1A] mt-20">

  <div className="max-w-[1200px] mx-auto text-center rounded-2xl">

    
    <div className="inline-flex items-center gap-2 bg-[#F6F6F64D] border border-[#F6F6F64D] 
    text-white text-base font-medium px-4 py-1.5 rounded-full mb-6 font-dmsans">
      Tailored for your Business
    </div>

   
    <h1 className="text-[32px] md:text-[52px] font-bold mt-2 text-white leading-tight">
      Efficient Operations <br /> Management
    </h1>

   
    <div className="bg-white mt-10 mx-auto grid md:grid-cols-10 items-center 
    border border-gray-200 rounded-xl p-6 md:p-10 gap-6">

      
      <div className="md:col-span-6 flex items-center">

        <div className="text-left max-w-[520px]">

          <h2 className="text-2xl md:text-4xl font-semibold text-black leading-tight">
            Expense Intelligence
          </h2>

          <p className="text-[#2D2D2D] mt-4 text-base md:text-lg leading-relaxed">
            Track, categorize, and analyze every expense with structured financial
            visibility, improving cost control and profitability decisions.
          </p>

        </div>

      </div>

      
      <div className="md:col-span-4 flex justify-center items-center">

        <img
          src={Expenseinte}
          alt="Expense Intelligence"
          className="w-full max-w-[260px] md:max-w-[320px] object-contain"
        />

      </div>

    </div>

  </div>

</div>
    )
}

export default EfficiantOperationSystem
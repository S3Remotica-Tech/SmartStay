import React from 'react'
import Recurring from "../Assets/v2LandingImages/Recurring.svg";
import { Shield, TickCircle } from 'iconsax-react'



function RecurringInvoice() {

  const features = [
    "Auto-generated monthly invoices",
    "Payment history records",
    "Clear rent summaries",
    "Due tracking & reminders"
  ];










  return (
    <div className='w-full h-fit bg-[#FDFDFD] py-[53px] px-[101px] font-tasa'>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center border-1 border-gray-200 rounded-lg  py-1">

        <div className='h-fit px-4'>

          <h2 className="text-3xl md:text-4xl font-semibold text-[#000000] leading-1 font-tasa  ">
            Recurring Rent Invoices
          </h2>

          <p className="text-[#2D2D2D] mt-4 max-w-md text-xl font-tasa font-normal">
            Automate your monthly rent collection process.
            No more manual reminders or calculation mistakes.
            Get paid on time, every time.
          </p>


          <div className="mt-8 space-y-4">

            {features.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <TickCircle size="32" variant="Bold" color="#00A32E" />
                <label className="text-[#090F29] text-sm font-semibold font-tasa">
                  {item}
                </label>
              </div>
            ))}

          </div>

        </div>



        <div className="relative w-full">
          <img
            src={Recurring}
            className="w-full h-full object-cover"
          />
        </div>

      </div>

    </div>
  )
}

export default RecurringInvoice
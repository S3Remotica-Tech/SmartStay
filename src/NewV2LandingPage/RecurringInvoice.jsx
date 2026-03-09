import React from 'react'
import Recurring from "../Assets/v2LandingImages/Recurring.svg";
import { TickCircle } from 'iconsax-react'
import BillDetails from "../Assets/v2LandingImages/BillDetails.svg";
import Payment from "../Assets/v2LandingImages/paymentmade.svg";
import HostelImage from "../Assets/v2LandingImages/HostelImage.svg";
import BedImage from "../Assets/v2LandingImages/Bed.svg";



function RecurringInvoice() {

  const features = [
    "Auto-generated monthly invoices",
    "Payment history records",
    "Clear rent summaries",
    "Due tracking & reminders"
  ];


  const featuresHostel = [
    "Real-time vacancy tracking",
    "Floor-wise occupancy view",
    "Bed-level allocation control",
    "Easy Bed/room transfers"
  ];







  return (
    <>
      <div className="w-full bg-[#FDFDFD] py-[40px] md:py-[53px] px-[20px] md:px-[101px] font-tasa">

        <div className=" mx-auto grid md:grid-cols-10 items-center border border-gray-200 rounded-lg p-4 md:p-8 gap-10">


          <div className="w-full md:col-span-6 flex items-start self-start ">
            <div>
              <h2 className="text-2xl md:text-4xl font-semibold text-[#000000] leading-tight">
                Recurring Rent Invoices
              </h2>

              <p className="text-[#2D2D2D] mt-4 max-w-md text-base md:text-xl font-normal">
                Automate your monthly rent collection process.
                No more manual reminders or calculation mistakes.
                Get paid on time, every time.
              </p>


              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <TickCircle
                      size="24"
                      variant="Bold"
                      color="#00A32E"
                      className="shrink-0"
                    />
                    <span className="text-[#090F29] text-sm md:text-base font-semibold">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>



          <div
            className="md:col-span-4 relative w-full flex justify-center bg-cover bg-bottom bg-no-repeat h-[320px] md:h-[450px]"
            style={{ backgroundImage: `url(${Recurring})` }}
          >

            <img
              src={BillDetails}
              className="absolute top-[-30px] md:top-[-50px] w-[75%]"
            />

            <img
              src={Payment}
              className="absolute top-[170px] md:top-[200px] right-0 w-[70%]"
            />

          </div>

        </div>

      </div>



      <div className="w-full bg-[#FDFDFD] font-tasa py-[40px] md:py-[53px] px-[20px] md:px-[101px]">

        <div
          style={{ backgroundImage: `url(${Recurring})` }}
          className="bg-cover bg-bottom bg-no-repeat  mx-auto grid md:grid-cols-5
           border border-gray-200 rounded-lg gap-8 p-4 md:p-8"
        >


          <div className="w-full md:col-span-6 flex flex-col">

            <div className="flex flex-col gap-4">
              <h2 className="text-2xl md:text-4xl font-semibold text-[#000000] leading-tight">
                Bed & Floor-Wise Management
              </h2>

              <p className="text-[#2D2D2D] text-sm md:text-base font-normal">
                Track rooms, beds, and floors in real time & avoid allocation
                confusions. Know availability instantly without checking registers.
              </p>
            </div>


            <div className="mt-6 flex flex-wrap gap-4">
              {featuresHostel?.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <TickCircle
                    size="22"
                    variant="Bold"
                    color="#00A32E"
                    className="shrink-0"
                  />
                  <span className="text-[#090F29] text-sm md:text-base font-semibold">
                    {item}
                  </span>
                </div>
              ))}
            </div>


            <div className="w-full relative mt-8 bg-">
              <img
                src={HostelImage}
                className="w-full object-cover rounded-lg"
              />

              <img
                src={BedImage}
                className="absolute bottom-2 right-2 md:bottom-4 md:right-4 w-[40%]"
              />
            </div>

          </div>

        </div>

      </div>
    </>
  )
}

export default RecurringInvoice
import React from 'react'
import IPhone from "../Assets/v2LandingImages/iPhone.svg";
import Nature from "../Assets/v2LandingImages/Nature.svg";
import { TickCircle } from 'iconsax-react'
import MobMock from "../Assets/v2LandingImages/MobMock.svg";
import Whatsapp from "../Assets/v2LandingImages/whatsapp.svg";
import Imagesuccess from "../Assets/v2LandingImages/Imagesuccess.svg";

function MobileApp() {



    const features = [
        "Real-time occupancy view",
        "Live payment tracking",
        "Complaint monitoring",
        "Instant performance insights & more"
    ];


    const featuresTenant = [
        "Easy rent payments",
        "Complaint submission",
        "Payment history access",
        "Instant notifications"
    ];










    return (
        <div className="w-full bg-[#2A2A2A] py-[40px] md:py-[53px] px-[20px] md:px-[101px] font-tasa">

            <div className='flex justify-between '>
                <div className="mb-8">
                    <h2 className="text-[46px] font-semibold text-[#FFFFFF] whitespace-nowrap">
                        Get
                        <span className="bg-gradient-to-r from-[#03A7FF] to-[#0565FF] bg-clip-text text-transparent"> Smartstay </span>
                        for Mobile.
                    </h2>
                    <label className="text-[#FFFFFF] mt-2 text-xl font-normal">
                        Manage. Monitor. Control — Anytime, Anywhere.
                    </label>
                </div>

                <div>
                    <span className="px-3 py-1 text-xs  rounded-full bg-[#E9EDFF] text-[#1E45E1] font-medium">
                        Mobile Apps
                    </span>
                </div>
            </div>

            <div className="bg-white mb-4  mx-auto grid md:grid-cols-10 items-center border border-gray-200 rounded-lg p-4 md:p-8 gap-10">


                <div className="w-full md:col-span-6 flex items-start self-start ">
                    <div>
                        <h2 className="text-2xl md:text-4xl font-semibold text-[#000000] leading-tight">
                            For Owners
                        </h2>

                        <p className="text-[#2D2D2D] mt-4 max-w-md text-base md:text-xl font-normal">
                            Your complete hostel dashboard, now in your pocket.
                            Track rent collections, monitor occupancy, manage complaints, and view reports instantly — even while traveling.

                        </p>


                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-1 gap-4">
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
                        <button className="w-full mt-4 font-dmsans flex items-center justify-center  gap-2 px-6 py-2 bg-[#1E45E1] text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-md">
                            Download App

                        </button>
                    </div>
                </div>



                <div
                    className="md:col-span-4 relative w-full flex justify-center bg-cover bg-bottom bg-no-repeat h-[320px] md:h-[450px]"
                    style={{ backgroundImage: `url(${Nature})` }}
                >

                    <img
                        src={IPhone}
                        className=""
                    />



                </div>

            </div>

            <div className="bg-white mb-4 mx-auto grid md:grid-cols-10 items-center border border-gray-200 rounded-lg p-4 md:p-8 gap-10">


                <div
                    className="md:col-span-4 relative w-full flex justify-center bg-cover bg-bottom bg-no-repeat h-[320px] md:h-[450px]"
                    style={{ backgroundImage: `url(${Nature})` }}
                >

                    <img
                        src={MobMock}
                        className=""
                    />



                </div>


                <div className="w-full md:col-span-6 flex items-start self-start ">
                    <div>
                        <h2 className="text-2xl md:text-4xl font-semibold text-[#000000] leading-tight">
                            For Tenants
                        </h2>

                        <p className="text-[#2D2D2D] mt-4 max-w-md text-base md:text-xl font-normal">
                            Everything tenants need, in one simple app.
                            Pay rent online, raise complaints, and receive important updates without visiting the office.

                        </p>


                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-1 gap-4">
                            {featuresTenant.map((item, index) => (
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


                        <button className="w-full mt-4 font-dmsans flex items-center justify-center  gap-2 px-6 py-2 bg-[#1E45E1] text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-md">
                            Download App

                        </button>
                    </div>
                </div>

            </div>


           


            <div className="bg-white mb-4 mx-auto grid md:grid-cols-10 items-center border border-gray-200 rounded-lg p-4 md:p-8 gap-10">

                <div className="w-full md:col-span-6 flex items-start self-start ">
                    <div>
                        <h2 className="text-2xl md:text-4xl font-semibold text-[#000000] leading-tight">
                            Integrations
                        </h2>

                        <p className="text-[#2D2D2D] mt-4 max-w-md text-base md:text-xl font-normal">
                            Easy to get access integrations with Whatsapp, Razor Pay Payments, AWS Cloud Storages and More..
                        </p>




                        <button className="w-full mt-[120px] font-dmsans flex items-center justify-center  gap-2 px-6 py-2 bg-[#1E45E1] text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-md">
                            Download App

                        </button>
                    </div>
                </div>
               <div
  className="md:col-span-4 z-10 relative w-full flex justify-center bg-cover bg-bottom bg-no-repeat 
  min-h-[200px] md:min-h-[300px] overflow-hidden"
  style={{ backgroundImage: `url(${Nature})` }}
>

                  <img
  src={Imagesuccess}
  className="absolute right-4 bottom-4 z-30 w-[120px] md:w-[230px]"
/>

<img
  src={Whatsapp}
  className="absolute left-4 top-6 z-20 w-[120px] md:w-[200px]"
/>

                </div>
            </div>






        </div>
    )
}

export default MobileApp
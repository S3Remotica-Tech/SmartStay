import React from 'react'
import Built from "../Assets/v2LandingImages/Built.svg";

function NativeBuilt() {
    return (
        <div className="w-full py-[20px] md:py-[30px] px-[20px] md:px-[101px] font-tasa">

            <div className=" mx-auto text-center h-auto bg-[#1A1A1A]  rounded-2xl p-8 md:p-10 ">


                <div className="inline-flex items-center gap-2 bg-[#F6F6F64D] shadow-sm border-1 border-[#F6F6F64D] 
        text-[#FFFFFF] text-base font-medium px-4 py-1.5 rounded-full mb-6 font-dmsans">
                     Makes your work Smart
                </div>
                <h1 className="text-[52px] font-bold mt-4 bg-gradient-to-r from-[#0565FF] to-[#03A7FF] bg-clip-text text-transparent">
                    Natively built. Deeply connected...!
                </h1>
                <div className='mt-2 mb-2'>
                    <img src={Built} alt="image" className='h-[300px] w-full'/>
                </div>


            </div>
        </div>
    )
}

export default NativeBuilt
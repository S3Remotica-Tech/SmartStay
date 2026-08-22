import React from "react";
import { ArrowRight } from "iconsax-react";
import Building from "../Assets/v2LandingImages/Building.svg";
import { useNavigate } from "react-router-dom";

function HostelTrial() {
  let navigate = useNavigate();

  const handleNavigateDemo = () => {
    navigate("/demo");
  };

  const handleSignUp = () => {
    navigate("/hostel-management-signup");
  };

  return (
    // <div className="w-full bg-[#FFFFFF] py-[40px] md:py-[53px] px-[20px] md:px-[101px] font-tasa">
    //     <div className="w-full flex justify-center py-2 bg-[#00051B] rounded-xl">
    //         <div className="relative w-full rounded-xl overflow-hidden  flex items-center">

    //             <div className="max-w-lg text-white p-4">
    //                 <h2 className="text-2xl md:text-3xl font-semibold text-[#FFFFFF] leading-snug">
    //                     Straightforward PG Management Solution!
    //                 </h2>

    //                 <div className="flex gap-4 mt-6">
    //                     <button onClick={handleNavigateDemo} className="bg-white text-[#222222] flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium hover:shadow font-dmsans">
    //                         Request Demo <ArrowRight size="18" />
    //                     </button>

    //                     <button onClick={handleSignUp} className="bg-[#1E45E1] text-[#FFFFFF] flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1736b6] font-dmsans">
    //                         Signup for free Trial <ArrowRight size="18" />
    //                     </button>
    //                 </div>
    //             </div>

    //             {/* <div className="absolute right-0 bottom-0 h-full flex items-end">
    //                 <img
    //                     src={Building}
    //                     alt="building"
    //                     className="h-[160px] md:h-[220px] object-conver"
    //                 />
    //             </div> */}
    //         </div>
    //     </div>
    // </div>
    <div className="w-full bg-[#FFFFFF] py-[40px] md:py-[40px] px-[20px] md:px-[101px] font-tasa">
      <div className="w-full flex justify-center py-2 h-fit rounded-xl">
        <div
          style={{ backgroundImage: `url(${Building})` }}
          className="relative w-full rounded-xl  flex items-center 
                 "
        >
          <div className="relative max-w-lg text-white px-10 py-16">
            <h2 className="text-2xl md:text-3xl font-semibold leading-snug">
              Straightforward PG Management Solution!
            </h2>

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleNavigateDemo}
                className="bg-white text-[#222222] flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium hover:shadow font-dmsans"
              >
                Request Demo <ArrowRight size="18" />
              </button>

              <button
                onClick={handleSignUp}
                className="bg-[#1E45E1] text-[#FFFFFF] flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1736b6] font-dmsans"
              >
                Signup for free Trial <ArrowRight size="18" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HostelTrial;

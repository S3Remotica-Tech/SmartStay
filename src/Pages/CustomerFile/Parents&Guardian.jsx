/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Call, House } from "iconsax-react";
import Areaimage from "../../Assets/Images/area_icon.png";
import Landamrkimage from "../../Assets/Images/landmark.png";

function ParentsGuardian({ additionalContact }) {
  return (
    <>
      {additionalContact?.map((contact, index) => (
        <div key={index} className="mb-[10px]">


          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


            <div className="flex flex-col items-start">
              <p className="text-[12px] font-medium font-gilroy">
                Guardian Full Name
              </p>
              <div className="flex gap-2 mt-1 relative group">
                <House size="18" color="#1E45E1" />
                <span className="text-[14px] font-semibold font-gilroy 
  max-w-[180px] truncate block">
                  {contact?.fullName}
                </span>
                {contact?.fullName && contact.fullName.length > 10 && (
                  <span className="absolute hidden group-hover:block bottom-full left-0 mb-1 
    bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap z-50">
                    {contact.fullName}
                  </span>
                )}
              </div>
            </div>


            <div className="flex flex-col items-start">
              <p className="text-[12px] font-medium font-gilroy">
                Relationship to Tenant
              </p>
             <div className="flex gap-2 mt-1 relative group">
                <img src={Areaimage} alt="area" className="w-4 h-4" />
                <span className="text-[14px] font-semibold font-gilroy truncate max-w-[200px]">
                  {contact?.relationship || ""}
                </span>
                 {contact?.relationship && contact.relationship.length > 10 && (
                  <span className="absolute hidden group-hover:block bottom-full left-0 mb-1 
    bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap z-50">
                    {contact.relationship}
                  </span>
                )}
              </div>
            </div>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">


            <div className="flex flex-col items-start">
              <p className="text-[12px] font-medium font-gilroy">
                Guardian Occupation
              </p>
          <div className="flex gap-2 mt-1 relative group">
                <img src={Landamrkimage} alt="landmark" className="w-4 h-4" />
                <span className="text-[14px] font-semibold font-gilroy">
                  {contact?.occupation || ""}
                </span>
                  {contact?.occupation && contact.occupation.length > 10 && (
                  <span className="absolute hidden group-hover:block bottom-full left-0 mb-1 
    bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap z-50">
                    {contact.occupation}
                  </span>
                )}
              </div>
            </div>


            <div className="flex flex-col items-start">
              <p className="text-[12px] font-medium font-gilroy">
                Mobile no.
              </p>
               <div className="flex gap-2 mt-1 relative group">
                <Call size="16" color="#1E45E1" />
                <span className="text-[14px] font-semibold font-gilroy">
                 + {contact?.country} {contact?.mobile || ""}
                </span>

 

              </div>
            </div>

          </div>

        </div>
      ))}
    </>
  );
}

export default ParentsGuardian;
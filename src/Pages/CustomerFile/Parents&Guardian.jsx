/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Call,  MessageEdit, ArrowDown2 } from "iconsax-react";
import Areaimage from "../../Assets/Images/area_icon.png";
import Landamrkimage from "../../Assets/Images/landmark.png";
import { useHasPermission } from '../../Utils/Permission';



function ParentsGuardian({ additionalContact }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(prev => (prev === index ? null : index));
  };

  const {
    
      canUpdateModule: canUpdateTenant,
          } = useHasPermission("Customers");
  

  return (
    <>
      {additionalContact?.map((contact, index) => (
        <div key={contact.contactId} className="mb-4">


          <div
            className=" bg-gray-100 p-3 rounded-xl cursor-pointer"
            onClick={() => handleToggle(index)}
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center gap-4">
                   <p className="font-semibold text-black text-xl text-start mb-2">{contact.fullName} </p>
                  <span className="bg-orange-100 px-3 py-1 rounded-lg text-orange-600 text-sm font-medium">
                    Contact {index + 1}
                  </span>

                </div>

                <p className="text-sm text-gray-500 flex items-center">
                  <Call size="18"
                    color="#5e5b5b" /> +{contact.country} {contact.mobile}
                </p>
              </div>

              <div className="flex items-center gap-3">


                <button disabled
                  onClick={() => {
                    if (canUpdateTenant) {
                                          }
                  }}
                  className={`flex justify-center items-center h-8 w-8 rounded-full 
                                       disabled:cursor-not-allowed 
      disabled:opacity-50
            ${canUpdateTenant ? "cursor-pointer hover:bg-gray-100" : "cursor-not-allowed opacity-50"}`}
                >
                  <MessageEdit size="22" color={canUpdateTenant ? "#1E45E1" : "#CCCCCC"} variant="Bold" />
                </button>


                <ArrowDown2
                  size="20"
                  className={`transition-transform duration-300 ${activeIndex === index ? "rotate-180" : ""
                    }`}
                />

              </div>
            </div>
            {activeIndex === index && (
              <div className="mt-3 p-3 border rounded-xl bg-white">

                <div className="mb-[10px]">


                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


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



                </div>

              </div>
            )}

          </div>

        </div>
      ))}




    </>
  );
}



export default ParentsGuardian;
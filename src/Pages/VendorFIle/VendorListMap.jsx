/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Image from "react-bootstrap/Image";
import { Edit, Trash } from "iconsax-react";
import PropTypes from "prop-types";
// import "./VendorListMap.css";
// import "./vendor.css";
import { useHasPermission } from "../../Utils/Permission";

function VendorListMap(props) {
  const [showDots, setShowDots] = useState(null);

  const {
    // canWriteModule: canWriteVendor,
    // canReadModule: canReadVendor,
    canUpdateModule: canUpdateVendor,
    canDeleteModule: canDeleteVendor,
  } = useHasPermission("Vendor");

  // const canUpdateVendor = useHasPermission("Vendor", "canUpdate")
  // const canDeleteVendor = useHasPermission("Vendor", "canDelete")

  const popupRef = useRef(null);

  const handleShowDots = () => {
    setShowDots(!showDots);
  };

  const handleEdit = (item) => {
    props.onEditVendor(item);
  };

  const handleDelete = (item) => {
    props.onDeleteVendor(item);
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowDots(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const appearOptions = {
      threshold: 0.5,
    };
    const faders = document.querySelectorAll(".fade-in");
    const appearOnScro1l = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        } else {
          entry.target.classList.add("appear");
          appearOnScro1l.unobserve(entry.target);
        }
      });
    }, appearOptions);
    faders.forEach((fader) => {
      appearOnScro1l.observe(fader);
    });
  });

  const isValid = (value) => {
    return (
      value !== null &&
      value !== undefined &&
      value !== "undefined" &&
      value !== ""
    );
  };

  return (
    <>
      <div
        key={props.vendor?.id}
        className="mt-1 rounded-[16px] border border-[#E6E6E6] bg-white animated-text
                 overflow-auto "
      >
        <div className="p-4">
          <div className="flex justify-between items-center flex-wrap">
            <div className="flex gap-2">
              <div
                className="flex items-center justify-center 
             rounded-full overflow-hidden 
             bg-[#C6D1FF] text-[#1E45E1] 
             font-gilroy font-semibold text-[20px] uppercase 
             w-16 h-16"
              >
                {props.vendor?.profilePic?.trim() ? (
                  <Image
                    src={props.vendor.profilePic}
                    alt={props.vendor?.fullName || "Vendor"}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  `${props.vendor?.firstName?.[0] || ""}${props.vendor?.lastName?.[0] || ""}`
                )}
              </div>

              <div>
                <div>
                  <label className="text-[16px] font-gilroy font-semibold text-[#222]">
                    {props.vendor?.fullName}
                  </label>
                </div>
                <div>
                  <div className="bg-[#FFEFCF] font-gilroy font-medium text-[14px] rounded-[10px] px-2 py-[2px] w-fit">
                    {props.vendor?.businessName || "N/A"}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div
                onClick={() => handleShowDots(props.vendor.id)}
                className={`flex items-center justify-center rounded-full border border-[#EFEFEF] cursor-pointer relative 
              ${showDots ? "bg-[#E7F1FF] z-[1000]" : "bg-white z-auto"} h-10 w-10`}
              >
                <PiDotsThreeOutlineVerticalFill className="h-5 w-5" />

                {showDots && (
                  <div
                    ref={popupRef}
                    className="absolute right-[45px] -top-5 w-[160px] flex flex-col items-start rounded-[10px] border border-[#EBEBEB] bg-[#F9F9F9] z-[1000]"
                  >
                    <div
                      onClick={() =>
                        canUpdateVendor && handleEdit(props.vendor)
                      }
                      className={`flex items-center gap-2 w-full px-3 py-2 rounded-t-[10px] cursor-pointer ${
                        canUpdateVendor
                          ? "hover:bg-[#EDF2FF]"
                          : "opacity-50 cursor-not-allowed"
                      }`}
                    >
                      <Edit
                        size={16}
                        color={canUpdateVendor ? "#1E45E1" : "#A9A9A9"}
                      />
                      <span
                        className={`text-[14px] font-gilroy font-semibold ${
                          canUpdateVendor ? "text-[#222]" : "text-[#A9A9A9]"
                        }`}
                      >
                        Edit
                      </span>
                    </div>

                    <div className="h-[1px] bg-[#F0F0F0]" />

                    <div
                      onClick={() =>
                        canDeleteVendor && handleDelete(props.vendor)
                      }
                      className={`flex items-center gap-2 w-full px-3 py-2 rounded-b-[10px] cursor-pointer ${
                        canDeleteVendor
                          ? "hover:bg-[#FFF0F0]"
                          : "opacity-50 cursor-not-allowed"
                      }`}
                    >
                      <Trash
                        size={16}
                        color={canDeleteVendor ? "red" : "#A9A9A9"}
                      />
                      <span
                        className={`text-[14px] font-gilroy font-semibold ${
                          canDeleteVendor ? "text-red-600" : "text-[#A9A9A9]"
                        }`}
                      >
                        Delete
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <hr className="my-2 border border-[#E7E7E7]" />

          <div className="flex justify-between items-center flex-wrap mb-1">
            <div className="mb-2 leading-none">
              <div className="pb-1">
                <label className="text-[14px] font-gilroy font-medium text-slate-600">
                  Email ID
                </label>
              </div>
              <div>
                <label className="text-[16px] font-gilroy font-semibold text-[#222]">
                  {props.vendor?.emailId && props.vendor.emailId !== "undefined"
                    ? props.vendor.emailId
                    : "N/A"}
                </label>
              </div>
            </div>

            <div className="mb-1 leading-none">
              <div className="pb-1">
                <label className="text-[14px] font-gilroy font-medium text-slate-600">
                  Contact Number
                </label>
              </div>
              <div>
                <label className="text-[16px] font-gilroy font-semibold text-[#222]">
                  {props.vendor?.mobile && (
                    <>
                      +{props.vendor.mobile.slice(0, 2)}{" "}
                      {props.vendor.mobile.slice(2)}
                    </>
                  )}
                </label>
              </div>
            </div>
          </div>

          <div className="mb-2 leading-none">
            <div className="flex justify-between flex-wrap">
              <div className="max-w-[75%]">
                <div className="pb-1">
                  <label className="text-[14px] font-gilroy font-medium text-slate-600 mb-1">
                    Address
                  </label>
                </div>
                <label className="text-[16px] font-gilroy font-semibold text-[#222] leading-[1.5] break-words">
                  {isValid(props.vendor?.houseNo) &&
                    `${props.vendor.houseNo}, `}
                  {isValid(props.vendor?.area) && `${props.vendor.area}, `}
                  {isValid(props.vendor?.landMark) &&
                    `${props.vendor.landMark}, `}
                  {isValid(props.vendor?.city) && `${props.vendor.city}, `}
                  {isValid(props.vendor?.state) &&
                    `${props.vendor.state}${props.vendor.country ? " " : ""},`}
                  <br />
                  {props.vendor.country}{" "}
                  {isValid(props.vendor?.pinCode) &&
                    `- ${props.vendor.pinCode}`}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
VendorListMap.propTypes = {
  onEditVendor: PropTypes.func.isRequired,
  onDeleteVendor: PropTypes.func.isRequired,
  vendor: PropTypes.func.isRequired,
  // vendorEditPermission: PropTypes.func.isRequired,
  // vendorDeletePermission: PropTypes.func.isRequired,
};

export default VendorListMap;

import React from "react";
import ComingSoonImage from "../Assets/v2Images/permission.svg";
import BottomImage from "../Assets/v2Images/bottom_image.svg";

function PermissionDeniedMessage({ isHeightChanged }) {
  return (
    <div
      className={` ${isHeightChanged ? "min-h-[350px] " : "min-h-[600px] "} bg-gray-50 w-full flex items-center justify-center bg-white !overflow-hidden relative 
      px-4`}
    >
      <img
        src={BottomImage}
        alt="City"
        className="absolute bottom-0 left-0 w-full opacity-40 pointer-events-none"
      />

      <div className="relative z-10 font-gilroy flex flex-col items-center justify-center text-center">
        <img
          src={ComingSoonImage}
          alt="Permission Restricted"
          className="w-[170px] sm:w-[140px] md:w-[150px] object-contain"
        />

        <h1 className="mt-1 text-[24px]  font-semibold text-[#101828]">
          Permission Restricted !
        </h1>

        <p className="mt-1 text-sm md:text-base text-[#4A5565] max-w-md">
          Your permission is restricted for this module
        </p>

        <button
          disabled
          className="mt-2 flex items-center justify-center rounded-lg font-gilroy bg-[#1E45E1] disabled:bg-gray-100 disabled:text-gray-400 px-5 py-2 min-w-[140px] disabled:cursor-not-allowed"
        >
          Contact Admin
        </button>
      </div>
    </div>
  );
}

export default PermissionDeniedMessage;

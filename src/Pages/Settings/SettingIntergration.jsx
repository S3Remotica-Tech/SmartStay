import React from "react";
import ComingSoon from "../../Utils/ComingSoon";

function SettingIntergration() {
  return (


    <div className="bg-white">
      <div className="flex items-center px-2 bg-white">
        <label className="font-gilroy text-lg text-[#222] font-semibold mt-1.5">
          Integration
        </label>
      </div>

      <div className="h-[calc(100vh-70px)] flex justify-center items-start -translate-y-10 overflow-hidden">
        <ComingSoon />
      </div>
    </div>
  );
}

export default SettingIntergration;

import { Location } from "iconsax-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
function TenantJobDetails() {
  const state = useSelector((state) => state);
  const CustomerOverView = state?.UsersList?.customerdetails;

  return (
    <div className="w-full rounded-[14px]  border border-gray-200 bg-white px-4 py-4 font-gilroy my-4">
      <div className="pb-2 border-b border-gray-100">
        <h2 className="text-[18px] font-semibold text-[#000000]">
          Job & Shift Details
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-8 pt-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">Employment Status</p>
          <p className="text-sm font-medium text-[#222222]">N/A</p>
        </div>

        <div>
          <p className="text-xs text-gray-500 mb-1">Company/College Name</p>
          <p className="text-sm font-medium text-[#222222]">N/A</p>
        </div>

        <div>
          <p className="text-xs text-gray-500 mb-1">Job Role</p>
          <p className="text-sm font-medium text-[#222222]">N/A</p>
        </div>

        <div>
          <p className="text-xs text-gray-500 mb-1">Work Location</p>

          <div className="flex items-center gap-2">
            <Location size="16" color="#1E45E1" />

            <span className="text-sm font-medium text-[#222222]">N/A</span>
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-500 mb-1">Shift Type</p>
          <p className="text-sm font-medium text-gray-900">N/A</p>
        </div>

        <div>
          <p className="text-xs text-gray-500 mb-1">Shift Timing</p>
          <p className="text-sm font-medium text-[#222222]">N/A</p>
        </div>
      </div>
    </div>
  );
}

export default TenantJobDetails;

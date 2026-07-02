import React from "react";
import { Modal } from "antd";
import { Add } from "iconsax-react";

function KYCTenantDetails({ show, handleClose }) {
  const kycDetails = [
    {
      label: "Full Name",
      value: "Sarath Kumar C",
      valueClass: "font-medium text-[#222]",
    },
    {
      label: "Type",
      value: "Aadhar",
    },
    {
      label: "Doc No",
      value: "3453 9876 5432",
      valueClass: "text-[#1E45E1] font-medium",
    },
    {
      label: "DOB",
      value: "10/09/2002",
    },
    {
      label: "Mobile",
      value: "+91 98654 68712",
    },
    {
      label: "Address",
      value:
        "No 102, Block B, Southern Avenue, TDC Nagar, Sholinganallur, Chennai, Tamil Nadu - 600119",
    },
    {
      label: "Permanent Address",
      value:
        "No 102, Block B, Southern Avenue, TDC Nagar, Sholinganallur, Chennai, Tamil Nadu - 600119",
    },
  ];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4 py-4">
      <div className="w-full max-w-[460px] rounded-xl bg-white shadow-2xl font-gilroy">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-[18px] font-semibold text-[#222]">KYC Info</h2>

          <button
            onClick={handleClose}
            className="text-xl text-red-500 hover:text-red-600"
          >
            <Add className="rotate-45" />
          </button>
        </div>

        <div className="flex justify-center py-4">
          <img
            src="/images/profile.png"
            alt="Profile"
            className="h-28 w-28 rounded-full object-cover bg-gray-50"
          />
        </div>

        <div className="space-y-3 p-4">
          {kycDetails.map(({ label, value, valueClass = "" }) => (
            <div
              key={label}
              className="grid grid-cols-[120px_1fr] items-start gap-x-5"
            >
              <span className="text-[13px] text-[#8A8A8A] leading-5">
                {label}
              </span>

              <span
                className={`text-[14px] text-[#222] leading-5 break-words ${valueClass}`}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default KYCTenantDetails;

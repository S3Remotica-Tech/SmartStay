/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { CloseCircle, ArrowRight2, Add, Send2 } from "iconsax-react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "antd";
import { Profile } from "iconsax-react";

function KYCTenantDetails({ show, handleClose }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const kycInfo = state?.UsersList?.customerdetails?.kycInfo;

  const kycDetails = [
    {
      label: "Full Name",
      value: kycInfo?.nameInAadhaar || "-",
      valueClass: "font-medium text-[#222222]",
    },
    {
      label: "Type",
      value: "Aadhaar",
    },
    {
      label: "Doc No",
      value: kycInfo?.aadhaarNumber || "-",
      valueClass: "text-[#1E45E1] font-medium",
    },
    {
      label: "DOB",
      value: kycInfo?.dateOfBirth || "-",
    },
    {
      label: "Mobile",
      value: kycInfo?.mobile || "-",
    },

    {
      label: "Address",
      value: kycInfo?.currentAddress?.fullAddress || "-",
    },
    {
      label: "Permanent Address",
      value: kycInfo?.permanentAddress?.fullAddress || "-",
    },
  ];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 overflow-y-auto">
      <div className="w-full max-w-[460px] rounded-xl bg-white shadow-2xl font-gilroy overflow-hidden">
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
          {kycInfo?.aadhaarImage ? (
            <img
              src={kycInfo.aadhaarImage}
              alt="Profile"
              className="h-28 w-28 rounded-full object-cover bg-gray-50 border"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
          ) : null}

          <div
            className={`h-28 w-28 rounded-full bg-gray-100 flex items-center justify-center ${
              kycInfo?.aadhaarImage ? "hidden" : "flex"
            }`}
          >
            <Profile size={50} color="#9CA3AF" variant="Bold" />
          </div>
        </div>

        <div className="space-y-3 p-4">
          {kycDetails.map(({ label, value, valueClass = "" }) => (
            <div
              key={label}
              className="grid grid-cols-[100px_minmax(0,1fr)] sm:grid-cols-[120px_minmax(0,1fr)] gap-x-4 items-start"
            >
              <span className="text-[13px] text-[#8A8A8A] leading-5">
                {label}
              </span>

              <span
                className={`min-w-0 whitespace-normal break-words break-all text-[14px] leading-5  ${valueClass}`}
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

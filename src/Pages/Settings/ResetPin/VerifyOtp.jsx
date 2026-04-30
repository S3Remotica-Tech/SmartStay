/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Add, Crown1 } from "iconsax-react";

const VerifyOtp = ({ show, handleClose, onConfirmSuccess }) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  if (!show) return null;
  const account = state?.createAccount?.accountList;
  const [otp, setOtp] = useState("");

  const maskMobileNumber = (countryCode, mobileNo) => {
    if (!mobileNo) return "";

    const visibleDigits = mobileNo.slice(-4);
    const maskedPart = "X".repeat(mobileNo.length - 4);

    return `+${countryCode}${maskedPart}${visibleDigits}`;
  };

  const handleSubmit = () => {
    //  if (!password.trim()) return;
   
    onConfirmSuccess(true);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-[9999] font-gilroy">
      <div className="bg-white w-fit rounded-xl p-6 relative">
        <Add
          size="26"
          className="absolute right-4 top-4 cursor-pointer text-red-500 rotate-45"
          onClick={handleClose}
        />

        <h2 className="text-[20px] font-semibold mb-4 text-[#1F2633] ">
          Verify your Identity
        </h2>

        <label className="text-sm text-[#4A5565] mb-2 font-medium">
          OTP sent to registered mobile number (
          <span className="text-sm text-[#222222] font-semibold">
            {maskMobileNumber(account?.countryCode, account?.mobileNo)}
          </span>
          )
        </label>
        <div className="mb-2">
          <label className="text-[14px] text-[#1F2633] mb-2">
            Enter OTP <span className="text-red-500 text-base">*</span>
          </label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full border border-[#D1D5DC] rounded-lg px-3 py-2  focus:outline-none focus:ring-2 focus:ring-[#4E61F6]"
          />
        </div>
        <div className="flex justify-end gap-1  my-3">
          <label className="text-sm text-[#4A5565]">Didn’t receive OTP?</label>

          <label
            className="text-sm font-semibold text-blue-600 hover:underline"
            // onClick={handleResendOtp}
          >
            Send Again
          </label>
        </div>

        <div className="flex justify-end gap-3">
          <button className="px-4 py-2 border rounded-lg" onClick={handleClose}>
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-[#1E45E1] text-white rounded-lg"
            onClick={handleSubmit}
          >
            Verify OTP
          </button>
        </div>
      </div>
    </div>
  );
};
VerifyOtp.propTypes = {
  handleClose: PropTypes.func.isRequired,
};
export default VerifyOtp;

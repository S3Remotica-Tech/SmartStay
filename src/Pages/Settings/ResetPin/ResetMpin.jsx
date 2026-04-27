/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { CloseCircle, Lock } from "iconsax-react";

const ResetMpin = ({ show, handleClose }) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const account = state?.createAccount?.accountList;

  if (!show) return null;

  const [mpin, setMpin] = useState(["", "", "", ""]);
  const [confirm, setConfirm] = useState(["", "", "", ""]);

  const mpinRefs = useRef([]);
  const confirmRefs = useRef([]);

  const handleChange = (e, index, type) => {
    const value = e.target.value;

    if (!/^\d?$/.test(value)) return;

    const updated = type === "mpin" ? [...mpin] : [...confirm];
    updated[index] = value;

    if (type === "mpin") {
      setMpin(updated);
      if (value && index < 3) mpinRefs.current[index + 1]?.focus();
    } else {
      setConfirm(updated);
      if (value && index < 3) confirmRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index, type) => {
    if (e.key === "Backspace") {
      const arr = type === "mpin" ? mpin : confirm;

      if (!arr[index] && index > 0) {
        if (type === "mpin") {
          mpinRefs.current[index - 1]?.focus();
        } else {
          confirmRefs.current[index - 1]?.focus();
        }
      }
    }
  };

  const isMismatch = mpin.join("") !== confirm.join("");
  const isComplete = mpin.every(Boolean) && confirm.every(Boolean);

  const handleSubmit = () => {};

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-[9999] font-gilroy ">
      <div className="bg-white w-fit rounded-2xl p-6 relative shadow-lg">
        <CloseCircle
          size="22"
          className="absolute right-4 top-4 cursor-pointer text-red-500"
          onClick={handleClose}
        />

        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-[20px] font-semibold mb-2 text-[#1F2633] ">
            Set a New MPIN
          </h2>
        </div>

        <label className="text-sm text-[#4A5565] mb-2 font-medium whitespace-nowrap">
          Create a new mPIN. Ensure it differs from previous ones for security
        </label>

        <div className="my-3">
          <p className="text-sm mb-2 font-semibold text-[#2A2A2A]">
            Enter New MPIN
          </p>
          <div className="flex gap-3">
            {mpin.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (mpinRefs.current[i] = el)}
                type="password"
                maxLength={1}
                value={digit}
                autoComplete="new-password"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                data-lpignore="true"
                data-form-type="other"
                name={`mpin-${i}-${Date.now()}`}
                onChange={(e) => handleChange(e, i, "mpin")}
                onKeyDown={(e) => handleKeyDown(e, i, "mpin")}
                className="w-12 h-12 text-center text-lg border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              />
            ))}
          </div>
        </div>

        <div className="my-3">
          <p className="text-sm mb-2 font-semibold text-[#2A2A2A]">
            Confirm New MPIN
          </p>
          <div className="flex gap-3">
            {confirm.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (confirmRefs.current[i] = el)}
                type="password"
                maxLength={1}
                value={digit}
                autoComplete="new-password"
                autoCorrect="off"
                autoCapitalize="off"
                onChange={(e) => handleChange(e, i, "confirm")}
                onKeyDown={(e) => handleKeyDown(e, i, "confirm")}
                className="w-12 h-12 text-center text-lg border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              />
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            className="px-5 py-2 border rounded-xl text-sm text-[#64748B]"
            onClick={handleClose}
          >
            Cancel
          </button>

          <button
            className={`px-5 py-2 rounded-xl text-sm text-white transition bg-[#1E45E1] cursor-pointer
            `}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetMpin;

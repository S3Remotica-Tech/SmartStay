/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Add, CloseCircle, Crown1 } from "iconsax-react";

const ConfirmIdentity = ({ show, handleClose, onVerifySuccess }) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");

  const account = state?.createAccount?.accountList;

  if (!show) return null;

  const handleSubmit = () => {
    //  if (!password.trim()) return;
    console.log("Executedddddd");
    onVerifySuccess(true);
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-[9999] font-gilroy ">
        <div className="bg-white w-fit rounded-xl p-6 relative">
          <Add
            size="26"
            className="absolute right-4 top-4 cursor-pointer text-red-500 rotate-45"
            onClick={handleClose}
          />

          <h2 className="text-[20px] font-semibold mb-4 text-[#1F2633] ">
            Confirm Your Identity
          </h2>

          <div className="flex items-center w-full gap-2 md:gap-3">
            <div>
              {account?.profilePic ? (
                <img
                  src={account.profilePic}
                  alt="profile"
                  className="w-14 h-14 min-w-[56px] min-h-[56px] md:w-12 md:h-12 md:min-w-[48px] md:min-h-[48px] rounded-full object-cover"
                />
              ) : (
                <div className="w-14 h-14 md:w-12 md:h-12 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-semibold text-lg md:text-base font-gilroy uppercase">
                  {account?.initial}
                </div>
              )}
            </div>
            <div className="w-full ">
              <div className="flex justify-between items-center">
                <div className="w-full ">
                  <span
                    className="text-lg font-semibold text-gray-900 capitalize block truncate"
                    title={`${account.firstName} ${account.lastName}`}
                  >
                    {account.firstName} {account.lastName}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5 text-xs text-white bg-[#E5913D] px-2 py-0.5 rounded-full font-gilroy w-max">
                  {account?.roleName} <Crown1 size={14} color="#FFFFFF" />
                </div>
              </div>
            </div>
          </div>

          <div className="my-3">
            <label className="text-sm text-[#4A5565] mb-2 font-medium">
              Enter the admin password of{" "}
              <span className="text-sm text-[#222222]  font-semibold">
                {" "}
                ({account?.mailId})
              </span>
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter"
              className="w-full border border-[#D1D5DC] rounded-lg px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-[#4E61F6]"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              className="px-4 py-2 border rounded-lg"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-[#1E45E1] text-white rounded-lg"
              onClick={handleSubmit}
            >
              Verify & Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
ConfirmIdentity.propTypes = {
  handleClose: PropTypes.func.isRequired,
};
export default ConfirmIdentity;

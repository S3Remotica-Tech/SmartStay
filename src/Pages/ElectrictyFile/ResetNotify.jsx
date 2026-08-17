import React, { useState } from "react";
import { useSelector } from "react-redux";

function ResetNotify({ show, handleClose }) {
  const state = useSelector((state) => state);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
      <div className="w-[420px] rounded-2xl bg-white p-6 shadow-xl">
        <div className=" rounded-xl bg-[#F5F7FF] p-2 text-center">
          <p className="text-sm font-gilroy text-[#222222] mb-0">
            <span className="text-[#222222] font-semibold ">
              New EB calculations will start from{" "}
            </span>
            <span className="font-semibold text-[#1E45E1]">
              {state?.UsersList?.resetEb?.resetOn || "-"}
            </span>{" "}
            <br />
            <span className="font-semibold "> using the reading </span>
            <span className="font-semibold text-[#1E45E1]">
              {Number(state?.UsersList?.resetEb?.startReading) || 0} kWh
            </span>
          </p>
          <p className="mt-1 text-center text-xs font-gilroy text-[#666666]">
            Previous meter readings and calculations will remain in history.
          </p>
        </div>

        <div className="mt-2 flex justify-center gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-md border-1 border-[#D9D9D9] px-4 py-2.5 text-sm font-semibold font-gilroy text-[#4B4B4B]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetNotify;

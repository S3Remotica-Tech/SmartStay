/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import ErrorMessage from "../../Components/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { Add, Wifi } from "iconsax-react";

function Approve({ show, handleClose }) {
  if (!show) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-[9999]" />

      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed inset-y-2 right-2 w-[600px] bg-white rounded-lg shadow-xl z-[9999] flex flex-col font-gilroy border border-gray-50"
      >
        <div
          className="sticky top-0 z-50 flex items-center  justify-between gap-4   
                  rounded-xl  bg-white px-4 py-3"
        >
          <h1 className="text-[18px] font-semibold text-[#222222] mb-0">
            Assign Amenity
          </h1>
          <Add
            size={24}
            color="#FF0000"
            onClick={handleClose}
            className="cursor-pointer rotate-45"
          />
        </div>

        <div className="px-4 flex-1 show-scrolls overflow-y-auto">
          <label className="text-xs text-[#7F7F7F] mb-2">Raised by</label>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold">
              JS
            </div>

            <div>
              <label className="font-medium text-[#222222] text-[18px]">
                Jon Snow
              </label>

              <div className="flex gap-2 mt-1">
                <span className="bg-[#FFEFCF] text-[#57411D] text-[12px] px-2 py-0.5 rounded">
                  Ground Floor
                </span>

                <span className="bg[#FFE0D9] text-[#692121] text-[12px] px-2 py-0.5 rounded">
                  G005 - B03
                </span>
              </div>
            </div>
          </div>

          <label className="text-xs text-[#7F7F7F] mb-2">
            Amenity Requested
          </label>
          <div className="flex items-center gap-3  p-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Wifi size="32" color="#1E45E1" />
            </div>

            <div>
              <p className="font-medium">Wifi</p>
              <p className="text-sm text-[#667085]">₹399 / Month</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 my-4 mr-4">
          <button
            onClick={handleClose}
            className="flex-1 border rounded-lg py-2"
          >
            Cancel
          </button>

          <button className="flex-1 bg-[#1E45E1] text-white rounded-lg py-2">
            Assign
          </button>
        </div>
      </div>
    </>
  );
}

export default Approve;

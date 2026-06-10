/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";

function ExpenseItems() {
  return (
    <div>
      <div className="bg-white    rounded-xl   mx-1 my-3 ">
        <div
          id="tableContainer"
          //   ref={tableContainerRef}
          className="overflow-auto relative h-[150px]  show-scrolls"
        >
          <table className=" w-full font-gilroy ">
            <thead className="bg-[#F9FAFB] sticky top-0 z-30 text-[#6B7280] text-xs uppercase">
              <tr>
                <th className="px-4 py-2.5 text-left text-xs text-[#666]">
                  Item details
                </th>
                <th className="px-4 py-2.5 text-left text-xs text-[#666]">
                  Quantity
                </th>
                <th className="px-4 py-2.5 text-left text-xs text-[#666]">
                  Unit
                </th>
                <th className="px-4 py-2.5 text-left text-xs text-[#666]">
                  Per Unit price
                </th>

                <th className="px-4 py-2.5 text-left text-xs text-[#666]">
                  AMOUNT
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b last:border-b-0">
                <td className="px-4 py-2 text-sm">Tomato</td>

                <td className="px-4 py-2 text-[#1E45E1] text-sm">20</td>

                <td className="px-4 py-2 text-sm">Kgs</td>
                <td className="px-4 py-2 text-[#1E45E1] text-sm"> ₹20</td>

                <td className="px-4 py-2 font-medium">₹ 400</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="bg-[#F9F9F9] border-1 border-[#F8F8F8] rounded-md py-4 px-4 ">
          <div className=" flex items-center justify-between w-[300px]">
            <p className="text-[12px] text-[#4B4B4B] mb-2">Total Amount</p>
            <p className="mt-1 font-semibold text-[#222222] text-[14px] mb-2">
              ₹00.00
            </p>
          </div>
          <div className=" flex items-center justify-between w-[300px]">
            <p className="text-[12px] text-[#4B4B4B] mb-2">Subtotal</p>
            <p className="mt-1 font-semibold text-[#222222] text-[14px] mb-2">
              ₹00.00
            </p>
          </div>
          <div className=" flex items-center justify-between w-[300px]">
            <p className="text-[12px] text-[#4B4B4B] mb-1">Discount</p>
            <p className="mt-1 font-semibold text-[#FF0000] text-[14px] mb-1">
              - ₹00.00
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpenseItems;

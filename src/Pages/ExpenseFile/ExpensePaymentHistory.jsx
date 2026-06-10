/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";

function ExpensePaymentHistory() {
  return (
    <div>
      <div className="bg-white    rounded-xl  mx-1 my-3 ">
        <div
          id="tableContainer"
          //   ref={tableContainerRef}
          className="overflow-auto relative h-[150px]  show-scrolls"
        >
          <table className=" w-full font-gilroy ">
            <thead className="bg-[#F9FAFB] sticky top-0 z-30 text-[#6B7280] text-xs">
              <tr>
                <th className="px-4 py-2.5 text-left text-xs text-[#666]">
                  DATE
                </th>
                <th className="px-4 py-2.5 text-left text-xs text-[#666]">
                  REF NO
                </th>
                <th className="px-4 py-2.5 text-left text-xs text-[#666]">
                  PAYMENT MODE
                </th>
                <th className="px-4 py-2.5 text-left text-xs text-[#666]">
                  STATUS
                </th>
                <th className="px-4 py-2.5 text-left text-xs text-[#666]">
                  AMOUNT
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b last:border-b-0">
                <td className="px-4 py-2.5 text-sm">18 Nov 2025</td>

                <td className="px-4 py-2.5 text-[#1E45E1] text-sm">
                  TNX897554
                </td>

                <td className="px-4 py-2.5 text-sm">UPI</td>

                <td className="px-4 py-2.5">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F8EC] px-2.5 py-1 text-[12px] font-medium text-[#00A32E]">
                    <span className="h-2 w-2 rounded-full bg-[#00A32E]" />
                    Paid
                  </span>
                </td>

                <td className="px-4 py-2.5 font-medium">₹ 2,500</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end">
        <div className="bg-[#F9F9F9] border-1 border-[#F8F8F8] rounded-md py-4 px-4 ">
          <div className=" flex items-center justify-between w-[300px]">
            <p className="text-[12px] text-[#4B4B4B] mb-2">Amount Paid</p>
            <p className="mt-1 font-semibold text-[#222222] text-[14px] mb-2">
              ₹00.00
            </p>
          </div>

          <div className=" flex items-center justify-between w-[300px]">
            <p className="text-[12px] text-[#4B4B4B] mb-1">Balance due</p>
            <p className="mt-1 font-semibold text-[#FF0000] text-[14px] mb-1">
              - ₹00.00
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpensePaymentHistory;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";

function VendorPaymentHistory() {
  return (
    <div className="bg-white    rounded-xl shadow-sm border border-[#E8E8E8] mx-1 my-3 ">
      <div
        id="tableContainer"
        //   ref={tableContainerRef}
        className="overflow-auto relative h-[calc(100vh-250px)] rounded-xl show-scrolls"
      >
        <table className=" w-full font-gilroy ">
          <thead className="bg-[#F9FAFB] sticky top-0 z-30 text-[#6B7280] text-xs uppercase">
            <tr>
              <th className="px-4 py-3 text-left text-xs text-[#666]">DATE</th>
              <th className="px-4 py-3 text-left text-xs text-[#666]">
                REF NO
              </th>
              <th className="px-4 py-3 text-left text-xs text-[#666]">
                PAYMENT MODE
              </th>
              <th className="px-4 py-3 text-left text-xs text-[#666]">
                STATUS
              </th>
              <th className="px-4 py-3 text-left text-xs text-[#666]">
                AMOUNT
              </th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t">
              <td className="px-4 py-3 text-sm">18 Nov 2025</td>

              <td className="px-4 py-3 text-[#1E45E1] text-sm">TNX897554</td>

              <td className="px-4 py-3 text-sm">UPI</td>

              <td className="px-4 py-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F8EC] px-2.5 py-1 text-[12px] font-medium text-[#00A32E]">
                  <span className="h-2 w-2 rounded-full bg-[#00A32E]" />
                  Paid
                </span>
              </td>

              <td className="px-4 py-3 font-medium">₹ 2,500</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VendorPaymentHistory;

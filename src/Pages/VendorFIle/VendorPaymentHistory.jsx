/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Select from "react-select";
import { TiTick } from "react-icons/ti";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import {
  CloseCircle,
  SearchNormal1,
  ArrowDown,
  Filter,
  Setting3,
  ArrowDown2,
  ArrowUp2,
  DirectSend,
  ExportSquare,
} from "iconsax-react";

import ErrorMessage from "../../Components/ErrorMessage";
import { useHasPermission } from "../../Utils/Permission";
import PermissionDeniedMessage from "../../Utils/PermissionDeniedMessage";
import NoDataMessage from "../../Utils/NoDataMessage";
import ApiPagination from "../../Components/ApiPagination";

function VendorPaymentHistory() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const vendorPaymentMadeHistory =
    state.ComplianceList?.vendorOverviewExpensePaymentList?.payments || [];

  return (
    <>
      {vendorPaymentMadeHistory.length > 0 ? (
        <div className="bg-white    rounded-xl px-4  ">
          <div
            id="tableContainer"
            //   ref={tableContainerRef}
            className="overflow-auto relative h-[calc(50vh-250px)]  show-scrolls"
          >
            <table className=" w-full font-gilroy ">
              <thead className="bg-[#F9FAFB] sticky top-0 z-30 text-[#6B7280] text-xs uppercase">
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
                {vendorPaymentMadeHistory.length > 0 ? (
                  vendorPaymentMadeHistory.map((payment) => (
                    <tr key={payment.id} className="border-t">
                      <td className="px-4 py-2.5 text-sm">
                        {payment.paymentDate}
                      </td>

                      <td className="px-4 py-2.5 text-[#1E45E1] text-sm">
                        {payment.transactionId || "-"}
                      </td>

                      <td className="px-4 py-2.5 text-sm">
                        {payment.paymentMethod}
                      </td>

                      <td className="px-4 py-2.5">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F8EC] px-2.5 py-1 text-[12px] font-medium text-[#00A32E]">
                          <span className="h-2 w-2 rounded-full bg-[#00A32E]" />
                          Paid
                        </span>
                      </td>

                      <td className="px-4 py-2.5 font-medium">
                        ₹ {payment.paidAmount}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-gray-500">
                      No Payment History Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="mx-4">
          <NoDataMessage
            label="Vendor Payment History"
            isHeightChanged={true}
          />
        </div>
      )}
    </>
  );
}

export default VendorPaymentHistory;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import {
  CloseCircle,
  Add,
  Flash,
  Call,
  Location,
  Warning2,
  AddCircle,
} from "iconsax-react";
import { useDispatch, useSelector } from "react-redux";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import VendorExpenseHistory from "./VendorExpenseHistory";
import VendorComments from "./VendorComments";
import VendorPaymentHistory from "./VendorPaymentHistory";
import VendorDetailsOverview from "./VendorDetailsOverview";

function VendorOverView({
  show,
  onClose,
  handleShowSettlement,
  selectedVendorId,
}) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("overview");
  const [selectedMonth, setSelectedMonth] = useState("overview");

  const VendorOverView = state.ComplianceList?.vendorOverview;

  const handleSelected = (selectedPeriod) => {
    setSelectedMonth(selectedPeriod?.type);
  };

  useEffect(() => {
    if (selectedVendorId) {
      dispatch({
        type: "PARTICULAR_VENDOR_OVERVIEW_SAGA",
        payload: {
          vendorId: selectedVendorId,
          period: selectedMonth,
        },
      });
    }
  }, [selectedVendorId, selectedMonth]);

  // useEffect(()=>{
  // dispatch({ type :'VENDOR_OVERVIEW_EXPENSE_SAGA'})
  // dispatch({ type :'VENDOR_OVERVIEW_EXPENSE_PAYMENTLIST_SAGA'})
  // },[])

  useEffect(() => {
    if (state.UsersList.settlementPaymentSuccessCode === 200) {
      dispatch({
        type: "VENDORLIST",
        payload: { hostelId: state.login.selectedHostel_Id },
      });
      setTimeout(() => {
        dispatch({ type: "REMOVE_SETTLEMENT_PAYMENT_REDUCER" });
      }, 1000);
    }
  }, [state.UsersList.settlementPaymentSuccessCode]);

  return (
    <div className="font-gilroy">
      <div
        className={`fixed  inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          show ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        // onClick={onClose}
      />

      <div className="fixed top-2 right-2 bottom-2 w-[1100px]   bg-white z-50 rounded-md flex flex-col">
        <div className="px-6 py-1">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mt-2">
                <h2 className="text-[24px] font-semibold text-[#222]">
                  {VendorOverView?.businessName || "-"}
                </h2>

                <span className="px-2 py-1 rounded text-[10px] bg-[#E8F0FF] text-[#338BFF] font-medium">
                  {VendorOverView?.vendorCode}
                </span>

                <span className="px-2 py-1 rounded text-[10px] bg-[#038C3D] text-[#FFFFFF] font-medium">
                  Active
                </span>
              </div>

              <div className="flex items-center gap-6 mt-3 text-[13px]">
                <span className="flex items-center gap-1 text-[#4B4B4B]">
                  <Flash size="16" />{" "}
                  {VendorOverView?.vendorCategoryName || "-"}
                </span>
                <span className="flex items-center gap-1 text-[#222222]">
                  <Call size="16" /> +{VendorOverView?.countryCode}{" "}
                  {VendorOverView?.mobile}
                </span>
                <span className="flex items-center gap-1 text-[#222222]">
                  <Location size="16" />{" "}
                  {[
                    VendorOverView?.houseNo,
                    VendorOverView?.landMark,
                    VendorOverView?.city,
                    VendorOverView?.state,
                    VendorOverView?.pinCode,
                  ]
                    .filter(Boolean)
                    .join(", ") || "-"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <PiDotsThreeOutlineVerticalFill
                size={18}
                className="cursor-pointer"
              />

              <button
                onClick={onClose}
                className="h-8 w-8 rounded bg-[#FFF3F3] flex items-center justify-center"
              >
                <Add
                  size="24"
                  color="#FF0000"
                  className="cursor-pointer rotate-45"
                />{" "}
              </button>
            </div>
          </div>
        </div>

        <div className="px-6 py-2">
          <div className="grid grid-cols-2 gap-4 ">
            <div className="bg-[#F9F9F9] border border-[#F9F9F9] rounded-xl p-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-[12px] text-[#888] mb-1">Total Expenses</p>
                  <p className="mt-1 font-semibold mb-1">
                    ₹ {VendorOverView?.summary?.totalExpense || "0.00"}
                  </p>
                </div>

                <div>
                  <p className="text-[12px] text-[#888] mb-1 ">Total Paid</p>
                  <p className="mt-1 font-semibold mb-1">
                    {" "}
                    ₹ {VendorOverView?.summary?.totalPaid || "0.00"}
                  </p>
                </div>

                <div>
                  <p className="text-[12px] text-[#888] mb-1">Outstanding</p>
                  <p className="mt-1 font-semibold text-[#F97316] mb-1">
                    ₹ {VendorOverView?.summary?.outstanding || "0.00"}
                  </p>
                </div>
              </div>

              <p className="mt-2 text-[12px] text-[#1E45E1] mb-1 flex gap-1 items-center">
                <Warning2 size="12" /> Based upon current month
              </p>
            </div>

            <div className="flex justify-end gap-10 items-center">
              <div>
                <p className="text-[12px] text-[#888]">Credit limit</p>

                <p className="font-semibold mt-1">
                  {" "}
                  ₹{VendorOverView?.creditLimit || "0.00"}
                </p>
              </div>

              <div>
                <p className="text-[12px] text-[#888]">Due date</p>

                <p className="font-semibold mt-1">
                  {VendorOverView?.allowCredit
                    ? `${VendorOverView?.creditPeriod} Days`
                    : "-"}
                </p>
              </div>
            </div>
          </div>
          <div className=" mt-4">
            <div className="flex items-center justify-between border-b    ">
              <div className="flex gap-8 ">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`pb-3  ${
                    activeTab === "overview"
                      ? "border-b-2 border-[#1E45E1] text-[#222] font-semibold"
                      : "text-[#666]  font-medium"
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab("payments")}
                  className={`pb-3  ${
                    activeTab === "payments"
                      ? "border-b-2 border-[#1E45E1] text-[#222] font-semibold"
                      : "text-[#666] font-medium"
                  }`}
                >
                  Payments Made
                </button>

                <button
                  onClick={() => setActiveTab("expenses")}
                  className={`pb-3  ${
                    activeTab === "expenses"
                      ? "border-b-2 border-[#1E45E1] text-[#222] font-semibold"
                      : "text-[#666]  font-medium"
                  }`}
                >
                  Expenses
                </button>

                <button
                  onClick={() => setActiveTab("comments")}
                  className={`pb-3  ${
                    activeTab === "comments"
                      ? "border-b-2 border-[#1E45E1] text-[#222] font-semibold"
                      : "text-[#666]  font-medium"
                  }`}
                >
                  Comments
                </button>
              </div>
              {activeTab === "payments" && (
                <button
                  onClick={() => handleShowSettlement(true)}
                  className="bg-[#1E45E1] text-white px-4 py-2 rounded-lg text-sm"
                >
                  + Settle Payment
                </button>
              )}

              {activeTab === "expenses" && (
                <button
                  onClick={() => {}}
                  className="bg-[#1E45E1] text-white px-4 py-2 rounded-lg text-sm flex items-center gap-1"
                >
                  <AddCircle size="14" /> Add Expense
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {activeTab === "overview" && (
            <VendorDetailsOverview handleSelected={handleSelected} />
          )}

          {activeTab === "payments" && <VendorPaymentHistory />}

          {activeTab === "expenses" && <VendorExpenseHistory />}

          {activeTab === "comments" && <VendorComments />}
        </div>
      </div>
    </div>
  );
}

export default VendorOverView;

import React from "react";
import { Wallet3, Card, More, Add } from "iconsax-react";

const paymentMethods = [
  {
    id: 1,
    name: "Gpay UPI",
    subTitle: "smartstories@oksbi",
    type: "UPI",
    icon: "gpay",
  },
  {
    id: 2,
    name: "Phonepe UPI",
    subTitle: "smartstories@oksbi",
    type: "UPI",
    icon: "phonepe",
  },
  {
    id: 3,
    name: "SBI Debit Card",
    subTitle: "3247 **** **** 9878",
    type: "Debit Card",
    icon: "debit",
  },
  {
    id: 4,
    name: "Heman Credit Card",
    subTitle: "6487 **** **** 5476",
    type: "Credit Card",
    payable: "₹18,160",
    icon: "credit",
  },
];
function BankingLinkMethod() {
  return (
    <div className="px-4 py-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="text-[16px] font-semibold text-[#111827]">
          Linked Payment methods
        </div>

        <button
          className="flex items-center gap-1 bg-[#1E45E1] text-white
                     rounded-md px-3 py-1.5 text-[12px] font-medium"
        >
          <Add size="14" color="#fff" />
          Add Method
        </button>
      </div>

      <div className="space-y-4">
        {paymentMethods.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center
                ${
                  item.type === "UPI"
                    ? "bg-[#F3F4F6]"
                    : item.type === "Debit Card"
                      ? "bg-[#E0F2FE]"
                      : "bg-[#FFF7ED]"
                }`}
              >
                {item.type === "UPI" ? (
                  <Wallet3
                    size="16"
                    color={
                      item.name.includes("Phonepe") ? "#6B21A8" : "#2563EB"
                    }
                    variant="Bold"
                  />
                ) : (
                  <Card
                    size="16"
                    color={item.type === "Debit Card" ? "#0284C7" : "#EA580C"}
                    variant="Bold"
                  />
                )}
              </div>

              <div>
                <div className="text-[16px] font-medium text-[#222222]">
                  {item.name}
                </div>

                <div className="text-[14px] text-[#7B8797]">
                  {item.subTitle}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="text-right">
                <div
                  className={`text-[11px] px-2 py-0.5 rounded
                  ${
                    item.type === "UPI"
                      ? "bg-[#EEF2FF] text-[#6366F1]"
                      : item.type === "Debit Card"
                        ? "bg-[#F3E8FF] text-[#A855F7]"
                        : "bg-[#FFF7ED] text-[#F97316]"
                  }`}
                >
                  {item.type}
                </div>

                {item.payable && (
                  <div className="text-[11px] text-[#6B7280] mt-1">
                    Payable
                    <span className="font-medium text-[#111827] ml-1">
                      {item.payable}
                    </span>
                  </div>
                )}
              </div>

              <button>
                <More
                  size="16"
                  color="#6B7280"
                  variant="Outline"
                  className="rotate-90"
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BankingLinkMethod;

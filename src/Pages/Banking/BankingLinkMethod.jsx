/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Wallet3, Card, More, Add } from "iconsax-react";
import AddMethod from "../Banking/AddMethod/AddMethod";
import NoDataMessage from "../../Utils/NoDataMessage";
import { useHasPermission } from "../../Utils/Permission";

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
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const {
    canWriteModule: canWriteBanking,
    // canReadModule: canReadBanking,
    // canUpdateModule: canUpdateBanking,
    // canDeleteModule: canDeleteBanking,
  } = useHasPermission("Banking");

  const LinkedPaymentMethodsList =
    state?.bankingDetails?.linkedPaymentMethodsList;

  const [showAddMethodForm, setShowAddMethodForm] = useState(false);

  const handleAddMethod = () => {
    setShowAddMethodForm(true);
  };
  const handleCloseAddMethod = () => {
    setShowAddMethodForm(false);
  };

  const cardNetworks = {
    7: "RuPay",
    8: "Visa",
    9: "Mastercard",
  };

  return (
    <div className="px-4 py-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-5 flex-shrink-0">
        <div className="text-[16px] font-semibold text-[#111827]">
          Linked Payment methods
        </div>

        <button
          onClick={handleAddMethod}
          disabled={!canWriteBanking}
          className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-[12px] font-medium transition-colors ${
            canWriteBanking
              ? "bg-[#1E45E1] text-white hover:bg-[#1839BC]"
              : "bg-[#D1D5DB] text-[#9CA3AF] cursor-not-allowed"
          }`}
        >
          <Add size="14" color={canWriteBanking ? "#fff" : "#9CA3AF"} />
          Add Method
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-4 show-scrolls">
        {LinkedPaymentMethodsList?.length > 0 ? (
          LinkedPaymentMethodsList?.map((item) => {
            const isUPI = item.paymentMethod === "UPI";
            const isDebit = item.paymentMethod === "Debit Card";
            const isCredit = item.paymentMethod === "Credit Card";

            return (
              <div
                key={item.paymentMethodId}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center
            ${
              isUPI ? "bg-[#F3F4F6]" : isDebit ? "bg-[#E0F2FE]" : "bg-[#FFF7ED]"
            }`}
                  >
                    {isUPI ? (
                      <Wallet3 size="16" color="#2563EB" variant="Bold" />
                    ) : (
                      <Card
                        size="16"
                        color={isDebit ? "#0284C7" : "#EA580C"}
                        variant="Bold"
                      />
                    )}
                  </div>

                  <div>
                    <div className="text-[16px] font-medium text-[#222222]">
                      {item.displayName}
                    </div>

                    <div className="text-[14px] text-[#7B8797]">
                      {isUPI ? item.upiId : ` •••• ${item.cardNumber}`}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="text-right">
                    <div
                      className={`text-[11px] px-2 py-0.5 rounded
              ${
                isUPI
                  ? "bg-[#EEF2FF] text-[#6366F1]"
                  : isDebit
                    ? "bg-[#F3E8FF] text-[#A855F7]"
                    : "bg-[#FFF7ED] text-[#F97316]"
              }`}
                    >
                      {item.paymentMethod}
                    </div>

                    {isCredit && (
                      <div className="text-[11px] text-[#6B7280] mt-1">
                        Limit
                        <span className="font-medium text-[#111827] ml-1">
                          ₹{Number(item.creditLimit || 0).toLocaleString()}
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
            );
          })
        ) : (
          <NoDataMessage label="Payment Method" isHeightChanged={true} />
        )}
      </div>

      {showAddMethodForm && (
        <AddMethod
          show={showAddMethodForm}
          handleClose={handleCloseAddMethod}
        />
      )}
    </div>
  );
}

export default BankingLinkMethod;

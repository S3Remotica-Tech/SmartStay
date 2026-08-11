import React from "react";
import { MessageQuestion } from "iconsax-react";

function Works({ label }) {
  const paymentInfo = {
    "Credit-Payment": {
      id: "credit-card",
      title: "How Credit Card Payment Works?",
      description:
        "Use this option to record a payment made towards your credit card bill. The amount will be transferred from your selected bank/cash account to settle the credit card balance.",
    },

    "Vendor-Payment": {
      id: "vendor-payment",
      title: "How Vendor Payment Works?",
      description: "",
    },

    "Tenant-Payment": {
      id: "tenant-payment",
      title: "How Tenant Payment Works?",
      description: "",
    },
  };

  const item = paymentInfo[label];

  if (!item) return null;

  return (
    <div className="w-full rounded-lg bg-[#F4F4F4] p-4">
      <div className="flex items-center gap-2">
        <MessageQuestion size={18} color="#6B7280" />
        <h3 className="text-[15px] font-semibold text-[#1F2937] mb-0">
          {item.title}
        </h3>
      </div>

      <p className="mt-2 pl-7 text-[14px] leading-6 text-[#6B7280] mb-0">
        {item.description}
      </p>
    </div>
  );
}

export default Works;

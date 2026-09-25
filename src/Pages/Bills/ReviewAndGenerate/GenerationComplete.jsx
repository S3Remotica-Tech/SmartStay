import React from "react";
import { Add, CloseCircle, TickCircle } from "iconsax-react";
import PropTypes from "prop-types";

function GenerationComplete({
  generatedCount,
  totalAmount,
  billingPeriod,
  onReviewRemaining,
  onDone,
}) {
  const formatBillingMonth = (date) => {
    if (!date) return "";

    const [day, month, year] = date.split("/");

    if (!day || !month || !year) return date;

    const parsedDate = new Date(Number(year), Number(month) - 1, Number(day));

    return parsedDate.toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    });
  };
  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-[1100]" />

      <div className="fixed font-gilroy top-0 right-0 bottom-0 w-full max-w-[700px] bg-white z-[1200] shadow-2xl flex flex-col">
        <div className="h-[58px] px-6 border-b border-[#EAECF0] flex items-center justify-between">
          <span className="text-[16px] font-semibold text-[#081021]">
            Generation Complete
          </span>

          <button
            type="button"
            onClick={onDone}
            className="text-[#667085] hover:text-[#344054]"
          >
            <Add size="24" className="rotate-45" />
          </button>
        </div>

        <div className="px-6 py-4 flex-1">
          <div className="flex flex-col items-center mb-5">
            <div className="w-12 h-12 rounded-full bg-[#ECFDF3] flex items-center justify-center mb-4">
              <TickCircle size="26" color="#12B76A" variant="Bold" />
            </div>

            <h3 className="text-[20px] font-semibold text-[#081021]">
              Invoices Generated Successfully
            </h3>

            <p className="text-[14px] text-[#6B7280] mt-1">
              Billing cycle for {formatBillingMonth(billingPeriod)} has been
              processed.
            </p>
          </div>

          <div className="bg-[#F7F8FC] rounded-xl px-4 py-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[14px] text-[#667085]">
                Invoices generated
              </span>

              <span className="text-[14px] font-medium text-[#222222]">
                {generatedCount}
              </span>
            </div>

            <div className="border-t border-[#E4E7EC] my-3" />

            <div className="flex items-center justify-between">
              <span className="text-[16px] font-semibold text-[#222222]">
                Total Amount Generated
              </span>

              <span className="text-[16px] font-bold text-[#222222]">
                ₹{Number(totalAmount || 0).toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-[#EAECF0] px-6 py-4 flex items-center justify-end  gap-3">
          <button
            type="button"
            onClick={onDone}
            className="px-12 py-2 rounded-lg bg-[#1E45E1] text-white text-[12px] font-semibold"
          >
            Done
          </button>
        </div>
      </div>
    </>
  );
}

GenerationComplete.propTypes = {
  generatedCount: PropTypes.number.isRequired,
  totalAmount: PropTypes.number.isRequired,
  billingPeriod: PropTypes.string.isRequired,
  onReviewRemaining: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired,
};

export default GenerationComplete;

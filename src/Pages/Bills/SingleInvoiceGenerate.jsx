import React, { useState } from "react";
import { ArrowLeft, CloseCircle } from "iconsax-react";

function SingleInvoiceGenerate({
  selectedIds,

  onClose,
}) {
  const [reviewedInvoice, setReviewedInvoice] = useState(false);

  const formatAmount = (amount) => {
    return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
  };
  const handleConfirmGenerate = () => {
    if (!reviewedInvoice || selectedIds.length === 0) {
      return;
    }

    const payload = selectedInvoices.map((invoice) => ({
      invoiceId: invoice.id,
    }));

    console.log("Payload:", payload);

    // dispatch your generate invoice API here

    setShowGenerateModal(false);
    setReviewedInvoice(false);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-50" />

      <div className="fixed  font-gilroy top-0 right-0 bottom-0 w-full max-w-[700px] bg-white z-[1000] shadow-2xl flex flex-col font-gilroy">
        <div className="h-[58px] px-6 border-b border-[#EAECF0] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="text-[#667085] hover:text-[#344054]"
            >
              <ArrowLeft size="16" />
            </button>

            <span className="text-[14px] font-semibold text-[#081021]">
              Generate {selectedIds.length} Invoice
              {selectedIds.length > 1 ? "s" : ""}?
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-[#667085] hover:text-[#344054]"
          >
            <CloseCircle size="16" />
          </button>
        </div>

        <div className="px-6 py-6 min-h-[390px]">
          <p className="text-[12px] text-[#667085] mb-5">
            These invoices will be generated and become available to the
            respective tenants.
          </p>

          <div className="bg-[#F7F8FC] rounded-xl px-4 py-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[12px] text-[#667085]">
                Selected invoices
              </span>

              <span className="text-[12px] font-medium text-[#344054]">
                {selectedIds.length}
              </span>
            </div>

            <div className="flex items-center justify-between mb-3">
              <span className="text-[12px] text-[#667085]">
                Ready to generate
              </span>

              <span className="text-[12px] font-medium text-[#12B76A]">
                {selectedIds.length}
              </span>
            </div>

            <div className="border-t border-[#E4E7EC] my-3" />

            <div className="flex items-center justify-between mb-3">
              <span className="text-[12px] font-semibold text-[#081021]">
                Total Amount
              </span>

              <span className="text-[12px] font-bold text-[#1E45E1]">
                {/* {formatAmount(selectedTotalAmount)} */} 5000
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[12px] text-[#667085]">Billing Period</span>

              <span className="text-[12px] font-semibold text-[#344054]">
                {"01 Sep – 30 Sep 2026"}
              </span>
            </div>
          </div>

          <label className="flex items-center gap-2.5 mt-5 cursor-pointer">
            <input
              type="checkbox"
              checked={reviewedInvoice}
              onChange={(e) => setReviewedInvoice(e.target.checked)}
              className="w-4 h-4 accent-[#1E45E1] cursor-pointer"
            />

            <span className="text-[12px] text-[#667085]">
              I have reviewed the selected invoice calculations.
            </span>
          </label>
        </div>

        <div className="border-t border-[#EAECF0] px-6 py-4 flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 h-[36px] rounded-lg border border-[#D0D5DD] bg-white text-[12px] font-semibold text-[#344054]"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={!reviewedInvoice}
            onClick={handleConfirmGenerate}
            className="flex-1 h-[36px] rounded-lg bg-[#1E45E1] text-white text-[12px] font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Generate {selectedIds.length} Invoice
            {selectedIds.length > 1 ? "s" : ""}
          </button>
        </div>
      </div>
    </>
  );
}

export default SingleInvoiceGenerate;

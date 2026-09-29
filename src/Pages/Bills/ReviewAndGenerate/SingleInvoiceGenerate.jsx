import React, { useMemo, useState } from "react";
import { ArrowLeft, CloseCircle } from "iconsax-react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

function SingleInvoiceGenerate({
  selectedIds,
  items,
  onClose,
  onConfirmGenerate,
}) {
  const [reviewedInvoice, setReviewedInvoice] = useState(false);
  const state = useSelector((state) => state);
  const selectedInvoices = useMemo(() => {
    return items.filter((item) => selectedIds.includes(item.invoiceId));
  }, [items, selectedIds]);

  const selectedTotalAmount = useMemo(() => {
    return selectedInvoices.reduce(
      (total, invoice) =>
        total + Number(invoice?.invoiceAmount || invoice?.amount || 0),
      0,
    );
  }, [selectedInvoices]);

  const formatAmount = (amount) => {
    return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
  };

  const handleConfirmGenerate = () => {
    if (!reviewedInvoice || selectedIds.length === 0) {
      return;
    }

    onConfirmGenerate(selectedIds);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-50" />

      <div className="fixed font-gilroy top-0 right-0 bottom-0 w-full max-w-[700px] bg-white z-[1000] shadow-2xl flex flex-col">
        <div className="h-[58px] px-6 border-b border-[#EAECF0] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="text-[#667085] hover:text-[#344054]"
            >
              <ArrowLeft size="16" />
            </button>

            <span className="text-[16px] font-semibold text-[#081021]">
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

        <div className="flex-1 min-h-0 overflow-y-auto show-scrolls px-6 py-6">
          <p className="text-[12px] text-[#667085] mb-4">
            These invoices will be generated and become available to the
            respective tenants.
          </p>

          <div className="bg-[#F7F8FC] rounded-xl px-4 py-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[14px] text-[#667085]">
                Selected invoices
              </span>

              <span className="text-[14px] font-medium text-[#344054]">
                {selectedInvoices.length}
              </span>
            </div>

            <div className="flex items-center justify-between mb-3">
              <span className="text-[14px] text-[#667085]">
                Ready to generate
              </span>

              <span className="text-[14px] font-medium text-[#12B76A]">
                {selectedInvoices.length}
              </span>
            </div>

            <div className="border-t border-[#E4E7EC] my-3" />

            <div className="flex items-center justify-between mb-3">
              <span className="text-[14px] font-semibold text-[#081021]">
                Total Amount
              </span>

              <span className="text-[14px] font-bold text-[#1E45E1]">
                {formatAmount(selectedTotalAmount)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[14px] text-[#667085]">Billing Period</span>

              <span className="text-[14px] font-semibold text-[#344054]">
                {
                  state.InvoiceList?.getReviewGenerateRecurringbill
                    ?.billingStartDate
                }{" "}
                –{" "}
                {
                  state.InvoiceList?.getReviewGenerateRecurringbill
                    ?.billingEndDate
                }
              </span>
            </div>
          </div>

          <label className="flex items-center gap-2.5 mt-4 cursor-pointer">
            <input
              type="checkbox"
              checked={reviewedInvoice}
              onChange={(e) => setReviewedInvoice(e.target.checked)}
              className="w-4 h-4 accent-[#1E45E1] cursor-pointer"
            />

            <span className="text-[14px] text-[#667085]">
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

SingleInvoiceGenerate.propTypes = {
  selectedIds: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ).isRequired,
  items: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirmGenerate: PropTypes.func.isRequired,
};

export default SingleInvoiceGenerate;

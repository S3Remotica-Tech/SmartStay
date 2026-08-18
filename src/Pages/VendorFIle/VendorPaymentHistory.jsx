/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NoDataMessage from "../../Utils/NoDataMessage";
import ApiPagination from "../../Components/ApiPagination";
import PropTypes from "prop-types";
function VendorPaymentHistory({ selectedVendorId }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [size, setSize] = useState(window.innerWidth >= 1440 ? 20 : 10);
  const [page, setPage] = useState(1);
  const vendorPaymentMadeHistory =
    state.ComplianceList?.vendorOverviewExpensePaymentList?.payments || [];

  useEffect(() => {
    if (!selectedVendorId) return;

    dispatch({
      type: "VENDOR_OVERVIEW_EXPENSE_PAYMENTLIST_SAGA",
      payload: {
        vendorId: selectedVendorId,
        page: page,
        size: size,
      },
    });
  }, [selectedVendorId, page, size]);

  const currentPage =
    state.ComplianceList?.vendorOverviewExpensePaymentList?.currentPage ?? 1;

  const totalPages =
    state.ComplianceList?.vendorOverviewExpensePaymentList?.totalPages ?? 1;

  const totalRecords =
    state.ComplianceList?.vendorOverviewExpensePaymentList?.totalPayments ?? 0;

  useEffect(() => {
    let timeout;

    const handleResize = () => {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        setSize((prev) => {
          const newSize = window.innerWidth >= 1440 ? 20 : 10;
          return prev !== newSize ? newSize : prev;
        });
      }, 300);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeout);
    };
  }, []);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleSizeChange = (sizeValue) => {
    setSize(sizeValue);
  };

  return (
    <>
      <div className="flex justify-end  me-4 my-2">
        {vendorPaymentMadeHistory?.length > 0 && (
          <ApiPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalRecords={totalRecords}
            onPageChange={handlePageChange}
            onSizeChange={handleSizeChange}
            isTenantPagination={true}
            size={size}
          />
        )}
      </div>


      {vendorPaymentMadeHistory?.length > 0 ? (
        <div className="bg-white    rounded-xl px-4  ">
          <div
            id="tableContainer"
            className="overflow-auto relative h-[300px] show-scrolls"
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
                        {`${payment.paymentMethod}${payment.bankName ? ` - ${payment.bankName}` : ""}`}
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
VendorPaymentHistory.propTypes = {
  selectedVendorId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default VendorPaymentHistory;

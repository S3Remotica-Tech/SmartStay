/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import NoDataMessage from "../../Utils/NoDataMessage";
import ApiPagination from "../../Components/ApiPagination";
import PropTypes from "prop-types";
// Table cells — same look as Reports/InvoiceRegister/ConsolidatedInvoiceTable.
const TABLE_HEADER_CELL =
  "h-[50px] px-[16px] bg-[#F8F9FF] border-b border-[#E5E7EB] font-gilroy font-semibold text-[11px] leading-[16.5px] tracking-[0.33px] uppercase text-[#6B7280] whitespace-nowrap";

const TABLE_BODY_CELL =
  "h-[58px] px-[16px] border-b border-[#E5E7EB] font-gilroy text-[14px] leading-[20px] whitespace-nowrap";

function VendorPaymentHistory({ selectedVendorId }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [size, setSize] = useState(window.innerWidth >= 1440 ? 20 : 10);
  const [page, setPage] = useState(1);
  const vendorPaymentMadeHistory =
    state.ComplianceList?.vendorOverviewExpensePaymentList?.payments || [];

  const previousVendorPaymentRequestRef = useRef(null);

  useEffect(() => {
    if (!selectedVendorId) return;
    const payload = {
      vendorId: selectedVendorId,
      page,
      size,
    };

    const requestKey = JSON.stringify(payload);
    if (previousVendorPaymentRequestRef.current === requestKey) return;
    previousVendorPaymentRequestRef.current = requestKey;
    dispatch({
      type: "VENDOR_OVERVIEW_EXPENSE_PAYMENTLIST_SAGA",
      payload,
    });
  }, [selectedVendorId, page, size, dispatch]);

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
            <table className="w-full min-w-max border-separate border-spacing-0 font-gilroy">
              <thead className="sticky top-0 z-30">
                <tr>
                  <th className={`${TABLE_HEADER_CELL} text-left`}>
                    DATE
                  </th>
                  <th className={`${TABLE_HEADER_CELL} text-left`}>
                    REF NO
                  </th>
                  <th className={`${TABLE_HEADER_CELL} text-left`}>
                    PAYMENT MODE
                  </th>
                  <th className={`${TABLE_HEADER_CELL} text-left`}>
                    STATUS
                  </th>
                  <th className={`${TABLE_HEADER_CELL} text-left`}>
                    AMOUNT
                  </th>
                </tr>
              </thead>

              <tbody>
                {vendorPaymentMadeHistory.length > 0 ? (
                  vendorPaymentMadeHistory.map((payment) => (
                    <tr key={payment.id}>
                      <td className={TABLE_BODY_CELL}>
                        {payment.paymentDate}
                      </td>

                      <td className={`${TABLE_BODY_CELL} text-[#1E45E1]`}>
                        {payment.transactionId || "-"}
                      </td>

                      <td className={TABLE_BODY_CELL}>
                        {payment.bankName || payment.paymentMethod || "-"}
                        {/* {`${payment.paymentMethod}${payment.bankName ? ` - ${payment.bankName}` : ""}`} */}
                      </td>

                      <td className={TABLE_BODY_CELL}>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F8EC] px-2.5 py-1 text-[12px] font-medium text-[#00A32E]">
                          <span className="h-2 w-2 rounded-full bg-[#00A32E]" />
                          Paid
                        </span>
                      </td>

                      <td className={`${TABLE_BODY_CELL} font-medium`}>
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

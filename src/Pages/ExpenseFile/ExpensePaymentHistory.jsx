/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useSelector } from "react-redux";
import NoDataMessage from "../../Utils/NoDataMessage";
// Table cells — same look as Reports/InvoiceRegister/ConsolidatedInvoiceTable.
const TABLE_HEADER_CELL =
  "h-[50px] px-[16px] bg-[#F8F9FF] border-b border-[#E5E7EB] font-gilroy font-semibold text-[11px] leading-[16.5px] tracking-[0.33px] uppercase text-[#6B7280] whitespace-nowrap";

const TABLE_BODY_CELL =
  "h-[58px] px-[16px] border-b border-[#E5E7EB] font-gilroy text-[14px] leading-[20px] whitespace-nowrap";

function ExpensePaymentHistory() {
  const state = useSelector((state) => state);
  // const dispatch = useDispatch();

  const expenseOverView = state.ExpenseList?.expenseOverview;
  const expensePayments = expenseOverView?.expensePayments || [];

  return (
    <div>
      {expensePayments?.length > 0 ? (
        <div>
          <div className="font-gilroy bg-white border-[1px] border-[#E2E8F0] rounded-[12px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.06)] overflow-hidden mx-1 my-[12px]">
            <div
              id="tableContainer"
              className="overflow-auto relative h-[250px]  show-scrolls"
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
                  {expensePayments.length > 0 ? (
                    expensePayments.map((payment) => (
                      <tr key={payment.id} className="last:border-b-0">
                        <td className={TABLE_BODY_CELL}>
                          {payment.paymentDate}
                        </td>

                        <td className={`${TABLE_BODY_CELL} text-[#1E45E1]`}>
                          {payment.transactionId || "-"}
                        </td>

                        <td className={TABLE_BODY_CELL}>
                          {payment.bankName || payment.paymentMethod || "-"}
                        </td>

                        <td className={TABLE_BODY_CELL}>
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F8EC] px-2.5 py-1 text-[12px] font-medium text-[#00A32E]">
                            <span className="h-2 w-2 rounded-full bg-[#00A32E]" />
                            Paid
                          </span>
                        </td>

                        <td className={`${TABLE_BODY_CELL} font-medium`}>
                          ₹ {payment.paidAmount?.toLocaleString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="py-6 text-center text-gray-500"
                      >
                        No payment history found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="bg-[#F9F9F9] border-1 border-[#F8F8F8] rounded-md py-4 px-4 ">
              <div className=" flex items-center justify-between w-[300px]">
                <p className="text-[12px] text-[#4B4B4B] mb-2">Amount Paid</p>
                <p className="mt-1 font-semibold text-[#222222] text-[14px] mb-2">
                  ₹{expenseOverView?.totalExpensePaidAmount}
                </p>
              </div>

              <div className=" flex items-center justify-between w-[300px]">
                <p className="text-[12px] text-[#4B4B4B] mb-1">Balance due</p>
                <p className="mt-1 font-semibold text-[#FF0000] text-[14px] mb-1">
                  - ₹{expenseOverView?.balanceAmount}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="m-4">
          <NoDataMessage label=" Payment History" isHeightChanged={true} />
        </div>
      )}
    </div>
  );
}

export default ExpensePaymentHistory;

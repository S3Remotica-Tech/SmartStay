/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useSelector } from "react-redux";
import NoDataMessage from "../../Utils/NoDataMessage";

// Table cells — same look as Reports/InvoiceRegister/ConsolidatedInvoiceTable.
const TABLE_HEADER_CELL =
  "h-[50px] px-[16px] bg-[#F8F9FF] border-b border-[#E5E7EB] font-gilroy font-semibold text-[11px] leading-[16.5px] tracking-[0.33px] uppercase text-[#6B7280] whitespace-nowrap";

const TABLE_BODY_CELL =
  "h-[58px] px-[16px] border-b border-[#E5E7EB] font-gilroy text-[14px] leading-[20px] whitespace-nowrap";

function ExpenseItems() {
  const state = useSelector((state) => state);
  // const dispatch = useDispatch();

  const expenseOverView = state.ExpenseList?.expenseOverview;

  const expenseItems = expenseOverView?.expenseItems || [];

  return (
    <div>
      {expenseItems.length > 0 ? (
        <div>
          <div className="bg-white    rounded-xl   mx-1 my-3 ">
            <div
              id="tableContainer"
              //   ref={tableContainerRef}
              className="overflow-auto relative h-[250px]  show-scrolls"
            >
              <table className="w-full min-w-max border-separate border-spacing-0 font-gilroy">
                <thead className="sticky top-0 z-30">
                  <tr>
                    <th className={`${TABLE_HEADER_CELL} text-left`}>
                      Item details
                    </th>
                    <th className={`${TABLE_HEADER_CELL} text-left`}>
                      Quantity
                    </th>
                    <th className={`${TABLE_HEADER_CELL} text-left`}>
                      Unit
                    </th>
                    <th className={`${TABLE_HEADER_CELL} text-left`}>
                      Per Unit price
                    </th>

                    <th className={`${TABLE_HEADER_CELL} text-left`}>
                      AMOUNT
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {expenseItems.length > 0 ? (
                    expenseItems.map((item, index) => (
                      <tr key={index} className="last:border-b-0">
                        <td className={`${TABLE_BODY_CELL} text-[#111928]`}>
                          {item.item || "-"}
                        </td>

                        <td className={`${TABLE_BODY_CELL} text-[#1E45E1]`}>
                          {item.quantity}
                        </td>

                        <td className={`${TABLE_BODY_CELL} text-[#111928]`}>
                          {item.unit || "-"}
                        </td>

                        <td className={`${TABLE_BODY_CELL} text-[#1E45E1]`}>
                          ₹ {item.unitPrice || 0}
                        </td>

                        <td className={`${TABLE_BODY_CELL} font-medium text-[#111928]`}>
                          ₹ {item.totalAmount}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="py-6 text-center text-gray-500"
                      >
                        No expense items found
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
                <p className="text-[12px] text-[#4B4B4B] mb-2">Subtotal</p>
                <p className="mt-1 font-semibold text-[#222222] text-[14px] mb-2">
                  ₹ {expenseOverView?.totalExpenseAmount || "0.00"}
                </p>
              </div>
              <div className=" flex items-center justify-between w-[300px]">
                <p className="text-[12px] text-[#4B4B4B] mb-2">Tax</p>
                <p className="mt-1 font-semibold text-[#222222] text-[14px] mb-2">
                  {expenseOverView?.tax || "0.00"} %
                </p>
              </div>
              <div className=" flex items-center justify-between w-[300px]">
                <p className="text-[12px] text-[#4B4B4B] mb-1">Discount</p>
                <p className="mt-1 font-semibold text-[#FF0000] text-[14px] mb-1">
                  - ₹ {expenseOverView?.discount || "0.00"}
                </p>
              </div>
              <div className=" flex items-center justify-between w-[300px]">
                <p className="text-[12px] text-[#4B4B4B] mb-2">Total Amount</p>
                <p className="mt-1 font-semibold text-[#222222] text-[14px] mb-2">
                  ₹ {expenseOverView?.actualTotalPrice || "0.00"}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="m-4">
          <NoDataMessage label="Expense History" isHeightChanged={true} />
        </div>
      )}
    </div>
  );
}

export default ExpenseItems;

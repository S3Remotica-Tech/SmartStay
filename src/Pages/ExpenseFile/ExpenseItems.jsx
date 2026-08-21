/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useSelector } from "react-redux";
import NoDataMessage from "../../Utils/NoDataMessage";

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
              <table className=" w-full font-gilroy ">
                <thead className="bg-[#F9FAFB] sticky top-0 z-30 text-[#6B7280] text-xs uppercase">
                  <tr>
                    <th className="px-4 py-2.5 text-left text-xs text-[#666]">
                      Item details
                    </th>
                    <th className="px-4 py-2.5 text-left text-xs text-[#666]">
                      Quantity
                    </th>
                    <th className="px-4 py-2.5 text-left text-xs text-[#666]">
                      Unit
                    </th>
                    <th className="px-4 py-2.5 text-left text-xs text-[#666]">
                      Per Unit price
                    </th>

                    <th className="px-4 py-2.5 text-left text-xs text-[#666]">
                      AMOUNT
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {expenseItems.length > 0 ? (
                    expenseItems.map((item, index) => (
                      <tr key={index} className="border-b last:border-b-0">
                        <td className="px-4 py-2 text-sm">
                          {item.item || "-"}
                        </td>

                        <td className="px-4 py-2 text-[#1E45E1] text-sm">
                          {item.quantity}
                        </td>

                        <td className="px-4 py-2 text-sm">
                          {item.unit || "-"}
                        </td>

                        <td className="px-4 py-2 text-[#1E45E1] text-sm">
                          ₹ {item.unitPrice || 0}
                        </td>

                        <td className="px-4 py-2 font-medium">
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

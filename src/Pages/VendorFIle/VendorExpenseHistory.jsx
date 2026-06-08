/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { ArrowDown2, ArrowUp2 } from "iconsax-react";

function VendorExpenseHistory() {
  const [openExpense, setOpenExpense] = useState(null);

  const handleToggleExpense = (id) => {
    setOpenExpense((prev) => (prev === id ? null : id));
  };

  const expenses = [
    {
      expenseId: "EXP-1045",
      date: "03 June 2026",
      title: "Electrical Repair",
      amount: "₹ 5,000.00",
      balance: "₹ 0.00",
      status: "Paid",
      items: [
        {
          itemName: "Tubelight (LED)",
          quantity: 20,
          unit: "Nos",
          unitPrice: "₹150.00",
          amount: "₹3,000",
        },
        {
          itemName: "Electrical Wire Roll (90m)",
          quantity: 2,
          unit: "Nos",
          unitPrice: "₹1,750",
          amount: "₹3,500",
        },
        {
          itemName: "Modular Switches",
          quantity: 20,
          unit: "Nos",
          unitPrice: "₹80.00",
          amount: "₹1,600",
        },
      ],
    },
    {
      expenseId: "EXP-1047",
      date: "31 May 2026",
      title: "Wiring Replacement",
      amount: "₹ 50,000.00",
      balance: "₹ 0.00",
      status: "Paid",
      items: [],
    },
  ];
  return (
    <div>
      <div className="bg-white    rounded-xl shadow-sm border border-[#E8E8E8] mx-1 my-3 ">
        <div
          id="tableContainer"
          //   ref={tableContainerRef}
          className="overflow-auto relative h-[calc(100vh-250px)] rounded-xl show-scrolls"
        >
          <table className=" w-full font-gilroy ">
            <thead className="bg-[#F9FAFB] sticky top-0 z-30 text-[#6B7280] text-xs uppercase">
              <tr>
                <th className="px-4 py-3 text-left text-xs text-[#666]">
                  DATE
                </th>
                <th className="px-4 py-3 text-left text-xs text-[#666]">
                  EXpense ID
                </th>

                <th className="px-4 py-3 text-left text-xs text-[#666] whitespace-nowrap">
                  Expense Title
                </th>
                <th className="px-4 py-3 text-left text-xs text-[#666]">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-xs text-[#666]  whitespace-nowrap">
                  Balance (if)
                </th>
                <th className="px-4 py-3 text-left text-xs text-[#666]">
                  STATUS
                </th>
                <th className="px-4 py-3 text-left text-xs text-[#666]">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {expenses.map((expense) => (
                <React.Fragment key={expense.expenseId}>
                  <tr className="border-t">
                    <td className="px-4 py-3 text-sm">{expense.date}</td>

                    <td className="px-4 py-3 text-sm text-[#1E45E1]">
                      {expense.expenseId}
                    </td>

                    <td className="px-4 py-3 text-sm">{expense.title}</td>

                    <td className="px-4 py-3 text-sm">{expense.amount}</td>

                    <td className="px-4 py-3 text-sm">{expense.balance}</td>

                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#E8F8EC] px-2 py-1 text-[11px] text-[#00A32E]">
                        <span className="h-2 w-2 rounded-full bg-[#00A32E]" />
                        {expense.status}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleToggleExpense(expense.expenseId)}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F3F4F6]"
                      >
                        {openExpense === expense.expenseId ? (
                          <ArrowUp2 size={14} color="#1E45E1" />
                        ) : (
                          <ArrowDown2 size={14} color="#6B7280" />
                        )}
                      </button>
                    </td>
                  </tr>

                  {openExpense === expense.expenseId && (
                    <tr>
                      <td colSpan={7} className="p-0 bg-[#FAFAFA]">
                        <table className="w-full">
                          <thead className="bg-[#F5F5F5]">
                            <tr>
                              <th className="px-4 py-3 text-left text-[11px] text-[#6B7280]">
                                ITEM DETAILS
                              </th>
                              <th className="px-4 py-3 text-left text-[11px] text-[#6B7280]">
                                QUANTITY
                              </th>
                              <th className="px-4 py-3 text-left text-[11px] text-[#6B7280]">
                                UNIT
                              </th>
                              <th className="px-4 py-3 text-left text-[11px] text-[#6B7280]">
                                PER UNIT PRICE
                              </th>
                              <th className="px-4 py-3 text-right text-[11px] text-[#6B7280]">
                                AMOUNT
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            {expense.items.map((item, index) => (
                              <tr key={index} className="border-t">
                                <td className="px-4 py-3">{item.itemName}</td>

                                <td className="px-4 py-3">{item.quantity}</td>

                                <td className="px-4 py-3">{item.unit}</td>

                                <td className="px-4 py-3">{item.unitPrice}</td>

                                <td className="px-4 py-3 text-right">
                                  {item.amount}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default VendorExpenseHistory;

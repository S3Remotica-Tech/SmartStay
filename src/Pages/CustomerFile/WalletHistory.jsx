/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useSelector } from "react-redux";
import { CloseCircle } from "iconsax-react";
import PropTypes from "prop-types";

// Table cells — same look as Reports/InvoiceRegister/ConsolidatedInvoiceTable.
const TABLE_HEADER_CELL =
  "h-[50px] px-[16px] bg-[#F8F9FF] border-b border-[#E5E7EB] font-gilroy font-semibold text-[11px] leading-[16.5px] tracking-[0.33px] uppercase text-[#6B7280] whitespace-nowrap";

const TABLE_BODY_CELL =
  "h-[58px] px-[16px] border-b border-[#E5E7EB] font-gilroy text-[14px] leading-[20px] whitespace-nowrap";

function WalletHistory({ show, handleClose }) {
  const state = useSelector((state) => state);
  const CustomerOverView = state.UsersList.customerdetails;

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center  p-0">
      <div className="w-full max-w-3xl bg-white rounded-xl ">
        <div className="flex items-center justify-between px-6 border-b">
          <div className="flex gap-5  w-full items-center">
            <h2 className="text-[18px] font-semibold font-[Gilroy] text-[#222222] my-0">
              Wallet Balance -{" "}
              <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
                <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl">
                  <div className="flex items-center justify-between px-6 py-3 border-b">
                    <div className="flex justify-between w-full items-center">
                      <h2 className="text-[18px] font-semibold font-[Gilroy] text-[#222222]">
                        Wallet Balance{" "}
                        <span
                          className={`text-[18px] font-semibold font-[Gilroy] ${
                            CustomerOverView?.walletInfo?.walletAmount < 0
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          ₹ {CustomerOverView?.walletInfo?.walletAmount || 0}
                        </span>
                      </h2>
                    </div>

                    <CloseCircle data-testid="wallet-history-close-icon"
                      size="24"
                      color="#000"
                      onClick={handleClose}
                      className="cursor-pointer ml-4"
                    />
                  </div>

                  {/* Body */}
                  <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
                    <div className="font-gilroy bg-white border-[1px] border-[#E2E8F0] rounded-[12px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.06)] overflow-x-auto">
                      <table className="w-full min-w-max border-separate border-spacing-0 font-gilroy">
                        <thead className="bg-[#EEF6FF] text-gray-700">
                          <tr>
                            <th className={`${TABLE_HEADER_CELL} text-left`}>
                              Date
                            </th>
                            <th className={`${TABLE_HEADER_CELL} text-left`}>
                              Source
                            </th>
                            <th className={`${TABLE_HEADER_CELL} text-left`}>
                              Invoice Status
                            </th>
                            <th className={`${TABLE_HEADER_CELL} text-right`}>
                              Amount
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {CustomerOverView?.walletInfo?.transactions
                            ?.length ? (
                            CustomerOverView.walletInfo.transactions.map(
                              (txn, index) => (
                                <tr key={index}>
                                  <td className={`${TABLE_BODY_CELL} text-[#111928]`}>
                                    {txn.transactionDate}
                                  </td>

                                  <td className={`${TABLE_BODY_CELL} text-[#314158]`}>
                                    {txn.source.replaceAll("_", " ")}
                                  </td>

                                  <td className={`${TABLE_BODY_CELL} text-[#111928]`}>
                                    <span
                                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        txn.isInvoiced
                                          ? "bg-green-100 text-green-700"
                                          : "bg-orange-100 text-orange-700"
                                      }`}
                                    >
                                      {txn.invoiceStatus.replaceAll("_", " ")}
                                    </span>
                                  </td>

                                  <td
                                    className={`${TABLE_BODY_CELL} text-right font-semibold ${
                                      txn.amount < 0
                                        ? "text-red-600"
                                        : "text-green-600"
                                    } text-[#111928]`}
                                  >
                                    ₹ {txn.amount}
                                  </td>
                                </tr>
                              ),
                            )
                          ) : (
                            <tr>
                              <td
                                colSpan="4"
                                className="px-4 py-6 text-center text-gray-500"
                              >
                                No wallet transactions found
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </h2>

            <span
              className={`text-[18px] font-semibold font-[Gilroy] ${
                CustomerOverView?.walletInfo?.walletAmount < 0
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              ₹ {Math.abs(CustomerOverView?.walletInfo?.walletAmount || 0)}
            </span>
          </div>

          <CloseCircle data-testid="wallet-history-close-icon-2"
            size="24"
            color="#000"
            onClick={handleClose}
            className="cursor-pointer ml-4"
          />
        </div>

        {/* Body */}
        <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
          <div className="font-gilroy bg-white border-[1px] border-[#E2E8F0] rounded-[12px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.06)] overflow-x-auto">
            <table className="w-full min-w-max border-separate border-spacing-0 font-gilroy">
              <thead className="bg-[#EEF6FF] text-gray-700">
                <tr>
                  <th className={`${TABLE_HEADER_CELL} text-left`}>Date</th>
                  <th className={`${TABLE_HEADER_CELL} text-left`}>Source</th>
                  <th className={`${TABLE_HEADER_CELL} text-left`}>
                    Invoice Status
                  </th>
                  <th className={`${TABLE_HEADER_CELL} text-right`}>Amount</th>
                </tr>
              </thead>

              <tbody>
                {CustomerOverView?.walletInfo?.transactions?.length ? (
                  CustomerOverView.walletInfo.transactions.map((txn, index) => (
                    <tr key={index}>
                      <td className={`${TABLE_BODY_CELL} text-[#111928]`}>
                        {txn.transactionDate}
                      </td>

                      <td className={`${TABLE_BODY_CELL} text-[#314158]`}>
                        {txn.source.replaceAll("_", " ")}
                      </td>

                      <td className={`${TABLE_BODY_CELL} text-[#111928]`}>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            txn.isInvoiced
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {txn.invoiceStatus.replaceAll("_", " ")}
                        </span>
                      </td>

                      <td
                        className={`${TABLE_BODY_CELL} text-right font-semibold ${
                          txn.amount < 0 ? "text-red-600" : "text-green-600"
                        } text-[#111928]`}
                      >
                        ₹ {Math.abs(txn.amount)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-4 py-6 text-center text-gray-500"
                    >
                      No wallet transactions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

WalletHistory.propTypes = {
  show: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};
export default WalletHistory;

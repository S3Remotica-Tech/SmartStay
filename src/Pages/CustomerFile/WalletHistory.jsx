/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useSelector } from "react-redux";
import { CloseCircle } from "iconsax-react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import {
  Modal,
} from "react-bootstrap";

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
              Wallet Balance -  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">

      <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl">
        

        <div className="flex items-center justify-between px-6 py-3 border-b">
          <div className="flex justify-between w-full items-center">
            <h2 className="text-[18px] font-semibold font-[Gilroy] text-[#222222]">
              Wallet Balance        <span
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

          <CloseCircle
            size="24"
            color="#000"
            onClick={handleClose}
            className="cursor-pointer ml-4"
          />
        </div>

        {/* Body */}
        <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
          <div className="overflow-hidden border rounded-lg">
            <table className="w-full text-sm font-[Gilroy]">
              <thead className="bg-[#EEF6FF] text-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left font-medium">Date</th>
                  <th className="px-4 py-2 text-left font-medium">Source</th>
                  <th className="px-4 py-2 text-left font-medium">
                    Invoice Status
                  </th>
                  <th className="px-4 py-2 text-right font-medium">Amount</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {CustomerOverView?.walletInfo?.transactions?.length ? (
                  CustomerOverView.walletInfo.transactions.map((txn, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 text-gray-800">
                        {txn.transactionDate}
                      </td>

                      <td className="px-4 py-2 text-gray-600">
                        {txn.source.replaceAll("_", " ")}
                      </td>

                      <td className="px-4 py-2">
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
                        className={`px-4 py-2 text-right font-semibold ${
                          txn.amount < 0
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        ₹ {txn.amount}
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

          <CloseCircle
            size="24"
            color="#000"
            onClick={handleClose}
            className="cursor-pointer ml-4"
          />
        </div>

        {/* Body */}  
        <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
          <div className="overflow-hidden border rounded-lg">
            <table className="w-full text-sm font-[Gilroy]">
              <thead className="bg-[#EEF6FF] text-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Date</th>
                  <th className="px-4 py-3 text-left font-medium">Source</th>
                  <th className="px-4 py-3 text-left font-medium">
                    Invoice Status
                  </th>
                  <th className="px-4 py-3 text-right font-medium">Amount</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {CustomerOverView?.walletInfo?.transactions?.length ? (
                  CustomerOverView.walletInfo.transactions.map((txn, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-gray-800">
                        {txn.transactionDate}
                      </td>

                      <td className="px-4 py-3 text-gray-600">
                        {txn.source.replaceAll("_", " ")}
                      </td>

                      <td className="px-4 py-3">
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
                        className={`px-4 py-3 text-right font-semibold ${
                          txn.amount < 0
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
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

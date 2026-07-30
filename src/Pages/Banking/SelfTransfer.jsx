/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bank, CloseCircle } from "iconsax-react";
import ErrorMessage from "../../Components/ErrorMessage";

function SelfTransfer({ show, handleClose, selfDetails }) {
  // console.log("selfDetailsselfDetails", selfDetails);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedBank, setSelectedBank] = useState("");

  const handleChange = (e) => {
    dispatch({ type: "REMOVE_SELF_TRANSFER_ERROR" });
    setError("");
    const value = e.target.value;

    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleTransfer = () => {
    dispatch({ type: "REMOVE_SELF_TRANSFER_ERROR" });
    if (!selectedBank) {
      setError("Please select a destination account");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    if (Number(amount) > availableBalance) {
      setError("Transfer amount cannot exceed available balance");
      return;
    }

    setError("");

    dispatch({
      type: "SELF_TRANSER_SAGA",
      payload: {
        hostelId: state.login?.selectedHostel_Id,
        fromBankId: bankDetails?.fromBank?.bankingId,
        toBankId: selectedBank,
        balance: Number(amount),
      },
    });

    setLoading(true);
  };

  if (!show) return null;

  useEffect(() => {
    return () => {
      setError("");
      dispatch({ type: "REMOVE_SELF_TRANSFER_ERROR" });
    };
  }, []);

  useEffect(() => {
    if (selfDetails?.bankingId) {
      dispatch({
        type: "SELF_TRANSER_INITIALIZE_SAGA",
        payload: {
          hostelId: state.login?.selectedHostel_Id,
          bankId: selfDetails?.bankingId,
        },
      });
    }
  }, [selfDetails]);

  useEffect(() => {
    if (state.bankingDetails?.statusSuccessSelfTransfer) {
      setLoading(false);
    }
  }, [state.bankingDetails?.statusSuccessSelfTransfer]);

  useEffect(() => {
    if (state.createAccount?.networkError || state?.bankingDetails?.selfError) {
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 3000);
    }
  }, [state.createAccount?.networkError, state?.bankingDetails?.selfError]);

  console.log("state", state.bankingDetails?.selfTransferInitialize);

  const bankDetails = state.bankingDetails?.selfTransferInitialize;

  const availableBalance = Number(bankDetails?.fromBank?.accountBalance || 0);

  const isTransferDisabled =
    loading || !selectedBank || Number(amount) > availableBalance;

  const handleSelect = (item) => {
    setSelectedBank(item);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-[600px] rounded-2xl bg-white shadow-xl overflow-hidden">
        <div className="relative flex items-center justify-between border-b border-[#E5E7EB] px-4 py-3">
          <div className="text-[1.25rem] font-semibold font-gilroy text-[#1E45E1]">
            Self Transfer
          </div>

          <CloseCircle
            size="24"
            color="#000"
            className="cursor-pointer"
            onClick={handleClose}
          />
        </div>

        <div className="px-4 py-4">
          <div>
            <h6 className="text-[#4B4B4B] text-[16px] font-medium font-gilroy mb-2">
              From
            </h6>

            <div className="flex items-center gap-2 p-3 border-b border-[#ccc]">
              <div>
                <Bank color="#1E45E1" size="20" />
              </div>

              <div className="w-full flex justify-between items-center">
                <div className="h-fit">
                  {bankDetails?.fromBank?.bankName && (
                    <div className="font-semibold text-[#1A1A1A] font-gilroy text-sm mt-1.5">
                      {bankDetails?.fromBank?.bankName}
                    </div>
                  )}

                  <div className="text-xs text-gray-500 font-gilroy">
                    {bankDetails?.fromBank?.accountType || ""}
                  </div>
                </div>

                <div className="text-right font-gilroy">
                  <div className="font-medium text-[#1A1A1A] text-sm mb-0.5">
                    {bankDetails?.fromBank?.accountHolderName}
                  </div>

                  <div className="text-xs font-normal font-gilroy mb-0.5">
                    {bankDetails?.fromBank?.accountNumber || "-"}
                  </div>

                  <div className="text-xs font-semibold text-[#1E45E1]">
                    Avl Bal : ₹ {bankDetails?.fromBank?.accountBalance || 0}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-3 mt-3  pe-2 overflow-y-auto h-[250px] show-scrolls">
            <h6 className="text-[#4B4B4B] text-base font-medium font-gilroy mb-2">
              To
            </h6>

            {bankDetails?.toBanks?.map((bank) => (
              <div
                key={bank.bankingId}
                onClick={() => handleSelect(bank.bankingId)}
                className={`flex items-center gap-2 mb-3 p-3 rounded-lg transition-all duration-200 cursor-pointer
      ${
        selectedBank === bank.bankingId
          ? "bg-[#F7FAFF] border-1 border-[#1E45E1]"
          : "bg-[#F7FAFF] border-1  border-transparent"
      }`}
              >
                <div>
                  <Bank color="#1E45E1" size="20" />
                </div>

                <div className="w-full flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-[#1A1A1A] font-gilroy text-sm mt-1.5">
                      {bank.bankName}
                    </div>

                    <div className="text-xs text-gray-500 font-gilroy">
                      {bank.accountType}
                    </div>
                  </div>

                  <div className="text-right font-gilroy">
                    <div className="font-medium text-[#1A1A1A] text-sm mb-0.5">
                      {bank.accountHolderName}
                    </div>

                    <div className="text-xs font-normal font-gilroy mb-0.5">
                      {bank.accountNumber}
                    </div>

                    {bank.accountBalance && (
                      <div className="text-xs font-semibold text-[#1E45E1]">
                        Avl Bal : ₹ {bank.accountBalance || 0}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center border border-[#D1D5DB] rounded-md overflow-hidden h-11">
            <span className="px-4 bg-white text-[#4B4B4B] font-medium border-r border-[#D1D5DB]">
              ₹
            </span>

            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={handleChange}
              className="w-full h-full px-3 outline-none shadow-none font-gilroy text-sm"
            />
          </div>
          {error && <ErrorMessage message={error} type="error" />}
          {state?.bankingDetails?.selfError && (
            <ErrorMessage
              message={state?.bankingDetails?.selfError}
              type="error"
            />
          )}
          <div className="flex justify-end mt-4">
            <div className="flex justify-end mt-4">
              <button
                onClick={handleTransfer}
                disabled={isTransferDisabled}
                className="bg-[#1E45E1] hover:bg-[#1738C7] disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 text-white px-5 h-10 rounded-md font-medium font-gilroy flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </div>
                  </>
                ) : (
                  "Transfer"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelfTransfer;

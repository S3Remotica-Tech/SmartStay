/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Add, Bank, CloseCircle } from "iconsax-react";
import ErrorMessage from "../../Components/ErrorMessage";
import { Calendar } from "iconsax-react";
import DatePicker from "react-datepicker";

function SelfTransfer({ show, handleClose, selfDetails }) {
  // console.log("selfDetailsselfDetails", selfDetails);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [notes, setNotes] = useState("");

  // const [selectedBankId, setSelectedBankId] = useState(null);
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
      type: "SELF_TRANSFER_V3_SAGA",
      payload: {
        hostelId: state.login?.selectedHostel_Id,
        fromBankId: bankDetails?.fromBank?.bankId,
        toBankId: selectedBank,
        amount: Number(amount),
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
    if (selfDetails?.bankId) {
      dispatch({
        type: "SELF_TRANSER_INITIALIZE_SAGA",
        payload: {
          hostelId: state.login?.selectedHostel_Id,
          bankId: selfDetails?.bankId,
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

  // console.log("state", state.bankingDetails?.selfTransferInitialize);

  const bankDetails = state.bankingDetails?.selfTransferInitialize;

  const availableBalance = Number(bankDetails?.fromBank?.accountBalance || 0);

  const isTransferDisabled =
    loading || !selectedBank || Number(amount) > availableBalance;

  const handleSelect = (item) => {
    setSelectedBank(item);
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute top-2 right-2 bottom-2 w-full max-w-md bg-white rounded-xl shadow-xl flex flex-col font-gilroy">
        <div className="relative flex items-center justify-between border-b border-[#E5E7EB] px-4 py-3">
          <div className="text-[1.25rem] font-semibold font-gilroy text-[#344054]">
            Self Transfer
          </div>

          <Add
            size="24"
            color="#FF0000"
            className="cursor-pointer rotate-45"
            onClick={handleClose}
          />
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-2 show-scrolls max-h-[500px]">
          <div>
            <h6 className="text-[#4B4B4B] text-[16px] font-medium font-gilroy mb-2">
              From
            </h6>

            <div className="flex items-center justify-between gap-3 p-2 border-b border-[#ccc]">
              <div className="flex items-center gap-2 flex-1">
                <div className="rounded-full bg-[#E8EDFF] p-3">
                  <Bank color="#1E45E1" size="14" />
                </div>

                <div className="w-full flex justify-between items-center">
                  <div>
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

                    <div className="text-xs font-normal mb-0.5">
                      {bankDetails?.fromBank?.accountNumber || "-"}
                    </div>

                    <div className="text-xs font-semibold text-[#1E45E1]">
                      Avl Bal : ₹ {bankDetails?.fromBank?.accountBalance || 0}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-3   pe-2 overflow-y-auto  show-scrolls">
            <h6 className="text-[#4B4B4B] text-base font-medium font-gilroy mb-2">
              To
            </h6>

            {bankDetails?.toBanks?.map((bank) => (
              <div
                key={bank.bankId}
                onClick={() => handleSelect(bank.bankId)}
                className={`flex items-center gap-2 mb-3 p-3 rounded-lg transition-all duration-200 cursor-pointer
      ${
        selectedBank === bank.bankId
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
                <input
                  type="radio"
                  name="selectedBank"
                  className="w-5 h-5 accent-[#1E45E1] cursor-pointer"
                  checked={selectedBank === bankDetails?.fromBank?.bankId}
                  onChange={() =>
                    setSelectedBank(bankDetails?.fromBank?.bankId)
                  }
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#222222] mb-2">
                Enter Amount to transfer <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#222222] text-sm font-medium">
                  ₹
                </span>

                <input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={handleChange}
                  className="w-full h-11 rounded-lg border border-[#D9D9D9] bg-white pl-8 pr-4 text-sm font-gilroy text-[#222222] placeholder:text-[#B8B8B8] outline-none focus:border-[#2952CC] focus:ring-1 focus:ring-[#2952CC]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#222222] mb-2">
                Date <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="dd/MM/yyyy"
                  className="w-full h-11 rounded-lg border border-[#D9D9D9] bg-white px-4 pr-10 text-sm font-gilroy text-[#222222] outline-none focus:border-[#2952CC] focus:ring-1 focus:ring-[#2952CC]"
                  placeholderText="Select date"
                  maxDate={new Date()}
                />

                <Calendar
                  size="20"
                  color="#2952CC"
                  className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                />
              </div>
            </div>
          </div>

          <div className="mt-5">
            <label className="block text-sm font-medium text-[#222222] mb-2">
              Notes
            </label>

            <textarea
              rows={4}
              placeholder="Describe the notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded-lg border border-[#D9D9D9] bg-white px-4 py-3 text-sm font-gilroy text-[#222222] placeholder:text-[#B8B8B8] resize-none outline-none focus:border-[#2952CC] focus:ring-1 focus:ring-[#2952CC]"
            />
          </div>

          {error && <ErrorMessage message={error} type="error" />}
          {state?.bankingDetails?.selfError && (
            <ErrorMessage
              message={state?.bankingDetails?.selfError}
              type="error"
            />
          )}
        </div>

        <div className="flex justify-end m-4">
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
  );
}

export default SelfTransfer;

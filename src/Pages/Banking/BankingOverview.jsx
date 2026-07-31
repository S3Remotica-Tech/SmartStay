/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import {
  Bank,
  Location,
  Calendar,
  ArrowUp2,
  ArrowUp,
  ArrowDown2,
  Add,
  ArrowSwapVertical,
  Wallet,
} from "iconsax-react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import BankingChart from "./BankingChart";
import BankingLinkMethod from "./BankingLinkMethod";
import BankingLedger from "./BankingLedger";
import { useDispatch, useSelector } from "react-redux";

const summaryCards = [
  {
    title: "Current Balance",
    amount: "₹ 97,500.23",
    icon: ArrowUp2,
  },
  {
    title: "Opening Balance",
    amount: "₹ 32,321.00",
  },
  {
    title: "Inflow (Income)",
    amount: "₹ 22,321.30",
  },
  {
    title: "Out flow (Expense)",
    amount: "₹ 12,321.00",
  },
  {
    title: "Transfers",
    amount: "₹ 16,500.00",
  },
];

function BankingOverview({ show, onClose }) {
  if (!show) return null;

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [showTransactionMenu, setShowTransactionMenu] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const OverviewDetails = state?.bankingDetails?.OverviewBankDetails;
  const isBankAccount = OverviewDetails?.accountType === "BANK";

  console.log("OverviewBankDetails", OverviewDetails);

  const tabs = isBankAccount
    ? [
        { id: "overview", label: "Overview" },
        { id: "linkedMethods", label: "Linked Methods" },
        { id: "ledger", label: "Ledger" },
      ]
    : [
        { id: "overview", label: "Overview" },
        { id: "ledger", label: "Ledger" },
      ];

  const LinkedPaymentMethodsList =
    state?.bankingDetails?.linkedPaymentMethodsList;

  const dropdownRef = useRef(null);
  const transactionMenus = [
    "Add Expense",
    "Tenant Payment",
    "Transfer",
    "Vendor Payment",
    "Credit Card Payment",
    "Investment",
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowTransactionMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (OverviewDetails && activeTab === "linkedMethods") {
      dispatch({
        type: "LINKED_PAYMENT_METHOD_SAGA",
        payload: {
          hostelId: OverviewDetails?.hostelId,
          bankId: OverviewDetails?.bankId,
        },
      });
    }
  }, [activeTab]);

  useEffect(() => {
    if (state?.bankingDetails?.addPaymentMethodSuccessCode === 201) {
      dispatch({
        type: "LINKED_PAYMENT_METHOD_SAGA",
        payload: {
          hostelId: OverviewDetails?.hostelId,
          bankId: OverviewDetails?.bankId,
        },
      });
      dispatch({ type: "REMOVE_ADD_PAYMENT_METHOD_REDUCER" });
    }
  }, [state?.bankingDetails?.addPaymentMethodSuccessCode]);

  return (
    <div className="font-gilroy">
      <div
        className={`fixed  inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          show ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        // onClick={onClose}
      />
      <div className="fixed top-2 right-2 bottom-2 w-full max-w-[1000px] bg-white z-50 rounded-md flex flex-col">
        <div className="flex items-center justify-between p-3 border-b border-[#F0F0F0] shrink-0">
          <div className="flex items-center gap-4">
            <div
              className={`${OverviewDetails?.accountType === "CASH" ? "bg-[#E9FFEE]" : "bg-[#E8ECFF]"} rounded-full px-2 py-2`}
            >
              {OverviewDetails?.accountType === "CASH" ? (
                <Wallet color="#038C3D" size="16" />
              ) : (
                <Bank color="#1E45E1" size="16" />
              )}
            </div>

            <div>
              <div className="text-[18px] font-semibold text-[#222222]">
                {OverviewDetails?.accountType === "BANK"
                  ? `${OverviewDetails?.bankName}`
                  : `${OverviewDetails?.cashAccountType}`}
              </div>

              <div className="flex items-center gap-3 mt-1">
                <div className="text-[#4B4B4B] text-[14px] capitalize">
                  {OverviewDetails?.accountType?.toLowerCase()} Account
                </div>

                {OverviewDetails?.accountType === "BANK" && (
                  <div className="flex items-center gap-1">
                    <Location size="16" color="#8F5C09" variant="Bold" />
                    <div className="text-[#8F5C09] text-[14px]">
                      {OverviewDetails?.branchName}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative ">
              <button
                onClick={() => setShowTransactionMenu((prev) => !prev)}
                className="flex items-center justify-between gap-2 !font-gilroy text-[14px] !bg-[#F8F9FF] 
                               text-[#1E45E1] !font-semibold rounded-[8px] px-3 py-2  w-[170px] whitespace-nowrap"
              >
                Add Transaction
                <ArrowDown2
                  size="16"
                  className={`transition-transform ${
                    showTransactionMenu ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showTransactionMenu && (
                <div
                  ref={dropdownRef}
                  className="absolute top-full  right-[20px] mt-1 bg-white 
                               border border-[#E5E7EB] rounded-[8px] shadow-lg z-50 min-w-[220px] "
                >
                  {transactionMenus?.map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setShowTransactionMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 text-[14px] font-medium text-[#111827]
                                      hover:bg-[#F3F4F6] hover:border-l-[3px] hover:border-[#1E45E1] transition-all"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              className="flex items-center  gap-2 !font-gilroy text-[14px] !bg-[#F8F9FF] 
                               text-[#1E45E1] !font-semibold rounded-[8px] px-3 py-2   whitespace-nowrap"
            >
              <ArrowSwapVertical size="16" /> Transfer
            </button>

            <div className="flex items-center gap-4">
              <PiDotsThreeOutlineVerticalFill
                size={18}
                className="cursor-pointer"
              />

              <button
                onClick={onClose}
                className="h-8 w-8 rounded bg-[#FFF3F3] flex items-center justify-center"
              >
                <Add
                  size="24"
                  color="#FF0000"
                  className="cursor-pointer rotate-45"
                />{" "}
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-8 border-b shrink-0">
          <div className="flex items-center gap-10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`h-[52px] relative text-[14px] font-medium transition-all
            ${activeTab === tab.id ? "text-[#111827]" : "text-[#6B7280]"}`}
              >
                {tab.label}

                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#1E45E1]" />
                )}
              </button>
            ))}
          </div>

          <button className="h-[40px] px-4 rounded-lg bg-[#F9FAFB] flex items-center gap-2 text-[14px]">
            <Calendar size="18" />
            <div>This Month</div>
            <ArrowDown2 size="14" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto show-scrolls">
          {activeTab === "overview" && (
            <div className="flex gap-8 px-6 py-6">
              {summaryCards.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={index}
                    className={`flex items-center gap-6 px-6 ${
                      index !== summaryCards.length - 1 ? "border-r" : ""
                    }`}
                  >
                    {Icon && (
                      <div className="w-11 h-11 rounded-full bg-[#FBF7FF] flex items-center justify-center">
                        <ArrowUp
                          size="18"
                          color="#7840A9"
                          className="rotate-45"
                        />
                      </div>
                    )}

                    <div>
                      <div className="text-[12px] text-[#4A5565] font-medium">
                        {item.title}
                      </div>

                      <div className="text-[18px] font-semibold text-[#101828]">
                        {item.amount}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === "overview" && <BankingChart />}

          {activeTab === "linkedMethods" && isBankAccount && (
            <BankingLinkMethod />
          )}

          {activeTab === "ledger" && <BankingLedger />}
        </div>
      </div>{" "}
    </div>
  );
}

export default BankingOverview;

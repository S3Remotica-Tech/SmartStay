/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import {
  Bank,
  Location,
  Calendar,
  // ArrowUp2,
  // ArrowUp,
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
import SelfTransferNew from "./SelfTransferNew";
import { useHasPermission } from "../../Utils/Permission";
import { useNavigate } from "react-router-dom";
import CreditCardPayment from "./CreditCardPayment";
import Invesment from "./Invesment";
import VendorPayment from "./VendorPayment";
import PropTypes from "prop-types";

function BankingOverview({ show, onClose }) {
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [showTransactionMenu, setShowTransactionMenu] = useState(false);
  const [showInvestmentForm, seShowInvestmentForm] = useState(false);
  const [showSettlementForm, setShowSettlementForm] = useState(false);
  const [showCreditCardForm, seShowCreditCardForm] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [showMenu, setShowMenu] = useState(false);
  const [period, setPeriod] = useState("THIS_MONTH");
  const menuRef = useRef(null);

  const OverviewDetails = state?.bankingDetails?.OverviewBankDetails;
  const isBankAccount = OverviewDetails?.accountType === "BANK";
  const [selfTranfer, setSelfTransfer] = useState(false);
  const [selfDetails, setSelfDetails] = useState("");

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

  // const LinkedPaymentMethodsList =
  //   state?.bankingDetails?.linkedPaymentMethodsList;

  const dropdownRef = useRef(null);

  const periodOptions =
    state?.bankingDetails?.getBankingOverviewList?.filterOptions?.dateFilter?.map(
      (item) => ({
        label: item.name,
        value: item.type,
      }),
    ) || [];

  const {
    canWriteModule: canWriteBanking,
    // canReadModule: canReadBanking,
    // canUpdateModule: canUpdateBanking,
    // canDeleteModule: canDeleteBanking,
  } = useHasPermission("Banking");

  const { canWriteModule: canWriteExpense } = useHasPermission("Expense");

  const handleOpenSelfTransfer = (item) => {
    setSelfTransfer(true);
    setSelfDetails(item);
  };

  const handleCloseSelfTransfer = () => {
    setSelfTransfer(false);
  };

  const handleAddExpense = () => {
    navigate(`/add-expense/${state.login.selectedHostel_Id}`, {
      state: {
        isBankingWayTrigger: true,
      },
    });
    setShowTransactionMenu(false);
  };

  const handleInvestment = () => {
    setShowTransactionMenu(false);
    seShowInvestmentForm(true);
  };

  const handleCloseInvestment = () => {
    seShowInvestmentForm(false);
  };

  const handleVendorPayment = () => {
    setShowSettlementForm(true);
    setShowTransactionMenu(false);
  };

  const handleCloseSettlement = () => {
    setShowSettlementForm(false);
  };

  const handleCreditPayment = () => {
    setShowTransactionMenu(false);
    seShowCreditCardForm(true);
  };

  const handleCloseCreditPayment = () => {
    seShowCreditCardForm(false);
  };

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
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
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
    } else if (activeTab === "overview") {
      dispatch({
        type: "GET_BANKING_OVERVIEW_SAGA",
        payload: {
          hostelId: OverviewDetails?.hostelId,
          bankId: OverviewDetails?.bankId,
          dateFilter: period,
        },
      });
    }
  }, [activeTab, period]);

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

  useEffect(() => {
    if (state?.bankingDetails?.addMoneySuccess === 200) {
      dispatch({
        type: "GET_BANKING_OVERVIEW_SAGA",
        payload: {
          hostelId: OverviewDetails?.hostelId,
          bankId: OverviewDetails?.bankId,
          dateFilter: period,
        },
      });

      dispatch({ type: "REMOVE_ADD_MONEY_REDUCER" });
    }
  }, [state?.bankingDetails?.addMoneySuccess]);

  useEffect(() => {
    if (state.UsersList.settlementPaymentSuccessCode === 200) {
      dispatch({
        type: "GET_BANKING_OVERVIEW_SAGA",
        payload: {
          hostelId: OverviewDetails?.hostelId,
          bankId: OverviewDetails?.bankId,
          dateFilter: period,
        },
      });

      setTimeout(() => {
        dispatch({ type: "REMOVE_SETTLEMENT_PAYMENT_REDUCER" });
      }, 200);
    }
  }, [state.UsersList.settlementPaymentSuccessCode]);

  useEffect(() => {
    if (state.bankingDetails?.statusSuccessSelfTransfer === 200) {
      dispatch({
        type: "GET_BANKING_OVERVIEW_SAGA",
        payload: {
          hostelId: OverviewDetails?.hostelId,
          bankId: OverviewDetails?.bankId,
          dateFilter: period,
        },
      });
      setSelfTransfer(false);
    }
  }, [state.bankingDetails?.statusSuccessSelfTransfer]);

  useEffect(() => {
    if (state?.bankingDetails?.createCreditCardPaymentSuccessCode === 200) {
      dispatch({
        type: "GET_BANKING_OVERVIEW_SAGA",
        payload: {
          hostelId: OverviewDetails?.hostelId,
          bankId: OverviewDetails?.bankId,
          dateFilter: period,
        },
      });
      dispatch({ type: "REMOVE_CREDIT_CARD_PAYMENT_REDUCER" });
    }
  }, [state?.bankingDetails?.createCreditCardPaymentSuccessCode]);
  if (!show) return null;
  return (
    <div className="font-gilroy">
      <div
        className={`fixed  inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          show ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        // onClick={onClose}
      />
      <div className="fixed top-2 right-2 bottom-2 w-full max-w-6xl bg-white z-50 rounded-md flex flex-col">
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
                  <button
                    disabled={!canWriteExpense}
                    onClick={() => handleAddExpense()}
                    className="disabled:opacity-50 disabled:cursor-not-allowed w-full text-left px-3 py-2 text-[14px] font-medium text-[#111827] hover:bg-[#F3F4F6] hover:border-l-[3px] hover:border-[#1E45E1] transition-all"
                  >
                    Add Expense
                  </button>

                  <button
                    disabled
                    className="w-full text-left px-3 py-2 text-[14px] font-medium text-[#111827]
                   hover:bg-[#F3F4F6] hover:border-l-[3px] hover:border-[#1E45E1] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    // onClick={handleTenantPayment}
                  >
                    Tenant Payment
                  </button>

                  <button
                    className="w-full text-left px-3 py-2 text-[14px] font-medium text-[#111827]
                   hover:bg-[#F3F4F6] hover:border-l-[3px] hover:border-[#1E45E1] transition-all"
                    disabled={!canWriteBanking}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleVendorPayment();
                    }}
                  >
                    Vendor Payment
                  </button>

                  <button
                    className="w-full text-left px-3 py-2 text-[14px] font-medium text-[#111827]
                   hover:bg-[#F3F4F6] hover:border-l-[3px] hover:border-[#1E45E1] transition-all"
                    onClick={handleCreditPayment}
                  >
                    Credit Card Payment
                  </button>

                  <button
                    className="w-full text-left px-3 py-2 text-[14px] font-medium text-[#111827]
                   hover:bg-[#F3F4F6] hover:border-l-[3px] hover:border-[#1E45E1] transition-all"
                    disabled={!canWriteBanking}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleInvestment();
                    }}
                  >
                    Investment
                  </button>
                </div>
              )}
            </div>

            <button
              disabled={!canWriteBanking}
              onClick={(e) => {
                e.stopPropagation();
                handleOpenSelfTransfer(OverviewDetails);
              }}
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
          {activeTab === "overview" && (
            <div className="relative inline-block" ref={menuRef}>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center justify-between 
               gap-2 min-w-[220px] px-4 py-2 border border-gray-300 rounded-md bg-white text-sm"
              >
                <div className="flex items-center gap-2">
                  <Calendar size={18} color="#1E45E1" />
                  <span>
                    {periodOptions.find((p) => p.value === period)?.label ||
                      "Select Period"}
                  </span>
                </div>

                <ArrowDown2
                  size={16}
                  color="#6B7280"
                  className={`transition-transform ${
                    showMenu ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showMenu && (
                <div className="absolute left-0 mt-2 w-full rounded-md border border-gray-200 bg-white shadow-lg z-10">
                  {periodOptions.map((item) => (
                    <div
                      key={item.value}
                      onClick={() => {
                        setPeriod(item.value);
                        setShowMenu(false);
                      }}
                      className="cursor-pointer px-4 py-2 hover:bg-[#F3F6FF]"
                    >
                      {item.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex-1 overflow-y-auto show-scrolls">
          {activeTab === "overview" && <BankingChart />}

          {activeTab === "linkedMethods" && isBankAccount && (
            <BankingLinkMethod />
          )}

          {activeTab === "ledger" && <BankingLedger />}
        </div>
      </div>

      {showInvestmentForm && (
        <Invesment
          show={showInvestmentForm}
          handleClose={handleCloseInvestment}
          bankDetails={OverviewDetails?.bankId}
        />
      )}

      {showSettlementForm && (
        <VendorPayment
          show={showSettlementForm}
          handleClose={handleCloseSettlement}
          isBanking={true}
        />
      )}

      {selfTranfer && (
        <SelfTransferNew
          show={selfTranfer}
          handleClose={handleCloseSelfTransfer}
          selfDetails={selfDetails}
        />
      )}

      {showCreditCardForm && (
        <CreditCardPayment
          show={showCreditCardForm}
          handleClose={handleCloseCreditPayment}
          bankId={OverviewDetails?.bankId}
        />
      )}
    </div>
  );
}
BankingOverview.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default BankingOverview;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Calendar,
  Add,
  Bank,
  Wallet2,
  MessageQuestion, Card
} from "iconsax-react";
import Select from "react-select";
import ErrorMessage from "../../Components/ErrorMessage";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Works from "./Works";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import {
  Option,
  SingleValue,
  DropdownIndicator,
  GroupHeading,

} from "../../Utils/CustomSelectComponents";
import {
  datePickerInputClass,
  fieldClass,
  fieldLabelClass,
  fieldRequiredClass,
  fieldSelectStyles,
  fieldTextareaClass,
} from "../../Utils/FieldStyles";



function CreditCardPayment({ show, handleClose, bankId, isBank }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const workRef = useRef(null);
  const [showWorks, setShowWorks] = useState(false);
  const [creditCardAccount, setCreditCardAccount] = useState(null);
  const [creditCardAccountError, setCreditCardAccountError] = useState("");

  const [paymentMethod, setPaymentMethod] = useState(null);
  const [paymentMethodError, setPaymentMethodError] = useState("");

  const [transactionId, setTransactionId] = useState("");
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentDate, setPaymentDate] = useState(null);
  const [paymentDateError, setPaymentDateError] = useState("");

  const [description, setDescription] = useState("");

  const creditCardAccountRef = useRef(null);
  const amountRef = useRef(null);
  const paymentDateRef = useRef(null);
  const paymentMethodRef = useRef(null);

  // console.log("bankId", bankId)
  // console.log("paymentId", paymentMethodId)

  // const isDisabled = bankId && isBank

  const creditCardOptions = useMemo(
    () =>
      (
        state?.bankingDetails?.getCreditCardinitializeList
          ?.availableCreditCards ?? []
      ).map((view) => ({
        value: view?.cardId,
        label: `${view?.cardNetwork} - ${view?.cardNumber}${view?.linkedBankAccount?.bankName ? ` - ${view.linkedBankAccount?.bankName}` : ""
          }`,
      })),
    [
      state?.bankingDetails?.getCreditCardinitializeList
        ?.availableCreditCards,
    ]
  );

  // console.log("creditCardAccount", creditCardAccount)
  // const paymentOptions = useMemo(
  //   () =>
  //     state?.bankingDetails?.getCreditCardinitializeList?.otherPaymentMethods
  //       ?.filter((bank) => bank.bankId !== creditCardAccount?.value)
  //       ?.map((bank) => ({
  //         value: bank.bankId,
  //         label: bank.displayName,
  //         subLabel: bank.bankName,

  //         type: bank.accountType,
  //         icon:
  //           bank.accountType === "BANK" || bank.bankName === "BANK" ? (
  //             <Bank color="#1E45E1" size="16" />
  //           ) : bank.bankName === "CASH" || bank.accountType === "CASH" ? (
  //             <Wallet2 color="#038C3D" size="16" />
  //           ) : (
  //             <Card color="#F59E0B" size="16" />
  //           ),
  //         data: bank,
  //       })) || [],
  //   [
  //     state?.bankingDetails?.getCreditCardinitializeList?.otherPaymentMethods,
  //     creditCardAccount?.value,
  //   ]
  // );

  const paymentOptions = useMemo(
    () =>
      state?.bankingDetails?.getCreditCardinitializeList?.otherPaymentMethods
        ?.filter((bank) => bank?.bankId !== creditCardAccount?.value)
        ?.map((bank) => {
          const label = bank?.accountHolderName || "";

          const subLabel = [
            bank?.accountType === "BANK" ? bank?.bankName : bank?.accountType,
            bank?.displayName,
          ]
            .filter(Boolean)
            .join(" - ");

          const accountType = bank?.accountType;

          return {
            value: bank?.bankId,
            label: label,
            subLabel: subLabel,
            type: accountType || bank?.bankName,
            isUpi: bank?.isUpi,
            icon: bank?.isUpi && bank?.upiIcon ? (
              <img
                src={bank.upiIcon}
                alt="UPI"
                className="w-5 h-5 object-contain"
              />
            ) : accountType === "BANK" ? (
              <Bank color="#1E45E1" size="16" />
            ) : accountType === "CASH" ? (
              <Wallet2 color="#038C3D" size="16" />
            ) : (
              <Card color="#F59E0B" size="16" />
            ),
            data: bank,
          };
        }) || [],
    [
      state?.bankingDetails?.getCreditCardinitializeList?.otherPaymentMethods,
      creditCardAccount?.value,
    ]
  );

  const handleCreditCardAccountChange = (selected) => {
    setCreditCardAccount(selected);
    setCreditCardAccountError("");
  };

  const handlePaymentMethodChange = (selected) => {
    console.log(selected);
    setPaymentMethod(selected);
    setPaymentMethodError("");
  };

  const handleTransactionIdChange = (e) => {
    setTransactionId(e.target.value);
    // setTransactionIdError("");
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountError("");
  };

  const handlePaymentDateChange = (date) => {
    setPaymentDate(date);
    setPaymentDateError("");
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // console.log("paymentMethod", paymentMethod)

  const validateForm = () => {
    let isValid = true;
    let firstErrorRef = null;

    if (!creditCardAccount?.value) {
      setCreditCardAccountError("Please Select Credit Card Account");
      if (!firstErrorRef) firstErrorRef = creditCardAccountRef;
      isValid = false;
    }

    if (!amount || Number(amount) <= 0) {
      setAmountError("Please Enter a valid Amount");

      if (!firstErrorRef) firstErrorRef = amountRef;

      isValid = false;
    }

    if (!paymentDate) {
      setPaymentDateError("Please Select Settlement Date");
      if (!firstErrorRef) firstErrorRef = paymentDateRef;
      isValid = false;
    }

    if (!paymentMethod?.value) {
      setPaymentMethodError("Please Select Payment Method");
      if (!firstErrorRef) firstErrorRef = paymentMethodRef;
      isValid = false;
    }

    firstErrorRef?.current?.focus();

    return isValid;
  };

  const handleSubmit = () => {
    dispatch({ type: "REMOVE_CREDIT_CARD_PAYMENT_REDUCER_ERROR" });
    if (!validateForm()) return;
    setLoading(true);

    dispatch({
      type: "CREDIT_CARD_PAYMENT_SAGA",
      payload: {
        hostelId: state.login?.selectedHostel_Id,
        creditCardAccount: creditCardAccount?.value,
        paymentMethod: paymentMethod?.value,
        transactionId: transactionId,
        amount: Number(amount),
        settlementDate: paymentDate
          ? dayjs(paymentDate).format("DD-MM-YYYY")
          : "",
        description: description,
      },
    });
  };

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setLoading(false);

      dispatch({ type: "CLEAR_NETWORK_ERROR" });
    }
  }, [state.createAccount?.networkError]);


  useEffect(() => {
    if (state?.bankingDetails?.createCreditCardPaymentSuccessCode === 200) {
      setLoading(false);
      handleClose();
    }
  }, [state?.bankingDetails?.createCreditCardPaymentSuccessCode]);

  useEffect(() => {
    if (state?.bankingDetails?.creditCardPaymentError) {
      setLoading(false);
    }
  }, [state?.bankingDetails?.creditCardPaymentError]);

  const previousCreditCardRequestRef = useRef(null);

  useEffect(() => {
    if (!state.login?.selectedHostel_Id) return;
    const payload = {
      hostelId: state.login.selectedHostel_Id,
    };
    const requestKey = JSON.stringify(payload);
    if (previousCreditCardRequestRef.current === requestKey) return;
    previousCreditCardRequestRef.current = requestKey;
    dispatch({
      type: "GET_CREDIT_CARD_INITIALIZE_SAGA",
      payload,
    });
  }, [state.login?.selectedHostel_Id]);




  useEffect(() => {
    if (bankId && paymentOptions.length > 0) {
      const selected = paymentOptions.find(
        (option) => option.value === bankId && String(option.type) === "BANK"
      );
      console.log("selected", selected)
      setPaymentMethod(selected || null);
    } else {
      setPaymentMethod(null);
    }
  }, [bankId, paymentOptions]);

  console.log("bankId", bankId)

  useEffect(() => {
    if (bankId && creditCardOptions?.length > 0) {
      const selected = creditCardOptions.find(
        (option) => option.value === bankId
      );

      setCreditCardAccount(selected || null);
    } else {
      setCreditCardAccount(null);
    }
  }, [bankId, creditCardOptions]);

  useEffect(() => {
    return () => {
      dispatch({ type: "REMOVE_CREDIT_CARD_PAYMENT_REDUCER_ERROR" });
    };
  }, []);

  if (!show) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-[40]" />

      <div data-testid="credit-card-payment-credit-card-payment-credit-action"
        onClick={(e) => e.stopPropagation()}
        className="fixed inset-y-2 right-2 w-fit bg-white rounded-lg shadow-xl border-2 border-gray-100 z-50 flex flex-col"
      >
        <div
          className="sticky top-0 z-50 flex items-center  justify-between gap-4   
            rounded-xl  bg-white px-4 py-3"
        >
          <h1 className="text-[18px] font-semibold text-[#222222] mb-0">
            Credit Card Payment
          </h1>
          <div className="flex gap-2">
            <div className="relative">
              <MessageQuestion data-testid="credit-card-payment-show-works-icon"
                className="cursor-pointer"
                onClick={() => setShowWorks(!showWorks)}
              />

              {showWorks && (
                <div
                  ref={workRef}
                  className="absolute top-8 right-0 z-50 w-[420px]"
                >
                  <Works label="Credit-Payment" />
                </div>
              )}
            </div>
            <Add data-testid="credit-card-payment-close-icon"
              size={24}
              color="#FF0000"
              onClick={handleClose}
              className="cursor-pointer rotate-45"
            />
          </div>
        </div>
        <div className="flex-1 show-scrolls overflow-y-auto">
          <div className="grid grid-cols-1 mx-3">
            <div className="mb-1">
              <label className={fieldLabelClass}>
                Credit Card Account{" "}
                <span className={fieldRequiredClass}>*</span>
              </label>
              <div className="relative">
                <div data-testid="credit-card-payment-credit-card-account-select" className="contents"><Select isDisabled={!isBank && !!bankId}
                  ref={creditCardAccountRef}
                  value={creditCardAccount}
                  onChange={handleCreditCardAccountChange}
                  options={creditCardOptions}
                  placeholder="Select Credit Card"
                  className="text-sm"
                  styles={fieldSelectStyles(!!creditCardAccountError)}
                /></div>
              </div>

              {creditCardAccountError && (
                <ErrorMessage className="mt-[6px]" message={creditCardAccountError} type="error" />
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 mx-3 gap-2">
            <div className="mb-2">
              <label className={fieldLabelClass}>
                Payment method{" "}
                <span className={fieldRequiredClass}>*</span>
              </label>
              <div data-testid="credit-card-payment-payment-method-select" className="contents"><Select
                isDisabled={!creditCardAccount?.value}
                ref={paymentMethodRef}
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
                options={paymentOptions}
                placeholder="Select Payment Method"
                styles={fieldSelectStyles(!!paymentMethodError)}
                isSearchable={false}
                components={{
                  Option,
                  SingleValue,
                  DropdownIndicator,
                  GroupHeading,
                  IndicatorSeparator: () => null,
                }}
              /></div>

              {paymentMethodError && (
                <ErrorMessage className="mt-[6px]" message={paymentMethodError} type="error" />
              )}
            </div>
            <div className="mb-2 relative">
              <label className={fieldLabelClass}>
                Transaction ID{" "}
                <span className="text-transparent select-none text-[20px]">
                  *
                </span>
              </label>
              <input data-testid="credit-card-payment-transaction-id-input"
                type="text"
                placeholder="Enter Transaction ID"
                value={transactionId}
                onChange={handleTransactionIdChange}
                className={fieldClass()}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mx-3 ">
            <div className="mb-1">
              <label className={fieldLabelClass}>
                Amount (INR) <span className={fieldRequiredClass}>*</span>
              </label>
              <div className="relative">
                <input data-testid="credit-card-payment-amount-inr-input"
                  onWheel={(e) => e.target.blur()}
                  type="number"
                  value={amount}
                  ref={amountRef}
                  onChange={handleAmountChange}
                  placeholder="Enter Amount"
                  className={fieldClass(!!amountError)}
                />
                {amountError && (
                  <ErrorMessage className="mt-[6px]" message={amountError} type="error" />
                )}
              </div>
            </div>
            <div className="mb-1">
              <label className={fieldLabelClass}>
                Settlement Date{" "}
                <span className={fieldRequiredClass}>*</span>
              </label>
              <div className="relative" ref={paymentDateRef}>
                <div data-testid="credit-card-payment-settlement-date" className="contents"><DatePicker
                  wrapperClassName="w-full"
                  selected={paymentDate}
                  onChange={handlePaymentDateChange}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select Date"
                  maxDate={new Date()}
                  className={datePickerInputClass(!!paymentDateError)}
                /></div>

                <Calendar
                  size="20"
                  color="#1E45E1"
                  className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                />
              </div>
              {paymentDateError && (
                <ErrorMessage className="mt-[6px]" message={paymentDateError} type="error" />
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 mx-3">
            <div className="mb-1">
              <label className={fieldLabelClass}>
                Notes
              </label>
              <textarea data-testid="credit-card-payment-notes-textarea"
                rows={4}
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Describe the notes... "
                className={fieldTextareaClass()}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4 m-3">
          <button data-testid="credit-card-payment-cancel-btn"
            onClick={handleClose}
            type="button"
            className="text-[#4B4B4B] text-sm font-medium"
          >
            Cancel
          </button>

          <button data-testid="credit-card-payment-submit-btn"
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#1E45E1] hover:bg-[#1738C7] disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 text-white px-5 h-10 rounded-md font-medium font-gilroy flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </div>
              </>
            ) : (
              "Save"
            )}{" "}
          </button>
        </div>
      </div>
    </>
  );
}
CreditCardPayment.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  isBank: PropTypes.bool,
  bankId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

};
export default CreditCardPayment;

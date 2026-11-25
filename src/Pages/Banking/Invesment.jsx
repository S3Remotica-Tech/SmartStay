/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import {
  Calendar,
  Add,
  Bank,
  Wallet2,
  ArrowRight, Card
} from "iconsax-react";
import Select from "react-select";
import ErrorMessage from "../../Components/ErrorMessage";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
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





function Invesment({ show, handleClose, bankDetails }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [investment, setInvestment] = useState("");
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");

  const [paymentDate, setPaymentDate] = useState(null);
  const [paymentDateError, setPaymentDateError] = useState("");

  const [paymentMethod, setPaymentMethod] = useState(null);
  const [paymentMethodError, setPaymentMethodError] = useState("");

  const [transactionId, setTransactionId] = useState("");

  const [description, setDescription] = useState("");

  const handleInvestmentChange = (e) => {
    setInvestment(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountError("");
  };

  const handlePaymentDateChange = (date) => {
    setPaymentDate(date);
    setPaymentDateError("");
  };

  const handlePaymentMethodChange = (selected) => {
    setPaymentMethod(selected);
    setPaymentMethodError("");
  };

  const handleTransactionIdChange = (e) => {
    setTransactionId(e.target.value);
    // setTransactionIdError("");
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };



  const paymentOptions = useMemo(
    () =>
      state?.bankingDetails?.newBankingList?.map((bank) => {
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
          isUpi: bank?.upiIcons,
          icon: bank?.upiIcons ? (
            <img
              src={bank.upiIcons}
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
    [state?.bankingDetails?.newBankingList],
  );


  useEffect(() => {
    if (bankDetails?.bankId && paymentOptions.length > 0) {
      const selected = paymentOptions.find(
        (option) => option.value === String(bankDetails.bankId).trim(),
      );

      setPaymentMethod(selected || null);
    } else {
      setPaymentMethod(null);
    }
  }, [bankDetails, paymentOptions]);




  const validateForm = () => {
    let isValid = true;

    if (!amount) {
      setAmountError("Please Enter Amount");
      isValid = false;
    }

    // const amountRegex = /^(?=.*[1-9])\d+(\.\d{1,2})?$/;

    if (amount && Number(amount) <= 0) {
      setAmountError("Please Enter a valid Amount");
      isValid = false;
    }

    if (!paymentDate) {
      setPaymentDateError("Plese Select Date");
      isValid = false;
    }

    if (!paymentMethod) {
      setPaymentMethodError("Please Select Payment Method");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = () => {
    dispatch({ type: "REMOVE_ERROR_ADD_AMOUNT" });
    if (!validateForm()) return;
    if (state.login?.selectedHostel_Id) {
      dispatch({
        type: "ADD_MONEY_SAGA",
        payload: {
          hostelId: state.login?.selectedHostel_Id,
          bankId: paymentMethod?.value,
          paymentMethodId: bankDetails?.paymentMethodId ? bankDetails?.paymentMethodId : "",
          description: description,
          transactionDate: paymentDate
            ? dayjs(paymentDate).format("DD-MM-YYYY")
            : null,
          amount: Number(amount),
          transactionId: transactionId,
          investorName: investment,
        },
      });
      setLoading(true);
    }
  };

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setLoading(false);

      dispatch({ type: "CLEAR_NETWORK_ERROR" });
    }
  }, [state.createAccount?.networkError]);

  const previousBankingListRequestRef = useRef(null);

  useEffect(() => {
    if (!state.login.selectedHostel_Id) return;

    const payload = {
      hostelId: state.login.selectedHostel_Id,
    };

    const requestKey = JSON.stringify(payload);

    if (previousBankingListRequestRef.current === requestKey) return;

    previousBankingListRequestRef.current = requestKey;

    dispatch({
      type: "BANKING_LIST_SAGA",
      payload,
    });
  }, [state.login.selectedHostel_Id]);

  useEffect(() => {
    if (state?.bankingDetails?.addMoneySuccess === 200) {
      setLoading(false);
      handleClose();
    }
  }, [state?.bankingDetails?.addMoneySuccess]);

  useEffect(() => {
    if (state?.bankingDetails?.errorAddMoney) {
      setLoading(false);
    }
  }, [state?.bankingDetails?.errorAddMoney]);

  useEffect(() => {
    return () => {
      dispatch({ type: "REMOVE_ERROR_ADD_AMOUNT" });
    };
  }, []);

  if (!show) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-[40]" />

      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed inset-y-2 right-2 w-fit bg-white rounded-lg shadow-xl z-50 flex flex-col"
      >
        <div
          className="sticky top-0 z-50 flex items-center  justify-between gap-4   
            rounded-xl  bg-white px-4 py-3"
        >
          <h1 className="text-[18px] font-semibold text-[#222222] mb-0">
            Investment
          </h1>
          <Add
            size={24}
            color="#FF0000"
            onClick={handleClose}
            className="cursor-pointer rotate-45"
          />
        </div>
        <div className="flex-1 show-scrolls overflow-y-auto">
          <div className="grid grid-cols-1 mx-3">
            <div className="mb-1">
              <label className={fieldLabelClass}>
                Investment
              </label>
              <div className="relative">
                <input
                  value={investment}
                  onChange={handleInvestmentChange}
                  type="type"
                  placeholder="Enter Investor Name"
                  className={fieldClass()}
                  onWheel={(e) => e.target.blur()}
                />
              </div>

              {/* {investmentError && (
                <ErrorMessage className="mt-[6px]" message={investmentError} type="error" />
              )} */}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mx-3 ">
            <div className="mb-1">
              <label className={fieldLabelClass}>
                Amount (INR) <span className={fieldRequiredClass}>*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  onWheel={(e) => e.target.blur()}
                  value={amount}
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
                Date <span className={fieldRequiredClass}>*</span>
              </label>
              <div className="relative">
                <DatePicker
                  wrapperClassName="w-full"
                  selected={paymentDate}
                  onChange={handlePaymentDateChange}
                  dateFormat="dd/MM/yyyy"
                  maxDate={new Date()}
                  placeholderText="Select Date"
                  className={datePickerInputClass(!!paymentDateError)}
                />

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

          <div className={`grid ${bankDetails?.paymentMethod ? 'grid-cols-2' : 'grid-cols-1'} mx-3 gap-2`}>
            <div className="mb-2">
              <label className={fieldLabelClass}>
                Payment Bank{" "}
                <span className={fieldRequiredClass}>*</span>
              </label>
              <Select
                isDisabled={bankDetails}
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
              />

              {paymentMethodError && (
                <ErrorMessage className="mt-[6px]" message={paymentMethodError} type="error" />
              )}
            </div>
            {bankDetails?.paymentMethod && (
              <div className="mb-2">
                <label className={fieldLabelClass}>
                  Payment Method{" "} <span className={fieldRequiredClass}>*</span>

                </label>
                <input type="text" value={`${bankDetails?.displayName} - ${bankDetails?.paymentMethod}`} disabled className={fieldClass()} />


              </div>
            )}

          </div>
          <div className="grid grid-cols-1 mx-3">
            <div className="mb-2 relative">
              <label className={fieldLabelClass}>
                Transaction ID{" "}
                <span className="text-transparent select-none text-[20px]">
                  *
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter Transaction ID"
                value={transactionId}
                onChange={handleTransactionIdChange}
                className={fieldClass()}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 mx-3">
            <div className="mb-1">
              <label className={fieldLabelClass}>
                Notes
              </label>
              <textarea
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
          <button
            onClick={handleClose}
            type="button"
            className="text-[#4B4B4B] text-sm font-medium"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            type="button"
            disabled={loading}
            className={`px-6 py-2 rounded-[8px] text-sm font-medium flex items-center gap-2 transition-colors ${loading
              ? "bg-[#1E45E1]/80 cursor-not-allowed"
              : "bg-[#1E45E1] hover:bg-[#1738BB]"
              } text-white`}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                Save
                <ArrowRight size="14" color="#FFFFFF" />
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
Invesment.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  bankDetails: PropTypes.any,
};
export default Invesment;

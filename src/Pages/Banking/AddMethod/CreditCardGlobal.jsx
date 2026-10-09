/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import ErrorMessage from "../../../Components/ErrorMessage";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar, InfoCircle, Verify, Bank, Wallet } from "iconsax-react";
import dayjs from "dayjs";
import PropTypes from "prop-types";

const CustomStyles = {
    control: (base, state) => ({
        ...base,
        minHeight: "45px",
        height: "45px",
        border: "1px solid #D9D9D9",
        borderRadius: "8px",
        fontSize: "14px",
        fontFamily: "Gilroy, sans-serif",
        fontWeight: 500,
        boxShadow: "none",
        alignItems: "center",

        cursor: state.isDisabled ? "not-allowed" : "pointer",
        backgroundColor: state.isDisabled
            ? "#F3F4F6"
            : state.hasValue
                ? "#FFF"
                : "#fff",
        opacity: state.isDisabled ? 0.7 : 1,
    }),

    singleValue: (base, state) => ({
        ...base,
        color: state.isDisabled ? "#9CA3AF" : "#333",
        fontWeight: 600,
    }),

    placeholder: (base, state) => ({
        ...base,
        color: state.isDisabled ? "#9CA3AF" : "#6B7280",
    }),

    option: (base, state) => {
        const isSelected = state.isSelected;

        return {
            ...base,
            position: "relative",
            fontSize: 14,
            padding: "6px 12px",
            backgroundColor: isSelected
                ? "#EEF2FF"
                : state.isFocused
                    ? "#F3F4F6"
                    : "#fff",
            color: "#111827",
            cursor: "pointer",

            whiteSpace: "nowrap",
            overflow: "visible",

            paddingLeft: isSelected ? "9px" : "12px",

            ...(isSelected && {
                borderLeft: "3px solid #1E45E1",
                fontWeight: 500,
            }),
        };
    },

    menu: (base) => ({
        ...base,
        backgroundColor: "#fff",
        border: "1px solid #E5E7EB",
        borderRadius: "8px",
        padding: "6px 0",
        zIndex: 9999,
        width: "max-content",
        minWidth: "100%",
    }),

    menuList: (base) => ({
        ...base,
        maxHeight: "100px",
        padding: 0,
        overflowY: "auto",
    }),

    valueContainer: (base) => ({
        ...base,
        padding: "0 8px",
    }),

    indicatorsContainer: (base) => ({
        ...base,
        height: "45px",
    }),

    dropdownIndicator: (base, state) => ({
        ...base,
        padding: "4px",
        color: state.isDisabled ? "#D1D5DB" : "#6B7280",
        cursor: state.isDisabled ? "not-allowed" : "pointer",
    }),

    indicatorSeparator: () => ({
        display: "none",
    }),
};

function CreditCardGlobal({ handleClose }) {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    // const OverviewDetails = state?.bankingDetails?.OverviewBankDetails;

    const upiOptions =
        state?.bankingDetails?.getUpiCardTypes?.map((view) => ({
            value: view.id,
            label: view.name,
        })) || [];

    const [description, setDescription] = useState("");

    const [displayName, setDisplayName] = useState("");
    const [displayNameError, setDisplayNameError] = useState("");
    const [cardNetwork, setCardNetwork] = useState(null);
    const [cardNetworkError, setCardNetworkError] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [cardHolderName, setCardHolderName] = useState("");
    const [cardHolderNameError, setCardHolderNameError] = useState("");
    const [isLinked, setIsLinked] = useState(false);
    const [cardNumber, setCardNumber] = useState("");
    const [cardNumberError, setCardNumberError] = useState("");
    const [selectedBankError, setSelectedBankError] = useState("");
    const [creditLimit, setCreditLimit] = useState("");
    const [creditLimitError, setCreditLimitError] = useState("");

    const [billingCycle, setBillingCycle] = useState(null);

    // const billingPickerRef = useRef(null);

    const cardNetworkRef = useRef(null);
    const cardHolderNameRef = useRef(null);
    const cardNumberRef = useRef(null);
    const displayNameRef = useRef(null);
    const creditLimitRef = useRef(null);
    const selectedBankRef = useRef(null);
    const [selectedBank, setSelectedBank] = useState(null);



    // console.log("selectedBank", selectedBank);

    const bankList =
        state?.bankingDetails?.allTransactionList?.bankList || [];

    const bankOptions = bankList
        ?.filter((bank) => bank.accountType === "BANK" && bank.paymentMethodId === null)
        .map((bank) => ({
            value: bank.bankId,
            label: `${bank.displayName} - ${bank.bankName || "Bank"}`,
        }));

    const handleBankChange = (selected) => {
        setSelectedBankError("");
        setSelectedBank(selected);

    };




    const handleDisplayNameChange = (e) => {
        const value = e.target.value;

        // if (!/^[A-Za-z\s]*$/.test(value)) {
        //     return;
        // }
        setDisplayName(value);

        if (!value.trim()) {
            setDisplayNameError("Please Enter Display name");
        } else {
            setDisplayNameError("");
        }
    };

    const handleDescriptionChange = (e) => {
        const value = e.target.value;

        setDescription(value);
    };

    const handleCardNetworkChange = (selected) => {
        setCardNetwork(selected);
        setCardNetworkError("");
    };

    const handleCardHolderNameChange = (e) => {
        const value = e.target.value;
        if (!/^[A-Za-z\s]*$/.test(value)) {
            return;
        }
        setCardHolderName(value);

        if (!value.trim()) {
            setCardHolderNameError("Please Enter Card holder name ");
        } else {
            setCardHolderNameError("");
        }
    };

    const handleCardNumberChange = (e) => {
        dispatch({ type: "REMOVE_ADD_PAYEMNT_METHOD_BANKING_ERROR" });
        const value = e.target.value.replace(/\D/g, "").slice(0, 4);

        setCardNumber(value);

        if (!value.trim()) {
            setCardNumberError("Please Enter Last 4 digits");
        } else if (!/^\d{4}$/.test(value)) {
            setCardNumberError("Enter exactly 4 digits");
        } else {
            setCardNumberError("");
        }
    };

    const handleCreditLimitChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");

        setCreditLimit(value);

        if (value && Number(value) <= 0) {
            setCreditLimitError("Credit limit must be greater than 0");
        } else {
            setCreditLimitError("");
        }
    };

    const handleBillingCycleChange = (date) => {
        setBillingCycle(date);
    };

    const handleSaveCredit = () => {
        dispatch({ type: "REMOVE_ADD_PAYEMNT_METHOD_BANKING_ERROR" });
        setCardNetworkError("");
        setCardHolderNameError("");
        setCardNumberError("");
        setDisplayNameError("");
        setCreditLimitError("");
        setSelectedBankError("");
        let isValid = true;

        const nameRegex = /^[A-Za-z\s]+$/;

        let hasFocused = false;

        const focusField = (ref) => {
            if (!hasFocused) {
                ref.current?.focus();
                hasFocused = true;
            }
        };

        if (!cardNetwork) {
            setCardNetworkError("Please select card network");
            focusField(cardNetworkRef);
            isValid = false;
        } else {
            setCardNetworkError("");
        }

        if (!cardHolderName.trim()) {
            setCardHolderNameError("Please enter card holder name");
            focusField(cardHolderNameRef);
            isValid = false;
        } else if (!nameRegex.test(cardHolderName.trim())) {
            setCardHolderNameError("Card holder name should contain only letters");
            focusField(cardHolderNameRef);
            isValid = false;
        } else {
            setCardHolderNameError("");
        }

        if (!cardNumber.trim()) {
            setCardNumberError("Please enter last 4 digits");
            focusField(cardNumberRef);
            isValid = false;
        } else if (!/^\d{4}$/.test(cardNumber)) {
            setCardNumberError("Last 4 digits must contain exactly 4 numbers");
            focusField(cardNumberRef);
            isValid = false;
        } else {
            setCardNumberError("");
        }

        if (!displayName.trim()) {
            setDisplayNameError("Please enter display name");
            focusField(displayNameRef);
            isValid = false;
        } else {
            setDisplayNameError("");
        }

        if (creditLimit && Number(creditLimit) <= 0) {
            setCreditLimitError("Credit limit must be greater than 0");
            creditLimitRef.current?.focus();
            isValid = false;
        } else {
            setCreditLimitError("");
        }

        if (isLinked && !selectedBank?.value) {
            setSelectedBankError("Please select bank");
            focusField(selectedBankRef);
            isValid = false;
        } else {
            setSelectedBankError("");
        }

        if (!isValid) return;

        dispatch({
            type: "ADD_PAYMENT_METHOD_SAGA",
            payload: {
                hostelId: state.login.selectedHostel_Id,
                bankId: isLinked ? selectedBank?.value : "",
                paymentMethod: "Credit Card",
                displayName: displayName.trim(),
                description: description.trim(),
                cardNumber: cardNumber,
                cardNetwork: cardNetwork?.value,
                cardHolderName: cardHolderName,
                creditLimit: creditLimit,
                billingCycle: billingCycle
                    ? dayjs(billingCycle).format("DD/MM/YYYY")
                    : null,
            },
        });
        setIsSaving(true);
    };

    useEffect(() => {
        dispatch({
            type: "GET_UPI_CARD_TYPES_SAGA",
            payload: {
                type: "CARD",
            },
        });

    }, []);

    useEffect(() => {
        if (state.bankingDetails.addPaymentMethodSuccessCode === 201) {
            setIsSaving(false);
            handleClose();
            dispatch({ type: "REMOVE_ADD_PAYMENT_METHOD_REDUCER" });
        }
    }, [state.bankingDetails.addPaymentMethodSuccessCode]);

    useEffect(() => {
        if (state.bankingDetails.addPaymentError) {
            setIsSaving(false);
        }
    }, [state.bankingDetails.addPaymentError]);

    useEffect(() => {
        return () => {
            dispatch({ type: "REMOVE_ADD_PAYEMNT_METHOD_BANKING_ERROR" });
        };
    }, []);

    return (
        <div className="flex flex-col h-full ">
            <div className=" pr-1">
                <div className="grid grid-cols-1 gap-4 mt-3">


                    <div>
                        <label className="text-[13px] text-[#222222] font-gilroy font-medium">
                            Card Network <span className="text-red-500">*</span>
                        </label>

                        <Select
                            ref={cardNetworkRef}
                            options={upiOptions}
                            value={cardNetwork}
                            onChange={handleCardNetworkChange}
                            placeholder="Ex : Visa, Master"
                            className="mt-2"
                            styles={CustomStyles}
                        />
                        {cardNetworkError && (
                            <ErrorMessage message={cardNetworkError} type="error" />
                        )}
                    </div>
                </div>

                <div className="mt-3">
                    <label className="text-[13px] text-[#222222] font-gilroy font-medium">
                        Card Holder Name <span className="text-red-500">*</span>
                    </label>

                    <input
                        ref={cardHolderNameRef}
                        value={cardHolderName}
                        onChange={handleCardHolderNameChange}
                        placeholder="Enter Holder name"
                        className="w-full mt-2 h-11 px-4 border border-[#E5E7EB] rounded-lg text-sm outline-none focus:border-[#2952CC]"
                    />
                    {cardHolderNameError && (
                        <ErrorMessage message={cardHolderNameError} type="error" />
                    )}
                </div>

                <div className="mt-3">
                    <label className="text-[13px] text-[#222222] font-gilroy font-medium">
                        Card Number (Last 4 Digits ) <span className="text-red-500">*</span>
                    </label>

                    <input
                        ref={cardNumberRef}
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="**** **** **** 1234"
                        maxLength={4}
                        className="w-full mt-2 h-11 px-4 border border-[#E5E7EB] rounded-lg text-sm outline-none focus:border-[#2952CC]"
                    />
                    {cardNumberError && (
                        <ErrorMessage message={cardNumberError} type="error" />
                    )}
                </div>
                <div className="mt-3">
                    <label className="text-[13px] text-[#222222] font-gilroy font-medium">
                        Display Name <span className="text-red-500">*</span>
                    </label>

                    <input
                        ref={displayNameRef}
                        value={displayName}
                        onChange={handleDisplayNameChange}
                        placeholder="Gpay UPI"
                        className="w-full mt-2 h-11 px-4 border border-[#E5E7EB] rounded-lg text-sm outline-none focus:border-[#2952CC]"
                    />

                    {displayNameError && (
                        <ErrorMessage message={displayNameError} type="error" />
                    )}
                </div>
                <div className="grid grid-cols-2 gap-4 mt-3">
                    <div className="">
                        <label className="text-[13px] text-[#222222] font-gilroy font-medium">
                            Credit Limit
                        </label>

                        <input
                            ref={creditLimitRef}
                            value={creditLimit}
                            onChange={handleCreditLimitChange}
                            placeholder="Ex : ₹ 50,000"
                            className="w-full mt-2 h-11 px-4 border border-[#E5E7EB] rounded-lg text-sm outline-none focus:border-[#2952CC]"
                        />
                        {creditLimitError && (
                            <ErrorMessage message={creditLimitError} type="error" />
                        )}
                    </div>

                    <div className="">
                        <label className="text-[13px] text-[#222222] font-gilroy font-medium mb-2">
                            Billing Cycle
                        </label>

                        <div className="relative">
                            <DatePicker
                                selected={billingCycle}
                                onChange={handleBillingCycleChange}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Select Date"
                                wrapperClassName="w-full"
                                className={`w-full h-11 rounded-[8px] border px-3 pr-10 text-[13px]
                  focus:outline-none`}
                            />

                            <Calendar
                                size="20"
                                color="#1E45E1"
                                className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                            />
                        </div>
                    </div>


                </div>
                <div className="mt-3">


                    <div className="w-full my-1">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <h3 className="text-[16px] font-medium text-[#222222]">
                                    Link a bank account
                                </h3>
                                <p className="mb-1 text-[14px] text-[#64748B]">
                                    Link this card to a bank account used for card payments.
                                </p>
                            </div>

                            <input
                                type="checkbox"
                                checked={isLinked}
                                onChange={(e) => {
                                    setIsLinked(e.target.checked);
                                    if (!e.target.checked) {
                                        setSelectedBankError("")
                                        setSelectedBank(null)
                                    }
                                }}
                                className="h-[21px] w-[21px] shrink-0 cursor-pointer appearance-none
  rounded-[5px] border border-[#555555]
  checked:border-green-400 checked:bg-green-600
  checked:after:block checked:after:text-center
  checked:after:text-[14px] checked:after:font-bold
  checked:after:leading-[19px] checked:after:text-white
  checked:after:content-['✓']"
                            />
                        </div>


                    </div>


                    {isLinked ?
                        <div>
                            <label className="text-[13px] text-[#222222] font-gilroy font-medium">
                                Select Linked Bank  {isLinked && <span className="text-red-500">*</span>}
                            </label>

                            <Select ref={selectedBankRef}
                                options={bankOptions}
                                value={selectedBank}
                                onChange={handleBankChange}
                                placeholder="Select a bank"
                                className="mt-2"
                                styles={CustomStyles}
                            />
                            {selectedBankError && (
                                <ErrorMessage message={selectedBankError} type="error" />
                            )}
                        </div>
                        :
                        <div className="mt-4 rounded-[5px] bg-[#FFF6E9] px-3 py-3">
                            <div className="flex items-start gap-3">
                                <InfoCircle
                                    size={16}
                                    color="#9A6200"
                                    variant="Bold"
                                    className="mt-[2px] shrink-0"
                                />

                                <div>
                                    <p className="text-[14px] font-medium text-[#9A6200] mb-0">
                                        Standalone credit card
                                    </p>
                                    <p className="mt-1 text-[13px] text-[#9A6200] mb-0">
                                        You can add this card without linking a bank account. You can
                                        link one later if needed.
                                    </p>
                                </div>
                            </div>
                        </div>
                    }

                </div>

                <div className="mt-3">
                    <label className="text-[13px] text-[#222222] font-gilroy font-medium">
                        Description
                    </label>

                    <textarea
                        rows={4}
                        value={description}
                        onChange={handleDescriptionChange}
                        placeholder="Describe the notes..."
                        className="w-full mt-2 p-4 border border-[#E5E7EB] rounded-lg text-sm resize-none outline-none focus:border-[#2952CC]"
                    />
                    {/* {descriptionError && (
            <ErrorMessage message={descriptionError} type="error" />
          )} */}
                </div>
            </div>

            {
                state.bankingDetails.addPaymentError && (
                    <ErrorMessage
                        message={state.bankingDetails.addPaymentError}
                        type="error"
                    />
                )
            }



            <div className="rounded-lg bg-[#39358F] p-3">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex min-h-[120px] flex-1 flex-col justify-between py-1">
                        <div>
                            <Verify size="22" variant="Bold" color="#BFC5FF" />

                            <p className="my-1 text-[15px] font-semibold text-white">
                                Card preview
                            </p>

                            <p className="my-1 max-w-[150px] text-[11px] leading-4 text-[#D9DBFF]">
                                This is a sample Card for
                                <br />
                                Smartstay Banking list
                            </p>
                        </div>
                    </div>

                    <div className="w-[58%] rounded-lg bg-white p-3 shadow-sm">
                        <div className="flex items-start gap-2">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full
                             bg-[#FFF6EF]">
                                <Wallet size="16" color="#F5841F" />
                            </div>

                            <div className="min-w-0">
                                <p className="truncate text-[13px] font-semibold text-[#333333] mb-0">
                                    {displayName || "Credit Card"}
                                </p>

                                <p className="text-[10px] text-[#8A8A8A]">
                                    Credit Card                                </p>
                            </div>
                        </div>

                        <div className="mt-0 flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-[16px] font-semibold text-[#333333]">
                                    {/* ₹{bankOpeningBalance || "00.00"} */} {creditLimit ? `₹ ${Number(creditLimit).toLocaleString()}` : "₹ 00.00"}
                                </span>
                                <span>Balance</span>
                            </div>
                            <InfoCircle
                                size="14"
                                variant="Outline"
                                color="#9CA3AF"
                            />
                        </div>

                        <div className="mt-1 flex items-center gap-2">
                            {selectedBank?.label && (
                                <span className="rounded-md flex gap-2  bg-[#FFF5E5] px-2 py-1 text-[9px] font-medium text-[#B87900]">
                                    <Bank size="14" />  {selectedBank?.label}
                                </span>
                            )}
                            {cardNumber && <span className="rounded-md bg-[#EEF2FF] px-2 py-1 text-[9px] font-medium text-[#5363C8]">
                                **** **** **** {cardNumber}
                            </span>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-4 px-6 py-2 ">
                <button
                    onClick={handleClose}
                    className="px-6 py-2 text-[#6B7280] text-sm font-medium"
                >
                    Cancel
                </button>

                <button
                    disabled={isSaving}
                    onClick={handleSaveCredit}
                    className="!font-gilroy text-sm !bg-[#1E45E1] !text-white !font-semibold 
  !rounded-md !py-2.5 !px-4 !mb-2 !mx-2 !h-11 !w-36 !whitespace-nowrap
  flex items-center justify-center gap-2 disabled:opacity-70"
                >
                    {isSaving ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Saving ....{" "}
                        </>
                    ) : (
                        "Save"
                    )}
                </button>
            </div>
        </div >
    );
}
CreditCardGlobal.propTypes = {
    handleClose: PropTypes.func.isRequired,
};
export default CreditCardGlobal
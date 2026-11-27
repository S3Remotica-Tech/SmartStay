/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import {
  Calendar,
  DocumentUpload,
  Add,
  Bank,
  Wallet2, Card
} from "iconsax-react";
import Select from "react-select";
import ErrorMessage from "../../Components/ErrorMessage";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
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
} from "../../Utils/FieldStyles";





function ExpenseSettlement({ show, handleClose, selectedExpenseId }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const expenseOverView = state.ExpenseList?.expenseOverview;

  const [paidAmount, setPaidAmount] = useState("");
  const [paidDate, setPaidDate] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [description, setDescription] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  // const [vendorError, setVendorError] = useState("");
  const [paidAmountError, setPaidAmountError] = useState("");
  const [paidDateError, setPaidDateError] = useState("");
  const [paymentMethodError, setPaymentMethodError] = useState("");
  // const [error, setError] = useState("");
  const paidAmountRef = useRef(null);
  const paidDateRef = useRef(null);
  const paymentMethodRef = useRef(null);
  const [attachments, setAttachments] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedImageName, setSelectedImageName] = useState({
    name: "",
    index: "",
  });
  const [hoveredImage, setHoveredImage] = useState(null);
  const fileInputRef = useRef(null);
  const parseDate = (dateString) => {
    if (!dateString) return null;

    const [day, month, year] = dateString.split("/");

    return new Date(year, month - 1, day);
  };

  const transactionDate = parseDate(expenseOverView?.transactionDate);
  const initializaExpense = state.ExpenseList.getInitializeExpenseList;

  const previousExpenseRequestRef = useRef(null);

  useEffect(() => {
    if (!state.login.selectedHostel_Id) return;
    const payload = state.login.selectedHostel_Id;
    const requestKey = JSON.stringify(payload);
    if (previousExpenseRequestRef.current === requestKey) return;
    previousExpenseRequestRef.current = requestKey;
    dispatch({
      type: "INITIALIZEEXPENSESLIST",
      payload,
    });
  }, [state.login.selectedHostel_Id]);

  const finalOutstanding = expenseOverView?.balanceAmount - paidAmount;

  // const paymentOptionsV2 =
  //   initializaExpense?.allPaymentMethods?.map((bank) => ({
  //     value: bank.bankId,
  //     label: bank.displayName,
  //     subLabel:
  //       bank.accountType === "BANK"
  //         ? `${bank.bankName} - ${bank.paymentMethod}`
  //         : `${bank.cashAccountType} `,
  //     type: bank.accountType,
  //     icon:
  //       bank.accountType === "BANK" ? (
  //         <Bank color="#1E45E1" size="16" />
  //       ) : (
  //         <Wallet2 color="#038C3D" size="16" />
  //       ),
  //     data: bank,
  //   })) || [];





  const paymentOptionsV1 =
    initializaExpense?.banks?.map((bank) => {
      const label = bank?.accountHolderName || "";

      const subLabel = [
        bank?.isBank ? bank?.bankName : bank?.accountType,
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
        ) :
          accountType === "BANK" ? (
            <Bank color="#1E45E1" size="16" />
          ) : accountType === "CASH" ? (
            <Wallet2 color="#038C3D" size="16" />
          ) : (
            <Card color="#F59E0B" size="16" />
          ),
        data: bank,
      };
    }) || [];



  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    const newFiles = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setAttachments((prev) => [...prev, ...newFiles]);

    e.target.value = "";
  };

  const handleRemoveFile = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePaidAmountChange = (e) => {
    setPaidAmount(e.target.value);
    setPaidAmountError("");
  };

  const handleSetAmount = () => {
    const dueAmount = expenseOverView?.balanceAmount || 0;

    setPaidAmount(dueAmount);
    setPaidAmountError("");
  };

  const handleDateChange = (date) => {
    setPaidDate(date);
    setPaidDateError("");
  };

  // const handlePaymentMethodChange = (e) => {
  //   setPaymentMethod(e.target.value);
  //   setPaymentMethodError("");
  // };

  const handleTransactionIdChange = (e) => {
    setTransactionId(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const validateForm = () => {
    let isValid = true;
    setPaidAmountError("");
    setPaidDateError("");
    setPaymentMethodError("");
    // setError("");

    if (!paidAmount || Number(paidAmount) <= 0) {
      setPaidAmountError("Please enter Paid Amount");
      paidAmountRef.current?.focus();
      isValid = false;
    }
    if (Number(paidAmount) > Number(expenseOverView?.balanceAmount)) {
      setPaidAmountError("Paid Amount cannot exceed Outstanding Amount.");
      isValid = false;
    }

    if (!paidDate) {
      setPaidDateError("Please select Paid Date");
      paidDateRef.current?.setFocus?.();
      isValid = false;
    }

    if (!paymentMethod) {
      setPaymentMethodError("Please select Payment Method");
      paymentMethodRef.current?.focus();
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = () => {
    dispatch({ type: "REMOVE_EXPENSE_SETTLEMENT_ERROR" });
    if (!validateForm()) return;
    // setError("");
    const formattedDate = paidDate ? moment(paidDate).format("DD-MM-YYYY") : "";

    dispatch({
      type: "EXPENSE_SETTLEMENT_PAYMENT_SAGA",
      payload: {
        expenseId: selectedExpenseId,
        images: attachments.map((item) => item.file),
        payLoads: {
          paymentDate: formattedDate,
          bankId: paymentMethod?.value || "",
          paymentMethod: paymentMethod?.type || paymentMethod?.label || "",
          transactionId: transactionId,
          notes: description,
          paidAmount: paidAmount,
        },
      },
    });

    setFormLoading(true);
  };

  useEffect(() => {
    if (state.UsersList.settlementExpensePaymentSuccessCode === 200) {
      dispatch({
        type: "EXPENSE_OVERVIEW_SAGA",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          expenseId: selectedExpenseId,
        },
      });

      setFormLoading(false);

      setPaidAmountError("");
      setPaidDateError("");
      setPaymentMethodError("");
      // setError("");
      handleClose();
      setTimeout(() => {
        dispatch({ type: "REMOVE_EXPENSE_SETTLEMENT_PAYMENT_REDUCER" });
      }, 100);
    }
  }, [state.UsersList.settlementExpensePaymentSuccessCode]);

  useEffect(() => {
    return () => {
      setPaidAmountError("");
      setPaidDateError("");
      setPaymentMethodError("");
      // setError("");
      dispatch({ type: "REMOVE_EXPENSE_SETTLEMENT_ERROR" });
    };
  }, []);

  useEffect(() => {
    if (state.UsersList.expenseSettleError) {
      setFormLoading(false);
    }
  }, [state.UsersList.expenseSettleError]);
  if (!show) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-[40]" />

      <div data-testid="expense-settlement-expense-settle-payment-balance-action"
        onClick={(e) => e.stopPropagation()}
        className="fixed inset-y-2 right-2 w-[600px] bg-white rounded-lg shadow-xl z-50 flex flex-col font-gilroy border border-gray-50"
      >
        <div
          className="sticky top-0 z-50 flex items-center  justify-between gap-4   
          rounded-xl  bg-white px-4 py-3"
        >
          <h1 className="text-[18px] font-semibold text-[#222222] mb-0">
            Expense Settle Payment
          </h1>
          <Add data-testid="expense-settlement-close-icon"
            size={24}
            color="#FF0000"
            onClick={handleClose}
            className="cursor-pointer rotate-45"
          />
        </div>
        <div className="flex-1 show-scrolls overflow-y-auto ">
          <div className="grid grid-cols-1  mt-1 px-4 py-2">
            <div className="mb-2">
              <label className={fieldLabelClass}>
                {expenseOverView?.title ? "Title" : "Category"}
              </label>
              <div className="relative">
                <input data-testid="expense-settlement-input"
                  disabled
                  type="text"
                  value={
                    expenseOverView?.title || expenseOverView?.categoryName
                  }
                  // placeholder="Enter "
                  readOnly
                  className={fieldClass()}
                />
              </div>
            </div>

            <div className="mb-2">
              <label className={`${fieldLabelClass} flex justify-between`}>
                <span>
                  {" "}
                  Paid Amount (INR){" "}
                  <span className={fieldRequiredClass}>*</span>
                </span>
                <p className="mt-1 text-right text-xs text-gray-600 mb-0">
                  Due Amount{" "}
                  <span className="font-semibold  text-base text-[#E27625]">
                    ₹ {expenseOverView?.balanceAmount}
                  </span>
                </p>
              </label>
              <div className="relative">
                <input data-testid="expense-settlement-paid-amount-inr-due-amount-input"
                  type="number"
                  ref={paidAmountRef}
                  value={paidAmount}
                  placeholder="Enter Amount"
                  onChange={handlePaidAmountChange}
                  onWheel={(e) => e.target.blur()}
                  className={fieldClass(!!paidAmountError)}
                />
                <button data-testid="expense-settlement-set-btn"
                  onClick={handleSetAmount}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600"
                >
                  Set
                </button>
              </div>

              {paidAmountError && (
                <ErrorMessage className="mt-[6px]" message={paidAmountError} type="error" />
              )}
            </div>

            <div className="mb-2">
              <label className={fieldLabelClass}>
                Balance payable If (Outstanding){" "}
                <span className={fieldRequiredClass}>*</span>
              </label>
              <input data-testid="expense-settlement-balance-payable-if-outstanding-input"
                type="text"
                value={finalOutstanding}
                readOnly
                className={fieldClass()}
              />
            </div>

            <div className="mb-2">
              <label className={fieldLabelClass}>
                Paid Date <span className={fieldRequiredClass}>*</span>
              </label>
              <div className="relative">
                <div data-testid="expense-settlement-paid-date" className="contents"><DatePicker
                  // ref={paidDateRef}
                  wrapperClassName="w-full"
                  selected={paidDate}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select Date"
                  customInput={<input data-testid="expense-settlement-paid-date-input" ref={paidDateRef} />}
                  minDate={transactionDate}
                  maxDate={new Date()}
                  className={datePickerInputClass(!!paidDateError)}
                /></div>

                <Calendar
                  size="20"
                  color="#1E45E1"
                  className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                />
              </div>
              {paidDateError && (
                <ErrorMessage className="mt-[6px]" message={paidDateError} type="error" />
              )}
            </div>

            <div className="mb-2">
              <label className={fieldLabelClass}>
                Payment method{" "}
                <span className={fieldRequiredClass}>*</span>
              </label>
              <div data-testid="expense-settlement-payment-method-select" className="contents"><Select
                value={paymentMethod}
                ref={paymentMethodRef}
                onChange={(selected) => {
                  setPaymentMethod(selected);
                  setPaymentMethodError("");
                }}
                options={paymentOptionsV1}
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
                Transaction ID
              </label>
              <input data-testid="expense-settlement-transaction-id-input"
                type="text"
                placeholder="Enter Transaction ID"
                value={transactionId}
                onChange={handleTransactionIdChange}
                className={fieldClass()}
              />
            </div>

            <input data-testid="expense-settlement-file-change-file"
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/jpeg,image/jpg,image/png"
              className="hidden"
              onChange={handleFileChange}
            />
            {attachments?.length === 0 && (
              <div className="mb-2">
                <label className={fieldLabelClass}>
                  Attachments/Proofs (If any)
                </label>

                <div data-testid="expense-settlement-image-to-upload-jpg-action"
                  onClick={() => fileInputRef.current?.click()}
                  className="mb-3 flex flex-row gap-4 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 py-6 cursor-pointer hover:bg-gray-100"
                >
                  <div className="rounded-md bg-blue-100 px-1 py-1">
                    <DocumentUpload size={20} color="#1E45E1" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-[#222222] mb-1">
                      <span className="text-[#1E45E1]">Choose Image to</span>{" "}
                      Upload
                    </p>

                    <p className="text-xs text-gray-500">
                      JPG / JPEG / PNG Format
                    </p>
                  </div>
                </div>

                {previewImage && (
                  <div className="flex items-center justify-center">
                    <div className="bg-[#FAFAFB] w-full rounded-md flex items-center justify-center">
                      <div
                        className="relative px-4 py-2 group"
                        onMouseEnter={() => setHoveredImage(previewImage)}
                        onMouseLeave={() => setHoveredImage(null)}
                      >
                        <img
                          src={previewImage}
                          alt="preview"
                          className="w-[350px] h-auto rounded-md object-fit"
                        />

                        <div
                          className={`absolute bottom-0 left-[21px]  right-[21px] overflow-hidden rounded-b-md transition-all duration-300 ${hoveredImage === previewImage ? "h-[50px]" : "h-0"
                            }`}
                        >
                          <div className="h-[50px] bg-white/40 flex items-center justify-between px-3">
                            <p className="text-white text-sm truncate max-w-[170px]">
                              {selectedImageName?.name}
                            </p>

                            <button data-testid="expense-settlement-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                setPreviewImage(null);
                                handleRemoveFile(selectedImageName?.index);
                              }}
                              className="bg-white rounded-md p-1"
                            >
                              <Add
                                size={20}
                                color="#FF0000"
                                className="rotate-45"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {attachments?.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mt-3">
                {attachments.map((item, index) => (
                  <div
                    key={index}
                    className="relative border rounded-lg w-full"
                  >
                    <img data-testid={`expense-settlement-preview-img-${index}`}
                      src={item.preview}
                      alt="preview"
                      className="h-[100px]  w-[200px] object-cover cursor-pointer rounded-lg"
                      onClick={() => {
                        setSelectedImageName({
                          name: item.file.name,
                          index: index,
                        });
                        setPreviewImage(item.preview);
                      }}
                    />

                    {/* <button
                      type="button"
                      onClick={() => handleRemoveFile(index)}
                      className="absolute top-1 right-1 bg-[#FFF2F2] rounded-full p-1 shadow"
                    >
                      <Add size={16} color="#FF0000" className="rotate-45" />
                    </button> */}

                    {/* <div className="p-1">
                      <p className="text-[10px] truncate">{item.file.name}</p>
                    </div> */}
                  </div>
                ))}
              </div>
            )}
            {attachments?.length > 0 && (
              <div data-testid="expense-settlement-add-more-files-action"
                className="flex justify-end my-2"
                onClick={() => fileInputRef.current?.click()}
              >
                <label className="text-sm text-[#007AFF] cursor-pointer font-semibold">
                  + Add more Files
                </label>
              </div>
            )}
            <div className="mb-2 mt-2">
              <label className={fieldLabelClass}>
                Description
              </label>
              <textarea data-testid="expense-settlement-description-textarea"
                rows={4}
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Enter the Notes/Description for this invoice "
                className={`w-full text-[15px] text-[#4B4B4B] font-gilroy ${description ? "font-semibold" : "font-medium"
                  } border border-[#D9D9D9] rounded-[8px] px-3 py-2 focus:outline-none focus:ring-0`}
              />
            </div>

            <div className="rounded-xl bg-[#2633A0] p-4 text-white">
              <p className="text-xs font-medium opacity-70">SUMMARY</p>

              <p className="mt-1 text-2xl font-bold">
                ₹ {Number(paidAmount || 0)}
              </p>

              <div className="mt-3 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="opacity-80">Applied Amount</span>
                  <span>₹ {paidAmount}</span>
                </div>

                <div className="flex justify-between">
                  <span className="opacity-80">
                    Balance Amount (Outstanding)
                  </span>
                  <span
                    className={
                      finalOutstanding > 0
                        ? "text-yellow-300"
                        : "text-green-300"
                    }
                  >
                    ₹ {finalOutstanding}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {state.UsersList.expenseSettleError && (
          <ErrorMessage className="mt-[6px]"
            message={state.UsersList.expenseSettleError}
            type="error"
          />
        )}
        <div className="flex justify-end gap-4 my-4 mr-4">
          <button data-testid="expense-settlement-cancel-btn"
            onClick={handleClose}
            type="button"
            className="text-[#4B4B4B] text-sm font-medium"
          >
            Cancel
          </button>

          <button data-testid="expense-settlement-submit-btn"
            type="submit"
            disabled={formLoading}
            onClick={handleSubmit}
            className={`bg-[#1E45E1] text-white px-6 py-2 rounded-[8px] text-sm font-medium flex items-center justify-center gap-2 ${formLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
          >
            {formLoading ? (
              <>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </div>
              </>
            ) : (
              <span>Save</span>
            )}
          </button>
        </div>
      </div>
    </>
  );
}

ExpenseSettlement.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  selectedExpenseId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
export default ExpenseSettlement;

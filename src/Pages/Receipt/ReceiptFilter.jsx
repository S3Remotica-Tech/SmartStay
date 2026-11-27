/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { components } from "react-select";
import { FaCheck } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import PropTypes from "prop-types";
import { Filter } from "iconsax-react";
import withErrorBoundary from "../../Hoc/WithErrorBountry";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import ErrorMessage from "../../Components/ErrorMessage";
import {
  datePickerClass,
  fieldClass,
  fieldLabelClass,
  fieldSelectStyles,
} from "../../Utils/FieldStyles";


function ReceiptFilter({ show, handleClose, size }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [dateError, setDateError] = useState("");
  const [selectedInvoiceType, setSelectedInvoiceType] = useState("");
  const [selectedPaymentMode, setSelectedPaymentMode] = useState([]);
  const [selectedCollectedBy, setSelectedCollectedBy] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [selectedCollectedBylabels, setSelectedCollectedBylabels] = useState(
    [],
  );

  const [selectedPaymentLabel, setSelectedPaymentLabel] = useState([]);

  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  // const [selectedAmount, setSelectedAmount] = useState(null);

  const filterOptionsData = useSelector(
    (state) => state.InvoiceList?.getCustomizeReceiptList?.filterOptions,
  );

  const typeOptions =
    filterOptionsData?.invoiceType?.map((item) => ({
      label: item.name,
      value: item.type,
    })) || [];

  const periodOptions =
    filterOptionsData?.period?.map((item) => ({
      label: item.name,
      value: item.type,
      isDisabled: item.type === "CUSTOM",
    })) || [];

  const paymentModeOptions =
    filterOptionsData?.paymentMethod?.map((item) => ({
      label: item.name,
      value: item.type,
    })) || [];

  const collectedByOptions =
    filterOptionsData?.collectedBy?.map((item) => ({
      label: item.name,
      value: item.userId,
    })) || [];


  const handleInvoiceTypeChange = (selected) => {
    setSelectedInvoiceType(selected || "");
  };

  const selectedTypeOption =
    typeOptions.find((opt) => opt.value === selectedInvoiceType?.value) || null;

  const handlePaymentModeChange = (selected) => {
    setSelectedPaymentMode(selected.map((opt) => opt.value));
    setSelectedPaymentLabel(selected.map((opt) => opt.label));
  };

  const selectedPaymentModeOptions = paymentModeOptions.filter((opt) =>
    selectedPaymentMode?.includes(opt.value),
  );

  const handleCollectedByChange = (selected) => {
    setSelectedCollectedBy(selected.map((opt) => opt.value));
    setSelectedCollectedBylabels(selected.map((opt) => opt.label));
  };

  const selectedCollectedByOptions = collectedByOptions.filter((opt) =>
    selectedCollectedBy?.includes(opt.value),
  );

  const handlePeriodChange = (selected) => {
    setSelectedPeriod(selected);
    if (selected?.value !== "CUSTOM") {
      setStartDate(null);
      setEndDate(null);
    }
  };

  const CheckboxOption = (props) => {
    const { isSelected, label } = props;

    return (
      <components.Option {...props}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 4,
              border: "1px solid #A1A1AA",
              backgroundColor: isSelected ? "#16a34a" : "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isSelected && (
              <span
                style={{
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: "bold",
                }}
              >
                <FaCheck />
              </span>
            )}
          </div>

          <span style={{ fontSize: 12, color: "#222222" }}>{label}</span>
        </div>
      </components.Option>
    );
  };
  CheckboxOption.propTypes = {
    isSelected: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
  };

  const handleFilterBills = () => {
    if (!state.login?.selectedHostel_Id) return;
    if (!startDate && endDate) {
      setDateError("Please Select Start Date");
      return;
    }

    setDateError("");

    const filterPayload = {
      startDate: startDate ? startDate.format("DD/MM/YYYY") : undefined,
      endDate: endDate ? endDate.format("DD/MM/YYYY") : undefined,
      invoiceType: selectedInvoiceType?.value,
      paymentMode: selectedPaymentMode,
      collectedBy: selectedCollectedBy,
      period: selectedPeriod?.value === "CUSTOM" ? " " : selectedPeriod?.value,
      minAmount,
      maxAmount,
    };

    const hasFilters = Object.values(filterPayload).some((value) =>
      Array.isArray(value) ? value.length > 0 : value !== "" && value !== null,
    );

    if (!hasFilters) {
      return;
    }
    const payload = {
      hostelId: state.login.selectedHostel_Id,
      page: 1,
      size,
      invoiceType: selectedInvoiceType?.value || "",
      paymentMode: selectedPaymentMode,
      collectedBy: selectedCollectedBy,
      period: selectedPeriod?.value === "CUSTOM" ? " " : selectedPeriod?.value,
      // createdByLabels: selectedCollectedBylabels,
      minAmount: minAmount || "",
      maxAmount: maxAmount || "",
      startDate: startDate ? startDate.format("DD/MM/YYYY") : undefined,
      endDate: endDate ? endDate.format("DD/MM/YYYY") : undefined,
    };

    dispatch({
      type: "SET_RECEIPT_FILTERS",
      payload: {
        type: selectedInvoiceType?.label || "",
        modes: selectedPaymentMode,
        collectedBy: selectedCollectedBy,
        collectedBYLabels: selectedCollectedBylabels,
        period:
          selectedPeriod?.value === "CUSTOM" ? " " : selectedPeriod?.label,
        minAmount,
        maxAmount,
        paymentLabels: selectedPaymentLabel,
      },
    });

    dispatch({
      type: "CUSTOMIZE_RECEIPTS_LIST_SAGA",
      payload,
    });

    setFormLoading(true);
  };

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 3000);
    }
  }, [state.createAccount?.networkError]);

  useEffect(() => {
    if (state.InvoiceList.getReceiptSucessStatus === 200) {
      setFormLoading(false);
      handleClose();
      setTimeout(() => {
        dispatch({ type: "REMOVE_CUSTOMIZE_RECEIPTS_LIST_REDUCER" });
      }, 100);
    }
  }, [state.InvoiceList.getReceiptSucessStatus]);

  useEffect(() => {
    if (!show) return;

    const filters = state.InvoiceList?.receiptFilters;

    if (!filters) return;

    const selectedType =
      typeOptions.find((option) => option.label === filters.type) || null;

    setSelectedInvoiceType(selectedType);

    const selectedPeriod =
      periodOptions.find((option) => option.label === filters.period) || null;

    setSelectedPeriod(selectedPeriod);

    setSelectedPaymentMode(filters.modes || []);

    const selectedPaymentModes = paymentModeOptions.filter((option) =>
      filters.modes?.includes(option.value),
    );

    setSelectedPaymentLabel(selectedPaymentModes.map((option) => option.label));

    setSelectedCollectedBy(filters.collectedBy || []);
    setSelectedCollectedBylabels(filters.collectedBYLabels || []);

    setMinAmount(filters.minAmount || "");
    setMaxAmount(filters.maxAmount || "");
  }, [show, state.InvoiceList?.receiptFilters]);


  const handleFilterClose = () => {
    handleFilterBills();
    handleClose();
  };

  if (!show) return null;

  return (
    <>
      <div data-testid="receipt-filter-filter-close-action" className="fixed inset-0 z-40 bg-black/40" onClick={handleFilterClose} />
      <div className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white shadow-2xl flex flex-col font-gilroy">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <Filter size={20} color="#364153" />
            <h2 className="text-xl font-semibold text-[#222222] mb-0">
              Filter
            </h2>
          </div>

          <IoCloseOutline data-testid="receipt-filter-close-icon"
            size={24}
            color="#FF0000"
            className="cursor-pointer"
            onClick={handleClose}
          />
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="">
            <div className="mb-2">
              <label className={fieldLabelClass}>
                Invoice Type
              </label>

              <div data-testid="receipt-filter-invoice-type-select" className="contents"><Select
                styles={fieldSelectStyles()}
                placeholder="Select Type"
                value={selectedTypeOption}
                onChange={handleInvoiceTypeChange}
                options={typeOptions}
              /></div>
            </div>

            <div className="mb-4">
              <label className={fieldLabelClass}>
                Period
              </label>
              <div data-testid="receipt-filter-period-select" className="contents"><Select
                // isDisabled={selectedPeriod?.value === "CUSTOM"}
                styles={fieldSelectStyles()}
                placeholder="Select Period"
                value={selectedPeriod}
                onChange={handlePeriodChange}
                options={periodOptions}
              /></div>

              {selectedPeriod?.value === "CUSTOM" && (
                <div className="grid grid-cols-2 gap-2 my-3">
                  <div className="">
                    <label className={fieldLabelClass}>
                      Start Date
                    </label>

                    <DatePicker data-testid="receipt-filter-start-date"
                      className={datePickerClass()}
                     
                      format="DD/MM/YYYY"
                      placeholder="Start Date"
                      value={startDate ? dayjs(startDate) : null}
                      onChange={(date) => {
                        setStartDate(date);
                        setEndDate(null);
                        setDateError("");
                      }}
                      disabledDate={(current) =>
                        current && current > dayjs().endOf("day")
                      }
                      getPopupContainer={(triggerNode) =>
                        triggerNode.closest(".datepicker-wrapper")
                      }
                    />
                  </div>

                  <div className="">
                    <label className={fieldLabelClass}>
                      End Date
                    </label>

                    <DatePicker data-testid="receipt-filter-end-date"
                      className={datePickerClass(!!dateError)}
                     
                      format="DD/MM/YYYY"
                      placeholder="End Date"
                      value={endDate ? dayjs(endDate) : null}
                      onChange={(date) => setEndDate(date)}
                      disabledDate={(current) =>
                        current &&
                        (current > dayjs().endOf("day") ||
                          (startDate &&
                            current < dayjs(startDate).startOf("day")))
                      }
                      getPopupContainer={(triggerNode) =>
                        triggerNode.closest(".datepicker-wrapper")
                      }
                    />
                  </div>
                  {dateError && (
                    <ErrorMessage className="mt-[6px]" message={dateError} type="error" />
                  )}
                </div>
              )}
            </div>

            <div className="mb-4">
              <label className={fieldLabelClass}>
                Payment Mode
              </label>
              <div data-testid="receipt-filter-payment-mode-select" className="contents"><Select
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                options={paymentModeOptions}
                value={selectedPaymentModeOptions}
                onChange={handlePaymentModeChange}
                styles={fieldSelectStyles()}
                components={{ Option: CheckboxOption }}
                placeholder="Select Payment Mode"
              /></div>
            </div>

            <div className="mb-4">
              <label className={fieldLabelClass}>
                Collected By
              </label>
              <div data-testid="receipt-filter-collected-by-select" className="contents"><Select
                isMulti
                hideSelectedOptions={false}
                closeMenuOnSelect={false}
                options={collectedByOptions}
                value={selectedCollectedByOptions}
                onChange={handleCollectedByChange}
                styles={fieldSelectStyles()}
                components={{ Option: CheckboxOption }}
                placeholder="Select Collected By"
              /></div>
            </div>

            <div className="mb-3">
              <label
                style={{ color: "#222222", fontSize: 15, fontWeight: 600 }}
              >
                Other Filter
              </label>
            </div>

            <div className="mt-2 mb-3">
              <label className={fieldLabelClass}>
                Paid Amount Range
              </label>

              <div className="flex gap-2">
                <input data-testid="receipt-filter-paid-amount-range-input"
                  type="number"
                  placeholder="₹Min"
                  className={fieldClass()}
                  value={minAmount}
                  onChange={(e) => setMinAmount(e.target.value)}
                />
                <input data-testid="receipt-filter-paid-amount-range-input-2"
                  type="number"
                  placeholder="₹Max"
                  value={maxAmount}
                  onChange={(e) => setMaxAmount(e.target.value)}
                  className={fieldClass()}
                />
              </div>
              {/* {paidAmountMin &&
                                            paidAmountMax &&
                                            paidMin > paidMax && (
                                                <ErrorMessage className="mt-[6px]"
                                                    message="Max amount should be greater than Min"
                                                    type="error"
                                                />
                                            )} */}
            </div>
          </div>
        </div>

        {formLoading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/50">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#1E45E1] border-r-transparent" />
          </div>
        )}
        <div className="sticky bottom-0 z-10 flex justify-between gap-4 border-t border-[#E0E0E0] bg-white px-5 py-[15px]">
          <button data-testid="receipt-filter-reset-btn"
            type="button"
            onClick={() => {
              setSelectedInvoiceType([]);
              setSelectedPeriod(null);
              setSelectedPaymentMode([]);
              setSelectedCollectedBy([]);
              setMinAmount("");
              setMaxAmount("");
            }}
            className="w-[48%] font-gilroy rounded-md border border-[#D9D9D9] bg-transparent py-2 text-sm font-medium text-black transition-colors hover:bg-gray-100"
          >
            Reset
          </button>

          <button data-testid="receipt-filter-apply-btn"
            type="button"
            onClick={handleFilterBills}
            className="w-[48%] font-gilroy rounded-md bg-[#1E45E1] py-2 text-sm font-medium text-white transition-colors hover:bg-[#1738C9]"
          >
            Apply
          </button>
        </div>
      </div>
    </>
  );
}
ReceiptFilter.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  size: PropTypes.any,
  page: PropTypes.any,
};

export default withErrorBoundary(ReceiptFilter);

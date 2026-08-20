/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Select from "react-select";
// import { Button, Form, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { components } from "react-select";
import { FaCheck } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
// import ErrorMessage from '../../Components/ErrorMessage'
import PropTypes from "prop-types";
import { Filter } from "iconsax-react";
import withErrorBoundary from "../../Hoc/WithErrorBountry";

const CustomStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "40px",
    height: "40px",
    width: "100%",
    border: "1px solid #D9D9D9",
    borderRadius: "8px",
    fontSize: "12px",
    fontFamily: "Gilroy, sans-serif",
    fontWeight: 500,
    boxShadow: "none",
    cursor: "pointer",
    backgroundColor: state.hasValue ? "#F4F4F4" : "#fff",
  }),

  singleValue: (base) => ({
    ...base,
    color: "#333",
    fontWeight: 500,
  }),

  option: (base, state) => {
    const isSelected = state.isSelected;

    return {
      ...base,
      position: "relative",
      fontSize: 13,
      padding: "6px 12px",
      // margin: "2px 10px",
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
    height: "32px",
  }),

  dropdownIndicator: (base) => ({
    ...base,
    padding: "4px",
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),
};

function ReceiptFilter({ show, handleClose, size }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
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

  const inputClass =
    "mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 " +
    "focus:border-[#1E45E1] focus:outline-none focus:ring-1 focus:ring-[#1E45E1]";

  

  const handleInvoiceTypeChange = (selected) => {
    setSelectedInvoiceType(selected?.value || "");
  };

  const selectedTypeOption =
    typeOptions.find((opt) => opt.value === selectedInvoiceType) || null;

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

    const filterPayload = {
      invoiceType: selectedInvoiceType,
      paymentMode: selectedPaymentMode,
      collectedBy: selectedCollectedBy,
      period: selectedPeriod?.value,
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
      invoiceType: selectedInvoiceType || "",
      paymentMode: selectedPaymentMode,
      collectedBy: selectedCollectedBy,
      period: selectedPeriod?.value || "",
      // createdByLabels: selectedCollectedBylabels,
      minAmount: minAmount || "",
      maxAmount: maxAmount || "",
    };

    dispatch({
      type: "SET_RECEIPT_FILTERS",
      payload: {
        type: selectedInvoiceType || "",
        modes: selectedPaymentMode,
        collectedBy: selectedCollectedBy,
        collectedBYLabels: selectedCollectedBylabels,
        period: selectedPeriod?.value || "",
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

  if (!show) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40" onClick={handleClose} />
      <div className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white shadow-2xl flex flex-col font-gilroy">
        <div className="flex items-center justify-between border-b px-4 py-4">
          <div className="flex items-center gap-2">
            <Filter size={20} color="#364153" />
            <h2 className="text-xl font-semibold text-[#222222] mb-0">
              Filter
            </h2>
          </div>

          <IoCloseOutline
            size={24}
            color="#FF0000"
            className="cursor-pointer"
            onClick={handleClose}
          />
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="mb-3" style={{ fontFamily: "Gilroy" }}>
            <div className="mb-3">
              <label
                style={{ color: "#222222", fontSize: 15, fontWeight: 600 }}
              >
                System Filter
              </label>
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-xs font-medium text-gray-500">
                Invoice Type
              </label>

              <Select
                styles={CustomStyles}
                placeholder="Select Type"
                value={selectedTypeOption}
                onChange={handleInvoiceTypeChange}
                options={typeOptions}
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-xs font-medium text-gray-500">
                Period
              </label>
              <Select
                styles={CustomStyles}
                placeholder="Select Period"
                value={selectedPeriod}
                onChange={handlePeriodChange}
                options={periodOptions}
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-xs font-medium text-gray-500">
                Payment Mode
              </label>
              <Select
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                options={paymentModeOptions}
                value={selectedPaymentModeOptions}
                onChange={handlePaymentModeChange}
                styles={CustomStyles}
                components={{ Option: CheckboxOption }}
                placeholder="Select Payment Mode"
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-xs font-medium text-gray-500">
                Collected By
              </label>
              <Select
                isMulti
                hideSelectedOptions={false}
                closeMenuOnSelect={false}
                options={collectedByOptions}
                value={selectedCollectedByOptions}
                onChange={handleCollectedByChange}
                styles={CustomStyles}
                components={{ Option: CheckboxOption }}
                placeholder="Select Collected By"
              />
            </div>

            <div className="mb-3">
              <label
                style={{ color: "#222222", fontSize: 15, fontWeight: 600 }}
              >
                Other Filter
              </label>
            </div>

            <div className="mt-2 mb-3">
              <label className="text-xs font-medium text-gray-600">
                Paid Amount Range
              </label>

              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="₹Min"
                  className={inputClass}
                  value={minAmount}
                  onChange={(e) => setMinAmount(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="₹Max"
                  value={maxAmount}
                  onChange={(e) => setMaxAmount(e.target.value)}
                  className={inputClass}
                />
              </div>
              {/* {paidAmountMin &&
                                            paidAmountMax &&
                                            paidMin > paidMax && (
                                                <ErrorMessage
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
          <button
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

          <button
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

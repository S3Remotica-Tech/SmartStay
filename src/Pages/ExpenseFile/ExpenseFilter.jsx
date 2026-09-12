/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Select from "react-select";
// import { Button, Form, Offcanvas } from "react-bootstrap";
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

const selectStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "45px",
    height: "30px",
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
    fontWeight: 500,
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
      fontSize: 12,
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
function ExpenseFilter({ show, handleClose, size }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [selectedPeriodOption, setSelectedPeriodOption] = useState(null);

  const [period, setPeriod] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [selectedPaymentModeOptions, setSelectedPaymentModeOptions] =
    useState(null);

  const [paymentMode, setPaymentMode] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [selectedCreatedByOption, setSelectedCreatedByOption] = useState(null);

  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [startDateError, setStartDateError] = useState("");
  const [endDateError, setEndDateError] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [selectedSubCategoryOptions, setSelectedSubCategoryOptions] =
    useState(null);
  const [subCategory, setSubCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [selectedBillStatus, setSelectedBillStatus] = useState(null);
  const [minAmountError, setMinAmountError] = useState("");
  const [maxAmountError, setMaxAmountError] = useState("");
  const inputClass =
    " w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm font-semibold text-gray-700 " +
    "focus:border-[#1E45E1] focus:outline-none focus:ring-1 focus:ring-[#1E45E1]";

  const [selectedCategory, setSelectedCategory] = useState([]);

  const filterOptionsData = useSelector(
    (state) => state.ExpenseList.expenseList?.filterOptions,
  );

  const categoryOptions =
    filterOptionsData?.category?.map((item) => ({
      label: item.name,
      value: item.type,
    })) || [];

  const subCategoryOptions =
    filterOptionsData?.subCategory?.map((item) => ({
      label: item.name,
      value: item.type,
      // categoryId: item.categoryId,
    })) || [];

  const vendorOptions =
    filterOptionsData?.vendor?.map((item) => ({
      label: item.name,
      value: item.type,
    })) || [];

  const paymentModeOptions =
    filterOptionsData?.paymentMode?.map((item) => ({
      label: `${item.accountName || ""} - ${item.paymentMode}  `,
      value: item.bankId,
    })) || [];

  const createdByOptions =
    filterOptionsData?.createdBy?.map((item) => ({
      label: item.name,
      value: item.type,
    })) || [];

  const paymentStatusOptions =
    filterOptionsData?.status?.map((item) => ({
      label: item.name,
      value: item.type,
    })) || [];

  const periodOptions = [
    ...(filterOptionsData?.period?.map((item) => ({
      label: item.name,
      value: item.type,
    })) || []),
    {
      label: "Custom",
      value: "CUSTOM",
    },
  ];

  const filters = state.ExpenseList?.expenseFilters;

  useEffect(() => {
    if (!show || !filters) return;

    // console.log("Stored Filters:", filters);

    // const categoryOption =
    //   categoryOptions.find(
    //     (option) => String(option.value) === String(filters.categoryId),
    //   ) || null;

    setCategory(filters.categoryId || "");
    setSelectedCategory(filters.categoryLabel || "");

    const subCategoryOption =
      subCategoryOptions.find(
        (option) => String(option.value) === String(filters.subCategoryId),
      ) || null;

    setSubCategory(filters.subCategoryId || "");
    setSelectedSubCategory(filters.subCategoryLabel || "");
    setSelectedSubCategoryOptions(subCategoryOption);

    const paymentModeOption =
      paymentModeOptions.find(
        (option) => String(option.value) === String(filters.paymentMode),
      ) || null;

    setPaymentMode(filters.paymentMode || "");
    setSelectedPaymentModeOptions(paymentModeOption);

    const createdByOption =
      createdByOptions.find(
        (option) => String(option.value) === String(filters.createdBy),
      ) || null;

    setCreatedBy(createdByOption);
    setSelectedCreatedByOption(createdByOption);

    const vendorOption =
      vendorOptions.find(
        (option) => String(option.value) === String(filters.vendorId),
      ) || null;

    setSelectedVendor(vendorOption);

    const paymentStatusOption =
      paymentStatusOptions.find(
        (option) => String(option.value) === String(filters.paymentStatus),
      ) || null;

    setSelectedBillStatus(paymentStatusOption);

    const periodOption =
      periodOptions.find(
        (option) => String(option.value) === String(filters.period),
      ) || null;

    setPeriod(periodOption);
    setSelectedPeriodOption(periodOption);

    if (filters.startDate) {
      setStartDate(dayjs(filters.startDate, "DD-MM-YYYY"));
    } else {
      setStartDate(null);
    }

    if (filters.endDate) {
      setEndDate(dayjs(filters.endDate, "DD-MM-YYYY"));
    } else {
      setEndDate(null);
    }

    setMinAmount(filters.minAmount ?? "");
    setMaxAmount(filters.maxAmount ?? "");
  }, [show]);

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

  const handlePeriodChange = (opt) => {
    setSelectedPeriodOption(opt);
    setPeriod(opt);

    setStartDate(null);
    setEndDate(null);
  };

  const handlePaymentMode = (selected) => {
    setSelectedPaymentModeOptions(selected);
    setPaymentMode(selected?.value || "");
  };

  // const handlePaidChange = (opt) => setPaidTo(opt?.value);

  const handleCreatedByChange = (selected) => {
    setCreatedBy(selected);
    // setSelectedCollectedBylabels(selected);
    setSelectedCreatedByOption(selected);
  };

  const handleCategoryChange = (selected) => {
    setCategory(selected?.value || "");
    setSelectedCategory(selected.label);
  };

  const selectedCategoryOption =
    categoryOptions?.find((opt) => opt.value === category) || null;

  const handleSubCategoryChange = (selected) => {
    setSelectedSubCategoryOptions(selected);
    setSubCategory(selected?.value || "");
    setSelectedSubCategory(selected?.label || "");
  };

  const validateFilters = () => {
    let isValid = true;

    setEndDateError("");
    setStartDateError("");
    setMinAmountError("");
    setMaxAmountError("");

    if (period?.value === "CUSTOM") {
      if (!startDate) {
        setStartDateError("Please select start date");
        isValid = false;
      }

      if (!endDate) {
        setEndDateError("Please select end date");
        isValid = false;
      }
    }

    if (minAmount !== "" && Number(minAmount) <= 0) {
      setMinAmountError("Enter valid amount");
      isValid = false;
    }

    if (maxAmount !== "" && Number(maxAmount) <= 0) {
      setMaxAmountError("Enter valid amount");
      isValid = false;
    }

    if (
      minAmount !== "" &&
      maxAmount !== "" &&
      Number(minAmount) > 0 &&
      Number(maxAmount) > 0 &&
      Number(maxAmount) < Number(minAmount)
    ) {
      setMaxAmountError("Enter valid amount");
      isValid = false;
    }

    return isValid;
  };

  const handleFilterBills = () => {
    if (!state.login?.selectedHostel_Id) return;

    if (!validateFilters()) {
      return;
    }

    const payload = {
      hostelId: state.login.selectedHostel_Id,

      categoryId: category || "",
      categoryLabel: selectedCategory || "",

      subCategoryId: subCategory || "",
      subCategoryLabel: selectedSubCategory || "",

      paymentMode: paymentMode || "",

      createdBy: createdBy?.value || "",
      createdByLabel: createdBy?.label || "",

      period: period?.value && period?.value !== "CUSTOM" ? period.value : "",

      startDate:
        period?.value === "CUSTOM" && startDate
          ? dayjs(startDate).format("DD-MM-YYYY")
          : "",

      endDate:
        period?.value === "CUSTOM" && endDate
          ? dayjs(endDate).format("DD-MM-YYYY")
          : "",

      minAmount: minAmount ? Number(minAmount) : "",

      maxAmount: maxAmount ? Number(maxAmount) : "",

      vendorId: selectedVendor?.value || "",
      vendorName: selectedVendor?.label || "",

      paymentStatus: selectedBillStatus?.value || "",

      page: 1,
      size: size,
    };

    dispatch({
      type: "SET_EXPENSE_FILTERS",
      payload,
    });

    dispatch({
      type: "EXPENSELIST",
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

  const handleFilterClose = () => {
    handleFilterBills();
    handleClose();
  };

  return (
    <div>
      {show && (
        <div
          className="fixed inset-0 bg-black/30 z-[1040]"
          onClick={handleFilterClose}
        />
      )}

      <div
        className={`
      fixed top-0 right-0 h-screen w-[400px] max-w-[90vw]
      bg-white shadow-xl z-[1050]
      flex flex-col
      transition-transform duration-300 ease-in-out
      ${show ? "translate-x-0" : "translate-x-full"}
    `}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-[#E0E0E0] flex-shrink-0">
          <div className="flex items-center text-[#222222] text-[20px] font-semibold font-gilroy">
            <Filter className="mr-2" size="20" color="#364153" />
            Filter
          </div>

          <IoCloseOutline
            onClick={handleClose}
            className="text-[#FF0000] text-[20px] cursor-pointer"
          />
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-2 show-scrolls">
          <div className="mb-3 font-gilroy">
            <div className="mb-2">
              <label className="block mb-2 text-[12px] text-[#6B7280] font-gilroy">
                Vendor
              </label>

              <Select
                // isDisabled
                closeMenuOnSelect={true}
                hideSelectedOptions={false}
                options={vendorOptions}
                styles={selectStyles}
                placeholder="Select Vendor"
                value={selectedVendor}
                onChange={(selected) => setSelectedVendor(selected)}
              />
            </div>

            <div className="mb-2">
              <label className="block mb-2 text-[12px] text-[#6B7280] font-gilroy">
                Payment Status
              </label>

              <Select
                // isDisabled
                closeMenuOnSelect={true}
                hideSelectedOptions={false}
                options={paymentStatusOptions}
                styles={selectStyles}
                placeholder="Select Status"
                value={selectedBillStatus}
                onChange={(selected) => setSelectedBillStatus(selected)}
              />
            </div>

            <div className="mb-2">
              <label className="block mb-2 text-[12px] text-[#6B7280] font-gilroy">
                Category
              </label>

              <Select
                closeMenuOnSelect={true}
                hideSelectedOptions={false}
                options={categoryOptions}
                value={selectedCategoryOption}
                onChange={handleCategoryChange}
                styles={selectStyles}
                placeholder="Select Category"
              />
            </div>

            <div className="mb-2">
              <label className="block mb-2 text-[12px] text-[#6B7280] font-gilroy">
                Sub Category
              </label>

              <Select
                closeMenuOnSelect={true}
                hideSelectedOptions={false}
                options={subCategoryOptions}
                value={selectedSubCategoryOptions}
                onChange={handleSubCategoryChange}
                styles={selectStyles}
                placeholder="Select Sub Category"
              />
            </div>

            <div className="mb-2">
              <label className="block mb-2 text-[12px] text-[#6B7280] font-gilroy">
                Period
              </label>

              <Select
                styles={selectStyles}
                value={selectedPeriodOption}
                onChange={handlePeriodChange}
                options={periodOptions}
                placeholder="Select Period"
              />

              {period?.value === "CUSTOM" && (
                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                  <div className="flex-1 mb-3">
                    <label className="block font-gilroy font-medium text-[12px] text-[#4B4B4B] mb-1.5">
                      Start Date
                    </label>

                    <div className="datepicker-wrapper relative w-full text-[12px]">
                      <DatePicker
                        className="w-full !h-[39px] cursor-pointer font-gilroy text-[12px]"
                        format="DD/MM/YYYY"
                        placeholder="Start Date"
                        value={startDate ? dayjs(startDate) : null}
                        onChange={(date) => {
                          setStartDate(date);
                          setEndDate(null);
                          setStartDateError("");
                        }}
                        disabledDate={(current) =>
                          current && current > dayjs().endOf("day")
                        }
                        getPopupContainer={(triggerNode) =>
                          triggerNode.closest(".datepicker-wrapper")
                        }
                      />
                    </div>

                    {startDateError && (
                      <ErrorMessage message={startDateError} type="error" />
                    )}
                  </div>

                  <div className="flex-1 mb-3">
                    <label className="block font-gilroy font-medium text-[12px] text-[#4B4B4B] mb-1.5">
                      End Date
                    </label>

                    <div className="datepicker-wrapper relative w-full">
                      <DatePicker
                        className="w-full !h-[39px] cursor-pointer font-gilroy text-[12px]"
                        format="DD/MM/YYYY"
                        placeholder="End Date"
                        value={endDate ? dayjs(endDate) : null}
                        onChange={(date) => {
                          setEndDate(date);
                          setEndDateError("");
                        }}
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

                    {endDateError && (
                      <div className="flex justify-center my-2">
                        <ErrorMessage message={endDateError} type="warning" />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="mb-2">
              <label className="block mb-2 text-[12px] text-[#6B7280] font-gilroy">
                Payment Mode
              </label>

              <Select
                closeMenuOnSelect={true}
                hideSelectedOptions={false}
                options={paymentModeOptions}
                value={selectedPaymentModeOptions}
                onChange={handlePaymentMode}
                styles={selectStyles}
                placeholder="Select Payment Mode"
              />
            </div>

            <div className="mb-2">
              <label className="block mb-2 text-[12px] text-[#6B7280] font-gilroy">
                Created By
              </label>

              <Select
                closeMenuOnSelect={true}
                hideSelectedOptions={false}
                styles={selectStyles}
                value={selectedCreatedByOption}
                onChange={handleCreatedByChange}
                options={createdByOptions}
                placeholder="Select"
              />
            </div>

            <div className="mb-2">
              <label
                style={{ color: "#222222", fontSize: 15, fontWeight: 600 }}
              >
                Other Filter
              </label>
            </div>

            <div className="mt-1 mb-3">
              <div className="flex gap-2">
                <div className="w-1/2">
                  <input
                    type="number"
                    placeholder="₹Min"
                    min="0"
                    value={minAmount}
                    onChange={(e) => {
                      setMinAmount(e.target.value);
                      setMinAmountError("");
                    }}
                    className={inputClass}
                  />

                  {minAmountError && (
                    <div className="mt-1">
                      <ErrorMessage message={minAmountError} type="error" />
                    </div>
                  )}
                </div>

                <div className="w-1/2">
                  <input
                    type="number"
                    placeholder="₹Max"
                    min={minAmount || "0"}
                    value={maxAmount}
                    onChange={(e) => {
                      setMaxAmount(e.target.value);
                      setMaxAmountError("");
                    }}
                    className={inputClass}
                  />

                  {maxAmountError && (
                    <div className="mt-1">
                      <ErrorMessage message={maxAmountError} type="error" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {formLoading && (
          <div className="absolute inset-0 z-[1060] flex items-center justify-center bg-white/20">
            <div
              className="
            w-10 h-10
            border-4 border-[#1E45E1]
            border-r-transparent
            rounded-full
            animate-spin
          "
            />
          </div>
        )}

        <div className="flex-shrink-0 flex items-center justify-between gap-3 px-5 py-[15px] border-t border-[#E0E0E0] bg-white z-10">
          <button
            type="button"
            onClick={() => {
              setPeriod("");
              setPaymentMode([]);
              setCreatedBy([]);
              setCategory("");
              setSelectedVendor("");
              setSelectedBillStatus("");
            }}
            className="
          w-1/2
          h-[38px]
          rounded-md
          border border-[#D9D9D9]
          bg-transparent
          text-black
          font-gilroy
          text-[14px]
          font-medium
          hover:bg-[#F5F5F5]
          transition-colors
        "
          >
            Reset
          </button>

          <button
            type="button"
            onClick={handleFilterBills}
            className="
          w-1/2
          h-[38px]
          rounded-md
          border border-[#1E45E1]
          bg-[#1E45E1]
          text-white
          font-gilroy
          text-[14px]
          font-medium
          hover:bg-[#1638B5]
          transition-colors
        "
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
ExpenseFilter.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  size: PropTypes.any,
  page: PropTypes.any,
  startDate: PropTypes.any,
  endDate: PropTypes.any,
};

export default withErrorBoundary(ExpenseFilter);

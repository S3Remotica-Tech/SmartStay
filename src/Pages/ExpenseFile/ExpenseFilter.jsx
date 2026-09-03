/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Button, Form, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { components } from "react-select";
import { FaCheck } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import PropTypes from "prop-types";
import { Filter } from "iconsax-react";
import withErrorBoundary from "../../Hoc/WithErrorBountry";

const selectStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "45px",
    height: "30px",
    border: "1px solid #D9D9D9",
    borderRadius: "8px",
    fontSize: "15px",
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
function ExpenseFilter({ show, handleClose, size, page, startDate, endDate }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [period, setPeriod] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [paymentMode, setPaymentMode] = useState([]);
  const [createdBy, setCreatedBy] = useState([]);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [selectedBillStatus, setSelectedBillStatus] = useState(null);
  const [selectedCollectedBylabels, setSelectedCollectedBylabels] = useState(
    [],
  );

  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);

  const filterOptionsData = useSelector(
    (state) => state.ExpenseList.expenseList?.filterOptions,
  );

  const categoryOptions =
    filterOptionsData?.category?.map((item) => ({
      label: item.name,
      value: item.type,
    })) || [];

  const vendorOptions =
    filterOptionsData?.vendors?.map((item) => ({
      label: item.label,
      value: item.id,
    })) || [];

  const paymentStatus =
    filterOptionsData?.paymentStatus?.map((item) => ({
      label: item.label,
      value: item.id,
    })) || [];

  const subCategoryOptions =
    filterOptionsData?.subCategory?.map((item) => ({
      label: item.subCategoryName,
      value: item.subCategoryId,
    })) || [];

  const paymentModeOptions =
    filterOptionsData?.paymentMode?.map((item) => ({
      label: item,
      value: item,
    })) || [];

  const createdByOptions =
    filterOptionsData?.createdBy?.map((item) => ({
      label: item.userName,
      value: item.userId,
    })) || [];

  const periodOptions =
    filterOptionsData?.period?.map((item) => ({
      label: item.label,
      value: item.id,
    })) || [];

  const filters = state.ExpenseList?.expenseFilters;

  useEffect(() => {
    if (show && filters) {
      setCategory(filters.categoryId || "");

      setPaymentMode(filters.paymentMode || []);
      setCreatedBy(filters.createdBy || []);
      setPeriod(filters.period || null);
      const selectedVendorOption = vendorOptions?.find(
        (option) => String(option.value) === String(filters.vendorId),
      );
      setSelectedVendor(selectedVendorOption);

      const selectedPaymentStaus = paymentStatus?.find(
        (option) => String(option.value) === String(filters.paymentStatus),
      );

      setSelectedBillStatus(selectedPaymentStaus);
    }
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
    setPeriod(opt?.value);
  };
  const handlePaymentMode = (selected) => {
    setPaymentMode(selected.map((opt) => opt.value));
  };

  // const handlePaidChange = (opt) => setPaidTo(opt?.value);

  const handleCreatedByChange = (selected) => {
    setCreatedBy(selected.map((opt) => opt.value));
    setSelectedCollectedBylabels(selected.map((opt) => opt.label));
  };

  const handleCategoryChange = (selected) => {
    setCategory(selected?.value || "");
    setSelectedCategory(selected.label);
  };

  const selectedCategoryOption =
    categoryOptions?.find((opt) => opt.value === category) || null;

  const handleSubCategoryChange = (selected) => {
    setSubCategory(selected.map((opt) => opt.value));
    setSelectedSubCategory(selected.map((opt) => opt.label));
  };

  const selectedSubCategoryOptions = subCategoryOptions?.filter((opt) =>
    subCategory?.includes(opt.value),
  );

  const selectedPaymentModeOptions = paymentModeOptions?.filter((opt) =>
    paymentMode?.includes(opt.value),
  );

  const selectedPeriodOption =
    periodOptions?.find((opt) => opt.value === period) || null;

  const selectedCreatedByOption = createdByOptions?.filter((opt) =>
    createdBy?.includes(opt.value),
  );

  const handleFilterBills = () => {
    if (!state.login?.selectedHostel_Id) return;

    const expnseFilter = {
      categoryId: category?.length ? category : undefined,
      categoryLabel: selectedCategory?.length ? selectedCategory : undefined,
      subCategory: subCategory?.length ? subCategory : undefined,
      subCategoryLabel: selectedSubCategory?.length
        ? selectedSubCategory
        : undefined,
      paymentMode: paymentMode?.length ? paymentMode : undefined,

      createdBy: createdBy?.length ? createdBy : undefined,

      period: period ? period : "",
      createdByLabels: selectedCollectedBylabels,

      startDate: period ? undefined : startDate,
      endDate: period ? undefined : endDate,
      vendorId: selectedVendor?.value,
      vendorName: selectedVendor?.label,
      paymentStatus: selectedBillStatus?.value,
    };

    console.log("expnseFilter", expnseFilter);

    dispatch({
      type: "SET_EXPENSE_FILTERS",
      payload: {
        categoryName: selectedCategory?.length ? selectedCategory : undefined,
        categoryId: category?.length ? category : undefined,
      },
    });

    dispatch({
      type: "EXPENSELIST",
      payload: {
        hostelId: state.login.selectedHostel_Id,
        categoryId: category?.length ? category : undefined,
        page: 1,
        size: size,
      },
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
            <div className="mb-4">
              <label className="block mb-2 text-[12px] text-[#6B7280] font-gilroy">
                Vendor
              </label>

              <Select
                isDisabled
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                options={vendorOptions}
                styles={selectStyles}
                placeholder="Select Vendor"
                value={selectedVendor}
                onChange={(selected) => setSelectedVendor(selected)}
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-[12px] text-[#6B7280] font-gilroy">
                Payment Status
              </label>

              <Select
                isDisabled
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                options={paymentStatus}
                styles={selectStyles}
                placeholder="Select Status"
                value={selectedBillStatus}
                onChange={(selected) => setSelectedBillStatus(selected)}
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-[12px] text-[#6B7280] font-gilroy">
                Category
              </label>

              <Select
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                options={categoryOptions}
                value={selectedCategoryOption}
                onChange={handleCategoryChange}
                styles={selectStyles}
                placeholder="Select Category"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-[12px] text-[#6B7280] font-gilroy">
                Sub Category
              </label>

              <Select
                isDisabled
                // isMulti isDisabled
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                options={subCategoryOptions}
                value={selectedSubCategoryOptions}
                onChange={handleSubCategoryChange}
                styles={selectStyles}
                components={{
                  Option: CheckboxOption,
                }}
                placeholder="Select Sub Category"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-[12px] text-[#6B7280] font-gilroy">
                Period
              </label>

              <Select
                isDisabled
                styles={selectStyles}
                value={selectedPeriodOption}
                onChange={handlePeriodChange}
                options={periodOptions}
                placeholder="Select Period"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-[12px] text-[#6B7280] font-gilroy">
                Payment Mode
              </label>

              <Select
                isMulti
                isDisabled
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                options={paymentModeOptions}
                value={selectedPaymentModeOptions}
                onChange={handlePaymentMode}
                styles={selectStyles}
                components={{
                  Option: CheckboxOption,
                }}
                placeholder="Select Payment Mode"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-[12px] text-[#6B7280] font-gilroy">
                Created By
              </label>

              <Select
                isMulti
                isDisabled
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                styles={selectStyles}
                value={selectedCreatedByOption}
                onChange={handleCreatedByChange}
                options={createdByOptions}
                components={{
                  Option: CheckboxOption,
                }}
                placeholder="Select"
              />
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

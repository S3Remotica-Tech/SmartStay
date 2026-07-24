/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Button, Form, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { components } from "react-select";
import { FaCheck } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
// import ErrorMessage from '../../Components/ErrorMessage'
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
function ExpenseFilter({ show, handleClose, size, startDate, endDate }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [period, setPeriod] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [paymentMode, setPaymentMode] = useState([]);
  // const [paidTo, setPaidTo] = useState([]);
  const [createdBy, setCreatedBy] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [selectedCollectedBylabels, setSelectedCollectedBylabels] = useState(
    [],
  );
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);

  const filterOptionsData = useSelector(
    (state) => state.reports?.getExpenseRegister?.filtersData,
  );

  const categoryOptions =
    filterOptionsData?.category?.map((item) => ({
      label: item.categoryName,
      value: item.categoryId,
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

  const filters = state.reports?.expenseRegisterFilters;

  useEffect(() => {
    if (show && filters) {
      setCategory(filters.category || []);
      setPaymentMode(filters.paymentMode || []);
      setCreatedBy(filters.createdBy || []);
      setPeriod(filters.period || null);
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
    setCategory(selected.map((opt) => opt.value));
    setSelectedCategory(selected.map((opt) => opt.label));
  };

  const selectedCategoryOptions = categoryOptions?.filter((opt) =>
    category?.includes(opt.value),
  );

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
      category: category?.length ? category : undefined,
      categoryLabel: selectedCategory?.length ? selectedCategory : undefined,
      subCategory: subCategory?.length ? subCategory : undefined,
      subCategoryLabel: selectedSubCategory?.length
        ? selectedSubCategory
        : undefined,
      paymentMode: paymentMode?.length ? paymentMode : undefined,

      createdBy: createdBy?.length ? createdBy : undefined,

      period: period ? period : "",
      createdByLabels: selectedCollectedBylabels,

      page: 1,
      size: size,
      startDate: period ? undefined : startDate,
      endDate: period ? undefined : endDate,
    };

    dispatch({
      type: "SET_EXPENSE_REGISTER_FILTERS",
      payload: expnseFilter,
    });

    const hasFilters = Object.values(expnseFilter).some(
      (v) => v !== undefined && v !== "" && v !== 0,
    );

    if (!hasFilters) return;

    dispatch({
      type: "GET_REPORTS_EXPENSE_REGISTER_SAGA",
      payload: {
        hostelId: state.login.selectedHostel_Id,
        filters: expnseFilter,
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

  return (
    <div>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header>
          <Offcanvas.Title
            style={{
              color: "#222222",
              fontSize: 20,
              fontFamily: "Gilroy",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
            }}
          >
            {" "}
            <Filter className="me-2" size="20" color="#364153" />
            Filter
          </Offcanvas.Title>

          <IoCloseOutline
            onClick={handleClose}
            style={{ color: "#FF0000", fontSize: 20, cursor: "pointer" }}
          />
        </Offcanvas.Header>

        <Offcanvas.Body className="pt-0">
          <div className="mb-3" style={{ fontFamily: "Gilroy" }}>
            {/* <Form.Group className="mt-2 mb-3">
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    width: '100%',
                                    marginBottom: 5
                                }}
                            >
                                <Form.Label
                                    style={{
                                        fontFamily: 'Gilroy',
                                        fontWeight: 500,
                                        fontStyle: 'normal',
                                        fontSize: '12px',
                                        letterSpacing: '0',
                                        marginBottom: 0,
                                        padding: 0, color: "#4B4B4B"

                                    }}
                                >
                                    Tenant
                                </Form.Label>


                            </div>

                            <Form.Control
                                style={{ marginTop: 10, fontSize: 14, fontWeight: 600, padding: "8px 14px", fontFamily: "Gilroy", boxShadow: "none", border: "1px solid #D9D9D9" }}
                                type="text"
                                placeholder="Enter Tenant Name"

                                value={tenantName}
                                onChange={handleTenantChange}
                            />






                        </Form.Group> */}

            <div className="mb-3">
              <label
                style={{ color: "#222222", fontSize: 15, fontWeight: 600 }}
              >
                System Filter
              </label>
            </div>

            <Form.Group className="mb-3">
              <Form.Label className="text-muted" style={{ fontSize: 12 }}>
                Category
              </Form.Label>

              <Select
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                options={categoryOptions}
                value={selectedCategoryOptions}
                onChange={handleCategoryChange}
                styles={selectStyles}
                components={{ Option: CheckboxOption }}
                placeholder="Select Category"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-muted" style={{ fontSize: 12 }}>
                Sub Category
              </Form.Label>

              <Select
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                options={subCategoryOptions}
                value={selectedSubCategoryOptions}
                onChange={handleSubCategoryChange}
                styles={selectStyles}
                components={{ Option: CheckboxOption }}
                placeholder="Select Sub Category"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-muted" style={{ fontSize: 12 }}>
                Period
              </Form.Label>
              <Select
                styles={selectStyles}
                value={selectedPeriodOption}
                onChange={handlePeriodChange}
                options={periodOptions}
                placeholder="Select Period "
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-muted" style={{ fontSize: 12 }}>
                Payment Mode
              </Form.Label>

              <Select
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                options={paymentModeOptions}
                value={selectedPaymentModeOptions}
                onChange={handlePaymentMode}
                styles={selectStyles}
                components={{ Option: CheckboxOption }}
                placeholder="Select Payment Mode"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-muted" style={{ fontSize: 12 }}>
                Created By
              </Form.Label>
              <Select
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                styles={selectStyles}
                value={selectedCreatedByOption}
                onChange={handleCreatedByChange}
                options={createdByOptions}
                components={{ Option: CheckboxOption }}
                placeholder="Select"
              />
            </Form.Group>
          </div>
        </Offcanvas.Body>

        {formLoading && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "transparent",
              opacity: 0.75,
              zIndex: 10,
            }}
          >
            <div
              style={{
                borderTop: "4px solid #1E45E1",
                borderRight: "4px solid transparent",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                animation: "spin 1s linear infinite",
              }}
            ></div>
          </div>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "15px 20px",
            borderTop: "1px solid #e0e0e0",
            position: "sticky",
            bottom: 0,
            background: "#fff",
            zIndex: 10,
          }}
        >
          <Button
            onClick={() => {
              setPeriod([]);
              setPaymentMode([]);
              // setPaidTo([]);
              setCreatedBy([]);
              setCategory([]);
            }}
            style={{
              backgroundColor: "transparent",
              border: "1px solid #D9D9D9",
              color: "black",
              fontFamily: "Gilroy",
              width: "48%",
            }}
          >
            Reset
          </Button>
          <Button
            onClick={handleFilterBills}
            style={{
              backgroundColor: "#1E45E1",
              width: "48%",
              fontFamily: "Gilroy",
            }}
          >
            Apply
          </Button>
        </div>
      </Offcanvas>
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

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
import {
  fieldClass,
  fieldLabelClass,
  fieldSelectStyles,
} from "../../Utils/FieldStyles";

function TenantListFilter({ show, handleClose, size }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [selectedTenantStatusOptions, setSelectedTenantStatusOptions] =
    useState([]);

  const [period, setPeriod] = useState(null);
  const [sharingType, setSharingType] = useState(null);

  const [tenantName, setTenantName] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const savedFilters = state.UsersList?.tenantFilters;

  useEffect(() => {
    if (show && savedFilters) {
      setTenantName(savedFilters.search || "");

      const selectedStatusOptions = tenantStatusOptions.filter((option) =>
        savedFilters.status?.includes(option.value),
      );
      setSelectedTenantStatusOptions(selectedStatusOptions);
      const selectedPeriod = periodOptions.find(
        (option) => option.value === savedFilters.period,
      );
      setPeriod(selectedPeriod || null);

      const selecteSharingType = SharingTypeOptions.find(
        (option) => option.value === savedFilters?.sharingType,
      );

      setSharingType(selecteSharingType);
    }
  }, [show]);


  const filterOptionsData = useSelector(
    (state) => state.UsersList?.Users?.filterOptions,
  );

  const tenantStatusOptions =
    filterOptionsData?.status?.map((item) => ({
      label: item.name,
      value: item.type,
    })) || [];

  const periodOptions =
    filterOptionsData?.periods?.map((item) => ({
      label: item.name,
      value: item.type,
    })) || [];

  const SharingTypeOptions =
    filterOptionsData?.sharingType?.map((item) => ({
      label: item.name,
      value: item.type,
    })) || [];

  const handleTenantChange = (e) => {
    setTenantName(e.target.value);
  };

  useEffect(() => {
    // setFloor(null);
  }, [sharingType]);

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

  const handleTenantStatusChange = (selectedOptions) => {
    if (!selectedOptions || selectedOptions.length === 0) {
      setSelectedTenantStatusOptions([]);

      return;
    }

    const isAllSelected = selectedOptions.some((opt) => opt.value === "ALL");

    if (isAllSelected) {
      const allOption = selectedOptions.find((opt) => opt.value === "ALL");
      setSelectedTenantStatusOptions([allOption]);
    } else {
      setSelectedTenantStatusOptions(selectedOptions);
    }
  };

  const handleChangeSharingType = (selectedOptions) => {
    setSharingType(selectedOptions);
  };

  const selectedSharingOptions =
    SharingTypeOptions.find((opt) => opt?.value === sharingType?.value) || null;

  const handleFilterBills = () => {
    if (!state.login?.selectedHostel_Id) return;
    const filters = {
      search: tenantName?.trim() ? tenantName : undefined,
      status: selectedTenantStatusOptions.map((opt) => opt.value),
      tenantStatusLabel: selectedTenantStatusOptions.map((opt) => opt.label),
      period: period?.value ? period?.value : "",
      periodLabel: period?.label ? period?.label : "",
      sharingType: sharingType?.value,
      sharingTypeLabel: sharingType?.label,
    };

    dispatch({
      type: "SET_TENANT_TABLE_FILTERS",
      payload: filters,
    });

    const payload = {
      hostel_id: state.login.selectedHostel_Id,
      page: 1,
      size: size,

      ...(tenantName?.trim() && { name: tenantName }),

      ...(selectedTenantStatusOptions?.length && {
        type: selectedTenantStatusOptions
          .filter((opt) => opt.value !== "ALL")
          .map((opt) => opt.value)
          .join(","),
      }),

      ...(period?.value && { period: period.value }),

      ...(selectedSharingOptions?.value && {
        sharingType: selectedSharingOptions.value,
      }),
    };
    // const isFilterEmpty =
    //   !payload.name && !payload.type && !payload.period && !payload.sharingType;

    // if (isFilterEmpty) {
    //   return;
    // }

    dispatch({
      type: "USERLIST",
      payload: payload,
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
    if (state.UsersList?.UserListStatusCode === 200) {
      setFormLoading(false);
    }
  }, [state.UsersList?.UserListStatusCode]);

  const handleFilterClose = () => {
    handleFilterBills();
    handleClose();
  };

  return (
    <div>
      <Offcanvas data-testid="tenant-list-filter-filter-system-filter-tenant-drawer" show={show} onHide={handleFilterClose} placement="end">
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

          <IoCloseOutline data-testid="tenant-list-filter-close-icon"
            onClick={handleClose}
            style={{ color: "#FF0000", fontSize: 20, cursor: "pointer" }}
          />
        </Offcanvas.Header>

        <Offcanvas.Body className="pt-0">
          <div className="mb-3" style={{ fontFamily: "Gilroy" }}>
            <Form.Group className="mt-2 mb-3">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  marginBottom: 5,
                }}
              >
                <Form.Label className={fieldLabelClass}
                 
                >
                  Tenant
                </Form.Label>
              </div>

              <Form.Control data-testid="tenant-list-filter-tenant-name-input" className={fieldClass()}
               
                type="text"
                placeholder="Enter Tenant Name"
                value={tenantName}
                onChange={handleTenantChange}
              />
            </Form.Group>

            <div className="mb-3">
              <label
                style={{ color: "#222222", fontSize: 15, fontWeight: 600 }}
              >
                System Filter
              </label>
            </div>
            <Form.Group className="mb-3">
              <Form.Label className={fieldLabelClass}>
                Tenant Status
              </Form.Label>
              <div data-testid="tenant-list-filter-tenant-status-select" className="contents"><Select
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                options={tenantStatusOptions}
                value={selectedTenantStatusOptions}
                onChange={handleTenantStatusChange}
                styles={fieldSelectStyles()}
                components={{ Option: CheckboxOption }}
                placeholder="Select Status"
              /></div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className={fieldLabelClass}>
                Period
              </Form.Label>
              <div data-testid="tenant-list-filter-period-select" className="contents"><Select
                styles={fieldSelectStyles()}
                placeholder="Select"
                value={period}
                onChange={setPeriod}
                options={periodOptions}
              /></div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className={fieldLabelClass}>
                Sharing Type
              </Form.Label>
              <div data-testid="tenant-list-filter-sharing-type-select" className="contents"><Select
                // isDisabled
                styles={fieldSelectStyles()}
                placeholder="Select Share Type..."
                value={selectedSharingOptions}
                onChange={handleChangeSharingType}
                options={SharingTypeOptions}
              /></div>
            </Form.Group>

            {/* <Form.Group className="mb-3">
              <Form.Label className={fieldLabelClass}>Floor</Form.Label>

              <Select
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                styles={fieldSelectStyles()}
                placeholder="Select floor(s)"
                value={floor}
                onChange={setFloor}
                options={floorOptions}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className={fieldLabelClass}>Room</Form.Label>

              <Select
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                styles={fieldSelectStyles()}
                placeholder="Select room(s)"
                value={room}
                onChange={setRoom}
                options={roomOptions}
              />
            </Form.Group> */}
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
          <Button data-testid="tenant-list-filter-reset-btn"
            onClick={() => {
              // setTenantStatus([]);
              setPeriod(null);
              setSharingType(null);
              // setFloor([]);
              // setRoom([]);
              setTenantName("");
              setSelectedTenantStatusOptions([]);
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
          <Button data-testid="tenant-list-filter-apply-btn"
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
TenantListFilter.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  size: PropTypes.any.isRequired,
};

export default withErrorBoundary(TenantListFilter);

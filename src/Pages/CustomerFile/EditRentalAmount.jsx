/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { Modal, Form, Button, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { CloseCircle, MessageQuestion } from "iconsax-react";
import Select from "react-select";
import ErrorMessage from "../../Components/ErrorMessage";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import PropTypes from "prop-types";
// import { TypeSpecimenRounded } from "@mui/icons-material";

function EditRentalAmount({ show, handleClose }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [monthlyRent, setMonthlyRent] = useState("");
  const [monthlyRentError, setMonthlyRentError] = useState("");
  const [loading, setLoading] = useState(false);
  const [effectiveFrom, setEffectiveFrom] = useState("");
  const [effectiveFromError, setEffectiveFromError] = useState("");
  const [reason, setReason] = useState(null);
  const [types, setTypes] = useState(null);
  const rentInputRef = useRef(null);
  const dateRef = useRef(null);
  const typeRef = useRef(null);
  // const Ref = useRef(null)
  const [IsChangedError, setIsChangedError] = useState("");

  const [typeError, setTypeError] = useState("");

  const CustomerOverView = state.UsersList.customerdetails;

  // const reasonOptions = [
  //     { value: "Annual Rent Revision", label: "Annual Rent Revision" },
  //     { value: "Room Upgrade / Change", label: "Room Upgrade / Change" },
  //     { value: "Additional Amenities Added", label: "Additional Amenities Added" },
  //     { value: "Electricity / Utility Cost Updated", label: "Electricity / Utility Cost Updated" },
  //     {
  //         value: "Others",
  //         label: "Others",
  //         color: "#1E45E1"
  //     },
  // ];

  const type = [
    { value: "Edit-Rent", label: "Edit Rent" },
    { value: "Rent-Revision", label: "Rent Revision" },
  ];
  // const [isOthers, setIsOthers] = useState(false);

  // const handleReasonChange = (selectedOption) => {
  //     dispatch({ type: 'REMOVE_TENANT_UPDATE_ERROR' });

  //     if (selectedOption?.value === "Others") {
  //         setIsOthers(true);
  //         setReason("");
  //     } else {
  //         setIsOthers(false);
  //         setReason(selectedOption.value);
  //     }
  // };

  const handleReasonChange = (e) => {
    setIsChangedError("");
    dispatch({ type: "REMOVE_TENANT_UPDATE_ERROR" });
    setReason(e.target.value);
  };

  const handleTypeChange = (selectedOption) => {
    setIsChangedError("");
    setMonthlyRentError("");
    setEffectiveFromError("");
    setTypeError("");
    dispatch({ type: "REMOVE_TENANT_UPDATE_ERROR" });

    setTypes(selectedOption.value);
  };

  const handleMonthlyRentChange = (e) => {
    setIsChangedError("");
    dispatch({ type: "REMOVE_TENANT_UPDATE_ERROR" });
    const value = e.target.value;

    if (/^[0-9\b]*$/.test(value)) {
      if (value === "" || Number(value) > 0) {
        setMonthlyRent(value);
        setMonthlyRentError("");
      }
    }
  };

  useEffect(() => {
    dispatch({
      type: "SETTINGS_GET_RECURRING",
      payload: { hostelId: state.login.selectedHostel_Id },
    });
  }, []);

  const handleEffectiveFromChange = (date, dateString) => {
    dispatch({ type: "REMOVE_TENANT_UPDATE_ERROR" });
    setEffectiveFrom(dateString);
    setEffectiveFromError("");
  };

  useEffect(() => {
    if (state.UsersList?.updateTenantError) {
      setLoading(false);
    }
  }, [state.UsersList?.updateTenantError]);

  const handleSubmit = () => {
    setIsChangedError("");
    dispatch({ type: "REMOVE_TENANT_UPDATE_ERROR" });
    let isValid = true;

    if (!monthlyRent || Number(monthlyRent) <= 0) {
      setMonthlyRentError("Please Enter Monthly Rent");
      rentInputRef.current?.focus();
      isValid = false;
    }

    if (types === "Rent-Revision" && !effectiveFrom) {
      setEffectiveFromError("Please Select Date");
      dateRef.current?.focus();
      isValid = false;
    }

    if (!types) {
      setTypeError("Please Select an Type");
      typeRef.current?.focus();
      isValid = false;
    }

    if (!isValid) return;
    let formattedDate = "";

    if (effectiveFrom && dayjs(effectiveFrom, "DD/MM/YYYY").isValid()) {
      formattedDate = dayjs(effectiveFrom, "DD/MM/YYYY").format("DD-MM-YYYY");
    }

    const oldAmount = Number(CustomerOverView.hostelInfo.monthlyRent);

    const newAmount = Number(monthlyRent);

    if (oldAmount === newAmount) {
      setIsChangedError("No changes detected in Rent Amount");
      return;
    }

    dispatch({
      type: "EDITAMOUNTDETAILS",
      payload: {
        hostelId: state.login.selectedHostel_Id,
        bookingId: CustomerOverView?.bookingId,
        updateInfo: {
          effectiveDate: formattedDate,
          reason: reason || "",
          newRent: monthlyRent,
        },
      },
    });

    setLoading(true);
  };

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setLoading(false);

      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 3000);
    }
  }, [state.createAccount?.networkError]);

  useEffect(() => {
    if (state?.UsersList.editAmountSuccessStatusCode === 200) {
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "REMOVE_EDIT_AMOUNT_DETAILS" });
      }, 100);
    }
  }, [state?.UsersList.editAmountSuccessStatusCode]);

  const billStartDate =
    state?.Settings?.SettingsBillsGetRecurring?.billStartDate;

  const disabledDate = (current) => {
    if (!current) return false;

    const today = dayjs();

    let cycleMonth = today.month();

    if (today.date() >= billStartDate) {
      cycleMonth = today.add(1, "month").month();
    }

    const start = dayjs()
      .year(today.year() + (cycleMonth < today.month() ? 1 : 0))
      .month(cycleMonth)
      .date(billStartDate)
      .startOf("day");

    const end = start.add(3, "month").subtract(1, "day").endOf("day");

    return current.isBefore(start, "day") || current.isAfter(end, "day");
  };

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      dispatch({
        type: "SETTINGS_GET_RECURRING",
        payload: { hostelId: state.login.selectedHostel_Id },
      });
    }
  }, [state.login.selectedHostel_Id]);

  return (
    <div className="modal show block relative">
      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Dialog className="m-0 p-0 w-full" style={{ maxWidth: 850 }}>
          {/* HEADER */}
          <Modal.Header className="border border-[#E7E7E7] flex justify-between items-center">
            <Modal.Title className="!text-[20px] text-[#222] !font-gilroy !font-semibold">
              Edit Rental Amount
            </Modal.Title>

            <CloseCircle
              size="24"
              color="#000"
              onClick={handleClose}
              className="cursor-pointer"
            />
          </Modal.Header>

          {/* BODY */}
          <Modal.Body>
            <div className="flex flex-col gap-1">
              {/* INFO */}
              {types === "Rent-Revision" && (
                <div>
                  <div className="flex items-center gap-1 p-2 rounded-lg border border-[#C6D1FF] bg-[#B7C2F0]">
                    <MessageQuestion size="18" color="#222" />
                    <label className="text-[11px] font-gilroy text-[#222]">
                      Rent changes will apply from next billing cycle and are
                      fully audit-logged
                    </label>
                  </div>
                </div>
              )}

              {/* TYPE */}
              <div>
                <Form.Group>
                  <Form.Label className="text-sm font-medium font-gilroy text-[#222]">
                    Type <span className="text-red-500 text-xl">*</span>
                  </Form.Label>

                  <Select
                    value={type.find((opt) => opt.value === types) || null}
                    onChange={handleTypeChange}
                    options={type}
                    placeholder="Select Type"
                    classNamePrefix="custom"
                    noOptionsMessage={() => "No Type available"}
                    styles={{
                      control: (base) => ({
                        ...base,
                        height: "50px",
                        border: "1px solid #D9D9D9",
                        borderRadius: "8px",
                        fontSize: "16px",
                        color: "#4B4B4B",
                        fontFamily: "Gilroy",
                        boxShadow: "none",
                      }),
                      option: (base, state) => ({
                        ...base,
                        cursor: "pointer",
                        fontFamily: "Gilroy",
                        backgroundColor: state.isFocused ? "#f0f0f0" : "white",
                        color:
                          state.data.value === "Others" ? "#1E45E1" : "#000",
                      }),
                      placeholder: (base) => ({
                        ...base,
                        color: "#555",
                      }),
                      indicatorSeparator: () => ({ display: "none" }),
                      menuList: (base) => ({
                        ...base,
                        maxHeight: "150px",
                        overflowY: "auto",
                        scrollbarWidth: "thin",
                        msOverflowStyle: "auto",
                      }),
                    }}
                  />

                  {typeError && (
                    <ErrorMessage message={typeError} type="error" />
                  )}
                </Form.Group>
              </div>

              {/* RENT */}
              {types && (
                <div>
                  <Form.Group>
                    <Form.Label className="text-sm font-medium font-gilroy text-[#222]">
                      New Monthly Rent{" "}
                      <span className="text-red-500 text-xl">*</span>
                    </Form.Label>

                    <FormControl
                      type="text"
                      ref={rentInputRef}
                      value={monthlyRent}
                      onChange={handleMonthlyRentChange}
                      placeholder="Enter New Rent"
                      className="h-[50px] rounded-lg border border-[#D9D9D9] text-base font-medium font-gilroy text-[#4B4B4B] focus:shadow-none"
                    />

                    {monthlyRentError && (
                      <ErrorMessage message={monthlyRentError} type="error" />
                    )}
                  </Form.Group>
                </div>
              )}

              {/* DATE */}
              {types === "Rent-Revision" && (
                <div>
                  <Form.Group>
                    <Form.Label className="text-sm font-medium font-gilroy text-[#222]">
                      Effective From{" "}
                      <span className="text-red-500 text-xl">*</span>
                    </Form.Label>

                    <div className="relative w-full">
                      <DatePicker
                        ref={dateRef}
                        picker="month"
                        format="MM/YYYY"
                        placeholder="MM/YYYY"
                        value={
                          effectiveFrom
                            ? dayjs(effectiveFrom, "DD/MM/YYYY")
                            : null
                        }
                        onChange={handleEffectiveFromChange}
                        disabledDate={disabledDate}
                        style={{
                          width: "100%",
                          height: 48,
                          cursor: "pointer",
                          fontFamily: "Gilroy",
                          border: "1px solid #D9D9D9",
                          borderRadius: 8,
                        }}
                      />
                    </div>

                    {effectiveFromError && (
                      <ErrorMessage message={effectiveFromError} type="error" />
                    )}
                  </Form.Group>
                </div>
              )}

              {/* REASON */}
              {types && (
                <div>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-sm font-medium font-gilroy text-[#222]">
                      Reason
                    </Form.Label>

                    <FormControl
                      type="text"
                      placeholder="Enter your reason"
                      value={reason}
                      onChange={handleReasonChange}
                      className="h-[50px] rounded-lg border border-[#D9D9D9] text-base font-medium font-gilroy text-[#4B4B4B] focus:shadow-none"
                    />
                  </Form.Group>
                </div>
              )}
            </div>

            {state.UsersList?.updateTenantError && (
              <ErrorMessage
                message={state.UsersList.updateTenantError}
                type="error"
              />
            )}
          </Modal.Body>

          {loading && (
            <div className="absolute inset-x-0 top-[100px] bottom-0 flex items-center justify-center opacity-75 z-10">
              <div
                className="w-10 h-10 rounded-full animate-spin"
                style={{
                  borderTop: "4px solid #1E45E1",
                  borderRight: "4px solid transparent",
                }}
              />
            </div>
          )}

          {IsChangedError && (
            <div className="flex justify-center">
              <ErrorMessage message={IsChangedError} type="error" />
            </div>
          )}

          {/* FOOTER */}
          <Modal.Footer className="border-0 pt-0">
            <div className="flex justify-end gap-3">
              <Button
                onClick={handleClose}
                className="mt-1 w-full bg-white !text-[#1E45E1] !font-gilroy !font-semibold rounded-xl px-10 py-2 !border-none"
              >
                Cancel
              </Button>

              <Button
                disabled={loading}
                onClick={handleSubmit}
                className="mt-1 w-full !bg-[#1E45E1] text-white !font-gilroy !font-semibold rounded-xl px-10 py-2"
              >
                Update
              </Button>
            </div>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </div>
  );
}
EditRentalAmount.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
export default EditRentalAmount;

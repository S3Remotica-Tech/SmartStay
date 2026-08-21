/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { Form, Button, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { CloseCircle } from "iconsax-react";
// import Select from "react-select";
import ErrorMessage from "../../Components/ErrorMessage";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import PropTypes from "prop-types";
dayjs.extend(customParseFormat);

function EditJoiningDate({ show, handleClose }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [effectiveFrom, setEffectiveFrom] = useState("");
  const [effectiveFromError, setEffectiveFromError] = useState("");
  const [IsChangedError, setIsChangedError] = useState("");
  const [reason, setReason] = useState(null);

  const dateRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const CustomerOverView = state.UsersList.customerdetails;

  const handleReasonChange = (e) => {
    setIsChangedError("");
    dispatch({ type: "REMOVE_TENANT_UPDATE_ERROR" });
    setReason(e.target.value);
  };

  const handleEffectiveFromChange = (date, dateString) => {
    setIsChangedError("");
    dispatch({ type: "REMOVE_TENANT_UPDATE_ERROR" });
    setEffectiveFrom(dateString);
    setEffectiveFromError("");
  };

  useEffect(() => {
    if (state?.UsersList.editAmountSuccessStatusCode === 200) {
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "REMOVE_EDIT_AMOUNT_DETAILS" });
      }, 100);
    }
  }, [state?.UsersList.editAmountSuccessStatusCode]);

  useEffect(() => {
    if (state.UsersList?.updateTenantError) {
      setLoading(false);
    }
  }, [state.UsersList?.updateTenantError]);

  const handleSubmit = () => {
    setIsChangedError("");
    dispatch({ type: "REMOVE_TENANT_UPDATE_ERROR" });
    let isValid = true;

    if (!effectiveFrom) {
      setEffectiveFromError("Please select Joining date");
      dateRef.current?.focus();
      isValid = false;
    }

    if (!isValid) return;
    const oldDate = dayjs(
      CustomerOverView.hostelInfo.joiningDate,
      "DD/MM/YYYY",
    ).format("DD-MM-YYYY");
    const newDate = dayjs(effectiveFrom, "DD/MM/YYYY").format("DD-MM-YYYY");

    if (oldDate === newDate) {
      setIsChangedError("No changes detected in Joining Date");
      return;
    }
    const formattedDate = dayjs(effectiveFrom, "DD/MM/YYYY").format(
      "DD-MM-YYYY",
    );

    dispatch({
      type: "EDITAMOUNTDETAILS",
      payload: {
        hostelId: state.login.selectedHostel_Id,
        bookingId: CustomerOverView?.bookingId,
        updateInfo: {
          joiningDate: formattedDate,
          reason: reason || "",
        },
      },
    });
    setLoading(true);
  };

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setLoading(false);
    }
  }, [state.createAccount?.networkError]);

  const bookingDateStr = CustomerOverView?.bookingInfo?.bookingDate;
  const bookingDate = dayjs(bookingDateStr, "DD/MM/YYYY");
  const today = dayjs();
  const isDisabled = (current) => {
    if (current.isBefore(bookingDate, "day") || current.isAfter(today, "day")) {
      return true;
    }
    return false;
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute top-2 right-2 bottom-2 w-full max-w-xl bg-white rounded-xl shadow-xl flex flex-col">
        <div className="  px-4 py-3 shrink-0 flex justify-between mb-2 border-b">
          <div className="!text-lg !text-gray-900 !font-semibold font-gilroy">
            Edit Joining Date
          </div>

          <CloseCircle
            size="24"
            color="#000"
            onClick={handleClose}
            className="cursor-pointer"
          />
        </div>

        <div className="flex-1 overflow-y-auto px-4  show-scrolls max-h-[500px]">
          <div className="row mb-0">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-1">
              <Form.Group>
                <Form.Label className="text-sm text-gray-900 font-medium font-gilroy">
                  Edit Joining Date{" "}
                  <span className="text-red-600 text-xl">*</span>
                </Form.Label>

                <div className="relative w-full">
                  <DatePicker
                    ref={dateRef}
                    className="w-full h-12 cursor-pointer font-gilroy border border-gray-300 rounded-lg"
                    format="DD/MM/YYYY"
                    placeholder="DD/MM/YYYY"
                    value={
                      effectiveFrom ? dayjs(effectiveFrom, "DD/MM/YYYY") : null
                    }
                    onChange={handleEffectiveFromChange}
                    disabledDate={isDisabled}
                  />

                  {effectiveFromError && (
                    <ErrorMessage message={effectiveFromError} type="error" />
                  )}
                </div>
              </Form.Group>
            </div>

            {/* Reason */}
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-1">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput5"
              >
                <Form.Label className="text-sm font-medium font-gilroy text-gray-900">
                  Reason
                </Form.Label>

                <FormControl
                  type="text"
                  placeholder="Enter your reason"
                  value={reason}
                  onChange={handleReasonChange}
                  className="text-base text-gray-600 font-gilroy font-medium border border-gray-300 rounded-lg h-12 shadow-none"
                />
              </Form.Group>
            </div>
          </div>

          {state.UsersList?.updateTenantError && (
            <ErrorMessage
              message={state.UsersList.updateTenantError}
              type="error"
            />
          )}
        </div>

        {IsChangedError && (
          <div className="flex justify-center">
            <ErrorMessage message={IsChangedError} type="error" />
          </div>
        )}

        {loading && (
          <div className="absolute inset-x-0 top-24 bottom-0 flex items-center justify-center bg-transparent opacity-75 z-10">
            <div className="w-10 h-10 rounded-full border-t-4 border-blue-700 border-r-4 border-r-transparent animate-spin"></div>
          </div>
        )}

        <div className="flex justify-end gap-3 p-4">
          <Button
            onClick={handleClose}
            className="w-full mt-1 bg-white border-0 !text-[#1E45E1] !font-bold !text-base !font-gilroy rounded-xl py-2 px-10"
          >
            Cancel
          </Button>

          <Button
            disabled={loading}
            onClick={handleSubmit}
            className="w-full mt-1 !bg-[#1E45E1] !font-semibold !text-base !font-gilroy rounded-xl py-2 px-10 text-white"
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
}
EditJoiningDate.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
export default EditJoiningDate;

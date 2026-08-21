/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { Modal, Form, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { CloseCircle } from "iconsax-react";
import ErrorMessage from "../../Components/ErrorMessage";
import PropTypes from "prop-types";

function EditAdvanceAmount({ show, handleClose }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [monthlyRent, setMonthlyRent] = useState("");
  const [monthlyRentError, setMonthlyRentError] = useState("");
  const [IsChangedError, setIsChangedError] = useState("");
  // const [effectiveFrom, setEffectiveFrom] = useState("");
  // const [effectiveFromError, setEffectiveFromError] = useState("");
  const [reason, setReason] = useState(null);
  const [loading, setLoading] = useState(false);
  const rentInputRef = useRef(null);
  // const dateRef = useRef(null);

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

  const handleMonthlyRentChange = (e) => {
    dispatch({ type: "REMOVE_EDIT_ADVANCE_ERROR" });
    setIsChangedError("");

    const value = e.target.value;

    if (/^[0-9\b]*$/.test(value)) {
      if (value === "" || Number(value) >= 0) {
        setMonthlyRent(value);
        setMonthlyRentError("");
      }
    }
  };
  // const handleMonthlyRentChange = (e) => {
  //     dispatch({ type: 'REMOVE_EDIT_ADVANCE_ERROR' })
  //     setIsChangedError("");
  //     const value = e.target.value;

  //     if (/^[0-9\b]*$/.test(value)) {
  //         if (value === "" || Number(value) > 0) {
  //             setMonthlyRent(value);
  //             setMonthlyRentError("");
  //         }
  //     }
  // };

  // const handleEffectiveFromChange = (date, dateString) => {
  //     setEffectiveFrom(dateString);
  //     setEffectiveFromError("");
  // };

  const handleSubmit = () => {
    setIsChangedError("");
    dispatch({ type: "REMOVE_EDIT_ADVANCE_ERROR" });
    let isValid = true;

    if (monthlyRent === "") {
      setMonthlyRentError("Please Enter New Advance Amount");
      rentInputRef.current?.focus();
      isValid = false;
    }

    // if (!effectiveFrom) {
    //     setEffectiveFromError("Please select an effective date");
    //     dateRef.current?.focus();
    //     isValid = false;
    // }

    if (!isValid) return;

    const oldAmount = Number(CustomerOverView.hostelInfo.advanceAmount);

    const newAmount = Number(monthlyRent);

    if (oldAmount === newAmount) {
      setIsChangedError("No changes detected in AdvanceAmount");
      return;
    }

    dispatch({
      type: "EDITADVANCE",
      payload: {
        hostelId: state.login.selectedHostel_Id,
        bookingId: CustomerOverView?.bookingId,
        advanceAmount: monthlyRent,
      },
    });
    setLoading(true);
  };

  useEffect(() => {
    if (state.createAccount?.networkError || state.UsersList.advanceError) {
      setLoading(false);
    }
  }, [state.createAccount?.networkError, state.UsersList.advanceError]);

  const handleReasonChange = (e) => {
    setIsChangedError("");
    dispatch({ type: "REMOVE_EDIT_ADVANCE_ERROR" });
    setReason(e.target.value);
  };

  useEffect(() => {
    if (state.UsersList.editAdvanceStatusCode === 200) {
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "REMOVE_EDIT_ADVANCE" });
      }, 100);
    }
  }, [state.UsersList.editAdvanceStatusCode]);

  return (
    <div className="modal show block static">
      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Dialog className="m-0 p-0 w-full max-w-4xl pt-1.5 pb-2.5 px-2.5">
          <Modal.Header className="border border-gray-200 flex items-center justify-between">
            <Modal.Title className="!text-lg !font-semibold !font-gilroy">
              Edit Advance Amount
            </Modal.Title>

            <CloseCircle
              size="24"
              color="#000"
              onClick={handleClose}
              className="cursor-pointer"
            />
          </Modal.Header>

          <Modal.Body className="max-h-96 overflow-y-scroll show-scroll p-3 mt-0 me-3">
            <div className="row mb-0">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-1">
                <Form.Group>
                  <Form.Label className="text-sm font-medium text-gray-900 font-gilroy">
                    New Advance Amount{" "}
                    <span className="text-red-500 text-xl">*</span>
                  </Form.Label>

                  <FormControl
                    type="text"
                    ref={rentInputRef}
                    value={monthlyRent}
                    onChange={handleMonthlyRentChange}
                    placeholder="Enter New Advance Amount"
                    className="h-12 text-base font-medium text-gray-600 font-gilroy border border-gray-300 rounded-lg shadow-none"
                  />

                  {monthlyRentError && (
                    <ErrorMessage message={monthlyRentError} type="error" />
                  )}
                </Form.Group>
              </div>

              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-1">
                <Form.Group controlId="exampleForm.ControlInput5">
                  <Form.Label className="text-sm font-medium text-gray-900 font-gilroy">
                    Reason
                  </Form.Label>

                  <FormControl
                    type="text"
                    placeholder="Enter your reason"
                    value={reason}
                    onChange={handleReasonChange}
                    className="h-12 text-base font-medium text-gray-600 font-gilroy border border-gray-300 rounded-lg shadow-none"
                  />

                  {state.UsersList.advanceError && (
                    <ErrorMessage
                      message={state.UsersList.advanceError}
                      type="error"
                    />
                  )}
                </Form.Group>
              </div>
            </div>
          </Modal.Body>

          {IsChangedError && (
            <div className="flex justify-center">
              <ErrorMessage message={IsChangedError} type="error" />
            </div>
          )}

          {loading && (
            <div className="absolute inset-0 top-24 flex items-center justify-center bg-transparent opacity-75 z-10">
              <div className="w-10 h-10 rounded-full border-4 border-blue-600 border-r-transparent animate-spin"></div>
            </div>
          )}

          <div className="flex justify-end items-center gap-6 px-6 py-4">
            <button
              onClick={handleClose}
              className="!text-blue-600 !text-base !font-semibold !font-gilroy"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              className="!bg-blue-600 text-white !font-semibold !font-gilroy px-8 py-2 rounded-xl"
            >
              Update
            </button>
          </div>
        </Modal.Dialog>
      </Modal>
    </div>
  );
}
EditAdvanceAmount.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
export default EditAdvanceAmount;

/* eslint-disable react-hooks/exhaustive-deps */
import { Form, FormControl } from "react-bootstrap";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Modal from "react-bootstrap/Modal";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import Select from "react-select";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { CloseCircle } from "iconsax-react";
// import { MdError } from "react-icons/md";
import ErrorMessage from '../../../Components/ErrorMessage';

function BookingBed({
  show, handleClose, currentItem, selectedTenant
}) {

  const state = useSelector(state => state)
  const dispatch = useDispatch();


  const bookingcustomerRef = useRef();
  const dateRef = useRef();
  const amountRef = useRef();
  const bookingDateRef = useRef();
  const modeOfPaymentRef = useRef()

  const [amount, setAmount] = useState("");
  const [amountError, setamountError] = useState("");
  const [joiningDate, setJoiningDate] = useState(null);
  const [bookingDate, setBookingDate] = useState(null);
  const [joiningDateErrmsg, setJoingDateErrmsg] = useState('')
  const [bookingDateErrmsg, setBookingDateErrmsg] = useState('')
  const [dateError, setDateError] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [booking_customername, setBookingCustomerName] = useState("");
  const [booking_customererrmsg, setBookingCustomerErrmsg] = useState("");
  // const [customer_details, setCustomerDetails] = useState({})
  const [modeOfPayment, setModeOfPayment] = useState("");
  const [transactionId, setTransactionId] = useState("")
  const [paymentError, setPaymentError] = useState("");


  console.log("selectedTenant", selectedTenant)


  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      dispatch({ type: "BANKINGLIST", payload: state.login.selectedHostel_Id });
      dispatch({ type: 'UNASSIGNCUSTOMER', payload: { hostel_id: state.login.selectedHostel_Id, type: "inactive" } })
    }
  }, [])

  useEffect(() => {
    if (selectedTenant?.tenetId) {
      dispatch({ type: "CUSTOMERDETAILS", payload: { customerId: selectedTenant?.tenetId } });
    }
  }, [selectedTenant?.tenetId]);


  const CustomerOverView = state.UsersList?.customerdetails?.checkoutInfo?.noticeDate;

  const startDate = CustomerOverView
    ? dayjs(CustomerOverView, "DD/MM/YYYY").startOf("day")
    : null;

  const today = dayjs().endOf("day");

  const handleBookingCustomerName = (selectedOption) => {

    setBookingCustomerName(selectedOption?.value || '');
    if (!selectedOption) {
      setBookingCustomerErrmsg("Please Select Name");
    } else {
      setBookingCustomerErrmsg("");
    }
  };

  const handleAmount = (e) => {
    const newAmount = e.target.value;

    if (!/^\d*$/.test(newAmount)) {
      return;
    }

    if (/^0+$/.test(newAmount)) {
      return;
    }


    if (/^0\d+/.test(newAmount)) {
      return;
    }

    setAmount(newAmount);
    setamountError("");
    dispatch({ type: "ERROR_BOOKING_REMOVE" });
  };


  const handleTransactionId = (e) => {
    const value = e.target.value;
    const regex = /^[A-Za-z0-9_.-]*$/;

    if (regex.test(value)) {
      setTransactionId(value);
    }
  };


  const handleModeOfPaymentChange = (selectedOption) => {
    if (!selectedOption) return;

    setModeOfPayment(selectedOption);
    setPaymentError("")
    dispatch({ type: "CLEAR_EXPENCE_NETBANKIG" });
  };

  const labelMap = {
    CARD: "Card",
    CASH: "Cash",
    UPI: "UPI",
    BANK: "Bank",
  };

  const paymentOptions = Array.isArray(state.bankingDetails.bankingList.listBanks)
    ? state.bankingDetails?.bankingList?.listBanks.map((item) => ({
      value: String(item.bankingId),
      label: `${item.accountHolderName} - ${labelMap[item.accountType] || ""}`,
    }))
    : [];
  const validateAssignField = (value, fieldName, ref, setError, focusedRef) => {
    if (!value || value === "Select a PG") {
      switch (fieldName) {
        case "bookingcustomername":
          setError("Please Select Tenant");
          break;
        case "joiningDate":
          setError("Please Select Joining Date");
          break;
        case "bookingDate":
          setError("Please Select Booking Date");
          break;
        case "amount":
          setError("Please Enter Amount");
          break;
        case "modeOfPayment":
          setError("Please Select Mode of Payment");
          break;
        default:
          break;
      }

      if (ref?.current && !focusedRef.current) {
        ref.current.focus();
        focusedRef.current = true;
      }
      return false;
    } else {
      setError("");
      return true;
    }
  };

  const handleSubmitBooking = () => {
    let hasError = false;
    const focusedRef = { current: false };

    const isCustomerValid = validateAssignField(
      booking_customername,
      "bookingcustomername",
      bookingcustomerRef,
      setBookingCustomerErrmsg,
      focusedRef
    );

    const isBookingDateValid = validateAssignField(
      bookingDate,
      "bookingDate",
      bookingDateRef,
      setBookingDateErrmsg,
      focusedRef
    );
    const isAmountValid = validateAssignField(
      amount,
      "amount",
      amountRef,
      setamountError,
      focusedRef
    );
    const isJoiningDateValid = validateAssignField(
      joiningDate,
      "joiningDate",
      dateRef,
      setJoingDateErrmsg,
      focusedRef
    );


    const isModeOfPaymentValid = validateAssignField(
      modeOfPayment,
      "modeOfPayment",
      modeOfPaymentRef,
      setPaymentError,
      focusedRef
    );

    if (!isCustomerValid || !isJoiningDateValid || !isBookingDateValid || !isAmountValid || !isModeOfPaymentValid) {
      hasError = true;
    }
    if (Number(amount) <= 0) {
      setamountError("Please Enter Booking Amount");
      amountRef.current?.focus();
      hasError = true;
    }
    if (hasError) return;

    const formatDate = (date) => {
      if (!date) return "";
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = d.getFullYear();
      return `${day}-${month}-${year}`;
    };

    const joiningDateForFormatted = formatDate(joiningDate);
    const bookingDateForFormatted = formatDate(bookingDate);

    dispatch({
      type: "ADD_BOOKING",
      payload: {
        hostelId: state.login.selectedHostel_Id,
        joiningDate: joiningDateForFormatted,
        bookingDate: bookingDateForFormatted,
        bookingAmount: amount,
        floorId: currentItem?.floorId,
        roomId: currentItem?.roomId,
        bedId: currentItem?.bedId,
        customerId: booking_customername,
        bankId: modeOfPayment,
        referenceNumber: transactionId,
      },
    });

    setFormLoading(true);
  };



  console.log("currentItem", currentItem)

  useEffect(() => {
    if (state?.Booking?.statusCodeForAddBooking === 200) {
      setFormLoading(false)

      setJoingDateErrmsg('');

      handleClose()
      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_USER_BOOKING" });
      }, 500);
    }
  }, [state?.Booking?.statusCodeForAddBooking]);


  useEffect(() => {
    if (state.Booking.bookingBedError) {
      setFormLoading(false)

      setTimeout(() => {
        dispatch({ type: 'ERROR_BOOKING_REMOVE' })
      }, 1000)

    }
  }, [state.Booking.bookingBedError])



  useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NETWORK_ERROR' })
      }, 3000)
    }

  }, [state.createAccount?.networkError])










  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        centered
      >
        <Modal.Dialog className="m-0 p-0 max-w-[950px] pr-2.5 rounded-[30px]">

          <Modal.Header className="pb-2 mb-1 mt-1 relative flex flex-col !items-start border-b border-gray-300">
            <div className="w-100 d-flex justify-content-between align-items-start">
              <div className="!text-lg !font-semibold !font-gilroy">
                Booking
              </div>

              <CloseCircle
                size="24"
                color="#000"
                onClick={handleClose}
                className="cursor-pointer mt-2"
              />
            </div>

            <span className="text-sm text-blue-600 font-semibold !font-gilroy">
              {currentItem.floorName} &nbsp; | &nbsp; {currentItem?.roomName} &nbsp; | &nbsp; {currentItem?.bedName}
            </span>
          </Modal.Header>

          <Modal.Body>

            <div className="show-scroll p-2 mt-1 me-1 max-h-[350px] overflow-y-scroll">
              <div className="grid grid-cols-12 gap-x-3 gap-y-0">

                <div className="col-span-12 mb-1 -mt-3">
                  <Form.Label className="text-sm font-medium font-gilroy">
                    Select Tenant{" "}
                    <span className="text-red-500 text-xl">*</span>
                  </Form.Label>

                  <Select
                    ref={bookingcustomerRef}
                    options={
                      state.UsersList?.UnAssignCustomerDetails?.length > 0 &&
                      state.UsersList?.UnAssignCustomerDetails.map((u) => ({
                        value: u.customerId,
                        label: u.firstName,
                      }))

                    }
                    onChange={handleBookingCustomerName}
                    value={
                      booking_customername
                        ? {
                          value: booking_customername,
                          label:
                            state.UsersList?.UnAssignCustomerDetails?.find((u) => u.customerId === booking_customername)?.firstName ||
                            "Select Tenant",
                        }
                        : null
                    }
                    placeholder="Select Tenant"
                    classNamePrefix="custom"
                    menuPlacement="auto"
                    noOptionsMessage={() => "No customers available"}
                    styles={{
                      control: (base) => ({
                        ...base,
                        height: 48,
                        padding: "3px 5px ",
                        border: "1px solid #D9D9D9",
                        borderRadius: "8px",
                        fontSize: "16px",
                        color: "#4B4B4B",
                        fontFamily: "Gilroy",
                        fontWeight: booking_customername ? 600 : 500,
                        boxShadow: "none",
                      }),
                      menu: (base) => ({
                        ...base,
                        backgroundColor: "#f8f9fa",
                        border: "1px solid #ced4da",
                      }),
                      menuList: (base) => ({
                        ...base,
                        backgroundColor: "#f8f9fa",
                        maxHeight: "120px",
                        padding: 0,
                        scrollbarWidth: "thin",
                        overflowY: "auto",
                        fontFamily: "Gilroy"
                      }),
                      placeholder: (base) => ({
                        ...base,
                        color: "#9aa0a6",
                      }),
                      dropdownIndicator: (base) => ({
                        ...base,
                        color: "#555",
                        cursor: "pointer",
                      }),
                      indicatorSeparator: () => ({
                        display: "none",
                      }),
                      option: (base, state) => ({
                        ...base,
                        cursor: "pointer",
                        backgroundColor: state.isFocused ? "#f0f0f0" : "white",
                        color: "#000",
                      }),
                    }}
                  />
                  {booking_customererrmsg.trim() !== "" && (
                    <ErrorMessage message={booking_customererrmsg} type="error" />
                  )}
                </div>

                <div className="col-span-12 mb-1">
                  <Form.Group controlId="bookingDate">
                    <Form.Label className="text-sm font-medium font-gilroy">
                      Booking Date{" "}
                      <span className="text-red-500 text-xl">*</span>
                    </Form.Label>

                    <div className="datepicker-wrapper relative w-full">
                      <DatePicker
                        ref={bookingDateRef}
                        className="w-full h-12 cursor-pointer font-gilroy"
                        format="DD/MM/YYYY"
                        placeholder="DD/MM/YYYY"
                        value={bookingDate ? dayjs(bookingDate) : null}
                        onChange={(date) => {
                          setDateError("");
                          setBookingDate(date ? date.toDate() : null);
                          setBookingDateErrmsg('');
                          setJoiningDate("")
                        }}

                        disabledDate={(current) => {
                          if (!startDate) return false;

                          return (
                            current.isBefore(startDate) ||
                            current.isAfter(today)
                          );
                        }}
                        getPopupContainer={() => document.body}
                      />
                    </div>

                    {dateError && (
                      <ErrorMessage message={dateError} type="error" />
                    )}

                    {bookingDateErrmsg.trim() !== "" && (
                      <ErrorMessage message={bookingDateErrmsg} type="error" />
                    )}
                  </Form.Group>
                </div>

                <div className="col-span-12 sm:col-span-6 md:col-span-6 mb-1">
                  <Form.Group>
                    <Form.Label className="text-sm font-medium font-gilroy">
                      Booking Amount {" "}
                      <span className="text-red-500 text-xl"> *</span>
                    </Form.Label>

                    <div className="relative">
                      <FormControl
                        type="text"
                        ref={amountRef}
                        id="form-controls"
                        placeholder="Enter Booking Amount"
                        value={amount}
                        onChange={(e) => handleAmount(e)}
                        className={`w-full h-12 text-base font-gilroy text-gray-800 
                        ${amount ? 'font-semibold' : 'font-medium'} 
                         border border-gray-300 rounded-md shadow-none`}
                      />
                    </div>
                  </Form.Group>
                  {amountError && (
                    <ErrorMessage message={amountError} type="error" />
                  )}
                </div>

                <div className="col-span-12 sm:col-span-6 md:col-span-6 mb-1">
                  <Form.Group className="mb-0">
                    <Form.Label className="text-sm font-medium font-gilroy">
                      Joining Date (Tentative){" "}
                      <span className="text-red-500 text-xl">*</span>
                    </Form.Label>

                    <div className="datepicker-wrapper relative w-full">

                      <DatePicker
                        ref={dateRef}
                        className="w-full h-12 cursor-pointer font-gilroy px-3 py-1.5"
                        format="DD/MM/YYYY"
                        placeholder="DD/MM/YYYY"
                        value={joiningDate ? dayjs(joiningDate) : null}
                        onChange={(date) => {
                          setDateError("");
                          setJoiningDate(date ? date.toDate() : null);
                          dispatch({ type: 'REMOVE_ERROR_BOOKING_DATE' })
                          setJoingDateErrmsg("")
                        }}
                        getPopupContainer={() => document.body}
                        disabledDate={(current) => {

                          if (bookingDate) {
                            return current && current.isBefore(dayjs(bookingDate), "day");
                          }

                          return false;
                        }}
                      />

                    </div>
                  </Form.Group>
                  {dateError && (
                    <ErrorMessage message={dateError} type="error" />
                  )}

                  {joiningDateErrmsg.trim() !== "" && (
                    <ErrorMessage message={joiningDateErrmsg} type="error" />
                  )}

                </div>

                <div className="col-span-12 mb-1">
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label className="text-sm font-medium font-gilroy">
                      Mode Of Transaction {" "}
                      <span className="text-red-500 text-xl">*</span>
                    </Form.Label>
                    <Select
                      ref={modeOfPaymentRef}
                      options={paymentOptions}
                      onChange={(selectedOption) =>
                        handleModeOfPaymentChange(selectedOption?.value)
                      }
                      value={
                        modeOfPayment
                          ? paymentOptions.find((opt) => opt.value === String(modeOfPayment)) || null
                          : null
                      }
                      placeholder="Select Payment"
                      noOptionsMessage={() => "No mode available"}
                      styles={{
                        control: (base) => ({
                          ...base,
                          fontSize: 16,
                          color: "rgba(75, 75, 75, 1)",
                          fontFamily: "Gilroy",
                          fontWeight: modeOfPayment ? 600 : 500,
                          border: "1px solid #D9D9D9",
                          borderRadius: "8px",
                          boxShadow: "none",
                          height: 48,
                          cursor: "pointer",
                        }),
                        menu: (base) => ({
                          ...base,
                          backgroundColor: "#f8f9fa",
                          border: "1px solid #ced4da",
                          fontFamily: "Gilroy",
                        }),
                        menuList: (base) => ({
                          ...base,
                          backgroundColor: "#f8f9fa",
                          maxHeight: "120px",
                          padding: 0,
                          scrollbarWidth: "thin",
                          overflowY: "auto",
                          fontFamily: "Gilroy",
                        }),
                        placeholder: (base) => ({
                          ...base,
                          color: "#9aa0a6",
                        }),
                        dropdownIndicator: (base) => ({
                          ...base,
                          color: "#555",
                          cursor: "pointer",
                        }),
                        option: (base, state) => ({
                          ...base,
                          cursor: "pointer",
                          backgroundColor: state.isFocused ? "lightblue" : "white",
                          color: "#000",
                          fontFamily: "Gilroy",
                        }),
                        indicatorSeparator: () => ({
                          display: "none",
                        }),
                      }}
                    />

                  </Form.Group>
                  {paymentError && (
                    <ErrorMessage message={paymentError} type="error" />

                  )}
                </div>

                <div className="col-span-12 mb-1">
                  <Form.Group>
                    <Form.Label className="text-sm font-medium font-gilroy">
                      Transaction ID{" "}
                      <span className="text-red-500 text-xl">*</span>
                    </Form.Label>
                    <FormControl
                      type="text"
                      id="form-controls"
                      placeholder="Enter Transaction ID"
                      value={transactionId}
                      onChange={(e) => handleTransactionId(e)}
                      className={`w-full h-12 text-base font-gilroy text-gray-800 
  ${transactionId ? 'font-semibold' : 'font-medium'} 
  border border-gray-300 rounded-md shadow-none`}

                    />
                  </Form.Group>

                </div>



              </div>


            </div>

            {
              state.Booking.bookingBedError && <div className="d-flex justify-content-center"><ErrorMessage message={state.Booking.bookingBedError} type="error" /> </div>
            }


            {/* {state.createAccount?.networkError ?
                         <div className="d-flex justify-content-center mt-1 mb-1">
                          <ErrorMessage message={state.createAccount?.networkError} type="error"/></div>
                          : null} */}

            <Modal.Footer className="flex items-center justify-end gap-4 mt-2 !border-t-0 mb-0">
              <button
                type="button"
                className="bg-transparent border-none text-gray-800 text-sm font-semibold font-gilroy cursor-pointer"
                onClick={handleClose}
              >
                Cancel
              </button>

              <button
                type="button"
                className="bg-blue-700 text-white font-semibold h-10 rounded-md text-sm font-gilroy px-6 border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSubmitBooking}
                disabled={formLoading}
              >
                Book
              </button>
            </Modal.Footer>

          </Modal.Body>




          {formLoading && <div
            style={{
              position: 'absolute',
              top: 100,
              right: 0,
              bottom: 0,
              left: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'transparent',
              opacity: 0.75,
              zIndex: 10,
            }}
          >
            <div
              style={{
                borderTop: '4px solid #1E45E1',
                borderRight: '4px solid transparent',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                animation: 'spin 1s linear infinite',
              }}
            ></div>
          </div>}
        </Modal.Dialog>
      </Modal>
    </div>
  );
}

BookingBed.propTypes = {
  show: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  currentItem: PropTypes.func.isRequired,
  customerID: PropTypes.func.isRequired,
  selectedTenant: PropTypes.func.isRequired,

};

export default BookingBed;
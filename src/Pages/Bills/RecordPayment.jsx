/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { CloseCircle } from "iconsax-react";
import { Form } from "react-bootstrap";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import ErrorMessage from "../../Components/ErrorMessage";
import PropTypes from "prop-types";

function RecordPayment({ show, handleClose, selectedUserId, invoiceList }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [bankking, setBanking] = useState("");
  // const [formLoading, setFormLoading] = useState(false)
  const [initials, setInitials] = useState("");
  const [formRecordLoading, setFormRecordLoading] = useState(false);

  console.log("invoiceList", invoiceList);

  const calendarRef = useRef(null);
  const [paymodeerrormsg, setPaymodeErrmsg] = useState("");
  const [amounterrormsg, setAmountErrmsg] = useState("");
  const [dateerrmsg, setDateErrmsg] = useState("");
  const [totalErrormsg, setTotalErrmsg] = useState("");
  const [account, setAccount] = useState("");
  const [accountError, setAccountError] = useState("");
  const [name, setName] = useState("");
  const [floor_name, setFloorName] = useState("");
  const [room_name, setRoomName] = useState("");
  const [bed_name, setBedName] = useState("");
  const [profile_pic, setProfilePic] = useState(null);
  // const [selectedTenant, setSelectedTenant] = useState("")

  const [balance, setBalance] = useState(0);
  const [payableAmount, setPayableAmount] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [transactionId, setTransactionId] = useState("");
  const [modeOfPayment, setModeOfPayment] = useState("");

  useEffect(() => {
    if (!selectedUserId) return;
    dispatch({
      type: "CUSTOMERDETAILS",
      payload: { customerId: selectedUserId },
    });
  }, [selectedUserId]);

  const CustomerOverview = state.UsersList?.customerdetails?.hostelInfo;

  useEffect(() => {
    if (!selectedUserId) return;

    if (CustomerOverview) {
      setName(state.UsersList?.customerdetails?.fullName);
      setFloorName(CustomerOverview.floorName);
      setRoomName(CustomerOverview.roomName);
      setBedName(CustomerOverview.bedName);
      setProfilePic(state.UsersList?.customerdetails?.profilePic);
      setInitials(state.UsersList?.customerdetails?.initials);
    }
  }, [selectedUserId, state.UsersList?.customerdetails]);

  useEffect(() => {
    if (!state.login.selectedHostel_Id) return;
    dispatch({ type: "BANKINGLIST", payload: state.login.selectedHostel_Id });
  }, []);

  // console.log("invoiceValue",invoiceValue)

  const options = {
    dateFormat: "d/m/Y",
    defaultDate: null,
    minDate: null,
  };

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.flatpickr.set(options);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (state.bankingDetails.statusCodeForGetBanking === 200) {
      setBanking(state.bankingDetails.bankingList.banks);
      setTimeout(() => {
        dispatch({ type: "CLEAR_BANKING_LIST" });
      }, 200);
    }
  }, [state.bankingDetails.statusCodeForGetBanking]);

  useEffect(() => {
    if (state.InvoiceList.payapleAmountError) {
      setFormRecordLoading(false);
      // setFormLoading(false)
      //   setLoading(false)
      // setPayableAmountError(state.InvoiceList.payapleAmountError)
    }
  }, [state.InvoiceList.payapleAmountError]);

  const handleAccount = (selectedOption) => {
    setAccount(selectedOption?.value || "");
    setAccountError("");
    dispatch({ type: "CLEAR_EXPENCE_NETBANKIG" });
  };

  const handleTransaction = (selectedOption) => {
    setModeOfPayment(selectedOption);
    setAccountError("");
    setPaymodeErrmsg("");
    setAccount("");
  };

  const handleChange = (e) => {
    setTransactionId(e.target.value);
  };

  const bankingOptions = Array.isArray(
    state.bankingDetails?.bankingList?.listBanks,
  )
    ? state.bankingDetails?.bankingList?.listBanks.map((item) => {
        let label = "";
        if (item.accountType === "BANK") label = "BANK";
        else if (item.accountType === "UPI") label = "UPI";
        else if (item.accountType === "CARD") label = "CARD";
        else if (item.accountType === "CASH") label = "CASH";

        return {
          value: item?.bankingId,
          label: `${item?.accountHolderName} - ${label}`,
        };
      })
    : [];

  const combinedOptions = [...bankingOptions];

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormRecordLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 3000);
    }
  }, [state.createAccount?.networkError]);

  const handleAmount = (e) => {
    setAmountErrmsg("");
    let value = e.target.value;

    // if (value.includes('.')) {
    //     return;
    // }
    if (!/^\d*\.?\d{0,2}$/.test(value)) return;
    if (value.startsWith(".")) return;
    if (value !== "") {
      let numValue = parseFloat(value);

      if (numValue > (invoiceList?.balanceDue || 0)) {
        numValue = invoiceList?.balanceDue || 0;
      }

      value = numValue;
      setBalance((invoiceList?.balanceDue || 0) - numValue);
    } else {
      setBalance(invoiceList?.balanceDue || 0);
    }

    setPayableAmount(value);
    dispatch({ type: "CLEAR_PAYABLE_AMOUNT" });
  };

  useEffect(() => {
    if (state.InvoiceList.RecordPaymentUpdateStatusCode === 200) {
      setPayableAmount("");
      setBalance("");
      setTransactionId("");
      setSelectedDate(null);
      if (invoiceList?.invoiceId) {
        dispatch({
          type: "GETPARTICULARBILLSDETAILS",
          payload: {
            hostelId: state.login.selectedHostel_Id,
            invoiceId: invoiceList?.invoiceId,
          },
        });
      }
      setFormRecordLoading(false);
      handleClose();

      setTimeout(() => {
        dispatch({ type: "CLEAR_RECORD_PAYMENT" });
      }, 3000);
    }
  }, [state.InvoiceList.RecordPaymentUpdateStatusCode]);

  const convertToYMD = (dateStr) => {
    const [day, month, year] = dateStr.split("/");
    return `${year}-${month}-${day}`;
  };

  const handleSaveInvoiceList = () => {
    dispatch({ type: "CLEAR_PAYABLE_AMOUNT" });
    const formatpaiddate = formatDateForPayload(selectedDate);

    const billDate = convertToYMD(invoiceList?.invoiceDate);
    const paidDate = formatpaiddate;

    if (!payableAmount) {
      setAmountErrmsg("Please Enter Amount");
    } else {
      setAmountErrmsg("");
    }

    if (!formatpaiddate) {
      setDateErrmsg("Please Select Date");
    } else if (paidDate < billDate) {
      setDateErrmsg("Paid date should not be before Bill date");
      return;
    } else {
      setDateErrmsg("");
    }

    if (!modeOfPayment || modeOfPayment === "select") {
      setPaymodeErrmsg("Please Select Transaction Type");
      return;
    }

    if (modeOfPayment === "Net Banking" && !account) {
      setAccountError("Please Choose Bank Account");
      return;
    }

    if (!payableAmount || !formatpaiddate || !modeOfPayment) {
      setTimeout(() => {
        setTotalErrmsg("");
      }, 1000);
      return;
    }

    if (
      invoiceList?.invoiceId &&
      payableAmount &&
      modeOfPayment &&
      formatpaiddate &&
      state.login.selectedHostel_Id
    ) {
      dispatch({
        type: "RECORD_PAYMENT",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          invoiceId: invoiceList?.invoiceId,
          data: {
            bankId: modeOfPayment,
            paymentDate: convertYMDToDMY(formatpaiddate),
            referenceId: transactionId,
            amount: payableAmount,
          },
        },
      });
    }
    setFormRecordLoading(true);
  };

  const convertYMDToDMY = (ymd) => {
    if (!ymd) return null;
    const [year, month, day] = ymd.split("-");
    return `${day}-${month}-${year}`;
  };

  const formatDateForPayload = (date) => {
    if (!date) return null;
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60 * 1000);

    const day = String(localDate.getDate()).padStart(2, "0");
    const month = String(localDate.getMonth() + 1).padStart(2, "0");
    const year = localDate.getFullYear();

    return `${year}-${month}-${day}`;
  };

  return (
    <div
      className="modal show"
      style={{
        display: "block",
        position: "initial",
        fontFamily: "Gilroy,sans-serif",
      }}
    >
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        centered
        // dialogClassName="custom-modals-record-payment-style"
      >
        <Modal.Dialog className="m-0 p-0">
          <Modal.Header style={{ paddingTop: 10, position: "relative" }}>
            <div
              style={{
                fontSize: 18,
                fontWeight: 600,
                fontFamily: "Gilroy",
                textAlign: "start",
              }}
            >
              {`Record Payment `}
            </div>

            <CloseCircle
              size="24"
              color="#000"
              onClick={handleClose}
              style={{ cursor: "pointer" }}
            />
          </Modal.Header>

          <Modal.Body>
            <>
              <div className="flex items-center gap-2  bg-[#F7F9FF] px-4 py-2 rounded">
                {profile_pic ? (
                  <img
                    src={profile_pic && profile_pic !== "0" && profile_pic}
                    style={{ height: 55, width: 55, cursor: "pointer" }}
                    alt="profile"
                    className="rounded-circle me-3"
                  />
                ) : (
                  <div
                    style={{
                      height: 50,
                      width: 50,
                      borderRadius: "50%",
                      backgroundColor: "#E2E8F0",
                      color: "#44536A",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: 20,
                      fontWeight: "600",
                      fontFamily: "Gilroy",
                    }}
                  >
                    {initials || "-"}
                  </div>
                )}

                <div>
                  <p
                    style={{
                      fontSize: "1.25rem",
                      fontFamily: "Gilroy",
                      fontWeight: 600,
                    }}
                    className="mb-0"
                  >
                    {name}
                  </p>
                  <div className="d-flex mb-2">
                    <span
                      className="badge rounded-pill bg-warning text-dark me-2"
                      style={{
                        fontSize: "0.75rem",
                        fontFamily: "Gilroy",
                        fontWeight: 400,
                      }}
                    >
                      {floor_name}
                    </span>
                    <span
                      className="badge rounded-pill bg-danger-subtle text-dark"
                      style={{
                        fontSize: "0.75rem",
                        fontFamily: "Gilroy",
                        fontWeight: 400,
                      }}
                    >
                      {room_name} -{bed_name}
                    </span>
                  </div>
                </div>
                <div className="ms-auto text-end mt-2">
                  <p
                    style={{
                      fontSize: 14,
                      fontFamily: "Gilroy",
                      fontWeight: 400,
                      color: "#4B4B4B",
                      padding: 0,
                      margin: 0,
                    }}
                  >
                    Due Pending
                  </p>
                  <p
                    style={{
                      fontSize: 16,
                      fontFamily: "Gilroy",
                      fontWeight: 600,
                    }}
                  >
                    {invoiceList?.balanceDue}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <Form.Group controlId="exampleForm.ControlInput3">
                    <Form.Label
                      style={{
                        fontSize: 14,
                        color: "#222222",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                        marginBottom: 2,
                      }}
                    >
                      Paid Amount{" "}
                      <span
                        style={{
                          color: "red",
                          fontSize: "20px",
                        }}
                      >
                        *
                      </span>
                    </Form.Label>

                    <Form.Control
                      type="number"
                      min="0"
                      step="1"
                      style={{
                        fontSize: 16,
                        color: "#4B4B4B",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                        boxShadow: "none",
                        border: "1px solid #D9D9D9",
                        height: 50,
                        borderRadius: 8,
                      }}
                      placeholder="Enter Amount"
                      className="no-spinner"
                      value={payableAmount}
                      onChange={handleAmount}
                      //   onKeyDown={(e) => {
                      //       if (e.key === "-" || e.key === "e") {
                      //           e.preventDefault();
                      //       }
                      //   }}
                    />

                    {amounterrormsg && (
                      <ErrorMessage message={amounterrormsg} type="error" />
                    )}
                  </Form.Group>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <Form.Group controlId="exampleForm.ControlInput3">
                    <Form.Label
                      style={{
                        fontSize: 14,
                        color: "#222222",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                        marginBottom: 2,
                      }}
                    >
                      Balance Amount{" "}
                      <span
                        style={{
                          color: "red",
                          fontSize: "20px",
                        }}
                      >
                        *
                      </span>
                    </Form.Label>

                    <Form.Control
                      disabled
                      type="number"
                      min="0"
                      step="1"
                      style={{
                        fontSize: 16,
                        color: "#4B4B4B",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                        boxShadow: "none",
                        border: "1px solid #D9D9D9",
                        height: 50,
                        borderRadius: 8,
                      }}
                      placeholder="Enter Amount"
                      className="no-spinner"
                      value={balance}
                    />
                  </Form.Group>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <Form.Group controlId="purchaseDate">
                    <Form.Label
                      style={{
                        fontSize: 14,
                        color: "#222222",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      Paid Date{" "}
                      <span
                        style={{
                          color: "red",
                          fontSize: "20px",
                        }}
                      >
                        *
                      </span>
                    </Form.Label>
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                      }}
                    >
                      <div
                        className="datepicker-wrapper"
                        style={{ position: "relative", width: "100%" }}
                      >
                        <DatePicker
                          style={{
                            width: "100%",
                            height: 48,
                            cursor: "pointer",
                            fontFamily: "Gilroy",
                          }}
                          format="DD/MM/YYYY"
                          placeholder="DD/MM/YYYY"
                          value={selectedDate ? dayjs(selectedDate) : null}
                          onChange={(date) => {
                            setDateErrmsg("");
                            setAccountError("");
                            setSelectedDate(date ? date.toDate() : null);
                          }}
                          disabledDate={(current) => {
                            const invoiceDate = invoiceList?.invoiceDate
                              ? dayjs(
                                  invoiceList?.invoiceDate,
                                  "DD/MM/YYYY",
                                ).startOf("day")
                              : null;

                            return (
                              (invoiceDate &&
                                current.isBefore(invoiceDate, "day")) ||
                              current.isAfter(dayjs().endOf("day"))
                            );
                          }}
                          getPopupContainer={(triggerNode) =>
                            triggerNode.closest(".show-scroll") || document.body
                          }
                        />
                      </div>
                    </div>
                    {dateerrmsg.trim() !== "" && (
                      <ErrorMessage message={dateerrmsg} type="error" />
                    )}
                  </Form.Group>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <Form.Group
                    className=""
                    controlId="exampleForm.ControlInput2"
                  >
                    <Form.Label
                      style={{
                        fontSize: 14,
                        color: "#222222",
                        fontFamily: "'Gilroy', sans-serif",
                        fontWeight: 500,
                      }}
                    >
                      Mode of Transaction{" "}
                      <span
                        style={{
                          color: "red",
                          fontSize: "20px",
                        }}
                      >
                        *
                      </span>
                    </Form.Label>

                    <Select
                      options={combinedOptions}
                      onChange={(selectedOption) =>
                        handleTransaction(selectedOption?.value)
                      }
                      value={
                        modeOfPayment
                          ? combinedOptions.find(
                              (option) => option.value === modeOfPayment,
                            )
                          : null
                      }
                      placeholder="Please Select"
                      classNamePrefix="custom"
                      menuPlacement="auto"
                      noOptionsMessage={() => "No options available"}
                      styles={{
                        control: (base) => ({
                          ...base,
                          height: "49px",
                          border: "1px solid #D9D9D9",
                          borderRadius: "8px",
                          fontSize: "16px",
                          color: "#4B4B4B",
                          fontFamily: "Gilroy, sans-serif",
                          fontWeight: 500,
                          boxShadow: "none",
                        }),
                        menu: (base) => ({
                          ...base,
                          backgroundColor: "#f8f9fa",
                          border: "1px solid #ced4da",
                          fontFamily: "Gilroy, sans-serif",
                        }),
                        menuList: (base) => ({
                          ...base,
                          backgroundColor: "#f8f9fa",
                          maxHeight: "120px",
                          padding: 0,
                          scrollbarWidth: "thin",
                          overflowY: "auto",
                          fontFamily: "Gilroy, sans-serif",
                        }),
                        placeholder: (base) => ({
                          ...base,
                          color: "#555",
                        }),
                        option: (base, state) => ({
                          ...base,
                          cursor: "pointer",
                          backgroundColor: state.isFocused
                            ? "lightblue"
                            : "white",
                          color: "#000",
                        }),
                        dropdownIndicator: (base) => ({
                          ...base,
                          color: "#555",
                          cursor: "pointer",
                        }),
                        indicatorSeparator: () => ({
                          display: "none",
                        }),
                      }}
                    />

                    {paymodeerrormsg.trim() !== "" && (
                      <ErrorMessage message={paymodeerrormsg} type="error" />
                    )}
                  </Form.Group>
                </div>

                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label
                      style={{
                        fontSize: 14,
                        color: "#222222",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      Transaction ID
                    </Form.Label>
                    <Form.Control
                      type="text"
                      style={{
                        fontSize: 16,
                        color: "#4B4B4B",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                        boxShadow: "none",
                        border: "1px solid #D9D9D9",
                        height: 50,
                        borderRadius: 8,
                      }}
                      placeholder="Enter Transaction ID"
                      value={transactionId}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </div>

                {modeOfPayment === "Net Banking" && (
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <Form.Label
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        fontFamily: "Gilroy",
                      }}
                    >
                      Account{" "}
                      <span
                        style={{
                          color: "red",
                          fontSize: "20px",
                        }}
                      >
                        {" "}
                        *{" "}
                      </span>
                    </Form.Label>
                    <Select
                      placeholder="Select Account"
                      options={
                        bankking?.length > 0
                          ? bankking.map((u) => ({
                              value: u.id,
                              label: u.bank_name,
                            }))
                          : []
                      }
                      value={
                        bankking
                          .map((u) => ({
                            value: u.id,
                            label: u.bank_name,
                          }))
                          .find((opt) => opt.value === account) || null
                      }
                      onChange={handleAccount}
                      styles={{
                        control: (base) => ({
                          ...base,
                          height: "48px",
                          border: "1px solid #D9D9D9",
                          borderRadius: "8px",
                          fontSize: "16px",
                          color: "#4B4B4B",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                          boxShadow: "none",
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
                          color: "#555",
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
                          backgroundColor: state.isFocused
                            ? "#f0f0f0"
                            : "white",
                          color: "#000",
                        }),
                      }}
                      noOptionsMessage={() =>
                        bankking?.length === 0
                          ? "No accounts available"
                          : "No match found"
                      }
                    />

                    {accountError.trim() !== "" && (
                      <ErrorMessage message={accountError} type="error" />
                    )}
                  </div>
                )}
              </div>
            </>
            {totalErrormsg.trim() !== "" && (
              <ErrorMessage message={totalErrormsg} type="error" />
            )}
          </Modal.Body>

          {state.InvoiceList.payapleAmountError ? (
            <div className="d-flex justify-content-center">
              <ErrorMessage
                message={state.InvoiceList.payapleAmountError}
                type="error"
              />
            </div>
          ) : null}

          {formRecordLoading && (
            <div className="absolute top-1/2 left-1/2 z-10 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 opacity-75">
              <div className="w-10 h-10 border-t-4 border-r-4 border-t-[#1E45E1] border-r-transparent rounded-full animate-spin"></div>
            </div>
          )}

          <Modal.Footer style={{ border: "none" }}>
            <div className="text-end mt-4">
              <Button
                variant=""
                className="me-2"
                onClick={handleClose}
                style={{
                  fontFamily: "Gilroy",
                  fontSize: "1rem",
                  fontWeight: 400,
                }}
              >
                Cancel
              </Button>
              <Button
                disabled={formRecordLoading}
                style={{
                  fontFamily: "Gilroy",
                  fontSize: "1rem",
                  fontWeight: 400,
                  backgroundColor: "#1E45E1",
                }}
                onClick={handleSaveInvoiceList}
              >
                Record
              </Button>
            </div>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </div>
  );
}
RecordPayment.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  selectedUserId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  invoiceList: PropTypes.shape({
    balanceDue: PropTypes.number,
    InvoiceId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),

  // invoiceValue: PropTypes.shape({
  //     invoiceId: PropTypes.oneOfType([
  //         PropTypes.string,
  //         PropTypes.number
  //     ]),
  //     invoiceDate: PropTypes.string,
  //     Date: PropTypes.string
  // })
};

export default RecordPayment;

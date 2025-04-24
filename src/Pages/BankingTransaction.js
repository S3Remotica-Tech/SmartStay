/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { MdError } from "react-icons/md";
import "./BankingAddForm.css";
import moment from "moment";
import PropTypes from "prop-types";
import Select from "react-select";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import {CloseCircle} from "iconsax-react";

function BankingEditTransaction(props) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [account, setAccount] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [amount, setAmount] = useState("");
  const [transaction, setTransaction] = useState("");
  const [describtion, setDescribtion] = useState("");
  const [dateError, setDateError] = useState("");
  const [accountError, setAccountError] = useState("");
  const [amountError, setAmountError] = useState("");
  const [transError, setTransError] = useState("");
  // const [describtionError, setdescribtionError] = useState("");
  const [id, setId] = useState("");
  const [error, setError] = useState("");
  const [hostel_id, setHostel_Id] = useState("");

  useEffect(() => {
    setHostel_Id(state.login.selectedHostel_Id);
  }, [state?.login?.selectedHostel_Id]);
  useEffect(() => {
    dispatch({ type: "BANKINGLIST", payload: { hostel_id: hostel_id } });
  }, []);

  const handleAccount = (selectedOption) => {
    setAccount(selectedOption?.value || '');
    setAccountError("");
    setError("");
  };
  const handleAmount = (e) => {
    const value = (e.target.value)
    if (!/^\d*$/.test(value)) {
      return; 
    }
    setAmount(value);
    setAmountError("");
    setError("");
  };
  const handleTransaction = (e) => {
    setTransaction(e.target.value);
    if (e.target.value === "Select Transaction") {
      setTransError("Please select a valid type");
    } else {
      setTransError("");
    }
    setTransError("");
    setError("");
  };
  const handleDescription = (e) => {
    setDescribtion(e.target.value);
    // setdescribtionError("");
    setError("");
  };
  const [initialStateAssign, setInitialStateAssign] = useState({
    account: "",
    selectedDate: "",
    amount: "",
    transaction: "",
    describtion: "",
  });
  useEffect(() => {
    setAccount(props.updateTransaction.bank_id);
    setSelectedDate(props.updateTransaction.date || "");

    setSelectedDate(
      props.updateTransaction.date
        ? moment(props.updateTransaction.date).toDate("")
        : null
    );
    setId(props.updateTransaction.id);
    setAmount(props.updateTransaction.amount);
    setTransaction(props.updateTransaction.type);
    setDescribtion(props.updateTransaction.description);

    setInitialStateAssign({
      account: props.updateTransaction.bank_id || "",
      selectedDate: props.updateTransaction.date || "",
      amount: props.updateTransaction.amount || "",
      transaction: props.updateTransaction.type || "",
      describtion: props.updateTransaction.description || "",
    });
  }, []);

  const handleCloseTransactionEdit = () => {
    props.setEditTransactionForm(false);
    setDescribtion("");
    setError("");
  };
  const validateField = (value, fieldName) => {
    if (!value || (typeof value === "string" && value.trim() === "")) {
      switch (fieldName) {
        case "account":
          setAccountError("Account is Required");
          break;
        case "selectedDate":
          setDateError("Date is Required");
          break;
        case "amount":
          setAmountError("Amount is Required");
          break;
        case "transaction":
          setTransError("Transaction is Required");
          break;
        // case "describtion":
        //   setdescribtionError("Description is Required");
        //   break;
        default:
          break;
      }
      return false;
    }
    return true;
  };

  const handleEditSave = () => {
    let isValid = true;

    if (!validateField(account, "account")) isValid = false;
    if (!validateField(selectedDate, "selectedDate")) isValid = false;
    if (!validateField(amount, "amount")) isValid = false;
    if (!validateField(transaction, "transaction")) isValid = false;
    if (!validateField(describtion, "describtion")) isValid = false;

    if (!isValid) return;

    if (
      transaction === "" ||
      transaction === "Select Transaction" ||
      transaction === 0
    ) {
      setTransError("Please select a valid transaction type");
      return;
    }
    if (account === "Selected Account") {
      setAccountError("Please select a valid account");
      return;
    }

    const isValidDate = (date) => !isNaN(Date.parse(date));

    const isChanged =
      (isNaN(account)
        ? String(account).toLowerCase() !==
          String(initialStateAssign.account).toLowerCase()
        : Number(account) !== Number(initialStateAssign.account)) ||
      (isNaN(transaction)
        ? String(transaction).toLowerCase() !==
          String(initialStateAssign.transaction).toLowerCase()
        : Number(transaction) !== Number(initialStateAssign.transaction)) ||
      (isValidDate(selectedDate) && isValidDate(initialStateAssign.selectedDate)
        ? new Date(selectedDate).toISOString().split("T")[0] !==
          new Date(initialStateAssign.selectedDate).toISOString().split("T")[0]
        : selectedDate !== initialStateAssign.selectedDate) ||
      Number(amount) !== Number(initialStateAssign.amount) ||
      String(describtion) !== String(initialStateAssign.describtion);

    if (!isChanged) {
      setError("No Changes Detected");
      return;
    }

    setError("");
    const formattedDate = moment(selectedDate).format("YYYY-MM-DD");

    dispatch({
      type: "EDITBANKTRANSACTION",
      payload: {
        id: id,
        bank_id: account,
        date: formattedDate,
        amount: amount,
        type: transaction,
        desc: describtion,
      },
    });
  };

  useEffect(() => {
    if (state.bankingDetails.statusEditTrasactionCode === 200) {
      handleCloseTransactionEdit();
      dispatch({ type: "BANKINGLIST", payload: { hostel_id: hostel_id } });
      setTimeout(() => {
        dispatch({ type: "CLEAR_EDIT_BANK_TRANSACTION" });
      }, 1000);
    }
  }, [state.bankingDetails.statusEditTrasactionCode]);

  useEffect(() => {
    if (state.bankingDetails.statusCodeForGetBanking === 200) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_BANKING_LIST" });
      }, 200);
    }
  }, [state.bankingDetails.statusCodeForGetBanking]);



  return (
    <>
      <Modal
        show={props.EditTransactionForm}
        onHide={() => handleCloseTransactionEdit()}
        backdrop="static"
        centered
      >
        <Modal.Header style={{ position: "relative" }}>
          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              fontFamily: "Gilroy",
            }}
          >
            Edit Transaction
          </div>
          {/* <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={handleCloseTransactionEdit}
            style={{
              position: "absolute",
              right: "15px",
              marginTop: -5,
              border: "1px solid black",
              background: "transparent",
              cursor: "pointer",
              padding: "0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "25px",
              height: "25px",
              borderRadius: "50%",
            }}
          >
          <span
                    aria-hidden="true"
                    style={{
                      fontSize: "30px",
                      paddingBottom: "5px",
                    }}
                  >
                    &times;
                  </span>
          </button> */}
          <CloseCircle size="24" color="#000" onClick={handleCloseTransactionEdit} 
            style={{ cursor: 'pointer' }}/>
        </Modal.Header>
        <Modal.Body>
          <div className="row ">
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
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
              {/* <Form.Select
                aria-label="Default select example"
                placeholder="Select no. of floor"
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
                id="form-selects"
                className="border"
                value={account}
                onChange={(e) => handleAccount(e)}
              >
                <option value="">Selected Account</option>
                {state.bankingDetails?.bankingList?.banks?.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.bank_name}
                  </option>
                ))}
              </Form.Select> */}
             
  <Select
    options={
      state.bankingDetails?.bankingList?.banks?.length > 0
        ? state.bankingDetails.bankingList.banks.map((u) => ({
            value: u.id,
            label: u.bank_name,
          }))
        : []
    }
    onChange={ handleAccount}
    value={
      account
        ? {
            value: account,
            label:
              state.bankingDetails?.bankingList?.banks?.find(
                (b) => b.id === account
              )?.bank_name || "Selected Account",
          }
        : null
    }
    placeholder="Selected Account"
    classNamePrefix="custom"
    menuPlacement="auto"
    noOptionsMessage={() => "No accounts available"}
    styles={{
      control: (base) => ({
        ...base,
        height: "50px",
        border: "1px solid #D9D9D9",
        borderRadius: "8px",
        fontSize: "16px",
        color: "#4B4B4B",
        fontFamily: "Gilroy",
        fontWeight: account ? 600 : 500,
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
      }),
      placeholder: (base) => ({
        ...base,
        color: "#555",
      }),
      dropdownIndicator: (base) => ({
        ...base,
        color: "#555",
        cursor:"pointer"
      }),
      option: (base, state) => ({
        ...base,
        cursor: "pointer", 
        backgroundColor: state.isFocused ? "lightblue" : "white", 
        color: "#000",
      }),
      indicatorSeparator: () => ({
        display: "none",
      }),
    }}
  />


              {accountError && (
                <div style={{ color: "red" }}>
                  <MdError style={{ fontSize: "14px", marginRight: "5px" }} />
                  <span
                    style={{
                      color: "red",
                      fontSize: 12,
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    {accountError}
                  </span>
                </div>
              )}
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <Form.Group className="mb-2" controlId="purchaseDate">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Date<span style={{ color: "red", fontSize: "20px" }}>*</span>
                </Form.Label>
              
                <div className="datepicker-wrapper" style={{ position: 'relative', width: "100%" }}>
                  <DatePicker
                    style={{ width: "100%", height: 48,cursor:"pointer" }}
                    format="DD/MM/YYYY"
                    placeholder="DD/MM/YYYY"
                    value={selectedDate ? dayjs(selectedDate) : null}
                    onChange={(date) => {
                      setDateError("");
                      setError("");
                      setSelectedDate(date ? date.toDate() : null);
                    }}
                    getPopupContainer={(triggerNode) => triggerNode.closest('.datepicker-wrapper')}
                  />
                </div>
              </Form.Group>

              {dateError && (
                <div style={{ color: "red" }}>
                  <MdError style={{ fontSize: "13px", marginRight: "5px" }} />
                  <span
                    style={{
                      color: "red",
                      fontSize: 12,
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    {dateError}
                  </span>
                </div>
              )}
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <Form.Group>
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Amount{" "}
                  <span style={{ color: "red", fontSize: "20px" }}> * </span>
                </Form.Label>
                <FormControl
                  type="text"
                  id="form-controls"
                  placeholder="Enter Amount"
                  value={amount}
                  onChange={(e) => handleAmount(e)}
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
                />
              </Form.Group>
              {amountError && (
                <div style={{ color: "red" }}>
                  <MdError style={{ fontSize: "14px", marginRight: "5px" }} />
                  <span
                    style={{
                      fontSize: 12,
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    {amountError}
                  </span>
                </div>
              )}
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <Form.Label
                style={{
                  fontSize: 14,
                  color: "#222222",
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                }}
              >
                Transaction{" "}
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
              <Form.Select
                aria-label="Default select example"
                className="border"
                // style={{ backgroundColor: "#f8f9fa", padding: 10, border: "none", boxShadow: "none", width: "100%", fontSize: 12, fontWeight: 700, textTransform: "capitalize" }}
                style={{
                  fontSize: 16,
                  color: "#4B4B4B",
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                  boxShadow: "none",
                  border: "1px solid #D9D9D9",
                  height: 50,
                  borderRadius: 8,
                  cursor:"pointer"
                }}
                value={transaction}
                onChange={(e) => handleTransaction(e)}
              >
                <option value="">Select Transaction</option>
                <option value={1}>Credit</option>
                <option value={2}>Debit</option>
              </Form.Select>
              {transError && (
                <div style={{ color: "red" }}>
                  <MdError style={{ fontSize: "14px", marginRight: "5px" }} />
                  <span
                    style={{
                      fontSize: 12,
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    {transError}
                  </span>
                </div>
              )}
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <Form.Group>
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                    marginTop: 5,
                  }}
                >
                  Description{" "}
                  <span style={{ color: "red", fontSize: "20px" }}> * </span>
                </Form.Label>
                <FormControl
                  type="text"
                  id="form-controls"
                  placeholder="Enter description"
                  value={describtion}
                  onChange={(e) => handleDescription(e)}
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
                />
              </Form.Group>
              {/* {describtionError && (
                <div style={{ color: "red" }}>
                  <MdError style={{ fontSize: "14px", marginRight: "5px" }} />
                  <span
                    style={{
                      fontSize: 12,
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    {describtionError}
                  </span>
                </div>
              )} */}
            </div>
          </div>
        </Modal.Body>

        {error && (
          <div
            className=""
            style={{ color: "red", textAlign: "center", paddingBottom: "8px" }}
          >
            <MdError style={{ fontSize: "14px", marginRight: "5px" }} />
            <span
              style={{
                color: "red",
                fontSize: 12,
                fontFamily: "Gilroy",
                fontWeight: 500,
              }}
            >
              {error}
            </span>
          </div>
        )}
        <Modal.Footer
          className="d-flex justify-content-center"
          style={{ borderTop: "none" }}
        >
          <Button
            className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={{
              backgroundColor: "#1E45E1",
              width: "100%",
              height: 50,
              fontWeight: 600,
              borderRadius: 12,
              fontSize: 16,
              fontFamily: "Gilroy",
              // marginBottom: 15
              marginTop: -10,
            }}
            onClick={handleEditSave}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
BankingEditTransaction.propTypes = {
  updateTransaction: PropTypes.func.isRequired,
  setDeleteTransactionForm: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired,
  EditTransactionForm: PropTypes.func.isRequired,
  setEditTransactionForm: PropTypes.func.isRequired
};

export default BankingEditTransaction;

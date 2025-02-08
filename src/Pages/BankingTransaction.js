import React, { useState, useEffect, useRef } from "react";
import { Button, Offcanvas, Form, FormControl } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import Calendars from "../Assets/Images/New_images/calendar.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdError } from "react-icons/md";
import { setISODay } from "date-fns";
import emptyimg from "../Assets/Images/New_images/empty_image.png";
import "./BankingAddForm.css";
import moment from "moment";

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
  const [describtionError, setdescribtionError] = useState("");
  const [id, setId] = useState("");
  const [error, setError] = useState("")
  const [hostel_id, setHostel_Id] = useState("")

  useEffect(() => {
    setHostel_Id(state.login.selectedHostel_Id)
  }, [state?.login?.selectedHostel_Id]);
  useEffect(() => {
    dispatch({ type: "BANKINGLIST", payload: { hostel_id: hostel_id } });
  }, []);

  const handleAccount = (e) => {
    setAccount(e.target.value);
    setAccountError("")
    setError("")
  };
  const handleDate = (e) => {
    setSelectedDate(e.target.value);
    setError("")

  };
  const handleAmount = (e) => {
    setAmount(e.target.value);
    setAmountError("")
    setError("")
  };
  const handleTransaction = (e) => {
    setTransaction(e.target.value);
    if (e.target.value === "Select Transaction") {
      setTransError("Please select a valid type");
    } else {
      setTransError("");
    }
    setTransError("")
    setError("")
  };
  const handleDescription = (e) => {
    setDescribtion(e.target.value);
    setdescribtionError("")
    setError("")
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
    // setSelectedDate(props.updateTransaction.date);
    setSelectedDate(props.updateTransaction.date || "");
          // const formattedJoiningDate = item.joining_date
          //   ? new Date(item.joining_date)
          //   : null;
          // setJoiningDate(formattedJoiningDate);
          setSelectedDate(
            props.updateTransaction.date ? moment(props.updateTransaction.date).toDate("") : null
          );
    setId(props.updateTransaction.id)
    // const isValidDate =
    //   props.updateTransaction.date &&
    //   props.updateTransaction.date !== "0000-00-00";
    // const parsedDate = isValidDate
    //   ? new Date(props.updateTransaction.date)
    //   : null;

    // if (parsedDate && !isNaN(parsedDate.getTime())) {
    //   setSelectedDate(parsedDate);
    // } else {
    //   setSelectedDate("");
    // }
    setAmount(props.updateTransaction.amount);
    setTransaction(props.updateTransaction.type);
    setDescribtion(props.updateTransaction.description);




    setInitialStateAssign({
      account: props.updateTransaction.bank_id || "",
      selectedDate: props.updateTransaction.date || "",
      amount: props.updateTransaction.amount || "",
      transaction: props.updateTransaction.type || "",
      describtion: props.updateTransaction.description || ""

    });
  }, []);

  const handleCloseTransactionEdit = () => {
    props.setEditTransactionForm(false);
    setDescribtion("")
    setError("")
  };
  const handleCloseTransactionDelete = () => {
    props.setDeleteTransactionForm(false);
  };
  const validateField = (value, fieldName) => {
    if (!value || (typeof value === "string" && value.trim() === "")) {
      switch (fieldName) {
        case "account":
          setAccountError("Account is required");
          break;
        case "selectedDate":
          setDateError("Date is required");
          break;
        case "amount":
          setAmountError("Amount is required");
          break;
        case "transaction":
          setTransError("Transaction is required");
          break;
        case "describtion":
          setdescribtionError("Description is required");
          break;
        default:
          break;
      }
      return false;
    }
    return true;
  };

  // const handleEditSave = () => {
  //   if (!validateField(account, "account"));
  //   if (!validateField(selectedDate, "selectedDate"));

  //   if (!validateField(amount, "amount"));
  //   if (!validateField(transaction, "transaction"));
  //   if (!validateField(describtion, "describtion"));

  //   if (transaction === "" || transaction === "Select Transaction" || transaction === 0) {
  //     setTransError("Please select a valid transaction type");
  //     return;
  //   }
  //   if (account === "Selected Account" || accountError) {
  //     setAccountError("Please select a valid account");
  //     return;
  //   }
  //   // const isChanged = 
  //   // account !== initialStateAssign.account ||

  //   //     Number(amount) !== Number(initialStateAssign.amount) ||
  //   //     selectedDate !== initialStateAssign.selectedDate ||
  //   //     transaction !== initialStateAssign.transaction ||
  //   //     describtion !== initialStateAssign.describtion;
  //   const isValidDate = (date) => {
  //     return !isNaN(Date.parse(date));
  //   };
  //   const isChanged =
  //     (isNaN(account)
  //       ? String(account).toLowerCase() !==
  //       String(initialStateAssign.account).toLowerCase()
  //       : Number(account) !== Number(initialStateAssign.account)) ||
  //     (isNaN(transaction)
  //       ? String(transaction).toLowerCase() !==
  //       String(initialStateAssign.transaction).toLowerCase()
  //       : Number(transaction) !== Number(initialStateAssign.transaction)) ||

  //     (isValidDate(selectedDate) && isValidDate(initialStateAssign.selectedDate)
  //       ? new Date(selectedDate).toISOString().split("T")[0] !==
  //       new Date(initialStateAssign.selectedDate).toISOString().split("T")[0]
  //       : selectedDate !== initialStateAssign.selectedDate) ||
  //     Number(amount) !== Number(initialStateAssign.amount) ||
  //     String(describtion) !== String(initialStateAssign.describtion)


  //   if (!isChanged) {
  //     setError("No changes detected.");
  //     return;
  //   }
  //   else {
  //     setError("");
  //   }

  //   const modifiedDate = new Date(selectedDate);
  //   modifiedDate.setDate(modifiedDate.getDate() + 1);
  //   dispatch({
  //     type: "EDITBANKTRANSACTION",
  //     payload: { id: id, bank_id: account, date: modifiedDate.toISOString().split("T")[0], amount: amount, type: transaction, desc: describtion },
  //   });
  // }



  const handleEditSave = () => {
    let isValid = true;
  

    if (!validateField(account, "account")) isValid = false;
    if (!validateField(selectedDate, "selectedDate")) isValid = false;
    if (!validateField(amount, "amount")) isValid = false;
    if (!validateField(transaction, "transaction")) isValid = false;
    if (!validateField(describtion, "describtion")) isValid = false;
  
    
    if (!isValid) return;
  
  
    if (transaction === "" || transaction === "Select Transaction" || transaction === 0) {
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
        ? String(account).toLowerCase() !== String(initialStateAssign.account).toLowerCase()
        : Number(account) !== Number(initialStateAssign.account)) ||
      (isNaN(transaction)
        ? String(transaction).toLowerCase() !== String(initialStateAssign.transaction).toLowerCase()
        : Number(transaction) !== Number(initialStateAssign.transaction)) ||
      (isValidDate(selectedDate) && isValidDate(initialStateAssign.selectedDate)
        ? new Date(selectedDate).toISOString().split("T")[0] !== 
          new Date(initialStateAssign.selectedDate).toISOString().split("T")[0]
        : selectedDate !== initialStateAssign.selectedDate) ||
      Number(amount) !== Number(initialStateAssign.amount) ||
      String(describtion) !== String(initialStateAssign.describtion);
  

    if (!isChanged) {
      setError("No changes detected.");
      return;
    }
  
    
    setError("");
  
    // const modifiedDate = new Date(selectedDate);
    // modifiedDate.setDate(modifiedDate.getDate() + 1);
  
   const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
   
       // Normalize phone number
      //  const normalizedPhoneNumber = MobileNumber.replace(/\s+/g, "");
    dispatch({
      type: "EDITBANKTRANSACTION",
      payload: {
        id: id,
        bank_id: account,
        date: formattedDate,
        amount: amount,
        type: transaction,
        desc: describtion
      },
    });
  };
  




  useEffect(() => {
    if (state.bankingDetails.statusEditTrasactionCode === 200) {
      handleCloseTransactionEdit()
      dispatch({ type: "BANKINGLIST", payload: { hostel_id: hostel_id } });
      setTimeout(() => {
        dispatch({ type: "CLEAR_EDIT_BANK_TRANSACTION" });
      }, 1000);
    }
  }, [state.bankingDetails.statusEditTrasactionCode])

  useEffect(() => {
    if (state.bankingDetails.statusCodeForGetBanking === 200) {

      setTimeout(() => {
        dispatch({ type: "CLEAR_BANKING_LIST" });
      }, 200);
    }
  }, [state.bankingDetails.statusCodeForGetBanking]);





  const customDateInput = (props) => {
    return (
      <div
        className="date-input-container w-100"
        onClick={props.onClick}
        style={{ position: "relative" }}
      >
        <FormControl
          type="text"
          className="date_input"
          value={props.value || "DD/MM/YYYY"}
          readOnly
          style={{
            border: "1px solid #D9D9D9",
            borderRadius: 8,
            padding: 9,
            fontSize: 14,
            fontFamily: "Gilroy",
            fontWeight: props.value ? 600 : 500,
            width: "100%",
            height: 50,
            boxSizing: "border-box",
            boxShadow: "none",
          }}
        />
        <img
          src={Calendars}
          style={{
            height: 24,
            width: 24,
            marginLeft: 10,
            cursor: "pointer",
            position: "absolute",
            right: 10,
            top: "50%",
            transform: "translateY(-50%)",
          }}
          alt="Calendar"
          onClick={props.onClick}
        />
      </div>
    );
  };

  return (
    <>
      <Modal
        show={props.EditTransactionForm}
        onHide={() => handleCloseTransactionEdit()}
        backdrop="static"
        centered
        className="BankingCustom-modal"
      >
        {/* <Modal.Header closeButton className="text-center">
          <Modal.Title style={{ fontSize: 18,fontFamily:"Gilroy",fontWeight:600 }} className="text-center">
            Add a Reading
          </Modal.Title>
        </Modal.Header> */}

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
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={handleCloseTransactionEdit}
            style={{
              position: "absolute",
              right: "10px",
              top: "16px",
              border: "1px solid black",
              background: "transparent",
              cursor: "pointer",
              padding: "0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                fontSize: "30px",
                paddingBottom: "6px",
              }}
            >
              &times;
            </span>
          </button>
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
              <Form.Select
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
              </Form.Select>
              {accountError && (
                <div style={{ color: "red" }}>
                  <MdError style={{fontSize:"13px",marginRight:"5px" }}/>
                  <span style={{ color: "red", fontSize: 13, fontFamily: "Gilroy", fontWeight: 500 }}>{accountError}</span>
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
                <div style={{ position: "relative", width: "100%" }}>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => {
                      setDateError("");
                      setError("")
                      setSelectedDate(date);
                    }}
                    dateFormat="yyyy/MM/dd"
                    minDate={null}
                    maxDate={null}
                    customInput={customDateInput({
                      value:
                        selectedDate instanceof Date &&
                          !isNaN(selectedDate.getTime())
                          ? selectedDate.toLocaleDateString("en-GB")
                          : "",
                    })}
                  />
                </div>
              </Form.Group>

              {dateError && (
                <div style={{ color: "red" }}>
                  <MdError style={{fontSize:"13px",marginRight:"5px" }}/>
                  <span style={{ color: "red", fontSize: 13, fontFamily: "Gilroy", fontWeight: 500 }}>{dateError}</span>
                </div>
              )}
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <Form.Group >
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Amount.{" "}
                  <span style={{ color: "red", fontSize: "20px" }}> * </span>
                </Form.Label>
                <FormControl
                  type="text"
                  id="form-controls"
                  placeholder="Enter account no."
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
                  <MdError style={{fontSize:"13px",marginRight:"5px" }}/>
                  <span style={{ fontSize: 13, fontFamily: "Gilroy", fontWeight: 500 }}>{amountError}</span>
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
                }}
                value={transaction}
                onChange={(e) => handleTransaction(e)}
              >
                <option value="">Select Transaction</option>
                <option value={1}>Credit</option>
                <option value={2}>Debit</option>
                {/* {state.UsersList?.hostelList?.map(
                                        (item) => (
                                          <option key={item.id} value={item.id}>
                                            {item.Name}
                                          </option>
                                        )
                                      )} */}
              </Form.Select>
              {transError && (
                <div style={{ color: "red" }}>
                  <MdError style={{fontSize:"13px",marginRight:"5px" }}/>
                  <span style={{fontSize: 13, fontFamily: "Gilroy", fontWeight: 500 }}>{transError}</span>
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
              {describtionError && (
                <div style={{ color: "red" }}>
                  <MdError style={{fontSize:"13px",marginRight:"5px" }}/>
                  <span style={{ fontSize: 13, fontFamily: "Gilroy", fontWeight: 500 }}>{describtionError}</span>
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
        
         {error && (
                  <div className="d-flex justify-content-center align-items-center " style={{ color: "red" }}>
                    <MdError  style={{fontSize:"14px",marginRight:"5px"}}/>
                    <span style={{ color: "red", fontSize: 13, fontFamily: "Gilroy", fontWeight: 500 }}>{error}</span>
                  </div>
                )}
        <Modal.Footer className="d-flex justify-content-center" style={{ borderTop: "none" }}>
          <Button
            className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={{
              backgroundColor: "#1E45E1",
              fontWeight: 600,
              height: 50,
              borderRadius: 12,
              fontSize: 16,
              fontFamily: "Montserrat, sans-serif",
              marginBottom: 15
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
export default BankingEditTransaction;

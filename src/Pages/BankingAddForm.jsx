/* eslint-disable react-hooks/exhaustive-deps */
import Modal from "react-bootstrap/Modal";
import { FormControl, Nav } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { MdError } from "react-icons/md";
import "./BankingAddForm.css";
import PropTypes from "prop-types";
import { CloseCircle } from "iconsax-react";
import Select , { components } from "react-select";
import ErrorMessage from '../Components/ErrorMessage'

function BankingAddForm(props) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [accountName, setAccountName] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [bankName, setBankName] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [description, setDescription] = useState("");
  const [bankId, setBankId] = useState("")
  const [error, setError] = useState("");
  const [accountNameError, setaccountnameError] = useState("");
  const [accountNumberError, setaccountNumberError] = useState("");
  const [bankNameError, setBankNameError] = useState("");
  const [ifcsCodeError, setIfcsCodeError] = useState("");
  const [hostel_id, setHostel_Id] = useState("")
  const [formLoading, setFormLoading] = useState(false)
  const [isChangedError, setIsChangedError] = useState("")

  useEffect(() => {
    setHostel_Id(state.login.selectedHostel_Id)
  }, [state?.login?.selectedHostel_Id]);



  const handleAccountName = (e) => {
    const value = e.target.value
    const pattern = /^[a-zA-Z\s]*$/;
    if (!pattern.test(value)) {
      return;
    }
    setAccountName(value);
    setError("")
    setIsChangedError("")
    setaccountnameError("")
    dispatch({ type: 'REMOVE_ERROR_BOOKING' })
  };
  const handleAccountNo = (e) => {
    const value = e.target.value;


    if (!/^\d*$/.test(value)) {
      return;
    }

    setAccountNo(value);
    setError("");
    setIsChangedError("");
    dispatch({ type: "REMOVE_ERROR_BOOKING" });


    if (value.length > 0 && (value.length < 9 || value.length > 18)) {
      setaccountNumberError("Account Number Must Be 9–18 Digits");
    } else {
      setaccountNumberError("");
    }
  };

  const handleBankName = (e) => {
    const value = e.target.value
    const pattern = /^[a-zA-Z\s]*$/;
    if (!pattern.test(value)) {
      return;
    }
    setBankName(value);
    setError("")
    setIsChangedError("")
    setBankNameError("")
    dispatch({ type: 'REMOVE_ERROR_BOOKING' })
  };
  const handleIfscCode = (e) => {
    setIfscCode(e.target.value);
    setError("")
    setIsChangedError("")
    setIfcsCodeError("")
    dispatch({ type: 'REMOVE_ERROR_BOOKING' })
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
    setError("")
    setIsChangedError("")
    dispatch({ type: 'REMOVE_ERROR_BOOKING' })
  };
  const [upiId, setUpiId] = useState("")
  const [upiIdError, setUpiIdError] = useState("")

  const handleUpiId = (e) => {
    setUpiId(e.target.value)
    setUpiIdError("")
    setIsChangedError("")
  }

   const [bankaccount, setBankAccount] = useState("");
   const [bankaccountError, setBankAccountError] = useState("");
   const [isSelectOpen, setIsSelectOpen] = useState(false);
     const [bankking, setBanking] = useState("")

       useEffect(() => {
         if (hostel_id) {
           // setLoader(true);
           dispatch({ type: "BANKINGLIST", payload: hostel_id });
         }
       }, [hostel_id]);
     
       useEffect(() => {
         if (state.bankingDetails.statusCodeForGetBanking === 200) {
        
           setBanking(state.bankingDetails?.bankingList?.listBanks)
           setTimeout(() => {
             dispatch({ type: "CLEAR_BANKING_LIST" });
           }, 200);
         }
       }, [state.bankingDetails.statusCodeForGetBanking]);
  
     const handleModeOfPaymentChange = (selectedOption) => {
      if (!selectedOption) return;
      // setAllFieldErrmsg("");
      // setPaymentError("");
      setBankAccountError("")
      setBankAccount(selectedOption);
    };

  const labelMap = {
  bank: "Bank",
  upi: "UPI",
  card: "Card",
  cash: "Cash",
};


 

const paymentOptions = Array.isArray(bankking)
  ? bankking.map((item) => ({
      value: String(item.bankingId), 
      label: `${item?.accountHolderName} - ${item?.bankName || ""}`,
    }))
  : [];


const CustomMenuList = (props) => {
  const { children, selectProps } = props;

  return (
    <components.MenuList {...props}>
      {/* Scrollable options list */}
      <div style={{ maxHeight: 150, overflowY: "auto" }}>{children}</div>

      {/* Fixed + Add Bank button */}
      <div
        style={{
          position: "sticky",       // 🧠 makes it fixed inside dropdown
          bottom: 0,
          left: 0,
          right: 0,
          borderTop: "1px solid #E0E0E0",
          backgroundColor: "#fff",
          padding: "10px",
          textAlign: "center",
          cursor: "pointer",
          color: "#1E45E1",
          fontWeight: 600,
          fontSize: 14,
          fontFamily: "Gilroy",
          zIndex: 1,
        }}
        onClick={() => selectProps.onAddBank?.()}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#F5F8FF")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#fff")
        }
      >
        + Add Bank
      </div>
    </components.MenuList>
  );
};


  useEffect(() => {
    if (props.editAddBank && props.editAddBank.bankingId) {
      props.setEdit(true);

      if (props.editAddBank.accountType) {
        setActiveTab(props.editAddBank.accountType);

      }


      if (props.editAddBank.accountType === "CASH" || props.editAddBank.accountType === "UPI" || props.editAddBank.accountType === "BANK" || props.editAddBank.accountType === "CARD") {
        setAccountName(props.editAddBank?.accountHolderName || "");
      }
      else {
        setAccountName(props.editAddBank?.accountHolderName || "");
      }


      setAccountNo(props.editAddBank.accountNumber);
      setBankName(props.editAddBank.bankName);
      setIfscCode(props.editAddBank.ifscCode);
      setDescription(props.editAddBank?.description);
      setBankId(props.editAddBank.bankingId);
      setCardType(props.editAddBank?.cardType)
      setCardNo(props.editAddBank?.creditCardNumber || props.editAddBank?.debitCardNumber)
      setUpiId(props.editAddBank.upiId)


      setInitialStateAssign({

        accountName:
          props.editAddBank.accountType === "CASH" || props.editAddBank.accountType === "UPI"
            ? props.editAddBank.accountHolderName || ""
            : props.editAddBank.accountType === "CARD"
              ? props.editAddBank.accountHolderName || ""
              : props.editAddBank.accountHolderName || "",
        accountNo: props.editAddBank.accountNumber || "",
        bankName: props.editAddBank.bankName || "",
        ifscCode: props.editAddBank?.ifscCode || "",
        description: props.editAddBank?.description || "",
        upiId: props.editAddBank?.upiId || "",
        cardNo: props.editAddBank?.creditCardNumber || props.editAddBank?.debitCardNumber,
        cardType: props.editAddBank?.cardType || ""
      });

    } else {
      props.setEdit(false);
    }
  }, [props.editAddBank]);


  const handleClose = () => {
    dispatch({ type: 'REMOVE_ERROR_BOOKING' })
    props.setShowForm(false);
    props.setEdit(false);
    setAccountName("")
    setAccountNo("")
    setBankName("")
    setIfscCode("")
    setDescription("")
    setError("")
    setIsChangedError("")
    setaccountNumberError("")
    setaccountnameError("")
    setIfcsCodeError("")
    setBankNameError("")
    setUpiIdError("")
    setCardTypeError("")
  };
  const [initialStateAssign, setInitialStateAssign] = useState({
    accountName: "",
    accountNo: "",
    bankName: "",
    ifscCode: "",
    description: "",
  });



  const handleSubmitBank = () => {
    if (props.edit) {
      const isChanged =
        accountName !== initialStateAssign.accountName ||
        Number(accountNo) !== Number(initialStateAssign.accountNo) ||
        bankName !== initialStateAssign.bankName ||
        ifscCode !== initialStateAssign.ifscCode ||
        description !== initialStateAssign.description;

      if (!isChanged) {
        setIsChangedError("No Changes Detected");
        return;
      } else {
        setIsChangedError("");
      }
    }

    if (!accountName) {
      setError("Please Enter Beneficiary Name");
      return;
    }

    if (accountNo && (accountNo.length < 9 || accountNo.length > 18)) {
      setaccountNumberError("Account Number Must Be 9–18 Digits");
      return;
    }

    setError("");

    if (props.edit) {
      // EDIT API
      dispatch({
        type: "EDIT_BANKING",
        payload: {
          hostelId: hostel_id,
          bankId: bankId,
          data: {
            accountType: "BANK",
            holderName: accountName,
            accountNo: Number(accountNo),
            bankName: bankName,
            ifscCode: ifscCode,
            description: description,
            branchName: "",
            branchCode: "",
            isDefault: true,
            upiId: "",
            cardType: "",
            cardNumber: "",
            isActive: true,
            // isDeleted: true,
          },
        },
      });
    } else {
      // ADD API
      dispatch({
        type: "ADD_BANKING",
        payload: {
          hostelId: hostel_id,
          data: {
            accountType: "BANK",
            holderName: accountName,
            accountNo: Number(accountNo),
            bankName: bankName,
            ifscCode: ifscCode,
            description: description,
            branchName: "",
            branchCode: "",
            isDefault: true,
            upiId: "",
            cardType: "",
            cardNumber: "",
          },
        },
      });
    }

    setFormLoading(true);
  };


  

  const handleSubmitUpi = () => {
    if (!bankaccount || !upiId) {
      if (!bankaccount) {
        setBankAccountError("Please Select Bank");
      }
      if (!upiId) {
        setUpiIdError("Please Enter UPI ID");
      }
      return;
    }


    if (props.edit) {
      const isChanged =
        accountName !== initialStateAssign.accountName ||
        upiId !== initialStateAssign.upiId ||
        description !== initialStateAssign?.description;

      if (!isChanged) {
        setIsChangedError("No Changes Detected");
        return;
      }
      else {
        setIsChangedError("");
      }

    }


    if (props.edit) {
      // EDIT API
      dispatch({
        type: "EDIT_BANKING",
        payload: {
          hostelId: hostel_id,
          bankId: bankId,
          data: {
            accountType: "UPI",
            holderName: accountName,
            accountNo: "",
            bankName: bankName,
            ifscCode: ifscCode,
            description: description,
            branchName: "",
            branchCode: "",
            isDefault: true,
            upiId: upiId,
            cardType: "",
            cardNumber: ""
          }
        },
      });
    } else {

      dispatch({
        type: "ADD_BANKING",

        payload: {
          hostelId: hostel_id,
          data: {
            accountType: "UPI",
            holderName: accountName,
            accountNo: "",
            bankName: bankName,
            ifscCode: ifscCode,
            description: description,
            branchName: "",
            branchCode: "",
            isDefault: true,
            upiId: upiId,
            cardType: "",
            cardNumber: ""
          }
        }
      })

    }

    setFormLoading(true)
  }
  const [cardNo, setCardNo] = useState("")

  const handleCardNo = (e) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) {
      return;
    }
    setCardNo(value)
    setError("")
    setIsChangedError("")
  }

  const [cardType, setCardType] = useState("")
  const [cardTypeError, setCardTypeError] = useState("")

  // const handleCardType = (e) => {
  //   const selected = e.target.value;
  //   setCardType(selected);
  //   setError("")
  // };

  const handleSubmitCard = () => {
    if (!bankaccount || !cardType) {
      if (!bankaccount) {
       setBankAccountError("Please Select Bank");
      }
      if (!cardType) {
        setCardTypeError("Please Select Card Type");
      }
      return
    }



    if (props.edit) {
      const isChanged =
        accountName !== initialStateAssign.accountName ||
        cardType !== initialStateAssign.cardType ||
        cardNo !== initialStateAssign.cardNo ||
        description !== initialStateAssign.description;

      if (!isChanged) {
        setIsChangedError("No Changes Detected");
        return;
      }
      else {
        setIsChangedError("");
      }

    }

    if (props.edit) {
      // EDIT API
      dispatch({
        type: "EDIT_BANKING",
        payload: {
          hostelId: hostel_id,
          bankId: bankId,
          data: {
            accountType: "CARD",
            holderName: accountName,
            accountNo: "",
            bankName: "",
            ifscCode: "",
            description: description,
            branchName: "",
            branchCode: "",
            isDefault: true,
            upiId: "",
            cardType: cardType,
            cardNumber: cardNo
          }
        },
      });
    } else {

      dispatch({
        type: "ADD_BANKING",

        payload: {
          hostelId: hostel_id,
          data: {
            accountType: "CARD",
            holderName: accountName,
            accountNo: "",
            bankName: "",
            ifscCode: "",
            description: description,
            branchName: "",
            branchCode: "",
            isDefault: true,
            upiId: "",
            cardType: cardType,
            cardNumber: cardNo
          }
        },
      })

    }



    setFormLoading(true)
  }
  const handleSubmitCash = () => {
    if (!accountName) {
      setError("Please Enter Benificiary Name");
      return;
    }
    if (props.edit) {
      const isChanged =
        accountName !== initialStateAssign.accountName ||
        description !== initialStateAssign.description;

      if (!isChanged) {
        setIsChangedError("No Changes Detected");
        return;
      }
      else {
        setIsChangedError("");
      }

    }

    if (props.edit) {
      // EDIT API
      dispatch({
        type: "EDIT_BANKING",
        payload: {
          hostelId: hostel_id,
          bankId: bankId,
          data: {
            accountType: "CASH",
            holderName: accountName,
            accountNo: "",
            bankName: "",
            ifscCode: "",
            description: description,
            branchName: "",
            branchCode: "",
            isDefault: true,
            upiId: "",
            cardType: "",
            cardNumber: ""
          }
        },
      });
    } else {

      dispatch({
        type: "ADD_BANKING",

        payload: {
          hostelId: hostel_id,
          data: {
            accountType: "CASH",
            holderName: accountName,
            accountNo: "",
            bankName: "",
            ifscCode: "",
            description: description,
            branchName: "",
            branchCode: "",
            isDefault: true,
            upiId: "",
            cardType: "",
            cardNumber: ""
          }
        },
      })

    }
    setFormLoading(true)
  }



  useEffect(() => {
    if (state.bankingDetails.statusCodeForAddBanking === 201) {
      setAccountName("")
      setFormLoading(false)
      handleClose();

      dispatch({ type: "BANKINGLIST", payload: hostel_id });
      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_USER_BANKING" });
      }, 1000);
    }
  }, [state.bankingDetails.statusCodeForAddBanking]);

  useEffect(() => {
    if (state.bankingDetails.statusCodeForEditBanking === 200) {
      setAccountName("")
      setFormLoading(false)
      handleClose();

      dispatch({ type: "BANKINGLIST", payload: hostel_id });
      setTimeout(() => {
        dispatch({ type: "CLEAR_EDITBANKING" });
      }, 1000);
    }
  }, [state.bankingDetails.statusCodeForEditBanking]);

  const [activeTab, setActiveTab] = useState("BANK");
  const tabStyle = {
    fontFamily: "Gilroy",
    fontWeight: 600,
    fontSize: 14,
    color: "#1E45E1",
    borderRadius: "8px",
    padding: "8px 16px",
    border: "none"
  };

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
        show={props.showForm}
        onHide={() => handleClose()}
        backdrop="static"
        centered


      >

        <Modal.Header style={{ position: "relative", borderBottom: "none" }}>
          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              fontFamily: "Gilroy",
            }}
          >
            {props.edit ? "Edit Bank" : "Add Bank"}
          </div>

          <CloseCircle size="24" color="#000" onClick={handleClose}
            style={{ cursor: 'pointer' }} />
        </Modal.Header>
        <Nav
          variant="tabs"
          activeKey={activeTab}

          onSelect={(selectedKey) => {
            setActiveTab(selectedKey);
            setError("");
            setUpiIdError("")
            setBankAccountError("")
            setCardTypeError("")
            setIsChangedError("")
          }}

          className="justify-content-start ms-2 me-2"
        >
          {["BANK", "UPI", "CARD", "CASH"].map((tab) => (
            <Nav.Item key={tab}>
              <Nav.Link
                eventKey={tab}
                disabled={
                  props.editAddBank?.bankingId && props.editAddBank.accountType !== tab
                }
                style={{
                  ...tabStyle,
                  backgroundColor: activeTab === tab ? "#1E45E1" : "",
                  color: activeTab === tab ? "#fff" : tabStyle.color,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  opacity:
                    props.editAddBank?.bankingId && props.editAddBank?.accountType !== tab ? 0.6 : 1,
                  cursor:
                    props.editAddBank?.bankingId && props.editAddBank?.accountType !== tab
                      ? "not-allowed"
                      : "pointer",
                  width: 120,
                  textAlign: "center",
                }}

              >
                {tab === "BANK"
                  ? "Bank Name"
                  : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>




        <Modal.Body className="pb-0">
          {activeTab === "BANK" && (
            <div className="row">
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
                    Benificiary Name {" "}
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
                  <FormControl
                    type="text"
                    id="form-controls"
                    placeholder="Enter Benificiary Name"
                    value={accountName}
                    onChange={(e) => handleAccountName(e)}
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
                {accountNameError && (
                  <ErrorMessage message={accountNameError} type="error" />
                )}
                {error && (
                  <ErrorMessage message={error} type="error" />
                )}
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <Form.Group >
                  <Form.Label
                    style={{
                      fontSize: 14,
                      color: "#222222",
                      fontFamily: "Gilroy",
                      fontWeight: 500, marginTop: 5
                    }}
                  >
                    Bank Name{" "}

                  </Form.Label>
                  <FormControl
                    type="text"
                    id="form-controls"
                    placeholder="Enter Bank Name"
                    value={bankName}
                    onChange={(e) => handleBankName(e)}
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
                {bankNameError && (
                  <ErrorMessage message={bankNameError} type="error" />
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
                    Account No{" "}

                  </Form.Label>
                  <FormControl
                    type="text"
                    id="form-controls"
                    placeholder="Enter Account No"
                    value={accountNo}
                    onChange={(e) => handleAccountNo(e)}
                    maxLength={18}
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
                {accountNumberError && (
                  <ErrorMessage message={accountNumberError} type="error" />
                )}
              </div>


              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <Form.Group >
                  <Form.Label
                    style={{
                      fontSize: 14,
                      color: "#222222",
                      fontFamily: "Gilroy",
                      fontWeight: 500, marginTop: 5
                    }}
                  >
                    IFSC Code{" "}

                  </Form.Label>
                  <FormControl
                    type="text"
                    id="form-controls"
                    placeholder="Enter IFSC Code"
                    value={ifscCode}
                    onChange={(e) => handleIfscCode(e)}
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
                {ifcsCodeError && (
                  <ErrorMessage message={ifcsCodeError} type="error" />
                )}
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <Form.Group >
                  <Form.Label
                    style={{
                      fontSize: 14,
                      color: "#222222",
                      fontFamily: "Gilroy",
                      fontWeight: 500, marginTop: 5
                    }}
                  >
                    Description{" "}
                  </Form.Label>
                  <FormControl
                    type="text"
                    id="form-controls"
                    placeholder="Enter Description"
                    value={description}
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

              </div>

              {isChangedError && (
                <div className="d-flex justify-content-center mt-1">

                  <ErrorMessage message={isChangedError} type="error" />
                </div>
              )}
             

              <Modal.Footer className="d-flex justify-content-center" style={{ borderTop: "none" }}>
                <Button
                  className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
                  style={{
                    backgroundColor: "#1E45E1",
                    height: 50,
                    fontWeight: 600,
                    borderRadius: 12,
                    fontSize: 16,
                    fontFamily: "Gilroy",
                    width: "100%"
                  }}
                  onClick={handleSubmitBank}
                >
                  {props.edit ? "Save Changes" : "Add Bank"}
                </Button>
              </Modal.Footer>
            </div>

          )}
          {activeTab === "UPI" && (
            <div className="row">
              {/* <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <Form.Group >
                  <Form.Label
                    style={{
                      fontSize: 14,
                      color: "#222222",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    Benificiary Name{" "}
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
                  <FormControl
                    type="text"
                    id="form-controls"
                    placeholder="Enter Benificiary Name"
                    value={accountName}
                    onChange={(e) => handleAccountName(e)}
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
                {accountNameError && (
                   <ErrorMessage message={accountNameError} type="error" />
                )}
                {error && (
                    <ErrorMessage message={error} type="error" />
                )}
              </div> */}

             <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                         <Form.Group
                           className="mb-1"
                           controlId="exampleForm.ControlInput1"
                         >
                           <Form.Label
                             style={{
                               fontSize: 14,
                               color: "#222222",
                               fontFamily: "Gilroy",
                               fontWeight: 500,
                             }}
                           >
                             Bank{" "}
                             <span style={{ color: "red", fontSize: "20px" }}>*</span>
                           </Form.Label>
                         
                          <Select
                            options={paymentOptions}
                            value={
                              paymentOptions.find((opt) => opt.value === String(bankaccount)) || null
                            }
                            onChange={(selectedOption) =>
                              handleModeOfPaymentChange(selectedOption?.value)
                            }
                             onMenuOpen={() => setIsSelectOpen(true)}      
                            onMenuClose={() => setIsSelectOpen(false)} 
                            placeholder="Select Bank"
                              components={{ MenuList: CustomMenuList }}
                                onAddBank={() => setActiveTab("BANK")}
                            
                              styles={{
                                                control: (base) => ({
                                                  ...base,
                                                  fontSize: 14,
                                                  color: "rgba(75, 75, 75, 1)",
                                                  fontFamily: "Gilroy",
                                                  fontWeight: bankaccount ? 600 : 500,
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
                                                  color: "#555",
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
                         {bankaccountError && (
                           <ErrorMessage message={bankaccountError} type="error" />
                         )}
                       </div>

              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <Form.Group >
                  <Form.Label
                    style={{
                      fontSize: 14,
                      color: "#222222",
                      fontFamily: "Gilroy",
                      fontWeight: 500
                    }}
                  >
                    UPI ID{" "}
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
                  <FormControl
                    type="text"
                    id="form-controls"
                    placeholder="Enter Upi Id"
                    value={upiId}
                    onChange={(e) => handleUpiId(e)}
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
                {upiIdError && (
                   <ErrorMessage message={upiIdError} type="error" />
                )}
              </div>

              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <Form.Group >
                  <Form.Label
                    style={{
                      fontSize: 14,
                      color: "#222222",
                      fontFamily: "Gilroy",
                      fontWeight: 500, marginTop: 5
                    }}
                  >
                    Description{" "}
                  </Form.Label>
                  <FormControl
                    type="text"
                    id="form-controls"
                    placeholder="Enter Description"
                    value={description}
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

              </div>

 


              {isChangedError && (
                <div className="d-flex justify-content-center">
                  <ErrorMessage message={isChangedError} type="error" />
                </div>
              )}

           


              <Modal.Footer className="d-flex justify-content-center" style={{ borderTop: "none" }}>
                <Button
                  className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
                  style={{
                    backgroundColor: "#1E45E1",
                    height: 50,
                    fontWeight: 600,
                    borderRadius: 12,
                    fontSize: 16,
                    fontFamily: "Gilroy",
                    width: "100%"
                  }}
                  onClick={handleSubmitUpi}
                >
                  {props.edit ? "Save Changes" : "ADD UPI"}
                </Button></Modal.Footer>

            </div>
          )}


          {activeTab === "CARD" && (
            <div className="row">

             <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                         <Form.Group
                           className="mb-1"
                           controlId="exampleForm.ControlInput1"
                         >
                           <Form.Label
                             style={{
                               fontSize: 14,
                               color: "#222222",
                               fontFamily: "Gilroy",
                               fontWeight: 500,
                             }}
                           >
                             Bank{" "}
                             <span style={{ color: "red", fontSize: "20px" }}>*</span>
                           </Form.Label>
                         
                          <Select
                            options={paymentOptions}
                            value={
                              paymentOptions.find((opt) => opt.value === String(bankaccount)) || null
                            }
                            onChange={(selectedOption) =>
                              handleModeOfPaymentChange(selectedOption?.value)
                            }
                             onMenuOpen={() => setIsSelectOpen(true)}      
                            onMenuClose={() => setIsSelectOpen(false)} 
                            placeholder="Select Bank"
                              components={{ MenuList: CustomMenuList }}
                                onAddBank={() => setActiveTab("BANK")}
                            
                              styles={{
                                                control: (base) => ({
                                                  ...base,
                                                  fontSize: 14,
                                                  color: "rgba(75, 75, 75, 1)",
                                                  fontFamily: "Gilroy",
                                                  fontWeight: bankaccount ? 600 : 500,
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
                                                  color: "#555",
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
                         {bankaccountError && (
                           <ErrorMessage message={bankaccountError} type="error" />
                         )}
                       </div>

              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                  <Form.Label
                    style={{
                      fontSize: 14,
                      color: "#222222",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                      // paddingTop: 7
                    }}
                  >
                    Card Type
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
                    options={[
                      { value: "CREDIT", label: "Credit" },
                      { value: "DEBIT", label: "Debit" },
                    ]}
                    value={[
                      { value: "CREDIT", label: "Credit" },
                      { value: "DEBIT", label: "Debit" },
                    ].find((option) => option.value === cardType)}
                    onChange={(selectedOption) => {
                      setCardType(selectedOption?.value || "");
                      setError("");
                      setCardTypeError("")
                      setIsChangedError("")
                    }}
                    placeholder="Select a Card Type"

                    styles={{
                      control: (base, state) => ({
                        ...base,
                        fontSize: 16,
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                        color: "rgba(75, 75, 75, 1)",
                        cursor: "pointer",
                        height: 50,
                        borderRadius: 8,
                        borderColor: state.isFocused ? "#E8E8E8" : "#E8E8E8",
                        boxShadow: "none",
                        "&:hover": {
                          borderColor: "#C0C0C0"
                        }
                      }),
                      dropdownIndicator: (base) => ({
                        ...base,
                        color: "#555",
                        display: "inline-block",
                        fill: "currentColor",
                        lineHeight: 1,
                        stroke: "currentColor",
                        strokeWidth: 0,
                        cursor: "pointer",
                      }),
                      option: (base, state) => ({
                        ...base,
                        cursor: "pointer",
                        backgroundColor: state.isFocused ? "#f0f0f0" : "white",
                        color: "#000",
                        fontFamily: "Gilroy",
                      }),
                    }}

                  />

                  {cardTypeError && (
                     <ErrorMessage message={cardTypeError} type="error" />
                  )}
                </Form.Group>

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
                    Card Number
                  </Form.Label>
                  <FormControl
                    type="text"
                    id="form-controls"
                    placeholder="Enter Card No"
                    value={cardNo}
                    onChange={(e) => handleCardNo(e)}
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

              </div>



              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <Form.Group >
                  <Form.Label
                    style={{
                      fontSize: 14,
                      color: "#222222",
                      fontFamily: "Gilroy",
                      fontWeight: 500, marginTop: 5
                    }}
                  >
                    Description{" "}
                  </Form.Label>
                  <FormControl
                    type="text"
                    id="form-controls"
                    placeholder="Enter Description"
                    value={description}
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

              </div>
              {isChangedError && (
                <div className="d-flex justify-content-center">
                  <ErrorMessage message={isChangedError} type="error" />
                </div>
              )}

             

              <Modal.Footer className="d-flex justify-content-center" style={{ borderTop: "none" }}>
                <Button
                  className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
                  style={{
                    backgroundColor: "#1E45E1",
                    height: 50,
                    fontWeight: 600,
                    borderRadius: 12,
                    fontSize: 16,
                    fontFamily: "Gilroy",
                    width: "100%"
                  }}
                  onClick={handleSubmitCard}
                >
                  {props.edit ? "Save Changes" : "Add Card"}
                </Button>
              </Modal.Footer>
            </div>


          )}
          {activeTab === "CASH" && (
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <Form.Group >
                  <Form.Label
                    style={{
                      fontSize: 14,
                      color: "#222222",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    Benificiary Name{" "}
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
                  <FormControl
                    type="text"
                    id="form-controls"
                    placeholder="Enter Benificiary Name"
                    value={accountName}
                    onChange={(e) => handleAccountName(e)}
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
                {accountNameError && (
                  <ErrorMessage message={accountNameError} type="error" />
                )}
                {error && (
                   <ErrorMessage message={error} type="error" />
                )}
              </div>


              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <Form.Group >
                  <Form.Label
                    style={{
                      fontSize: 14,
                      color: "#222222",
                      fontFamily: "Gilroy",
                      fontWeight: 500, marginTop: 5
                    }}
                  >
                    Description{" "}
                  </Form.Label>
                  <FormControl
                    type="text"
                    id="form-controls"
                    placeholder="Enter Description"
                    value={description}
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

              </div>
              {isChangedError && (
                <div className="d-flex justify-content-center">
                  <ErrorMessage message={isChangedError} type="error" />
                </div>
              )}
            

              <Modal.Footer className="d-flex justify-content-center" style={{ borderTop: "none" }}>
                <Button
                  className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
                  style={{
                    backgroundColor: "#1E45E1",
                    height: 50,
                    fontWeight: 600,
                    borderRadius: 12,
                    fontSize: 16,
                    fontFamily: "Gilroy",
                    width: "100%"
                  }}
                  onClick={handleSubmitCash}
                >
                  {props.edit ? "Save Changes" : "Add Cash"}
                </Button>
              </Modal.Footer>

            </div>
          )}






        </Modal.Body>

        {formLoading && <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
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


      </Modal>
    </div>
  );
}

BankingAddForm.propTypes = {
  editAddBank: PropTypes.func.isRequired,
  setEdit: PropTypes.func.isRequired,
  showForm: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  setShowForm: PropTypes.func.isRequired,
};
export default BankingAddForm;

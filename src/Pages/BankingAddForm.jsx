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
import Select from "react-select";

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
    setError("")
    setIsChangedError("")
    setaccountNumberError("")
    dispatch({ type: 'REMOVE_ERROR_BOOKING' })
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
  const handleUpiId = (e) => {
    setUpiId(e.target.value)
  }


  useEffect(() => {
    if (props.editAddBank && props.editAddBank.id) {
      props.setEdit(true);

      if (props.editAddBank.type) {
        setActiveTab(props.editAddBank.type);

      }


      if (props.editAddBank.type === "cash" || props.editAddBank.type === "upi" || props.editAddBank.type === "bank" || props.editAddBank.type === "card") {
        setAccountName(props.editAddBank.benificiary_name);
      }
      else {
        setAccountName(props.editAddBank.acc_name);
      }


      setAccountNo(props.editAddBank.acc_num);
      setBankName(props.editAddBank.bank_name);
      setIfscCode(props.editAddBank.ifsc_code);
      setDescription(props.editAddBank.description);
      setBankId(props.editAddBank.id);
      setCardType(props.editAddBank.card_type)
      setCardNo(props.editAddBank.card_no)
      setUpiId(props.editAddBank.upi_id)


      setInitialStateAssign({

        accountName:
          props.editAddBank.type === "cash" || props.editAddBank.type === "upi"
            ? props.editAddBank.benificiary_name || ""
            : props.editAddBank.type === "card"
              ? props.editAddBank.benificiary_name || ""
              : props.editAddBank.benificiary_name || "",
        accountNo: props.editAddBank.acc_num || "",
        bankName: props.editAddBank.bank_name || "",
        ifscCode: props.editAddBank.ifsc_code || "",
        description: props.editAddBank.description || "",
        upiId: props.editAddBank.upi_id || "",
        cardNo: props.editAddBank.card_no || "",
        cardType: props.editAddBank.card_type || ""
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
      }
      else {
         setIsChangedError("");
      }

    }

    if (!accountName) {
      setError("Please Enter Benificiary Name");
      return;
    }

    setError("");
    dispatch({
      type: "ADD_BANKING",
      payload: {
        type: "bank",
        benificiary_name: accountName,
        acc_no: accountNo,
        bank_name: bankName,
        ifsc_code: ifscCode,
        desc: description,
        id: props.edit ? bankId : "",
        hostel_id: hostel_id
      },
    });
    setFormLoading(true)
  };

  const handleSubmitUpi = () => {
    if (!accountName) {
      setError("Please Enter Benificiary Name");
      return;
    }

    if (props.edit) {
      const isChanged =
        accountName !== initialStateAssign.accountName ||
        upiId !== initialStateAssign.upiId ||
        description !== initialStateAssign.description;

      if (!isChanged) {
        setIsChangedError("No Changes Detected");
        return;
      }
      else {
         setIsChangedError("");
      }

    }

    dispatch({
      type: "ADD_BANKING",
      payload: {
        type: "upi",
        benificiary_name: accountName,
        desc: description,
        hostel_id: hostel_id,
        upi_id: upiId,
        id: props.edit ? bankId : "",
      },
    });
    setFormLoading(true)
  }
  const [cardNo, setCardNo] = useState("")

  const handleCardNo = (e) => {
    setCardNo(e.target.value)
    setError("")
    setIsChangedError("")
  }

  const [cardType, setCardType] = useState("")

  // const handleCardType = (e) => {
  //   const selected = e.target.value;
  //   setCardType(selected);
  //   setError("")
  // };

  const handleSubmitCard = () => {
    if (!accountName) {
      setError("Please Enter Benificiary Name");
      return;
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
    dispatch({
      type: "ADD_BANKING",
      payload: {
        type: "card",
        benificiary_name: accountName,
        desc: description,
        hostel_id: hostel_id,
        card_no: cardNo,
        card_type: cardType,

        id: props.edit ? bankId : "",
      },
    });
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
    dispatch({
      type: "ADD_BANKING",
      payload: {
        type: "cash",
        benificiary_name: accountName,
        desc: description,
        hostel_id: hostel_id,
        id: props.edit ? bankId : "",
      },
    });
    setFormLoading(true)
  }



  useEffect(() => {
    if (state.bankingDetails.statusCodeForAddBanking === 200) {
      setAccountName("")
      setFormLoading(false)
      handleClose();

      dispatch({ type: "BANKINGLIST", payload: { hostel_id: hostel_id } });
      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_USER_BANKING" });
      }, 1000);
    }
  }, [state.bankingDetails.statusCodeForAddBanking]);

  const [activeTab, setActiveTab] = useState("bank");
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
            setIsChangedError("")
          }}

          className="justify-content-start ms-2 me-2"
        >
          {["bank", "upi", "card", "cash"].map((tab) => (
            <Nav.Item key={tab}>
              <Nav.Link
                eventKey={tab}
                disabled={
                  props.editAddBank?.id && props.editAddBank.type !== tab
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
                    props.editAddBank?.id && props.editAddBank.type !== tab ? 0.6 : 1,
                  cursor:
                    props.editAddBank?.id && props.editAddBank.type !== tab
                      ? "not-allowed"
                      : "pointer",
                  width: 120,
                  textAlign: "center",
                }}

              >
                {tab === "bank"
                  ? "Bank Name"
                  : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>




        <Modal.Body className="pb-0">
          {activeTab === "bank" && (
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
                  <div style={{ color: "red" }}>
                    <MdError style={{ fontSize: "14", marginRight: "5px" }} />
                    <span style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{accountNameError}</span>
                  </div>
                )}
                {error && (
                  <div style={{ color: "red", paddingBottom: "8px" }}>
                    <MdError style={{ fontSize: "14px", marginRight: "5px" }} />
                    <span style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{error}</span>
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
                  <div style={{ color: "red" }}>
                    <MdError style={{ fontSize: "14", marginRight: "5px" }} />
                    <span style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{bankNameError}</span>
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
                    Account No{" "}

                  </Form.Label>
                  <FormControl
                    type="text"
                    id="form-controls"
                    placeholder="Enter Account No"
                    value={accountNo}
                    onChange={(e) => handleAccountNo(e)}
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
                  <div style={{ color: "red" }}>
                    <MdError style={{ fontSize: "14", marginRight: "5px" }} />
                    <span style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{accountNumberError}</span>
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
                  <div style={{ color: "red" }}>
                    <MdError style={{ fontSize: "14", marginRight: "5px" }} />
                    <span style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{ifcsCodeError}</span>
                  </div>
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
                  <div className='d-flex  align-items-center justify-content-center mt-4 mb-2' style={{ color: "red", paddingBottom: "8px", textAlign:"center" }}>
                    <MdError style={{ fontSize: "14px", marginRight: "5px" }} />
                    <span style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{isChangedError}</span>
                  </div>
                )}

              {state.createAccount?.networkError ?
                <div className='d-flex  align-items-center justify-content-center mt-4 mb-2'>
                  <MdError style={{ color: "red", marginRight: '5px' }} />
                  <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{state.createAccount?.networkError}</label>
                </div>
                : null}

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
          {activeTab === "upi" && (
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
                  <div style={{ color: "red" }}>
                    <MdError style={{ fontSize: "14", marginRight: "5px" }} />
                    <span style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{accountNameError}</span>
                  </div>
                )}
                {error && (
                  <div className=" " style={{ color: "red", paddingBottom: "8px" }}>
                    <MdError style={{ fontSize: "14px", marginRight: "5px" }} />
                    <span style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{error}</span>
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
                      fontWeight: 500, marginTop: 5
                    }}
                  >
                    UPI ID{" "}

                  </Form.Label>
                  <FormControl
                    type="text"
                    id="form-controls"
                    placeholder="Enter Bank Name"
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
                  <div style={{ color: "red", paddingBottom: "8px", textAlign:"center" }}>
                    <MdError style={{ fontSize: "14px", marginRight: "5px" }} />
                    <span style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{isChangedError}</span>
                  </div>
                )}

              {state.createAccount?.networkError ?
                <div className='d-flex  align-items-center justify-content-center mt-4 mb-2'>
                  <MdError style={{ color: "red", marginRight: '5px' }} />
                  <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{state.createAccount?.networkError}</label>
                </div>
                : null}


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
                  {props.edit ? "Save Changes" : "Add Upi"}
                </Button></Modal.Footer>

            </div>
          )}


          {activeTab === "card" && (
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
                  <div style={{ color: "red" }}>
                    <MdError style={{ fontSize: "14", marginRight: "5px" }} />
                    <span style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{accountNameError}</span>
                  </div>
                )}
                {error && (
                  <div className=" " style={{ color: "red", paddingBottom: "8px" }}>
                    <MdError style={{ fontSize: "14px", marginRight: "5px" }} />
                    <span style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{error}</span>
                  </div>
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
                      paddingTop: 7
                    }}
                  >
                    Card Type
                  </Form.Label>
                  <Select
                    options={[
                      { value: "credit", label: "Credit" },
                      { value: "debit", label: "Debit" },
                    ]}
                    value={[
                      { value: "credit", label: "Credit" },
                      { value: "debit", label: "Debit" },
                    ].find((option) => option.value === cardType)}
                    onChange={(selectedOption) => {
                      setCardType(selectedOption?.value || "");
                      setError("");
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
                  <div style={{ color: "red", paddingBottom: "8px", textAlign:"center" }}>
                    <MdError style={{ fontSize: "14px", marginRight: "5px" }} />
                    <span style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{isChangedError}</span>
                  </div>
                )}

              {state.createAccount?.networkError ?
                <div className='d-flex  align-items-center justify-content-center mt-4 mb-2'>
                  <MdError style={{ color: "red", marginRight: '5px' }} />
                  <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{state.createAccount?.networkError}</label>
                </div>
                : null}

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
          {activeTab === "cash" && (
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
                  <div style={{ color: "red" }}>
                    <MdError style={{ fontSize: "14", marginRight: "5px" }} />
                    <span style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{accountNameError}</span>
                  </div>
                )}
                {error && (
                  <div className=" " style={{ color: "red", paddingBottom: "8px" }}>
                    <MdError style={{ fontSize: "14px", marginRight: "5px" }} />
                    <span style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{error}</span>
                  </div>
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
                  <div style={{ color: "red", paddingBottom: "8px", textAlign:"center" }}>
                    <MdError style={{ fontSize: "14px", marginRight: "5px" }} />
                    <span style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{isChangedError}</span>
                  </div>
                )}
              {state.createAccount?.networkError ?
                <div className='d-flex  align-items-center justify-content-center mt-4 mb-2'>
                  <MdError style={{ color: "red", marginRight: '5px' }} />
                  <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{state.createAccount?.networkError}</label>
                </div>
                : null}

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

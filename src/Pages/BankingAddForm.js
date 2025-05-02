/* eslint-disable react-hooks/exhaustive-deps */
import Modal from "react-bootstrap/Modal";
import { FormControl,Nav } from "react-bootstrap";
import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { MdError } from "react-icons/md";
import "./BankingAddForm.css";
import PropTypes from "prop-types";
import {CloseCircle} from "iconsax-react";

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
    setaccountnameError("")
    dispatch({ type: 'REMOVE_ERROR_BOOKING'})
  };
  const handleAccountNo = (e) => {
    
    const value = e.target.value;
    if (!/^\d*$/.test(value)) {
      return; 
    }
    setAccountNo(value);
    setError("")
    setaccountNumberError("")
    dispatch({ type: 'REMOVE_ERROR_BOOKING'})
  };
  const handleBankName = (e) => {
    const value = e.target.value
    const pattern = /^[a-zA-Z\s]*$/;
    if (!pattern.test(value)) {
      return;
    }
    setBankName(value);
    setError("")
    setBankNameError("")
    dispatch({ type: 'REMOVE_ERROR_BOOKING'})
  };
  const handleIfscCode = (e) => {
    setIfscCode(e.target.value);
    setError("")
    setIfcsCodeError("")
    dispatch({ type: 'REMOVE_ERROR_BOOKING'})
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
    setError("")
    dispatch({ type: 'REMOVE_ERROR_BOOKING'})
  };
  const [upiId,setUpiId] = useState("")
  const handleUpiId = (e)=>{
    setUpiId(e.target.value)
  }

//   useEffect(() => {
//     if (props.editAddBank && props.editAddBank.id) {
// console.log("props.editAddBank",props.editAddBank.type === "cash")
// setAccountName(props.editAddBank.benificiary_name)
//       props.setEdit(true)
//       setAccountName(props.editAddBank.acc_name)
//       setAccountNo(props.editAddBank.acc_num)
//       setBankName(props.editAddBank.bank_name)
//       setIfscCode(props.editAddBank.ifsc_code)
//       setDescription(props.editAddBank.description)
//       setBankId(props.editAddBank.id)


//       setInitialStateAssign({
//         accountName: props.editAddBank.acc_name || "",
//         accountNo: props.editAddBank.acc_num || "",
//         bankName: props.editAddBank.bank_name || "",
//         ifscCode: props.editAddBank.ifsc_code || "",
//         description: props.editAddBank.description || ""

//       });

//     }
//     else {
//       props.setEdit(false);
//     }
//   }, [])

// useEffect(() => {
//   if (props.editAddBank && props.editAddBank.id) {
//     console.log("props.editAddBank",props.editAddBank)
//     props.setEdit(true);

//     if (props.editAddBank.type === "cash") {
//       setAccountName(props.editAddBank.benificiary_name);
//     } else {
//       setAccountName(props.editAddBank.acc_name);
//     }

//     setAccountNo(props.editAddBank.acc_num);
//     setBankName(props.editAddBank.bank_name);
//     setIfscCode(props.editAddBank.ifsc_code);
//     setDescription(props.editAddBank.description);
//     setBankId(props.editAddBank.id);
//     setUpiId(props.editAddBank.upi_id)

//     setInitialStateAssign({
//       accountName: props.editAddBank.type === "cash"
//         ? props.editAddBank.benificiary_name || ""
//         : props.editAddBank.acc_name || "",
//       accountNo: props.editAddBank.acc_num || "",
//       bankName: props.editAddBank.bank_name || "",
//       ifscCode: props.editAddBank.ifsc_code || "",
//       description: props.editAddBank.description || "",
//     });
//   } else {
//     props.setEdit(false);
//   }
// }, [props.editAddBank]);
useEffect(() => {
  if (props.editAddBank && props.editAddBank.id) {
    console.log("props.editAddBank",props.editAddBank)
    props.setEdit(true);

    // Set the active tab to the current type ('bank', 'upi', 'card', 'cash')
    if (props.editAddBank.type) {
      setActiveTab(props.editAddBank.type);
      
    }

    // Set account name based on type
    if (props.editAddBank.type === "cash" || props.editAddBank.type === "upi") {
      setAccountName(props.editAddBank.benificiary_name);
    } else if (props.editAddBank.type === "card") {
      setAccountName(props.editAddBank.card_holder);
    } else {
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

    // setInitialStateAssign({
    //   accountName: props.editAddBank.type === "cash"
    //     ? props.editAddBank.benificiary_name || ""
    //     : props.editAddBank.acc_name || "",
    //   accountNo: props.editAddBank.acc_num || "",
    //   bankName: props.editAddBank.bank_name || "",
    //   ifscCode: props.editAddBank.ifsc_code || "",
    //   description: props.editAddBank.description || "",
    //   upiId:props.editAddBank.upi_id
    // });
    setInitialStateAssign({
      accountName:
        props.editAddBank.type === "cash" || props.editAddBank.type === "upi"
          ? props.editAddBank.benificiary_name || ""
          : props.editAddBank.type === "card"
          ? props.editAddBank.card_holder || ""
          : props.editAddBank.acc_name || "",
      accountNo: props.editAddBank.acc_num || "",
      bankName: props.editAddBank.bank_name || "",
      ifscCode: props.editAddBank.ifsc_code || "",
      description: props.editAddBank.description || "",
      upiId: props.editAddBank.upi_id || "",
      cardNo : props.editAddBank.card_no || "",
      cardType : props.editAddBank.card_type || ""
    });
    
  } else {
    props.setEdit(false);
  }
}, [props.editAddBank]);


  const handleClose = () => {
    dispatch({ type: 'REMOVE_ERROR_BOOKING'})
    props.setShowForm(false);
    props.setEdit(false);
    setAccountName("")
    setAccountNo("")
    setBankName("")
    setIfscCode("")
    setDescription("")
    setError("")
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


  // const validateField = (value, fieldName) => {
  //   if (!value || (typeof value === "string" && value.trim() === "")) {
  //     switch (fieldName) {
  //       case "accountName":
  //         setaccountnameError("Account Name is Required");
  //         break;
  //       case "accountNo":
  //         setaccountNumberError("Account No is Required");
  //         break;
  //       case "bankName":
  //         setBankNameError("Bank Name is Required");
  //         break;
  //       case "ifscCode":
  //         setIfcsCodeError("IFSC Code is Required");
  //         break;
        
  //       default:
  //         break;
  //     }
  //     return false;
  //   }
  //   return true;
  // };
  const handleSubmitBank = () => {

    if (props.edit) {
      const isChanged =
        accountName !== initialStateAssign.accountName ||
        // accountNo !== initialStateAssign.accountNo ||
        Number(accountNo) !== Number(initialStateAssign.accountNo) ||
        bankName !== initialStateAssign.bankName ||
        ifscCode !== initialStateAssign.ifscCode ||
        description !== initialStateAssign.description;

      if (!isChanged) {
        setError("No Changes Detected");
        return;
      }
      else {
        setError("");
      }

    }

    if (!accountName && !bankName && !ifscCode && !accountNo) {
      setError("Please Fill At Least One Field");
      return;
    }
  
    setError("");
    dispatch({
      type: "ADD_BANKING",
      payload: {
        type:"bank",
        acc_name: accountName,
        acc_no: accountNo,
        bank_name: bankName,
        ifsc_code: ifscCode,
        desc: description,
        id: props.edit ? bankId : "",
        hostel_id: hostel_id
      },
    });
  };

const handleSubmitUpi = ()=>{
  if (!accountName && !upiId ) {
    setError("Please Fill At Least One Field");
    return;
  }

  if (props.edit) {
    const isChanged =
      accountName !== initialStateAssign.accountName || 
      upiId !== initialStateAssign.upiId ||
      description !== initialStateAssign.description;

    if (!isChanged) {
      setError("No Changes Detected");
      return;
    }
    else {
      setError("");
    }

  }
  
  dispatch({
    type: "ADD_BANKING",
    payload: {
      type:"upi",
      benificiary_name : accountName,
      desc: description,
      hostel_id: hostel_id,
      upi_id:upiId,
      id: props.edit ? bankId : "",
    },
  });
}
const [cardNo,setCardNo] = useState("")

const handleCardNo=(e)=>{
  setCardNo(e.target.value)
  setError("")
}

const [cardType,setCardType] = useState("")
// const handleCardType = (e)=>{
//   setCardType(e.target.value)
// }
const handleCardType = (e) => {
  const selected = e.target.value;
  console.log("Selected Card Type:", selected);
  setCardType(selected);
  setError("")
};

const handleSubmitCard = ()=>{
  if (!accountName && !cardType && !cardNo ) {
    setError("Please Fill At Least One Field");
    return;
  }

  if (props.edit) {
    const isChanged =
      accountName !== initialStateAssign.accountName || 
      cardType !== initialStateAssign.cardType ||
      cardNo !== initialStateAssign.cardNo ||
      description !== initialStateAssign.description;

    if (!isChanged) {
      setError("No Changes Detected");
      return;
    }
    else {
      setError("");
    }

  }
  dispatch({
    type: "ADD_BANKING",
    payload: {
      type:"card",
      card_holder:accountName,
      desc: description,
      hostel_id: hostel_id,
      card_no :cardNo,
      card_type:cardType,
      id: props.edit ? bankId : "",
    },
  });
}
const handleSubmitCash = ()=>{
  if (!accountName && !description) {
    setError("Please Fill At Least One Field");
    return;
  }
  if (props.edit) {
    const isChanged =
      accountName !== initialStateAssign.accountName || 
      description !== initialStateAssign.description;

    if (!isChanged) {
      setError("No Changes Detected");
      return;
    }
    else {
      setError("");
    }

  }
  dispatch({
    type: "ADD_BANKING",
    payload: {
      type:"cash",
      benificiary_name :accountName,
      desc: description,
      hostel_id: hostel_id,
      id: props.edit ? bankId : "",
    },
  });
}


 
  useEffect(() => {
    if (state.bankingDetails.statusCodeForAddBanking === 200) {
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
    padding: "8px 16px"
  };
  
  return (
    <div>


      <Modal
        show={props.showForm}
        onHide={() => handleClose()}
        backdrop="static"
        centered
        // className="BankingCustom-modal"

      >

        <Modal.Header style={{ position: "relative",borderBottom:"none" }}>
          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              fontFamily: "Gilroy",
            }}
          >
            {props.edit ? "Edit Bank" : "Add Bank"}
          </div>
          {/* <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={handleClose}
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
          <CloseCircle size="24" color="#000" onClick={handleClose} 
            style={{ cursor: 'pointer' }}/>
        </Modal.Header>
        <Nav
  variant="tabs"
  activeKey={activeTab}
  // onSelect={(selectedKey) => setActiveTab(selectedKey)
  //   setError("")
  // }
  onSelect={(selectedKey) => {
    setActiveTab(selectedKey);
    setError("");
  }}
  
  className="justify-content-start mb-3 ms-1"
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
          backgroundColor: activeTab === tab ? "#007bff" : "",
          color: activeTab === tab ? "#fff" : tabStyle.color,
          borderRadius: 8,
          opacity:
            props.editAddBank?.id && props.editAddBank.type !== tab
              ? 0.6
              : 1,
          cursor:
            props.editAddBank?.id && props.editAddBank.type !== tab
              ? "not-allowed"
              : "pointer",
        }}
      >
        {tab === "bank"
          ? "Bank Name"
          : tab.charAt(0).toUpperCase() + tab.slice(1)}
      </Nav.Link>
    </Nav.Item>
  ))}
</Nav>




        <Modal.Body>
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
                 Benificiary Name{" "}
                 
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
                  <MdError style={{fontSize:"14",marginRight:"5px"}}/>
                  <span style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{accountNameError}</span>
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
                    fontWeight: 500,marginTop:5
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
                  <MdError style={{fontSize:"14",marginRight:"5px"}}/>
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
                  <MdError style={{fontSize:"14",marginRight:"5px"}}/>
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
                    fontWeight: 500,marginTop:5
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
                  <MdError style={{fontSize:"14",marginRight:"5px"}}/>
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
                    fontWeight: 500,marginTop:5
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
            {error && (
          <div  style={{ color: "red",textAlign:"center" ,paddingBottom:"8px"}}>
            <MdError  style={{fontSize:"14px",marginRight:"5px"}}/>
            <span style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{error}</span>
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
              width:"100%"
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
                  <MdError style={{fontSize:"14",marginRight:"5px"}}/>
                  <span style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{accountNameError}</span>
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
                    fontWeight: 500,marginTop:5
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
                    fontWeight: 500,marginTop:5
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
            {error && (
          <div className=" " style={{ color: "red",textAlign:"center" ,paddingBottom:"8px"}}>
            <MdError  style={{fontSize:"14px",marginRight:"5px"}}/>
            <span style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{error}</span>
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
              width:"100%"
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
                       marginTop:"5px",
                    }}
                  >
                    Card Type
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    value={cardType}
                    onChange={handleCardType}
                    className=""
                    id="vendor-select"
                    style={{
                      fontSize: 16,
                      color: "rgba(75, 75, 75, 1)",
                      fontFamily: "Gilroy",
                      fontWeight:500,
                      cursor:"pointer"
                    }}
                  >
                    <option value="">Select a Card Type</option>
                    <option value="credit">Credit</option>
                    <option value="debit">Debit</option>
                  </Form.Select>
                </Form.Group>
              
              </div>

  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
    <Form.Group >
      <Form.Label
        style={{
          fontSize: 14,
          color: "#222222",
          fontFamily: "Gilroy",
          fontWeight: 500,marginTop:5
        }}
      >
        Card Holder Name
      </Form.Label>
      <FormControl
        type="text"
        id="form-controls"
        placeholder="Enter Card Holder Name"
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
    {/* {bankNameError && (
      <div style={{ color: "red" }}>
        <MdError style={{fontSize:"14",marginRight:"5px"}}/>
        <span style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{bankNameError}</span>
      </div>
    )} */}
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
          fontWeight: 500,marginTop:5
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
  {error && (
          <div className=" " style={{ color: "red",textAlign:"center" ,paddingBottom:"8px"}}>
            <MdError  style={{fontSize:"14px",marginRight:"5px"}}/>
            <span style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{error}</span>
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
    width:"100%"
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
                Benificiary Name
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
                 <MdError style={{fontSize:"14",marginRight:"5px"}}/>
                 <span style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{accountNameError}</span>
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
                   fontWeight: 500,marginTop:5
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
           {error && (
          <div className=" " style={{ color: "red",textAlign:"center" ,paddingBottom:"8px"}}>
            <MdError  style={{fontSize:"14px",marginRight:"5px"}}/>
            <span style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{error}</span>
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
              width:"100%"
            }}
            onClick={handleSubmitCash}
          >
            {props.edit ? "Save Changes" : "Add Cash"}
          </Button>
</Modal.Footer>

 </div>
)}
        </Modal.Body>
    


{/* {state.bankingDetails?.bankingError && (
          <div className="d-flex justify-content-center align-items-center " style={{ color: "red" }}>
            <MdError  style={{fontSize:"13px",marginRight:"5px"}}/>
            <span style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{state.bankingDetails.bankingError}</span>
          </div>
        )} */}



        {/* <Modal.Footer className="d-flex justify-content-center" style={{ borderTop: "none" }}>
          <Button
            className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={{
              backgroundColor: "#1E45E1",
              height: 50,
              fontWeight: 600,
              borderRadius: 12,
              fontSize: 16,
              fontFamily: "Gilroy",
              marginTop: -10,width:"100%"
            }}
            onClick={handleSubmitBank}
          >
            {props.edit ? "Save Changes" : "Add Bank"}
          </Button>
        </Modal.Footer> */}
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

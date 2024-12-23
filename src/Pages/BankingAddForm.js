import Modal from "react-bootstrap/Modal";
import { FormControl } from "react-bootstrap";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { MdError } from "react-icons/md";

function BankingAddForm(props) {
  const state = useSelector((state) => state);
  console.log("stateBankingAddForm", state);
  const dispatch = useDispatch();
  const [accountName, setAccountName] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [bankName, setBankName] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [description, setDescription] = useState("");
  const[bankId,setBankId]=useState("")
  const [error, setError] = useState("");
  const [accountNameError, setaccountnameError] = useState("");
  const [accountNumberError, setaccountNumberError] = useState("");
  const [bankNameError, setBankNameError] = useState("");
  const [ifcsCodeError, setIfcsCodeError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
   const [hostel_id,setHostel_Id]=useState("")
  
   useEffect(() => {
      console.log('Current_hostelid', state.login.selectedHostel_Id);
      setHostel_Id(state.login.selectedHostel_Id)
    }, [state?.login?.selectedHostel_Id]);



  const handleAccountName = (e) => {
    setAccountName(e.target.value);
    setError("")
    setaccountnameError("")
  };
  const handleAccountNo = (e) => {
    setAccountNo(e.target.value);
    setError("")
    setaccountNumberError("")
  };
  const handleBankName = (e) => {
    setBankName(e.target.value);
    setError("")
    setBankNameError("")
  };
  const handleIfscCode = (e) => {
    setIfscCode(e.target.value);
    setError("")
    setIfcsCodeError("")
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
    setError("")
    setDescriptionError("")
  };

console.log("props.editAddBank",props.editAddBank)
useEffect(()=>{
  if(props.editAddBank && props.editAddBank.id){

    props.setEdit(true)
    setAccountName(props.editAddBank.acc_name)
    setAccountNo(props.editAddBank.acc_num)
    setBankName(props.editAddBank.bank_name)
    setIfscCode(props.editAddBank.ifsc_code)
    setDescription(props.editAddBank.description)
    setBankId(props.editAddBank.id)


      setInitialStateAssign({
        accountName: props.editAddBank.acc_name || "",
        accountNo: props.editAddBank.acc_num|| "",
        bankName: props.editAddBank.bank_name || "",
        ifscCode: props.editAddBank.ifsc_code || "",
        description: props.editAddBank.description || ""
        
      });

  }
  else {
    props.setEdit(false);
  }
},[])

  const handleClose = () => {
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
    setDescriptionError("")
    setBankNameError("")


  };
  const [initialStateAssign, setInitialStateAssign] = useState({
    accountName: "",
    accountNo: "",
    bankName: "",
    ifscCode: "",
    description: "",
  });


  const validateField = (value, fieldName) => {
    if (!value || (typeof value === "string" && value.trim() === "")) {
      switch (fieldName) {
        case "accountName":
          setaccountnameError("Account Name is required");
          break;
        case "accountNo":
          setaccountNumberError("Account No is required");
          break;
        case "bankName":
          setBankNameError("Bank Name is required");
          break;
        case "ifscCode":
          setIfcsCodeError("IFSC Code is required");
          break;
        case "description":
          setDescriptionError("Description is required");
          break;
        default:
          break;
      }
      return false;
    }
    return true;
  };
  const handleSubmitBank = () => {
    if (!validateField(accountName, "accountName"));
    if (!validateField(accountNo, "accountNo"));

    if (!validateField(bankName, "bankName"));
    if (!validateField(ifscCode, "ifscCode"));
    if (!validateField(description, "description"));

    
    if (props.edit) {
      const isChanged = 
        accountName !== initialStateAssign.accountName ||
        // accountNo !== initialStateAssign.accountNo ||
        Number(accountNo) !== Number(initialStateAssign.accountNo) ||
        bankName !== initialStateAssign.bankName ||
        ifscCode !== initialStateAssign.ifscCode ||
        description !== initialStateAssign.description;
      
      if (!isChanged) {
        setError("No changes detected.");
        return;
      }
      else {
        setError("");
      }
  
    }
  
    
    setError("");
    dispatch({
      type: "ADD_BANKING",
      payload: {
        acc_name: accountName,
        acc_no: accountNo,
        bank_name: bankName,
        ifsc_code: ifscCode,
        desc: description,
        id: props.edit ? bankId : "",
        hostel_id:hostel_id
      },
    });
  };

  // const handleSubmitBank = () => {
  //   dispatch({
  //     type: "ADD_BANKING",
  //     payload: {
  //       acc_name: accountName,
  //       acc_no: accountNo,
  //       bank_name: bankName,
  //       ifsc_code: ifscCode,
  //       desc: description,
  //       id:props.edit?bankId:""
  //     },
  //   });
  // };
  useEffect(() => {
    if (state.bankingDetails.statusCodeForAddBanking === 200) {
      handleClose();
      dispatch({ type: "BANKINGLIST",payload:{hostel_id:hostel_id} });
      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_USER_BANKING" });
      }, 1000);
    }
  }, [state.bankingDetails.statusCodeForAddBanking]);

  return (
    <div>
      <Modal
        show={props.showForm}
        onHide={() => handleClose()}
        backdrop="static"
        centered
      >
        {/* <Modal.Header closeButton className="text-center">
            <Modal.Title style={{ fontSize: 18,fontFamily:"Gilroy",fontWeight:600 }} className="text-center">
              Add a Reading
            </Modal.Title>
          </Modal.Header> */}

        <Modal.Header style={{ marginBottom: "30px", position: "relative" }}>
          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              fontFamily: "Gilroy",
            }}
          >
           {props.edit ? "Edit Bank" : "Add Bank"}
          </div>
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={handleClose}
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
              <Form.Group className="mb-3">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Account name{" "}
                  <span style={{ color: "red", fontSize: "20px" }}> * </span>
                </Form.Label>
                <FormControl
                  type="text"
                  id="form-controls"
                  placeholder="Enter account name"
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
                    <MdError />
                   <span style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{accountNameError}</span> 
                  </div>
                )}
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <Form.Group className="mb-3">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Account no.{" "}
                  <span style={{ color: "red", fontSize: "20px" }}> * </span>
                </Form.Label>
                <FormControl
                  type="text"
                  id="form-controls"
                  placeholder="Enter account no."
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
                    <MdError />
                    <span style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{accountNumberError}</span>
                  </div>
                )}
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <Form.Group className="mb-3">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Bank Name{" "}
                  <span style={{ color: "red", fontSize: "20px" }}> * </span>
                </Form.Label>
                <FormControl
                  type="text"
                  id="form-controls"
                  placeholder="Enter bank name"
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
                    <MdError />
                   <span style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{bankNameError}</span>
                  </div>
                )}
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <Form.Group className="mb-3">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  IFSC code{" "}
                  <span style={{ color: "red", fontSize: "20px" }}> * </span>
                </Form.Label>
                <FormControl
                  type="text"
                  id="form-controls"
                  placeholder="Enter IFSC code"
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
                    <MdError />
                   <span style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{ifcsCodeError}</span> 
                  </div>
                )}
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <Form.Group className="mb-3">
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
              {descriptionError && (
                  <div style={{ color: "red" }}>
                    <MdError />
                    <span style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{descriptionError}</span>
                  </div>
                )}
            </div>
          </div>
        </Modal.Body>
         {error && (
                  <div style={{ color: "red" }}>
                    <MdError />
                   <span style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{error}</span> 
                  </div>
                )} 
        <Modal.Footer className="d-flex justify-content-center">
          <Button
            className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={{
              backgroundColor: "#1E45E1",
              fontWeight: 600,
              height: 50,
              borderRadius: 12,
              fontSize: 16,
              fontFamily: "Montserrat, sans-serif",
              marginTop: 20,
            }}
            onClick={handleSubmitBank}
          >
            {props.edit ? "save changes" : "Add Bank"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default BankingAddForm;

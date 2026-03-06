/* eslint-disable react-hooks/exhaustive-deps */
import Modal from "react-bootstrap/Modal";
import { FormControl, Nav } from "react-bootstrap";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./BankingAddForm.css";
import PropTypes from "prop-types";
import { CloseCircle } from "iconsax-react";
import Select, { components } from "react-select";
import ErrorMessage from '../../Components/ErrorMessage'

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
  const [activeTab, setActiveTab] = useState("BANK");

  const accountNameRef = useRef(null)
  const bankNameUPIRef = useRef(null)
  const bankNameCardRef = useRef(null)
  const benificiaryNameRef = useRef(null)
  const [bankaccount, setBankAccount] = useState("");
  const [bankaccountError, setBankAccountError] = useState("");
  // const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [bankking, setBanking] = useState("")
  const [bankHolderName, setBankHolderName] = useState("");



  useEffect(() => {
    if (activeTab === "UPI") {
      bankNameUPIRef.current?.focus();
    } else if (activeTab === "CARD") {
      bankNameCardRef.current?.focus();
    } else if (activeTab === "BANK") {
      accountNameRef.current?.focus();
    } else if (activeTab === "CASH") {
      benificiaryNameRef.current.focus()

    }
  }, [activeTab]);






  useEffect(() => {
    setHostel_Id(state.login.selectedHostel_Id)
  }, [state?.login?.selectedHostel_Id]);

  // console.log("props",props)

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
    let value = e.target.value;

    value = value.replace(/\s+/g, "");

    if (!/^\d*$/.test(value)) {
      return;
    }

    if (value.length > 18) {
      return;
    }
    setAccountNo(value);
    setError("");
    setIsChangedError("");
    dispatch({ type: "REMOVE_ERROR_BOOKING" });

    if (value.length > 0 && /^0+$/.test(value)) {
      setaccountNumberError("Account Number cannot be all zeros");
      return;
    }

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
    const value = e.target.value;
    const pattern = /^[a-zA-Z0-9@._-]*$/;

    if (!pattern.test(value)) return;


    if (/^0+$/.test(value)) {
      setUpiIdError("Please Enter Valid UPI ID");
      return;
    }

    setUpiId(value);
    setUpiIdError("");
    setIsChangedError("");
  };



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

    const holderName = selectedOption.label.split(" - ")[0] || "";
    setBankHolderName(holderName);
    setBankAccount(selectedOption.value);
  };





  const paymentOptions = Array.isArray(bankking)
    ? bankking.map((item) => ({
      value: String(item.bankingId),
      label: `${item?.accountHolderName} - ${item?.accountType || ""}`,
    }))
    : [];


  const CustomMenuList = (props) => {
    const { children, selectProps } = props;

    return (
      <components.MenuList {...props}>

        <div className="max-h-[150px] overflow-y-auto"
        >{children}</div>


        <div
          className="font-gilroy sticky bottom-0 inset-x-0 border-t bg-white hover:bg-blue-50 p-2 text-center cursor-pointer text-blue-600 font-semibold text-sm z-10"

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
  CustomMenuList.propTypes = {
    children: PropTypes.node,
    selectProps: PropTypes.shape({
      onAddBank: PropTypes.func,
    }).isRequired,
  };


  console.log("props.editAddBank", props.editAddBank)

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
      setDescription(props.editAddBank?.description || "");
      setBankId(props.editAddBank.bankingId);
      setBankAccount(props.editAddBank.bankingId)
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
      props?.setEdit(false);
    }
  }, [props?.editAddBank]);


  const handleClose = () => {
    dispatch({ type: 'REMOVE_CREATE_BANKING_ERROR' })
    dispatch({ type: 'REMOVE_ERROR_BOOKING' })
    props?.setShowForm(false);
    props?.setEdit(false);
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
    dispatch({ type: 'REMOVE_CREATE_BANKING_ERROR' })
    let isHas = false;


    setError("");
    setaccountNumberError("");
    setIsChangedError("");


    if (props.edit) {
      const isChanged =
        accountName !== initialStateAssign.accountName ||
        Number(accountNo) !== Number(initialStateAssign.accountNo) ||
        bankName !== initialStateAssign.bankName ||
        ifscCode !== initialStateAssign.ifscCode ||
        description !== initialStateAssign.description;

      if (!isChanged) {
        setIsChangedError("No Changes Detected");
        isHas = true;
      }
    }

    if (!accountName.trim()) {
      setError("Please Enter Beneficiary Name");
      isHas = true;
    }

    if (!accountNo) {
      setaccountNumberError("Please Enter Account No");
      isHas = true;
    } else if (/^0+$/.test(accountNo)) {
      setaccountNumberError("Account Number cannot be zeros");
      isHas = true;
    } else if (accountNo.length < 9 || accountNo.length > 18) {
      setaccountNumberError("Account Number Must Be 9–18 Digits");
      isHas = true;
    }


    if (isHas) return;


    if (props.edit) {
      dispatch({
        type: "EDIT_BANKING",
        payload: {
          hostelId: hostel_id,
          bankId: bankId,
          data: {
            accountType: "BANK",
            holderName: accountName,
            accountNo: Number(accountNo),
            bankName,
            ifscCode,
            description,
            branchName: "",
            branchCode: "",
            isDefault: true,
            upiId: "",
            cardType: "",
            cardNumber: "",
            isActive: true,
          },
        },
      });
    } else {
      dispatch({
        type: "ADD_BANKING",
        payload: {
          hostelId: hostel_id,
          data: {
            accountType: "BANK",
            holderName: accountName,
            accountNo: Number(accountNo),
            bankName,
            ifscCode,
            description,
            branchName: "",
            branchCode: "",
            isDefault: true,
            upiId: "",
            cardType: "",
            cardNumber: "",
          },
        },
      });
      setFormLoading(true);
    }
  };





  const handleSubmitUpi = () => {
    dispatch({ type: 'REMOVE_CREATE_BANKING_ERROR' })
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
            holderName: bankHolderName,
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
            holderName: bankHolderName,
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


    if (!/^\d*$/.test(value)) return;


    if (/^0+$/.test(value)) {
      setError("Please Enter Valid Card Number");
      return;
    }

    setCardNo(value);
    setError("");
    setIsChangedError("");
  };

  const [cardType, setCardType] = useState("")
  const [cardTypeError, setCardTypeError] = useState("")

  // const handleCardType = (e) => {
  //   const selected = e.target.value;
  //   setCardType(selected);
  //   setError("")
  // };

  const handleSubmitCard = () => {
    dispatch({ type: 'REMOVE_CREATE_BANKING_ERROR' })
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
            holderName: bankHolderName,
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
            holderName: bankHolderName,
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

    dispatch({ type: 'REMOVE_CREATE_BANKING_ERROR' })


    if (!accountName) {
      setError("Please Enter Benificiary Name");
      return;
    }

    console.log("accountName", accountName, "description", description)
    console.log("initialStateAssign", initialStateAssign)
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
      dispatch({ type: 'REMOVE_CREATE_BANKING_ERROR' })
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


  useEffect(() => {
    if (state.createAccount?.networkError || state.bankingDetails.bankingCreateError) {
      setFormLoading(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NETWORK_ERROR' })
      }, 3000)
    }

  }, [state.createAccount?.networkError, state.bankingDetails.bankingCreateError])


  const tabs = ["BANK", "UPI", "CARD", "CASH"];

  return (
    <div>


      <Modal
        show={props.showForm}
        onHide={() => handleClose()}
        backdrop="static"
        centered


      >

        <Modal.Header className="relative border-b-0">
          <div className="text-lg font-semibold font-gilroy">
            {props.edit ? "Edit Bank" : "Add Bank"}
          </div>

          <CloseCircle size="24" color="#000" onClick={handleClose}
            className="cursor pointer" />
        </Modal.Header>


        <div className="flex gap-2 mx-2 border-b-0">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            const isDisabled =
              props.editAddBank?.bankingId &&
              props.editAddBank.accountType !== tab;

            return (
              <button
                key={tab}
                // type="button"
                disabled={isDisabled}
                onClick={() => {
                  if (isDisabled) return;
                  setActiveTab(tab);
                  setError("");
                  setUpiIdError("");
                  setBankAccountError("");
                  setCardTypeError("");
                  setIsChangedError("");
                  setaccountNumberError("");
                  dispatch({ type: "REMOVE_CREATE_BANKING_ERROR" });
                }}
                className={`
          px-2 py-1 w-[150px] text-center font-medium rounded-t-lg font-[Gilroy]
          transition-all
          ${isActive
                    ? "bg-[#1E45E1] text-white"
                    : "text-[#4B4B4B] bg-transparent"}
          ${isDisabled
                    ? "opacity-60 cursor-not-allowed"
                    : " cursor-pointer"}
        `}
              >
                {tab === "BANK"
                  ? "Bank Name"
                  : tab.charAt(0) + tab.slice(1).toLowerCase()}
              </button>
            );
          })}
        </div>


        <Modal.Body className="pb-0">
          {activeTab === "BANK" && (

            <div className="grid grid-cols-12 gap-x-4 gap-y-3">

              <div className="col-span-12 lg:col-span-6">
                <Form.Group >
                  <Form.Label className="text-sm font-medium text-gray-900 font-gilroy" >
                    Benificiary Name {" "}
                    <span className="text-red-500 text-xl" >
                      {" "}
                      *{" "}
                    </span>

                  </Form.Label>
                  <FormControl
                    type="text"
                    ref={accountNameRef}
                    id="form-controls"
                    placeholder="Enter Benificiary Name"
                    value={accountName}
                    onChange={(e) => handleAccountName(e)}
                    className="text-base font-medium text-gray-600 font-gilroy shadow-none border border-gray-300 h-12 rounded-lg"

                  />
                </Form.Group>
                {accountNameError && (
                  <ErrorMessage message={accountNameError} type="error" />
                )}
                {error && (
                  <ErrorMessage message={error} type="error" />
                )}
              </div>
              <div className="col-span-12 lg:col-span-6">
                <Form.Group >
                  <Form.Label className="text-sm font-medium text-gray-900 font-gilroy mt-2" >
                    Bank Name{" "}

                  </Form.Label>
                  <FormControl
                    type="text"
                    id="form-controls"
                    placeholder="Enter Bank Name"
                    value={bankName}
                    onChange={(e) => handleBankName(e)}
                    className="text-base font-medium text-gray-600 font-gilroy shadow-none border border-gray-300 h-12 rounded-lg"
                  />
                </Form.Group>
                {bankNameError && (
                  <ErrorMessage message={bankNameError} type="error" />
                )}

              </div>

              <div className="col-span-12 lg:col-span-6">
                <Form.Group >
                  <Form.Label className="text-sm font-medium text-gray-900 font-gilroy mt-2">
                    Account No {" "}
                    <span className="text-red-500 text-xl" >
                      {" "}
                      *{" "}
                    </span>

                  </Form.Label>
                  <FormControl
                    type="text"
                    id="form-controls"
                    placeholder="Enter Account No"
                    value={accountNo}
                    onChange={(e) => handleAccountNo(e)}
                    maxLength={18}
                    className="text-base font-medium text-gray-600 font-gilroy shadow-none border border-gray-300 h-12 rounded-lg"
                  />
                </Form.Group>
                {accountNumberError && (
                  <ErrorMessage message={accountNumberError} type="error" />
                )}
              </div>


              <div className="col-span-12 lg:col-span-6">
                <Form.Group >
                  <Form.Label className="text-sm font-medium text-gray-900 font-gilroy mt-3" >
                    IFSC Code{" "}

                  </Form.Label>
                  <FormControl
                    type="text"
                    id="form-controls"
                    placeholder="Enter IFSC Code"
                    value={ifscCode}
                    onChange={(e) => handleIfscCode(e)}
                    className="text-base font-medium text-gray-600 font-gilroy shadow-none border border-gray-300 h-12 rounded-lg"
                  />
                </Form.Group>
                {ifcsCodeError && (
                  <ErrorMessage message={ifcsCodeError} type="error" />
                )}
              </div>
              <div className="col-span-12">
                <Form.Group >
                  <Form.Label className="text-sm font-medium text-gray-900 font-gilroy mt-3"
                  >
                    Description{" "}
                  </Form.Label>
                  <FormControl
                    type="text"
                    id="form-controls"
                    placeholder="Enter Description"
                    value={description}
                    onChange={(e) => handleDescription(e)}
                    className="text-base font-medium text-gray-600 font-gilroy shadow-none border border-gray-300 h-12 rounded-lg"
                  />
                </Form.Group>

              </div>


              {isChangedError && (
                <div className="col-span-12 mt-1">
                  <div className="mx-auto w-fit text-center">
                    <ErrorMessage message={isChangedError} type="error" />
                  </div>
                </div>
              )}
              {
                state.bankingDetails.bankingCreateError && <div className="flex content-center mt-1 mb-1">

                  <ErrorMessage message={state.bankingDetails.bankingCreateError} type="error" />
                </div>
              }

              {/* {state.createAccount?.networkError ?
                <div className="d-flex justify-content-center mt-1 mb-1">
                  <ErrorMessage message={state.createAccount?.networkError} type="error" />
                </div>
                : null} */}

              <Modal.Footer className="col-span-12 p-0 mb-2 !border-t-0" >
                <Button
                  disabled={formLoading}
                  className="w-full h-[50px] !bg-[#1E45E1] !font-semibold rounded-[12px] !text-[16px] !font-gilroy"

                  onClick={handleSubmitBank}
                >
                  {props.edit ? "Save Changes" : "Add Bank"}
                </Button>
              </Modal.Footer>

            </div>

          )}

          {activeTab === "UPI" && (
            <div className="grid grid-cols-12 gap-x-4 gap-y-3">


              <div className="col-span-12 lg:col-span-6">
                <Form.Group
                  className="mb-1"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="text-sm font-medium text-gray-900 font-gilroy mt-3">
                    Bank{" "}
                    <span className="text-red-500 text-xl">*</span>
                  </Form.Label>

                  <Select inputRef={bankNameUPIRef}
                    options={paymentOptions}
                    value={
                      paymentOptions.find((opt) => opt.value === String(bankaccount)) || null
                    }
                    onChange={(selectedOption) =>
                      handleModeOfPaymentChange(selectedOption)
                    }
                    // onMenuOpen={() => setIsSelectOpen(true)}
                    // onMenuClose={() => setIsSelectOpen(false)}
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

              <div className="col-span-12 lg:col-span-6">
                <Form.Group >
                  <Form.Label className="text-sm font-medium text-gray-900 font-gilroy mt-3">
                    UPI ID{" "}
                    <span className="text-red-500 text-xl">
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
                    className="text-base font-medium text-gray-600 font-gilroy shadow-none border border-gray-300 h-12 rounded-lg"
                  />
                </Form.Group>
                {upiIdError && (
                  <ErrorMessage message={upiIdError} type="error" />
                )}
              </div>

              <div className="col-span-12">
                <Form.Group >
                  <Form.Label className="text-sm font-medium text-gray-900 font-gilroy mt-3">
                    Description{" "}
                  </Form.Label>
                  <FormControl
                    type="text"
                    id="form-controls"
                    placeholder="Enter Description"
                    value={description}
                    onChange={(e) => handleDescription(e)}
                    className="text-base font-medium text-gray-600 font-gilroy shadow-none border border-gray-300 h-12 rounded-lg"
                  />
                </Form.Group>
                {isChangedError && (
                  <div className="flex justify-center">
                    <ErrorMessage message={isChangedError} type="error" />
                  </div>
                )}

              </div>



              {
                state.bankingDetails.bankingCreateError && <div className="flex justify-center mt-1 mb-1">

                  <ErrorMessage message={state.bankingDetails.bankingCreateError} type="error" />
                </div>
              }

              <Modal.Footer className="col-span-12 p-0 mb-2 !border-t-0" >
                <Button disabled={formLoading}
                  className="w-full h-[50px] !bg-[#1E45E1] !font-semibold rounded-[12px] !text-[16px] !font-gilroy"
                  onClick={handleSubmitUpi}
                >
                  {props.edit ? "Save Changes" : "ADD UPI"}
                </Button></Modal.Footer>

            </div>
          )}


          {activeTab === "CARD" && (
            <div className="grid grid-cols-12 gap-x-4 gap-y-3">

              <div className="col-span-12 lg:col-span-6">
                <Form.Group
                  className="mb-1"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="text-sm font-medium text-gray-900 font-gilroy mt-3">
                    Bank{" "}
                    <span className="text-red-500 text-xl">
                      {" "}
                      *{" "}
                    </span>
                  </Form.Label>

                  <Select inputRef={bankNameCardRef}

                    options={paymentOptions}
                    value={
                      paymentOptions.find((opt) => opt.value === String(bankaccount)) || null
                    }
                    onChange={(selectedOption) =>
                      handleModeOfPaymentChange(selectedOption)
                    }
                    // onMenuOpen={() => setIsSelectOpen(true)}
                    // onMenuClose={() => setIsSelectOpen(false)}
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

              <div className="col-span-12 lg:col-span-6">
                <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                  <Form.Label className="text-sm font-medium text-gray-900 font-gilroy mt-3"
                  >
                    Card Type
                    <span className="text-red-500 text-xl">
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


              <div className="col-span-12 lg:col-span-6">
                <Form.Group >
                  <Form.Label className="text-sm font-medium text-gray-900 font-gilroy mt-3">
                    Card Number
                  </Form.Label>
                  <FormControl
                    type="text"
                    id="form-controls"
                    placeholder="Enter Card No"
                    value={cardNo}
                    onChange={(e) => handleCardNo(e)}
                    className="text-base font-medium text-gray-600 font-gilroy shadow-none border border-gray-300 h-12 rounded-lg"
                  />
                </Form.Group>

              </div>



              <div className="col-span-12 lg:col-span-6">
                <Form.Group >
                  <Form.Label
                    className="text-sm font-medium text-gray-900 font-gilroy mt-3"
                  >
                    Description{" "}
                  </Form.Label>
                  <FormControl
                    type="text"
                    id="form-controls"
                    placeholder="Enter Description"
                    value={description}
                    onChange={(e) => handleDescription(e)}
                    className="text-base font-medium text-gray-600 font-gilroy shadow-none border border-gray-300 h-12 rounded-lg"
                  />
                </Form.Group>

              </div>


              {
                state.bankingDetails.bankingCreateError && <div className="flex justify-center mt-1 mb-1">

                  <ErrorMessage message={state.bankingDetails.bankingCreateError} type="error" />
                </div>
              }
              {isChangedError && (
                <div className="col-span-12 mt-1">
                  <div className="mx-auto w-fit text-center">
                    <ErrorMessage message={isChangedError} type="error" />
                  </div>
                </div>
              )}

              <Modal.Footer className="col-span-12 p-0 mb-2 !border-t-0">
                <Button disabled={formLoading}
                  className="w-full h-[50px] !bg-[#1E45E1] !font-semibold rounded-[12px] !text-[16px] !font-gilroy"
                  onClick={handleSubmitCard}
                >
                  {props.edit ? "Save Changes" : "Add Card"}
                </Button>
              </Modal.Footer>
            </div>


          )}
          {activeTab === "CASH" && (
            <div className="grid grid-cols-12 gap-x-4 gap-y-3">
              <div className="col-span-12 lg:col-span-6">
                <Form.Group >
                  <Form.Label className="text-sm font-medium text-gray-900 font-gilroy mt-3">
                    Benificiary Name{" "}
                    <span className="text-red-500 text-xl">
                      {" "}
                      *{" "}
                    </span>
                  </Form.Label>
                  <FormControl ref={benificiaryNameRef}
                    type="text"
                    id="form-controls"
                    placeholder="Enter Benificiary Name"
                    value={accountName}
                    onChange={(e) => handleAccountName(e)}
                    className="text-base font-medium text-gray-600 font-gilroy shadow-none border border-gray-300 h-12 rounded-lg"
                  />
                </Form.Group>
                {accountNameError && (
                  <ErrorMessage message={accountNameError} type="error" />
                )}
                {error && (
                  <ErrorMessage message={error} type="error" />
                )}
              </div>


              <div className="col-span-12 lg:col-span-6">
                <Form.Group >
                  <Form.Label
                    className="text-sm font-medium text-gray-900 font-gilroy mt-4">
                    Description{" "}
                  </Form.Label>
                  <FormControl
                    type="text"
                    id="form-controls"
                    placeholder="Enter Description"
                    value={description}
                    onChange={(e) => handleDescription(e)}
                    className="text-base font-medium text-gray-600 font-gilroy shadow-none border border-gray-300 h-12 rounded-lg"
                  />
                </Form.Group>

              </div>
              {isChangedError && (
                <div className="col-span-12 mt-1">
                  <div className="mx-auto w-fit text-center">
                    <ErrorMessage message={isChangedError} type="error" />
                  </div>
                </div>
              )}

              {state.bankingDetails.bankingCreateError && (
                <div className="col-span-12 -mt-3 mb-1 flex justify-start">
                  <ErrorMessage
                    message={state.bankingDetails.bankingCreateError}
                    type="error"
                  />
                </div>
              )}

              <Modal.Footer className="col-span-12 p-0 mb-2 !border-t-0">
                <Button
                  disabled={formLoading}
                  className="w-full h-[50px] !bg-[#1E45E1] !font-semibold rounded-[12px] !text-[16px] !font-gilroy"
                  onClick={handleSubmitCash}
                >
                  {props.edit ? "Save Changes" : "Add Cash"}
                </Button>
              </Modal.Footer>

            </div>
          )}

        </Modal.Body>

        {formLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-transparent opacity-75 z-10">
            <div className="w-10 h-10 rounded-full border-4 border-t-[#1E45E1] border-r-transparent animate-spin"></div>
          </div>
        )}



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





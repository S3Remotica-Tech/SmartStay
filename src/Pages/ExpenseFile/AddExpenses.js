/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import "../../Pages/AssetFile/addAsset.css";
import moment from "moment";
import "flatpickr/dist/themes/material_blue.css";
import { MdError } from "react-icons/md";
import {CloseCircle} from "iconsax-react";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import Select from "react-select";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

function StaticExample({ show, currentItem,setShowModal }) {
  const state = useSelector((state) => state);
  console.log("StaticExample",state)
  const dispatch = useDispatch();
  const customContainerRef = useRef();
  const [assetName, setAssetName] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [modeOfPayment, setModeOfPayment] = useState("");
  const [description, setDescription] = useState("");
  const [count, setCount] = useState("");
  const [hostelName, setHostelName] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [dateError, setDateError] = useState("");
  const [countError, setCountError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [isChangedError, setIsChangedError] = useState("");
  const [account, setAccount] = useState("");
  const [accountError, setAccountError] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [netPaymentError,setNetPaymentError] = useState("")
  const [initialState, setInitialState] = useState({
    assetName: "",
    vendorName: "",
    selectedDate: "",
    price: "",
    category: "",
    modeOfPayment: "",
    description: "",
    count: "",
    hostelName: "",
    account: "",
  });



  useEffect(() => {
    dispatch({
      type: "EXPENCES-CATEGORY-LIST",
      payload: { hostel_id: state.login.selectedHostel_Id },
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: "ASSETLIST",
      payload: { hostel_id: state.login.selectedHostel_Id },
    });
  }, []);
  useEffect(()=>{
if(state.ExpenseList.expenceNetBanking){
setNetPaymentError(state.ExpenseList.expenceNetBanking)
}
  },[state.ExpenseList.expenceNetBanking])

  useEffect(() => {
    dispatch({ type: "BANKINGLIST",payload:{ hostel_id: state.login.selectedHostel_Id} });
  }, []);

  useEffect(() => {
    const closeButton = document.querySelector(
      'button[aria-label="close-button"]'
    );
    if (closeButton) {
      closeButton.style.backgroundColor = "white";
      closeButton.style.borderRadius = "50%";
      closeButton.style.width = "10px";
      closeButton.style.height = "10px";
      closeButton.style.border = "1.5px solid #222222";
      closeButton.style.padding = "9px";
    }
  }, []);

  useEffect(() => {
    if (currentItem) {
      // setId((currentItem && currentItem.id) || "");
      setAssetName((currentItem && currentItem.asset_id) || "");
      setVendorName((currentItem && currentItem.vendor_id) || "");
      setSelectedDate(moment(currentItem.purchase_date).toDate());
      setPrice((currentItem && currentItem.unit_amount) || "");
      setCategory((currentItem && currentItem.category_id) || "");
      setModeOfPayment((currentItem && currentItem.payment_mode) || "");
      setDescription((currentItem && currentItem.description) || "");
      setCount((currentItem && currentItem.unit_count) || "");
      setHostelName((currentItem && currentItem.hostel_id) || "");
      setAccount((currentItem && currentItem.bank_id) || "");

      setInitialState({
        assetName: currentItem.asset_id || "",
        vendorName: currentItem.vendor_id || "",
        selectedDate: currentItem.purchase_date
          ? moment(currentItem.purchase_date).toDate()
          : null,
        price: currentItem.unit_amount || "",
        category: currentItem.category_id || "",
        modeOfPayment: currentItem.payment_mode || "",
        description: currentItem.description || "",
        count: currentItem.unit_count || "",
        hostelName: currentItem.hostel_id || "",
      });
    }
  }, [currentItem]);

  useEffect(() => {
    if (customContainerRef.current && calendarRef.current) {
      calendarRef.current.flatpickr.set({
        dateFormat: "d/m/Y",
        defaultDate: selectedDate || new Date(),
        // maxDate: "today",
        appendTo: customContainerRef.current, // Append to custom container
      });
    }
  }, [customContainerRef.current, selectedDate]);
  const handleCountChange = (e) => {
    setGeneralError("");
    setCountError("");
    setIsChangedError("");
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setCount(value);
    }
  };

  

 

  const handleCategoryChange = (selectedOption) => {
    setCategory(selectedOption?.value || '');
    setGeneralError("");
    setCategoryError("");
    setIsChangedError("");
  };
  // const handleAccount = (e) => {
  //   setAccount(e.target.value);
  //   setAccountError("");
  //   setIsChangedError("");
  //   setNetPaymentError("")
  //   dispatch({type: "CLEAR_EXPENCE_NETBANKIG"});
  // };
  const handleAccount = (selectedOption) => {
    setAccount(selectedOption?.value || "");
    setAccountError("");
    setIsChangedError("");
    setNetPaymentError("");
    dispatch({ type: "CLEAR_EXPENCE_NETBANKIG" });
  };

  const handleModeOfPaymentChange = (e) => {
    setModeOfPayment(e.target.value);
    setGeneralError("");
    setPaymentError("");
    setIsChangedError("");
    setNetPaymentError("")
    dispatch({type: "CLEAR_EXPENCE_NETBANKIG"});
  };

 

  const handlePriceChange = (e) => {
    const value = e.target.value;
    setGeneralError("");
    setPriceError("");
    setIsChangedError("");
    setNetPaymentError("")
    // if (/^\d*$/.test(value)) {
    //   setPrice(value);
    // }
    if (/^\d*\.?\d*$/.test(value)) {
      setPrice(value);
    }
  };
 
  

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setIsChangedError("");
    setGeneralError("");

    if (value === "") {
      setDescription(value);
      return;
    }

    if (value.trim() !== "") {
      setDescription(value);
    } else {
      setDescription(value);
    }
  };

  const handleAddExpenses = () => {

    setCategoryError("");
    setDateError("");
    setCountError("");
    setPriceError("");
    setPaymentError("");
    setIsChangedError("");
    
    let hasError = false;
  
    // Validate individual fields and show specific errors
    if (!category) {
      setCategoryError("Please Select Category");
      hasError = true;
    }
  
    if (!selectedDate) {
      setDateError("Please Select Purchase Date");
      hasError = true;
    }
  
    if (!modeOfPayment) {
      setPaymentError("Please Enter Mode Of Transaction");
      hasError = true;
    }
  
    if (!price) {
      setPriceError("Please Enter Valid Unit Amount");
      hasError = true;
    } else if (isNaN(price) || price <= 0) {
      setPriceError("Price Must be a Positive Number");
      hasError = true;
    }
  
    if (!count) {
      setCountError("Please Enter Valid Unit Count");
      hasError = true;
    } else if (isNaN(count) || count <= 0) {
      setCountError("Unit Count Must be a Positive Number");
      hasError = true;
    }
  
    if (modeOfPayment === "Net Banking" && !account) {
      setAccountError("Please Choose Bank Account");
      hasError = true;
    }
  
    const isChanged =
      initialState.assetName !== assetName ||
      initialState.vendorName !== vendorName ||
      (initialState.selectedDate &&
        selectedDate &&
        initialState.selectedDate.getTime() !== selectedDate.getTime()) ||
      Number(initialState.price) !== Number(price) ||
      initialState.category !== category ||
      initialState.modeOfPayment !== modeOfPayment ||
      initialState.description !== description ||
      Number(initialState.count) !== Number(count) ||
      initialState.hostelName !== hostelName;
  
    if (!isChanged) {
      setIsChangedError("No Changes Detected");
      hasError = true;
    }
  
    // If any validation fails, do not proceed
    if (hasError) {
      return;
    }
  
    // Format the date and dispatch the action
    const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
    dispatch({
      type: "ADDEXPENSE",
      payload: {
        category_id: category,
        purchase_date: formattedDate,
        unit_count: count,
        unit_amount: price,
        description: description,
        payment_mode: modeOfPayment,
        hostel_id: state.login.selectedHostel_Id,
        id: currentItem ? currentItem.id : null,
        bank_id: account,
      },
    });
  };
  

 
  const calendarRef = useRef(null);
  


  

  

  const handleClose = () => {
    setShowModal(false);
    setNetPaymentError("")
    dispatch({type: "CLEAR_EXPENCE_NETBANKIG"});

  }
 

  return (
    <div
      className="modal show"
      style={{
        display: "block",
        position: "initial",
        fontFamily: "Gilroy",
      }}
    >
      <Modal show={show} onHide={handleClose}   dialogClassName="custom-modal">
        <Modal.Dialog
          style={{ maxWidth: "100%", width: "100%" }}
          className="m-0 p-0"
        >
          <Modal.Header>
            <Modal.Title
              style={{
                fontSize: 18,
                color: "#222222",
                fontFamily: "Gilroy",
                fontWeight: 600,
              }}
            >
              {currentItem ? "Edit Expense" : "Add Expense"}
            </Modal.Title>

            <CloseCircle size="24" color="#000" onClick={handleClose} style={{cursor:'pointer'}} />
          </Modal.Header>

          

          {generalError && (
            <div className="d-flex align-items-center p-1 mb-2 mt-2">
              <MdError style={{ color: "red", marginRight: "5px" }} />
              <label
                className="mb-0"
                style={{
                  color: "red",
                  fontSize: "12px",
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                }}
              >
                {generalError}
              </label>
            </div>
          )}

          <Modal.Body style={{ padding: 20 }}>
            <div className="row mt-1">
             
              {state.Settings.Expences.data &&
                state.Settings.Expences.data.length === 0 && (
                  <label
                  className="pb-1"
                  style={{
                    fontSize: 14,
                    color: "red",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Please add a &apos;Category&apos; option in Settings, accessible after adding an expenses.
                </label>
                )}

              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <Form.Group
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
                    Category{" "}
                    <span style={{ color: "#FF0000", display: "inline-block",fontSize: "20px" }}>
                      *
                    </span>
                  </Form.Label>

                  {/* <Form.Select
                    aria-label="Default select example"
                    value={category}
                    onChange={handleCategoryChange}
                    className=""
                    id="vendor-select"
                    style={{
                      marginTop: "5px",
                      fontSize: "16px",
                      color: "rgba(75, 75, 75, 1)",
                      fontFamily: "Gilroy",
                      fontWeight: category ? 600 : 500,
                    }}
                  >
                    <option value="" >Select a Category</option>
                    {state.Settings.Expences.data && state.Settings.Expences.data.length > 0 ? 
                      state.Settings.Expences.data.map((view) => (
                        <>
                          <option
                            key={view.category_Id}
                            value={view.category_Id}
                          >
                            {view.category_Name}
                          </option>
                        </>
                      ))
                    :
                    (
                      <option value="" disabled>
                      No category available
                    </option>
                    )
                    }
                  </Form.Select> */}
                 
  <Select
    options={
      state.Settings.Expences.data && state.Settings.Expences.data.length > 0
        ? state.Settings.Expences.data.map((view) => ({
            value: view.category_Id,
            label: view.category_Name,
          }))
        : []
    }
    onChange={handleCategoryChange }
    value={
      category
        ? {
            value: category,
            label:
              state.Settings.Expences.data.find(
                (view) => view.category_Id === category
              )?.category_Name || "Select a Category",
          }
        : null
    }
    placeholder="Select a Category"
    classNamePrefix="custom"
    styles={{
      control: (base) => ({
        ...base,
        // marginTop: "5px",
        fontSize: "16px",
        color: "rgba(75, 75, 75, 1)",
        fontFamily: "Gilroy",
        fontWeight: category ? 600 : 500,
        border: "1px solid #D9D9D9",
        borderRadius: "8px",
        boxShadow: "none",
        height:"50px"
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
    noOptionsMessage={() => "No category available"}
  />


                </Form.Group>
                {categoryError && (
                  <div className="d-flex align-items-center p-1">
                    <MdError style={{ color: "red", marginRight: "5px",fontSize:"13px",marginBottom:"2px" }} />
                    <label
                      className="mb-0"
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      {categoryError}
                    </label>
                  </div>
                )}
              </div>

             

              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <Form.Group  controlId="purchaseDate">
                  <Form.Label
                    style={{
                      fontSize: 14,
                      color: "#222222",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    Purchase Date{" "}
                    <span style={{ color: "red", fontSize: "20px" }}>*</span>
                  </Form.Label>
                 


                   <div className="datepicker-wrapper" style={{ position: 'relative', width: "100%" }}>
                                                  <DatePicker
                                                    style={{ width: "100%", height: 48,cursor:"pointer" }}
                                                    format="DD/MM/YYYY"
                                                    placeholder="DD/MM/YYYY"
                                                    value={selectedDate ? dayjs(selectedDate) : null}
                                                    onChange={(date) => {
                                                      setGeneralError("");
                                                      setDateError("");
                                                      setIsChangedError("");
                                                      setSelectedDate(date ? date.toDate() : null);
                                                    }}
                                                    getPopupContainer={(triggerNode) => triggerNode.closest('.datepicker-wrapper')}
                                                  />
                                                </div>
                </Form.Group>
                {dateError && (
                  <div className="d-flex align-items-center p-1 mb-2">
                    <MdError style={{ color: "red", marginRight: "5px",fontSize:"13px",marginBottom:"2px" }} />
                    <label
                      className="mb-0"
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      {dateError}
                    </label>
                  </div>
                )}
              </div>

              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <Form.Group
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
                    Unit Count{" "}
                    <span
                      style={{
                        color: "#FF0000",
                        display: count ? "none" : "inline-block",
                        fontSize:"20px",
                      }}
                    >
                      *
                    </span>
                  </Form.Label>
                  <Form.Control
                    value={count}
                    onChange={handleCountChange}
                    type="text"
                    placeholder="Enter Unit Count"
                    maxLength={10}
                    style={{
                      fontSize: 16,
                      color: "#4B4B4B",
                      fontFamily: "Gilroy",
                      fontWeight: count ? 600 : 500,
                      boxShadow: "none",
                      border: "1px solid #D9D9D9",
                      height: 50,
                      borderRadius: 8,
                    }}
                  />
                </Form.Group>
                {countError && (
                  <div className="d-flex align-items-center p-1 mb-2">
                    <MdError style={{ color: "red", marginRight: "5px",fontSize:"13px",marginBottom:"2px" }} />
                    <label
                      className="mb-0"
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      {countError}
                    </label>
                  </div>
                )}
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <Form.Group
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
                    Per Unit Amount{" "}
                    <span
                      style={{
                        color: "#FF0000",
                        display: price ? "none" : "inline-block",
                        fontSize:"20px",
                      }}
                    >
                      *
                    </span>
                  </Form.Label>
                  <Form.Control
                    value={price}
                    onChange={handlePriceChange}
                    type="text"
                    placeholder="Enter Unit Amount"
                    style={{
                      fontSize: 16,
                      color: "#4B4B4B",
                      fontFamily: "Gilroy",
                      fontWeight: price ? 600 : 500,
                      boxShadow: "none",
                      border: "1px solid #D9D9D9",
                      height: 50,
                      borderRadius: 8,
                    }}
                  />
                </Form.Group>
                {priceError && (
                  <div className="d-flex align-items-center p-1 mb-2">
                    <MdError style={{ color: "red", marginRight: "5px",fontSize:"13px",marginBottom:"2px" }} />
                    <label
                      className="mb-0"
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      {priceError}
                    </label>
                  </div>
                )}
              </div>

              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <Form.Group
                  className="mb-2"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label
                    style={{
                      fontSize: 14,
                      color: "#222222",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                       marginTop:"15px",
                    }}
                  >
                    Purchase Amount
                  </Form.Label>
                  <Form.Control
                    value={count * price}
                    disabled
                    type="text"
                    placeholder=""
                    style={{
                      fontSize: 16,
                      color: "#4B4B4B",
                      fontFamily: "Gilroy",
                      fontWeight: 600,
                      boxShadow: "none",
                      border: "1px solid #D9D9D9",
                      height: 50,
                      borderRadius: 8,
                      backgroundColor: "#E7F1FF",
                    }}
                  />
                </Form.Group>
              </div>
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
                    Mode Of Transaction{" "}
                    <span
                      style={{
                        color: "#FF0000",
                        fontSize:"20px",
                      }}
                    >
                      *
                    </span>
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    value={modeOfPayment}
                    onChange={handleModeOfPaymentChange}
                    disabled={currentItem}
                    className=""
                    id="vendor-select"
                    style={{
                      fontSize: 16,
                      color: "rgba(75, 75, 75, 1)",
                      fontFamily: "Gilroy",
                      fontWeight: modeOfPayment ? 600 : 500,
                      cursor:"pointer"
                    }}
                  >
                    <option value="">Select a Mode</option>
                    <option value="UPI/BHIM">UPI/BHIM</option>
                    <option value="CASH">CASH</option>
                    <option value="Net Banking">Net Banking</option>
                  </Form.Select>
                </Form.Group>
                {paymentError && (
                  <div className="d-flex align-items-center p-1 mb-2">
                    <MdError style={{ color: "red", marginRight: "5px",fontSize:"13px",marginBottom:"2px" }} />
                    <label
                      className="mb-0"
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      {paymentError}
                    </label>
                  </div>
                )}
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
    state.bankingDetails?.bankingList?.banks?.length > 0
      ? state.bankingDetails.bankingList.banks.map((u) => ({
          value: u.id,
          label: u.bank_name,
        }))
      : []
  }
  value={
    state.bankingDetails?.bankingList?.banks?.map((u) => ({
      value: u.id,
      label: u.bank_name,
    })).find((opt) => opt.value === account) || null
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
  isDisabled={currentItem}
  noOptionsMessage={() =>
    state.bankingDetails?.bankingList?.banks?.length === 0
      ? "No accounts available"
      : "No match found"
  }
/>

                  {accountError && (
                    <div className="d-flex align-items-center p-1 mb-2">
                      <MdError style={{ color: "red", marginRight: "5px" }} />
                      <label
                        className="mb-0"
                        style={{
                          color: "red",
                          fontSize: "12px",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        {accountError}
                      </label>
                    </div>
                  )}
                   {netPaymentError && (
                                            <div style={{ color: "red" }}>
                                              <MdError />
                                             <span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}> {netPaymentError}</span>
                                            </div>
                                          )}
                </div>
              )}
              <div className="col-lg-12 col-md-12  col-sm-12 col-xs-12">
                <Form.Group
                  className="mb-2"
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
                    Description
                  </Form.Label>
                  <Form.Control
                    value={description}
                    onChange={handleDescriptionChange}
                    type="email"
                    placeholder="Enter description"
                    style={{
                      fontSize: 16,
                      color: "#4B4B4B",
                      fontFamily: "Gilroy",
                      fontWeight: description ? 600 : 500,
                      boxShadow: "none",
                      border: "1px solid #D9D9D9",
                      height: 50,
                      borderRadius: 8,
                    }}
                  />
                </Form.Group>
              </div>
            </div>
          </Modal.Body>
          {currentItem && isChangedError && (
            <div className="d-flex align-items-center justify-content-center p-1 mb-2 mt-2">
              <MdError style={{ color: "red", marginRight: "5px" }} />
              <label
                className="mb-0"
                style={{
                  color: "red",
                  fontSize: "13px",
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                }}
              >
                {isChangedError}
              </label>
            </div>
          )}
          <Modal.Footer style={{ border: "none" }} className="mt-1 pt-1">
            <Button
              onClick={handleAddExpenses}
              className="w-100"
              style={{
                backgroundColor: "#1E45E1",
                fontWeight: 600,
                borderRadius: 12,
                fontSize: 16,
                fontFamily: "Gilroy",
                padding: 12,
              }}
            >
              {currentItem ? "Save Changes" : "Add Expense"}
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </div>
  );
}
StaticExample.propTypes = {
  show: PropTypes.func.isRequired,
  currentItem: PropTypes.func.isRequired,
  setShowModal: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default StaticExample;
